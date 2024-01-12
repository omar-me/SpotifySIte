
import { getServerSession, NextAuthOptions } from "next-auth";
import { authOptions } from '../../api/auth/[...nextauth]/route.js'
import Songs from "@/public/components/songs.js";
import { getTopSongs } from "@/public/spotify.js";
export const dynamic = "force-dynamic";
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
}

const image = {
  width: "200px",
  height: "200px",
  margin: "10px"
}

export default async function App({searchParams}) {
  const session = await getServerSession(authOptions);
  var accessToken = null;
  var refreshToken = null;
  var result = null;
  const selectedTimeRange = searchParams?.timeRange ?? "short_term";
  const timeRange= Array.isArray(selectedTimeRange) ? selectedTimeRange[0] : selectedTimeRange;

  // console.log("SESSION: ");
  // console.log(session);
  console.log("in spotifyprofile/page.js")

  // if(session && 'error' in session && session['error'] == "RefreshAccessTokenError"){
  //   console.log("token expired")
  //   redirect('/api/auth/signin');
  // }

  if (session && 'accessToken' in session) {
    accessToken = session['accessToken'];
    refreshToken = session['refreshToken'];
    // console.log("session: ");
    // console.log(session);
    // console.log(session['accessToken']);
  }

  if (session && accessToken) {
    // result = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10&offset=0", {
    //   method: "GET", cache: 'no-store', headers: { Authorization: `Bearer ${accessToken}`}
    // }).then(function(data){
    //   console.log(data)
    //   return JSON.parse(JSON.stringify(data));
    // },
    // function(error){
    //   console.log(error)
    // });
    var limit = 10;
    var offset = 0;
    // console.log("timeRange: " + timeRange);
    result = await getTopSongs(accessToken, limit, offset, timeRange).then(function (data) {
      // console.log("SONGSSSSSSSSSSS: ")
      // console.log(data)
      return data;
    },
      function (error) {
        // console.log(error)
        return null;
      });
    // console.log(result);

  }

  
  return (
      <Songs topSongs={result}/>
  )
}
