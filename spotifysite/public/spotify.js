import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
    // "user-library-modify",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-follow-read",
    "user-follow-modify",
].join(" ");

const params = {
    scope: scopes,
}

const queryString = new URLSearchParams(params);

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryString}`;


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export async function getTopSongs(accessToken, limit = 10, offset = 0, timeRange) {
    spotifyApi.setAccessToken(accessToken);
    const topSongs = await spotifyApi.getMyTopTracks({time_range: timeRange, limit: limit, offset: offset });
    return topSongs.body.items;
}

export async function getTopAlbums(accessToken, limit = 50, offset = 0, timeRange, albumLimit = 10) {
    // if(!albumLimit){
    //     albumLimit = 10;
    // }
    console.log(albumLimit)
    spotifyApi.setAccessToken(accessToken);
    const result = (await spotifyApi.getMyTopTracks({time_range: timeRange, limit: limit, offset: offset })).body.items;

    console.log("result: ")
    console.log(result.length)
    //print out the top 10 song's album name
    // console.log("result: ")
    // for (var i = 0; i < result.length; i++) {
    //     console.log(result[i].album.name);
    // }   

    var resultObject = {};
    for (var i = 0; i < result.length; i++) {
        if (result[i].album.name in resultObject) {
            resultObject[result[i].album.name].count += 1;
        }
        else {
            resultObject[result[i].album.name] = {
                "album": result[i].album.name,
                "image": result[i].album.images[0].url,
                "artist": result[i].artists[0].name,
                "count": 0
            }
        }
    }
    var sortedResult = [];
    for (var key in resultObject) {
        sortedResult.push(resultObject[key]);
    }
    sortedResult.sort(function (a, b) {
        return b.count - a.count;
    });
    // console.log("sortedResult: ")
    // console.log(sortedResult)
    var finalResult = [];

    for (var i = 0; i < albumLimit; i++) {
        finalResult.push(sortedResult[i]);
    }
    // console.log("finalResult: ")
    // console.log(finalResult)
    return finalResult;
}

export async function getTopArtists(accessToken, limit = 10, offset = 0, timeRange) {
    spotifyApi.setAccessToken(accessToken);
    const topSongs = await spotifyApi.getMyTopArtists({time_range: timeRange, limit: limit, offset: offset});
    return topSongs.body.items;
}

export default spotifyApi;
