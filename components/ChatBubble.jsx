/**
 * ChatBubble — Fold Health Chat Bubble Web Component
 *
 * Implements every variant from Figma node 1288-19893 (Fold Pixel 1.0)
 *
 * Props:
 *  side        'left' | 'right' | 'internal'
 *  type        'default' | 'attachment' | 'link' | 'reply' | 'call' | 'missed-call' | 'audio' | 'audio-reply'
 *  sender      string  — display name
 *  showAvatar  boolean
 *  showName    boolean
 *  showTime    boolean
 *  time        string  e.g. "9:28 PM"
 *  text        string  — message body (supports @Name mentions)
 *  starred     boolean
 *  status      'sent' | 'delivered' | 'read'  (right bubbles only)
 *  replyTo     { sender, text }               (reply type)
 *  attachment  { title, size, previewUrl }    (attachment type)
 *  link        { url, title, description, previewUrl }  (link type)
 *  callDuration string e.g. "12 min"          (call type)
 *  missedCallText string                       (missed-call type)
 *  audioDuration  string e.g. "-2:30"         (audio / audio-reply)
 */

import React, { useState } from 'react';
import {
  PhoneLinear,
  CallDroppedLinear,
  PlayCircleLinear,
  VolumeSmallLinear,
  DocumentLinear,
  DownloadMinimalisticLinear,
  ReplyLinear,
  StarLinear,
  NotesLinear,
  ChecklistLinear,
  CheckCircleLinear,
  CheckReadLinear,
  UsersGroupTwoRoundedLinear,
  MenuDotsLinear,
  LinkMinimalisticLinear,
  StarFallLinear,
} from 'solar-icon-set';

/* ─── Design tokens (mirrors CSS variables) ──────────────────────────────── */
const T = {
  primary300:    '#8C5AE2',
  primary200:    '#D7C0FF',
  primary100:    '#F5F0FF',
  secondary300:  '#F47A3E',
  secondary200:  '#FBCEB7',
  secondary100:  '#FEEEE7',
  neutral400:    '#3A485F',
  neutral300:    '#6F7A90',
  neutral200:    '#8A94A8',
  neutral150:    '#D0D6E1',
  neutral100:    '#E9ECF1',
  neutral75:     '#F3F4F7',
  neutral50:     '#F6F7F8',
  neutral0:      '#FFFFFF',
  errorRed:      '#DC2626',
  successGreen:  '#16A34A',
};

