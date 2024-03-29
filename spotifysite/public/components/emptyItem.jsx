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
    const addToState = (e, albumID, id) => {
        const formated = {
            data: e,
            gridID: id
        }
        setSelectedAlbums([...selectedAlbums, formated]);
        const newAvailableAlbums = availableAlbums.filter((album) => {
            if(album.id === undefined || album.id !== albumID){
                return album;
            }});

        setAvailableAlbums(newAvailableAlbums);
        setToggleMenu(false);
    }

    const fakeData = Array.from({ length: 10 }, (_, i) => (i).toString());

    return (
        <>
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='item' onClick={() => setToggleMenu(true)}>
                <h1 className='text'>+</h1>
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
                                        <div onClick={()=>addToState(e, e.id, id)}>
                                            <Card key={index} display={e.artist + " - " + e.album} image={e.image} />
                                        </div>)
                                })}
                            </div>

                        </div>
                        <style jsx>{`
                            .example::-webkit-scrollbar {
                            display: none;
                            }

                            .example {
                                -ms-overflow-style: none;  
                                scrollbar-width: none;  
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