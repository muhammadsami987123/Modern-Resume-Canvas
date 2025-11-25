import Link from 'next/link';
import { ArrowRight, Layout, Palette, Download } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Modern Resume <span className="text-indigo-600">Canvas</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create stunning, professional resumes with our drag-and-drop builder.
            Choose from modern templates, customize every detail, and export as PDF.
          </p>
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg"
          >
            Start Building
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Layout className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Flexible Layouts
            </h3>
            <p className="text-gray-600">
              Switch between 1, 2, or 3-column layouts. Drag and drop sections to arrange your resume perfectly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Palette className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Live Customization
            </h3>
            <p className="text-gray-600">
              Customize colors, fonts, spacing, and more. See changes instantly with our live preview.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              High-Quality Export
            </h3>
            <p className="text-gray-600">
              Export your resume as a high-quality PDF with preserved layout and selectable text.
            </p>
          </div>
        </div>

        {/* Templates Preview */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            5 Modern Templates
          </h2>
          <p className="text-gray-600 mb-8">
            Choose from professionally designed templates and customize them to match your style
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Minimal', 'Professional', 'Gradient Accent', 'Rounded Cards', 'Sidebar Highlight'].map((template) => (
              <div
                key={template}
                className="px-6 py-3 bg-white border-2 border-gray-200 rounded-lg font-medium text-gray-700 hover:border-indigo-600 hover:text-indigo-600 transition-colors"
              >
                {template}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
