import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'

const DIFFUSE = '/img/ash-straight-bare.png'
const DEPTH = '/img/ash-straight-depth.png'
const SHADOW = '/img/ash-straight-shadow.png'
const ALPHA = '/img/ash-straight-alpha.png'
const NORMAL = '/img/ash-straight-normal.png'
const ROUGH = '/img/ash-straight-rough.png'
const HS_DIFFUSE = '/img/ash-vr-headset.png'
const HS_DEPTH = '/img/ash-vr-headset-depth.png'
const HS_ALPHA = '/img/ash-vr-headset-alpha.png'
const HS_NORMAL = '/img/ash-vr-headset-normal.png'

/**
 * The landonorris.com hero, rebuilt with the EXACT architecture read from the
 * client's clone (vendor/offbrand engine bundle):
 *
 *  - HEAD (their `AX` class): PlaneGeometry(1,1,128,128) displaced by the depth
 *    map (displacementScale ~0.25), MeshPhysicalMaterial with alphaMap (silhouette),
 *    roughness/metalness from the depth, normal lighting from REAL recomputed
 *    geometry normals, lit by an environment map (their HDRI envMapIntensity 1.5;
 *    here the zero-asset PMREM RoomEnvironment twin). Pointer uses their eased
 *    normalized mouse (intensity 0.075 / ease 0.025 feel).
 *  - SHADOW layer behind (their shadow-softer-edit), counter-drifting.
 *  - HELMET->VR (their helmet class): the LN "fluid unwrap" is a wavy
 *    `y - sin(x)` sweep blend in the fragment shader driven by a transition
 *    uniform — the VR render materialises with that exact wavy sweep, on a
 *    depth-displaced plane (its generated depth = its 3D structure), worn as a
 *    child of the head.
 *  - VR BLUEPRINT: lime pen loops of the VR shape only, traced via
 *    setDrawRange (their LineSegments/setDrawRange technique).
 *  - ScrollTrigger scrub dollies the camera + lifts the device.
 *
 * When live it tags .hero__figure with .has3d so the bare portrait steps
 * aside. Falls back to the bare portrait (reduced motion / no WebGL).
 */
