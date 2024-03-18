'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import { EmptyItem } from "./emptyItem";
import spotifyApi from "../spotify";
import Dropdown from "./dropdown";
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    PointerSensor
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from "./SortableItem";



export default function BoardCreator({ albumData, timeRange }) {
    const { data: session, status } = useSession()
    const [items, setItems] = useState(Array.from({ length: 16 }, (_, i) => ({ id: (1 + i).toString() })));
    const [selectedAlbums, setSelectedAlbums] = useState([]);
    const [availableAlbums, setAvailableAlbums] = useState(albumData);


    const sensors = useSensors(
        useSensor(PointerSensor,{
            activationConstraint: {
                distance: 8,
            },
        
        }),
        useSensor(TouchSensor),
        useSensor(MouseSensor)
      )

    useEffect(() => {
        if (session) {
            if (session.error == "RefreshAccessTokenError") {
                signIn('spotify', { callbackUrl: '/site/Songs' });
            }
            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session]);

    return (
        <main style={mainStyle} >
            <h1 style={h1}>{"Board Creator"}</h1>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={rectSortingStrategy}
                >
                    <div style={container}>
                        <div style={songsContainer}>
                            {selectedAlbums && items && items.map((data) => {
                                const album = selectedAlbums.find((e) => e.gridID == data.id);
                                if(album !== undefined){
                                    return (
                                        <SortableItem 
                                        key={data.id} 
                                        id={data.id} 
                                        album={album} 
                                        availableAlbums={availableAlbums} 
                                        setAvailableAlbums={setAvailableAlbums}
                                        setSelectedAlbums={setSelectedAlbums} 
                                        selectedAlbums={selectedAlbums} />
                                    )
                                }
                                else{
                                    return (
                                        <EmptyItem 
                                        key={data.id} 
                                        id={data.id} 
                                        availableAlbums={availableAlbums} 
                                        setAvailableAlbums={setAvailableAlbums}
                                        setSelectedAlbums={setSelectedAlbums} 
                                        selectedAlbums={selectedAlbums} />
                                    )
                                }
                            })}
                        </div>
                    </div>
                </SortableContext>
            </DndContext>
        </main>
    )
    function handleDragEnd(event) {
        const { active, over } = event;
        const ov = over && over.id;
        const act = active && active.id;
        if (ov && act && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
}

const mainStyle = {
    display: "grid",
    gridTemplateRows: ".1fr .3fr 2fr",
    background: "linear-gradient(90deg, #060914, #132155, #060914)",
    minHeight: "100vh",
    overflow: "hidden",
}
const h1 = {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Archivo Black",
    fontWeight: "normal",
    color: "white"
}

const container = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px",
    flexWrap: "wrap",
}

const songsContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
    justifyContent: "center",
    border: "1px solid black",
    background: "black",
}