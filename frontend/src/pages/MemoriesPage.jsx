import React, { useState, useEffect } from 'react';
import { Camera, Plus, Trash2, Calendar, Heart, Search, Image as ImageIcon, MapPin, Sparkles, CheckSquare, Square } from 'lucide-react';
import { getAllMemories, saveMemory, deleteMemory } from '../utils/db';

export default function MemoriesPage({ showNotification }) {
  const [memories, setMemories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('scrapbook'); // 'scrapbook' or 'future_plans'

  // Form State
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Anniversary');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  // Future plans list
  const [plans, setPlans] = useState([
    { id: 1, text: 'Go on a weekend road trip to the mountains 🚗🏔️', completed: false },
    { id: 2, text: 'Cook a 3-course fancy dinner together from scratch 🍝🍰', completed: true },
    { id: 3, text: 'Take a polaroid photo session at sunset 📸🌅', completed: false },
    { id: 4, text: 'Attend a live concert or music festival 🎵✨', completed: false }
  ]);
  const [newPlanText, setNewPlanText] = useState('');

  useEffect(() => {
    loadMemories();
    const storedPlans = localStorage.getItem('bestiverse_future_plans');
    if (storedPlans) {
      try {
        setPlans(JSON.parse(storedPlans));
      } catch (e) {}
    }
  }, []);

  const loadMemories = async () => {
    try {
      const data = await getAllMemories();
      if (data.length === 0) {
        // Sample default memories
        const defaultSample = [
          {
            id: 'sample_1',
            caption: 'First coffee hangout where we talked for 4 hours straight ☕',
            date: '2025-04-12',
            category: 'First Meet',
            location: 'Artisan Cafe',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
            createdAt: new Date().toISOString()
          },
          {
            id: 'sample_2',
            caption: 'Celebrating friendship anniversary with cupcakes and laughter! 🧁✨',
            date: '2025-09-24',
            category: 'Anniversary',
            location: 'City Garden',
            image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
            createdAt: new Date().toISOString()
          }
        ];
        for (const s of defaultSample) {
          await saveMemory(s);
        }
        setMemories(defaultSample);
      } else {
        setMemories(data);
      }
    } catch (err) {
      console.error('Error loading memories:', err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showNotification('Please select an image smaller than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setImage(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = async (e) => {
    e.preventDefault();
    if (!caption.trim()) {
      showNotification('Please add a memory caption!');
      return;
    }

    const newMem = {
      caption,
      date,
      category,
      location,
      image: image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80'
    };

    try {
      await saveMemory(newMem);
      setShowAddModal(false);
      setCaption('');
      setLocation('');
      setImage(null);
      await loadMemories();
      showNotification('New memory added to your scrapbook! 💖');
    } catch (e) {
      showNotification('Error saving memory.');
    }
  };

  const handleDeleteMemory = async (id) => {
    if (window.confirm('Delete this memory from your scrapbook?')) {
      try {
        await deleteMemory(id);
        await loadMemories();
        showNotification('Memory removed.');
      } catch (e) {
        showNotification('Could not delete memory.');
      }
    }
  };

  const togglePlan = (id) => {
    const updated = plans.map(p => p.id === id ? { ...p, completed: !p.completed } : p);
    setPlans(updated);
    localStorage.setItem('bestiverse_future_plans', JSON.stringify(updated));
  };

  const addPlan = (e) => {
    e.preventDefault();
    if (!newPlanText.trim()) return;
    const updated = [...plans, { id: Date.now(), text: newPlanText.trim(), completed: false }];
    setPlans(updated);
    setNewPlanText('');
    localStorage.setItem('bestiverse_future_plans', JSON.stringify(updated));
    showNotification('New plan added to wishlist! 🚀');
  };

  const filteredMemories = memories.filter(m =>
    m.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.location && m.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="page-content">
      {/* Header Banner */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(56, 189, 248, 0.18))',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <Camera size={28} color="var(--emerald)" />
              <h2 style={{ fontSize: '1.6rem', margin: 0 }}>Friendship Memories 💖</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Your private scrapbook of milestones, anniversary dates, and future adventures.
            </p>
          </div>

          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            <Plus size={18} />
            <span>Add Memory</span>
          </button>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button
            onClick={() => setActiveTab('scrapbook')}
            className={activeTab === 'scrapbook' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.45rem 1.1rem', fontSize: '0.9rem' }}
          >
            <span>Photo Scrapbook ({memories.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('future_plans')}
            className={activeTab === 'future_plans' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.45rem 1.1rem', fontSize: '0.9rem' }}
          >
            <span>Future Plans & Wishlist ({plans.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'scrapbook' && (
        <div>
          {/* Search bar */}
          <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search memories by caption, category, or location..."
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {filteredMemories.map((mem) => (
              <div
                key={mem.id}
                className="glass-card"
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '0.9rem' }}>
                  <img
                    src={mem.image}
                    alt={mem.caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(0,0,0,0.65)',
                      backdropFilter: 'blur(4px)',
                      color: '#fff',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}
                  >
                    {mem.category}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} />
                    <span>{mem.date}</span>
                  </div>
                  {mem.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={14} />
                      <span>{mem.location}</span>
                    </div>
                  )}
                </div>

                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 1rem', lineHeight: 1.5, flex: 1 }}>
                  {mem.caption}
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                  <button
                    onClick={() => handleDeleteMemory(mem.id)}
                    className="btn-icon"
                    style={{ width: '32px', height: '32px', color: '#ef4444' }}
                    title="Delete memory"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'future_plans' && (
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-pink)' }}>
            Bestie Bucket List & Future Adventures ✈️
          </h3>

          <form onSubmit={addPlan} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="e.g., Go on a stargazing camping night ⛺✨"
              value={newPlanText}
              onChange={(e) => setNewPlanText(e.target.value)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn-primary">
              <Plus size={18} />
              <span>Add Plan</span>
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => togglePlan(plan.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: plan.completed ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {plan.completed ? (
                  <CheckSquare size={20} color="var(--emerald)" />
                ) : (
                  <Square size={20} color="var(--text-muted)" />
                )}
                <span
                  style={{
                    fontSize: '0.95rem',
                    textDecoration: plan.completed ? 'line-through' : 'none',
                    color: plan.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                    fontWeight: 500
                  }}
                >
                  {plan.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      {showAddModal && (
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
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="glass-card"
            style={{ maxWidth: '500px', width: '100%', background: 'var(--bg-card-solid)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Capture a New Bestie Memory 📸</h3>

            <form onSubmit={handleAddMemory}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Caption & Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="What made this moment unforgettable?"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="Anniversary">Anniversary</option>
                    <option value="Roadtrip">Roadtrip & Travel</option>
                    <option value="First Meet">First Meet</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Late Night">Late Night Talks</option>
                    <option value="Victory">Big Victory</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Location (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. City Garden or Beachside"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Photo Attachment
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
