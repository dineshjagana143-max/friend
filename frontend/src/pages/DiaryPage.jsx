import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BookHeart,
  Save,
  Trash2,
  Edit3,
  Calendar,
  Search,
  Download,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertTriangle,
  Lock,
  Plus,
  X
} from 'lucide-react';
import {
  getAllDiaryEntries,
  saveDiaryEntry,
  deleteDiaryEntry,
  saveDraft,
  getDraft,
  clearDraft,
  exportLocalData,
  importLocalData
} from '../utils/db';

const prompts = [
  "1. What made you smile or laugh today? 😊",
  "2. What is a secret or thought you didn't say out loud today? 🤫",
  "3. What are you most grateful for right now? 🌸",
  "4. How did you connect with or appreciate your bestie recently? 👭",
  "5. What is your quiet goal or wish for tomorrow? ✨"
];

export default function DiaryPage({ showNotification }) {
  const { t } = useTranslation();
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState('write'); // 'write' or 'history'
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [selectedEntryView, setSelectedEntryView] = useState(null);

  // Form State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState('🥰');
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '', '']);
  const [freeText, setFreeText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [draftSavedTime, setDraftSavedTime] = useState(null);

  // Load entries on mount
  useEffect(() => {
    loadEntries();
    checkDraft();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await getAllDiaryEntries();
      setEntries(data);
    } catch (err) {
      console.error('Error loading diary entries:', err);
    }
  };

  const checkDraft = async () => {
    try {
      const draft = await getDraft('diary_current_draft');
      if (draft && !editingId) {
        if (draft.title) setTitle(draft.title);
        if (draft.answers) setAnswers(draft.answers);
        if (draft.freeText) setFreeText(draft.freeText);
        if (draft.mood) setMood(draft.mood);
        if (draft.photo) setPhoto(draft.photo);
      }
    } catch (e) {
      console.error('Error reading draft:', e);
    }
  };

  // Autosave draft on change
  useEffect(() => {
    if (editingId) return; // Don't overwrite draft when editing existing
    const timer = setTimeout(async () => {
      if (title || freeText || answers.some(a => a.trim() !== '')) {
        await saveDraft('diary_current_draft', {
          title,
          answers,
          freeText,
          mood,
          photo,
          date
        });
        setDraftSavedTime(new Date().toLocaleTimeString());
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [title, answers, freeText, mood, photo, date, editingId]);

  const handleAnswerChange = (index, val) => {
    const updated = [...answers];
    updated[index] = val;
    setAnswers(updated);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showNotification('Please select an image smaller than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setPhoto(uploadEvent.target.result);
        showNotification('Photo attached to entry 📷');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim() && !freeText.trim() && answers.every(a => !a.trim())) {
      showNotification('Please write something before saving!');
      return;
    }

    const entryToSave = {
      id: editingId || undefined,
      date,
      mood,
      title: title.trim() || 'Daily Reflection',
      prompts,
      answers,
      freeText,
      photo
    };

    try {
      await saveDiaryEntry(entryToSave);
      await clearDraft('diary_current_draft');
      setDraftSavedTime(null);
      resetForm();
      await loadEntries();
      setActiveTab('history');
      showNotification(editingId ? 'Diary entry updated!' : 'Saved securely to IndexedDB! 💖');
    } catch (err) {
      console.error('Save error:', err);
      showNotification('Error saving entry to IndexedDB.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setAnswers(['', '', '', '', '']);
    setFreeText('');
    setPhoto(null);
    setMood('🥰');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setDate(entry.date || new Date().toISOString().split('T')[0]);
    setMood(entry.mood || '🥰');
    setTitle(entry.title || '');
    setAnswers(entry.answers || ['', '', '', '', '']);
    setFreeText(entry.freeText || '');
    setPhoto(entry.photo || null);
    setActiveTab('write');
    setSelectedEntryView(null);
    showNotification('Editing entry in form');
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteDiaryEntry(deleteConfirmId);
      setDeleteConfirmId(null);
      if (selectedEntryView && selectedEntryView.id === deleteConfirmId) {
        setSelectedEntryView(null);
      }
      await loadEntries();
      showNotification('Diary entry removed safely.');
    } catch (err) {
      console.error('Delete error:', err);
      showNotification('Could not delete entry.');
    }
  };

  const handleExportBackup = async () => {
    try {
      const data = await exportLocalData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bestiverse_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showNotification('Backup exported successfully! 📦');
    } catch (e) {
      showNotification('Export failed.');
    }
  };

  const handleImportBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        await importLocalData(parsed);
        await loadEntries();
        showNotification('Backup restored successfully into IndexedDB! 🎉');
      } catch (err) {
        console.error('Import error:', err);
        showNotification('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const filteredEntries = entries.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesTitle = item.title && item.title.toLowerCase().includes(q);
    const matchesText = item.freeText && item.freeText.toLowerCase().includes(q);
    const matchesAnswers = item.answers && item.answers.some(a => a.toLowerCase().includes(q));
    const matchesDate = item.date && item.date.includes(q);
    return matchesTitle || matchesText || matchesAnswers || matchesDate;
  });

  return (
    <div className="page-content">
      {/* Header Banner */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.18), rgba(255, 94, 151, 0.18))',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <BookHeart size={26} color="var(--primary-pink)" />
              <h2 style={{ fontSize: '1.6rem', margin: 0 }}>{t('diary.title')}</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              {t('diary.subtitle')}
            </p>
          </div>

          {/* Backup / Export Buttons */}
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button
              onClick={handleExportBackup}
              className="btn-secondary"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
              title="Download your private diary backup as JSON"
            >
              <Download size={16} />
              <span>{t('diary.exportBackup')}</span>
            </button>
            <label
              className="btn-secondary"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', cursor: 'pointer', margin: 0 }}
              title="Restore diary from JSON backup"
            >
              <Upload size={16} />
              <span>{t('diary.importBackup')}</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button
            onClick={() => setActiveTab('write')}
            className={activeTab === 'write' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.5rem 1.25rem' }}
          >
            <Plus size={18} />
            <span>{editingId ? 'Edit Entry' : t('diary.newEntry')}</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={activeTab === 'history' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.5rem 1.25rem' }}
          >
            <Calendar size={18} />
            <span>{t('diary.history')} ({entries.length})</span>
          </button>
        </div>
      </div>

      {/* WRITE TAB */}
      {activeTab === 'write' && (
        <form onSubmit={handleSave} className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  DATE
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    padding: '0.5rem 0.8rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontWeight: 600
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  TODAY'S MOOD
                </label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {['🥰', '🌸', '💭', '🥺', '⚡', '😴'].map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMood(m)}
                      style={{
                        fontSize: '1.3rem',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '10px',
                        background: mood === m ? 'rgba(255, 94, 151, 0.25)' : 'transparent',
                        border: mood === m ? '2px solid var(--primary-pink)' : '1px solid transparent',
                        cursor: 'pointer'
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Draft notice */}
            {draftSavedTime && !editingId && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--emerald)' }}>
                <CheckCircle size={15} />
                <span>Autosaved locally at {draftSavedTime}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Entry Title / Headline
            </label>
            <input
              type="text"
              placeholder="e.g., A gentle sunny day with my bestie 🌸"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontWeight: 600,
                outline: 'none'
              }}
            />
          </div>

          {/* 5 Daily Reflection Questions */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--primary-pink)' }}>
              5 Daily Reflection Questions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {prompts.map((promptText, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 94, 151, 0.04)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    {promptText}
                  </label>
                  <input
                    type="text"
                    placeholder="Your reflection..."
                    value={answers[idx] || ''}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Free-text Journal */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Free-Flow Journal & Unfiltered Thoughts 💭
            </label>
            <textarea
              rows={5}
              placeholder={t('diary.journalPlaceholder')}
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Photo Attachment */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)', background: 'var(--bg-card)' }}>
              <ImageIcon size={18} color="var(--primary-pink)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                {photo ? 'Change Photo Attachment' : 'Attach a Photo from Today'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
            </label>

            {photo && (
              <div style={{ marginTop: '0.75rem', position: 'relative', display: 'inline-block' }}>
                <img
                  src={photo}
                  alt="Attachment preview"
                  style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '2px solid var(--primary-pink)' }}
                />
                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Submit Actions */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button type="submit" className="btn-primary">
              <Save size={18} />
              <span>{editingId ? 'Update Entry' : t('diary.saveEntry')}</span>
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                <span>Cancel Edit</span>
              </button>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
              <Lock size={14} />
              <span>IndexedDB Client Only</span>
            </div>
          </div>
        </form>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <div>
          {/* Search bar */}
          <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by keywords, questions, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.4rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {filteredEntries.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📔🌸</div>
              <h3 style={{ marginBottom: '0.5rem' }}>{t('diary.noEntries')}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Reflect on your day, your feelings, and your wonderful bond with your bestie.
              </p>
              <button onClick={() => setActiveTab('write')} className="btn-primary">
                <Plus size={18} />
                <span>Write First Entry</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedEntryView(entry)}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{entry.mood || '🌸'}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-pink)' }}>
                          {entry.date}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                      {entry.title || 'Daily Reflection'}
                    </h4>

                    {entry.freeText && (
                      <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: '0.75rem'
                      }}>
                        {entry.freeText}
                      </p>
                    )}

                    {entry.photo && (
                      <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                        <img
                          src={entry.photo}
                          alt="Thumbnail"
                          style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '0.5rem',
                      marginTop: '1rem',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '0.75rem'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleEdit(entry)}
                      className="btn-icon"
                      style={{ width: '34px', height: '34px' }}
                      title="Edit this entry"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(entry.id)}
                      className="btn-icon"
                      style={{ width: '34px', height: '34px', color: '#ef4444' }}
                      title="Delete this entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div className="glass-card" style={{ maxWidth: '420px', width: '90%', background: 'var(--bg-card-solid)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <AlertTriangle size={24} color="#ef4444" />
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Delete Diary Entry?</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Are you sure you want to delete this reflection? It will be permanently removed from your IndexedDB storage.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setDeleteConfirmId(null)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn-danger">
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {selectedEntryView && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setSelectedEntryView(null)}
        >
          <div
            className="glass-card"
            style={{ maxWidth: '600px', width: '100%', maxHeight: '85vh', overflowY: 'auto', background: 'var(--bg-card-solid)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '2rem' }}>{selectedEntryView.mood || '🌸'}</span>
                <div>
                  <h3 style={{ fontSize: '1.3rem', margin: 0 }}>{selectedEntryView.title}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedEntryView.date}</span>
                </div>
              </div>
              <button onClick={() => setSelectedEntryView(null)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            {selectedEntryView.photo && (
              <img
                src={selectedEntryView.photo}
                alt="Entry full visual"
                style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}
              />
            )}

            {selectedEntryView.freeText && (
              <div style={{ marginBottom: '1.5rem', background: 'rgba(255, 94, 151, 0.05)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--primary-pink)' }}>Unfiltered Journal</h4>
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
                  {selectedEntryView.freeText}
                </p>
              </div>
            )}

            {selectedEntryView.answers && selectedEntryView.answers.some(a => a) && (
              <div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--primary-pink)' }}>Reflection Answers</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {prompts.map((p, i) => {
                    const ans = selectedEntryView.answers[i];
                    if (!ans) return null;
                    return (
                      <div key={i} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0 0 0.2rem', color: 'var(--text-secondary)' }}>{p}</p>
                        <p style={{ fontSize: '0.9rem', margin: 0 }}>{ans}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                onClick={() => handleEdit(selectedEntryView)}
                className="btn-primary"
                style={{ padding: '0.5rem 1rem' }}
              >
                <Edit3 size={16} />
                <span>Edit Entry</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
