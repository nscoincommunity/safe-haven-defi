import React, { useState } from 'react'
import { useModal, Button } from '@pancakeswap/uikit'
import { useERC20 } from '../../../../hooks/useContract';
import useApproveIso from '../../hooks/useApproveIso';
import useHarvestIso from '../../hooks/useHarvestIso';
import useAllowanceIso from '../../hooks/useAllowanceIso';
import ContributeModal from './ContributeModal';

const IsoCardContribute = ({pid, token, tokenLabel, raisingAmountPool, offeringAmountPool, userData}) => {
    const [pendingTx, setPendingTx] = useState(false)
    const tokenContract = useERC20(token.address)
    const allowance = useAllowanceIso(tokenContract, pendingTx)
    const { onApprove } = useApproveIso(tokenContract)
    const { onHarvest } = useHarvestIso(pid)

    const isFinished = false
    const [onPresentContributeModal] = useModal(
        <ContributeModal tokenLabel={tokenLabel} tokenAddress={token.address} tokenDecimals={token.decimals} pid={pid} userhavenAmount={userData.userhavenAmount} />
    )

    const claim = async () => {
        try {
            setPendingTx(true)
            await onHarvest()
            setPendingTx(false)
        } catch (e) {
            setPendingTx(false)
            console.error(e)
        }
    }

    if (allowance === null) {
        return null
    }

    if (parseFloat(allowance) <= 0) {
        return (
            <Button
                width="100%"
                disabled={pendingTx}
                onClick={async () => {
                    try {
                        setPendingTx(true)
                        await onApprove()
                        setPendingTx(false)
                    } catch (e) {
                        setPendingTx(false)
                        console.error(e)
                    }
                }}
                >
                Approve
            </Button>
        )
    }

    return (
        <>
            <Button
                width="100%"
                disabled={pendingTx || userData.claimed}
                onClick={isFinished ? claim : onPresentContributeModal}
            >
                {isFinished ? 'Claim' : 'Contribute'}
            </Button>
        </>
    )
}

export default IsoCardContribute
