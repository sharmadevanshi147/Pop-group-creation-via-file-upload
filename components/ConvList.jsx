import React, { useState, useEffect } from 'react';
import {
  MagniferLinear,
  CheckSquareLinear,
  FilterLinear,
  SortLinear,
  UserCheckRoundedLinear,
  LetterLinear,
  ChatLineLinear,
  IncomingCallLinear,
  CallDroppedLinear,
  CallCancelLinear,
  PrinterLinear,
  AltArrowDownLinear,
} from 'solar-icon-set';
import { Avatar } from './shared.jsx';

/* ─── Conversations (exported so ChatView & AllPatients can share the data) ─ */
export const CONVERSATIONS = [
  {
    id: 1,  name: 'Juanita Douglas Jr.',  channel: 'chat',
    time: '23:54', unread: 2,
    preview: 'Thanks so much for your help today!',
    assigned: true,
  },
  {
    id: 2,  name: 'Elbert Boehm',          channel: 'email',
    time: '08:26', unread: 3,
    preview: 'Subject : Reset Password',
    assigned: true, previewPrimary: true,
  },
  {
    id: 3,  name: 'Maria Garcia',           channel: 'sms',
    time: '22:40', unread: 1,
    preview: 'Can you call me when you are free?',
    assigned: true,
  },
  {
    id: 4,  name: 'Jeannie Schaefer',       channel: 'call_missed',
    time: '22:26', unread: 1,
    preview: 'Missed Call',
    assigned: true,
  },
  {
    id: 5,  name: "Dr. Smith's Office",     channel: 'efax',
    time: '21:15', unread: 1,
    preview: 'Referral: Cardiology Consult',
    assigned: false,
  },
  {
    id: 6,  name: 'Dr. Hernandez Leo',      channel: 'internal',
    time: '20:50', unread: null,
    preview: "I've reviewed Sarah's chart — neurology referral rec.",
    assigned: true,
  },
  {
    id: 7,  name: 'Jackie Kohler II',       channel: 'call_incoming',
    time: '20:30', unread: null,
    preview: 'Incoming Call · 8 min',
    assigned: true,
  },
  {
    id: 8,  name: 'Kristen Fay',            channel: 'chat',
    time: '19:45', unread: null,
    preview: 'When will my next appointment be scheduled?',
    assigned: true,
  },
  {
    id: 9,  name: 'David Chen',             channel: 'email',
    time: '18:30', unread: null,
    preview: 'Subject : Lab Results — Q3 Follow-up',
    assigned: false, previewPrimary: true,
  },
  {
    id: 10, name: 'Gail Cummerata',         channel: 'call_declined',
    time: '17:55', unread: null,
    preview: 'Call Declined',
    assigned: true,
  },
  {
    id: 11, name: 'Nurse Rebecca Adams',    channel: 'internal',
    time: '17:00', unread: null,
    preview: 'Patient prep ready for tomorrow morning',
    assigned: false,
  },
  {
    id: 12, name: 'Frank Morrison',         channel: 'sms',
    time: '16:30', unread: null,
    preview: 'Prescription refill — still pending?',
    assigned: true,
  },
  {
    id: 13, name: 'Valley Lab Network',     channel: 'efax',
    time: '15:00', unread: null,
    preview: 'Blood Panel Results — URGENT',
    assigned: false,
  },
  {
    id: 14, name: 'Rufus Douglas',          channel: 'chat',
    time: '14:22', unread: null,
    preview: 'Feeling much better, thank you Doctor!',
    assigned: true,
  },
  {
    id: 15, name: 'Freda Collins',          channel: 'chat',
    time: '12:00', unread: null,
    preview: "See you at Thursday's appointment!",
    assigned: true,
  },
];

