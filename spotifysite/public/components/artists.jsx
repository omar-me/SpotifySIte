'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import spotifyApi from "../spotify";
import Dropdown from "./dropdown";
import Card from "./Card";

const mainStyle = {
    display: "grid",
    gridTemplateRows: ".1fr .3fr 2fr",
    minHeight: "100vh",
    backgroundColor: "#060914",
}

const h1 = {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Archivo Black",
    fontWeight: "normal",
    color: "white"
}

const songsContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px"
}

const getUUID = () => { return crypto.randomUUID(); }

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


    return (
        <main style={mainStyle}>
            <h1 style={h1}>{"Your Top " + topArtists.length + " Artists"}</h1>

            <Dropdown />

            <section style={songsContainer}>
                {topArtists && topArtists.map((artist) => (
                    <Card key={getUUID()} image={artist.images[0].url} display={artist.name} />
                ))}
            </section>

        </main>
    )
}
