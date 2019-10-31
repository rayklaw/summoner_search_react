import React from 'react'

import './SearchResults.css'

import SummonerInfo from './SummonerInfo'
import RankedStats from './RankedStats'


const SummonerSearched = props => (
  <div className="SummonerSearched">
    {props.summoner.map(summoner => <SummonerInfo key={summoner.accountId} summoner={summoner} />)}
  </div>
)

export default SummonerSearched

