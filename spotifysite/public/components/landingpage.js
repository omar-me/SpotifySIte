'use client';
import Link from 'next/link'
import { motion } from 'framer-motion'

const buttonContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
};

const textContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}

const textStyles = {
  color: "white",
  fontSize: "50px",
  fontWeight: "bold",
  fontFamily: "Archivo Black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

const containerStyle = {
  display: "grid",
  height: "100vh",
  display: "grid",
  gridTemplateRows: "2fr 1fr 2fr",
  alignItems: "center",
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
  fontFamily: "Archivo Black",
  fontWeight: "normal",
  color: "white",
  fontSize: 20,
  padding: 15,
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  margin: 20,
  width: 200,
  height: 50,
  textDecorations: "none",
};
const gradientSequence = [
  "#ee7752",
  "#e73c7e",
  "#23a6d5",
  "#23d5ab",
  "#ee7752" // repeat the first color to loop the animation
];

export default function LandingPage() {
  return (
    <div>
      <main>
        {/* <div style={backgroundGif}> */}
        <motion.div
          style={{
            height: "100vh",
            background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);"
          }}
          animate={{
            background: gradientSequence
          }}
          transition={{
            duration: 15,
            ease: "linear",
            loop: Infinity
          }}
        >
          <div style={containerStyle}>
            <div style={textContainer}>
              <text style={textStyles}>Learn more about your listening habits!</text>
            </div>
            <Link style={buttonContainer} href="/site/Profile">
              <button style={button}>
                <text>Login with Spotify</text>
              </button>
            </Link>
          </div>
        </motion.div>
        {/* </div> */}
      </main >
    </div >
  );
};