/* ─── Channel icon config (non-person channels only) ─────────────────────── */
// border matches shared.jsx Avatar pattern: 0.5px solid
const CHANNEL_ICON_CONFIG = {
  email:         { Icon: LetterLinear,       bg: 'var(--secondary-100)', iconColor: 'var(--secondary-300)', border: '0.5px solid var(--secondary-200)' },
  sms:           { Icon: ChatLineLinear,     bg: 'var(--neutral-75)',    iconColor: 'var(--neutral-300)',   border: '0.5px solid var(--neutral-100)'   },
  call_missed:   { Icon: CallDroppedLinear,  bg: '#FEE2E2',              iconColor: '#EF4444',              border: '0.5px solid #FECACA'              },
  call_incoming: { Icon: IncomingCallLinear, bg: '#DCFCE7',              iconColor: '#16A34A',              border: '0.5px solid #BBF7D0'              },
  call_declined: { Icon: CallCancelLinear,   bg: '#FEE2E2',              iconColor: '#EF4444',              border: '0.5px solid #FECACA'              },
  efax:          { Icon: PrinterLinear,      bg: 'var(--primary-100)',   iconColor: 'var(--primary-300)',   border: '0.5px solid var(--primary-200)'   },
};

/* ─── Channel filter map (CommsMenu item id → conv channel values) ─────────── */
const CHANNEL_FILTER_MAP = {
  chat:     ['chat'],
  sms:      ['sms'],
  calls:    ['call_missed', 'call_incoming', 'call_declined'],
  email:    ['email'],
  efax:     ['efax'],
  internal: ['internal'],
};

/* ─── Channel Avatar ─────────────────────────────────────────────────────── */
function ChannelAvatar({ channel, name }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  // Person channels → patient initials avatar (chat, SMS, email all show patient)
  if (['chat', 'sms', 'email'].includes(channel)) {
    return <Avatar init={initials} size={36} scheme="patient" />;
  }
  // Internal → provider initials avatar
  if (channel === 'internal') {
    return <Avatar init={initials} size={36} scheme="provider" />;
  }

  // Channel-type channels → icon in a rounded-rect tile matching Avatar guidelines
  const cfg = CHANNEL_ICON_CONFIG[channel] || CHANNEL_ICON_CONFIG.sms;
  return (
    <div style={{
      width: 36, height: 36,
      borderRadius: 4,                 // matches shared.jsx Avatar borderRadius
      border: cfg.border,              // 0.5px solid — matches Avatar border weight
      flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: cfg.bg,
      boxSizing: 'border-box',
    }}>
      <cfg.Icon size={17} color={cfg.iconColor} />
    </div>
  );
}

/* ─── Unread Badge — matches top-bar bell badge exactly ──────────────────── */
// Bell badge: width 14, height 14, borderRadius 4, fontSize 8, fontWeight 700
function UnreadBadge({ count }) {
  return (
    <span style={{
      minWidth: 14, height: 14,
      background: 'var(--secondary-300)',
      color: '#fff',
      fontSize: 8, fontWeight: 700,
      borderRadius: 4,
      padding: '0 3px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, lineHeight: 1,
    }}>
      {count}
    </span>
  );
}

