
'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import spotifyApi from "../spotify";
import Dropdown from "./dropdown";

const mainStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
}
const h1 = {
    display: "flex",

    justifyContent: "center",
}

const songsContainer = {
    display: "flex",
    // justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px"
}

const songInfo = {
    display: "flex",
    justifyContent: "center",
    margin: "10px",
    fontSize: "15px"
}

const image = {
    width: "100px",
    height: "100px",
    margin: "10px"
}

const eachSongStyle ={
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px"
}

export default function Albums({ topAlbums }) {
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
            <section style={songsContainer}>
                {topAlbums && topAlbums.map((album, index) => (
                    <div key={index} style={eachSongStyle}>
                        <img style={image} src={album.image}></img>
                        <h2 style={songInfo}>{album.artist + " - " + album.album}</h2>
                    </div>
                ))}
            </section>

        </main>
    )
}
