import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession, NextAuthOptions } from "next-auth";
import '../globals.css'

export default async function Navbar() {
    const session = await getServerSession();

    const linkStyle ={
        color: "white",
        textDecoration: "none",
        margin: "10px 15px 10px 15px",
        fontFamily: "Archivo Black",
        fontWeight: "normal",
        fontSize: "1rem",
    }
    const navDivStyle = {
        minWidth: "100%",
        // backgroundColor: "#3454D1",
        background: "linear-gradient(90deg, #060914, #132155, #060914)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",

    }
    const nav1 = {
        display: "flex",
        justifyContent: "flex-start",
    }
    const nav2 = {
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
        <div style={navDivStyle}>
            <nav style={nav1}>
                <ul style={navList}>
                    <Link href="/" className={"linkStyle"}>
                        <text>Somafy</text>
                    </Link>
                </ul>
            </nav>

            <nav style={nav2}>
                <ul style={navList}>
                    {/* <Link href="/site/Profile" style={listStyle}>
                    <text>Profile</text>
                </Link> */}
                    <Link href="/Songs" className={"linkStyle"} >
                        <text>Songs</text>
                    </Link>
                    <Link href="/Albums" className={"linkStyle"}>
                        <text>Albums</text>
                    </Link>
                    <Link href="/Artists" className={"linkStyle"}>
                        <text>Artists</text>
                    </Link>
                    <Link href="/Boardcreator" className={"linkStyle"}>
                        <text>Board Creator</text>
                    </Link>

                </ul>
            </nav>
        </div>
    )
}