'use client';

import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { GripVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';

import {
    EducationItem,
    ExperienceItem,
    ProjectItem,
    Section,
    useResumeStore,
} from '@/store/resumeStore';

interface SectionCardProps {
    section: Section;
    dragHandleProps?: DraggableProvidedDragHandleProps;
}

export default function SectionCard({ section, dragHandleProps }: SectionCardProps) {
    const theme = useResumeStore((state) => state.theme);
    const updateSection = useResumeStore((state) => state.updateSection);
    const deleteSection = useResumeStore((state) => state.deleteSection);
    const setSelectedSection = useResumeStore((state) => state.setSelectedSection);
    const selectedSection = useResumeStore((state) => state.selectedSection);

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState(section.title);
    const [editedContent, setEditedContent] = useState(section.content || '');

    const isSelected = selectedSection === section.id;
    const padding = `${theme.sectionPadding}px`;
    const bodyStyle = {
        fontSize: section.style?.fontSize ?? theme.bodySize,
        lineHeight: section.style?.lineHeight ?? theme.bodyLineHeight,
        fontWeight: section.style?.fontWeight ?? 500,
        textAlign: section.style?.align ?? 'left',
        color: theme.text,
    } as const;

    const handleTitleCommit = () => {
        setIsEditingTitle(false);
        if (editedTitle.trim() && editedTitle !== section.title) {
            updateSection(section.id, { title: editedTitle.trim() });
        }
    };

    const handleContentBlur = () => {
        if (editedContent !== section.content) {
            updateSection(section.id, { content: editedContent });
        }
    };

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        deleteSection(section.id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="group relative"
            onClick={() => setSelectedSection(section.id)}
        >
            <div
                className="absolute -left-10 top-3 hidden rounded-full border border-dashed border-gray-300 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-500 transition-opacity group-hover:flex"
                {...(dragHandleProps ?? {})}
            >
                <GripVertical className="mr-2 text-gray-400" size={16} />
                Drag
            </div>

            <button
                onClick={handleDelete}
                className="absolute -right-9 top-3 hidden rounded-full bg-red-50 p-2 text-red-500 transition-all hover:scale-105 hover:bg-red-100 group-hover:block"
                aria-label="Delete section"
            >
                <Trash2 size={16} />
            </button>

            <div
                className={`transition-all ${
                    isSelected ? 'ring-2 ring-indigo-500 shadow-xl' : 'shadow-sm ring-1 ring-transparent'
                }`}
                style={{
                    borderRadius: theme.radius,
                    backgroundColor: theme.background,
                    padding,
                }}
            >
                {isEditingTitle ? (
                    <input
                        value={editedTitle}
                        onChange={(event) => setEditedTitle(event.target.value)}
                        onBlur={handleTitleCommit}
                        autoFocus
                        className="mb-4 w-full border-b border-gray-200 bg-transparent font-bold focus:border-indigo-500 focus:outline-none"
                        style={{ color: theme.accent, fontSize: theme.headingSize }}
                    />
                ) : (
                    <h2
                        className="mb-4 cursor-text font-bold text-gray-900 transition-opacity hover:opacity-80"
                        style={{ color: theme.accent, fontSize: theme.headingSize }}
                        onClick={() => {
                            setIsEditingTitle(true);
                            setSelectedSection(section.id);
                        }}
                    >
                        {section.title}
                    </h2>
                )}

                {(section.type === 'about' || section.type === 'contact' || section.type === 'custom') && (
                    <textarea
                        value={editedContent}
                        onChange={(event) => setEditedContent(event.target.value)}
                        onBlur={handleContentBlur}
                        className="w-full resize-none bg-transparent outline-none"
                        rows={4}
                        style={bodyStyle}
                    />
                )}

                {section.type === 'skills' && Array.isArray(section.items) && (
                    <div className="flex flex-wrap gap-2">
                        {(section.items as string[]).map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full px-3 py-1 text-sm font-medium"
                                style={{
                                    backgroundColor: `${theme.accent}22`,
                                    color: theme.accent,
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                {section.type === 'experience' && Array.isArray(section.items) && (
                    <div className="space-y-5">
                        {(section.items as ExperienceItem[]).map((item) => (
                            <div key={`${item.company}-${item.role}`} className="border-l-2 pl-4" style={{ borderColor: theme.accent }}>
                                <h3 className="text-lg font-semibold" style={{ color: theme.text }}>
                                    {item.role}
                                </h3>
                                <p className="text-sm text-gray-500" style={{ color: `${theme.text}aa` }}>
                                    {item.company} • {item.time}
                                </p>
                                <p className="mt-2 text-sm" style={bodyStyle}>
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {section.type === 'projects' && Array.isArray(section.items) && (
                    <div className="space-y-5">
                        {(section.items as ProjectItem[]).map((item) => (
                            <div key={item.title} className="space-y-2">
                                <h3 className="text-lg font-semibold" style={{ color: theme.text }}>
                                    {item.title}
                                </h3>
                                <p className="text-sm" style={bodyStyle}>
                                    {item.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {item.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide"
                                            style={{
                                                backgroundColor: `${theme.accent}15`,
                                                color: theme.accent,
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {section.type === 'education' && Array.isArray(section.items) && (
                    <div className="space-y-5">
                        {(section.items as EducationItem[]).map((item) => (
                            <div key={item.degree} className="space-y-1">
                                <h3 className="text-lg font-semibold" style={{ color: theme.text }}>
                                    {item.degree}
                                </h3>
                                <p className="text-sm text-gray-500" style={{ color: `${theme.text}aa` }}>
                                    {item.institution} • {item.time}
                                </p>
                                {item.description && (
                                    <p className="text-sm" style={bodyStyle}>
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
