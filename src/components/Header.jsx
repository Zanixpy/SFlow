import "./Header.css";

export function Header() {
  return (
    <div>
      <header className="area-nav">
        <nav className="header-nav">
          <a className="title-site" href="">
            <img className="logo" src="/Zwork.png" alt="" />
            <span>Zwork Tool</span>
          </a>
          <a href="https://github.com/Zanixpy" target="blank">
            Github
          </a>
          <a href="">Sign in</a>
        </nav>
      </header>
    </div>
  );
}
