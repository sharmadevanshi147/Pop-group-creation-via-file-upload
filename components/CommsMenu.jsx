import React, { useState } from 'react';
import {
  // Inbox icons
  UserRoundedLinear,
  HashtagCircleLinear,
  UsersGroupTwoRoundedLinear,
  UserMinusLinear,
  PhoneCallingLinear,
  StarLinear,
  ArchiveLinear,
  // Channel icons
  CallChatLinear,
  ChatRoundLinear,
  ChatLineLinear,
  PhoneLinear,
  LetterLinear,
  PrinterLinear,
  UserSpeakLinear,
  // Header icons
  BoltLinear,
  TuningLinear,
  // Create New
  AddCircleLinear,
} from 'solar-icon-set';

/* ─── Data ───────────────────────────────────────────────────────────────── */
const INBOX_ITEMS = [
  { id: 'assigned',   label: 'Assigned to me',    badge: 8,    Icon: UserRoundedLinear         },
  { id: 'mentions',   label: 'Mentions',           badge: null, Icon: HashtagCircleLinear       },
  { id: 'others',     label: 'Assigned to Others', badge: null, Icon: UsersGroupTwoRoundedLinear},
  { id: 'unassigned', label: 'Unassigned',         badge: null, Icon: UserMinusLinear           },
  { id: 'missed',     label: 'Missed Calls',       badge: null, Icon: PhoneCallingLinear        },
  { id: 'starred',    label: 'Starred',            badge: null, Icon: StarLinear                },
  { id: 'archived',   label: 'Archived',           badge: null, Icon: ArchiveLinear             },
];

const CHANNEL_ITEMS = [
  { id: 'all',      label: 'All Conversations', badge: 8,    Icon: CallChatLinear             },
  { id: 'chat',     label: 'Chat',              badge: 5,    Icon: ChatRoundLinear            },
  { id: 'sms',      label: 'SMS',               badge: 3,    Icon: ChatLineLinear             },
  { id: 'calls',    label: 'Calls',             badge: 2,    Icon: PhoneLinear                },
  { id: 'email',    label: 'Email',             badge: 1,    Icon: LetterLinear               },
  { id: 'efax',     label: 'E-fax',             badge: null, Icon: PrinterLinear              },
  { id: 'internal', label: 'Internal Chat',     badge: null, Icon: UserSpeakLinear            },
];

/* ─── Badge ──────────────────────────────────────────────────────────────── */
function Badge({ count }) {
  return (
    <span style={{
      minWidth: 20, height: 20,
      background: 'var(--secondary-300)',
      color: '#fff',
      fontSize: 11, fontWeight: 700,
      borderRadius: 4,
      padding: '0 4px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      lineHeight: 1,
    }}>
      {count}
    </span>
  );
}

/* ─── MenuItem ───────────────────────────────────────────────────────────── */
function MenuItem({ item, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isActive = active === item.id;

  return (
    <div
      onClick={() => onClick(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 44,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: isActive ? 5 : 8,
        paddingRight: 8,
        gap: 4,
        cursor: 'pointer',
        background: isActive
          ? 'var(--primary-100)'
          : hovered ? 'var(--neutral-50)' : 'transparent',
        borderLeft: isActive
          ? '3px solid var(--primary-300)'
          : '3px solid transparent',
        transition: 'background 0.1s, border-color 0.1s',
        boxSizing: 'border-box',
      }}
    >
      {/* Icon */}
      <item.Icon
        size={16}
        color={isActive ? 'var(--primary-300)' : 'var(--neutral-300)'}
      />

      {/* Label */}
      <span style={{
        flex: 1,
        fontSize: 14,
        fontWeight: isActive ? 500 : 400,
        color: isActive ? 'var(--primary-300)' : 'var(--neutral-400)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        lineHeight: '20px',
      }}>
        {item.label}
      </span>

      {/* Badge */}
      {item.badge != null && <Badge count={item.badge} />}
    </div>
  );
}

/* ─── Section Header ─────────────────────────────────────────────────────── */
function SectionHeader({ label, showIcons }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '4px 8px 4px 12px',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <span style={{
        flex: 1,
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--neutral-500)',
        lineHeight: '20px',
        userSelect: 'none',
      }}>
        {label}
      </span>
      {showIcons && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <BoltLinear size={14} color="var(--neutral-300)" />
          <div style={{ width: 1, height: 12, background: 'var(--neutral-150)' }} />
          <TuningLinear size={14} color="var(--neutral-300)" />
        </div>
      )}
    </div>
  );
}

/* ─── Divider ────────────────────────────────────────────────────────────── */
function Divider() {
  return <div style={{ width: '100%', height: '0.5px', background: 'var(--neutral-100)', flexShrink: 0 }} />;
}

/* ─── CommsMenu ──────────────────────────────────────────────────────────── */
export default function CommsMenu({ activeItem, onSelect }) {
  const active = activeItem || 'assigned';

  return (
    <aside style={{
      width: 200,
      flexShrink: 0,
      height: '100%',
      background: 'var(--neutral-0)',
      borderRight: '0.5px solid var(--neutral-150)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>

      {/* ── Create New button ── */}
      <div style={{
        padding: '8px 8px 14px 8px',
        flexShrink: 0,
      }}>
        <button
          style={{
            width: '100%',
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            background: 'var(--primary-300)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.15s',
            fontFamily: 'Inter, sans-serif',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-400)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--primary-300)'}
        >
          <AddCircleLinear size={16} color="#fff" />
          Create New
        </button>
      </div>

      <Divider />

      {/* ── Scrollable menu body ── */}
      <div
        className="thin-scroll"
        style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
      >
        {/* Inbox section */}
        <div style={{ paddingTop: 8, display: 'flex', flexDirection: 'column' }}>
          <SectionHeader label="Inbox" showIcons />
          {INBOX_ITEMS.map(item => (
            <MenuItem key={item.id} item={item} active={active} onClick={onSelect} />
          ))}
        </div>

        {/* Channels section */}
        <div style={{ paddingTop: 8, display: 'flex', flexDirection: 'column' }}>
          <SectionHeader label="Channels" showIcons={false} />
          {CHANNEL_ITEMS.map(item => (
            <MenuItem key={item.id} item={item} active={active} onClick={onSelect} />
          ))}
        </div>
      </div>

    </aside>
  );
}
