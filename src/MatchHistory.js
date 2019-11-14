import React from 'react'
import championJson from './champion.json'

import './MatchHistory.css'

// let championKeyArray = []
// let championNameArray = []
// let championTileArray = []
// let playerIdArray = []

const MatchHistory = props => {

    const { summoner } = props
    const { matches } = props
    const { query } = props
    const { setQuery } = props
    const { performQuery } = props

    let championKeyArray = []
    let championNameArray = []
    let championTileArray = []
    let playerIdArray = []

    matches.forEach((game) => {

        let championKeys = []
        let championNames = []
        let championTiles = []
        //console.log('game', game)
        //console.log('summoner', summoner)

        game.participantIdentities.forEach((participant, index) => {
            //console.log(game.participantIdentities)
            //console.log('help', participant.player.summonerName === summoner.name, participant.player.summonerName, summoner.name)
            if (participant.player.summonerName === summoner.name) {
                playerIdArray.push(index)
            }
        })
        //console.log('id', playerIdArray)

        game.participants.forEach((player) => {
            championKeys.push(player.championId)
        })
        championKeyArray.push(championKeys)
        //console.log('keys', championKeyArray)

        championKeys.forEach((championKey) => {
            for (let champion in championJson.data) {
                if (championJson.data[champion].key == championKey) {
                    championNames.push(championJson.data[champion].id)
                }
            }
        })
        championNameArray.push(championNames)
        //console.log('names', championNameArray)

        championNames.forEach((champion, namesIndex) => {
            championTiles.push(`http://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/${championNames[namesIndex]}.png`)
        })
        championTileArray.push(championTiles)
        //console.log('tile', championTileArray)
    })

    //useEffect(() => performQuery, [query])




    return (
        <div className="MatchHistory">
            <div className="TitleBox">
                Match History
            </div>
            <div className="GameList">
                {matches.map((match, index) => {
                    return (
                        <div className="Game">
                            <div className={match.participants[playerIdArray[index]].stats.win ? 'Victory' : 'Defeat'}>
                                <p>{match.gameMode}</p>
                                {match.participants[playerIdArray[index]].stats.win ? 'Victory' : 'Defeat'}
                                <div className="GameTime">
                                    {`${Math.floor(match.gameDuration / 60)}:${match.gameDuration % 60 >= 10 ? match.gameDuration % 60 : '0'.concat(match.gameDuration % 60)}`}
                                </div>
                            </div>
                            <div className="ChampionTile">
                                <img src={championTileArray[index][playerIdArray[index]]}></img>
                            </div>
                            <div className="KDA">
                                {`${match.participants[playerIdArray[index]].stats.kills} / ${match.participants[playerIdArray[index]].stats.deaths} / ${match.participants[playerIdArray[index]].stats.assists}`}
                                <br></br>
                                {`${match.participants[playerIdArray[index]].stats.deaths === 0 ? 'Perfect' : ((match.participants[playerIdArray[index]].stats.kills + match.participants[playerIdArray[index]].stats.assists) / match.participants[playerIdArray[index]].stats.deaths).toFixed(1)} KDA`}
                            </div>
                            <div className="Items">
                                {Object.keys(match.participants[playerIdArray[index]].stats).filter(item => item.startsWith('item')).slice(0, 6).map((item) => {
                                    return (
                                        <img src={match.participants[playerIdArray[index]].stats[item] === 0 ? null : `http://ddragon.leagueoflegends.com/cdn/9.22.1/img/item/${match.participants[playerIdArray[index]].stats[item]}.png`}></img>
                                    )
                                })}
                                <div className="Trinket">
                                    <img src={match.participants[playerIdArray[index]].stats.item6 === 0 ? null : `http://ddragon.leagueoflegends.com/cdn/9.22.1/img/item/${match.participants[playerIdArray[index]].stats.item6}.png`}></img>
                                </div>
                            </div>
                            <div className="Participants">
                                <div className="Team1">
                                    {match.participantIdentities.slice(0, match.participantIdentities.length / 2).map((participant, participantIndex) => {
                                        return (
                                            <div className="player">
                                                <img src={championTileArray[index][participantIndex]}></img>
                                                <div /*onMouseEnter={() => setQuery(match.participantIdentities[participantIndex].player.summonerName)} onClick={performQuery} */>{participant.player.summonerName}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="Team2">
                                    {match.participantIdentities.slice(match.participantIdentities.length / 2, match.participantIdentities.length).map((participant, participantIndex) => {
                                        return (
                                            <div className="player">
                                                <img src={championTileArray[index][participantIndex + match.participantIdentities.length / 2]}></img>
                                                <div /*onMouseEnter={() => setQuery(match.participantIdentities[participantIndex + match.participantIdentities.length / 2].player.summonerName)} onClick={performQuery}*/>{participant.player.summonerName}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="Button">
                                <button type="button" disabled={!query}>Expand</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default MatchHistory

