import "./globals.css";

export const metadata = {
  title: "Collaborative Whiteboard",
  description: "A real-time collaborative whiteboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
