import React from 'react'

import './RankedStats.css'

//idk why this one has to be global when the one is matchHistory doesnt
let ordered = new Array(3)

const RankedStats = props => {
    const { rankedStats } = props

    function fromRoman(string) {
        if (string === 'I') { return 1 }
        if (string === 'II') { return 2 }
        if (string === 'III') { return 3 }
        if (string === 'IV') { return 4 }
    }

    rankedStats.forEach((stat, index) => {
        if (stat.queueType === "RANKED_SOLO_5x5") {
            stat.queueType = "Ranked Solo Queue"
            ordered[0] = rankedStats[index]
        }
        if (stat.queueType === "RANKED_FLEX_SR") {
            stat.queueType = "Ranked Flex Queue"
            ordered[1] = rankedStats[index]
        }
        if (stat.queueType === "RANKED_TFT") {
            stat.queueType = "Ranked Teamfight Tactics"
            ordered[2] = rankedStats[index]
        }
    })

    //console.log('o', ordered)
    //console.log('r', rankedIcon)

    // {ordered.map((rankedStat) => {
    //     return (
    //         <div className="RankedStat" key={rankedStat.leagueId}>
    //             <img src={rankedStat.tier === 'UNRANKED' ? `http://opgg-static.akamaized.net/images/medals/default.png` : `https://opgg-static.akamaized.net/images/medals/${rankedStat.tier.toLowerCase()}_${fromRoman(rankedStat.rank)}.png`} alt="Ranked Tier Icon"></img>
    //             <div><p>{rankedStat.queueType}</p><p> {rankedStat.tier} {rankedStat.rank} {rankedStat.leaguePoints} LP </p><br></br><p>{rankedStat.wins} Wins / {rankedStat.losses} Losses</p><p>{Math.floor(rankedStat.wins / (rankedStat.wins + rankedStat.losses) * 100)}% Winrate</p></div>
    //         </div>)
    // })}

    return (
        <div className="RankedStats">
            <div className="RankedStatsSolo">
                {ordered[0] && <img src={`https://opgg-static.akamaized.net/images/medals/${ordered[0].tier.toLowerCase()}_${fromRoman(ordered[0].rank)}.png`} alt="Ranked Tier Icon"></img>}
                {!ordered[0] && <img src='http://opgg-static.akamaized.net/images/medals/default.png' alt="Ranked Tier Icon"></img>}
                <div>
                    <p>Ranked Solo Queue</p>
                    {ordered[0] && <p>{ordered[0].tier} {ordered[0].rank} {ordered[0].leaguePoints} LP</p>}<br></br>
                    {ordered[0] && <p>{ordered[0].wins} Wins / {ordered[0].losses} Losses</p>}
                    {ordered[0] && <p>{Math.floor(ordered[0].wins / (ordered[0].wins + ordered[0].losses) * 100)}% Winrate</p>}
                    {!ordered[0] && <p>Unranked</p>}
                </div>
            </div>
            <div className="RankedStatsFlex">
                {ordered[1] && <img src={`https://opgg-static.akamaized.net/images/medals/${ordered[1].tier.toLowerCase()}_${fromRoman(ordered[1].rank)}.png`} alt="Ranked Tier Icon"></img>}
                {!ordered[1] && <img src='http://opgg-static.akamaized.net/images/medals/default.png' alt="Ranked Tier Icon"></img>}
                <div>
                    <p>Ranked Flex Queue</p>
                    {ordered[1] && <p>{ordered[1].tier} {ordered[1].rank} {ordered[1].leaguePoints} LP</p>}<br></br>
                    {ordered[1] && <p>{ordered[1].wins} Wins / {ordered[1].losses} Losses</p>}
                    {ordered[1] && <p>{Math.floor(ordered[1].wins / (ordered[1].wins + ordered[1].losses) * 100)}% Winrate</p>}
                    {!ordered[1] && <p>Unranked</p>}
                </div>
            </div>
            <div className="RankedStatsTft">
                {ordered[2] && <img src={`https://opgg-static.akamaized.net/images/medals/${ordered[2].tier.toLowerCase()}_${fromRoman(ordered[2].rank)}.png`} alt="Ranked Tier Icon"></img>}
                {!ordered[2] && <img src='http://opgg-static.akamaized.net/images/medals/default.png' alt="Ranked Tier Icon"></img>}
                <div>
                    <p>Ranked Teamfight Tactics</p>
                    {ordered[2] && <p>{ordered[2].tier} {ordered[2].rank} {ordered[2].leaguePoints} LP</p>}<br></br>
                    {ordered[2] && <p>{ordered[2].wins} Wins / {ordered[2].losses} Losses</p>}
                    {ordered[2] && <p>{Math.floor(ordered[2].wins / (ordered[2].wins + ordered[2].losses) * 100)}% Winrate</p>}
                    {!ordered[2] && <p>Unranked</p>}
                </div>
            </div>
        </div>
    )
}

export default RankedStats