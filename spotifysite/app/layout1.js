import { SessionProvider } from 'next-auth/react'
import { Providers } from '../providers'
import Navbar from '@/public/components/navbar.js'
import "typeface-archivo-black"
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
            {children}
    )
}