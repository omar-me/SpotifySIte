
'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import spotifyApi from "../spotify";
import Image from 'next/image'

export default function Profile({ profile }) {
    const {data: session, status} = useSession()
    
    useEffect(() => {
        if(session){
            if(session.error == "RefreshAccessTokenError"){
                signIn('spotify', { callbackUrl: '/site/Profile' });
            }
            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session]);


    if(profile == null){
        return (
            <main>
                <h1>Profile is null</h1>
            </main>
        )
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

    const profileStyle = {
        display: "flex",
        // justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px"
    }
    
    const h2 ={
        display: "flex",
        justifyContent: "center",
        margin: "10px"
    }

    const image ={
        width: "200px",
        height: "200px",
        margin: "10px"
    }

    const text = {
        font : "10px Helvetica, Sans-Serif",
        color: "black",
    }
    return (
        <main style={mainStyle}>
            <h1 style={h1}>Your Spotify Profile</h1>

            <section style ={profileStyle}>
                {/* <img style={image} src={profile.images ? profile.images[0].url : ""} /> */}
                <Image src={profile.images ? profile.images[0].url : "" } width={200} height={200} />
                <ul style={text}>
                    <li>User ID: <span id="id"> {profile ? profile.id : ""}</span></li>
                    <li>Email: <span id="email">{profile ? profile.email : ""}</span></li>
                    <li>Spotify URI: <a id="uri" href={profile.external_urls ? profile.external_urls.spotify : ""}> {profile ? profile.uri : ""}</a></li>
                    <li>Link: <a id="url" href={profile ? profile.href : ""}>{profile ? profile.href : ""}</a></li>
                    <li>Profile Image: <span id="imgUrl">{profile.images ? profile.images[0].url : ""}</span></li>
                </ul>
            </section>

        </main>
    )
}
