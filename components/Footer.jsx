export default function Footer({ footer }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <h3>A Sustainable Future Network</h3>
          <p>{footer?.tagline}</p>
        </div>
        <p className="footer-note">{footer?.note}</p>
      </div>
    </footer>
  );
}
