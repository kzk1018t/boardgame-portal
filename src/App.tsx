import { Client } from 'boardgame.io/react';
import { TicTacToeBoard } from './games/tic-tac-toe/Board';
import { TicTacToe } from './games/tic-tac-toe/game';

const TicTacToeClient = Client({
  game: TicTacToe,
  numPlayers: 2,
  board: TicTacToeBoard,
  debug: false,
});

function App() {
  return <TicTacToeClient />;
}

export default App;
