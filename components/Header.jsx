import Link from "next/link";

function encodePath(value) {
  if (!value) return value;
  return value.replace(/ /g, "%20");
}

export default function Header({ nav = [], logo, title }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="logo" href="/">
          {logo ? (
            <img src={encodePath(logo)} alt={title || "A Sustainable Future"} />
          ) : (
            <span>{title || "A Sustainable Future"}</span>
          )}
          <span className="logo-type">A Sustainable<br />Future</span>
        </Link>
        <details className="nav-shell">
          <summary aria-label="Open navigation"><span /><span /><span /></summary>
          <nav className="site-nav" aria-label="Primary navigation">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            <a className="nav-cta" href="mailto:support@asustainablefuture.org?subject=Oregon%20building%20support%20request">Get free help</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
