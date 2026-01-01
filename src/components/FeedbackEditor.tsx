'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Link as LinkIcon,
    Highlighter,
    Type,
    Palette,
    Quote,
    Heading1,
    Heading2,
    Undo,
    Redo,
    X,
    Check,
    Minus,
    MessageSquare
} from 'lucide-react';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackEditorProps {
    projectId: string;
    projectName: string;
    onClose: () => void;
    onSave?: (content: string, htmlContent: string) => Promise<void>;
}

const colorOptions = [
    { color: '#f4f4f5', label: 'White' },
    { color: '#ef4444', label: 'Red' },
    { color: '#f97316', label: 'Orange' },
    { color: '#eab308', label: 'Yellow' },
    { color: '#22c55e', label: 'Green' },
    { color: '#3b82f6', label: 'Blue' },
    { color: '#8b5cf6', label: 'Purple' },
    { color: '#ec4899', label: 'Pink' },
];

const highlightOptions = [
    { color: '#fef08a', label: 'Yellow' },
    { color: '#bbf7d0', label: 'Green' },
    { color: '#bfdbfe', label: 'Blue' },
    { color: '#fbcfe8', label: 'Pink' },
    { color: '#fecaca', label: 'Red' },
];

export function FeedbackEditor({ projectId, projectName, onClose, onSave }: FeedbackEditorProps) {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showHighlightPicker, setShowHighlightPicker] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    class: 'text-blue-400 underline cursor-pointer hover:text-blue-300',
                },
            }),
            Highlight.configure({
                multicolor: true,
            }),
            TextStyle,
            Color,
            Underline,
            Placeholder.configure({
                placeholder: 'Write your feedback here... Use the toolbar to format your text.',
            }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-sm max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
    });

    const setLink = useCallback(() => {
        if (!editor) return;

        if (linkUrl === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            setShowLinkInput(false);
            return;
        }

        // If there's display text, insert a new link with that text
        if (linkText.trim()) {
            editor
                .chain()
                .focus()
                .insertContent(`<a href="${linkUrl}">${linkText}</a> `)
                .run();
        } else {
            // Otherwise just apply link to selected text or insert URL as text
            const { from, to } = editor.state.selection;
            if (from === to) {
                // No selection - insert URL as link text
                editor
                    .chain()
                    .focus()
                    .insertContent(`<a href="${linkUrl}">${linkUrl}</a> `)
                    .run();
            } else {
                // Has selection - apply link to selection
                editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
            }
        }

        setShowLinkInput(false);
        setLinkUrl('');
        setLinkText('');
    }, [editor, linkUrl, linkText]);

    const handleSave = async () => {
        if (!editor || !onSave) return;

        setIsSaving(true);
        try {
            const content = editor.getText();
            const htmlContent = editor.getHTML();
            await onSave(content, htmlContent);
            onClose();
        } catch (error) {
            console.error('Failed to save feedback:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!editor) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Editor Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-3xl bg-[#0f0f12] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="relative px-6 py-4 border-b border-[#27272a]">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-purple-500/5" />
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                <MessageSquare className="h-5 w-5 text-violet-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#f4f4f5]">Send Feedback</h2>
                                <p className="text-xs text-[#71717a]">for {projectName}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-[#27272a] text-[#71717a] hover:text-white transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="px-4 py-2 border-b border-[#27272a] bg-[#18181b] flex flex-wrap items-center gap-1">
                    {/* Text Formatting */}
                    <div className="flex items-center gap-0.5 pr-2 border-r border-[#3f3f46]">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            isActive={editor.isActive('bold')}
                            tooltip="Bold"
                        >
                            <Bold className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            isActive={editor.isActive('italic')}
                            tooltip="Italic"
                        >
                            <Italic className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            isActive={editor.isActive('underline')}
                            tooltip="Underline"
                        >
                            <UnderlineIcon className="h-4 w-4" />
                        </ToolbarButton>
                    </div>

                    {/* Headings */}
                    <div className="flex items-center gap-0.5 px-2 border-r border-[#3f3f46]">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            isActive={editor.isActive('heading', { level: 1 })}
                            tooltip="Heading 1"
                        >
                            <Heading1 className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            isActive={editor.isActive('heading', { level: 2 })}
                            tooltip="Heading 2"
                        >
                            <Heading2 className="h-4 w-4" />
                        </ToolbarButton>
                    </div>

                    {/* Lists */}
                    <div className="flex items-center gap-0.5 px-2 border-r border-[#3f3f46]">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            isActive={editor.isActive('bulletList')}
                            tooltip="Bullet List"
                        >
                            <List className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            isActive={editor.isActive('orderedList')}
                            tooltip="Numbered List"
                        >
                            <ListOrdered className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            isActive={editor.isActive('blockquote')}
                            tooltip="Quote"
                        >
                            <Quote className="h-4 w-4" />
                        </ToolbarButton>
                    </div>

                    {/* Link */}
                    <div className="flex items-center gap-0.5 px-2 border-r border-[#3f3f46] relative">
                        <ToolbarButton
                            onClick={() => setShowLinkInput(!showLinkInput)}
                            isActive={editor.isActive('link')}
                            tooltip="Add Link"
                        >
                            <LinkIcon className="h-4 w-4" />
                        </ToolbarButton>

                        {/* Link Input Popup */}
                        <AnimatePresence>
                            {showLinkInput && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="absolute top-full left-0 mt-2 p-3 bg-[#1f1f23] rounded-xl border border-[#3f3f46] shadow-2xl z-10 min-w-[280px]"
                                >
                                    <p className="text-[10px] text-[#71717a] uppercase tracking-wider mb-2 font-medium">Insert Link</p>
                                    <div className="space-y-2">
                                        <div>
                                            <label className="text-[10px] text-[#a1a1aa] block mb-1">Display Text <span className="text-[#52525b]">(optional)</span></label>
                                            <input
                                                type="text"
                                                value={linkText}
                                                onChange={(e) => setLinkText(e.target.value)}
                                                placeholder="e.g. Click here, Visit website"
                                                className="w-full px-3 py-2 text-xs bg-[#09090b] border border-[#27272a] rounded-lg text-white focus:outline-none focus:border-violet-500 placeholder:text-[#52525b]"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-[#a1a1aa] block mb-1">URL <span className="text-red-400">*</span></label>
                                            <input
                                                type="url"
                                                value={linkUrl}
                                                onChange={(e) => setLinkUrl(e.target.value)}
                                                placeholder="https://example.com"
                                                className="w-full px-3 py-2 text-xs bg-[#09090b] border border-[#27272a] rounded-lg text-white focus:outline-none focus:border-violet-500 placeholder:text-[#52525b]"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-[#27272a]">
                                        <button
                                            onClick={() => {
                                                setShowLinkInput(false);
                                                setLinkUrl('');
                                                setLinkText('');
                                            }}
                                            className="px-3 py-1.5 text-xs rounded-lg bg-[#27272a] text-[#a1a1aa] hover:bg-[#3f3f46] hover:text-white transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={setLink}
                                            disabled={!linkUrl.trim()}
                                            className="px-3 py-1.5 text-xs rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                                        >
                                            <LinkIcon className="h-3 w-3" />
                                            Insert Link
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Colors */}
                    <div className="flex items-center gap-0.5 px-2 border-r border-[#3f3f46] relative">
                        <ToolbarButton
                            onClick={() => {
                                setShowColorPicker(!showColorPicker);
                                setShowHighlightPicker(false);
                            }}
                            tooltip="Text Color"
                        >
                            <Palette className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => {
                                setShowHighlightPicker(!showHighlightPicker);
                                setShowColorPicker(false);
                            }}
                            isActive={editor.isActive('highlight')}
                            tooltip="Highlight"
                        >
                            <Highlighter className="h-4 w-4" />
                        </ToolbarButton>

                        {/* Color Picker Popup */}
                        <AnimatePresence>
                            {showColorPicker && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="absolute top-full left-0 mt-2 p-2 bg-[#27272a] rounded-lg border border-[#3f3f46] shadow-xl z-10"
                                >
                                    <div className="flex gap-1">
                                        {colorOptions.map((opt) => (
                                            <button
                                                key={opt.color}
                                                onClick={() => {
                                                    editor.chain().focus().setColor(opt.color).run();
                                                    setShowColorPicker(false);
                                                }}
                                                className="w-6 h-6 rounded border border-[#3f3f46] hover:scale-110 transition-transform"
                                                style={{ backgroundColor: opt.color }}
                                                title={opt.label}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Highlight Picker Popup */}
                        <AnimatePresence>
                            {showHighlightPicker && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="absolute top-full left-0 mt-2 p-2 bg-[#27272a] rounded-lg border border-[#3f3f46] shadow-xl z-10"
                                >
                                    <div className="flex gap-1">
                                        {highlightOptions.map((opt) => (
                                            <button
                                                key={opt.color}
                                                onClick={() => {
                                                    editor.chain().focus().toggleHighlight({ color: opt.color }).run();
                                                    setShowHighlightPicker(false);
                                                }}
                                                className="w-6 h-6 rounded border border-[#3f3f46] hover:scale-110 transition-transform"
                                                style={{ backgroundColor: opt.color }}
                                                title={opt.label}
                                            />
                                        ))}
                                        <button
                                            onClick={() => {
                                                editor.chain().focus().unsetHighlight().run();
                                                setShowHighlightPicker(false);
                                            }}
                                            className="w-6 h-6 rounded border border-[#3f3f46] hover:scale-110 transition-transform flex items-center justify-center bg-[#18181b]"
                                            title="Remove"
                                        >
                                            <X className="h-3 w-3 text-zinc-500" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-0.5 px-2 border-r border-[#3f3f46]">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            tooltip="Horizontal Line"
                        >
                            <Minus className="h-4 w-4" />
                        </ToolbarButton>
                    </div>

                    {/* Undo/Redo */}
                    <div className="flex items-center gap-0.5 pl-2">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                            tooltip="Undo"
                        >
                            <Undo className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                            tooltip="Redo"
                        >
                            <Redo className="h-4 w-4" />
                        </ToolbarButton>
                    </div>
                </div>

                {/* Editor Content */}
                <div className="flex-1 overflow-y-auto bg-[#09090b]" style={{ overscrollBehavior: 'contain' }}>
                    <EditorContent
                        editor={editor}
                        className="min-h-[300px]"
                    />
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#27272a] bg-[#18181b] flex items-center justify-between">
                    <p className="text-xs text-[#52525b]">
                        {editor.storage.characterCount?.characters?.() ?? editor.getText().length} characters
                    </p>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving || !editor.getText().trim()}
                            className="px-5 py-2 text-sm font-medium bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <MessageSquare className="h-4 w-4" />
                                    Send Feedback
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Toolbar Button Component
function ToolbarButton({
    onClick,
    isActive,
    disabled,
    children,
    tooltip
}: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    tooltip?: string;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={tooltip}
            className={`
                p-2 rounded-md transition-all
                ${isActive
                    ? 'bg-violet-500/20 text-violet-400'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[#27272a]'
                }
                ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            {children}
        </button>
    );
}

export default FeedbackEditor;
