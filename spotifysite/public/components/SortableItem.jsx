import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


export function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
    };
    
    const album = props.album.data;
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='item'>
            <img className='image' src={album.image} />
            <style jsx>{`
                .item {
                    display: flex;
                    flexDirection: column;
                    alignItems: center;
                    margin: 0px;
                }
                .item:hover {
                    {/* cursor: pointer; */}
                    scale: 1.05;
                }
                .image {
                    width: 150px;
                    height: 150px;
                }
                @media (max-width: 700px) {
                    .image {
                        width: 85px;
                        height: 85px;
                    }
                }
            `}</style>
        </div>
    );
}