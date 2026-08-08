import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSiteConfig } from "../lib/content";

export const metadata = {
  metadataBase: new URL("https://www.asustainablefuture.org"),
  title: {
    default: "A Sustainable Future | Free Oregon building energy support",
    template: "%s | A Sustainable Future",
  },
  description:
    "Free, independent help for Oregon building owners preparing for energy reporting and measurable savings.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "A Sustainable Future",
    title: "Free Oregon building energy support",
    description: "Understand the requirements, organize your data, and start saving energy.",
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
