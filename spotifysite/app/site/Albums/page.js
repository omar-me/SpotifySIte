
import { getServerSession, NextAuthOptions } from "next-auth";
import { authOptions } from '../../api/auth/[...nextauth]/route.js'
import { getTopAlbums } from "@/public/spotify.js";
import Albums from "@/public/components/albums.js";

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

const h2 = {
    display: "flex",
    justifyContent: "center",
    margin: "10px"
}

const image = {
    width: "200px",
    height: "200px",
    margin: "10px"
}

export default async function App() {
    const session = await getServerSession(authOptions);
    var accessToken = null;
    var refreshToken = null;
    var result = null;

    console.log("SESSION: ");
    console.log(session);
    console.log("in spotifyprofile/page.js")

    // if(session && 'error' in session && session['error'] == "RefreshAccessTokenError"){
    //   console.log("token expired")
    //   redirect('/api/auth/signin');
    // }

    if (session && 'accessToken' in session) {
        accessToken = session['accessToken'];
        refreshToken = session['refreshToken'];
        console.log("session: ");
        console.log(session);
        console.log(session['accessToken']);
    }

    if (session && accessToken) {
        var limit = 10;
        var offset = 0;

        result = await getTopAlbums(accessToken, limit, offset).then(
            function (data) {
                // console.log("data: ")
                // console.log(data)
                return data;
            },
            function (error) {
                console.log(error)
                return null;
        });

    }

    return (
          <Albums topAlbums={result} />
    )
}
