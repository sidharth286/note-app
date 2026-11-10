
import React from 'react';
import './NoteCard.css';

import {
  ArchiveRestore,
  Pin,
  Star,
  Trash2
} from 'lucide-react';

const NoteCard = ({
  note,
  setEditingNote,
  toggleStatus,
  moveToTrash,
  restoreFromTrash,
  deleteForever
}) => {
  return (
    <div
      className="note-card glass glass-card"
      style={{ background: note.color }}
      onClick={() => setEditingNote(note)}
    >
      <div className="note-header">
        <div className="note-title">
          {note.title || 'Untitled Note'}
        </div>

        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {!note.trash && (
            <>
              <button
                type="button"
                className={`icon-btn ${note.pinned ? 'active' : ''}`}
                title="Pin note"
                onClick={(e) => toggleStatus(e, note.id, 'pinned')}
              >
                <Pin size={16} />
              </button>

              <button
                type="button"
                className={`icon-btn ${note.favourite ? 'active' : ''}`}
                title="Favourite note"
                onClick={(e) => toggleStatus(e, note.id, 'favourite')}
              >
                <Star size={16} />
              </button>

              <button
                type="button"
                className="icon-btn"
                title="Move to trash"
                onClick={(e) => moveToTrash(e, note.id)}
              >
                <Trash2 size={16} />
              </button>
            </>
          )}

          {note.trash && (
            <>
              <button
                type="button"
                className="icon-btn"
                title="Restore note"
                onClick={(e) => restoreFromTrash(e, note.id)}
              >
                <ArchiveRestore size={16} />
              </button>

              <button
                type="button"
                className="icon-btn"
                title="Delete forever"
                onClick={(e) => deleteForever(e, note.id)}
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="note-content">
        {note.content || 'Empty Note...'}
      </div>

      {note.tags?.length > 0 && (
        <div className="tags-row">
          {note.tags.map((tag, index) => (
            <span key={`${tag}-${index}`} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="note-footer">
        <span>
          {new Date(note.date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
