'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import spotifyApi from "../spotify";
import Dropdown from "./dropdown";

const mainStyle = {
    display: "grid",
    gridTemplateRows: ".1fr .3fr 2fr",
    // backgroundColor: "#060914",
    background: "linear-gradient(90deg, #060914, #132155, #060914)",
    minHeight: "100vh",
}
const h1 = {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Archivo Black",
    fontWeight: "normal",
    color: "white"
}

const container = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px",
    flexWrap: "wrap",
}

const songsContainer = {
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center",
    // margin: "10px",
    // flexWrap: "wrap",
    display: "grid",
    gridTemplateColumns: "repeat(6, min-content)",
    gridTemplateRows: "repeat(6, min-content)",
}

const image = {
    width: "100px",
    height: "100px",
}

const eachSongStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}

export default function BoardCreator({ topAlbums }) {
    const { data: session, status } = useSession()

    useEffect(() => {
        if (session) {
            if (session.error == "RefreshAccessTokenError") {
                signIn('spotify', { callbackUrl: '/site/Songs' });
            }
            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session]);

    // console.log("topAlbums: ")
    // console.log(topAlbums)
    return (
        <main style={mainStyle}>
            <h1 style={h1}>{"Your Top " + topAlbums.length + " Albums"}</h1>
            <Dropdown />

            <div style={container}>
                <div style={songsContainer}>
                    {topAlbums && topAlbums.map((album) => (
                        <div style={eachSongStyle}>
                            <img style={image} src={album.image} />
                            {/* <div style={songInfo}>
                            <div>{album.album}</div>
                            <div>{album.artists}</div>
                        </div> */}
                        </div>
                    ))}
                </div>
            </div>

        </main>
    )
}
