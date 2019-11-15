import React, { useState } from 'react'
import './SearchForm.css'

/*--------------------------------------------------------------
Switching between Riot API data and Mock data: (default is Riot API data)
change the file named "mock.js" to "api.js" to switch to mock data
---------------------------------------------------------------*/

import SummonerInfo from './SummonerInfo'
import RankedStats from './RankedStats'
import MatchHistory from './MatchHistory'

import { searchSummonerByName } from './api'
import { searchRankedStats } from './api'
import { getMatchHistory } from './api'
import { getGame } from './api'

const SearchForm = () => {
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [summoner, setSummoner] = useState([])
  const [rankedStats, setRankedStats] = useState([])
  const [matchHistory, setMatchHistory] = useState([])
  const [matches, setMatches] = useState([])

  const handleQueryChange = event => setQuery(event.target.value)

  const performQuery = async event => {
    event.preventDefault()
    setError(null)
    setQuery('')
    setSummoner([])
    setMatchHistory([])
    setRankedStats([])
    setMatches([])

    try {
      let promises = []

      const summoner = await searchSummonerByName(query.toLowerCase())
      const rankedStats = await searchRankedStats(summoner.id)
      const matchHistory = await getMatchHistory(summoner.accountId)

      setSummoner(summoner)
      setRankedStats(rankedStats)
      setMatchHistory(matchHistory)

      matchHistory.matches.forEach((match) => {
        promises.push(getGame(match.gameId))
      })
      Promise.all(promises).then((response) => {
        setMatches(response)
      })
    } catch (error) {
      setError('This Summoner does not exist in the NA region or too many requests were sent')
    }
  }

  return (
    <form className="SearchForm" onSubmit={performQuery}>
      <input name="query" type="text" placeholder="Enter a Summoner Name" value={query} onChange={handleQueryChange} />

      <div className="ButtonBar">
        <button type="submit" disabled={!query}>Search a Summoner!</button>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {summoner.id && <div className="SummonerInfo">{<SummonerInfo summoner={summoner} rankedStats={rankedStats} />}</div>}
      {summoner.id && <div className="RankedStats">{<RankedStats rankedStats={rankedStats} />}</div>}
      {summoner.id && rankedStats[0] && matchHistory.matches && matches && <div className="MatchHistory">{<MatchHistory handleQueryChange={handleQueryChange} performQuery={performQuery} matchHistory={matchHistory.matches} summoner={summoner} matches={matches} query={query} setQuery={setQuery} />}</div>}

    </form>
  )
}

export default SearchForm
