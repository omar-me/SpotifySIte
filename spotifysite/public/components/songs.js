
'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import spotifyApi from "../spotify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Dropdown from "./dropdown";
const timeFrameOptions = ["4 Weeks", "6 Months", "All Time"];

const dropDownSection = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }

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

const eachSongStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px"
}

export default function Songs({ topSongs}) {
    const { data: session, status } = useSession()
    // const router = useRouter();
    // const pathname = usePathname();
    // const searchParams = useSearchParams();

    useEffect(() => {
        if (session) {
            if (session.error == "RefreshAccessTokenError") {
                signIn('spotify', { callbackUrl: '/site/Songs' });
            }
            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session]);

    // const onSelect = (event) => {
    //     const current = new URLSearchParams(searchParams);
    
    //     const value = event.target.value.trim();
    
    //     if (!value) {
    //       current.delete("timeRange");
    //     } else {
    //       current.set("timeRange", event.target.value);
    //     }
    
    //     const search = current.toString();
    //     const query = search ? `?${search}` : "";
    
    //     router.push(`${pathname}${query}`);
    // };
    
    return (
        <main style={mainStyle}>
            <h1 style={h1}>{"Your Top " + topSongs.length + " Songs"}</h1>

            {/* <section style={dropDownSection}>
                <text>Time Range:</text>
                <select onChange={onSelect}>
                    <option value="short_term">4 Weeks</option>
                    <option value="medium_term">6 Months</option>
                    <option value="long_term">Lifetime</option>
                </select>
            </section> */}
            <Dropdown/>
            
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
