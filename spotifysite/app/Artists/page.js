
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Artists from "@/public/components/artists.jsx";
import { getTopArtists } from "@/public/spotify.js";

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
		var limit = 10;
		var offset = 0;
		result = await getTopArtists(accessToken, limit, offset, timeRange).then(
			function (data) {
				return data;
			},
			function (error) {
				console.log(error)
				return null;
			});
	}

	return (
		<Artists topArtists={result} timeRange={timeRange}/>
	)
}
