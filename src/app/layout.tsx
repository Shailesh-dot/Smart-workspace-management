import "./globals.css";
import ClientLayout from "./ClientLayout";
import { ThemeProvider } from "../ThemeContext";

export const metadata = {
  title: "Proactive Intelligence Dashboard",
  description: "Advanced workforce analytics and management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
