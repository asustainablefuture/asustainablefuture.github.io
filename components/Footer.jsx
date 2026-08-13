export default function Footer({ footer }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <h3>Clear information. Practical support. Measurable energy savings.</h3>
        </div>
        <div className="footer-links"><a href="/washington-tier-2">Washington Tier 2 guide</a><a href="/oregon-building-support">Oregon building guide</a><a href="https://paper.asustainablefuture.org/">Paper program</a><a href="/archive">Archive</a><a href="mailto:contact@asustainablefuture.org">Contact</a></div>
        <div className="footer-bottom"><p className="footer-note">{footer?.note}</p><p>Independent and not affiliated with Washington Commerce, ODOE, or the City of Portland.</p></div>
      </div>
    </footer>
  );
}
