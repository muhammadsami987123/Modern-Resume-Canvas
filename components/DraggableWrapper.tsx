'use client';

import { Draggable, DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DraggableWrapperProps {
    sectionId: string;
    index: number;
    children: (dragHandleProps?: DraggableProvidedDragHandleProps) => ReactNode;
}

export default function DraggableWrapper({ sectionId, index, children }: DraggableWrapperProps) {
    return (
        <Draggable draggableId={sectionId} index={index}>
            {(provided, snapshot) => (
                <motion.div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    animate={{ scale: snapshot.isDragging ? 1.02 : 1 }}
                    transition={{ duration: 0.15 }}
                    className="relative"
                >
                    {children(provided.dragHandleProps)}
                </motion.div>
            )}
        </Draggable>
    );
}

