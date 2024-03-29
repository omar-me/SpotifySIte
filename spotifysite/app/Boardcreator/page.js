
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BoardCreator from "@/public/components/boardcreator.jsx";
import { uniqueAlbums } from "@/public/spotify.js";

export const dynamic = "force-dynamic";

export default async function App({ searchParams }) {
    const session = await getServerSession(authOptions);
    var accessToken = null;
    var result = null;
    const selectedTimeRange = searchParams?.timeRange ?? "short_term";
    const timeRange = Array.isArray(selectedTimeRange) ? selectedTimeRange[0] : selectedTimeRange;

    if (session && 'accessToken' in session) {
        accessToken = session['accessToken'];
    }

    if (session && accessToken) {
        var limit = 50;
        var offset = 0;
        var albumLimit = 16;
        result = await uniqueAlbums(accessToken, limit, offset, timeRange, albumLimit).then(
            function (data) {
                return data;
            },
            function (error) {
                console.log(error)
                return null;
            });
    }

    return (
        <BoardCreator albumData={result}/>
    )
}
