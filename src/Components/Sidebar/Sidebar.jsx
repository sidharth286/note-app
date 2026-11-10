
import React from 'react';
import './Sidebar.css';

import {
    Download,
    Moon,
    Sun,
    Star,
    Trash2,
    Search
} from 'lucide-react';

const Sidebar = ({
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    exportNotes
}) => {

    return (
        <div className="sidebar glass">

            <h2>Notes App</h2>

            <button
                className={`sidebar-btn ${
                    activeTab === 'notes' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('notes')}
            >
                <Search size={20} />
                <span>All Notes</span>
            </button>

            <button
                className={`sidebar-btn ${
                    activeTab === 'favorites' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('favorites')}
            >
                <Star size={20} />
                <span>Favorites</span>
            </button>

            <button
                className={`sidebar-btn ${
                    activeTab === 'trash' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('trash')}
            >
                <Trash2 size={20} />
                <span>Trash</span>
            </button>

            <div
                style={{
                    marginTop: 'auto',
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center'
                }}
            >

                <button
                    className="icon-btn"
                    onClick={toggleTheme}
                    title="Toggle Theme"
                >
                    {theme === 'dark'
                        ? <Sun size={20} />
                        : <Moon size={20} />
                    }
                </button>

                <button
                    className="icon-btn"
                    onClick={exportNotes}
                    title="Export Notes JSON"
                >
                    <Download size={20} />
                </button>

            </div>

        </div>
    );
};

export default Sidebar;
