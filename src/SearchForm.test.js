import React from 'react'
import ReactDOM from 'react-dom'
import TestRenderer from 'react-test-renderer'
import ReactTestUtils from 'react-dom/test-utils'

import sinon from 'sinon'

import SearchForm from './SearchForm'

import * as mock from './mock'

// This test suite uses a distinct testing technique called _snapshot testing_. Go take
// a peek at the code then come back here for more commentary.
//
// Note how, with snapshot testing, you are truly dependent on that descriptive text.
// The enforcement is in the snapshot match, not a condition that is in the test code.
// This is where snapshot testing differs from traditional test-driven development:
// _It assumes that the code works initially._ This actually does line up fairly well
// with user interface development, because it tends to be easier to just “eyeball” a
// user interface first rather than write tests against it.
//
// It takes some adjustment to start “trusting” a snapshot test, just as it takes some
// adjustment to trust version control. If you want to manually check whether a snapshot
// is truly in the state that you want it to be, you can always look at the .snap file
// within the __snapshots__ folder.
//
// Handy reference:
// https://semaphoreci.com/community/tutorials/snapshot-testing-react-components-with-jest
//
it('should start with an empty search field', () => {
  const component = TestRenderer.create(<SearchForm />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('should start with a disabled search button', () => {
  const component = TestRenderer.create(<SearchForm />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

describe('search button', () => {
  let div
  beforeEach(() => {
    div = document.createElement('div')
    ReactTestUtils.act(() => {
      ReactDOM.render(<SearchForm />, div)
    })
  })

  afterEach(() => ReactDOM.unmountComponentAtNode(div))

  it('should be enabled when the search field is not blank', () => {
    const searchInput = div.querySelector('input')
    ReactTestUtils.act(() => {
      searchInput.value = 'i can haz unit tests'
      ReactTestUtils.Simulate.change(searchInput)
    })

    const searchButton = div.querySelector('button')
    expect(searchButton.disabled).toBe(false)
  })

  it('should be disabled when the search field is blank', () => {
    const searchInput = div.querySelector('input')
    ReactTestUtils.act(() => {
      searchInput.value = ''
      ReactTestUtils.Simulate.change(searchInput)
    })

    const searchButton = div.querySelector('button')
    expect(searchButton.disabled).toBe(true)
  })
})

// Helper function for the next two test collections.
const setupAndQuerySearchForm = async () => {
  const div = document.createElement('div')
  ReactTestUtils.act(() => {
    ReactDOM.render(<SearchForm />, div)
  })

  const searchInput = div.querySelector('input')
  ReactTestUtils.act(() => {
    searchInput.value = 'myair'
    ReactTestUtils.Simulate.change(searchInput)
  })

  const searchForm = div.querySelector('form')
  await ReactTestUtils.act(async () => {
    await ReactTestUtils.Simulate.submit(searchForm)
  })

  return div
}

describe('API calls', () => {
  let div
  beforeEach(async () => {
    sinon.stub(mock, 'searchSummonerByName')

    // To manage size, we supply a mock response that contains _only_ what the app will need. This does mean
    // that we need to revise the mock response if our app starts using more (or different) data.
    mock.searchSummonerByName.returns(Promise.resolve({
      "id": "bJ3fnl4axekkZNRW8i0r-DzCOltAQCMilbmhHFPo-HL-dkE",
      "accountId": "_ETokaUkycTk1_xuYLmiMaE8mGl0GQUihhMWSDmW7WNk2g",
      "puuid": "eVRErZLpnKEFBUEVLcMuAh9QmhJ_lWPjIpYjosFjCgu18Ikz_1czfw5QIWadEao2610GsbwkUar8_g",
      name: "MyAir",
      profileIconId: 588,
      revisionDate: 1571275176000,
      summonerLevel: 98
    }))

    sinon.stub(mock, 'searchRankedStats')
    mock.searchRankedStats.returns(Promise.resolve(
      {
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
      }
    ))

    sinon.stub(mock, 'getMatchHistory')
    mock.getMatchHistory.returns(Promise.resolve({
      "platformId": "NA1",
      "gameId": 3176158088,
      "champion": 246,
      "queue": 420,
      "season": 13,
      "timestamp": 1571273254480,
      "role": "DUO",
      "lane": "MID"
    }
    ))

    sinon.stub(mock, 'getGame')
    mock.getGame.returns(Promise.resolve({
      "gameId": 3176158088,
      "platformId": "NA1",
      "gameCreation": 1571273254480,
      "gameDuration": 1676,
      "queueId": 420,
      "mapId": 11,
      "seasonId": 13,
      "gameVersion": "9.20.292.2452",
      "gameMode": "CLASSIC",
      "gameType": "MATCHED_GAME",
      "teams": [
        {
          "teamId": 100,
          "win": "Win",
          "firstBlood": true,
          "firstTower": false,
          "firstInhibitor": true,
          "firstBaron": true,
          "firstDragon": false,
          "firstRiftHerald": true,
          "towerKills": 9,
          "inhibitorKills": 2,
          "baronKills": 1,
          "dragonKills": 2,
          "vilemawKills": 0,
          "riftHeraldKills": 1,
          "dominionVictoryScore": 0,
          "bans": [
            {
              "championId": 91,
              "pickTurn": 1
            },
            {
              "championId": 142,
              "pickTurn": 2
            },
            {
              "championId": 59,
              "pickTurn": 3
            },
            {
              "championId": 157,
              "pickTurn": 4
            },
            {
              "championId": 24,
              "pickTurn": 5
            }
          ]
        },
        {
          "teamId": 200,
          "win": "Fail",
          "firstBlood": false,
          "firstTower": true,
          "firstInhibitor": false,
          "firstBaron": false,
          "firstDragon": true,
          "firstRiftHerald": false,
          "towerKills": 2,
          "inhibitorKills": 0,
          "baronKills": 0,
          "dragonKills": 1,
          "vilemawKills": 0,
          "riftHeraldKills": 0,
          "dominionVictoryScore": 0,
          "bans": [
            {
              "championId": 107,
              "pickTurn": 6
            },
            {
              "championId": 24,
              "pickTurn": 7
            },
            {
              "championId": -1,
              "pickTurn": 8
            },
            {
              "championId": 555,
              "pickTurn": 9
            },
            {
              "championId": 111,
              "pickTurn": 10
            }
          ]
        }
      ],
      "participants": [
        {
          "participantId": 1,
          "teamId": 100,
          "championId": 23,
          "spell1Id": 4,
          "spell2Id": 14,
          "stats": {
            "participantId": 1,
            "win": true,
            "item0": 1018,
            "item1": 3006,
            "item2": 3508,
            "item3": 3101,
            "item4": 3124,
            "item5": 1037,
            "item6": 3340,
            "kills": 5,
            "deaths": 5,
            "assists": 1,
            "largestKillingSpree": 3,
            "largestMultiKill": 1,
            "killingSprees": 2,
            "longestTimeSpentLiving": 579,
            "doubleKills": 0,
            "tripleKills": 0,
            "quadraKills": 0,
            "pentaKills": 0,
            "unrealKills": 0,
            "totalDamageDealt": 152628,
            "magicDamageDealt": 482,
            "physicalDamageDealt": 140089,
            "trueDamageDealt": 12056,
            "largestCriticalStrike": 572,
            "totalDamageDealtToChampions": 13719,
            "magicDamageDealtToChampions": 96,
            "physicalDamageDealtToChampions": 12893,
            "trueDamageDealtToChampions": 730,
            "totalHeal": 6918,
            "totalUnitsHealed": 1,
            "damageSelfMitigated": 16871,
            "damageDealtToObjectives": 16014,
            "damageDealtToTurrets": 8734,
            "visionScore": 12,
            "timeCCingOthers": 4,
            "totalDamageTaken": 26036,
            "magicalDamageTaken": 9180,
            "physicalDamageTaken": 15714,
            "trueDamageTaken": 1142,
            "goldEarned": 11480,
            "goldSpent": 10500,
            "turretKills": 2,
            "inhibitorKills": 0,
            "totalMinionsKilled": 170,
            "neutralMinionsKilled": 20,
            "neutralMinionsKilledTeamJungle": 0,
            "neutralMinionsKilledEnemyJungle": 16,
            "totalTimeCrowdControlDealt": 27,
            "champLevel": 15,
            "visionWardsBoughtInGame": 1,
            "sightWardsBoughtInGame": 0,
            "wardsPlaced": 6,
            "wardsKilled": 3,
            "firstBloodKill": false,
            "firstBloodAssist": false,
            "firstTowerKill": false,
            "firstTowerAssist": false,
            "firstInhibitorKill": false,
            "firstInhibitorAssist": false,
            "combatPlayerScore": 0,
            "objectivePlayerScore": 0,
            "totalPlayerScore": 0,
            "totalScoreRank": 0,
            "playerScore0": 0,
            "playerScore1": 0,
            "playerScore2": 0,
            "playerScore3": 0,
            "playerScore4": 0,
            "playerScore5": 0,
            "playerScore6": 0,
            "playerScore7": 0,
            "playerScore8": 0,
            "playerScore9": 0,
            "perk0": 8008,
            "perk0Var1": 1,
            "perk0Var2": 0,
            "perk0Var3": 0,
            "perk1": 9111,
            "perk1Var1": 721,
            "perk1Var2": 120,
            "perk1Var3": 0,
            "perk2": 9103,
            "perk2Var1": 0,
            "perk2Var2": 0,
            "perk2Var3": 0,
            "perk3": 8299,
            "perk3Var1": 913,
            "perk3Var2": 0,
            "perk3Var3": 0,
            "perk4": 8275,
            "perk4Var1": 7,
            "perk4Var2": 0,
            "perk4Var3": 0,
            "perk5": 8210,
            "perk5Var1": 0,
            "perk5Var2": 0,
            "perk5Var3": 0,
            "perkPrimaryStyle": 8000,
            "perkSubStyle": 8200,
            "statPerk0": 5005,
            "statPerk1": 5008,
            "statPerk2": 5003
          },
          "timeline": {
            "participantId": 1,
            "creepsPerMinDeltas": {
              "10-20": 6.699999999999999,
              "0-10": 6.6
            },
            "xpPerMinDeltas": {
              "10-20": 484,
              "0-10": 460.8
            },
            "goldPerMinDeltas": {
              "10-20": 426.6,
              "0-10": 260.8
            },
            "csDiffPerMinDeltas": {
              "10-20": 1.2999999999999998,
              "0-10": -0.49999999999999956
            },
            "xpDiffPerMinDeltas": {
              "10-20": 3.6000000000000227,
              "0-10": 27.80000000000001
            },
            "damageTakenPerMinDeltas": {
              "10-20": 1086.5,
              "0-10": 581.0999999999999
            },
            "damageTakenDiffPerMinDeltas": {
              "10-20": 176.39999999999992,
              "0-10": 216.09999999999997
            },
            "role": "SOLO",
            "lane": "TOP"
          }
        },
        {
          "participantId": 2,
          "teamId": 100,
          "championId": 350,
          "spell1Id": 3,
          "spell2Id": 14,
          "stats": {
            "participantId": 2,
            "win": true,
            "item0": 3041,
            "item1": 3107,
            "item2": 3098,
            "item3": 3504,
            "item4": 3174,
            "item5": 0,
            "item6": 3364,
            "kills": 8,
            "deaths": 3,
            "assists": 11,
            "largestKillingSpree": 3,
            "largestMultiKill": 2,
            "killingSprees": 2,
            "longestTimeSpentLiving": 497,
            "doubleKills": 1,
            "tripleKills": 0,
            "quadraKills": 0,
            "pentaKills": 0,
            "unrealKills": 0,
            "totalDamageDealt": 23467,
            "magicDamageDealt": 17817,
            "physicalDamageDealt": 2902,
            "trueDamageDealt": 2747,
            "largestCriticalStrike": 0,
            "totalDamageDealtToChampions": 13464,
            "magicDamageDealtToChampions": 11184,
            "physicalDamageDealtToChampions": 1146,
            "trueDamageDealtToChampions": 1134,
            "totalHeal": 9223,
            "totalUnitsHealed": 9,
            "damageSelfMitigated": 4985,
            "damageDealtToObjectives": 2835,
            "damageDealtToTurrets": 2835,
            "visionScore": 38,
            "timeCCingOthers": 13,
            "totalDamageTaken": 10499,
            "magicalDamageTaken": 1185,
            "physicalDamageTaken": 8262,
            "trueDamageTaken": 1052,
            "goldEarned": 10154,
            "goldSpent": 9050,
            "turretKills": 1,
            "inhibitorKills": 0,
            "totalMinionsKilled": 15,
            "neutralMinionsKilled": 0,
            "neutralMinionsKilledTeamJungle": 0,
            "neutralMinionsKilledEnemyJungle": 0,
            "totalTimeCrowdControlDealt": 40,
            "champLevel": 14,
            "visionWardsBoughtInGame": 2,
            "sightWardsBoughtInGame": 0,
            "wardsPlaced": 15,
            "wardsKilled": 3,
            "firstBloodKill": false,
            "firstBloodAssist": false,
            "firstTowerKill": false,
            "firstTowerAssist": false,
            "firstInhibitorKill": false,
            "firstInhibitorAssist": false,
            "combatPlayerScore": 0,
            "objectivePlayerScore": 0,
            "totalPlayerScore": 0,
            "totalScoreRank": 0,
            "playerScore0": 0,
            "playerScore1": 0,
            "playerScore2": 0,
            "playerScore3": 0,
            "playerScore4": 0,
            "playerScore5": 0,
            "playerScore6": 0,
            "playerScore7": 0,
            "playerScore8": 0,
            "playerScore9": 0,
            "perk0": 8214,
            "perk0Var1": 1288,
            "perk0Var2": 881,
            "perk0Var3": 0,
            "perk1": 8224,
            "perk1Var1": 193,
            "perk1Var2": 0,
            "perk1Var3": 0,
            "perk2": 8233,
            "perk2Var1": 16,
            "perk2Var2": 10,
            "perk2Var3": 0,
            "perk3": 8237,
            "perk3Var1": 592,
            "perk3Var2": 0,
            "perk3Var3": 0,
            "perk4": 8009,
            "perk4Var1": 2495,
            "perk4Var2": 109,
            "perk4Var3": 0,
            "perk5": 8017,
            "perk5Var1": 630,
            "perk5Var2": 0,
            "perk5Var3": 0,
            "perkPrimaryStyle": 8200,
            "perkSubStyle": 8000,
            "statPerk0": 5008,
            "statPerk1": 5008,
            "statPerk2": 5001
          },
          "timeline": {
            "participantId": 2,
            "creepsPerMinDeltas": {
              "10-20": 0.7,
              "0-10": 0.5
            },
            "xpPerMinDeltas": {
              "10-20": 386.9,
              "0-10": 293.2
            },
            "goldPerMinDeltas": {
              "10-20": 358.6,
              "0-10": 183.5
            },
            "damageTakenPerMinDeltas": {
              "10-20": 237.60000000000002,
              "0-10": 268.3
            },
            "role": "DUO_SUPPORT",
            "lane": "BOTTOM"
          }
        },
        {
          "participantId": 3,
          "teamId": 100,
          "championId": 101,
          "spell1Id": 21,
          "spell2Id": 4,
          "stats": {
            "participantId": 3,
            "win": true,
            "item0": 1056,
            "item1": 3285,
            "item2": 1082,
            "item3": 3020,
            "item4": 3157,
            "item5": 3916,
            "item6": 3363,
            "kills": 7,
            "deaths": 5,
            "assists": 8,
            "largestKillingSpree": 3,
            "largestMultiKill": 1,
            "killingSprees": 2,
            "longestTimeSpentLiving": 297,
            "doubleKills": 0,
            "tripleKills": 0,
            "quadraKills": 0,
            "pentaKills": 0,
            "unrealKills": 0,
            "totalDamageDealt": 105238,
            "magicDamageDealt": 97416,
            "physicalDamageDealt": 6923,
            "trueDamageDealt": 898,
            "largestCriticalStrike": 0,
            "totalDamageDealtToChampions": 23827,
            "magicDamageDealtToChampions": 23066,
            "physicalDamageDealtToChampions": 705,
            "trueDamageDealtToChampions": 56,
            "totalHeal": 19,
            "totalUnitsHealed": 1,
            "damageSelfMitigated": 5587,
            "damageDealtToObjectives": 2582,
            "damageDealtToTurrets": 458,
            "visionScore": 12,
            "timeCCingOthers": 21,
            "totalDamageTaken": 9337,
            "magicalDamageTaken": 997,
            "physicalDamageTaken": 7886,
            "trueDamageTaken": 454,
            "goldEarned": 10554,
            "goldSpent": 9425,
            "turretKills": 0,
            "inhibitorKills": 0,
            "totalMinionsKilled": 136,
            "neutralMinionsKilled": 4,
            "neutralMinionsKilledTeamJungle": 4,
            "neutralMinionsKilledEnemyJungle": 0,
            "totalTimeCrowdControlDealt": 140,
            "champLevel": 15,
            "visionWardsBoughtInGame": 1,
            "sightWardsBoughtInGame": 0,
            "wardsPlaced": 9,
            "wardsKilled": 0,
            "firstBloodKill": false,
            "firstBloodAssist": false,
            "firstTowerKill": false,
            "firstTowerAssist": false,
            "firstInhibitorKill": false,
            "firstInhibitorAssist": false,
            "combatPlayerScore": 0,
            "objectivePlayerScore": 0,
            "totalPlayerScore": 0,
            "totalScoreRank": 0,
            "playerScore0": 0,
            "playerScore1": 0,
            "playerScore2": 0,
            "playerScore3": 0,
            "playerScore4": 0,
            "playerScore5": 0,
            "playerScore6": 0,
            "playerScore7": 0,
            "playerScore8": 0,
            "playerScore9": 0,
            "perk0": 8229,
            "perk0Var1": 1551,
            "perk0Var2": 0,
            "perk0Var3": 0,
            "perk1": 8226,
            "perk1Var1": 250,
            "perk1Var2": 864,
            "perk1Var3": 0,
            "perk2": 8210,
            "perk2Var1": 0,
            "perk2Var2": 0,
            "perk2Var3": 0,
            "perk3": 8236,
            "perk3Var1": 24,
            "perk3Var2": 0,
            "perk3Var3": 0,
            "perk4": 8304,
            "perk4Var1": 10,
            "perk4Var2": 3,
            "perk4Var3": 0,
            "perk5": 8347,
            "perk5Var1": 0,
            "perk5Var2": 0,
            "perk5Var3": 0,
            "perkPrimaryStyle": 8200,
            "perkSubStyle": 8300,
            "statPerk0": 5008,
            "statPerk1": 5008,
            "statPerk2": 5003
          },
          "timeline": {
            "participantId": 3,
            "creepsPerMinDeltas": {
              "10-20": 4.800000000000001,
              "0-10": 5.5
            },
            "xpPerMinDeltas": {
              "10-20": 553.4,
              "0-10": 363.5
            },
            "goldPerMinDeltas": {
              "10-20": 367.3,
              "0-10": 244.3
            },
            "damageTakenPerMinDeltas": {
              "10-20": 417.8,
              "0-10": 364.9
            },
            "role": "SOLO",
            "lane": "MIDDLE"
          }
        },
        {
          "participantId": 4,
          "teamId": 100,
          "championId": 236,
          "spell1Id": 4,
          "spell2Id": 7,
          "stats": {
            "participantId": 4,
            "win": true,
            "item0": 3047,
            "item1": 3153,
            "item2": 2031,
            "item3": 1055,
            "item4": 3508,
            "item5": 0,
            "item6": 3363,
            "kills": 1,
            "deaths": 7,
            "assists": 11,
            "largestKillingSpree": 0,
            "largestMultiKill": 1,
            "killingSprees": 0,
            "longestTimeSpentLiving": 443,
            "doubleKills": 0,
            "tripleKills": 0,
            "quadraKills": 0,
            "pentaKills": 0,
            "unrealKills": 0,
            "totalDamageDealt": 74231,
            "magicDamageDealt": 3743,
            "physicalDamageDealt": 69410,
            "trueDamageDealt": 1077,
            "largestCriticalStrike": 464,
            "totalDamageDealtToChampions": 9512,
            "magicDamageDealtToChampions": 880,
            "physicalDamageDealtToChampions": 8632,
            "trueDamageDealtToChampions": 0,
            "totalHeal": 2286,
            "totalUnitsHealed": 2,
            "damageSelfMitigated": 8204,
            "damageDealtToObjectives": 5855,
            "damageDealtToTurrets": 5855,
            "visionScore": 32,
            "timeCCingOthers": 1,
            "totalDamageTaken": 16073,
            "magicalDamageTaken": 2448,
            "physicalDamageTaken": 11973,
            "trueDamageTaken": 1651,
            "goldEarned": 9341,
            "goldSpent": 8125,
            "turretKills": 5,
            "inhibitorKills": 1,
            "totalMinionsKilled": 138,
            "neutralMinionsKilled": 0,
            "neutralMinionsKilledTeamJungle": 0,
            "neutralMinionsKilledEnemyJungle": 0,
            "totalTimeCrowdControlDealt": 8,
            "champLevel": 12,
            "visionWardsBoughtInGame": 1,
            "sightWardsBoughtInGame": 0,
            "wardsPlaced": 9,
            "wardsKilled": 2,
            "firstBloodKill": false,
            "firstBloodAssist": false,
            "firstTowerKill": false,
            "firstTowerAssist": false,
            "firstInhibitorKill": false,
            "firstInhibitorAssist": true,
            "combatPlayerScore": 0,
            "objectivePlayerScore": 0,
            "totalPlayerScore": 0,
            "totalScoreRank": 0,
            "playerScore0": 0,
            "playerScore1": 0,
            "playerScore2": 0,
            "playerScore3": 0,
            "playerScore4": 0,
            "playerScore5": 0,
            "playerScore6": 0,
            "playerScore7": 0,
            "playerScore8": 0,
            "playerScore9": 0,
            "perk0": 8005,
            "perk0Var1": 664,
            "perk0Var2": 381,
            "perk0Var3": 282,
            "perk1": 9111,
            "perk1Var1": 535,
            "perk1Var2": 240,
            "perk1Var3": 0,
            "perk2": 9104,
            "perk2Var1": 14,
            "perk2Var2": 30,
            "perk2Var3": 0,
            "perk3": 8014,
            "perk3Var1": 231,
            "perk3Var2": 0,
            "perk3Var3": 0,
            "perk4": 8345,
            "perk4Var1": 3,
            "perk4Var2": 0,
            "perk4Var3": 0,
            "perk5": 8304,
            "perk5Var1": 10,
            "perk5Var2": 3,
            "perk5Var3": 0,
            "perkPrimaryStyle": 8000,
            "perkSubStyle": 8300,
            "statPerk0": 5005,
            "statPerk1": 5008,
            "statPerk2": 5002
          },
          "timeline": {
            "participantId": 4,
            "creepsPerMinDeltas": {
              "10-20": 4.8,
              "0-10": 5.9
            },
            "xpPerMinDeltas": {
              "10-20": 379.8,
              "0-10": 276.6
            },
            "goldPerMinDeltas": {
              "10-20": 330,
              "0-10": 242.8
            },
            "damageTakenPerMinDeltas": {
              "10-20": 922.2,
              "0-10": 387
            },
            "role": "DUO_CARRY",
            "lane": "BOTTOM"
          }
        },
        {
          "participantId": 5,
          "teamId": 100,
          "championId": 35,
          "spell1Id": 14,
          "spell2Id": 11,
          "stats": {
            "participantId": 5,
            "win": true,
            "item0": 1011,
            "item1": 3077,
            "item2": 3087,
            "item3": 3031,
            "item4": 3147,
            "item5": 3047,
            "item6": 3364,
            "kills": 12,
            "deaths": 3,
            "assists": 10,
            "largestKillingSpree": 7,
            "largestMultiKill": 1,
            "killingSprees": 2,
            "longestTimeSpentLiving": 646,
            "doubleKills": 0,
            "tripleKills": 0,
            "quadraKills": 0,
            "pentaKills": 0,
            "unrealKills": 0,
            "totalDamageDealt": 177334,
            "magicDamageDealt": 45362,
            "physicalDamageDealt": 113704,
            "trueDamageDealt": 18268,
            "largestCriticalStrike": 1488,
            "totalDamageDealtToChampions": 16992,
            "magicDamageDealtToChampions": 6019,
            "physicalDamageDealtToChampions": 9890,
            "trueDamageDealtToChampions": 1082,
            "totalHeal": 4516,
            "totalUnitsHealed": 1,
            "damageSelfMitigated": 9791,
            "damageDealtToObjectives": 31424,
            "damageDealtToTurrets": 4200,
            "visionScore": 28,
            "timeCCingOthers": 12,
            "totalDamageTaken": 18244,
            "magicalDamageTaken": 3982,
            "physicalDamageTaken": 13370,
            "trueDamageTaken": 891,
            "goldEarned": 15591,
            "goldSpent": 13650,
            "turretKills": 1,
            "inhibitorKills": 0,
            "totalMinionsKilled": 64,
            "neutralMinionsKilled": 131,
            "neutralMinionsKilledTeamJungle": 82,
            "neutralMinionsKilledEnemyJungle": 9,
            "totalTimeCrowdControlDealt": 478,
            "champLevel": 16,
            "visionWardsBoughtInGame": 2,
            "sightWardsBoughtInGame": 0,
            "wardsPlaced": 2,
            "wardsKilled": 9,
            "firstBloodKill": true,
            "firstBloodAssist": false,
            "firstTowerKill": false,
            "firstTowerAssist": false,
            "firstInhibitorKill": false,
            "firstInhibitorAssist": false,
            "combatPlayerScore": 0,
            "objectivePlayerScore": 0,
            "totalPlayerScore": 0,
            "totalScoreRank": 0,
            "playerScore0": 0,
            "playerScore1": 0,
            "playerScore2": 0,
            "playerScore3": 0,
            "playerScore4": 0,
            "playerScore5": 0,
            "playerScore6": 0,
            "playerScore7": 0,
            "playerScore8": 0,
            "playerScore9": 0,
            "perk0": 9923,
            "perk0Var1": 39,
            "perk0Var2": 72,
            "perk0Var3": 0,
            "perk1": 8143,
            "perk1Var1": 520,
            "perk1Var2": 0,
            "perk1Var3": 0,
            "perk2": 8138,
            "perk2Var1": 18,
            "perk2Var2": 0,
            "perk2Var3": 0,
            "perk3": 8105,
            "perk3Var1": 15,
            "perk3Var2": 5,
            "perk3Var3": 0,
            "perk4": 8321,
            "perk4Var1": 4,
            "perk4Var2": 0,
            "perk4Var3": 0,
            "perk5": 8410,
            "perk5Var1": 68,
            "perk5Var2": 0,
            "perk5Var3": 0,
            "perkPrimaryStyle": 8100,
            "perkSubStyle": 8300,
            "statPerk0": 5005,
            "statPerk1": 5008,
            "statPerk2": 5002
          },
          "timeline": {
            "participantId": 5,
            "creepsPerMinDeltas": {
              "10-20": 2.1,
              "0-10": 1.2000000000000002
            },
            "xpPerMinDeltas": {
              "10-20": 643.4000000000001,
              "0-10": 454.1
            },
            "goldPerMinDeltas": {
              "10-20": 639.8,
              "0-10": 375.3
            },
            "csDiffPerMinDeltas": {
              "10-20": 1.9000000000000001,
              "0-10": 1.3877787807814457e-16
            },
            "xpDiffPerMinDeltas": {
              "10-20": 124.40000000000003,
              "0-10": 91.4
            },
            "damageTakenPerMinDeltas": {
              "10-20": 654.4,
              "0-10": 539.9
            },
            "damageTakenDiffPerMinDeltas": {
              "10-20": -442.80000000000007,
              "0-10": -29.400000000000006
            },
            "role": "NONE",
            "lane": "JUNGLE"
          }
        },
        {
          "participantId": 6,
          "teamId": 200,
          "championId": 11,
          "spell1Id": 11,
          "spell2Id": 4,
          "stats": {
            "participantId": 6,
            "win": false,
            "item0": 1400,
            "item1": 3031,
            "item2": 3087,
            "item3": 3047,
            "item4": 3086,
            "item5": 1042,
            "item6": 3340,
            "kills": 10,
            "deaths": 7,
            "assists": 3,
            "largestKillingSpree": 6,
            "largestMultiKill": 1,
            "killingSprees": 3,
            "longestTimeSpentLiving": 708,
            "doubleKills": 0,
            "tripleKills": 0,
            "quadraKills": 0,
            "pentaKills": 0,
            "unrealKills": 0,
            "totalDamageDealt": 134737,
            "magicDamageDealt": 12796,
            "physicalDamageDealt": 113422,
            "trueDamageDealt": 8518,
            "largestCriticalStrike": 900,
            "totalDamageDealtToChampions": 17233,
            "magicDamageDealtToChampions": 985,
            "physicalDamageDealtToChampions": 12468,
            "trueDamageDealtToChampions": 3778,
            "totalHeal": 6347,
            "totalUnitsHealed": 1,
            "damageSelfMitigated": 13262,
            "damageDealtToObjectives": 12342,
            "damageDealtToTurrets": 1393,
            "visionScore": 16,
            "timeCCingOthers": 7,
            "totalDamageTaken": 25088,
            "magicalDamageTaken": 8600,
            "physicalDamageTaken": 15666,
            "trueDamageTaken": 820,
            "goldEarned": 11510,
            "goldSpent": 11375,
            "turretKills": 0,
            "inhibitorKills": 0,
            "totalMinionsKilled": 33,
            "neutralMinionsKilled": 96,
            "neutralMinionsKilledTeamJungle": 76,
            "neutralMinionsKilledEnemyJungle": 1,
            "totalTimeCrowdControlDealt": 107,
            "champLevel": 14,
            "visionWardsBoughtInGame": 0,
            "sightWardsBoughtInGame": 0,
            "wardsPlaced": 9,
            "wardsKilled": 1,
            "firstBloodKill": false,
            "firstBloodAssist": false,
            "firstTowerKill": false,
            "firstTowerAssist": false,
            "firstInhibitorKill": false,
            "firstInhibitorAssist": false,
            "combatPlayerScore": 0,
            "objectivePlayerScore": 0,
            "totalPlayerScore": 0,
            "totalScoreRank": 0,
            "playerScore0": 0,
            "playerScore1": 0,
            "playerScore2": 0,
            "playerScore3": 0,
            "playerScore4": 0,
            "playerScore5": 0,
            "playerScore6": 0,
            "playerScore7": 0,
            "playerScore8": 0,
            "playerScore9": 0,
            "perk0": 9923,
            "perk0Var1": 42,
            "perk0Var2": 93,
            "perk0Var3": 0,
            "perk1": 8143,
            "perk1Var1": 277,
            "perk1Var2": 0,
            "perk1Var3": 0,
            "perk2": 8138,
            "perk2Var1": 18,
            "perk2Var2": 0,
            "perk2Var3": 0,
            "perk3": 8105,
            "perk3Var1": 15,
            "perk3Var2": 5,
            "perk3Var3": 0,
            "perk4": 9111,
            "perk4Var1": 686,
            "perk4Var2": 260,
            "perk4Var3": 0,
            "perk5": 9103,
            "perk5Var1": 25,
            "perk5Var2": 40,
            "perk5Var3": 0,
            "perkPrimaryStyle": 8100,
            "perkSubStyle": 8000,
            "statPerk0": 5005,
            "statPerk1": 5008,
            "statPerk2": 5002
          },
          "timeline": {
            "participantId": 6,
            "creepsPerMinDeltas": {
              "10-20": 0.2,
              "0-10": 1.2
            },
            "xpPerMinDeltas": {
              "10-20": 519,
              "0-10": 362.70000000000005
            },
            "goldPerMinDeltas": {
              "10-20": 485.3,
              "0-10": 396.79999999999995
            },
            "csDiffPerMinDeltas": {
              "10-20": -1.9000000000000001,
              "0-10": -1.3877787807814457e-16
            },
            "xpDiffPerMinDeltas": {
              "10-20": -124.40000000000003,
              "0-10": -91.4
            },
            "damageTakenPerMinDeltas": {
              "10-20": 1097.2,
              "0-10": 569.3
            },
            "damageTakenDiffPerMinDeltas": {
              "10-20": 442.80000000000007,
              "0-10": 29.400000000000006
            },
            "role": "NONE",
            "lane": "JUNGLE"
          }
        },
        {
          "participantId": 7,
          "teamId": 200,
          "championId": 53,
          "spell1Id": 4,
          "spell2Id": 14,
          "stats": {
            "participantId": 7,
            "win": false,
            "item0": 3190,
            "item1": 3107,
            "item2": 3097,
            "item3": 0,
            "item4": 0,
            "item5": 3117,
            "item6": 3364,
            "kills": 1,
            "deaths": 4,
            "assists": 6,
            "largestKillingSpree": 0,
            "largestMultiKill": 1,
            "killingSprees": 0,
            "longestTimeSpentLiving": 509,
            "doubleKills": 0,
            "tripleKills": 0,
            "quadraKills": 0,
            "pentaKills": 0,
            "unrealKills": 0,
            "totalDamageDealt": 27379,
            "magicDamageDealt": 5598,
            "physicalDamageDealt": 7776,
            "trueDamageDealt": 14004,
            "largestCriticalStrike": 0,
            "totalDamageDealtToChampions": 6408,
            "magicDamageDealtToChampions": 3561,
            "physicalDamageDealtToChampions": 2099,
            "trueDamageDealtToChampions": 746,
            "totalHeal": 2824,
            "totalUnitsHealed": 5,
            "damageSelfMitigated": 13177,
            "damageDealtToObjectives": 588,
            "damageDealtToTurrets": 588,
            "visionScore": 51,
            "timeCCingOthers": 22,
            "totalDamageTaken": 15797,
            "magicalDamageTaken": 7187,
            "physicalDamageTaken": 7483,
            "trueDamageTaken": 1125,
            "goldEarned": 6504,
            "goldSpent": 6375,
            "turretKills": 0,
            "inhibitorKills": 0,
            "totalMinionsKilled": 48,
            "neutralMinionsKilled": 0,
            "neutralMinionsKilledTeamJungle": 0,
            "neutralMinionsKilledEnemyJungle": 0,
            "totalTimeCrowdControlDealt": 62,
            "champLevel": 12,
            "visionWardsBoughtInGame": 3,
            "sightWardsBoughtInGame": 0,
            "wardsPlaced": 22,
            "wardsKilled": 7,
            "firstBloodKill": false,
            "firstBloodAssist": false,
            "firstTowerKill": false,
            "firstTowerAssist": false,
            "firstInhibitorKill": false,
            "firstInhibitorAssist": false,
            "combatPlayerScore": 0,
            "objectivePlayerScore": 0,
            "totalPlayerScore": 0,
            "totalScoreRank": 0,
            "playerScore0": 0,
            "playerScore1": 0,
            "playerScore2": 0,
            "playerScore3": 0,
            "playerScore4": 0,
            "playerScore5": 0,
            "playerScore6": 2,
            "playerScore7": 0,
            "playerScore8": 0,
            "playerScore9": 0,
            "perk0": 8439,
            "perk0Var1": 302,
            "perk0Var2": 0,
            "perk0Var3": 0,
            "perk1": 8446,
            "perk1Var1": 336,
            "perk1Var2": 0,
            "perk1Var3": 0,
            "perk2": 8429,
            "perk2Var1": 64,
            "perk2Var2": 15,
            "perk2Var3": 14,
            "perk3": 8451,
            "perk3Var1": 166,
            "perk3Var2": 0,
            "perk3Var3": 0,
            "perk4": 8345,
            "perk4Var1": 3,
            "perk4Var2": 0,
            "perk4Var3": 0,
            "perk5": 8347,
            "perk5Var1": 0,
            "perk5Var2": 0,
            "perk5Var3": 0,
            "perkPrimaryStyle": 8400,
            "perkSubStyle": 8300,
            "statPerk0": 5007,
            "statPerk1": 5002,
            "statPerk2": 5001
          },
          "timeline": {
            "participantId": 7,
            "creepsPerMinDeltas": {
              "10-20": 2,
              "0-10": 1.4
            },
            "xpPerMinDeltas": {
              "10-20": 379.2,
              "0-10": 268.8
            },
            "goldPerMinDeltas": {
              "10-20": 256.2,
              "0-10": 187.10000000000002
            },
            "damageTakenPerMinDeltas": {
              "10-20": 598.2,
              "0-10": 295.79999999999995
            },
            "role": "SOLO",
            "lane": "BOTTOM"
          }
        },
        {
          "participantId": 8,
          "teamId": 200,
          "championId": 246,
          "spell1Id": 14,
          "spell2Id": 4,
          "stats": {
            "participantId": 8,
            "win": false,
            "item0": 3142,
            "item1": 2033,
            "item2": 3147,
            "item3": 3134,
            "item4": 3047,
            "item5": 1037,
            "item6": 3340,
            "kills": 9,
            "deaths": 10,
            "assists": 1,
            "largestKillingSpree": 3,
            "largestMultiKill": 2,
            "killingSprees": 3,
            "longestTimeSpentLiving": 446,
            "doubleKills": 1,
            "tripleKills": 0,
            "quadraKills": 0,
            "pentaKills": 0,
            "unrealKills": 0,
            "totalDamageDealt": 82169,
            "magicDamageDealt": 6871,
            "physicalDamageDealt": 71116,
            "trueDamageDealt": 4181,
            "largestCriticalStrike": 0,
            "totalDamageDealtToChampions": 14382,
            "magicDamageDealtToChampions": 1161,
            "physicalDamageDealtToChampions": 12800,
            "trueDamageDealtToChampions": 420,
            "totalHeal": 5018,
            "totalUnitsHealed": 1,
            "damageSelfMitigated": 11125,
            "damageDealtToObjectives": 2579,
            "damageDealtToTurrets": 1692,
            "visionScore": 19,
            "timeCCingOthers": 20,
            "totalDamageTaken": 25006,
            "magicalDamageTaken": 14715,
            "physicalDamageTaken": 9878,
            "trueDamageTaken": 412,
            "goldEarned": 9904,
            "goldSpent": 9525,
            "turretKills": 0,
            "inhibitorKills": 0,
            "totalMinionsKilled": 126,
            "neutralMinionsKilled": 4,
            "neutralMinionsKilledTeamJungle": 4,
            "neutralMinionsKilledEnemyJungle": 0,
            "totalTimeCrowdControlDealt": 92,
            "champLevel": 13,
            "visionWardsBoughtInGame": 2,
            "sightWardsBoughtInGame": 0,
            "wardsPlaced": 9,
            "wardsKilled": 2,
            "firstBloodKill": false,
            "firstBloodAssist": false,
            "firstTowerKill": false,
            "firstTowerAssist": false,
            "firstInhibitorKill": false,
            "firstInhibitorAssist": false,
            "combatPlayerScore": 0,
            "objectivePlayerScore": 0,
            "totalPlayerScore": 0,
            "totalScoreRank": 0,
            "playerScore0": 0,
            "playerScore1": 0,
            "playerScore2": 0,
            "playerScore3": 0,
            "playerScore4": 0,
            "playerScore5": 0,
            "playerScore6": 0,
            "playerScore7": 0,
            "playerScore8": 0,
            "playerScore9": 0,
            "perk0": 8112,
            "perk0Var1": 1046,
            "perk0Var2": 0,
            "perk0Var3": 0,
            "perk1": 8139,
            "perk1Var1": 797,
            "perk1Var2": 0,
            "perk1Var3": 0,
            "perk2": 8138,
            "perk2Var1": 18,
            "perk2Var2": 0,
            "perk2Var3": 0,
            "perk3": 8135,
            "perk3Var1": 2261,
            "perk3Var2": 5,
            "perk3Var3": 0,
            "perk4": 8345,
            "perk4Var1": 3,
            "perk4Var2": 0,
            "perk4Var3": 0,
            "perk5": 8352,
            "perk5Var1": 237,
            "perk5Var2": 1410,
            "perk5Var3": 786,
            "perkPrimaryStyle": 8100,
            "perkSubStyle": 8300,
            "statPerk0": 5008,
            "statPerk1": 5008,
            "statPerk2": 5003
          },
          "timeline": {
            "participantId": 8,
            "creepsPerMinDeltas": {
              "10-20": 4.4,
              "0-10": 6.6000000000000005
            },
            "xpPerMinDeltas": {
              "10-20": 284.79999999999995,
              "0-10": 524.2
            },
            "goldPerMinDeltas": {
              "10-20": 281.3,
              "0-10": 371.7
            },
            "damageTakenPerMinDeltas": {
              "10-20": 909.1,
              "0-10": 421.4
            },
            "role": "DUO",
            "lane": "MIDDLE"
          }
        },
        {
          "participantId": 9,
          "teamId": 200,
          "championId": 51,
          "spell1Id": 7,
          "spell2Id": 4,
          "stats": {
            "participantId": 9,
            "win": false,
            "item0": 1055,
            "item1": 1055,
            "item2": 3031,
            "item3": 3006,
            "item4": 3046,
            "item5": 1031,
            "item6": 3363,
            "kills": 1,
            "deaths": 6,
            "assists": 4,
            "largestKillingSpree": 0,
            "largestMultiKill": 1,
            "killingSprees": 0,
            "longestTimeSpentLiving": 348,
            "doubleKills": 0,
            "tripleKills": 0,
            "quadraKills": 0,
            "pentaKills": 0,
            "unrealKills": 0,
            "totalDamageDealt": 90943,
            "magicDamageDealt": 351,
            "physicalDamageDealt": 85166,
            "trueDamageDealt": 5425,
            "largestCriticalStrike": 745,
            "totalDamageDealtToChampions": 6798,
            "magicDamageDealtToChampions": 191,
            "physicalDamageDealtToChampions": 6606,
            "trueDamageDealtToChampions": 0,
            "totalHeal": 2032,
            "totalUnitsHealed": 3,
            "damageSelfMitigated": 6180,
            "damageDealtToObjectives": 6582,
            "damageDealtToTurrets": 1401,
            "visionScore": 10,
            "timeCCingOthers": 15,
            "totalDamageTaken": 14839,
            "magicalDamageTaken": 8935,
            "physicalDamageTaken": 5627,
            "trueDamageTaken": 276,
            "goldEarned": 8831,
            "goldSpent": 8900,
            "turretKills": 1,
            "inhibitorKills": 0,
            "totalMinionsKilled": 160,
            "neutralMinionsKilled": 0,
            "neutralMinionsKilledTeamJungle": 0,
            "neutralMinionsKilledEnemyJungle": 0,
            "totalTimeCrowdControlDealt": 33,
            "champLevel": 12,
            "visionWardsBoughtInGame": 2,
            "sightWardsBoughtInGame": 0,
            "wardsPlaced": 6,
            "wardsKilled": 1,
            "firstBloodKill": false,
            "firstBloodAssist": false,
            "firstTowerKill": false,
            "firstTowerAssist": false,
            "firstInhibitorKill": false,
            "firstInhibitorAssist": false,
            "combatPlayerScore": 0,
            "objectivePlayerScore": 0,
            "totalPlayerScore": 0,
            "totalScoreRank": 0,
            "playerScore0": 0,
            "playerScore1": 0,
            "playerScore2": 0,
            "playerScore3": 0,
            "playerScore4": 0,
            "playerScore5": 0,
            "playerScore6": 0,
            "playerScore7": 0,
            "playerScore8": 0,
            "playerScore9": 0,
            "perk0": 8021,
            "perk0Var1": 937,
            "perk0Var2": 0,
            "perk0Var3": 0,
            "perk1": 9101,
            "perk1Var1": 892,
            "perk1Var2": 1320,
            "perk1Var3": 0,
            "perk2": 9103,
            "perk2Var1": 0,
            "perk2Var2": 0,
            "perk2Var3": 0,
            "perk3": 8014,
            "perk3Var1": 87,
            "perk3Var2": 0,
            "perk3Var3": 0,
            "perk4": 8304,
            "perk4Var1": 9,
            "perk4Var2": 4,
            "perk4Var3": 5,
            "perk5": 8345,
            "perk5Var1": 3,
            "perk5Var2": 0,
            "perk5Var3": 0,
            "perkPrimaryStyle": 8000,
            "perkSubStyle": 8300,
            "statPerk0": 5005,
            "statPerk1": 5008,
            "statPerk2": 5002
          },
          "timeline": {
            "participantId": 9,
            "creepsPerMinDeltas": {
              "10-20": 7.1,
              "0-10": 5.8
            },
            "xpPerMinDeltas": {
              "10-20": 361.9,
              "0-10": 272.6
            },
            "goldPerMinDeltas": {
              "10-20": 310.20000000000005,
              "0-10": 242
            },
            "damageTakenPerMinDeltas": {
              "10-20": 563.1,
              "0-10": 445.6
            },
            "role": "DUO",
            "lane": "MIDDLE"
          }
        },
        {
          "participantId": 10,
          "teamId": 200,
          "championId": 10,
          "spell1Id": 4,
          "spell2Id": 12,
          "stats": {
            "participantId": 10,
            "win": false,
            "item0": 2033,
            "item1": 3124,
            "item2": 3146,
            "item3": 1052,
            "item4": 3101,
            "item5": 3111,
            "item6": 3364,
            "kills": 1,
            "deaths": 6,
            "assists": 2,
            "largestKillingSpree": 0,
            "largestMultiKill": 1,
            "killingSprees": 0,
            "longestTimeSpentLiving": 576,
            "doubleKills": 0,
            "tripleKills": 0,
            "quadraKills": 0,
            "pentaKills": 0,
            "unrealKills": 0,
            "totalDamageDealt": 144311,
            "magicDamageDealt": 91564,
            "physicalDamageDealt": 50679,
            "trueDamageDealt": 2067,
            "largestCriticalStrike": 0,
            "totalDamageDealtToChampions": 16632,
            "magicDamageDealtToChampions": 10578,
            "physicalDamageDealtToChampions": 5807,
            "trueDamageDealtToChampions": 246,
            "totalHeal": 6571,
            "totalUnitsHealed": 3,
            "damageSelfMitigated": 10615,
            "damageDealtToObjectives": 9315,
            "damageDealtToTurrets": 5154,
            "visionScore": 18,
            "timeCCingOthers": 13,
            "totalDamageTaken": 20880,
            "magicalDamageTaken": 3962,
            "physicalDamageTaken": 16550,
            "trueDamageTaken": 368,
            "goldEarned": 10783,
            "goldSpent": 9835,
            "turretKills": 1,
            "inhibitorKills": 0,
            "totalMinionsKilled": 177,
            "neutralMinionsKilled": 29,
            "neutralMinionsKilledTeamJungle": 15,
            "neutralMinionsKilledEnemyJungle": 4,
            "totalTimeCrowdControlDealt": 417,
            "champLevel": 14,
            "visionWardsBoughtInGame": 2,
            "sightWardsBoughtInGame": 0,
            "wardsPlaced": 7,
            "wardsKilled": 1,
            "firstBloodKill": false,
            "firstBloodAssist": false,
            "firstTowerKill": true,
            "firstTowerAssist": false,
            "firstInhibitorKill": false,
            "firstInhibitorAssist": false,
            "combatPlayerScore": 0,
            "objectivePlayerScore": 0,
            "totalPlayerScore": 0,
            "totalScoreRank": 0,
            "playerScore0": 0,
            "playerScore1": 0,
            "playerScore2": 0,
            "playerScore3": 0,
            "playerScore4": 0,
            "playerScore5": 0,
            "playerScore6": 0,
            "playerScore7": 0,
            "playerScore8": 0,
            "playerScore9": 0,
            "perk0": 8359,
            "perk0Var1": 565,
            "perk0Var2": 16,
            "perk0Var3": 0,
            "perk1": 8304,
            "perk1Var1": 11,
            "perk1Var2": 1,
            "perk1Var3": 5,
            "perk2": 8345,
            "perk2Var1": 3,
            "perk2Var2": 0,
            "perk2Var3": 0,
            "perk3": 8352,
            "perk3Var1": 195,
            "perk3Var2": 1099,
            "perk3Var3": 747,
            "perk4": 8473,
            "perk4Var1": 660,
            "perk4Var2": 0,
            "perk4Var3": 0,
            "perk5": 8451,
            "perk5Var1": 171,
            "perk5Var2": 0,
            "perk5Var3": 0,
            "perkPrimaryStyle": 8300,
            "perkSubStyle": 8400,
            "statPerk0": 5005,
            "statPerk1": 5008,
            "statPerk2": 5002
          },
          "timeline": {
            "participantId": 10,
            "creepsPerMinDeltas": {
              "10-20": 5.4,
              "0-10": 7.1
            },
            "xpPerMinDeltas": {
              "10-20": 480.4,
              "0-10": 433
            },
            "goldPerMinDeltas": {
              "10-20": 415.6,
              "0-10": 330.6
            },
            "csDiffPerMinDeltas": {
              "10-20": -1.2999999999999998,
              "0-10": 0.49999999999999956
            },
            "xpDiffPerMinDeltas": {
              "10-20": -3.6000000000000227,
              "0-10": -27.80000000000001
            },
            "damageTakenPerMinDeltas": {
              "10-20": 910.1,
              "0-10": 365
            },
            "damageTakenDiffPerMinDeltas": {
              "10-20": -176.39999999999992,
              "0-10": -216.09999999999997
            },
            "role": "SOLO",
            "lane": "TOP"
          }
        }
      ],
      "participantIdentities": [
        {
          "participantId": 1,
          "player": {
            "platformId": "NA",
            "accountId": "CvgZgeFyOxOoT3Q4t4kMvYVQbqimSrmX0f9MwOka6Xx1BA",
            "summonerName": "Roldyyy",
            "summonerId": "c9xpnpwKLpG1JkgbBebW3FTbUCZ5twft2WOHXRjISH5I9os",
            "currentPlatformId": "NA1",
            "currentAccountId": "CvgZgeFyOxOoT3Q4t4kMvYVQbqimSrmX0f9MwOka6Xx1BA",
            "matchHistoryUri": "/v1/stats/player_history/NA/40545843",
            "profileIcon": 5
          }
        },
        {
          "participantId": 2,
          "player": {
            "platformId": "NA1",
            "accountId": "E4q0yxG4VPXaGrXXxUjuYxA9JFFM-gfs5qbqsZYVHTE-eqo",
            "summonerName": "404 Not Founddd",
            "summonerId": "-tBiTHguScp1sjBGydcVJSiXOxKMHGdbSgIWDhAWIL5lxYg",
            "currentPlatformId": "NA1",
            "currentAccountId": "E4q0yxG4VPXaGrXXxUjuYxA9JFFM-gfs5qbqsZYVHTE-eqo",
            "matchHistoryUri": "/v1/stats/player_history/NA1/230067190",
            "profileIcon": 3018
          }
        },
        {
          "participantId": 3,
          "player": {
            "platformId": "NA1",
            "accountId": "CykwJb9RD1vS9ETJIsueyOCwZvvPOLTtjLxi5S2fmG-Vxg",
            "summonerName": "TSM Jeffen",
            "summonerId": "5ICV0ppuGObWWBU1v9M-xS13i5ztct_I_ZfO1_A_bb-sifg",
            "currentPlatformId": "NA1",
            "currentAccountId": "CykwJb9RD1vS9ETJIsueyOCwZvvPOLTtjLxi5S2fmG-Vxg",
            "matchHistoryUri": "/v1/stats/player_history/NA1/43502320",
            "profileIcon": 3838
          }
        },
        {
          "participantId": 4,
          "player": {
            "platformId": "NA",
            "accountId": "We2BfMwepq4OMwVrjxHJ5fbPTc-h9mmbaQpC-ST1x88eqA",
            "summonerName": "XxFoRasTeiRoOxX",
            "summonerId": "I4Nd4nm4KU6PSq_A2-fbUIIApw02x7PxUvBGFUEqRZfF79Y",
            "currentPlatformId": "NA1",
            "currentAccountId": "We2BfMwepq4OMwVrjxHJ5fbPTc-h9mmbaQpC-ST1x88eqA",
            "matchHistoryUri": "/v1/stats/player_history/NA/36563557",
            "profileIcon": 7
          }
        },
        {
          "participantId": 5,
          "player": {
            "platformId": "NA1",
            "accountId": "wuZVOfxZdDTCX9J6RiDievtkfSHJ8Exc1ciUyyTSWrsdKPHkFTY29PJt",
            "summonerName": "WryEc",
            "summonerId": "O7CD_VBjrlCmY7f9o2-TjI3O7hae5UGcT7v7sGw_mdZ8lt4n",
            "currentPlatformId": "NA1",
            "currentAccountId": "wuZVOfxZdDTCX9J6RiDievtkfSHJ8Exc1ciUyyTSWrsdKPHkFTY29PJt",
            "matchHistoryUri": "/v1/stats/player_history/NA1/2273995603888704",
            "profileIcon": 4363
          }
        },
        {
          "participantId": 6,
          "player": {
            "platformId": "NA1",
            "accountId": "rSuT3_X_PIpUTEZwOnB_OyB6I3i_sMpGX9d8gBZ7Su9BDt8",
            "summonerName": "S1inker",
            "summonerId": "fpgRVHq4p3bMKEOcxN3U-LW-Dy63V2EmCM2W0l5ZeTZQU-4",
            "currentPlatformId": "NA1",
            "currentAccountId": "rSuT3_X_PIpUTEZwOnB_OyB6I3i_sMpGX9d8gBZ7Su9BDt8",
            "matchHistoryUri": "/v1/stats/player_history/NA1/228993625",
            "profileIcon": 3866
          }
        },
        {
          "participantId": 7,
          "player": {
            "platformId": "NA1",
            "accountId": "sClasp2YLFXTSoxhKzCl3W4aspiXzJ9wOGnHNR_L3Cx7PN8",
            "summonerName": "Taihou",
            "summonerId": "4R1N_t3CNn0V8psa30Qr3bfDrhBkztrm5Cu0oeq7PGGZRGg",
            "currentPlatformId": "NA1",
            "currentAccountId": "sClasp2YLFXTSoxhKzCl3W4aspiXzJ9wOGnHNR_L3Cx7PN8",
            "matchHistoryUri": "/v1/stats/player_history/NA1/206781783",
            "profileIcon": 4308
          }
        },
        {
          "participantId": 8,
          "player": {
            "platformId": "NA",
            "accountId": "eId6juq-dyXqtl5unXjzRRk0eKbXwrIzJ2On_Muo90bzHQ",
            "summonerName": "MyAir",
            "summonerId": "NtW1fFWiqG2Nqw5fo1NaUeI4ouvXXcHFT4hz6VsrEy5eSsE",
            "currentPlatformId": "NA1",
            "currentAccountId": "eId6juq-dyXqtl5unXjzRRk0eKbXwrIzJ2On_Muo90bzHQ",
            "matchHistoryUri": "/v1/stats/player_history/NA/38746540",
            "profileIcon": 588
          }
        },
        {
          "participantId": 9,
          "player": {
            "platformId": "NA1",
            "accountId": "1T6Rm3jXuJmA4YDRWEVJ_UuS0-S0lctCzc6eft8vVJqxqk0",
            "summonerName": "netnavi",
            "summonerId": "oEYA2154k3M_uzSt96J_JA41CThF5JwnMke38kl-qmxCW6Q",
            "currentPlatformId": "NA1",
            "currentAccountId": "1T6Rm3jXuJmA4YDRWEVJ_UuS0-S0lctCzc6eft8vVJqxqk0",
            "matchHistoryUri": "/v1/stats/player_history/NA1/227692719",
            "profileIcon": 4022
          }
        },
        {
          "participantId": 10,
          "player": {
            "platformId": "NA1",
            "accountId": "mAEoo2CgzpFNnFoHM_O38noE7GdBgzN9rPjpP3OEuMMX4Q",
            "summonerName": "WE we1x1ao",
            "summonerId": "TtiffhrkT7bRfMw0tYoR1nCd3wO-HktLjpixYiUh3X3wctA",
            "currentPlatformId": "NA1",
            "currentAccountId": "mAEoo2CgzpFNnFoHM_O38noE7GdBgzN9rPjpP3OEuMMX4Q",
            "matchHistoryUri": "/v1/stats/player_history/NA1/49107284",
            "profileIcon": 4291
          }
        }
      ]
    }))

    div = await setupAndQuerySearchForm()
  })

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div)
    mock.searchSummonerByName.restore()
    mock.searchRankedStats.restore()
    mock.getMatchHistory.restore()
    mock.getGame.restore()
  })

  it('should trigger a Riot search when the search button is clicked', async () => {
    // Note how this _isn’t_ a snapshot test because we’re checking whether a function was called with
    // the right arguments.
    let summoner = await mock.searchSummonerByName()
    let rankedStats = await mock.searchRankedStats()
    let matchHistory = await mock.getMatchHistory()
    let game = await mock.getGame()

    expect(summoner.id).toEqual("bJ3fnl4axekkZNRW8i0r-DzCOltAQCMilbmhHFPo-HL-dkE")
    expect(rankedStats.tier).toEqual("CHALLENGER")
    expect(game.gameId).toEqual(3176158088)
    expect(matchHistory.gameId).toEqual(3176158088)
  })
})

describe('failed API calls', () => {
  let div
  beforeEach(async () => {
    sinon.stub(mock, 'searchSummonerByName')
    mock.searchSummonerByName.returns(Promise.reject('Mock failure'))

    div = await setupAndQuerySearchForm()
  })

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div)
    mock.searchSummonerByName.restore()
  })

  it('should display an alert when the API call fails', () => {
    // The document should contain the error div.
    const searchError = div.querySelector('div.error')
    expect(searchError.textContent).toEqual('This Summoner does not exist in the NA region or too many requests were sent')
  })
})