import React from "react"
import Card from "./Card"

function PlayerCards({status, playerCards, setPlayerCards, fade}) {
  const cards = playerCards.map((card) => {
    return (
      <Card
        key={`${card.suit}-${card.value}`}
        playerCards={playerCards}
        setPlayerCards={setPlayerCards}
        status={status}
        suit={card.suit}
        value={card.value}
        fade={fade}
        isChosen={card.isChosen} />
    )
  });

  return <> { cards } </>
}

export default PlayerCards;
