import Link from 'next/link'
import '../globals.css'

export default async function Navbar() {

    return (
        <div style={navDivStyle}>
            <nav style={nav1}>
                <ul style={navList}>
                    <Link href="/" style={linkStyle} className='linkStyle'>
                        <text>Somafy</text>
                    </Link>
                </ul>
            </nav>

            <nav style={nav2}>
                <ul style={navList}>
                    <Link href="/Songs" style={linkStyle} className='linkStyle'>
                        <text>Songs</text>
                    </Link>
                    <Link href="/Albums" style={linkStyle} className='linkStyle'>
                        <text>Albums</text>
                    </Link>
                    <Link href="/Artists" style={linkStyle} className='linkStyle'>
                        <text>Artists</text>
                    </Link>
                    <Link href="/Boardcreator" style={linkStyle} className='linkStyle'>
                        <text>Board Creator</text>
                    </Link>

                </ul>
            </nav>
        </div>
    )
}

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
    margin: "10px 15px 10px 15px",
    color: "white",
    textDecoration: "none",
    fontFamily: "Archivo Black",
    fontWeight: "normal",

}