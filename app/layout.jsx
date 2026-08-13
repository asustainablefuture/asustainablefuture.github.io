import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSiteConfig } from "../lib/content";

export const metadata = {
  metadataBase: new URL("https://www.asustainablefuture.org"),
  title: {
    default: "A Sustainable Future | Free Washington Tier 2 readiness help",
    template: "%s | A Sustainable Future",
  },
  description:
    "Free, independent help for Washington building owners preparing for Tier 2 Clean Buildings reporting by July 1, 2027.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "A Sustainable Future",
    title: "Free Washington Tier 2 readiness help",
    description: "Understand the requirements, organize the building record, and prepare for July 1, 2027.",
    url: "https://www.asustainablefuture.org/",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }) {
  const site = await getSiteConfig();

  return (
    <html lang="en">
      <body>
        <div className="site">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Header nav={site.nav} logo={site.logo} title={site.title} />
          <main className="site-main" id="main-content">{children}</main>
          <Footer footer={site.footer} />
        </div>
      </body>
    </html>
  );
}
