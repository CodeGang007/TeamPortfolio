'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Link as LinkIcon,
    Quote,
    Heading1,
    Heading2,
    Undo,
    Redo,
    Minus,
    Expand,
    Minimize2,
    FileText,
    Type
} from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
    isOnline?: boolean;
    label?: string;
    required?: boolean;
}

// URL Validation Helper
function isValidUrl(string: string): boolean {
    if (!string.trim()) return false;
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'mailto:';
    } catch {
        return false;
    }
}

// Simple Toolbar Button - no memo, no tooltip overlay for smoothness
function ToolbarButton({
    onClick,
    isActive,
    disabled,
    children,
    tooltip,
    isOnline = true
}: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    tooltip?: string;
    isOnline?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            onMouseDown={(e) => e.preventDefault()}
            disabled={disabled}
            title={tooltip}
            className={cn(
                "p-2 rounded-lg",
                isActive
                    ? isOnline
                        ? 'bg-brand-green/15 text-brand-green'
                        : 'bg-red-500/15 text-red-400'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800',
                disabled && 'opacity-30 cursor-not-allowed'
            )}
        >
            {children}
        </button>
    );
}

// Divider for toolbar groups
const ToolbarDivider = () => (
    <div className="w-px h-6 bg-zinc-700/50 mx-1" />
);

