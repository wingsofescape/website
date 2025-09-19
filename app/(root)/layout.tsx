import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from "@/lib/constants";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

const inter = Montserrat({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s - ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <html lang="en">
        <body className={`${inter.className} antialiased flex flex-col justify-between`}>{children}</body>
      </html>
      <Footer />
    </>
  );
}
