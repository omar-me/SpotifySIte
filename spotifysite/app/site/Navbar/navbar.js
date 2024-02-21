import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession, NextAuthOptions } from "next-auth";

export default async function Navbar() {
    const session = await getServerSession();
    const navStyle = {
        minWidth: "100%",
        backgroundColor: "#3454D1",
        display: "flex",
        justifyContent: "flex-end",
    }
    const navList = {
        display: "flex",
        justifyContent: "flex-end",
    }

    const listStyle = {
        // width: "100px",
        margin: "10px 15px 10px 15px",
        color: "white",
        textDecoration: "none",
        fontFamily: "Archivo Black",
        fontWeight: "normal",

    }
    const button = {}
    return (
        <nav style={navStyle}>
            <ul style={navList}>
                <Link href="/site/Profile" style={listStyle}>
                    <text>Profile</text>
                </Link>
                <Link href="/site/Songs" style={listStyle}>
                    <text>Songs</text>
                </Link>
                <Link href="/site/Albums" style={listStyle}>
                    <text>Albums</text>
                </Link>
                <Link href="/site/Artists" style={listStyle}>
                    <text>Artists</text>
                </Link>
                <Link href="/site/Boardcreator" style={listStyle}>
                    <text>Board Creator</text>
                </Link>
                
            </ul>
        </nav>
    )
}