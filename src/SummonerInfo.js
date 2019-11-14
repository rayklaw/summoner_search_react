import React from 'react'

import './SummonerInfo.css'

let soloIndex

const SummonerInfo = props => {
  const { summoner } = props
  const { rankedStats } = props

  rankedStats.forEach((stat, index) => {
    if (stat.queueType === "RANKED_SOLO_5x5") {
      soloIndex = index;
    }
  })

  return (
    <div className="SummonerInfo">
      <div className="ProfileIcon">
        <img src={`http://ddragon.leagueoflegends.com/cdn/9.22.1/img/profileicon/${summoner.profileIconId}.png`} alt="" />
      </div>
      <div className="TierBorder">
        <img src={!isNaN(soloIndex) ? `https://opgg-static.akamaized.net/images/borders2/${rankedStats[soloIndex].tier.toLowerCase()}.png` : null} alt="" />
      </div>
      <span className="SummonerLevel">{summoner.summonerLevel}</span>
      <span className="Name">{summoner.name}</span>
    </div>
  )
}

export default SummonerInfo