import React, { useState } from 'react'

import './SearchForm.css'

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

    try {
      console.log('PERFORMING QUERY...', query)
      let promises = []
      let promises2 = []
      // const summoner = await searchSummonerByName(query.toLowerCase())
      // //console.log('summoner', summoner)
      // const rankedStats = await searchRankedStats(summoner.id)
      // //console.log('rankedstats', rankedStats)
      // const matchHistory = await getMatchHistory(summoner.accountId)
      // //console.log('matchHistory', matchHistory)
      // setSummoner(summoner)
      // setRankedStats(rankedStats)
      // setMatchHistory(matchHistory)
      searchSummonerByName(query.toLowerCase()).then(async summoner => {
        console.log('summoner1', summoner)

        const rankedStats = await searchRankedStats(summoner.id)
        console.log('ranked', rankedStats)

        getMatchHistory(summoner.accountId).then(async matchHistory => {
          console.log('match', matchHistory)

          matchHistory.matches.forEach((match) => {
            promises.push(getGame(match.gameId))
          })
          Promise.all(promises).then((games) => {
            setSummoner(summoner)
            setMatchHistory(matchHistory)
            setMatches(games)
            setRankedStats(rankedStats)


            console.log('games', games)
          })

        })

      })

      // matchHistory.matches.forEach((match) => {
      //   promises.push(getGame(match.gameId))
      // })
      // Promise.all(promises).then((response) => {
      //   setMatches(response)
      // })

    } catch (error) {
      console.log(error)
      setError('Sorry, but something went wrong.')
    }
  }

  /*
    useEffect(() => simulateClick(), [query])
    ref={simulateClick}
  */
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

      {console.log('matches', matches)}
      {console.log('ranked', rankedStats)}
      {console.log('summoner', summoner)}

      {summoner.id && rankedStats && <div className="SummonerInfo">{<SummonerInfo summoner={summoner} rankedStats={rankedStats} />}</div>}
      {summoner.id && rankedStats && <div className="RankedStats">{<RankedStats rankedStats={rankedStats} />}</div>}
      {summoner.id && matchHistory.matches && matches && <div className="MatchHistory">{<MatchHistory handleQueryChange={handleQueryChange} performQuery={performQuery} matchHistory={matchHistory.matches} summoner={summoner} matches={matches} query={query} setQuery={setQuery} />}</div>}

    </form>
  )
}

export default SearchForm
