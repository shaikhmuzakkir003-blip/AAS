import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { pageMeta } from '#/lib/meta'
import { Reveal } from '#/components/Reveal'
import { SplitReveal } from '#/components/SplitReveal'
import { Topo } from '#/components/Topo'
import { Unwrap } from '#/components/Unwrap'
import { Arrow } from '#/components/Collide'
import { SOCIALS } from '#/data/site'

export const Route = createFileRoute('/contact')({
  component: Contact,
  head: () => ({
    meta: pageMeta({
      title: 'Contact Ash',
      description:
        'One inbox, answered by the person who wrote the code.',
    }),
  }),
})

function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', note: '' })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email.includes('@')) return
    window.whop?.track('identify', { email: form.email })
    window.whop?.track('contact', { source: 'contact_page' })
    setSent(true)
  }

  return (
    <>
      <header className="phero">
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <SplitReveal as="span" className="u-eyebrow" color="lime">One inbox, no assistant</SplitReveal>
            <SplitReveal as="h1" className="u-display" color="lime" style={{ marginTop: '1rem', fontSize: 'clamp(3rem, 13vw, 13rem)' }}>
              Talk to
              <br />
              <em>Ash</em>
            </SplitReveal>
          </Reveal>
        </div>
      </header>

      <section className="sec sec--bone">
        <div className="wrap split-2" style={{ alignItems: 'center' }}>
          <Reveal>
            <SplitReveal as="h2" className="u-display" color="olive" style={{ fontSize: 'clamp(1.8rem, 4.4vw, 3.4rem)' }}>
              Bug, idea or
              <span className="u-serif"> job</span>
            </SplitReveal>
            <p className="u-body reveal" style={{ opacity: 0.7, marginTop: '1rem' }}>
              Asheo bug reports get looked at the same day. Everything else gets a
              real answer within the week, written by him.
            </p>

            {sent ? (
              <p
                className="u-body reveal"
                style={{ marginTop: '2rem', fontWeight: 700 }}
              >
                Sent. Ash has it, and he replies to everything.
              </p>
            ) : (
              <form
                className="reveal"
                onSubmit={submit}
                style={{ marginTop: '2rem', display: 'grid', gap: '1rem', maxWidth: '30rem' }}
              >
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
                <Field
                  label="What is it"
                  value={form.note}
                  onChange={(v) => setForm({ ...form, note: v })}
                />
                <button className="btn-line btn-line--light" type="submit" data-cursor="Send">
                  <span>Send it</span>
                  <Arrow />
                </button>
              </form>
            )}

            <div
              className="u-mono reveal"
              style={{ marginTop: '2.5rem', display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}
            >
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-cursor="Open">
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <Unwrap
              className="reveal"
              skin="/img/ash-model.png"
              under="/img/ash-anon.png"
              alt="Ash as his character model"
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <label style={{ display: 'grid', gap: '0.35rem' }}>
      <span className="u-mono" style={{ opacity: 0.6 }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: 'none',
          border: 0,
          borderBottom: '1px solid color-mix(in srgb, currentColor 35%, transparent)',
          padding: '0.55rem 0',
          font: 'inherit',
          color: 'inherit',
          outline: 'none',
        }}
      />
    </label>
  )
}
