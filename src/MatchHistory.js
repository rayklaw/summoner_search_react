import React from 'react'
import championJson from './champion.json'

import './MatchHistory.css'

const MatchHistory = props => {
    const { matchHistory } = props
    const { summoner } = props
    const { game1 } = props

    let championKeyArray = []
    let championNameArray = []
    let championTileArray = []
    let playerId;

    game1.participantIdentities.forEach((participant, index) => {
        if (participant.player.summonerName == summoner.name) {
            playerId = index
        }
    })

    game1.participants.forEach((player) => {
        championKeyArray.push(player.championId)
    })

    championKeyArray.forEach((championKey) => {
        for (let champion in championJson.data) {
            if (championJson.data[champion].key == championKey) {
                championNameArray.push(championJson.data[champion].id)
            }
        }
    })

    championNameArray.forEach((champion, index) => {
        championTileArray.push(`http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${championNameArray[index]}_0.jpg`)
    })

    let itemArray = [
        `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${game1.participants[playerId].stats.item0}.png`,
        `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${game1.participants[playerId].stats.item1}.png`,
        `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${game1.participants[playerId].stats.item2}.png`,
        `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${game1.participants[playerId].stats.item3}.png`,
        `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${game1.participants[playerId].stats.item4}.png`,
        `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${game1.participants[playerId].stats.item5}.png`,
    ]

    return (
        <div className="MatchHistory">
            <div className="TitleBox">
                Match History
            </div>
            <div className="GameList">
                <div className="Game">
                    <div className="Outcome">
                        {game1.participants[playerId].stats.win ? 'Victory' : 'Defeat'}
                        <div className="GameTime">
                            {`${Math.floor(game1.gameDuration / 60)}:${game1.gameDuration % 60}`}
                        </div>
                    </div>
                    <div className="ChampionTile">
                        <img src={championTileArray[playerId]}></img>
                    </div>
                    <div className="KDA">
                        {`${game1.participants[playerId].stats.kills} / ${game1.participants[playerId].stats.deaths} / ${game1.participants[playerId].stats.assists}`}
                        <br></br>
                        {`${game1.participants[playerId].stats.deaths == 0 ? 'Perfect' : ((game1.participants[playerId].stats.kills + game1.participants[playerId].stats.assists) / game1.participants[playerId].stats.deaths).toFixed(1)} KDA`}
                    </div>
                    <div className="Items">
                        <img src={game1.participants[playerId].stats.item0 == 0 ? null : itemArray[0]}></img>
                        <img src={game1.participants[playerId].stats.item1 == 0 ? null : itemArray[1]}></img>
                        <img src={game1.participants[playerId].stats.item2 == 0 ? null : itemArray[2]}></img>
                        <img src={game1.participants[playerId].stats.item3 == 0 ? null : itemArray[3]}></img>
                        <img src={game1.participants[playerId].stats.item4 == 0 ? null : itemArray[4]}></img>
                        <img src={game1.participants[playerId].stats.item5 == 0 ? null : itemArray[5]}></img>
                    </div>
                    <div className="Participants">
                        <div className="Team1">
                            <img src={championTileArray[0]}></img>
                            <div>{game1.participantIdentities[0].player.summonerName}</div>
                            <img src={championTileArray[1]}></img>
                            <div>{game1.participantIdentities[1].player.summonerName}</div>
                            <img src={championTileArray[2]}></img>
                            <div>{game1.participantIdentities[2].player.summonerName}</div>
                            <img src={championTileArray[3]}></img>
                            <div>{game1.participantIdentities[3].player.summonerName}</div>
                            <img src={championTileArray[4]}></img>
                            <div>{game1.participantIdentities[4].player.summonerName}</div>

                        </div>
                        <div className="Team2">
                            <img src={championTileArray[5]}></img>
                            <div>{game1.participantIdentities[5].player.summonerName}</div>
                            <img src={championTileArray[6]}></img>
                            <div>{game1.participantIdentities[6].player.summonerName}</div>
                            <img src={championTileArray[7]}></img>
                            <div>{game1.participantIdentities[7].player.summonerName}</div>
                            <img src={championTileArray[8]}></img>
                            <div>{game1.participantIdentities[8].player.summonerName}</div>
                            <img src={championTileArray[9]}></img>
                            <div>{game1.participantIdentities[9].player.summonerName}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchHistory