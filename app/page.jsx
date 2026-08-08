import Link from "next/link";

const officialBps =
  "https://www.oregon.gov/energy/save-energy/Pages/BPS.aspx";
const officialIncentives =
  "https://www.oregon.gov/energy/save-energy/Pages/BPS-incentives.aspx";
const portfolioManager = "https://www.energystar.gov/buildings/benchmark";

export const metadata = {
  title: "Free Oregon building energy support | A Sustainable Future",
  description:
    "Free, independent help for Oregon building owners preparing for Building Performance Standard reporting and energy-saving action.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Free support for Oregon building owners</p>
          <h1 id="hero-title">Turn energy reporting into energy saved.</h1>
          <p className="hero-lede">
            Oregon&apos;s Building Performance Standard is here. We help owners
            understand what applies, organize building and utility data, begin
            benchmarking, and find the right next step&mdash;at no cost.
          </p>
          <div className="button-row">
            <a
              className="button button-primary"
              href="mailto:asustainablefuturetechnology@gmail.com?subject=Oregon%20building%20support%20request&body=Building%20address%3A%0AApproximate%20square%20feet%3A%0ABuilding%20type%3A%0AWhat%20would%20you%20like%20help%20with%3F%0A"
            >
              Request free support
            </a>
            <Link className="button button-secondary" href="/oregon-building-support">
              Check the requirements
            </Link>
          </div>
          <p className="trust-note">
            Independent nonprofit initiative &middot; No sales pressure &middot; We do
            not represent or speak for the State of Oregon
          </p>
        </div>
        <div className="hero-visual" aria-label="A clear path from building data to energy savings">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="impact-card impact-card-main">
            <span className="impact-kicker">Start here</span>
            <strong>Know your building</strong>
            <span>type &middot; size &middot; energy use</span>
          </div>
          <div className="impact-card impact-card-small impact-card-a">
            <strong>Benchmark</strong>
            <span>12 months of data</span>
          </div>
          <div className="impact-card impact-card-small impact-card-b">
            <strong>Act</strong>
            <span>prioritize real savings</span>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Oregon program highlights">
        <div className="container signal-grid">
          <div><strong>20,000+ sq ft</strong><span>smallest statewide coverage threshold</span></div>
          <div><strong>2028&ndash;2030</strong><span>phased state reporting dates</span></div>
          <div><strong>$11.6M</strong><span>approx. BERI Round 2 funds listed by ODOE</span></div>
        </div>
      </section>

      <section className="section container" id="services">
        <div className="section-heading">
          <p className="eyebrow">Practical help, not another pitch</p>
          <h2>A calm first step through a complicated process.</h2>
          <p>
            We focus on the early work that often keeps owners from getting
            started. When a task must be completed by an Oregon-qualified energy
            professional, we say so clearly and help prepare an organized handoff.
          </p>
        </div>
        <div className="service-grid">
          <article className="service-card"><span>01</span><h3>Coverage screen</h3><p>Map building type and floor area to the likely state tier and Portland overlap.</p></article>
          <article className="service-card"><span>02</span><h3>Data readiness</h3><p>Build a clean checklist for meters, bills, floor area, occupancy, and contacts.</p></article>
          <article className="service-card"><span>03</span><h3>Benchmarking setup</h3><p>Help organize inputs for ENERGY STAR Portfolio Manager and Oregon&apos;s BEAM portal.</p></article>
          <article className="service-card"><span>04</span><h3>Incentive triage</h3><p>Check current official programs and identify questions to resolve before applying.</p></article>
          <article className="service-card"><span>05</span><h3>Action roadmap</h3><p>Turn findings into owners, dates, low-cost actions, and a measured improvement plan.</p></article>
          <article className="service-card"><span>06</span><h3>Qualified handoff</h3><p>Package records for an approved auditor or qualified person when credentials are required.</p></article>
        </div>
      </section>

      <section className="section section-tint" id="requirements">
        <div className="container">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">Oregon BPS at a glance</p><h2>Different buildings have different jobs.</h2></div>
            <p>These are orientation summaries, not legal advice. Confirm coverage and current instructions with ODOE.</p>
          </div>
          <div className="tier-grid">
            <article className="tier-card tier-one">
              <div className="tier-top"><span>Tier 1</span><strong>Performance + reporting</strong></div>
              <h3>Most nonresidential, hotel, and motel space at 35,000+ sq ft</h3>
              <ul>
                <li>Benchmark energy use and calculate the applicable target</li>
                <li>Maintain operations and energy-management plans</li>
                <li>Meet the target or use an approved compliance pathway</li>
                <li>Due June 1, 2028, 2029, or 2030 based on size</li>
              </ul>
            </article>
            <article className="tier-card tier-two">
              <div className="tier-top"><span>Tier 2</span><strong>Benchmarking + reporting</strong></div>
              <h3>Selected 20,000&ndash;35,000 sq ft commercial and 35,000+ sq ft special uses</h3>
              <ul>
                <li>Includes qualifying multifamily, schools, hospitals, universities, and care facilities</li>
                <li>Report energy use intensity and the applicable target</li>
                <li>No current requirement to meet the target</li>
                <li>First report due July 1, 2028</li>
              </ul>
            </article>
          </div>
          <div className="source-row">
            <a href={officialBps}>Verify with Oregon Department of Energy <span aria-hidden="true">&rarr;</span></a>
            <a href={officialIncentives}>See current ODOE incentives <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
      </section>

      <section className="section container" id="process">
        <div className="section-heading"><p className="eyebrow">How support works</p><h2>One building, one useful next step at a time.</h2></div>
        <ol className="process-list">
          <li><span>1</span><div><h3>Tell us what you know</h3><p>An address, approximate floor area, building use, and any ODOE notice are enough to begin.</p></div></li>
          <li><span>2</span><div><h3>Get a written readiness map</h3><p>We summarize likely coverage, deadlines, missing data, official resources, and who should own each task.</p></div></li>
          <li><span>3</span><div><h3>Work through the blockers</h3><p>We help with the administrative steps we can complete safely and flag work reserved for qualified professionals.</p></div></li>
          <li><span>4</span><div><h3>Measure what changes</h3><p>Track reporting completion, energy projects, utility savings, and estimated energy reduced&mdash;not just outreach volume.</p></div></li>
        </ol>
      </section>

      <section className="section story-section" id="about">
        <div className="container story-grid">
          <div className="story-mark"><span>Data</span><span>People</span><span>Impact</span></div>
          <div>
            <p className="eyebrow">A Sustainable Future</p>
            <h2>Built on the belief that good data should lead to real-world action.</h2>
            <p>A Sustainable Future began with student-led work on resource consumption in schools. Our Oregon building initiative carries that same idea forward: make the information understandable, make help accessible, and measure the energy actually saved.</p>
            <div className="text-links">
              <Link href="/research">Explore our earlier research</Link>
              <Link href="/archive">Visit the resource archive</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="cta-panel">
          <div><p className="eyebrow">No-cost building support</p><h2>Have a notice, a spreadsheet, or just an address?</h2><p>Start where you are. We&apos;ll help turn it into a practical plan.</p></div>
          <a className="button button-light" href="mailto:asustainablefuturetechnology@gmail.com?subject=Oregon%20building%20support%20request">Start a conversation</a>
        </div>
        <p className="legal-note">
          A Sustainable Future is an independent organization and is not affiliated
          with or endorsed by ODOE, the City of Portland, ENERGY STAR, or any
          utility. We provide educational and administrative support, not legal,
          engineering, audit, or certification services. Official requirements
          control. ENERGY STAR Portfolio Manager is a free U.S. EPA tool; access it
          at <a href={portfolioManager}>energystar.gov</a>.
        </p>
      </section>
    </>
  );
}
