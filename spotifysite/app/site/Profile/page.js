
// import SpotifyProfile from "./profile.js";
import { main } from '../../../public/profile/spotifyAPI.js'
// import Profile from '../../public/profile/profile.js'
import Profile from '../../../public/components/profile.js'
import { SessionProvider } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession, NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from '../../api/auth/[...nextauth]/route.js'
export default async function App() {
  const session = await getServerSession(authOptions);
  var accessToken = null;
  var result = null; 

  console.log("SESSION: ");
  console.log(session);
  console.log("in spotifyprofile/page.js")

  // if(!session || (session && 'error' in session && session['error'] == "RefreshAccessTokenError")){
  //   console.log("token expired")
  //   redirect('/api/auth/signin');
  // }

  if (session && 'accessToken' in session) {
    accessToken = session['accessToken'];
    console.log("session: ");
    console.log(session);
    console.log(session['accessToken']);
  }

  if (session && accessToken) {
    result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    result = await result.json();
    console.log(result);
  }
  return (
    <Profile profile={result} />
  )
  }