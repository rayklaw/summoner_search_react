import React, { useState } from 'react'

import './SearchForm.css'

import SearchResults from './SearchResults'
import SummonerInfo from './SummonerInfo'
import RankedStats from './RankedStats'
import MatchHistory from './MatchHistory'

import { searchSummonerByName, getgame1 } from './api'
import { searchRankedStats } from './api'
import { getMatchHistory } from './api'
import { getGame1 } from './api'
import { getGame2 } from './api'
import { getGame3 } from './api'


const SearchForm = () => {
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('hi')
  const [summoner, setSummoner] = useState([])
  const [rankedStats, setRankedStats] = useState([])
  const [matchHistory, setMatchHistory] = useState([])
  const [game1, setGame1] = useState([])
  const [games, setGames] = useState([])
  const [game2, setGame2] = useState([])
  const [game3, setGame3] = useState([])

  const handleQueryChange = event => setQuery(event.target.value)

  const performQuery = async event => {
    event.preventDefault()

    setError(null)

    try {
      const summoner = await searchSummonerByName({
      })
      const rankedStats = await searchRankedStats({
      })
      const matchHistory = await getMatchHistory({
      })
      const game1 = await getGame1({
      })
      //const game2 = await getGame2({})
      //const game3 = await getGame3({})
      setSummoner(summoner.data)
      setRankedStats(rankedStats.data)
      setMatchHistory(matchHistory.data)
      setGame1(game1.data)
      //matchHistory.forEach((game) => { })
      //setGame2(game2.data)
      //setGame3(game3.data)
    } catch (error) {
      setError('Sorry, but something went wrong.')
    }
  }

  return (
    <form className="SearchForm" onSubmit={performQuery}>
      <p>Enter a Summoner Name:</p>
      <input name="query" type="text" value={query} onChange={handleQueryChange} />

      <div className="ButtonBar">
        <button type="submit" disabled={!query}>Search a Summoner!</button>
      </div>

      <p>{summoner[0] && rankedStats[2] && <SummonerInfo summoner={summoner[0]} rankedStats={rankedStats} />}</p>
      <p>{rankedStats.length === 3 && <RankedStats rankedStats={rankedStats} />}</p>
      <p>{matchHistory.length > 0 && summoner[0] && game1[0] && <MatchHistory matchHistory={matchHistory} summoner={summoner[0]} game1={game1[0]} game2={game2[0]} game3={game3[0]} query={query} />}</p>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

    </form>
  )
}

export default SearchForm
