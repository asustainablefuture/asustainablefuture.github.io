import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSiteConfig } from "../lib/content";

export const metadata = {
  title: "A Sustainable Future",
  description:
    "Harnessing and sharing the power of data to create mindful, sustainable resource consumption habits in the academic setting, one school at a time.",
};

export default async function RootLayout({ children }) {
  const site = await getSiteConfig();

  return (
    <html lang="en">
      <body>
        <div className="site">
          <Header nav={site.nav} logo={site.logo} title={site.title} />
          <main className="site-main">{children}</main>
          <Footer footer={site.footer} />
        </div>
      </body>
    </html>
  );
}
