import Link from "next/link";

const tier2 = "https://www.commerce.wa.gov/cbps/tier-2-compliance/";
const incentives =
  "https://www.commerce.wa.gov/cbps/cbps-grants-incentives/cbps-tier2-early-adopter-incentive/";
const portfolioManager = "https://www.energystar.gov/buildings/benchmark";

export const metadata = {
  title: "Free Washington Tier 2 readiness help | A Sustainable Future",
  description:
    "Free, independent help for Washington building owners preparing for Tier 2 Clean Buildings reporting by July 1, 2027.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">Free Washington Tier 2 readiness help.</h1>
          <p className="hero-lede">
            If your building may be covered by Washington&apos;s Clean Buildings
            Performance Standard, we can help you understand the Tier 2 steps,
            organize the records, and prepare for the July 1, 2027 deadline&mdash;at
            no cost.
          </p>
          <div className="button-row">
            <a
              className="button button-primary"
              href="mailto:support@asustainablefuture.org?subject=Washington%20Tier%202%20readiness%20help&body=Building%20address%3A%0AApproximate%20square%20feet%3A%0ABuilding%20use%3A%0AWhat%20would%20you%20like%20help%20with%3F%0A"
            >
              Ask for free help
            </a>
            <Link className="button button-secondary" href="/washington-tier-2">
              Read the Tier 2 guide
            </Link>
          </div>
          <p className="trust-note">
            Independent public-interest initiative &middot; Not affiliated with or
            endorsed by the Washington State Department of Commerce &middot; Official
            requirements control
          </p>
        </div>
        <div className="hero-visual" aria-label="Washington Tier 2 readiness sequence">
          <div className="impact-card impact-card-main">
            <strong>Confirm the building</strong>
            <span>use &middot; floor area &middot; state record</span>
          </div>
          <div className="impact-card impact-card-small impact-card-a">
            <strong>Organize the work</strong>
            <span>benchmarking &middot; O&amp;M &middot; energy plan</span>
          </div>
          <div className="impact-card impact-card-small impact-card-b">
            <strong>Prepare to report</strong>
            <span>Portal access &middot; documentation &middot; next steps</span>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Washington Tier 2 highlights">
        <div className="container signal-grid">
          <div><strong>20,000+ sq ft</strong><span>general Tier 2 starting threshold</span></div>
          <div><strong>July 1, 2027</strong><span>first reporting deadline</span></div>
          <div><strong>Every five years</strong><span>reporting schedule after 2027</span></div>
        </div>
      </section>

      <section className="section container" id="services">
        <div className="section-heading">
          <h2>Know what applies and what to prepare.</h2>
          <p>
            Commerce identifies three core Tier 2 requirements: benchmark energy
            use, implement an operations and maintenance program, and create an
            energy management plan. We help with the practical readiness work
            around those requirements.
          </p>
        </div>
        <div className="service-grid">
          <article className="service-card"><span>01</span><h3>Coverage screen</h3><p>Compare building use and gross floor area with the current Commerce Tier 2 definition and flag questions for the state.</p></article>
          <article className="service-card"><span>02</span><h3>Building record check</h3><p>Organize ownership, address, state notification, floor area, parking, activity types, and Portal access details.</p></article>
          <article className="service-card"><span>03</span><h3>Benchmarking readiness</h3><p>Map meters, fuels, account holders, missing data, and Portfolio Manager inputs before relying on an energy-use calculation.</p></article>
          <article className="service-card"><span>04</span><h3>O&amp;M checklist</h3><p>Build an equipment, systems, maintenance, and responsibility inventory using current Commerce tools as the reference.</p></article>
          <article className="service-card"><span>05</span><h3>Energy plan outline</h3><p>Structure goals, roles, energy history, target information, and operating practices for an owner-reviewed energy management plan.</p></article>
          <article className="service-card"><span>06</span><h3>Portal and handoff prep</h3><p>Identify the documents, access questions, state support requests, and professional work that remain before reporting.</p></article>
        </div>
      </section>

      <section className="section section-tint" id="requirements">
        <div className="container">
          <div className="section-heading split-heading">
            <div><h2>Tier 2 is a reporting and planning standard.</h2></div>
            <p>These are orientation summaries, not a building-specific determination. Confirm current requirements with Commerce.</p>
          </div>
          <div className="tier-grid">
            <article className="tier-card tier-one">
              <div className="tier-top"><span>Likely coverage</span><strong>Washington Tier 2</strong></div>
              <h3>More than 20,000 and not more than 50,000 sq ft of covered uses</h3>
              <ul>
                <li>Combines multifamily, nonresidential, hotel, motel, and dormitory floor areas</li>
                <li>Excludes parking-garage area</li>
                <li>Also includes multifamily buildings at or above 50,000 sq ft</li>
                <li>Federal and federally recognized tribal buildings are excluded</li>
              </ul>
            </article>
            <article className="tier-card tier-two">
              <div className="tier-top"><span>Current work</span><strong>Due July 1, 2027</strong></div>
              <h3>Benchmark, operate, plan, and report</h3>
              <ul>
                <li>Benchmark and track building energy use</li>
                <li>Implement an operations and maintenance program</li>
                <li>Create an energy management plan</li>
                <li>Identify the energy-use intensity target; Tier 2 does not currently have to meet a performance metric</li>
              </ul>
            </article>
          </div>
          <div className="source-row">
            <a href={tier2}>Verify Tier 2 with Washington Commerce <span aria-hidden="true">&rarr;</span></a>
            <a href={incentives}>Check the current early-adopter incentive <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
      </section>

      <section className="section container" id="process">
        <div className="section-heading"><h2>One building, one useful next step at a time.</h2></div>
        <ol className="process-list">
          <li><span>1</span><div><h3>Share the starting facts</h3><p>An address, approximate floor area, main uses, and any Commerce notification are enough to begin.</p></div></li>
          <li><span>2</span><div><h3>Receive a readiness map</h3><p>We summarize likely coverage, the 2027 deadline, missing records, official sources, and the next responsible person.</p></div></li>
          <li><span>3</span><div><h3>Organize the owner&apos;s work</h3><p>We help assemble benchmarking, O&amp;M, energy-plan, and Portal-readiness materials without taking over the owner&apos;s responsibility.</p></div></li>
          <li><span>4</span><div><h3>Escalate the right questions</h3><p>We flag state determinations, authorizations, engineering, audits, and other work that must go to Commerce or an appropriately qualified professional.</p></div></li>
        </ol>
      </section>

      <section className="section story-section" id="about">
        <div className="container story-grid">
          <div className="story-mark"><span>Data</span><span>People</span><span>Impact</span></div>
          <div>
            <h2>Clear records should lead to practical action.</h2>
            <p>A Sustainable Future began with student-led work on resource consumption in schools. Our building support keeps that approach: make the information understandable, make the first steps accessible, and keep the owner connected to official guidance.</p>
            <div className="text-links">
              <a href="https://paper.asustainablefuture.org/">Visit the Paper Consumption Model site</a>
              <Link href="/oregon-building-support">View the Oregon building guide</Link>
              <Link href="/archive">Explore earlier resources</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="cta-panel">
          <div><h2>Have a Commerce letter, a meter list, or just an address?</h2><p>Start where you are. We&apos;ll help turn it into an owner-ready checklist.</p></div>
          <a className="button button-light" href="mailto:support@asustainablefuture.org?subject=Washington%20Tier%202%20readiness%20help">Start a conversation</a>
        </div>
        <p className="legal-note">
          A Sustainable Future is independent and is not affiliated with or
          endorsed by the Washington State Department of Commerce, ENERGY STAR,
          or any utility. We provide educational and administrative readiness
          support, not legal, engineering, audit, certification, or guaranteed
          compliance services. Official requirements and Commerce decisions
          control. ENERGY STAR Portfolio Manager is a U.S. EPA tool; access it at{" "}
          <a href={portfolioManager}>energystar.gov</a>.
        </p>
      </section>
    </>
  );
}
