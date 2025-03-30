import "./Header.css";

export function Header() {
  return (
    <div>
      <header className="area-nav">
        <nav className="header-nav">
          <a className="title-site" href="">
            <img className="logo" src="/Logo.png" alt="" />
          </a>
          <a href="https://github.com/Zanixpy" target="blank">
            Github
          </a>
          <div className="sign-button">
          <a href="">Sign in</a>
          <a href="">Sign up</a>
          </div>
        </nav>
      </header>
    </div>
  );
}
