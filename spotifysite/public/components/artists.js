
'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import spotifyApi from "../spotify";


export default function Artists({ topArtists }) {
    const { data: session, status } = useSession()

    useEffect(() => {
        if (session) {
            if (session.error == "RefreshAccessTokenError") {
                signIn('spotify', { callbackUrl: '/site/Songs' });
            }
            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session]);

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
    console.log("topArtists: ")
    console.log(topArtists)
    return (
        <main style={mainStyle}>
            <h1 style={h1}>{"Your Top " + topArtists.length + " Artists"}</h1>
            <section style={songsContainer}>
                {topArtists && topArtists.map((artist, index) => (
                    <div key={index} style={eachSongStyle}>
                        <img style={image} src={artist.images[0].url}></img>
                        <h2 style={songInfo}>{artist.name}</h2>
                    </div>
                ))}
            </section>

        </main>
    )
}
