import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Lock, Users, Send, CheckCircle2, MessageCircle } from 'lucide-react';

// Question bank of 100+ thoughtful friendship and self-reflection questions
const questionBank = [
  "What made you genuinely smile or laugh today?",
  "What is one thing you appreciate the most about your best friend?",
  "What is a personal goal or dream you want to achieve this year?",
  "What is a memory of us that always warms your heart?",
  "What is one thing you want to gently improve about yourself?",
  "If we could take a spontaneous road trip right now, where would we go?",
  "What song immediately reminds you of our friendship?",
  "What is something small someone did for you recently that meant a lot?",
  "If you had 24 hours to do anything in the world with no limits, what would it be?",
  "What is your favorite comfort food when you're feeling down?",
  "What is a silly fear you had as a child?",
  "What is something you are silently proud of achieving?",
  "How do you feel today compared to this time last year?",
  "What is the best piece of advice you have ever received?",
  "What is something new you tried recently that surprised you?",
  "What is your favorite inside joke between us?",
  "If we opened a cafe or small shop together, what would it be?",
  "What movie or TV show could you rewatch a hundred times?",
  "What is something you wish more people understood about you?",
  "What is your favorite time of day and why?",
  "What was the highlight of your week so far?",
  "What is a book, movie, or quote that changed your perspective on life?",
  "If you could have dinner with any historical or fictional person, who would it be?",
  "What is something that instantly calms your mind when you feel stressed?",
  "What is a personality trait in your best friend that inspires you?",
  "If we were characters in a fantasy adventure, what roles would we play?",
  "What is a habit you're trying to build or break right now?",
  "What is the most thoughtful gift you've ever received?",
  "What is something you find beautiful that others might overlook?",
  "If our friendship was a movie genre, would it be a comedy, adventure, or drama?",
  "What is your favorite scent in the world?",
  "What is a compliment you received that you will never forget?",
  "What is your favorite photo of us and why?",
  "What is a challenge you faced recently that made you stronger?",
  "If you could learn any new language or skill overnight, what would you choose?",
  "What is your definition of true happiness?",
  "What is a tradition you want us to keep every year?",
  "What always brings you out of a bad mood?",
  "What is something you loved doing as a kid that you miss doing now?",
  "If you could teleport anywhere for 1 hour to have coffee with your bestie, where?",
  "What is something you feel deeply grateful for today?",
  "What is a random act of kindness you witnessed or performed recently?",
  "What makes our friendship different from any other friendship you've known?",
  "If you could give your younger self one sentence of encouragement, what would it be?",
  "What is a place that feels like absolute peace to you?",
  "What is your favorite season of the year and your favorite memory from it?",
  "What is something funny or absurd that happened to you this week?",
  "How do you usually recharge your emotional battery?",
  "What is a promise you want to make to yourself for the next 6 months?",
  "What is the most adventurous thing you've ever done with your best friend?",
  "What is something you secretly want to learn to cook or bake?",
  "What is your favorite way to spend a quiet rainy afternoon?",
  "If our friendship had a theme song, what vibe would it be?",
  "What is one boundary you've set recently that protected your peace?",
  "What is a dream you haven't told many people about?",
  "What is something you admire about how your best friend handles tough times?",
  "If we wrote a book together, what would the title be?",
  "What is a hobby you would love for us to pick up together?",
  "What is the funniest text message you've sent or received recently?",
  "What does friendship loyalty mean to you in one sentence?",
  "What is your go-to late-night snack when we stay up talking?",
  "What is a place you've traveled to that took your breath away?",
  "What is something you find fascinating about the universe or nature?",
  "How do you prefer to receive love and support when you're overwhelmed?",
  "What is a quirky habit you have when you think nobody is watching?",
  "What is something you hope will never change about us as we grow older?",
  "What is a lesson a past mistake taught you that you are now grateful for?",
  "What is the best surprise you have ever had in your life?",
  "If you could design our ultimate dream bestie hangout room, what would be in it?",
  "What is something you're currently anticipating with excitement?",
  "What is a question you've always wanted to ask me but never did?",
  "What makes you feel truly safe and accepted?",
  "What is a talent or skill you wish you had?",
  "What is your favorite memory from school or college with your friends?",
  "What is something that made you shake your head and laugh at yourself today?",
  "What is an outfit or style you love wearing because it feels 100% you?",
  "What is a small daily ritual that brings you joy?",
  "If you could instantly adopt any pet right now, what animal would you choose?",
  "What is a time when your best friend knew you were upset without you saying a word?",
  "What is a positive affirmation you need to hear today?",
  "What is your favorite dessert to share?",
  "What is something courageous you did recently, even if you felt scared?",
  "What is your favorite holiday memory?",
  "If you could create a national holiday dedicated to best friends, how would we celebrate?",
  "What is a podcast, video, or creator that always brightens your day?",
  "What is one thing that made you feel proud of your best friend recently?",
  "What is your favorite board game or card game to play together?",
  "What is a quote or lyric that gives you goosebumps?",
  "What is something you want us to do when we turn 80 years old?",
  "How do you know when you can completely trust someone?",
  "What is your favorite childhood cartoon or cartoon character?",
  "What is a scent that brings back an instant flood of nostalgia?",
  "What is something generous you hope to do for your family or loved ones one day?",
  "What is a moment when we laughed so hard our stomachs hurt?",
  "What is the most creative thing you made or thought of recently?",
  "If you could send a postcard to anyone today, who would it be and what would it say?",
  "What is your favorite way to celebrate small victories?",
  "What is a trait you have inherited from someone you love?",
  "What is one word that best describes your energy today?",
  "What is something you love about where you live, or where you grew up?",
  "What makes you feel most alive?"
];

