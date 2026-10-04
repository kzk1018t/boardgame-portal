import { INVALID_MOVE } from 'boardgame.io/core';
import type { Ctx } from 'boardgame.io';

export type PlayerMark = 'X' | 'O';
export type PlayerID = string;
export type Cell = PlayerID | null;

export type TicTacToeState = {
  cells: Cell[];
};

type GameContext = {
  G: TicTacToeState;
  ctx: Ctx;
};

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const hasWinningLine = (cells: Cell[]): boolean =>
  winningLines.some(([first, second, third]) => {
    const playerID = cells[first];
    return playerID !== null && playerID === cells[second] && playerID === cells[third];
  });

export const TicTacToe = {
  name: 'tic-tac-toe',

  setup: (): TicTacToeState => ({
    cells: Array(9).fill(null),
  }),

  moves: {
    clickCell: ({ G, ctx }: GameContext, cellIndex: number) => {
      if (cellIndex < 0 || cellIndex >= G.cells.length) {
        return INVALID_MOVE;
      }

      if (G.cells[cellIndex]) {
        return INVALID_MOVE;
      }

      G.cells[cellIndex] = ctx.currentPlayer;
    },
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  endIf: ({ G, ctx }: GameContext) => {
    if (hasWinningLine(G.cells)) {
      return { winner: ctx.currentPlayer };
    }

    if (G.cells.every((cell) => cell !== null)) {
      return { draw: true };
    }

    return undefined;
  },
};
