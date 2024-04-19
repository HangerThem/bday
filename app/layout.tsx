import type { Metadata } from "next";
import { GlobalStyle } from "@/styles/globalStyle";
import { K2D } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";

const k2d = K2D({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy birthday!",
  description: "A birthday surprise for a friend.",
  authors: [
    {
      name: "HangerThem",
      url: "https://hangerthem.com",
    },
  ],
  category: "Birthday",
  keywords: ["birthday", "surprise", "friend"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <GlobalStyle />
        <body className={k2d.className}>{children}</body>
      </StyledComponentsRegistry>
    </html>
  );
}