export default function DailySharePage({ showNotification }) {
  const [dailyQuestions, setDailyQuestions] = useState([]);
  const [answers, setAnswers] = useState(['', '', '', '', '']);
  const [privacySettings, setPrivacySettings] = useState([
    'share_bestie',
    'share_bestie',
    'share_bestie',
    'only_me',
    'share_bestie'
  ]);
  const [submittedToday, setSubmittedToday] = useState(false);

  // Pick 5 stable questions for the day based on the calendar day
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const selected = [];
    for (let i = 0; i < 5; i++) {
      const idx = (dayOfYear * 5 + i * 17) % questionBank.length;
      selected.push(questionBank[idx]);
    }
    setDailyQuestions(selected);

    // Check stored answers for today
    const stored = localStorage.getItem(`bestiverse_daily_${today.toISOString().split('T')[0]}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAnswers(parsed.answers || ['', '', '', '', '']);
        setPrivacySettings(parsed.privacy || ['share_bestie', 'share_bestie', 'share_bestie', 'only_me', 'share_bestie']);
        setSubmittedToday(true);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handlePrivacyChange = (index, privacy) => {
    const updated = [...privacySettings];
    updated[index] = privacy;
    setPrivacySettings(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todayStr = new Date().toISOString().split('T')[0];
    localStorage.setItem(
      `bestiverse_daily_${todayStr}`,
      JSON.stringify({
        date: todayStr,
        questions: dailyQuestions,
        answers,
        privacy: privacySettings,
        savedAt: new Date().toISOString()
      })
    );
    setSubmittedToday(true);
    showNotification('Daily thoughts saved! Shared with privacy controls 💖');
  };

  return (
    <div className="page-content">
      {/* Banner */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.18), rgba(139, 92, 246, 0.18))',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <Sparkles size={28} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '1.6rem', margin: 0 }}>Daily Share & Think 💭</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '720px' }}>
          5 fresh daily reflection questions chosen from our 100+ bestie question bank. Answer freely, choose who sees each answer, and foster deep connection.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          {dailyQuestions.map((question, idx) => (
            <div key={idx} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0, flex: 1 }}>
                  <span style={{ color: 'var(--primary-pink)', marginRight: '0.4rem' }}>#{idx + 1}</span>
                  {question}
                </h3>

                {/* Privacy Badge Selector */}
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => handlePrivacyChange(idx, 'only_me')}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      border: privacySettings[idx] === 'only_me' ? '1px solid #ef4444' : '1px solid var(--border-color)',
                      background: privacySettings[idx] === 'only_me' ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-card)',
                      color: privacySettings[idx] === 'only_me' ? '#ef4444' : 'var(--text-muted)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                    title="Visible only to you"
                  >
                    <Lock size={12} />
                    <span>Only Me 🔒</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePrivacyChange(idx, 'share_bestie')}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      border: privacySettings[idx] === 'share_bestie' ? '1px solid var(--primary-pink)' : '1px solid var(--border-color)',
                      background: privacySettings[idx] === 'share_bestie' ? 'rgba(255, 94, 151, 0.15)' : 'var(--bg-card)',
                      color: privacySettings[idx] === 'share_bestie' ? 'var(--primary-pink)' : 'var(--text-muted)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                    title="Shared with your best friend"
                  >
                    <Users size={12} />
                    <span>Share With Bestie 💗</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={3}
                placeholder="Share your genuine thought or skip..."
                value={answers[idx] || ''}
                onChange={(e) => handleAnswerChange(idx, e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
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
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <Sparkles size={16} color="var(--primary-pink)" />
            <span>5 new questions will refresh automatically at midnight</span>
          </div>

          <button type="submit" className="btn-primary">
            <Send size={18} />
            <span>{submittedToday ? 'Update Shared Thoughts' : 'Save & Share Today’s Thoughts'}</span>
          </button>
        </div>
      </form>

      {/* Simulated Bestie Reaction */}
      {submittedToday && (
        <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--emerald)', background: 'rgba(16, 185, 129, 0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '1.6rem' }}>👭</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>Bestie reacted to your shared thoughts!</h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Just now</span>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            "Aww thank you! Reading your answers always makes my day so much brighter 💖🌸"
          </p>
        </div>
      )}
    </div>
  );
}
