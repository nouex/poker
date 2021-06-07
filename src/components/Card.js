import React from "react"
import { COMMITED } from "../const"

function Card({ value, suit, isChosen, status, playerCards, setPlayerCards, fade }) {
  const id = value + suit[0].toUpperCase()
  const border = isChosen ? "2px solid yellow" : "2px solid transparent"

  let fadeClass = ""
  if (isChosen) {
    if (fade === 1) fadeClass = "fadeOut"
    else if (fade === 2) fadeClass = "fadeIn"
  }

  const toggle = (ev) => {
    ev.preventDefault()
    const i = playerCards.findIndex(c => c.value === value && c.suit === suit)
    playerCards[i].isChosen = !isChosen
    setPlayerCards(playerCards)
  }

  return  (
      <img
        className={`card ${fadeClass}`}
        src={`cards/${id}.svg`}
        style={{ margin: "20px", border, width: "100px" }}
        onClick={toggle}
        alt="card" />
  )
}

export default Card
