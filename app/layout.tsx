import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { FC } from "react";
import { IChildrenNode } from "@/interfaces/ParamsInterfaces";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

const RootLayout: FC<IChildrenNode> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-center"
            closeButton
            mobileOffset={{ top: 10 }}
            toastOptions={{
              classNames: {
                success: "!bg-green-600",
                error: "!bg-red-500",
                title: "!text-white",
                icon: "text-white",
                closeButton: "!left-[99%]"
              },
            }}
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
