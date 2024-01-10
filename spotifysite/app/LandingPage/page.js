'use client';
import Link from 'next/link'
import Script from 'next/script'
export const LandingPage = () => {
  const textContainer ={
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  }

  const textStyles = {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    fontFamily: "Helvetica",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const backgroundGif = {
    backgroundImage: "url('https://c.animaapp.com/c4r1U57c/img/production-id-4508070--2160p--1.gif')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  const button = {
    backgroundColor: "#1DB954",
    color: "white",
    fontSize: 20,
    padding: 15,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    margin: 20,
    width: 200,
    height: 50,
  };
  return (
    <div>
      <main>
        <div style={containerStyle}>
          <div style={backgroundGif}>
            <div style={textContainer}>
              <text style={textStyles}>Learn more about your listening habits!</text>
            </div>
            <Link href="/site/Profile">
              <button style={button}>
                Login with Spotify</button>
            </Link>
          </div>
        </div>
      </main >

    </div >
  );
};