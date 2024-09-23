import localFont from "next/font/local";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { SocketContextProvider } from "@/context/SocketContext";
import toast, { Toaster } from "react-hot-toast";
import { Providers } from "@/provider/Providers";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="p-4 h-screen flex items-center justify-center">
          <Providers>
            <AuthContextProvider>
              <SocketContextProvider>
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                <Toaster position="top-center" reverseOrder={false} />
              </SocketContextProvider>
            </AuthContextProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
