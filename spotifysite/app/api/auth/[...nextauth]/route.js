import spotifyApi,{ LOGIN_URL } from "@/public/spotify";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import axios from "axios";
async function refreshAccessToken(token){
  console.log("refreshAccessToken")
    try {
      // spotifyApi.setAccessToken(token.accessToken)
      // spotifyApi.setRefreshToken(token.refreshToken)
      // const { body: refreshedToken} = await spotifyApi.refreshAccessToken()

      // return{
      //   ...token,
      //   accessToken: refreshedToken.access_token,
      //   accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      //   refreshToken: refreshedToken.refresh_token || token.refreshToken,
      // }

      const basicAuth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString(
        'base64'
      )
      console.log("in refreshAccessToken")
      const { data } = await axios.post(
        'https://accounts.spotify.com/api/token',
        {
          grant_type: 'refresh_token',
          refresh_token: token.refreshToken,
        },
        {
          headers: {
            Authorization: `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          cache: 'no-store',
        }
      )
      console.log("data: ")
      console.log(data)
      return {
        ...token,
        accessToken: data.access_token,
        accessTokenExpires: Date.now() + data.expires_in * 1000,
        refreshToken: refreshedToken.refresh_token || token.refreshToken,
      }
    } catch (error) {
      console.log(error)
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      }
    }
  }

 
export const authOptions = {
    session: {
        strategy: "jwt",
      },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: LOGIN_URL,
            // token: {
            //   url: 'https://accounts.spotify.com/api/token',
            //   params: {
            //     grant_type: 'authorization_code',
            //   },
            // },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
          if (account && user) {
            return {
              ...token,
              accessToken: account.access_token,
              refreshToken: account.refresh_token,
              accessTokenExpires: account.expires_at * 1000,
              user,
            }
          }
          if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
            return token
          }
          return await refreshAccessToken(token)
        },

        async session({ session, token }) {
          session.accessToken = token.accessToken
          session.refreshToken = token.refreshToken
          session.error = token.error
          session.user = token.user
          return session
        },
      },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }