
import React, { useState } from 'react';
import './EditorModal.css';

import {
    Check,
    Copy,
    Palette,
    Tag,
    X
} from 'lucide-react';

import { COLORS } from '../utlis/constants';

const EditorModal = ({ initialNote, onSave, onClose }) => {

    const [note, setNote] = useState({ ...initialNote });
    const [tagInput, setTagInput] = useState('');

    // Update note properties
    const handleChange = (field, value) => {
        setNote(prev => ({
            ...prev,
            [field]: value,
            date: new Date().toISOString()
        }));
    };

    // Add tag
    const addTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();

            const tag = tagInput.trim();

            if (!note.tags.includes(tag)) {
                handleChange('tags', [...note.tags, tag]);
            }

            setTagInput('');
        }
    };

    // Remove tag
    const removeTag = (tag) => {
        handleChange(
            'tags',
            note.tags.filter(t => t !== tag)
        );
    };

    // Copy note
    const copyToClipboard = () => {
        navigator.clipboard.writeText(
            `${note.title}\n\n${note.content}`
        );
    };

    return (
        <div className="modal-overlay">

            <div
                className="editor-modal glass"
                style={{
                    background: note.color
                }}
                onClick={e => e.stopPropagation()}
            >

                {/* Header */}
                <div className="editor-header">

                    <input
                        type="text"
                        className="editor-title"
                        placeholder="Note Title"
                        value={note.title}
                        onChange={e =>
                            handleChange('title', e.target.value)
                        }
                    />

                    <div style={{ display: 'flex', gap: '0.5rem' }}>

                        <button
                            className="icon-btn"
                            title="Copy Note"
                            onClick={copyToClipboard}
                        >
                            <Copy size={20} />
                        </button>

                        <button
                            className="icon-btn"
                            onClick={() => onSave(note)}
                        >
                            <Check size={20} />
                        </button>

                        <button
                            className="icon-btn"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>

                    </div>
                </div>

                {/* Toolbar */}
                <div className="editor-toolbar">

                    <Palette size={16} />

                    <div className="color-picker">

                        {COLORS.map(c => (
                            <div
                                key={c}
                                className={`color-circle ${
                                    note.color === c ? 'active' : ''
                                }`}
                                style={{ background: c }}
                                onClick={() => handleChange('color', c)}
                            />
                        ))}

                    </div>

                    <Tag size={16} />

                    <div className="tags-row">

                        {note.tags.map(tag => (
                            <span key={tag} className="tag">
                                #{tag}

                                <X
                                    size={12}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => removeTag(tag)}
                                />
                            </span>
                        ))}

                    </div>

                    <input
                        type="text"
                        placeholder="Add tag..."
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={addTag}
                    />

                </div>

                {/* Note content */}
                <textarea
                    className="editor-content"
                    placeholder="Start typing your note here..."
                    autoFocus
                    value={note.content}
                    onChange={e =>
                        handleChange('content', e.target.value)
                    }
                />

            </div>
        </div>
    );
};

export default EditorModal;