// Link Popup Component
function LinkPopup({
    isOpen,
    onClose,
    editor,
    isOnline
}: {
    isOpen: boolean;
    onClose: () => void;
    editor: Editor | null;
    isOnline: boolean;
}) {
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [urlTouched, setUrlTouched] = useState(false);

    const handleInsertLink = useCallback(() => {
        if (!editor || !linkUrl.trim()) return;

        if (linkText.trim()) {
            editor
                .chain()
                .focus()
                .insertContent(`<a href="${linkUrl}">${linkText}</a> `)
                .run();
        } else {
            const { from, to } = editor.state.selection;
            if (from === to) {
                editor
                    .chain()
                    .focus()
                    .insertContent(`<a href="${linkUrl}">${linkUrl}</a> `)
                    .run();
            } else {
                editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
            }
        }

        setLinkUrl('');
        setLinkText('');
        setUrlTouched(false);
        onClose();
    }, [editor, linkUrl, linkText, onClose]);

    const handleCancel = useCallback(() => {
        setLinkUrl('');
        setLinkText('');
        setUrlTouched(false);
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) {
            setLinkUrl('');
            setLinkText('');
            setUrlTouched(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const showError = urlTouched && linkUrl && !isValidUrl(linkUrl);
    const canInsert = linkUrl.trim() && isValidUrl(linkUrl);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-3 p-4 bg-zinc-900/95 backdrop-blur-xl rounded-xl border border-zinc-700/50 shadow-2xl z-50 min-w-[320px]"
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center gap-2 mb-4">
                <div className={cn(
                    "p-1.5 rounded-lg",
                    isOnline ? "bg-brand-green/10" : "bg-red-500/10"
                )}>
                    <LinkIcon className={cn(
                        "h-4 w-4",
                        isOnline ? "text-brand-green" : "text-red-400"
                    )} />
                </div>
                <span className="text-sm font-semibold text-white">Insert Link</span>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                        Display Text <span className="text-zinc-600">(optional)</span>
                    </label>
                    <input
                        type="text"
                        value={linkText}
                        onChange={(e) => setLinkText(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        placeholder="e.g. Click here"
                        className="w-full px-3 py-2.5 text-sm bg-zinc-950/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700/50 placeholder:text-zinc-600 transition-all"
                    />
                </div>
                <div>
                    <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                        URL <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        onBlur={() => setUrlTouched(true)}
                        placeholder="https://example.com"
                        className={cn(
                            "w-full px-3 py-2.5 text-sm bg-zinc-950/50 border rounded-lg text-white focus:outline-none transition-all placeholder:text-zinc-600",
                            showError
                                ? "border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                                : "border-zinc-800 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700/50"
                        )}
                        autoFocus
                    />
                    {showError && (
                        <p className="text-xs text-amber-500 mt-1.5 flex items-center gap-1.5">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Please enter a valid URL
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-zinc-800/50">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleInsertLink}
                    disabled={!canInsert}
                    className={cn(
                        "px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2",
                        canInsert
                            ? isOnline
                                ? "bg-brand-green text-black hover:bg-brand-green/90 shadow-lg shadow-brand-green/20"
                                : "bg-red-500 text-white hover:bg-red-600"
                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    )}
                >
                    <LinkIcon className="h-3.5 w-3.5" />
                    Insert
                </button>
            </div>
        </motion.div>
    );
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = "Start writing your project description...",
    maxLength = 5000,
    isOnline = true,
    label = "Description",
    required = false
}: RichTextEditorProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2],
                },
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    class: 'text-blue-400 underline cursor-pointer hover:text-blue-300 transition-colors',
                },
            }),
            Underline,
            Placeholder.configure({
                placeholder: placeholder,
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-sm max-w-none focus:outline-none min-h-[160px] px-5 py-4 text-white leading-relaxed',
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            const textLength = editor.getText().length;
            if (textLength <= maxLength) {
                onChange(html);
            }
        },
    });

    const closeLinkPopup = useCallback(() => {
        setShowLinkInput(false);
    }, []);

    // Keyboard shortcut: Escape to close fullscreen
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isExpanded) {
                setIsExpanded(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isExpanded]);

    if (!editor) return null;

    const characterCount = editor.getText().length;
    const characterPercentage = (characterCount / maxLength) * 100;

    // Professional Toolbar
    const Toolbar = ({ className = "", showExpandButton = true }: { className?: string; showExpandButton?: boolean }) => (
        <div className={cn(
            "flex flex-wrap items-center gap-0.5 px-3 py-2 bg-zinc-900/60 backdrop-blur-sm",
            className
        )}>
            {/* Text Formatting */}
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                tooltip="Bold"
                isOnline={isOnline}
            >
                <Bold className="h-4 w-4" strokeWidth={2.5} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                tooltip="Italic"
                isOnline={isOnline}
            >
                <Italic className="h-4 w-4" strokeWidth={2.5} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive('underline')}
                tooltip="Underline"
                isOnline={isOnline}
            >
                <UnderlineIcon className="h-4 w-4" strokeWidth={2.5} />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Headings */}
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                tooltip="Heading 1"
                isOnline={isOnline}
            >
                <Heading1 className="h-4 w-4" strokeWidth={2} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                tooltip="Heading 2"
                isOnline={isOnline}
            >
                <Heading2 className="h-4 w-4" strokeWidth={2} />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Lists */}
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                tooltip="Bullet List"
                isOnline={isOnline}
            >
                <List className="h-4 w-4" strokeWidth={2} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                tooltip="Numbered List"
                isOnline={isOnline}
            >
                <ListOrdered className="h-4 w-4" strokeWidth={2} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
                tooltip="Quote"
                isOnline={isOnline}
            >
                <Quote className="h-4 w-4" strokeWidth={2} />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Link */}
            <div className="relative">
                <ToolbarButton
                    onClick={() => setShowLinkInput(!showLinkInput)}
                    isActive={editor.isActive('link')}
                    tooltip="Link"
                    isOnline={isOnline}
                >
                    <LinkIcon className="h-4 w-4" strokeWidth={2} />
                </ToolbarButton>

                <AnimatePresence>
                    <LinkPopup
                        isOpen={showLinkInput}
                        onClose={closeLinkPopup}
                        editor={editor}
                        isOnline={isOnline}
                    />
                </AnimatePresence>
            </div>

            {/* Horizontal Rule */}
            <ToolbarButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                tooltip="Divider"
                isOnline={isOnline}
            >
                <Minus className="h-4 w-4" strokeWidth={2} />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Undo/Redo */}
            <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                tooltip="Undo"
                isOnline={isOnline}
            >
                <Undo className="h-4 w-4" strokeWidth={2} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                tooltip="Redo"
                isOnline={isOnline}
            >
                <Redo className="h-4 w-4" strokeWidth={2} />
            </ToolbarButton>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Expand Button */}
            {showExpandButton && (
                <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className={cn(
                        "p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-medium",
                        isOnline
                            ? 'text-zinc-500 hover:text-brand-green hover:bg-brand-green/10'
                            : 'text-zinc-500 hover:text-red-400 hover:bg-red-500/10'
                    )}
                    title="Expand"
                >
                    <Expand className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Expand</span>
                </button>
            )}
        </div>
    );

    // The EditorContent
    const EditorView = (
        <EditorContent
            editor={editor}
            className={cn(
                "min-h-[160px] overflow-y-auto custom-scrollbar",
                isOnline ? "text-white" : "text-red-200"
            )}
        />
    );

    return (
        <div className="space-y-2.5">
            <label className="text-sm font-semibold text-zinc-300 flex items-center gap-1.5">
                <Type className="h-4 w-4 text-zinc-500" />
                {label}
                {required && <span className={cn("text-xs", isOnline ? 'text-brand-green' : 'text-red-500')}>*</span>}
            </label>

            <div className={cn(
                "relative rounded-xl border overflow-hidden transition-all duration-200",
                isOnline
                    ? "border-zinc-800/80 bg-zinc-950/50 hover:border-zinc-700 focus-within:border-brand-green/50 focus-within:ring-2 focus-within:ring-brand-green/10 focus-within:shadow-[0_0_20px_rgba(34,197,94,0.05)]"
                    : "border-red-900/30 bg-red-950/20 hover:border-red-800/50 focus-within:border-red-500/50 focus-within:ring-2 focus-within:ring-red-500/10"
            )}>
                {/* Toolbar */}
                <div className={cn(
                    "border-b",
                    isOnline ? "border-zinc-800/50" : "border-red-900/30"
                )}>
                    <Toolbar />
                </div>

                {/* Editor Content - Only render here when NOT expanded */}
                {!isExpanded && (
                    <div className="relative max-h-[280px] overflow-y-auto custom-scrollbar bg-zinc-950/30">
                        {EditorView}
                    </div>
                )}

                {/* Placeholder when expanded */}
                {isExpanded && (
                    <div className="min-h-[160px] max-h-[280px] flex items-center justify-center bg-zinc-950/30">
                        <div className="text-center">
                            <Expand className={cn(
                                "h-8 w-8 mx-auto mb-2",
                                isOnline ? "text-brand-green/30" : "text-red-500/30"
                            )} />
                            <span className="text-sm text-zinc-600">Editing in fullscreen mode</span>
                            <p className="text-xs text-zinc-700 mt-1">Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">Esc</kbd> to exit</p>
                        </div>
                    </div>
                )}

                {/* Footer with character count */}
                <div className={cn(
                    "px-4 py-2.5 border-t flex items-center justify-between",
                    isOnline ? "border-zinc-800/50 bg-zinc-900/30" : "border-red-900/30 bg-red-950/30"
                )}>
                    {/* Character count bar */}
                    <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                            <div
                                className={cn(
                                    "h-full rounded-full transition-all duration-300",
                                    characterPercentage > 90
                                        ? "bg-amber-500"
                                        : characterPercentage > 75
                                            ? "bg-yellow-500"
                                            : isOnline ? "bg-brand-green" : "bg-red-500"
                                )}
                                style={{ width: `${Math.min(characterPercentage, 100)}%` }}
                            />
                        </div>
                        <span className={cn(
                            "text-xs font-medium tabular-nums",
                            characterPercentage > 90
                                ? "text-amber-500"
                                : "text-zinc-500"
                        )}>
                            {characterCount.toLocaleString()} / {maxLength.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Fullscreen Modal */}
            {mounted && isExpanded && createPortal(
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
                    onClick={() => setIsExpanded(false)}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        className={cn(
                            "w-full max-w-4xl h-[85vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden",
                            isOnline
                                ? 'bg-zinc-950 border-zinc-800 shadow-brand-green/5'
                                : 'bg-zinc-950 border-red-900/50 shadow-red-500/5'
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className={cn(
                            "flex items-center justify-between px-6 py-4 border-b",
                            isOnline ? 'border-zinc-800/50' : 'border-red-900/30'
                        )}>
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "p-2.5 rounded-xl",
                                    isOnline ? 'bg-brand-green/10' : 'bg-red-500/10'
                                )}>
                                    <FileText className={cn(
                                        "h-5 w-5",
                                        isOnline ? 'text-brand-green' : 'text-red-500'
                                    )} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Project Description</h3>
                                    <p className="text-xs text-zinc-500">Use formatting to structure your requirements</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsExpanded(false)}
                                className={cn(
                                    "p-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium",
                                    isOnline
                                        ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
                                        : 'hover:bg-red-900/30 text-red-400 hover:text-red-300'
                                )}
                            >
                                <Minimize2 className="h-4 w-4" />
                                <span className="hidden sm:inline">Exit</span>
                                <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] bg-zinc-800 rounded text-zinc-500">Esc</kbd>
                            </button>
                        </div>

                        {/* Modal Toolbar */}
                        <div className={cn(
                            "border-b",
                            isOnline ? "border-zinc-800/50" : "border-red-900/30"
                        )}>
                            <Toolbar showExpandButton={false} />
                        </div>

                        {/* Modal Editor Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-zinc-950/50">
                            {EditorView}
                        </div>

                        {/* Modal Footer */}
                        <div className={cn(
                            "flex items-center justify-between px-6 py-4 border-t",
                            isOnline ? 'border-zinc-800/50 bg-zinc-900/30' : 'border-red-900/30 bg-red-950/20'
                        )}>
                            <div className="flex items-center gap-3">
                                <div className="w-32 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-300",
                                            characterPercentage > 90
                                                ? "bg-amber-500"
                                                : isOnline ? "bg-brand-green" : "bg-red-500"
                                        )}
                                        style={{ width: `${Math.min(characterPercentage, 100)}%` }}
                                    />
                                </div>
                                <span className="text-sm text-zinc-500 tabular-nums">
                                    {characterCount.toLocaleString()} / {maxLength.toLocaleString()} characters
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsExpanded(false)}
                                className={cn(
                                    "px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg",
                                    isOnline
                                        ? 'bg-brand-green text-black hover:bg-brand-green/90 shadow-brand-green/20'
                                        : 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20'
                                )}
                            >
                                Done
                            </button>
                        </div>
                    </motion.div>
                </motion.div>,
                document.body
            )}
        </div>
    );
}

export default RichTextEditor;
