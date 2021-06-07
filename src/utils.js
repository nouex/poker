export function scoreGame(playerCards) {
  // If the five cards are the 10-Jack-Queen-King-Ace of the same suit, the hand is scored as a Royal Flush.

  const isSameSuit = playerCards.slice(1).every(c => c.suit === playerCards[0].suit)
  if (isSameSuit) {
    if (playerCards.every(c => ["A", "K", "Q", "J", "10"].includes(c.value)))
      return "Royal Flush"
  }

  // sort according to rank
  const rank = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]
  const sorted = [...playerCards]
  sorted.sort((l, r) => {
    if (l.value === r.value) return 0
    return rank.indexOf(l.value) > rank.indexOf(r.value) ? 1 : -1
  })

  const firstInd = rank.indexOf(sorted[0])
  const lastInd = rank.indexOf(sorted.length -1)
  const isSequential = (lastInd - firstInd) === sorted.length -1

  // Otherwise, if all cards are sequential in rank (e.g. 5-6-7-8-9) and are all the same suit, the hand is scored as a Straight Flush.
  if (isSameSuit && isSequential) return "Straight Flush"

  // Otherwise, if the hand contains 4 cards which are the same rank, the hand is scored as a Four-of-a-Kind.
  const sameRank = playerCards.every(c => c.value === playerCards[0].value)
  if (sameRank) {
    return "Four-of-a-Kind"
  }

  // Otherwise, if the hand contains 3 cards which are the same rank and the remaining 2 cards are the same rank different from the other 3, the hand is scored as a Full House.
  const groups = groupBy(playerCards, "value")
  if (Object.keys(groups).length === 2) {
    // We have two groups of the same rank (value)
    return "Full House"
  }

  // Otherwise, if all cards are the same suit, the hand is scored as a Flush.
  if (isSameSuit) return "Flush"

  // Otherwise, if all cards are sequential in rank, the hand is scored as a Straight.
  if (isSequential) return "Straight"

  // Otherwise, if the hand contains 3 cards which are the same rank, the hand is scored as a Three-of-a-Kind.
  if (Object.keys(groups).some((rank) => groups[rank].length === 3)) return "Three-of-a-Kind"

  // Otherwise, if the hand contains 2 cards which are the same rank and 2 other cards which are the same rank (different from the first 2 cards), the hand is scored as a Two-Pair.
  let firstPair, secondPair
  firstPair = Object.keys(groups).some((rank) => {
    if (groups[rank].length === 2) {
      firstPair = rank
      return true
    }
    return false
  })

  if (firstPair) {
    secondPair = Object.keys(groups).some((rank) => {
      if (groups[rank].length === 2 && rank !== firstPair) {
        secondPair = rank
        return true
      }
      return false
    })
  }

  if (firstPair && secondPair) return "Two-Pair"

  // Otherwise, if the hand contains two cards which are the same rank, the hand is scored as a Pair.
  if (firstPair) return "Pair"

  // Finally, if the hand does not qualify for any of the above scorings, the hand is scored as an X-High, where X is the highest ranked card in the hand.
  return `${sorted[sorted.length -1].value}-High`
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
export function random(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
