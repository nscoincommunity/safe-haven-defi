import { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { Heading, Toggle, Text, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import FlexLayout from '../../components/Layout/Flex'
import Page from '../../components/Layout/Page'
import { useStakes, usePollStakesWithUserData } from '../../store/slices/stake-slice/hooks';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { getBalanceNumber } from '../../utils/formatBalance';
import { latinise } from '../../utils/latinise';
import { useSelector } from 'react-redux';
import { useUserStakeStakedOnly, useUserStakesViewMode } from '../../store/slices/user-slice/hooks';
import { ViewMode } from '../../store/slices/user-slice/actions';
import PageHeader from '../../components/PageHeader'
import Loading from '../../components/Loading'
import StakeCard from './components/StakeCard/StakeCard'
import Table from './components/StakeTable/StakeTable'
import StakeTabButtons from './components/StakeTabButtons'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema } from './components/types'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const NUMBER_OF_STAKES_VISIBLE = 12

const Stakes = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { data: stakesData, userDataLoaded } = useStakes()
  const { account } = useWeb3React()
  const sltPrice = new BigNumber(useSelector(state => state.app.priceOfOneSLT))
  const [query] = useState('')
  const [viewMode, setViewMode] = useUserStakesViewMode()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const chosenStakesLength = useRef(0)

  const isInactive = pathname.includes('history')
  const isActive = !isInactive

  usePollStakesWithUserData()

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserStakeStakedOnly(isActive)
  const activeStakes = stakesData.filter(stake => stake.multiplier !== '0X' && stake.pid !== 8)
  const inactiveStakes = stakesData.filter(stake => stake.multiplier === '0X' && stake.pid !== 8)
  const stakedOnlyStakes = activeStakes.filter(
    (stake) => stake.userData && new BigNumber(stake.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveStakes = inactiveStakes.filter(
    (stake) => stake.userData && new BigNumber(stake.userData.stakedBalance).isGreaterThan(0),
  )

  const stakesList = useCallback(
    (stakesToDisplay) => {
      let stakesToDisplayWithAPR = stakesToDisplay.map((stake) => {
        return stake
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        stakesToDisplayWithAPR = stakesToDisplayWithAPR.filter((stake) => {
          return latinise(stake.stakeSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return stakesToDisplayWithAPR
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sltPrice, query, isActive],
  )


  const [numberOfStakesVisible, setNumberOfStakesVisible] = useState(NUMBER_OF_STAKES_VISIBLE)

  const chosenStakesMemoized = useMemo(() => {
    let chosenStakes = []

    if (isActive) {
      chosenStakes = stakedOnly ? stakesList(stakedOnlyStakes) : stakesList(activeStakes)
    }
    if (isInactive) {
      chosenStakes = stakedOnly ? stakesList(stakedInactiveStakes) : stakesList(inactiveStakes)
    }
    return chosenStakes.slice(0, numberOfStakesVisible)
  }, [
    activeStakes,
    stakesList,
    inactiveStakes,
    isActive,
    isInactive,
    stakedInactiveStakes,
    stakedOnly,
    stakedOnlyStakes,
    numberOfStakesVisible,
  ])

  chosenStakesLength.current = chosenStakesMemoized.length

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfStakesVisible((stakesCurrentlyVisible) => {
        if (stakesCurrentlyVisible <= chosenStakesLength.current) {
          return stakesCurrentlyVisible + NUMBER_OF_STAKES_VISIBLE
        }
        return stakesCurrentlyVisible
      })
    }
  }, [isIntersecting])

  const rowData = chosenStakesMemoized.map((stake) => {
    const { token } = stake
    const tokenAddress = token.address
    const stakeLabel = stake.stakeSymbol && stake.stakeSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row = {
      apr: {
        pid: stake.pid,
        multiplier: stake.multiplier,
        stakeLabel,
        stakeSymbol: stake.stakeSymbol,
        tokenAddress,
        sltPrice,
        originalValue: stake.apr,
      },
      stake: {
        label: stakeLabel,
        pid: stake.pid,
        token: stake.token,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(stake.userData.earnings)),
        pid: stake.pid,
      },
      liquidity: {
        liquidity: stake.liquidity,
      },
      multiplier: {
        multiplier: stake.multiplier,
      },
      details: stake,
    }
    return row
  })

  const renderContent = () => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a, b) => {
          switch (column.name) {
            case 'stake':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.originalValue && b.original.apr.originalValue) {
                return Number(a.original.apr.originalValue) - Number(b.original.apr.originalValue)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    }

    return (
      <FlexLayout style={{ margin: '16px 0' }}>
        <Route exact path={`${path}`}>
          {chosenStakesMemoized.map((stake) => (
            <StakeCard
              key={stake.pid}
              stake={stake}
              sltPrice={sltPrice}
              account={account}
              removed={false}
            />
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {chosenStakesMemoized.map((stake) => (
            <StakeCard
              key={stake.pid}
              stake={stake}
              sltPrice={sltPrice}
              account={account}
              removed
            />
          ))}
        </Route>
      </FlexLayout>
    )
  }

  return (
    <>
      <PageHeader>
        <Heading as="h1" scale="xxl" color="#253449cc" mb="24px">
          Stake
        </Heading>
        <Heading scale="lg" color="#253449">
          Stake tokens to earn.
        </Heading>
      </PageHeader>
      <Page>
        <ControlContainer>
          <ViewControls>
            <ToggleView viewMode={viewMode} onToggle={(mode) => setViewMode(mode)} />
            <ToggleWrapper>
              <Toggle
                id="staked-only-stakes"
                checked={stakedOnly}
                onChange={() => setStakedOnly(!stakedOnly)}
                scale="sm"
              />
              <Text color="#1FC7D4">Staked only</Text>
            </ToggleWrapper>
            <StakeTabButtons hasStakeInFinishedStakes={stakedInactiveStakes.length > 0} />
          </ViewControls>
      </ControlContainer>
        {renderContent()}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )}
        <div ref={observerRef} />
      </Page>
    </>
  )
}

export default Stakes
