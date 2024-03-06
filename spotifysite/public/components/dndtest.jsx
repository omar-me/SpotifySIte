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
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from "./SortableItem";


const mainStyle = {
    display: "grid",
    gridTemplateRows: ".1fr .3fr 2fr",
    // backgroundColor: "#060914",
    background: "linear-gradient(90deg, #060914, #132155, #060914)",
    minHeight: "100vh",
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
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center",
    // margin: "10px",
    // flexWrap: "wrap",
    display: "grid",
    //set max items in grid to 16
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
    justifyContent: "center",

}

const image = {
    width: "100px",
    height: "100px",
}

const eachSongStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}


const getUUID = () => { return crypto.randomUUID(); }

export default function BoardCreator({ topAlbums, timeRange }) {
    const { data: session, status } = useSession()



    const [items, setItems] = useState(Array.from({ length: 16 }, (_, i) => (1+ i).toString()));


    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    useEffect(() => {
        if (session) {
            if (session.error == "RefreshAccessTokenError") {
                signIn('spotify', { callbackUrl: '/site/Songs' });
            }
            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session]);
    return (
        <main style={mainStyle}>
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
                            {items && items.map((id) => {
                                return (
                                    <EmptyItem key={id} id={id} />
                                )
                            })}
                        </div>
                    </div>
                </SortableContext>
            </DndContext>
        </main>
    )
    function handleDragEnd(event) {
        const { active, over } = event;

        if (over.id !== undefined && active.id !== undefined && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
}
