import React from 'react'
import championJson from './champion.json'
import { getGame } from './api'

import './MatchHistory.css'

const MatchHistory = props => {
    const { matchHistory } = props
    const { summoner } = props
    const { game1 } = props
    const { matches } = props

    console.log('history', matches)
    let championKeyArray = []
    let championNameArray = []
    let championTileArray = []
    let playerIdArray = []
    let itemArray = []
    let playerId = 7;

    matches.forEach((game, index) => {

        let championKeys = []
        let championNames = []
        let championTiles = []
        let items = []

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

        items = [
            `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${game.data[0].participants[playerIdArray[index]].stats.item0}.png`,
            `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${game.data[0].participants[playerIdArray[index]].stats.item1}.png`,
            `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${game.data[0].participants[playerIdArray[index]].stats.item2}.png`,
            `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${game.data[0].participants[playerIdArray[index]].stats.item3}.png`,
            `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${game.data[0].participants[playerIdArray[index]].stats.item4}.png`,
            `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${game.data[0].participants[playerIdArray[index]].stats.item5}.png`,
        ]
        itemArray.push(items)
    })

    const allMatches = matches.map((match, index) => {
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
                    {`${match.data[0].participants[playerIdArray[index]].stats.deaths == 0 ? 'Perfect' : ((game1.participants[playerIdArray[index]].stats.kills + match.data[0].participants[playerIdArray[index]].stats.assists) / match.data[0].participants[playerIdArray[index]].stats.deaths).toFixed(1)} KDA`}
                </div>
                <div className="Items">
                    <img src={match.data[0].participants[playerIdArray[index]].stats.item0 == 0 ? null : itemArray[index][0]}></img>
                    <img src={match.data[0].participants[playerIdArray[index]].stats.item1 == 0 ? null : itemArray[index][1]}></img>
                    <img src={match.data[0].participants[playerIdArray[index]].stats.item2 == 0 ? null : itemArray[index][2]}></img>
                    <img src={match.data[0].participants[playerIdArray[index]].stats.item3 == 0 ? null : itemArray[index][3]}></img>
                    <img src={match.data[0].participants[playerIdArray[index]].stats.item4 == 0 ? null : itemArray[index][4]}></img>
                    <img src={match.data[0].participants[playerIdArray[index]].stats.item5 == 0 ? null : itemArray[index][5]}></img>
                </div>
                <div className="Participants">
                    <div className="Team1">
                        <img src={championTileArray[index][0]}></img>
                        <div>{match.data[0].participantIdentities[0].player.summonerName}</div>
                        <img src={championTileArray[index][1]}></img>
                        <div>{match.data[0].participantIdentities[1].player.summonerName}</div>
                        <img src={championTileArray[index][2]}></img>
                        <div>{match.data[0].participantIdentities[2].player.summonerName}</div>
                        <img src={championTileArray[index][3]}></img>
                        <div>{match.data[0].participantIdentities[3].player.summonerName}</div>
                        <img src={championTileArray[index][4]}></img>
                        <div>{match.data[0].participantIdentities[4].player.summonerName}</div>

                    </div>
                    <div className="Team2">
                        <img src={championTileArray[index][5]}></img>
                        <div>{match.data[0].participantIdentities[5].player.summonerName}</div>
                        <img src={championTileArray[index][6]}></img>
                        <div>{match.data[0].participantIdentities[6].player.summonerName}</div>
                        <img src={championTileArray[index][7]}></img>
                        <div>{match.data[0].participantIdentities[7].player.summonerName}</div>
                        <img src={championTileArray[index][8]}></img>
                        <div>{match.data[0].participantIdentities[8].player.summonerName}</div>
                        <img src={championTileArray[index][9]}></img>
                        <div>{match.data[0].participantIdentities[9].player.summonerName}</div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="MatchHistory">
            <div className="TitleBox">
                Match History
            </div>
            <div className="GameList">
                {allMatches}
            </div>
        </div>
    )
}

export default MatchHistory