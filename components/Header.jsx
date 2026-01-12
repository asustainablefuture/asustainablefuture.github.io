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
        </Link>
        <nav className="site-nav">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