/* ─── Parse @mentions in text ────────────────────────────────────────────── */
function parseText(text, isSent = false) {
  if (!text) return null;
  const parts = text.split(/(@[\w\s.]+)/g);
  return parts.map((part, i) => {
    if (part.startsWith('@')) {
      return (
        <span
          key={i}
          style={{
            color:      isSent ? '#fff' : T.secondary300,
            fontWeight: isSent ? 600    : 400,
          }}
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/* ─── Sender Avatar (rounded rectangle, ~28 × 28) ────────────────────────── */
function SenderAvatar({ name, side }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const bg    = side === 'internal' ? T.secondary100 : T.primary100;
  const color = side === 'internal' ? T.secondary300 : T.primary300;
  const border= side === 'internal' ? `1.5px solid ${T.secondary200}` : `1.5px solid ${T.primary200}`;

  return (
    <div
      style={{
        width: 28, height: 28,
        borderRadius: 6,
        flexShrink: 0,
        background: bg,
        border,
        color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {initials}
    </div>
  );
}

/* ─── Message Status (checkmarks for sent messages) ──────────────────────── */
function MessageStatus({ status, time, showTime }) {
  const greenCheck = T.successGreen;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4,
      justifyContent: 'flex-end', marginTop: 4,
    }}>
      {showTime && (
        <span style={{ fontSize: 11, color: T.neutral300, lineHeight: '14px' }}>{time}</span>
      )}
      {status === 'read' && (
        <CheckReadLinear size={13} color={greenCheck} />
      )}
      {status === 'delivered' && (
        <CheckCircleLinear size={13} color={greenCheck} />
      )}
      {status === 'sent' && (
        <CheckCircleLinear size={13} color={T.neutral300} />
      )}
    </div>
  );
}

/* ─── Hover Action Bar ───────────────────────────────────────────────────── */
function HoverActionBar({ onTask, onNote, onReply, onStar, onMore, starred }) {
  const actions = [
    { label: 'Task',  Icon: ChecklistLinear, onClick: onTask  },
    { label: 'Note',  Icon: NotesLinear,     onClick: onNote  },
    { label: 'Reply', Icon: ReplyLinear,     onClick: onReply },
    {
      label: 'Star',
      Icon:  starred ? StarFallLinear : StarLinear,
      color: starred ? '#F59E0B'      : T.neutral300,
      onClick: onStar,
    },
  ];

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center',
        background: T.neutral0,
        border: `0.5px solid ${T.neutral150}`,
        borderRadius: 6,
        padding: '4px 8px',
        gap: 4,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        position: 'absolute',
        top: -32, right: 0,
        zIndex: 10,
        whiteSpace: 'nowrap',
      }}
    >
      {actions.map(({ label, Icon, color = T.neutral300, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '2px 6px', borderRadius: 4,
            fontSize: 12, fontWeight: 400, color: T.neutral400,
            fontFamily: 'Inter, sans-serif',
            transition: 'background 0.1s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = T.neutral50)}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
        >
          <Icon size={13} color={color} />
          {label}
        </button>
      ))}

      {/* Divider */}
      <div style={{ width: 1, height: 16, background: T.neutral150, margin: '0 2px' }} />

      <button
        onClick={onMore}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '2px 4px', borderRadius: 4, display: 'flex', alignItems: 'center',
          transition: 'background 0.1s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = T.neutral50)}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
      >
        <MenuDotsLinear size={14} color={T.neutral300} />
      </button>
    </div>
  );
}

/* ─── Bubble Shell (white or purple) ────────────────────────────────────── */
function BubbleShell({ side, children, maxWidth = 480, noPad = false }) {
  const isSent = side === 'right';
  return (
    <div
      style={{
        maxWidth,
        background:   isSent ? T.primary300 : T.neutral0,
        border:       isSent ? 'none' : `0.5px solid ${T.neutral150}`,
        borderRadius: 12,
        padding:      noPad ? 0 : '10px 12px',
        fontSize: 13, lineHeight: '18px',
        color:   isSent ? '#fff' : T.neutral400,
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

/* ─── DEFAULT type ───────────────────────────────────────────────────────── */
function DefaultContent({ text, side }) {
  return <>{parseText(text, side === 'right')}</>;
}

/* ─── REPLY type ─────────────────────────────────────────────────────────── */
function ReplyContent({ replyTo, text, side }) {
  const isSent = side === 'right';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* Quoted message */}
      <div
        style={{
          borderLeft: `3px solid ${isSent ? 'rgba(255,255,255,0.5)' : T.primary300}`,
          paddingLeft: 8,
          borderRadius: '0 4px 4px 0',
          background:   isSent ? 'rgba(255,255,255,0.12)' : T.neutral75,
          padding: '6px 8px',
        }}
      >
        <div style={{
          fontSize: 11, fontWeight: 600,
          color: isSent ? 'rgba(255,255,255,0.8)' : T.primary300,
          marginBottom: 2,
        }}>
          {replyTo?.sender}
        </div>
        <div style={{
          fontSize: 12,
          color: isSent ? 'rgba(255,255,255,0.7)' : T.neutral300,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          maxWidth: 300,
        }}>
          {replyTo?.text}
        </div>
      </div>
      {/* New message */}
      <div>{parseText(text, isSent)}</div>
    </div>
  );
}

/* ─── ATTACHMENT type ────────────────────────────────────────────────────── */
function AttachmentContent({ attachment, text, side }) {
  const isSent = side === 'right';
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Image preview */}
      {attachment?.previewUrl ? (
        <div style={{
          position: 'relative',
          height: 160,
          background: T.neutral75,
          borderRadius: '12px 12px 0 0',
          overflow: 'hidden',
        }}>
          <img
            src={attachment.previewUrl}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PlayCircleLinear size={20} color={T.neutral400} />
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          height: 100,
          background: T.neutral75,
          borderRadius: '12px 12px 0 0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <DocumentLinear size={32} color={T.neutral200} />
        </div>
      )}

      {/* File card */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 12px',
        background: isSent ? 'rgba(255,255,255,0.12)' : T.neutral0,
        borderTop: `0.5px solid ${isSent ? 'rgba(255,255,255,0.15)' : T.neutral100}`,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6, flexShrink: 0,
          background: T.neutral75,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <DocumentLinear size={14} color={T.neutral300} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 500,
            color: isSent ? '#fff' : T.neutral400,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {attachment?.title}
          </div>
          <div style={{ fontSize: 11, color: isSent ? 'rgba(255,255,255,0.6)' : T.neutral300 }}>
            {attachment?.size}
          </div>
        </div>
        <DownloadMinimalisticLinear size={16} color={isSent ? 'rgba(255,255,255,0.7)' : T.neutral300} />
      </div>

      {/* Optional message text */}
      {text && (
        <div style={{ padding: '8px 12px', fontSize: 13, color: isSent ? '#fff' : T.neutral400 }}>
          {parseText(text, isSent)}
        </div>
      )}
    </div>
  );
}

/* ─── LINK type ──────────────────────────────────────────────────────────── */
function LinkContent({ link, text, side }) {
  const isSent = side === 'right';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {text && <div>{parseText(text, isSent)}</div>}
      <div style={{
        background: isSent ? 'rgba(255,255,255,0.12)' : T.neutral75,
        borderRadius: 8,
        overflow: 'hidden',
        border: `0.5px solid ${isSent ? 'rgba(255,255,255,0.15)' : T.neutral150}`,
      }}>
        {link?.previewUrl && (
          <img
            src={link.previewUrl}
            alt=""
            style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }}
          />
        )}
        <div style={{ padding: '8px 10px', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
          <LinkMinimalisticLinear size={14} color={T.primary300} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <div style={{
              fontSize: 12, fontWeight: 500,
              color: isSent ? '#fff' : T.neutral400,
            }}>
              {link?.title || link?.url}
            </div>
            {link?.description && (
              <div style={{
                fontSize: 11,
                color: isSent ? 'rgba(255,255,255,0.6)' : T.neutral300,
                marginTop: 2,
              }}>
                {link.description}
              </div>
            )}
            <div style={{ fontSize: 11, color: T.primary300, marginTop: 2 }}>{link?.url}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CALL type ──────────────────────────────────────────────────────────── */
function CallBubble({ callDuration, side }) {
  const isSent = side === 'right';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px' }}>
      <PhoneLinear size={18} color={isSent ? '#fff' : T.neutral400} />
      <span style={{ fontSize: 14, fontWeight: 500, color: isSent ? '#fff' : T.neutral400 }}>
        Voice Call
      </span>
      {callDuration && (
        <span style={{ fontSize: 13, color: isSent ? 'rgba(255,255,255,0.7)' : T.neutral300 }}>
          {callDuration}
        </span>
      )}
    </div>
  );
}

/* ─── MISSED CALL type (system / centered) ───────────────────────────────── */
function MissedCallMessage({ missedCallText = 'from Richard Willson', time, showTime }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '4px 0', width: '100%',
    }}>
      {/* Left dashed line */}
      <div style={{ flex: 1, borderTop: `1.5px dashed ${T.errorRed}`, opacity: 0.4 }} />
      {/* Icon + text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
        <CallDroppedLinear size={14} color={T.errorRed} />
        <span style={{ fontSize: 12, fontWeight: 600, color: T.errorRed }}>Missed Call</span>
        <span style={{ fontSize: 12, color: T.neutral300 }}>{missedCallText}</span>
        {showTime && (
          <>
            <span style={{ fontSize: 11, color: T.neutral300 }}>{time}</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: T.neutral200 }} />
          </>
        )}
      </div>
      {/* Right dashed line */}
      <div style={{ flex: 1, borderTop: `1.5px dashed ${T.errorRed}`, opacity: 0.4 }} />
    </div>
  );
}

