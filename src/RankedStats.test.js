import React from 'react'
import ReactDOM from 'react-dom'
import TestRenderer from 'react-test-renderer'
import ReactTestUtils from 'react-dom/test-utils'

import sinon from 'sinon'

import RankedStats from './RankedStats'

import * as mock from './mock'

it('ranked stats renders', () => {
    let rankedStats = [{
        "leagueId": "d42df200-3018-11e9-9bdb-c81f66cf135e",
        "queueType": "RANKED_SOLO_5x5",
        "tier": "CHALLENGER",
        "rank": "I",
        "summonerId": "NtW1fFWiqG2Nqw5fo1NaUeI4ouvXXcHFT4hz6VsrEy5eSsE",
        "summonerName": "MyAir",
        "leaguePoints": 64,
        "wins": 4,
        "losses": 20,
        "veteran": false,
        "inactive": false,
        "freshBlood": false,
        "hotStreak": false
    }]

    const component = TestRenderer.create(<RankedStats rankedStats={rankedStats} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})