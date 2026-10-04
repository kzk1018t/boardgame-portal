import type { BoardProps } from 'boardgame.io/react';
import type { PlayerID, PlayerMark, TicTacToeState } from './game';

type TicTacToeBoardProps = BoardProps<TicTacToeState>;

// 盤面と勝敗結果はplayerIDで管理し、丸・ばつへの変換は表示時に行う
const getDisplayMark = (
  playerID: PlayerID | undefined,
): PlayerMark | undefined =>
  playerID === '0' ? 'X' : playerID === '1' ? 'O' : undefined;

export function TicTacToeBoard({ G, ctx, moves, reset }: TicTacToeBoardProps) {
  const winnerMark = getDisplayMark(ctx.gameover?.winner);
  const isDraw = ctx.gameover?.draw;
  const currentMark = getDisplayMark(ctx.currentPlayer);

  return (
    <main className="game-shell">
      <section className="game-stage">
        <header className="game-header">
          <p className="game-title">三目並べ</p>
          <p
            className={`game-status${ctx.gameover ? ' game-status--result' : ''}`}
            aria-live="polite"
          >
            {winnerMark ? (
              <>
                <MarkShape mark={winnerMark} className="status-mark" />
                <span>の勝ち</span>
              </>
            ) : isDraw ? (
              '引き分け'
            ) : (
              <>
                {currentMark && (
                  <MarkShape mark={currentMark} className="status-mark" />
                )}
                <span>の番</span>
              </>
            )}
          </p>
        </header>

        <div
          className="tic-tac-toe-board"
          role="grid"
          aria-label="Tic-tac-toe board"
        >
          {G.cells.map((cell, index) => {
            const mark = cell ? getDisplayMark(cell) : undefined;

            return (
              <button
                className="tic-tac-toe-cell"
                disabled={cell !== null || ctx.gameover !== undefined}
                key={index}
                onClick={() => moves.clickCell(index)}
                type="button"
              >
                {mark && <MarkShape mark={mark} />}
              </button>
            );
          })}
        </div>

        <div className="game-controls">
          <button
            className={`reset-button${ctx.gameover ? '' : ' reset-button--hidden'}`}
            disabled={!ctx.gameover}
            onClick={reset}
            type="button"
          >
            もう一度
          </button>
        </div>
      </section>
    </main>
  );
}

function MarkShape({
  mark,
  className = '',
}: {
  mark: PlayerMark;
  className?: string;
}) {
  return (
    <span
      className={`tic-tac-toe-mark tic-tac-toe-mark--${mark.toLowerCase()} ${className}`}
    />
  );
}
