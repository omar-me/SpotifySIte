import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function EmptyItem(props) {
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
    
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='item'>
            {props.id}
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
                }
                @media (max-width: 700px) {
                    .item {
                        width: 85px;
                        height: 85px;
                    }
                }
                .item:hover::after {
                    font-family: "Archivo Black";
                    font-weight: normal;
                    color: white;
                    {/* content: "Add Item";  */}
                }
            `}</style>
        </div>
    );
}