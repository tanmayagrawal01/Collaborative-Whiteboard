import "./globals.css";
import { AppStateProvider } from "./providers";

export const metadata = {
  title: "Collaborative Whiteboard",
  description: "A real-time collaborative whiteboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
