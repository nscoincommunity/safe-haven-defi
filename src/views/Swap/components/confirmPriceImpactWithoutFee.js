import { ALLOWED_PRICE_IMPACT_HIGH, PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN } from '../../../constants'


export default function confirmPriceImpactWithoutFee(priceImpactWithoutFee) {
  if (!priceImpactWithoutFee.lessThan(PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN)) {
    const confirmWord = 'confirm'
    return (
      // eslint-disable-next-line no-alert
      window.prompt(
        `This swap has a price impact of at least ${PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN.toFixed(0)}%. Please type the word ${confirmWord} to continue with this swap.`,
      ) === confirmWord
    )
  }
  if (!priceImpactWithoutFee.lessThan(ALLOWED_PRICE_IMPACT_HIGH)) {
    // eslint-disable-next-line no-alert
    return window.confirm(
      `This swap has a price impact of at least ${ALLOWED_PRICE_IMPACT_HIGH.toFixed(0)}%. Please confirm that you would like to continue with this swap.`,
    )
  }
  return true
}
