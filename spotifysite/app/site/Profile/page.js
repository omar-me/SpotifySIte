
import Profile from '../../../public/components/profile.js'
import { getServerSession, NextAuthOptions } from "next-auth";
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
    }).then(function(data){
      return data.json();
    }, function(error){
      console.log(error);
      return null;
    });
  }
  return (
    <Profile profile={result} />
  )
  }