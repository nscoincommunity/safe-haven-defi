import React from 'react'
import IsoCard from './components/IsoCard'
import IsoCards from './components/IsoCards'

const PastIso = ({ isos }) => {
  return (
    <IsoCards>
      {isos.map((iso, key) => (
        <IsoCard key={key} iso={iso} />
      ))}
    </IsoCards>
  )
}

export default PastIso
