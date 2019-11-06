import React, { useState } from 'react'
import championJson from './champion.json'
import handleQueryChange from './SearchForm.js'
import performQuery from './SearchForm.js'

import './MatchHistory.css'

const MatchHistory = props => {

    const { matchHistory } = props
    const { summoner } = props
    const { matches } = props
    const { query } = props
    const { setQuery } = props
    const { handleQueryChange } = props
    const { performQuery } = props

    let championKeyArray = []
    let championNameArray = []
    let championTileArray = []
    let playerIdArray = []
    let itemList;

    matches.forEach((game, index) => {

        let championKeys = []
        let championNames = []
        let championTiles = []

        game.data[0].participantIdentities.forEach((participant, index) => {
            if (participant.player.summonerName == summoner.name) {
                playerIdArray.push(index)
            }
        })

        game.data[0].participants.forEach((player) => {
            championKeys.push(player.championId)
        })
        championKeyArray.push(championKeys)

        championKeys.forEach((championKey) => {
            for (let champion in championJson.data) {
                if (championJson.data[champion].key == championKey) {
                    championNames.push(championJson.data[champion].id)
                }
            }
        })
        championNameArray.push(championNames)

        championNames.forEach((champion, namesIndex) => {
            championTiles.push(`http://ddragon.leagueoflegends.com/cdn/9.21.1/img/champion/${championNames[namesIndex]}.png`)
        })
        championTileArray.push(championTiles)

    })


    return (
        <div className="MatchHistory">
            <div className="TitleBox">
                Match History
            </div>
            <div className="GameList">
                {matches.map((match, index) => {
                    return (
                        <div className="Game">
                            <div className="Outcome">
                                {match.data[0].participants[playerIdArray[index]].stats.win ? 'Victory' : 'Defeat'}
                                <div className="GameTime">
                                    {`${Math.floor(match.data[0].gameDuration / 60)}:${match.data[0].gameDuration % 60}`}
                                </div>
                            </div>
                            <div className="ChampionTile">
                                <img src={championTileArray[index][playerIdArray[index]]}></img>
                            </div>
                            <div className="KDA">
                                {`${match.data[0].participants[playerIdArray[index]].stats.kills} / ${match.data[0].participants[playerIdArray[index]].stats.deaths} / ${match.data[0].participants[playerIdArray[index]].stats.assists}`}
                                <br></br>
                                {`${match.data[0].participants[playerIdArray[index]].stats.deaths == 0 ? 'Perfect' : ((match.data[0].participants[playerIdArray[index]].stats.kills + match.data[0].participants[playerIdArray[index]].stats.assists) / match.data[0].participants[playerIdArray[index]].stats.deaths).toFixed(1)} KDA`}
                            </div>
                            <div className="Items">
                                {Object.keys(match.data[0].participants[playerIdArray[index]].stats).filter(item => item.startsWith('item')).slice(0, 6).map((item) => {
                                    return (
                                        <img src={match.data[0].participants[playerIdArray[index]].stats[item] == 0 ? null : `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${match.data[0].participants[playerIdArray[index]].stats[item]}.png`}></img>
                                    )
                                })}
                                <div className="Trinket">
                                    <img src={match.data[0].participants[playerIdArray[index]].stats.item6 == 0 ? null : `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${match.data[0].participants[playerIdArray[index]].stats.item6}.png`}></img>
                                </div>
                            </div>
                            <div className="Participants">
                                <div className="Team1">
                                    {match.data[0].participantIdentities.slice(0, match.data[0].participantIdentities.length / 2).map((participant, participantIndex) => {
                                        return (
                                            <div className="player">
                                                <img src={championTileArray[index][participantIndex]}></img>
                                                <div onClick={() => setQuery(match.data[0].participantIdentities[participantIndex].player.summonerName)} onClick={() => performQuery}>{participant.player.summonerName}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="Team2">
                                    {match.data[0].participantIdentities.slice(match.data[0].participantIdentities.length / 2, match.data[0].participantIdentities.length).map((participant, participantIndex) => {
                                        return (
                                            <div className="player">
                                                <img src={championTileArray[index][participantIndex + match.data[0].participantIdentities.length / 2]}></img>
                                                <div onClick={() => setQuery(match.data[0].participantIdentities[participantIndex].player.summonerName)} onClick={performQuery}>{participant.player.summonerName}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default MatchHistory