/* ─── Conversation Row ───────────────────────────────────────────────────── */
function ConvRow({ conv, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(conv.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center',
        width: '100%', minHeight: 52,
        padding: '8px 8px 8px 12px',
        gap: 8,
        cursor: 'pointer',
        background: isActive
          ? 'var(--primary-25)'
          : hovered ? 'var(--neutral-50)' : 'transparent',
        borderBottom: '0.5px solid var(--neutral-100)',
        borderLeft: isActive ? '2px solid var(--primary-300)' : '2px solid transparent',
        boxSizing: 'border-box',
        transition: 'background 0.1s',
      }}
    >
      <ChannelAvatar channel={conv.channel} name={conv.name} />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Name + assigned icon + time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{
            flex: 1, fontSize: 13, fontWeight: 500,
            color: 'var(--neutral-400)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {conv.name}
          </span>
          {conv.assigned && (
            <UserCheckRoundedLinear size={13} color="var(--secondary-300)" style={{ flexShrink: 0 }} />
          )}
          <span style={{ fontSize: 11, color: 'var(--neutral-300)', flexShrink: 0, lineHeight: '16px' }}>
            {conv.time}
          </span>
        </div>

        {/* Preview + unread badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{
            flex: 1, fontSize: 12,
            color: conv.previewPrimary ? 'var(--primary-300)' : 'var(--neutral-300)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            lineHeight: '16px',
          }}>
            {conv.preview}
          </span>
          {conv.unread != null && <UnreadBadge count={conv.unread} />}
        </div>
      </div>
    </div>
  );
}

/* ─── Tabs ───────────────────────────────────────────────────────────────── */
const TABS = ['All', 'Unread', 'Pinned'];

function ConvTabs({ activeTab, onTabChange }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      height: 40, flexShrink: 0,
      padding: '0 12px',
      borderBottom: '0.5px solid var(--neutral-150)',
      boxSizing: 'border-box',
      gap: 16,
    }}>
      {TABS.map(tab => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              background: 'none', border: 'none', padding: 0,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: isActive ? 500 : 400,
              color: isActive ? 'var(--primary-300)' : 'var(--neutral-300)',
              borderBottom: isActive ? '2px solid var(--primary-300)' : '2px solid transparent',
              height: 40, lineHeight: '38px',
              fontFamily: 'Inter, sans-serif',
              transition: 'color 0.1s, border-color 0.1s',
              flexShrink: 0,
            }}
          >
            {tab}
          </button>
        );
      })}

      <div style={{ flex: 1 }} />

      <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <SortLinear size={16} color="var(--neutral-300)" />
      </div>
    </div>
  );
}

/* ─── Header ─────────────────────────────────────────────────────────────── */
const totalUnread = CONVERSATIONS.reduce((sum, c) => sum + (c.unread || 0), 0);

function ConvHeader() {
  return (
    <div style={{
      height: 48, flexShrink: 0,
      display: 'flex', alignItems: 'center',
      padding: '6px 8px',
      borderBottom: '0.5px solid var(--neutral-150)',
      boxSizing: 'border-box',
      gap: 4,
    }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--neutral-400)', lineHeight: '20px' }}>
          Assign to Me
        </span>
        <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--secondary-300)', lineHeight: '14px' }}>
          {totalUnread} unread conversations
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <MagniferLinear   size={16} color="var(--neutral-300)" style={{ cursor: 'pointer' }} />
        <CheckSquareLinear size={16} color="var(--neutral-300)" style={{ cursor: 'pointer' }} />
        <FilterLinear      size={16} color="var(--neutral-300)" style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
}

/* ─── Numpad dots icon (9-dot grid) ─────────────────────────────────────── */
function NumpadIcon({ size = 16, color = 'currentColor' }) {
  const d = size / 4;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      {[0,1,2].map(row => [0,1,2].map(col => (
        <rect key={`${row}-${col}`} x={col*5+0.5} y={row*5+0.5} width={3} height={3} rx={1} fill={color} />
      )))}
    </svg>
  );
}

