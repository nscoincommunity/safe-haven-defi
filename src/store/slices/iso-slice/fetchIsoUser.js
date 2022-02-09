import BigNumber from 'bignumber.js';
import multicall from '../../../utils/multicall';
import { getHavenISOAdress, getHavenTokenAddress } from '../../../utils/addressHelpers';
import isoABI from '../../../abi/iso.json'
import erc20 from '../../../abi/erc20.json'
import { BIG_TEN } from '../../../utils/bigNumber';

export const fetchIsoUserReferralsCount = async (account) => {
    const referralsCount = await multicall(isoABI, [{
        address: getHavenISOAdress(),
        name: 'referralsCount',
        params: [account],
    }])
    return new BigNumber(referralsCount).toJSON()
}

export const fetchIsoUserInfo = async (account, pids) => {
    const viewUserInfo = await multicall(isoABI, [{
        address: getHavenISOAdress(),
        name: 'viewUserInfo',
        params: [account, pids],
    }])
    const userAmounts = viewUserInfo[0][0].map(value => {
        return new BigNumber(value._hex)
    })
    const userClaimed = viewUserInfo[0][1]
    return { userAmounts, userClaimed }
}

export const fetchUserHavenAmount = async (account) => {
    const [userHavenAmount, tokenDecimals] = await multicall(erc20, [
        {
            address: getHavenTokenAddress(),
            name: 'balanceOf',
            params: [account]
        },
        {
            address: getHavenTokenAddress(),
            name: 'decimals',
        },
    ])
    return (new BigNumber(userHavenAmount)).div(BIG_TEN.pow(tokenDecimals))
}