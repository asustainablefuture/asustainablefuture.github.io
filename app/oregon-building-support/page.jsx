const bps = "https://www.oregon.gov/energy/save-energy/Pages/BPS.aspx";
const faq = "https://www.oregon.gov/energy/save-energy/Documents/BPS-FAQs.pdf";
const compliance = "https://www.oregon.gov/energy/save-energy/Documents/BPS001-compliance.pdf";
const incentives = "https://www.oregon.gov/energy/save-energy/Pages/BPS-incentives.aspx";
const portland = "https://www.portland.gov/bps/article/542355";
const beam = "https://orbps.beam-portal.org/";

export const metadata = {
  title: "Oregon building performance support",
  description: "A plain-language orientation to Oregon Building Performance Standard tiers, deadlines, preparation, and free support.",
  alternates: { canonical: "/oregon-building-support/" },
};

export default function OregonBuildingSupportPage() {
  return (
    <article className="guide-page container">
      <header className="guide-hero">
        <h1>Know what applies. Gather the right data. Start early.</h1>
        <p>Use this guide for orientation, then verify your building and submission requirements with the Oregon Department of Energy.</p>
        <div className="button-row"><a className="button button-primary" href="mailto:support@asustainablefuture.org?subject=Oregon%20BPS%20readiness%20help">Ask for free help</a><a className="button button-secondary" href={bps}>Open the official ODOE page</a></div>
      </header>

      <nav className="guide-nav" aria-label="On this page">
        <a href="#coverage">Coverage</a><a href="#deadlines">Deadlines</a><a href="#prepare">Prepare</a><a href="#portland">Portland</a><a href="#resources">Official resources</a>
      </nav>

      <section id="coverage" className="guide-section">
        <h2>Start with use and gross floor area.</h2>
        <div className="comparison-table" role="table" aria-label="Oregon BPS coverage summary">
          <div className="comparison-row comparison-head" role="row"><span>Building</span><span>Likely tier</span><span>First due date</span></div>
          <div className="comparison-row" role="row"><span>Nonresidential, hotel, or motel, 200,000+ sq ft</span><span>Tier 1</span><span>June 1, 2028</span></div>
          <div className="comparison-row" role="row"><span>Nonresidential, hotel, or motel, 90,000 to under 200,000 sq ft</span><span>Tier 1</span><span>June 1, 2029</span></div>
          <div className="comparison-row" role="row"><span>Nonresidential, hotel, or motel, 35,000 to under 90,000 sq ft</span><span>Tier 1</span><span>June 1, 2030</span></div>
          <div className="comparison-row" role="row"><span>Nonresidential, hotel, or motel, 20,000 to under 35,000 sq ft</span><span>Tier 2</span><span>July 1, 2028</span></div>
          <div className="comparison-row" role="row"><span>35,000+ sq ft multifamily, hospital, school, university, dormitory, barracks, prison, or residential/senior care</span><span>Tier 2</span><span>July 1, 2028</span></div>
        </div>
        <p className="callout">Parking-garage area is excluded from these threshold calculations. Mixed-use, campus, historic, low-occupancy, industrial, agricultural, and hardship situations need closer review. Not receiving a notice does not by itself establish that a building is outside the program.</p>
      </section>

      <section id="deadlines" className="guide-section">
        <h2>Tier 1 must demonstrate performance or an approved pathway. Tier 2 currently reports data.</h2>
        <div className="plain-grid">
          <div><h3>Tier 1</h3><p>Calculate energy use intensity and the applicable target; maintain an operations and maintenance program and an energy management plan; meet the target, document an exemption, or follow an available conditional-compliance pathway. Buildings expecting to exceed the target may need a qualified audit, life-cycle cost analysis, and advance reporting.</p></div>
          <div><h3>Tier 2</h3><p>Report energy use intensity and the applicable target by July 1, 2028 and every five years. Oregon law does not currently require Tier 2 owners to meet a performance target, and ODOE guidance says there are currently no Tier 2 penalties.</p></div>
        </div>
        <p>Some forms must be prepared or signed by a Qualified Person, Qualified Energy Manager, or Qualified Energy Auditor. A Sustainable Future can help organize records, but cannot substitute for those credentials.</p>
      </section>

      <section id="prepare" className="guide-section">
        <h2>Build the record before the deadline becomes urgent.</h2>
        <ol className="check-list">
          <li><span>1</span><div><h3>Confirm the building record</h3><p>Gather legal ownership, address, ODOE/UBID or BEAM record, gross floor area, primary and secondary uses, occupancy, and parking area.</p></div></li>
          <li><span>2</span><div><h3>Map every energy source</h3><p>List electric, gas, district energy, delivered fuels, onsite generation, tenant meters, account holders, and at least 12 continuous months of consumption.</p></div></li>
          <li><span>3</span><div><h3>Set up benchmarking</h3><p>Use ENERGY STAR Portfolio Manager and validate property-use details before relying on calculated EUI. Oregon&apos;s calculations require recent continuous data and weather normalization.</p></div></li>
          <li><span>4</span><div><h3>Request whole-building data when needed</h3><p>Qualifying large utilities must provide certain aggregated data at no cost when a covered building meets account thresholds. Confirm eligibility and request format with the utility.</p></div></li>
          <li><span>5</span><div><h3>Compare EUI to the target</h3><p>Tier 1 buildings above target should engage an approved energy professional early enough to assess compliance paths and cost-effective measures.</p></div></li>
          <li><span>6</span><div><h3>Check live incentives</h3><p>Funding windows and available balances change. Verify eligibility before incurring costs or promising a rebate.</p></div></li>
        </ol>
      </section>

      <section id="portland" className="guide-section">
        <h2>Portland reporting is separate.</h2>
        <p>Portland generally requires commercial buildings 20,000 square feet and larger to report annual energy performance by April 22. Coverage and exemptions differ from the state program. A Portland building may have to satisfy both city and state requirements, on different schedules.</p>
        <a className="inline-action" href={portland}>Review Portland&apos;s official commercial reporting page <span aria-hidden="true">&rarr;</span></a>
      </section>

      <section id="resources" className="guide-section">
        <h2>Use official instructions for decisions and submissions.</h2>
        <div className="resource-list">
          <a href={bps}><strong>ODOE Building Performance Standard</strong><span>Current program notices, guidance, tools, professional lists, and contacts</span></a>
          <a href={compliance}><strong>ODOE Tier 1 and Tier 2 compliance guide</strong><span>Coverage, forms, pathways, and reporting overview</span></a>
          <a href={faq}><strong>ODOE frequently asked questions</strong><span>Responsibilities, professional roles, forms, and common edge cases</span></a>
          <a href={incentives}><strong>ODOE BPS incentives</strong><span>Live funding status, deadlines, and application materials</span></a>
          <a href={beam}><strong>Oregon BEAM compliance portal</strong><span>Building records and compliance submissions</span></a>
        </div>
        <p className="legal-note">This page is educational and may not reflect a later rule, interpretation, funding update, or building-specific determination. It is not legal or engineering advice. ODOE&apos;s current rules, guidance, and decisions control.</p>
      </section>
    </article>
  );
}
