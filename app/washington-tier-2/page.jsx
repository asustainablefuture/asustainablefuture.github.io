const tier2 = "https://www.commerce.wa.gov/cbps/tier-2-compliance/";
const portal = "https://www.commerce.wa.gov/cbps/portal/";
const documents =
  "https://www.commerce.wa.gov/cbps/cbps-support-and-resources/cbps-documents/";
const support =
  "https://www.commerce.wa.gov/cbps/cbps-support-and-resources/cbps-support/";
const incentives =
  "https://www.commerce.wa.gov/cbps/cbps-grants-incentives/cbps-tier2-early-adopter-incentive/";
const rulemaking =
  "https://www.commerce.wa.gov/cbps/cbps-support-and-resources/cbps-training-and-workgroups/";

export const metadata = {
  title: "Washington Tier 2 readiness guide",
  description:
    "A plain-language guide to Washington Clean Buildings Tier 2 coverage, requirements, the July 1, 2027 deadline, and free readiness help.",
  alternates: { canonical: "/washington-tier-2/" },
};

export default function WashingtonTier2Page() {
  return (
    <article className="guide-page container">
      <header className="guide-hero">
        <h1>Prepare for Washington Tier 2 by July 1, 2027.</h1>
        <p>Use this guide for orientation, then verify your building, records, and reporting requirements with the Washington State Department of Commerce.</p>
        <div className="button-row"><a className="button button-primary" href="mailto:support@asustainablefuture.org?subject=Washington%20Tier%202%20readiness%20help">Ask for free help</a><a className="button button-secondary" href={tier2}>Open the official Commerce page</a></div>
      </header>

      <nav className="guide-nav" aria-label="On this page">
        <a href="#coverage">Coverage</a><a href="#requirements">Requirements</a><a href="#prepare">Prepare</a><a href="#incentive">Incentive</a><a href="#resources">Official resources</a>
      </nav>

      <section id="coverage" className="guide-section">
        <h2>Start with building use and gross floor area.</h2>
        <div className="comparison-table" role="table" aria-label="Washington Tier 2 coverage summary">
          <div className="comparison-row comparison-head" role="row"><span>Building</span><span>Likely track</span><span>First due date</span></div>
          <div className="comparison-row" role="row"><span>Combined multifamily, nonresidential, hotel, motel, and dormitory area over 20,000 through 50,000 sq ft</span><span>Tier 2</span><span>July 1, 2027</span></div>
          <div className="comparison-row" role="row"><span>Multifamily residential building at or above 50,000 sq ft</span><span>Tier 2</span><span>July 1, 2027</span></div>
          <div className="comparison-row" role="row"><span>Nonresidential, hotel, motel, or dormitory building over 50,000 sq ft</span><span>Check Tier 1</span><span>Size-based schedule</span></div>
        </div>
        <p className="callout">Commerce excludes parking-garage area from the Tier 2 threshold. Federal buildings and buildings owned by federally recognized tribes are not required to comply. Mixed-use, connected, campus, condominium, industrial, agricultural, exemption, and incorrect-record situations need a building-specific review. A notification letter is useful, but Commerce remains the authority on coverage and corrections.</p>
      </section>

      <section id="requirements" className="guide-section">
        <h2>Tier 2 has three core readiness requirements.</h2>
        <div className="plain-grid requirements-grid">
          <div><h3>Benchmark energy use</h3><p>Measure and track building energy use over time. This normally requires a complete meter and fuel inventory, reliable consumption data, correct activity and floor-area information, and a sound ENERGY STAR Portfolio Manager record.</p></div>
          <div><h3>Implement an O&amp;M program</h3><p>Document the building&apos;s systems, equipment, recurring maintenance tasks, responsibilities, and operating practices. Commerce provides an optional O&amp;M Program Development Tool.</p></div>
          <div><h3>Create an energy management plan</h3><p>Set out goals, responsible roles, energy history, EUI and target information, and the procedures used to manage performance. Commerce provides an optional EMP template.</p></div>
        </div>
        <p>Commerce says Tier 2 buildings must identify an energy-use intensity target, but they are not currently required to meet a performance metric. Owners still must document and report the required benchmarking, O&amp;M, and energy-management work by July 1, 2027 and every five years afterward.</p>
        <p className="callout">Commerce also states that Tier 2 compliance requires a qualified energy manager. ASF&apos;s free service helps owners prepare records, questions, and an organized handoff; ASF does not claim that credential or replace the owner, Commerce, or a qualified professional.</p>
      </section>

      <section id="prepare" className="guide-section">
        <h2>Build an owner-ready record before reporting.</h2>
        <ol className="check-list">
          <li><span>1</span><div><h3>Confirm the building record</h3><p>Gather ownership, address, Washington Building ID or notification letter, parcel information, gross floor area, parking area, and current building uses. Use Commerce&apos;s data support route when the state record is incorrect.</p></div></li>
          <li><span>2</span><div><h3>Establish Portal access</h3><p>Create or confirm the owner&apos;s Secure Access Washington account and Clean Buildings Portal access. Shared access must be granted by the owner; ASF does not claim or control a building without authorization.</p></div></li>
          <li><span>3</span><div><h3>Map every meter and fuel</h3><p>List electric, gas, thermal energy, delivered fuels, onsite generation, tenant meters, utility account holders, and missing periods. Resolve data gaps before trusting the benchmark.</p></div></li>
          <li><span>4</span><div><h3>Validate benchmarking inputs</h3><p>Review building activity types, floor area, hours, occupancy, and meter associations in Portfolio Manager. Record the calculated EUI and the applicable target rather than estimating from memory.</p></div></li>
          <li><span>5</span><div><h3>Document O&amp;M and energy management</h3><p>Use the current integrated standard and Commerce tools to assign owners, schedules, goals, equipment tasks, and review dates. Templates are optional; the underlying requirements are not.</p></div></li>
          <li><span>6</span><div><h3>Prepare the reporting package</h3><p>Check the current Portal guide, forms, exemptions, extensions, signatures, and attachments. Send building-specific determinations to Commerce and credentialed work to an appropriately qualified professional.</p></div></li>
        </ol>
      </section>

      <section id="incentive" className="guide-section">
        <h2>Early action may qualify for a state incentive.</h2>
        <p>Commerce reports that the Tier 2 Early Adopter Incentive Program has $150 million allocated and accepts compliance and incentive applications through July 1, 2027. The base calculation is $0.30 per eligible square foot. Qualifying multifamily owners who sign the required anti-displacement agreement may be eligible for an enhanced amount up to $0.75 per square foot or the cost of compliance, whichever is lower.</p>
        <p className="callout">An incentive is not guaranteed. Commerce reviews applications; participating utilities make payments on a first-come, first-served basis; utility participation, available tax credits, eligible area, costs, and current program terms affect the result. Verify the live guide before spending money or relying on an award.</p>
        <a className="inline-action" href={incentives}>Review the official Tier 2 incentive page <span aria-hidden="true">&rarr;</span></a>
      </section>

      <section id="resources" className="guide-section">
        <h2>Use current Commerce instructions for decisions and reporting.</h2>
        <div className="resource-list">
          <a href={tier2}><strong>Commerce Tier 2 compliance</strong><span>Coverage, requirements, deadline, tools, and reporting sequence</span></a>
          <a href={portal}><strong>Clean Buildings Portal</strong><span>Owner access, notification codes, building records, corrections, and applications</span></a>
          <a href={documents}><strong>CBPS Document Library</strong><span>Current integrated-standard access, Tier 2 guidance, Portal guide, EMP template, and O&amp;M tool</span></a>
          <a href={support}><strong>Commerce support and office hours</strong><span>Official technical assistance, roles, office hours, and customer support route</span></a>
          <a href={incentives}><strong>Tier 2 Early Adopter Incentive</strong><span>Current availability, guidebook, participating utilities, rates, and application terms</span></a>
          <a href={rulemaking}><strong>Rulemaking and training updates</strong><span>Final-rule notices, workshops, training, and future changes</span></a>
        </div>
        <p className="legal-note">This page is educational and may not reflect a later rule, guidance update, incentive balance, or building-specific Commerce determination. A Sustainable Future is independent and is not affiliated with or endorsed by Commerce. This is not legal, engineering, audit, certification, or guaranteed compliance advice. Official requirements and Commerce decisions control.</p>
      </section>
    </article>
  );
}
