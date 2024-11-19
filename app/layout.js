import "./globals.css";


export const metadata = {
  title: "PourPerfect",
  description: "PourPerfect is a web application that helps you find the perfect drink for any occasion.",
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
