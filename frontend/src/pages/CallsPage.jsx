import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, PhoneCall, ShieldCheck, Info } from 'lucide-react';

export default function CallsPage({ showNotification }) {
  const [inCall, setInCall] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [stream, setStream] = useState(null);
  const [callDuration, setCallDuration] = useState(0);

  const videoRef = useRef(null);

  useEffect(() => {
    let interval;
    if (inCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [inCall]);

  const startTestCall = async (video = true) => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: video,
          audio: true
        });
        setStream(mediaStream);
        setIsCameraOn(video);
        setIsMicOn(true);
        setInCall(true);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        showNotification('Media stream connected! Testing camera & mic 🎤📸');
      } else {
        setInCall(true);
        showNotification('Simulating call connection (Browser media devices unavailable).');
      }
    } catch (err) {
      console.warn('Camera/mic access error:', err);
      setInCall(true);
      showNotification('Note: Camera permission not granted. Connected in audio-only simulation mode.');
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setInCall(false);
    setIsCameraOn(false);
    showNotification('Call ended.');
  };

  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
        showNotification(videoTrack.enabled ? 'Camera turned on' : 'Camera turned off');
      }
    } else {
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
        showNotification(audioTrack.enabled ? 'Microphone unmuted' : 'Microphone muted');
      }
    } else {
      setIsMicOn(!isMicOn);
    }
  };

  const formatDuration = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="page-content">
      {/* Infrastructure Notice */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(139, 92, 246, 0.15))',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}
      >
        <Info size={24} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h3 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem' }}>WebRTC Voice & Video Call Studio</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            One-to-one peer calls require the Node.js signaling server (Stage 3 & 4) and STUN/TURN relay. You can test your local webcam, microphone, and call interface controls directly below!
          </p>
        </div>
      </div>

      {!inCall ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Start Call Card */}
          <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff5e97, #8b5cf6)',
                margin: '0 auto 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: '0 8px 24px rgba(255, 94, 151, 0.35)'
              }}
            >
              👭
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Call Bestie 💖</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              Connect with your best friend via encrypted one-to-one voice or video stream.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={() => startTestCall(true)} className="btn-primary">
                <Video size={18} />
                <span>Start Video Call</span>
              </button>
              <button onClick={() => startTestCall(false)} className="btn-secondary">
                <PhoneCall size={18} />
                <span>Voice Only</span>
              </button>
            </div>
          </div>

          {/* Diagnostics Card */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} color="var(--emerald)" />
              <span>WebRTC Readiness Check</span>
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Browser Media Devices API:</span>
                <strong style={{ color: navigator.mediaDevices ? 'var(--emerald)' : '#ef4444' }}>
                  {navigator.mediaDevices ? 'Supported ✅' : 'Unsupported ❌'}
                </strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>RTCPeerConnection:</span>
                <strong style={{ color: window.RTCPeerConnection ? 'var(--emerald)' : '#ef4444' }}>
                  {window.RTCPeerConnection ? 'Supported ✅' : 'Unsupported ❌'}
                </strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>STUN Google Public Server:</span>
                <strong style={{ color: 'var(--primary-pink)' }}>stun.l.google.com:19302</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Signaling Gateway:</span>
                <strong style={{ color: 'var(--secondary-purple)' }}>Scheduled for Stage 3 & 4</strong>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        /* Active Call Interface */
        <div
          className="glass-card"
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '1.5rem',
            textAlign: 'center',
            background: 'var(--bg-card-solid)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--emerald)', fontWeight: 700 }}>
              ● Call Connected
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 800 }}>
              {formatDuration(callDuration)}
            </span>
          </div>

          {/* Video Stream Box */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '340px',
              borderRadius: 'var(--radius-lg)',
              background: '#0f0a1c',
              overflow: 'hidden',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isCameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ textAlign: 'center', color: '#fff' }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>👭</div>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Bestie Voice Call</p>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>Camera is turned off</p>
              </div>
            )}
          </div>

          {/* Call Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.25rem' }}>
            <button
              onClick={toggleMic}
              className="btn-icon"
              style={{
                width: '52px',
                height: '52px',
                background: isMicOn ? 'var(--bg-card)' : 'rgba(239, 68, 68, 0.2)',
                color: isMicOn ? 'var(--text-primary)' : '#ef4444'
              }}
              title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {isMicOn ? <Mic size={22} /> : <MicOff size={22} />}
            </button>

            <button
              onClick={toggleCamera}
              className="btn-icon"
              style={{
                width: '52px',
                height: '52px',
                background: isCameraOn ? 'var(--bg-card)' : 'rgba(239, 68, 68, 0.2)',
                color: isCameraOn ? 'var(--text-primary)' : '#ef4444'
              }}
              title={isCameraOn ? 'Disable Camera' : 'Enable Camera'}
            >
              {isCameraOn ? <Video size={22} /> : <VideoOff size={22} />}
            </button>

            <button
              onClick={endCall}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)'
              }}
              title="End Call"
            >
              <PhoneOff size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
