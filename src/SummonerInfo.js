import React from 'react'

import './SummonerInfo.css'


const SummonerInfo = props => {
  const { summoner } = props
  const { rankedStats } = props
  const profileIconUrl = `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/profileicon/${summoner.profileIconId}.png`
  const tierBorderUrl = `https://opgg-static.akamaized.net/images/borders2/${rankedStats[2].tier.toLowerCase()}.png`
  return (
    <div className="SummonerInfo">
      <div className="ProfileIcon">
        <img src={profileIconUrl} />
      </div>
      <div className="TierBorder">
        <img src={tierBorderUrl} />
      </div>
      <span className="SummonerLevel">{summoner.summonerLevel}</span>
      <span className="Name">{summoner.name}</span>
    </div>
  )
}

export default SummonerInfo