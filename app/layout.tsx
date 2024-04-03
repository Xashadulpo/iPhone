import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import "@/styles/globals.css";
import LayoutProvider from "@/utils/LayoutProvider";
export const apple_logo = "/assets/images/Apple_Logo.svg";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>iPhone</title>
      <link rel="icon" href={apple_logo} />
      <body>
        <Navbar />
        <LayoutProvider>{children}</LayoutProvider>
        <Footer/>
      </body>
    </html>
  );
}
