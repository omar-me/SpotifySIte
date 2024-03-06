// 'use client';
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

const titleStyle = {
  color: "white",
  fontSize: "70px",
  fontWeight: "bold",
  fontFamily: "Archivo Black",
};

const subStyle = {
  color: "white",
  fontSize: "30px",
  fontWeight: "normal",
  fontFamily: "Archivo Black",
}
const containerStyle = {
  display: "grid",
  height: "100vh",
  display: "grid",
  gridTemplateRows: "1fr 1fr 1fr",
  alignItems: "center",
};

const background = {
  // background: "linear-gradient(90deg, #060914, #3454D1, #060914)",
  background: "linear-gradient(90deg, #060914, #132155, #060914)",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

const button = {
  backgroundColor: "black",
  padding: 15,
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  margin: 20,
  width: 200,
  height: 50,
};

const buttonText = {
  fontFamily: "Archivo Black",
  fontWeight: "normal",
  color: "white",
  fontSize: 15,
  textDecorations: "none",
  linkDecoration: "none"
}
export default function LandingPage() {
  return (
    <div>
      <main>
        <div style={background}>
          <div style={containerStyle}>
            <div style={textContainer}>
              <text style={titleStyle}>Welcome to Somafy!</text>
              <text style={subStyle}>Learn more about your listening habits!</text>
            </div>
            <Link className="button" style={buttonContainer} href="/Songs">
              <button style={button}>
                <text style={buttonText}>Login with Spotify</text>
              </button>
            </Link>
          </div>
        </div>
      </main >
    </div >
  );
};