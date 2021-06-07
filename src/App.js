import logo from './logo.svg';
import './App.css';

import Game from "./components/Game"

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;


/**
 * UI Components
 *    1. start btn
 *    2. player cards
 */


 /**
  * Game Flow
  *    1. shuffle deck
  *    2. give player 5 cards
  *    3. player can eliminate 0 - 5 cards
  *    4. score player cards
  *    5. ask player to play again
  *
  * Game status is always in one of the following states:
  *   NOT_STARTED - game has not started
  *   PICKING - player is picking cards to discard
  *   COMMITED - player has picked the cards she wishes to discard
  *   SCORING - game is over and player's cards have been scored
  */
