import { NextResponse } from 'next/server';

import type { ResumeState } from '@/store/resumeStore';
import { generateResumePDF } from '@/utils/generatePDF';

export async function POST(request: Request) {
    try {
        const payload = (await request.json()) as ResumeState;
        const pdfBuffer = await generateResumePDF(payload);

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="modern-resume.pdf"',
            },
        });
    } catch (error) {
        console.error('PDF export failed', error);
        return NextResponse.json({ message: 'Unable to export resume' }, { status: 500 });
    }
}

