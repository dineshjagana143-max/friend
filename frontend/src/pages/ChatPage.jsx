import React, { useState } from 'react';
import {
  MessageCircleHeart,
  Send,
  Smile,
  Paperclip,
  Mic,
  Search,
  MoreVertical,
  CheckCheck,
  ShieldAlert,
  Phone,
  Video
} from 'lucide-react';

export default function ChatPage({ setCurrentTab, showNotification }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bestie',
      text: 'Hey bestie! Have you tried the new Tic-Tac-Toe game yet? ❌⭕',
      time: '10:30 AM',
      reactions: ['💖']
    },
    {
      id: 2,
      sender: 'me',
      text: 'Yes! Just scored 3 wins in a row against the AI! 🚀✨',
      time: '10:32 AM',
      reactions: ['🔥', '😂']
    },
    {
      id: 3,
      sender: 'bestie',
      text: 'No way! Let me check the daily questions on Daily Share too! 💭',
      time: '10:33 AM',
      reactions: []
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: []
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulated Bestie response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bestie',
          text: 'Got your message! Can’t wait for our full Socket.IO real-time multiplayer in Stage 3! 👭💖',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          reactions: ['🥰']
        }
      ]);
      showNotification('New message from Bestie! 💌');
    }, 1500);
  };

  const addReaction = (id, emoji) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        const reactions = m.reactions.includes(emoji)
          ? m.reactions.filter(r => r !== emoji)
          : [...m.reactions, emoji];
        return { ...m, reactions };
      }
      return m;
    }));
  };

  return (
    <div className="page-content" style={{ height: 'calc(100vh - 170px)', display: 'flex', flexDirection: 'column' }}>
      {/* Notice Banner */}
      <div
        className="glass-card"
        style={{
          padding: '0.75rem 1.25rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 94, 151, 0.08)',
          border: '1px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <MessageCircleHeart size={18} color="var(--primary-pink)" />
          <span><strong>Stage 1 Interactive Preview</strong>: Real-time Socket.IO backend sync is scheduled for Stage 3!</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setCurrentTab('calls')} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
            <Video size={14} />
            <span>Call</span>
          </button>
        </div>
      </div>

      {/* Chat Window */}
      <div
        className="glass-card"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 0
        }}
      >
        {/* Chat Top Header */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--bg-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff5e97, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem'
              }}
            >
              👭
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', margin: 0 }}>My Bestie 💖</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--emerald)', fontWeight: 600 }}>● Online & Active</span>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowOptions(!showOptions)} className="btn-icon">
              <MoreVertical size={18} />
            </button>
            {showOptions && (
              <div
                className="glass-card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '46px',
                  width: '180px',
                  padding: '0.5rem',
                  zIndex: 20,
                  background: 'var(--bg-card-solid)'
                }}
              >
                <button
                  onClick={() => { setShowOptions(false); showNotification('User reported to moderation.'); }}
                  className="nav-item"
                  style={{ fontSize: '0.85rem', color: '#ef4444' }}
                >
                  <ShieldAlert size={16} />
                  <span>Report User</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Message Feed */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {messages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '75%'
                }}
              >
                <div
                  style={{
                    background: isMe ? 'linear-gradient(135deg, var(--primary-pink), var(--secondary-purple))' : 'var(--bg-card-solid)',
                    color: isMe ? '#ffffff' : 'var(--text-primary)',
                    padding: '0.8rem 1.1rem',
                    borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    boxShadow: 'var(--shadow-sm)',
                    border: isMe ? 'none' : '1px solid var(--border-color)',
                    fontSize: '0.95rem',
                    lineHeight: 1.45,
                    position: 'relative'
                  }}
                >
                  <p style={{ margin: 0 }}>{msg.text}</p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '0.35rem',
                      marginTop: '0.35rem',
                      fontSize: '0.7rem',
                      opacity: 0.8
                    }}
                  >
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck size={14} />}
                  </div>
                </div>

                {/* Reactions badge */}
                <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.25rem', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                  {msg.reactions.map((r, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        background: 'var(--bg-card)',
                        padding: '1px 6px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {r}
                    </span>
                  ))}
                  <button
                    onClick={() => addReaction(msg.id, '💖')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', opacity: 0.6 }}
                    title="Add heart reaction"
                  >
                    +💖
                  </button>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div style={{ alignSelf: 'flex-start', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Bestie is typing... 💭
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={handleSend}
          style={{
            padding: '1rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: 'var(--bg-card)'
          }}
        >
          <input
            type="text"
            placeholder="Type a sweet message to your bestie..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              padding: '0.75rem 1.2rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-main)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />

          <button type="submit" className="btn-primary" style={{ borderRadius: '50%', width: '44px', height: '44px', padding: 0, justifyContent: 'center' }}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
