import React from 'react'
import ReactDOM from 'react-dom'
import TestRenderer from 'react-test-renderer'
import ReactTestUtils from 'react-dom/test-utils'

import sinon from 'sinon'

import SummonerInfo from './SummonerInfo'

import * as mock from './mock'

it('summoner info renders', () => {
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
    let summoner = {
        "id": "bJ3fnl4axekkZNRW8i0r-DzCOltAQCMilbmhHFPo-HL-dkE",
        "accountId": "_ETokaUkycTk1_xuYLmiMaE8mGl0GQUihhMWSDmW7WNk2g",
        "puuid": "eVRErZLpnKEFBUEVLcMuAh9QmhJ_lWPjIpYjosFjCgu18Ikz_1czfw5QIWadEao2610GsbwkUar8_g",
        name: "MyAir",
        profileIconId: 588,
        revisionDate: 1571275176000,
        summonerLevel: 98
    }
    const component = TestRenderer.create(<SummonerInfo rankedStats={rankedStats} summoner={summoner} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})