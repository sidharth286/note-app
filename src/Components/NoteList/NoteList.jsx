
import React from 'react';
import './NoteList.css';

import NoteCard from '../NoteCard/NoteCard';

const NoteList = ({
    notes,
    setEditingNote,
    toggleStatus,
    moveToTrash,
    restoreFromTrash,
    deleteForever
}) => {

    return (
        <div className="note-grid">

            {notes.map(note => (
                <NoteCard
                    key={note.id}
                    note={note}
                    setEditingNote={setEditingNote}
                    toggleStatus={toggleStatus}
                    moveToTrash={moveToTrash}
                    restoreFromTrash={restoreFromTrash}
                    deleteForever={deleteForever}
                />
            ))}

            {notes.length === 0 && (
                <div
                    style={{
                        gridColumn: '1/-1',
                        textAlign: 'center',
                        opacity: '0.5',
                        marginTop: '2rem'
                    }}
                >
                    No Notes found.
                </div>
            )}

        </div>
    );
};

export default NoteList;
