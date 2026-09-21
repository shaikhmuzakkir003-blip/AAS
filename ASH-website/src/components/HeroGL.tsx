import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'

const HS_DIFFUSE = '/img/ash-vr-headset.png'
const HS_DEPTH = '/img/ash-vr-headset-depth.png'
const HS_ALPHA = '/img/ash-vr-headset-alpha.png'

/**
 * Faceless hero, landonorris.com architecture applied to the PRODUCT instead
 * of a portrait — "no face reveal, the work is the face":
 *
 *  - a 256x256 grid CPU-displaced by the generated goggle depth map (real
 *    recomputed vertex normals -> real relief under light), the strap-less
 *    unit floating in the void like a museum piece: slow bob + orbit,
 *    eased pointer lean (LN's normalized-mouse feel).
 *  - BLACKPRINT phase: the same relief as a lime wireframe hologram with a
 *    y-scan band (LN's exact wireframe ShaderMaterial recipe).
 *  - MATERIALISE: LN's wavy `y + sin(x)` sweep transitions wire -> solid
 *    product; a slow glint keeps the visor glass alive on hold.
 *  - premultiplied-alpha output everywhere (the context is premultiplied;
 *    straight color washes sub-1 alpha to white).
 *
 * Falls back silently (reduced motion / no WebGL): the stage keeps its type.
 */
