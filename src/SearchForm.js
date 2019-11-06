import React, { useState } from 'react'

import './SearchForm.css'

import SummonerInfo from './SummonerInfo'
import RankedStats from './RankedStats'
import MatchHistory from './MatchHistory'

import { searchSummonerByName, getgame1 } from './api'
import { searchRankedStats } from './api'
import { getMatchHistory } from './api'
import { getGame } from './api'

const SearchForm = () => {
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('hi')
  const [summoner, setSummoner] = useState([])
  const [rankedStats, setRankedStats] = useState([])
  const [matchHistory, setMatchHistory] = useState([])
  const [matches, setMatches] = useState([])

  const handleQueryChange = event => setQuery(event.target.value)

  const performQuery = async event => {
    event.preventDefault()
    console.log('PERFORMING QUERY...', query)
    setError(null)

    try {
      let promises = []
      const summoner = await searchSummonerByName({
      })
      const rankedStats = await searchRankedStats({
      })
      const matchHistory = await getMatchHistory({
      })
      setSummoner(summoner.data)
      setRankedStats(rankedStats.data)
      setMatchHistory(matchHistory.data)

      matchHistory.data.forEach((match) => {
        promises.push(getGame(match.gameId))
      })
      Promise.all(promises).then((response) => {
        setMatches(response)
      })

    } catch (error) {
      setError('Sorry, but something went wrong.')
    }
  }

  return (
    <form className="SearchForm" onSubmit={performQuery}>
      <input name="query" type="text" placeholder="Enter a Summoner Name" value={query} onChange={handleQueryChange} />

      <div className="ButtonBar">
        <button type="submit" disabled={!query}>Search a Summoner!</button>
      </div>

      <p>{summoner[0] && rankedStats[2] && <SummonerInfo summoner={summoner[0]} rankedStats={rankedStats} />}</p>
      <p>{rankedStats.length === 3 && <RankedStats rankedStats={rankedStats} />}</p>
      <p>{matchHistory.length > 0 && summoner[0] && matches.length === matchHistory.length && <MatchHistory handleQueryChange={handleQueryChange} performQuery={performQuery} matchHistory={matchHistory} summoner={summoner[0]} matches={matches} query={query} setQuery={setQuery} />}</p>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

    </form>
  )
}

export default SearchForm
