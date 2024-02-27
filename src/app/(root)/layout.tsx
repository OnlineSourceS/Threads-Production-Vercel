import "@/app/globals.css";
import BottomBar from "@/components/shared/BottomBar";
import RightSidebar from "@/components/shared/RightSidebar";
import TopBar from "../../components/shared/TopBar";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import LeftSideBarContainer from "@/components/containers/LeftSideBarContainer";
import { Toaster } from "sonner";
 
import NotificationBar from "./NotificationBar";
import NavigationBackForward from "../../components/shared/NavigateBackForward";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-black`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <NotificationBar></NotificationBar>
            {/* server-side component  */}
            <TopBar />
            <main className="bg-black w-full p-0 flex flex-row gap-2">
              {/* client-side component  */}
              <LeftSideBarContainer />
              <section className=" text-white w-[68%] p-2 overflow-y-scroll">
                <Toaster invert />
                <NavigationBackForward />
                <div className="py-4">{children}</div>
              </section>

              {/* server-side-component  */}
              <RightSidebar />
            </main>

            {/* client-side component  */}
            <BottomBar />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
