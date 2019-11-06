import React from 'react'

import './RankedStats.css'

const RankedStats = props => {
    const { rankedStats } = props;
    function fromRoman(string) {
        if (string == 'I') { return 1 }
        if (string == 'II') { return 2 }
        if (string == 'III') { return 3 }
        if (string == 'IV') { return 4 }
    }
    const rankedSoloIcon = rankedStats[2].tier == 'UNRANKED' ? `http://opgg-static.akamaized.net/images/medals/default.png` : `https://opgg-static.akamaized.net/images/medals/${rankedStats[2].tier.toLowerCase()}_${fromRoman(rankedStats[2].rank)}.png`
    const rankedFlexIcon = rankedStats[0].tier == 'UNRANKED' ? `http://opgg-static.akamaized.net/images/medals/default.png` : `https://opgg-static.akamaized.net/images/medals/${rankedStats[0].tier.toLowerCase()}_${fromRoman(rankedStats[0].rank)}.png`
    const rankedTftIcon = rankedStats[1].tier == 'UNRANKED' ? `http://opgg-static.akamaized.net/images/medals/default.png` : `https://opgg-static.akamaized.net/images/medals/${rankedStats[1].tier.toLowerCase()}_${fromRoman(rankedStats[1].rank)}.png`

    return (
        <div className="RankedStats">
            <div className="RankedStatsSolo">
                <img src={rankedSoloIcon}></img>
                <div><p>Ranked Solo Queue</p><p> {rankedStats[2].tier} {rankedStats[2].rank} {rankedStats[2].leaguePoints} LP </p><br></br><p>{rankedStats[2].wins} Wins / {rankedStats[2].losses} Losses</p><p>{Math.floor(rankedStats[2].wins / (rankedStats[2].wins + rankedStats[2].losses) * 100)}% Winrate</p></div>
            </div>
            <div className="RankedStatsFlex">
                <img src={rankedFlexIcon}></img>
                <div><p>Ranked Flex Queue</p><p> {rankedStats[0].tier} {rankedStats[0].rank} {rankedStats[0].leaguePoints} LP </p><br></br><p>{rankedStats[0].wins} Wins / {rankedStats[0].losses} Losses</p><p>{Math.floor(rankedStats[0].wins / (rankedStats[0].wins + rankedStats[0].losses) * 100)}% Winrate</p></div>
            </div>
            <div className="RankedStatsTft">
                <img src={rankedTftIcon}></img>
                <div><p>Ranked Teamfight Tactics </p><p>{rankedStats[1].tier} {rankedStats[1].rank} {rankedStats[1].leaguePoints} LP </p><br></br><p>{rankedStats[1].wins} Wins / {rankedStats[1].losses} Losses</p><p>{Math.floor(rankedStats[1].wins / (rankedStats[1].wins + rankedStats[1].losses) * 100)}% Winrate</p></div>
            </div>
        </div>
    )
}

export default RankedStats