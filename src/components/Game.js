import React, { useState, useReducer, useEffect, useRef } from "react"

import deckOfCards from "../deck"
import { shuffle, random, scoreGame } from "../utils"
import { NOT_STARTED, PICKING, COMMITED, SCORING } from "../const"
import Btn from "./Btn"
import PlayerCards from "./PlayerCards"

const reducer = (state, a) => [ ...a ]

/**
 * There are four possible states the game can be in:
 * 1. NOT_STARTED - Game has not started
 * 2. PICKING - Player is picking the cards to discard
 * 3. COMMITED - Player has chosen his cards to discard and is commited to discarding the chosen ones
 * 4. SCORING - Game has finished and a score has been given
 */

function Game() {
  const deck = useRef(null) // use a mutable ref, no need to keep it in state
  const [ status, setStatus ] = useState(NOT_STARTED)
  const [ playerCards, setPlayerCards ] = useReducer(reducer, [])
  const [ score, setScore ] = useState(null)
  const [ fade, setFade ] = useState(0)

  const reset = () => {
    setPlayerCards([])
    setScore(null)
    deck.current = [...deckOfCards]
  };

  const dealCards = () => {
    // shuffle deck and deal 5 cards at random
    const picked = []
    let cardsNeeded = 5

    shuffle(deck.current)
    while (cardsNeeded--) {
      const randomInd = random(0, deck.current.length -1)
      picked.push(deck.current.splice(randomInd, 1)[0])
    }
    setPlayerCards(picked)
  };

  const  discardCards = () => {
    setTimeout(() => {
      playerCards.filter(c => c.isChosen).forEach(c => {
        const { value, suit } = c
        const discarded = { value, suit }
        const newCard = deck.current.pop()
        c.value = newCard.value
        c.suit = newCard.suit
        c.isChosen = false
        deck.current.unshift(discarded) // return to bottom of deck
      })
      setTimeout(() => setFade(0), 1000)
      setPlayerCards(playerCards)
      setFade(2)
    }, 1000)
    setFade(1)
  }

  useEffect(() => {
    if (status === NOT_STARTED) {
      reset()
    } else if (status === PICKING) {
      dealCards()
    } else if (status === COMMITED) {
      discardCards()
    } else if (status === SCORING) {
      const score = scoreGame(playerCards)
      setScore(score)
    }
  }, [status])

  let nextStatus, headline
  if (status === NOT_STARTED) {
    nextStatus = PICKING
    headline = "Click to begin"
  }
  else if (status === PICKING) {
    nextStatus = COMMITED
    headline = "Pick the cards you would like to discard"
  }
  else if (status === COMMITED) {
    nextStatus = SCORING
    headline = "Here are your new cards"
  }
  else if (status === SCORING ) {
    nextStatus = NOT_STARTED
    headline = `You got a ${score}!`
  }

  // only let the player discard after they've picked at least one to discard
  const btn = status === PICKING && !playerCards.some(c => c.isChosen) ?
    null :
    <Btn setStatus={setStatus} nextStatus={nextStatus}/>

  if (status !== NOT_STARTED) {
    return (
      <>
        <h1>
          {headline}
        </h1>
        <PlayerCards
          fade={fade}
          status={status}
          playerCards={playerCards}
          setPlayerCards={setPlayerCards} />
          { btn }
      </>
    )
  } else return (
    <>
      <h1>
        {headline}
      </h1>
      {btn}
    </>
  )
}

export default Game;
