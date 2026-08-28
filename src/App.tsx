import './App.css';

const games = [
  {
    title: '三目ならべ',
    description: '3×3の盤面で遊ぶ、シンプルな二人用ゲームです。',
    status: '制作中',
  },
];

function App() {
  return (
    <div className="app">
      <header className="site-header">
        <a className="site-logo" href="/">
          Boardgame Portal
        </a>

        <nav aria-label="メインメニュー">
          <a href="#games">ゲーム一覧</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">BROWSER BOARD GAMES</p>
          <h1>ボードゲームを、もっと気軽に。</h1>
          <p className="hero-description">
            いろいろなボードゲームをブラウザで遊べるサイトを制作しています。
          </p>
        </section>

        <section className="games-section" id="games">
          <div className="section-heading">
            <p className="eyebrow">GAMES</p>
            <h2>遊べるゲーム</h2>
          </div>

          <div className="game-grid">
            {games.map((game) => (
              <article className="game-card" key={game.title}>
                <span className="game-status">{game.status}</span>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <button type="button" disabled>
                  準備中
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Boardgame Portal</p>
      </footer>
    </div>
  );
}

export default App;
