/**
 * Luhn algorithm (Mod 10) generation & validation.
 * Sourced directly from Asheo's algo/v2-candidate-generator.js & v2-validator.js specs.
 */

export function validateLuhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let shouldDouble = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10)

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

/** Compute check digit for a prefix string */
export function calculateLuhnCheckDigit(prefixDigits: string): number {
  let sum = 0
  let shouldDouble = true

  for (let i = prefixDigits.length - 1; i >= 0; i--) {
    let digit = parseInt(prefixDigits.charAt(i), 10)

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  const remainder = sum % 10
  return remainder === 0 ? 0 : 10 - remainder
}

/** Generate a Luhn-valid card number from a BIN pattern like 424242xxxxxxxxxx */
export function generateFromPattern(pattern: string): string {
  const clean = pattern.replace(/\s+/g, '')
  let result = ''

  // Fill in characters up to length - 1 with random digits
  for (let i = 0; i < clean.length - 1; i++) {
    const ch = clean[i]
    if (ch.toLowerCase() === 'x') {
      result += Math.floor(Math.random() * 10).toString()
    } else {
      result += ch
    }
  }

  // Calculate the final Luhn check digit
  const check = calculateLuhnCheckDigit(result)
  result += check.toString()

  return result
}

/** Format a 16-digit card number with spacing 4242 4242 4242 4242 */
export function formatCardNumber(num: string): string {
  const clean = num.replace(/\D/g, '')
  return clean.replace(/(\d{4})(?=\d)/g, '$1 ')
}

export type GatewayPreset = {
  name: string
  bin: string
  network: 'Visa' | 'Mastercard' | 'Amex'
  samplePayload: {
    gateway: string
    method: string
    encryptedField?: string
  }
}

export const GATEWAY_PRESETS: GatewayPreset[] = [
  {
    name: 'Stripe',
    bin: '424242xxxxxxxxxx',
    network: 'Visa',
    samplePayload: {
      gateway: 'api.stripe.com/v1/tokens',
      method: 'card[number] swap',
    },
  },
  {
    name: 'Adyen',
    bin: '550000xxxxxxxxxx',
    network: 'Mastercard',
    samplePayload: {
      gateway: 'checkoutshopper-live.adyen.com/v1/payments',
      method: 'adyenjs: encryptedCardNumber',
      encryptedField: 'adyenjs_0_1_25$w4...',
    },
  },
  {
    name: 'Braintree',
    bin: '400000xxxxxxxxxx',
    network: 'Visa',
    samplePayload: {
      gateway: 'payments.braintree-api.com/graphql',
      method: 'tokenizeCreditCard: number',
    },
  },
  {
    name: 'Razorpay',
    bin: '411111xxxxxxxxxx',
    network: 'Visa',
    samplePayload: {
      gateway: 'api.razorpay.com/v1/checkout',
      method: 'card[number] injection_hud',
    },
  },
]
