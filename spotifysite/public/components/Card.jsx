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


const eachSongStyle = {
    display: "grid",
    gridTemplateColumns: "0.4fr 0.6fr",
    background: "black",
    boxShadow: "8px 8px 15px black",
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    linkDecoration: "none",
}

const getUUID = () => { return crypto.randomUUID(); }

const newTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
}
export default function Card({ image, display, url }) {
    return (
        <a key={getUUID()} style={eachSongStyle} className="container" href={url} 
        >
            <div style={imageContainer}>
                <img className="imageStyle" src={image}></img>
            </div>
            <div style={songInfoContainer}>
                <h2 style={songInfo}>{display}</h2>
            </div>
            <style jsx>{`
            .container {
                width: 425px;
                height: 100px;
                margin: 10px;
                }
            .container:hover {
                transform: scale(1.05);
                transition: transform 0.5s;
                cursor: pointer;
            }
            .imageStyle {
                width: 75px;
                height: 75px;
                margin: 5px;
            }
            @media (max-width: 600px) {
                .container {
                    width: 75%;
                    height: 70px;
                    margin: 8px;
                }
                .imageStyle {
                    width: 55px;
                    height: 55px;
                    margin: 5px;
                }
            }
        `}</style>
        </a>
    )

}