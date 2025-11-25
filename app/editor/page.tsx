'use client';

import Canvas from '@/components/Canvas';
import Sidebar from '@/components/Sidebar';
import Toolbar from '@/components/Toolbar';
import { useResumePersistence } from '@/hooks/useResumePersistence';

export default function EditorPage() {
    useResumePersistence();

    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <Toolbar />
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <Canvas />
                </div>
                <Sidebar />
            </div>
        </div>
    );
}
