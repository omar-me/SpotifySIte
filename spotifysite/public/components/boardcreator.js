'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import spotifyApi from "../spotify";
import Dropdown from "./dropdown";

const mainStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "black",
    minHeight: "100vh",
}
const h1 = {
    display: "flex",
    justifyContent: "center",
    color: "white",
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
    gridTemplateColumns: "repeat(6, min-contehent)",
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
