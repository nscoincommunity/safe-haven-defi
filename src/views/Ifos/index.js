import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Page from '../../components/Layout/Page'
import IsoTabButtons from './components/IsoTabButtons'
import Hero from './components/Hero'
import CurrentIso from './CurrentIso'
import PastIso from './PastIso'
import { useIsos, usePollIsosWithUserData } from '../../store/slices/iso-slice/hooks'

const Isos = () => {
  const { path } = useRouteMatch()
  const { data: isosData } = useIsos()
  usePollIsosWithUserData()
  return (
    <>
      <Hero />
      <Page>
        <IsoTabButtons />
        <Route exact path={`${path}`}>
          <CurrentIso isos={isosData} />
        </Route>
        <Route path={`${path}/history`}>
          <PastIso isos={[]} />
        </Route>
      </Page>
    </>
  )
}

export default Isos