export function HeroGL() {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current
    if (reducedMotion() || !el) return
    if (typeof WebGLRenderingContext === 'undefined') return
    const host = el

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(2, Math.round(window.devicePixelRatio || 1)) || 1)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50)
    camera.position.set(0, 0, 4)

    const pmrem = new THREE.PMREMGenerator(renderer)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const key = new THREE.DirectionalLight(0xffffff, 1.1)
    key.position.set(2.5, 3, 4)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xc8f02b, 0.35)
    rim.position.set(-3, -1, -2)
    scene.add(rim)

    const rig = new THREE.Group()
    scene.add(rig)

    // ---- CPU depth-displaced grid with real normals ----
    const buildGrid = (dep: THREE.Texture, gw: number, gh: number, zScale: number) => {
      const img = dep.image as HTMLImageElement | ImageBitmap
      const canvas = document.createElement('canvas')
      canvas.width = gw
      canvas.height = gh
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return null
      ctx.filter = 'blur(2px)' // kill speckle in the generated depth map
      ctx.drawImage(img, 0, 0, gw, gh)
      ctx.filter = 'none'
      let data: Uint8ClampedArray
      try {
        data = ctx.getImageData(0, 0, gw, gh).data
      } catch {
        return null
      }
      const dAt = (i: number, j: number) => data[(j * gw + i) * 4] / 255
      const pos: number[] = []
      const uvs: number[] = []
      const idx: number[] = []
      for (let j = 0; j < gh; j++) {
        for (let i = 0; i < gw; i++) {
          const u = i / (gw - 1)
          const v = 1 - j / (gh - 1)
          pos.push(u - 0.5, v - 0.5, dAt(i, j) * zScale)
          uvs.push(u, v)
        }
      }
      for (let j = 0; j < gh - 1; j++) {
        for (let i = 0; i < gw - 1; i++) {
          const a = j * gw + i
          const b = a + 1
          const c = a + gw + 1
          const d = a + gw
          idx.push(a, d, c, a, c, b)
        }
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
      geo.setIndex(idx)
      geo.computeVertexNormals()
      return geo
    }

    // ---- SOLID PRODUCT ----
    const solidUniforms = {
      uDiffuse: { value: null as THREE.Texture | null },
      uAlpha: { value: null as THREE.Texture | null },
      uAppear: { value: 0 },
      uTime: { value: 0 },
    }
    const solidMat = new THREE.ShaderMaterial({
      uniforms: solidUniforms,
      transparent: true,
      side: THREE.DoubleSide,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        varying vec3 vN;
        void main(){
          vUv = uv;
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uDiffuse; uniform sampler2D uAlpha;
        uniform float uAppear; uniform float uTime;
        varying vec2 vUv;
        varying vec3 vN;
        void main(){
          vec4 col = texture2D(uDiffuse, vUv);
          float sil = smoothstep(0.10, 0.60, texture2D(uAlpha, vUv).r);
          if (sil < 0.02) discard;
          vec3 n = normalize(vN);
          vec3 L = normalize(vec3(0.4, 0.5, 0.8));
          float dif = 0.75 + 0.5 * max(dot(n, L), 0.0);
          col.rgb *= dif;
          col.rgb = pow(col.rgb, vec3(0.80)); // lift the black product off the void
          float fr = pow(1.0 - max(n.z, 0.0), 2.2); // lime fresnel rim
          col.rgb += vec3(0.72, 0.95, 0.10) * fr * 0.55;
          // LN wavy sweep reveal
          float wave = vUv.y + 0.10 * sin(vUv.x * 9.0);
          float tr = 1.25 - uAppear * 1.6;
          float rev = smoothstep(tr, tr + 0.15, wave);
          float line = rev * (1.0 - smoothstep(tr + 0.10, tr + 0.22, wave));
          col.rgb = mix(col.rgb, vec3(0.72, 0.95, 0.10), line * 0.25);
          // living glass: slow diagonal glint across the visor
          float sp = vUv.x * 0.8 + vUv.y * 0.35;
          float cc = fract(uTime * 0.06) * 1.8 - 0.4;
          float glint = (1.0 - smoothstep(0.0, 0.16, abs(sp - cc))) * sil;
          col.rgb += vec3(glint * 0.10);
          gl_FragColor = vec4(col.rgb * rev * sil, rev * sil); // premultiplied
        }
      `,
    })
    let solid: THREE.Mesh | null = null

    // ---- BLACKPRINT hologram: lime wireframe of the same relief ----
    const wireUniforms = {
      uTime: { value: 0 },
      uOp: { value: 0 },
      uAlpha: { value: null as THREE.Texture | null },
    }
    const wireMat = new THREE.ShaderMaterial({
      wireframe: true,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: wireUniforms,
      vertexShader: /* glsl */ `
        varying vec3 vPosition;
        varying vec2 vUv;
        void main(){
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime; uniform float uOp; uniform sampler2D uAlpha;
        varying vec3 vPosition;
        varying vec2 vUv;
        void main(){
          if (texture2D(uAlpha, vUv).r < 0.5) discard;
          float scan = pow(fract(-vPosition.y * 10.0 - uTime), 4.0) * 0.3;
          float a = (0.4 + scan) * uOp;
          gl_FragColor = vec4(vec3(0.72, 0.95, 0.10) * a, a); // premultiplied
        }
      `,
    })
    let wire: THREE.Mesh | null = null

    // ---- load + build ----
    let disposed = false
    let tl: gsap.core.Timeline | null = null
    const loader = new THREE.TextureLoader()
    const load = (url: string) =>
      new Promise<THREE.Texture>((res, rej) => loader.load(url, res, undefined, rej))

    Promise.all([load(HS_DIFFUSE), load(HS_DEPTH), load(HS_ALPHA)])
      .then(([diff, dep, alpha]) => {
        if (disposed) return
        const solidGeo = buildGrid(dep, 256, 256, 0.42)
        const wireGeo = buildGrid(dep, 110, 110, 0.42)
        if (!solidGeo || !wireGeo) throw new Error('grid build failed')

        diff.colorSpace = THREE.SRGBColorSpace
        solidUniforms.uDiffuse.value = diff
        solidUniforms.uAlpha.value = alpha
        solid = new THREE.Mesh(solidGeo, solidMat)
        rig.add(solid)

        wireUniforms.uAlpha.value = alpha
        wire = new THREE.Mesh(wireGeo, wireMat)
        wire.position.z = 0.03
        rig.add(wire)

        layout(diff)

        // idle loop: hologram wire -> wavy materialise -> glossy hold
        tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: 'power3.out' } })
        tl.call(() => {
          wireUniforms.uOp.value = 0
          solidUniforms.uAppear.value = 0
        })
        tl.to(wireUniforms.uOp, { value: 0.9, duration: 0.6 }, 0)
        tl.to(solidUniforms.uAppear, { value: 1, duration: 1.1, ease: 'power2.inOut' }, 1.3)
        tl.to(wireUniforms.uOp, { value: 0.22, duration: 0.5 }, 1.7)
        tl.to({}, { duration: 2.2 })
        tl.to(solidUniforms.uAppear, { value: 0, duration: 0.8, ease: 'power3.in' })
        tl.to(wireUniforms.uOp, { value: 0.9, duration: 0.4 }, '<0.1')
        tl.to(wireUniforms.uOp, { value: 0, duration: 0.5 }, '>')
      })
      .catch(() => {/* stage keeps its type */})

    function layout(tex: THREE.Texture) {
      const r = host.getBoundingClientRect()
      const aspect = r.width / r.height || 1.6
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      const vH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z
      const vW = vH * aspect
      const img = tex.image as { width: number; height: number }
      const imgA = img.width / img.height
      // the goggle owns ~58% of the width, centered
      const wantW = vW * 0.58
      const s = wantW
      if (solid) solid.scale.set(s, s / imgA, 1)
      if (wire) wire.scale.set(s, s / imgA, 1)
    }

    const resize = () => {
      const r = host.getBoundingClientRect()
      if (!r.width || !r.height) return
      renderer.setSize(Math.round(r.width), Math.round(r.height), true)
      camera.aspect = r.width / r.height
      camera.updateProjectionMatrix()
      if (solidUniforms.uDiffuse.value) layout(solidUniforms.uDiffuse.value)
    }
    resize()
    window.addEventListener('resize', resize)

    // ---- pointer lean + scroll dolly ----
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    gsap.registerPlugin(ScrollTrigger)
    const scroll = { p: 0 }
    const st = ScrollTrigger.create({
      trigger: host.closest('.hero') ?? host,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        scroll.p = self.progress
      },
    })

    let raf = 0
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.05
      cur.y += (target.y - cur.y) * 0.05
      const t = performance.now() / 1000
      wireUniforms.uTime.value = t * 0.6
      solidUniforms.uTime.value = t
      if (solid) solid.visible = solidUniforms.uAppear.value > 0.0001
      if (wire) wire.visible = wireUniforms.uOp.value > 0.0001
      // museum float: slow orbit + bob + eased pointer lean + scroll dolly
      rig.rotation.y = Math.sin(t * 0.22) * 0.32 + cur.x * 0.3
      rig.rotation.x = -0.06 + cur.y * -0.12 + Math.sin(t * 0.4) * 0.02
      rig.position.y = Math.sin(t * 0.8) * 0.03
      rig.position.z = scroll.p * 0.9
      rig.scale.setScalar(1 + scroll.p * 0.25)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    host.appendChild(renderer.domElement)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      st.kill()
      tl?.kill()
      pmrem.dispose()
      env.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="headset3d" ref={mount} aria-hidden="true" />
}