/* ─── AUDIO type ─────────────────────────────────────────────────────────── */
function AudioContent({ audioDuration = '-2:30', side, replyTo }) {
  const isSent = side === 'right';
  const trackColor = isSent ? 'rgba(255,255,255,0.3)' : T.primary200;
  const dotColor   = isSent ? '#fff'                  : T.primary300;
  const iconColor  = isSent ? '#fff'                  : T.neutral400;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {replyTo && (
        <div style={{
          borderLeft: `3px solid ${isSent ? 'rgba(255,255,255,0.5)' : T.primary300}`,
          background: isSent ? 'rgba(255,255,255,0.12)' : T.neutral75,
          padding: '5px 8px', borderRadius: '0 4px 4px 0',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: isSent ? 'rgba(255,255,255,0.8)' : T.primary300 }}>
            {replyTo.sender}
          </div>
          <div style={{ fontSize: 11, color: isSent ? 'rgba(255,255,255,0.6)' : T.neutral300 }}>
            {replyTo.text}
          </div>
        </div>
      )}

      {/* Audio player */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: isSent ? 'rgba(255,255,255,0.1)' : T.neutral75,
        border: `0.5px solid ${isSent ? 'rgba(255,255,255,0.15)' : T.neutral150}`,
        borderRadius: 8, padding: '8px 12px',
        minWidth: 240,
      }}>
        {/* Play button */}
        <PlayCircleLinear size={22} color={iconColor} style={{ flexShrink: 0, cursor: 'pointer' }} />

        {/* Progress bar */}
        <div style={{ flex: 1, position: 'relative', height: 4, borderRadius: 2, background: trackColor }}>
          <div style={{
            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
            width: 10, height: 10, borderRadius: '50%', background: dotColor,
          }} />
        </div>

        {/* Duration */}
        <span style={{ fontSize: 12, color: iconColor, flexShrink: 0 }}>{audioDuration}</span>

        {/* Volume */}
        <VolumeSmallLinear size={16} color={iconColor} style={{ flexShrink: 0 }} />

        {/* Divider */}
        <div style={{ width: 1, height: 16, background: isSent ? 'rgba(255,255,255,0.2)' : T.neutral150 }} />

        {/* More */}
        <MenuDotsLinear size={14} color={iconColor} style={{ flexShrink: 0, cursor: 'pointer' }} />
      </div>
    </div>
  );
}

