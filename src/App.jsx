
import React, { useEffect, useState, useMemo } from 'react';

import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';
import NoteList from './Components/NoteList/NoteList';
import EditorModal from './Components/EditorModal/EditorModal';
import { COLORS } from './Components/utlis/constants';

const App = () => {

    // 1. Notes state
    const [notes, setNotes] = useState(() => {
        try {
            const saved = localStorage.getItem('notes-app-data');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading notes:', error);
            return [];
        }
    });

    // 2. Theme state
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('notes-theme') || 'dark';
    });

    // 3. Other states
    const [activeTab, setActiveTab] = useState('notes');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingNote, setEditingNote] = useState(null);

    // 4. Toggle theme
    const toggleTheme = () => {
        setTheme(prevTheme =>
            prevTheme === 'dark' ? 'light' : 'dark'
        );
    };

    // 5. Apply theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('notes-theme', theme);
    }, [theme]);

    // 6. Save notes to localStorage
    useEffect(() => {
        localStorage.setItem(
            'notes-app-data',
            JSON.stringify(notes)
        );
    }, [notes]);

    // 7. Create new note
    const createNote = () => {
        const newNote = {
            id: Date.now().toString(),
            title: '',
            content: '',
            color: COLORS[0],
            pinned: false,
            favourite: false,
            trash: false,
            tags: [],
            date: new Date().toISOString()
        };

        setEditingNote(newNote);
    };

    // 8. Save or update note
    const saveNote = (note) => {
        setNotes(prev => {
            const exists = prev.some(n => n.id === note.id);

            if (exists) {
                return prev.map(n =>
                    n.id === note.id ? note : n
                );
            }

            return [note, ...prev];
        });

        setEditingNote(null);
    };

    // 9. Pin and favourite
    const toggleStatus = (e, id, field) => {
        e.stopPropagation();

        const selectedNote = notes.find(note => note.id === id);

        if (!selectedNote) return;

        const newValue = !selectedNote[field];

        // Update the selected note
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === id
                    ? { ...note, [field]: newValue }
                    : note
            )
        );

        // Automatically switch tabs for favourites
        if (field === 'favourite') {
            setActiveTab(newValue ? 'favorites' : 'notes');
        }
    };

    // 10. Move note to trash
    const moveToTrash = (e, id) => {
        e.stopPropagation();

        setNotes(prev =>
            prev.map(note =>
                note.id === id
                    ? {
                        ...note,
                        trash: true,
                        pinned: false,
                        favourite: false
                    }
                    : note
            )
        );
    };

    // 11. Restore note
    const restoreFromTrash = (e, id) => {
        e.stopPropagation();

        setNotes(prev =>
            prev.map(note =>
                note.id === id
                    ? { ...note, trash: false }
                    : note
            )
        );
    };

    // 12. Delete forever
    const deleteForever = (e, id) => {
        e.stopPropagation();

        setNotes(prev =>
            prev.filter(note => note.id !== id)
        );
    };

    // 13. Export notes
    const exportNotes = () => {
        const dataStr =
            'data:application/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(notes, null, 2));

        const downloadAnchor = document.createElement('a');

        downloadAnchor.href = dataStr;
        downloadAnchor.download = 'notes-export.json';

        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    };

    // 14. Filter and sort notes
    const filterNotes = useMemo(() => {

        return notes

            // Filter by selected tab
            .filter(note => {

                // All Notes: exclude favourite and trashed notes
                if (activeTab === 'notes') {
                    return !note.trash && !note.favourite;
                }

                // Favorites: show only favourite notes
                if (activeTab === 'favorites') {
                    return !note.trash && note.favourite;
                }

                // Trash: show only trashed notes
                if (activeTab === 'trash') {
                    return note.trash;
                }

                return true;
            })

            // Search notes
            .filter(note => {
                if (!searchQuery.trim()) return true;

                const lowerQ = searchQuery.toLowerCase();

                return (
                    (note.title || '').toLowerCase().includes(lowerQ) ||
                    (note.content || '').toLowerCase().includes(lowerQ) ||
                    (note.tags || []).some(tag =>
                        tag.toLowerCase().includes(lowerQ)
                    )
                );
            })

            // Pinned notes first
            .sort((a, b) => {
                if (a.pinned !== b.pinned) {
                    return b.pinned ? 1 : -1;
                }

                return new Date(b.date) - new Date(a.date);
            });

    }, [notes, activeTab, searchQuery]);

    // 15. UI
    return (
        <div className="app-container">

            <Sidebar
                theme={theme}
                toggleTheme={toggleTheme}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                exportNotes={exportNotes}
            />

            <div className="main-content">

                <Header
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    createNote={createNote}
                />

                <NoteList
                    notes={filterNotes}
                    setEditingNote={setEditingNote}
                    toggleStatus={toggleStatus}
                    moveToTrash={moveToTrash}
                    restoreFromTrash={restoreFromTrash}
                    deleteForever={deleteForever}
                />

            </div>

            {editingNote && (
                <EditorModal
                    initialNote={editingNote}
                    onSave={saveNote}
                    onClose={() => setEditingNote(null)}
                />
            )}

        </div>
    );
};

export default App;
