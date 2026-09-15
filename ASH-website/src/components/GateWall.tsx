import { useState } from 'react'
import { Reveal } from './Reveal'
import { Words } from './Words'
import { GATEWAYS } from '#/data/site'
import { playClick } from '#/lib/sound'

const EXTENDED_GATEWAYS = [
  ...GATEWAYS,
  'Shopify Pay',
  'Checkout.com',
  'Square',
  'Klarna',
  'Mollie',
  'Payflow Pro',
  'Worldline',
  'BlueSnap',
  'Chase Paymentech',
  'Global Payments',
  'Elavon',
  'Cybersource',
  'First Data',
  'Verifone',
  'Nexi',
  'Moneris',
  'PayGate',
  'PayU',
  'Ingenico',
  'Heartland',
  'Barclaycard',
  'Bambora',
  'CCBill',
] as const

const CATEGORIES = ['All Handlers', 'Tier-1 PSP', 'Custom Embeds', 'Regional / Local'] as const

export function GateWall() {
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState<string>('All Handlers')
  const [activeGateway, setActiveGateway] = useState<string | null>('Stripe')

  const filtered = EXTENDED_GATEWAYS.filter((g) => {
    const matchesSearch = g.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false
    if (selectedCat === 'Tier-1 PSP') {
      return ['Stripe', 'Adyen', 'Braintree', 'Worldpay', 'Razorpay', 'Checkout.com', 'Square'].includes(g)
    }
    if (selectedCat === 'Custom Embeds') {
      return ['VGS', 'Basis Theory', 'Pipo', 'SafeCharge', 'Gr4vy', 'Spreedly'].includes(g)
    }
    if (selectedCat === 'Regional / Local') {
      return ['Xendit', 'Cashfree', 'PayU', 'Nexi', 'Mollie', 'Klarna'].includes(g)
    }
    return true
  })

  const getGatewayFile = (name: string) => {
    switch (name.toLowerCase()) {
      case 'stripe':
        return 'content/stripe_filler.js + algo/v2-candidate-generator.js'
      case 'adyen':
        return 'algo/adyenEncryptor.js + engine/transformer.js'
      case 'braintree':
        return 'engine/matcher.js (graphql/v1 tokenization swap)'
      case 'razorpay':
        return 'content/injection_hud.js + algo/v2-validator.js'
      default:
        return 'modules/router/v3/gateway-registry.js (generic DNR route)'
    }
  }

  return (
    <div className="gatewall">
      <Reveal className="gatewall__big">
        <Words text="*41* gateway handlers" step={36} />
      </Reveal>

      {/* Filter and Search Bar */}
      <div className="gate-controls">
        <div className="gate-search-wrap">
          <svg className="gate-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            className="gate-search-input u-mono"
            placeholder="Search 41 gateway handlers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="gate-cat-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`gate-cat-pill ${selectedCat === cat ? 'is-active' : ''}`}
              onClick={() => {
                playClick()
                setSelectedCat(cat)
              }}
              data-cursor="Filter"
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gateway Chip Cloud */}
      <div className="gatechips">
        {filtered.map((g) => (
          <button
            type="button"
            className={`gatechip ${activeGateway === g ? 'is-selected' : ''}`}
            key={g}
            onClick={() => {
              playClick()
              setActiveGateway(g)
            }}
            data-cursor="Inspect"
          >
            <span>{g}</span>
          </button>
        ))}
      </div>

      {/* Gateway Inspection Drawer */}
      {activeGateway && (
        <div className="gate-inspect-drawer u-mono">
          <div className="inspect-col">
            <span className="inspect-label">TARGET HANDLER:</span>
            <b className="u-lime">{activeGateway}</b>
          </div>
          <div className="inspect-col">
            <span className="inspect-label">INSPECTION FILE:</span>
            <code className="u-code">{getGatewayFile(activeGateway)}</code>
          </div>
          <div className="inspect-col">
            <span className="inspect-label">STATUS:</span>
            <span className="u-lime">● ACTIVE REGISTRY NODE</span>
          </div>
        </div>
      )}

      <p className="u-mono" style={{ textAlign: 'center', marginTop: '1.6rem', opacity: 0.55 }}>
        Hosted &amp; custom checkouts · detection badge driven by real network signals
      </p>
    </div>
  )
}
