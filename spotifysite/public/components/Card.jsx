const songInfoContainer = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "auto",
    height: "auto",
}

const songInfo = {
    margin: "10px",
    fontSize: "15px",
    fontFamily: "Archivo Black",
    fontWeight: "normal",
    color: "white",
}

const imageContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const imageStyle = {
    width: "75px",
    height: "75px",
    margin: "5px",
}

const eachSongStyle = {
    display: "grid",
    gridTemplateColumns: "0.4fr 0.6fr",
    margin: "10px",
    width: "425px",
    height: "100px",
    background: "black",
    boxShadow: "8px 8px 15px black",
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "center",
}

const getUUID = () => { return crypto.randomUUID(); }

export default function Card({ image, display }) {
    return (
        <div key={getUUID()} style={eachSongStyle}>
            <div style={imageContainer}>
                <img style={imageStyle} src={image}></img>
            </div>
            <div style={songInfoContainer}>
                <h2 style={songInfo}>{display}</h2>
            </div>
        </div>
    )
}