/* ─── DialANumber — shown at the bottom of the calls list ───────────────── */
function DialANumber() {
  return (
    <div style={{
      flexShrink: 0,
      borderTop: '0.5px solid var(--neutral-150)',
      background: 'var(--neutral-0)',
      padding: '12px 12px 14px',
      boxSizing: 'border-box',
    }}>
      {/* Title */}
      <span style={{
        display: 'block',
        fontSize: 14, fontWeight: 600,
        color: 'var(--neutral-400)', fontFamily: 'Inter, sans-serif',
        marginBottom: 8,
      }}>
        Dial a Number
      </span>

      {/* Via row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        marginBottom: 8,
      }}>
        <span style={{ fontSize: 12, color: 'var(--neutral-300)', fontFamily: 'Inter, sans-serif' }}>Via</span>
        {/* Provider badge */}
        <div style={{
          width: 20, height: 20, borderRadius: 4, flexShrink: 0,
          background: 'var(--secondary-100)', border: '0.5px solid var(--secondary-200)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--secondary-300)' }}>RF</span>
        </div>
        {/* Phone number with dropdown */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 3, cursor: 'pointer',
          flex: 1, minWidth: 0,
        }}>
          <span style={{
            fontSize: 12, color: 'var(--neutral-400)', fontFamily: 'Inter, sans-serif',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            (581) 824-1591
          </span>
          <AltArrowDownLinear size={11} color="var(--neutral-300)" style={{ flexShrink: 0 }} />
        </div>
        {/* Default Line chip */}
        <span style={{
          fontSize: 11, fontWeight: 500,
          color: 'var(--primary-300)',
          background: 'var(--primary-100)',
          border: '0.5px solid var(--primary-200)',
          borderRadius: 4, padding: '2px 6px',
          flexShrink: 0, fontFamily: 'Inter, sans-serif',
        }}>
          Default Line
        </span>
      </div>

      {/* Number input row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        height: 34,
        border: '0.5px solid var(--neutral-150)',
        borderRadius: 6, overflow: 'hidden',
        background: 'var(--neutral-0)',
        boxSizing: 'border-box',
      }}>
        {/* Country selector */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 3,
          padding: '0 8px', height: '100%',
          borderRight: '0.5px solid var(--neutral-150)',
          cursor: 'pointer', flexShrink: 0,
        }}>
          <span style={{ fontSize: 14 }}>🇺🇸</span>
          <span style={{ fontSize: 12, color: 'var(--neutral-400)', fontFamily: 'Inter, sans-serif' }}>+1</span>
          <AltArrowDownLinear size={10} color="var(--neutral-300)" />
        </div>
        {/* Input */}
        <input
          placeholder="Enter Number Here"
          style={{
            flex: 1, border: 'none', outline: 'none',
            fontSize: 13, color: 'var(--neutral-400)',
            fontFamily: 'Inter, sans-serif',
            background: 'transparent', padding: 0,
          }}
        />
        {/* Numpad icon */}
        <div style={{
          padding: '0 10px', height: '100%',
          display: 'flex', alignItems: 'center',
          borderLeft: '0.5px solid var(--neutral-150)',
          cursor: 'pointer', flexShrink: 0,
        }}>
          <NumpadIcon size={14} color="var(--neutral-300)" />
        </div>
      </div>
    </div>
  );
}

/* ─── ConvList ───────────────────────────────────────────────────────────── */
export default function ConvList({ activeId, onSelect, channelFilter }) {
  const [activeTab, setActiveTab] = useState('All');

  // Derive the visible list from the CommsMenu channel selection
  const allowedChannels = CHANNEL_FILTER_MAP[channelFilter] ?? null;
  const visible = allowedChannels
    ? CONVERSATIONS.filter(c => allowedChannels.includes(c.channel))
    : CONVERSATIONS;

  // When filter changes, if the active conv is no longer visible auto-select the first one
  useEffect(() => {
    if (visible.length > 0 && !visible.find(c => c.id === activeId)) {
      onSelect(visible[0].id);
    }
  }, [channelFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{
      width: 350, flexShrink: 0,
      height: '100%',
      background: 'var(--neutral-0)',
      borderRight: '0.5px solid var(--neutral-150)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      <ConvHeader />
      <ConvTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="thin-scroll" style={{ flex: 1, overflowY: 'auto' }}>
        {visible.length > 0
          ? visible.map(conv => (
              <ConvRow
                key={conv.id}
                conv={conv}
                isActive={activeId === conv.id}
                onClick={onSelect}
              />
            ))
          : (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: 160, gap: 6,
            }}>
              <span style={{ fontSize: 13, color: 'var(--neutral-300)', fontFamily: 'Inter, sans-serif' }}>
                No conversations
              </span>
            </div>
          )
        }
      </div>

      {/* Dial a Number — only visible when the Calls channel is selected */}
      {channelFilter === 'calls' && <DialANumber />}
    </div>
  );
}
