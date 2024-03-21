import '@/styles/globals.css';

export const apple_logo ="/assets/images/Apple_Logo.svg";
export const metadata = {
  title: 'iPhone',
  description: 'discover car explore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <title>{metadata.title}</title>
      <link rel="icon" href={apple_logo}/>
      <body >
        {children}
      </body>
    </html>
  )
}
