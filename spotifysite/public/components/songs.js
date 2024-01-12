'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
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

const eachSongStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px"
}

export default function Songs({ topSongs }) {
    const { data: session, status } = useSession()

    useEffect(() => {
        if (session) {
            if (session.error == "RefreshAccessTokenError") {
                signIn('spotify', { callbackUrl: '/site/Songs' });
            }
            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session]);


    return (
        <main style={mainStyle}>
            <h1 style={h1}>{"Your Top " + topSongs.length + " Songs"}</h1>

            <Dropdown />

            <section style={songsContainer}>
                {topSongs && topSongs.map((song, index) => (
                    <div key={index} style={eachSongStyle}>
                        <img style={image} src={song.album.images[0].url}></img>
                        <h2 style={songInfo}>{song.artists[0].name + " - " + song.name}</h2>
                    </div>
                ))}
            </section>

        </main>
    )
}
