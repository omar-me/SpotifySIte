import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import Card from './Card';

const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "100",
    background: "white",
    borderRadius: "30px",
    border: "1px solid black",
    height: "450px",
    width: "550px",
}

const puDivStyle = {
    display: "grid",
    gridTemplateColumns: "15% 85%",
    touchAction: "manipulation",
    width: "100%",
    height: "100%",
}

const closeButton = {
    borderRadius: "10px",
    height: "30px",
    width: "60px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    margin: "10px",
    fontFamily: "Archivo Black",
}

const cardsContainer ={
    overflowY: "auto",
    width: "100%",
    height: "100%",
}

export function EmptyItem({id, availableAlbums, setAvailableAlbums, setSelectedAlbums, selectedAlbums}) {
    const [toggleMenu, setToggleMenu] = useState(false);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
    };
    const addToState = (e, id) => {
        const formated = {
            data: e,
            id: id
        }
        setSelectedAlbums([...selectedAlbums, formated]);
        // console.log("availableAlbums", availableAlbums);
        // console.log("id", id);
        // console.log("e.id", e.id);
        const newAvailableAlbums = availableAlbums.filter((album) => album.id !== e.id);
        // console.log("newAvailableAlbums", newAvailableAlbums);
        setAvailableAlbums(newAvailableAlbums);
        // console.log("availableAlbums", availableAlbums);
        setToggleMenu(false);
    }

    const fakeData = Array.from({ length: 10 }, (_, i) => (i).toString());
    // console.log("availableAlbums", availableAlbums);

    return (
        <>
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='item' onClick={() => setToggleMenu(true)}>
                <p className='text'>{id}</p>
                <style jsx>{`
                .item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0px;
                    height: 150px;
                    width: 150px;
                    border: 1px solid black;
                    background-color: #060914;
                    color: white;
                }
                .item:hover {
                    scale: 1.05;
                    cursor: pointer;
                }
                @media (max-width: 700px) {
                    .item {
                        width: 85px;
                        height: 85px;
                    }
                }
                .text:hover {
                    scale: 1.05;
                }
            `}</style>
            </div>
            {
                toggleMenu ?
                    <div style={popupStyle} >
                        <div style={puDivStyle} >
                            <button className='buttonStyle' style={closeButton} onClick={() => setToggleMenu(false)}>Close</button>
                            <div className='example' style={cardsContainer}>
                                {availableAlbums && availableAlbums.map((e, index) => {
                                    return (
                                        <div onClick={()=>addToState(e, id)}>
                                            <Card key={index} display={e.artist + " - " + e.album} image={e.image} />
                                        </div>)
                                })}
                            </div>

                        </div>
                        <style jsx>{`
                            /* Hide scrollbar for Chrome, Safari and Opera */
                            .example::-webkit-scrollbar {
                            display: none;
                            }

                            /* Hide scrollbar for IE, Edge and Firefox */
                            .example {
                                -ms-overflow-style: none;  /* IE and Edge */
                                scrollbar-width: none;  /* Firefox */
                            }
                            .buttonStyle:hover {
                                scale: 1.05;
                                cursor: pointer;
                            }
                        `}</style>

                    </div>
                    : null
            }
        </>
    );
}