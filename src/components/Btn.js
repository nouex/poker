import React from "react"

import { NOT_STARTED, PICKING, COMMITED, SCORING } from "../const"

function Start({ setStatus, nextStatus }) {
  const onClick = (event) => {
     event.preventDefault();
     setStatus(nextStatus)
  }

  let txt
  if (nextStatus === PICKING) txt = "START"
  else if (nextStatus === COMMITED) txt = "DISCARD"
  else if (nextStatus === SCORING) txt = "SCORE HAND"
  else if (nextStatus === NOT_STARTED) txt = "PLAY AGAIN"

  const style = {
    display:"block",
    width: "120px",
    height: "50px",
    fontWeight: "bold",
    margin: "auto"
  }

  return (
    <button onClick={onClick} style={style}>
      {txt}
    </button>
  )
}

export default Start
