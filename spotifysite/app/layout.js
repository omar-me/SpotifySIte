import { SessionProvider } from 'next-auth/react'
import { Providers } from './providers'
// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  const style = {
    margin: 0,
    padding: 0,
    height: "100%",
    width: "100%",
}
  return (
    <html lang="en">
      <head>
        <title>Somafy</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={style}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
