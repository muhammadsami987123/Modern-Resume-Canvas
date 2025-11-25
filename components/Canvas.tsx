'use client';

import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { AnimatePresence, motion } from 'framer-motion';

import DraggableWrapper from '@/components/DraggableWrapper';
import SectionCard from '@/components/SectionCard';
import { Section, useResumeStore } from '@/store/resumeStore';

const droppableIds = {
    single: 'column-all',
    left: 'column-left',
    main: 'column-main',
    right: 'column-right',
} as const;

const columnFromDroppable = (droppableId: string): Section['column'] | undefined => {
    switch (droppableId) {
        case droppableIds.left:
            return 'left';
        case droppableIds.main:
            return 'main';
        case droppableIds.right:
            return 'right';
        default:
            return undefined;
    }
};

const getColumnsFromSections = (sections: Section[]) => {
    const sorted = [...sections].sort((a, b) => a.order - b.order);
    return {
        all: sorted,
        left: sorted.filter((section) => (section.column ?? 'main') === 'left'),
        main: sorted.filter((section) => (section.column ?? 'main') === 'main'),
        right: sorted.filter((section) => section.column === 'right'),
    };
};

const rebuildSections = (columns: { left: Section[]; main: Section[]; right: Section[] }): Section[] => {
    const annotate = (list: Section[], column: Section['column']) =>
        list.map((section, index) => ({
            ...section,
            column,
            order: index + 1,
        }));

    return [...annotate(columns.left, 'left'), ...annotate(columns.main, 'main'), ...annotate(columns.right, 'right')];
};

export default function Canvas() {
    const { layout, theme, sections, activeTemplate, reorderSections } = useResumeStore((state) => ({
        layout: state.layout,
        theme: state.theme,
        sections: state.sections,
        activeTemplate: state.activeTemplate,
        reorderSections: state.reorderSections,
    }));

    const columns = getColumnsFromSections(sections);
    const effectiveColumns =
        layout === 'two-column'
            ? {
                left: columns.left,
                main: [...columns.main, ...columns.right],
                right: [] as Section[],
            }
            : columns;

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        if (
            result.destination.droppableId === result.source.droppableId &&
            result.destination.index === result.source.index
        ) {
            return;
        }

        if (layout === 'one-column') {
            const ordered = [...columns.all];
            const [moved] = ordered.splice(result.source.index, 1);
            ordered.splice(result.destination.index, 0, moved);
            const updated = ordered.map((section, index) => ({
                ...section,
                order: index + 1,
            }));
            reorderSections(updated);
            return;
        }

        const sourceColumn = columnFromDroppable(result.source.droppableId);
        const destinationColumn = columnFromDroppable(result.destination.droppableId);

        if (!sourceColumn || !destinationColumn) {
            return;
        }

        const workingColumns = {
            left: [...effectiveColumns.left],
            main: [...effectiveColumns.main],
            right: [...effectiveColumns.right],
        };

        const sourceList = workingColumns[sourceColumn];
        const [moved] = sourceList.splice(result.source.index, 1);
        const destinationList =
            sourceColumn === destinationColumn ? sourceList : workingColumns[destinationColumn];

        destinationList.splice(result.destination.index, 0, moved);

        const updated = rebuildSections(workingColumns);
        reorderSections(updated);
    };

    const layoutClasses = {
        'one-column': 'grid-cols-1',
        'two-column': 'grid-cols-1 md:grid-cols-2',
        'three-column': 'grid-cols-1 md:grid-cols-[260px_1fr_260px]',
    }[layout];

    const columnGap = `${theme.sectionSpacing}px`;

    const renderDroppable = (id: string, list: Section[]) => (
        <Droppable droppableId={id}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                    style={{ minHeight: '120px' }}
                >
                    <AnimatePresence initial={false}>
                        {list.map((section, index) => (
                            <DraggableWrapper key={section.id} sectionId={section.id} index={index}>
                                {(dragHandleProps) => (
                                    <SectionCard section={section} dragHandleProps={dragHandleProps} />
                                )}
                            </DraggableWrapper>
                        ))}
                    </AnimatePresence>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );

    return (
        <motion.div
            key={activeTemplate}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto min-h-screen w-full max-w-[1200px] p-8"
            style={{
                backgroundColor: theme.background,
                color: theme.text,
                fontFamily: theme.font,
            }}
            data-testid="resume-canvas"
            data-layout={layout}
            data-template={activeTemplate}
        >
            <DragDropContext onDragEnd={handleDragEnd}>
                <div
                    className={`grid gap-6 ${layoutClasses}`}
                    style={{
                        gap: columnGap,
                    }}
                >
                    {layout === 'one-column' && renderDroppable(droppableIds.single, columns.all)}

                    {layout === 'two-column' && (
                        <>
                            {renderDroppable(droppableIds.left, effectiveColumns.left)}
                            {renderDroppable(droppableIds.main, effectiveColumns.main)}
                        </>
                    )}

                    {layout === 'three-column' && (
                        <>
                            {renderDroppable(droppableIds.left, effectiveColumns.left)}
                            {renderDroppable(droppableIds.main, effectiveColumns.main)}
                            {renderDroppable(droppableIds.right, effectiveColumns.right)}
                        </>
                    )}
                </div>
            </DragDropContext>
        </motion.div>
    );
}