export function HeroGL() {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current
    if (reducedMotion() || !el) return
    if (typeof WebGLRenderingContext === 'undefined') return
    const host = el

    const figure = host.closest('.hero__figure') as HTMLElement | null

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(2, Math.round(window.devicePixelRatio || 1)) || 1)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 0.75, 0.1, 50)
    camera.position.set(0, 0, 4)

    // LN: envMap = studio HDRI, envMapIntensity 1.5 — RoomEnvironment twin
    const pmrem = new THREE.PMREMGenerator(renderer)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env

    // LN-lit face: soft even light, matte like a clean photo — no plastic gloss
    scene.add(new THREE.AmbientLight(0xffffff, 0.65))
    const key = new THREE.DirectionalLight(0xffffff, 0.9)
    key.position.set(2, 3, 4)
    scene.add(key)

    const world = new THREE.Group()
    scene.add(world)

    // ---- HEAD: depth-displaced PBR mesh (LN AX class architecture) ----
    let head: THREE.Mesh | null = null
      const headMat = new THREE.MeshPhysicalMaterial({
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide, // insurance: a winding bug must never erase the face silently
      roughness: 1.0,
      metalness: 0.0,
      clearcoat: 0.0,
      clearcoatRoughness: 0.4,
      envMapIntensity: 0.15,
    })

    const buildHead = (
      diff: THREE.Texture,
      dep: THREE.Texture,
      alpha: THREE.Texture,
      _nrm: THREE.Texture, // generated head normal = silver hair streaks; not bound
      _rgh: THREE.Texture, // generated rough map = grey spec on black hair; not bound
    ) => {
      const img = dep.image as HTMLImageElement | ImageBitmap
      const GW = 129
      const GH = 129
      const canvas = document.createElement('canvas')
      canvas.width = GW
      canvas.height = GH
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return false
      ctx.drawImage(img, 0, 0, GW, GH)
      let data: Uint8ClampedArray
      try {
        data = ctx.getImageData(0, 0, GW, GH).data
      } catch {
        return false
      }
      const dAt = (i: number, j: number) => data[(j * GW + i) * 4] / 255

      const pos: number[] = []
      const uvs: number[] = []
      const idx: number[] = []
      for (let j = 0; j < GH; j++) {
        for (let i = 0; i < GW; i++) {
          const u = i / (GW - 1)
          const v = 1 - j / (GH - 1)
          pos.push(u - 0.5, v - 0.5, dAt(i, j) * 0.22) // displacementScale, LN uses 0.25
          uvs.push(u, v)
        }
      }
      for (let j = 0; j < GH - 1; j++) {
        for (let i = 0; i < GW - 1; i++) {
          const a = j * GW + i
          const b = a + 1
          const c = a + GW + 1
          const d = a + GW
          // CCW as seen from +Z, else FrontSide culls the whole face away
          idx.push(a, d, c, a, c, b)
        }
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
      geo.setIndex(idx)
      geo.computeVertexNormals() // real normals from the displaced surface

      headMat.map = diff
      headMat.alphaMap = alpha // LN uses a dedicated silhouette map
      headMat.needsUpdate = true

      head = new THREE.Mesh(geo, headMat)
      world.add(head)
      return true
    }

    // ---- LAYER 0 (back): cast shadow, counter-drifts the pointer ----
    const shadowUniforms = {
      uMap: { value: null as THREE.Texture | null },
      uOp: { value: 0 },
    }
    const shadowMat = new THREE.ShaderMaterial({
      uniforms: shadowUniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap; uniform float uOp;
        varying vec2 vUv;
        void main(){
          float lum = texture2D(uMap, vUv).r;
          float a = (1.0 - lum) * uOp;
          if (a < 0.01) discard;
          gl_FragColor = vec4(0.0, 0.0, 0.0, a);
        }
      `,
    })
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), shadowMat)
    shadow.position.set(0.03, -0.03, -0.35)
    shadow.scale.setScalar(1.08)
    world.add(shadow)

    // ---- VR HEADSET: generated render + depth relief, worn by the head ----
    const headset = new THREE.Group()
    // parented to head once head exists; until then it waits in world
    let worn = false

    const hsUniforms = {
      uDiffuse: { value: null as THREE.Texture | null },
      uDepth: { value: null as THREE.Texture | null },
      uAlpha: { value: null as THREE.Texture | null },
      uNormal: { value: null as THREE.Texture | null },
      uAppear: { value: 0 },
      uPop: { value: 0 },
    }
    const hsMat = new THREE.ShaderMaterial({
      uniforms: hsUniforms,
      transparent: true,
      vertexShader: /* glsl */ `
        uniform sampler2D uDepth; uniform float uPop;
        varying vec2 vUv;
        void main(){
          vUv = uv;
          vec3 p = position;
          p.z += texture2D(uDepth, uv).r * uPop;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      // LN helmet "fluid unwrap": wavy y - sin(x) sweep driven by the
      // transition uniform (uAppear), instead of a plain fade
      fragmentShader: /* glsl */ `
        uniform sampler2D uDiffuse; uniform sampler2D uDepth;
        uniform sampler2D uAlpha; uniform sampler2D uNormal;
        uniform float uAppear;
        varying vec2 vUv;
        void main(){
          float d = texture2D(uDepth, vUv).r;
          vec4 col = texture2D(uDiffuse, vUv);
          float sil = texture2D(uAlpha, vUv).r; // dedicated matte, LN-style
          vec3 n = texture2D(uNormal, vUv).rgb * 2.0 - 1.0;
          vec3 L = normalize(vec3(0.4, 0.5, 0.8));
          float spec = pow(clamp(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 24.0);
          col.rgb += spec * 0.12;
          float wave = vUv.y + 0.10 * sin(vUv.x * 10.0 + uAppear * 4.0);
          float tr = uAppear * 1.35 - 0.18;
          float rev = smoothstep(tr - 0.18, tr, wave);
          gl_FragColor = vec4(col.rgb, sil * rev);
        }
      `,
    })
    const hsPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 96, 64), hsMat)
    headset.add(hsPlane)

    // ---- BLACKPRINT — LN's exact wireframeMesh recipe on the REAL VR shape:
    // a depth-displaced 97x97 grid (same recipe as the head mesh) rendered
    // with the wireframe ShaderMaterial → a true 3D wire in the exact headset
    // relief, alpha-clipped to the silhouette. Black lines + y-scan band. ----
    const wireUniforms: {
      uTime: { value: number }
      uOp: { value: number }
      uAlpha: { value: THREE.Texture | null }
    } = {
      uTime: { value: 0 },
      uOp: { value: 0 },
      uAlpha: { value: null },
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
          float scan = pow(fract(-vPosition.y * 10.0 - uTime), 4.0) * 0.16;
          gl_FragColor = vec4(vec3(0.02), (0.5 + scan) * uOp);
        }
      `,
    })
    let wireGrid: THREE.Mesh | null = null
    const buildWireGrid = (dep: THREE.Texture) => {
      const img = dep.image as HTMLImageElement | ImageBitmap
      const GW = 97
      const GH = 97
      const canvas = document.createElement('canvas')
      canvas.width = GW
      canvas.height = GH
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      ctx.drawImage(img, 0, 0, GW, GH)
      let data: Uint8ClampedArray
      try {
        data = ctx.getImageData(0, 0, GW, GH).data
      } catch {
        return
      }
      const pos: number[] = []
      const uvs: number[] = []
      const idx: number[] = []
      for (let j = 0; j < GH; j++) {
        for (let i = 0; i < GW; i++) {
          const u = i / (GW - 1)
          const v = 1 - j / (GH - 1)
          pos.push(u - 0.5, v - 0.5, (data[(j * GW + i) * 4] / 255) * 0.35)
          uvs.push(u, v)
        }
      }
      for (let j = 0; j < GH - 1; j++) {
        for (let i = 0; i < GW - 1; i++) {
          const a = j * GW + i
          const b = a + 1
          const c = a + GW + 1
          const d = a + GW
          idx.push(a, d, c, a, c, b) // CCW from +Z
        }
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
      geo.setIndex(idx)
      wireGrid = new THREE.Mesh(geo, wireMat)
    }

    // ---- headset materialise IN PLACE: wavy sweep + relief pop ----
    const appear = { t: 0 }
    const applyAppear = () => {
      const t = appear.t
      hsUniforms.uAppear.value = t
      hsUniforms.uPop.value = 0.25 * t
    }
    applyAppear()

    // ---- load everything, build, start ----
    const loader = new THREE.TextureLoader()
    let disposed = false
    let tl: ReturnType<typeof gsap.timeline> | null = null

    Promise.all([
      new Promise<THREE.Texture>((res, rej) => loader.load(DIFFUSE, res, undefined, rej)),
      new Promise<THREE.Texture>((res, rej) => loader.load(DEPTH, res, undefined, rej)),
      new Promise<THREE.Texture>((res, rej) => loader.load(SHADOW, res, undefined, rej)),
      new Promise<THREE.Texture>((res, rej) => loader.load(ALPHA, res, undefined, rej)),
      new Promise<THREE.Texture>((res, rej) => loader.load(NORMAL, res, undefined, rej)),
      new Promise<THREE.Texture>((res, rej) => loader.load(ROUGH, res, undefined, rej)),
      new Promise<THREE.Texture>((res, rej) => loader.load(HS_DIFFUSE, res, undefined, rej)),
      new Promise<THREE.Texture>((res, rej) => loader.load(HS_DEPTH, res, undefined, rej)),
      new Promise<THREE.Texture>((res, rej) => loader.load(HS_ALPHA, res, undefined, rej)),
      new Promise<THREE.Texture>((res, rej) => loader.load(HS_NORMAL, res, undefined, rej)),
    ])
      .then(([diff, dep, shTex, alpha, nrm, rgh, hsDiff, hsDep, hsAlpha, hsNrm]) => {
        if (disposed) return
        try {
          if (!buildHead(diff, dep, alpha, nrm, rgh)) throw new Error('head build failed')
          shadowUniforms.uMap.value = shTex
          hsUniforms.uDiffuse.value = hsDiff
          hsUniforms.uDepth.value = hsDep
          hsUniforms.uAlpha.value = hsAlpha
          hsUniforms.uNormal.value = hsNrm
          diff.colorSpace = THREE.SRGBColorSpace
          hsDiff.colorSpace = THREE.SRGBColorSpace
          buildWireGrid(hsDep)
          wireUniforms.uAlpha.value = hsAlpha
          if (wireGrid) {
            headset.add(wireGrid)
            wireGrid.position.z = 0.03 // hugs the solid, reads in front
          }
          layout(diff, hsDiff)
          if (head) {
            head.add(headset)
            headset.position.set(0, 0.11, 0.2) // eye line of the portrait
            worn = true
          }
          gsap.to(headMat, { opacity: 1, duration: 1.2, ease: 'power2.out' })
          gsap.to(shadowUniforms.uOp, { value: 0.28, duration: 1.2, ease: 'power2.out' })

          tl = gsap.timeline({ repeat: -1, repeatDelay: 0.35, defaults: { ease: 'power3.out' } })
          tl.call(() => {
            wireUniforms.uOp.value = 0
          })
          tl.to(wireUniforms.uOp, { value: 1, duration: 0.5 }, 0)
          tl.to(appear, { t: 1, duration: 1.0, onUpdate: applyAppear }, 1.4)
          tl.to(wireUniforms.uOp, { value: 0.8, duration: 0.6 }, 1.7)
          tl.to({}, { duration: 1.6 })
          tl.to(appear, { t: 0, duration: 0.8, ease: 'power3.in', onUpdate: applyAppear })
          tl.to(wireUniforms.uOp, { value: 1, duration: 0.4 }, '<0.15')
          tl.to(wireUniforms.uOp, { value: 0, duration: 0.5 }, '>')
          figure?.classList.add('has3d')
        } catch {
          figure?.classList.remove('has3d')
        }
      })
      .catch(() => {/* bare portrait stays */})

    const visH = () => 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z
    function layout(tex: THREE.Texture, hsTex?: THREE.Texture) {
      const r = host.getBoundingClientRect()
      const aspect = r.width / r.height || 0.75
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      const vH = visH()
      const vW = vH * aspect
      const img = tex.image as { width: number; height: number }
      const imgA = img.width / img.height
      let pH = vH
      let pW = pH * imgA
      const cover = Math.max(vW / pW, vH / pH)
      pW *= cover; pH *= cover
      if (head) {
        head.scale.set(pW, pH, 1)
        head.position.y = -(0.5 - 0.32) * pH
        shadow.scale.set(pW * 1.08, pH * 1.08, 1)
        shadow.position.set(pW * 0.03, head.position.y - pH * 0.03, -0.35)
      }
      if (head && hsTex) {
        const hi = hsTex.image as { width: number; height: number }
        const hwL = 0.67 // verified in composite preview: temple-to-temple
        const hhL = (pW * hwL) / (hi.width / hi.height) / pH
        hsPlane.scale.set(hwL, hhL, 1)
        // blackprint = the exact VR relief, same footprint as the solid
        if (wireGrid) wireGrid.scale.copy(hsPlane.scale)
      }
    }

    const resize = () => {
      const r = host.getBoundingClientRect()
      if (!r.width || !r.height) return
      renderer.setSize(Math.round(r.width), Math.round(r.height), true)
      camera.aspect = r.width / r.height
      camera.updateProjectionMatrix()
      if (headMat.map) layout(headMat.map, hsUniforms.uDiffuse.value ?? undefined)
    }
    resize()
    window.addEventListener('resize', resize)

    // ---- pointer: LN eased normalized mouse ----
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    // ---- scroll dolly ----
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
      cur.x += (target.x - cur.x) * 0.04
      cur.y += (target.y - cur.y) * 0.04
      wireUniforms.uTime.value = (performance.now() / 1000) * 0.6
      if (head) {
        head.rotation.y = cur.x * 0.09
        head.rotation.x = -cur.y * 0.05
      }
      if (worn) {
        headset.rotation.y = cur.x * 0.05
        headset.rotation.x = cur.y * 0.03
        headset.position.x = cur.x * 0.03
        headset.position.y = 0.11 - cur.y * 0.03
        headset.position.z = 0.2 + scroll.p * 0.5
      }
      shadow.position.x = (head ? head.scale.x : 1) * 0.03 - cur.x * 0.05
      shadow.position.y = (head ? head.position.y : 0) - (head ? head.scale.y : 1) * 0.03 + cur.y * 0.05
      shadow.position.z = -0.35 - scroll.p * 0.3
      camera.position.z = 4 - scroll.p * 0.8
      world.rotation.x = scroll.p * 0.12
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
      figure?.classList.remove('has3d')
      renderer.dispose()
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="headset3d" ref={mount} aria-hidden="true" />
}
