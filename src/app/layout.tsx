import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Provider from "@/context/ClientProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/service/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FakeInsta",
  description: "FakeInsta",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="flex flex-col bg-slate-50">
        <Provider session={session}>
          <Header />
          <main className="flex flex-col max-w-screen-lg w-full mx-auto grow ">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
