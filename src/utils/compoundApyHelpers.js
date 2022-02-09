import { displayNumber } from "./formatBalance"
// 1 day, 7 days, 30 days, 1 year, 5 years
const DAYS_TO_CALCULATE_AGAINST = [1, 7, 30, 365, 1825]

export const getInterestBreakdown = ({
  principalInUSD,
  apr,
  earningTokenPrice,
  compoundFrequency = 1,
  performanceFee = 0,
}) => {
  // Everything here is worked out relative to a year, with the asset compounding at the compoundFrequency rate. 1 = once per day
  const timesCompounded = 365 * compoundFrequency
  // We use decimal values rather than % in the math for both APY and the number of days being calculates as a proportion of the year
  const aprAsDecimal = apr / 100

  // special handling for tokens like tBTC or BIFI where the daily token rewards for $1000 dollars will be less than 0.001 of that token
  // and also cause rounding errors
  const isHighValueToken = Math.round(earningTokenPrice / 1000) > 0
  const roundingDecimalsNew = isHighValueToken ? 5 : 3

  return DAYS_TO_CALCULATE_AGAINST.map((days) => {
    const daysAsDecimalOfYear = days / 365
    // Calculate the starting TOKEN balance with a dollar balance of principalInUSD.
    let principal = principalInUSD / earningTokenPrice
    if (principal === 0) {
      principal = 1 / Math.pow(10, 18)
    }
    let interestEarned = principal * aprAsDecimal * daysAsDecimalOfYear
    if (timesCompounded !== 0) {
      // This is a translation of the typical mathematical compounding APY formula. Details here: https://www.calculatorsoup.com/calculators/financial/compound-interest-calculator.php
      const accruedAmount = principal * (1 + aprAsDecimal / timesCompounded) ** (timesCompounded * daysAsDecimalOfYear)
      // To get the TOKEN amount earned, deduct the amount after compounding (accruedAmount) from the starting TOKEN balance (principal)
      interestEarned = accruedAmount - principal
      if (performanceFee) {
        const performanceFeeAsDecimal = performanceFee / 100
        const performanceFeeAsAmount = interestEarned * performanceFeeAsDecimal
        interestEarned -= performanceFeeAsAmount
      }
    }
    return parseFloat(interestEarned.toFixed(roundingDecimalsNew))
  })
}

const roundToTwoDp = (number) => Math.round(number * 100) / 100

export const calculateSltEarnedPerThousandDollars = ({ numberOfDays, farmApr, earningTokenPrice }) => {
  // Everything here is worked out relative to a year, with the asset compounding daily
  const timesCompounded = 365
  //   We use decimal values rather than % in the math for both APY and the number of days being calculates as a proportion of the year
  const apyAsDecimal = farmApr / 100
  const daysAsDecimalOfYear = numberOfDays / timesCompounded
  //   Calculate the starting SLT balance with a dollar balance of $1000.
  const principal = 1000 / earningTokenPrice

  // This is a translation of the typical mathematical compounding APY formula. Details here: https://www.calculatorsoup.com/calculators/financial/compound-interest-calculator.php
  const finalAmount = principal * (1 + apyAsDecimal / timesCompounded) ** (timesCompounded * daysAsDecimalOfYear)

  // To get the slt earned, deduct the amount after compounding (finalAmount) from the starting CAKSLTE balance (principal)
  const interestEarned = finalAmount - principal
  return roundToTwoDp(interestEarned)
}

export const apyModalRoi = ({ amountEarned, amountInvested }) => {
  const percentage = (amountEarned / amountInvested) * 100
  return displayNumber(percentage)
}
