import "./globals.css";

export const metadata = {
  title: "BlogBite | Blog Summarizer",
  description: "Summarize blogs the tasty way 🍪",
  icons: {
    icon: "/favicon.jpg", // Make sure this file exists in the public folder
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