/* ─── Internal Bubble Shell ──────────────────────────────────────────────── */
function InternalShell({ sender, children, time, showTime, status, starred }) {
  const initials = sender
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div style={{
      border: `1.5px dashed ${T.secondary300}`,
      borderRadius: 10,
      background: T.neutral0,
      padding: 12,
      display: 'flex', flexDirection: 'column', gap: 8,
      maxWidth: 520,
    }}>
      {/* Top bar: "Internal" label (left) + sender avatar (right) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <UsersGroupTwoRoundedLinear size={14} color={T.secondary300} />
          <span style={{ fontSize: 12, fontWeight: 500, color: T.secondary300 }}>Internal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, color: T.neutral300 }}>{sender}</span>
          {/* Avatar */}
          <div style={{
            width: 22, height: 22, borderRadius: 5,
            background: T.secondary100,
            border: `1.5px solid ${T.secondary200}`,
            color: T.secondary300,
            fontSize: 9, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Inter, sans-serif',
          }}>
            {initials}
          </div>
        </div>
      </div>

      {/* Message content */}
      <div style={{ fontSize: 13, color: T.neutral400, lineHeight: '18px', fontFamily: 'Inter, sans-serif' }}>
        {children}
      </div>

      {/* Footer: time + status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
        {starred && <StarFallLinear size={12} color="#F59E0B" />}
        {showTime && <span style={{ fontSize: 11, color: T.neutral300 }}>{time}</span>}
        {status === 'read' && <CheckReadLinear size={12} color={T.successGreen} />}
        {status === 'sent' && <CheckCircleLinear size={12} color={T.neutral300} />}
      </div>
    </div>
  );
}

/* ─── ChatBubble (main export) ───────────────────────────────────────────── */
export default function ChatBubble({
  side          = 'left',          // 'left' | 'right' | 'internal'
  type          = 'default',        // 'default'|'attachment'|'link'|'reply'|'call'|'missed-call'|'audio'|'audio-reply'
  sender        = 'Richard Willson',
  showAvatar    = true,
  showName      = true,
  showTime      = true,
  time          = '9:28 PM',
  text          = '',
  starred       = false,
  status        = 'delivered',       // 'sent'|'delivered'|'read'
  replyTo       = null,              // { sender, text }
  attachment    = null,              // { title, size, previewUrl }
  link          = null,              // { url, title, description, previewUrl }
  callDuration  = '12 min',
  missedCallText= 'from Richard Willson',
  audioDuration = '-2:30',
  onStar,
  onReply,
  onTask,
  onNote,
  onMore,
}) {
  const [hovered, setHovered] = useState(false);
  const [isStarred, setIsStarred] = useState(starred);

  const isSent     = side === 'right';
  const isInternal = side === 'internal';
  const isMissedCall = type === 'missed-call';

  /* ── Missed Call: special system message, rendered outside normal flow ── */
  if (isMissedCall) {
    return (
      <MissedCallMessage
        missedCallText={missedCallText}
        time={time}
        showTime={showTime}
      />
    );
  }

  /* ── Bubble content by type ─────────────────────────────────────────── */
  function renderContent() {
    switch (type) {
      case 'reply':
        return <ReplyContent replyTo={replyTo} text={text} side={side} />;
      case 'attachment':
        return <AttachmentContent attachment={attachment} text={text} side={side} />;
      case 'link':
        return <LinkContent link={link} text={text} side={side} />;
      case 'call':
        return <CallBubble callDuration={callDuration} side={side} />;
      case 'audio':
        return <AudioContent audioDuration={audioDuration} side={side} />;
      case 'audio-reply':
        return <AudioContent audioDuration={audioDuration} side={side} replyTo={replyTo} />;
      default:
        return <DefaultContent text={text} side={side} />;
    }
  }

  const isNoPad = ['attachment', 'call'].includes(type);

  /* ── Internal bubble ────────────────────────────────────────────────── */
  if (isInternal) {
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <InternalShell
          sender={sender}
          time={time}
          showTime={showTime}
          status={status}
          starred={isStarred}
        >
          {parseText(text, false)}
        </InternalShell>
      </div>
    );
  }

  /* ── Left / Right bubble ────────────────────────────────────────────── */
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isSent ? 'flex-end' : 'flex-start',
        gap: 2,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Sender name row */}
      {showName && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', paddingLeft: showAvatar ? 36 : 0,
          gap: 4,
        }}>
          <span style={{ fontSize: 12, fontWeight: 400, color: T.neutral300 }}>
            {!isSent ? sender : sender}
          </span>
          {hovered && (
            <div style={{ cursor: 'pointer' }}>
              <MenuDotsLinear size={14} color={T.neutral300} />
            </div>
          )}
        </div>
      )}

      {/* Avatar + Bubble row */}
      <div style={{
        display: 'flex',
        flexDirection: isSent ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: 8,
        position: 'relative',
      }}>
        {/* Avatar */}
        {showAvatar && !isSent && (
          <SenderAvatar name={sender} side={side} />
        )}

        {/* Bubble + hover actions wrapper */}
        <div style={{ position: 'relative' }}>
          {/* Hover action bar */}
          {hovered && (
            <HoverActionBar
              starred={isStarred}
              onStar={() => { setIsStarred((s) => !s); onStar?.(); }}
              onReply={onReply}
              onTask={onTask}
              onNote={onNote}
              onMore={onMore}
            />
          )}

          {/* Starred indicator */}
          {isStarred && (
            <div style={{
              position: 'absolute',
              top: -8, right: -8,
              zIndex: 2,
            }}>
              <StarFallLinear size={14} color="#F59E0B" />
            </div>
          )}

          <BubbleShell side={side} noPad={isNoPad}>
            {renderContent()}
          </BubbleShell>
        </div>
      </div>

      {/* Timestamp + status */}
      <div style={{
        paddingLeft: showAvatar && !isSent ? 36 : 0,
        width: '100%',
      }}>
        {isSent ? (
          <MessageStatus status={status} time={time} showTime={showTime} />
        ) : (
          showTime && (
            <div style={{
              display: 'flex', justifyContent: 'flex-start',
              paddingLeft: 0,
            }}>
              {isStarred && <StarFallLinear size={12} color="#F59E0B" style={{ marginRight: 4 }} />}
              <span style={{ fontSize: 11, color: T.neutral300 }}>{time}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
