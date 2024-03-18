import { SessionProvider } from 'next-auth/react'
import { Providers } from './providers'
import Navbar from './Navbar/page';

import {Archivo_Black} from 'next/font/google'


const archivoBlack = Archivo_Black({
  display: 'swap',
  subsets: ['latin'],
  weight: '400',
  adjustFontFallback: false,
})

export default function RootLayout({ children }) {
  const style = {
    margin: 0,
    padding: 0,
    height: "100%",
    width: "100%",

}
  return (
    <html lang="en" className={archivoBlack.className}>
      <head>
        <title>Somafy</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style={style}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
