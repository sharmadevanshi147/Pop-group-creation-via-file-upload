import React, { useState } from 'react';
import {
  UserCheckRoundedLinear,
  BookmarkLinear,
  PhoneLinear,
  MagniferLinear,
  MenuDotsLinear,
  AltArrowRightLinear,
  PaperclipLinear,
  UserPlusLinear,
  NotebookLinear,
  CalendarMinimalisticLinear,
  SmileCircleLinear,
  SendSquareLinear,
  ClockCircleLinear,
  LetterLinear,
  ChatLineLinear,
  PrinterLinear,
  CallDroppedLinear,
  IncomingCallLinear,
  CallCancelLinear,
  PhoneCallingLinear,
  DownloadMinimalisticLinear,
  DocumentLinear,
  ReplyLinear,
  CheckCircleLinear,
  PlayCircleLinear,
  DocumentTextLinear,
  AltArrowDownLinear,
} from 'solar-icon-set';
import ChatBubble from './ChatBubble.jsx';
import { Avatar } from './shared.jsx';

/* ─── Channel config for header avatars (non-person channels) ────────────── */
const CHANNEL_HEADER_CONFIG = {
  efax:          { Icon: PrinterLinear,      bg: 'var(--primary-100)',  color: 'var(--primary-300)'  },
  call_missed:   { Icon: CallDroppedLinear,  bg: '#FEE2E2',             color: '#EF4444'             },
  call_incoming: { Icon: IncomingCallLinear, bg: '#DCFCE7',             color: '#16A34A'             },
  call_declined: { Icon: CallCancelLinear,   bg: '#FEE2E2',             color: '#EF4444'             },
};

/* ─── Chat thread data ───────────────────────────────────────────────────── */
const CHAT_THREADS = {
  1: [
    { side: 'left',     type: 'default',     sender: 'Juanita Douglas Jr.', showAvatar: true,  showName: true,  showTime: false, text: "Hi Dr. Johnson. I've been okay, but I've noticed some occasional headaches on the right side." },
    { side: 'right',    type: 'default',     sender: 'Nurse Rachel',         showAvatar: false, showName: false, showTime: true,  time: '9:24 PM', status: 'delivered', text: 'Hi @Dr. JeDee Potter please review this — Juanita, can you describe the duration?' },
    { side: 'left',     type: 'default',     sender: 'Juanita Douglas Jr.', showAvatar: false, showName: false, showTime: false, text: "They usually last a few hours and happen about every 6 hrs." },
    { side: 'left',     type: 'default',     sender: 'Juanita Douglas Jr.', showAvatar: false, showName: false, showTime: true,  time: 'Today, 9:26 PM', text: "Currently I feel better but it happens every 6 hrs" },
    { side: 'left',     type: 'missed-call', sender: 'Juanita Douglas Jr.', missedCallText: 'from Juanita Douglas Jr.', time: '9:28 PM', showTime: true },
    { side: 'left',     type: 'call',        sender: 'Juanita Douglas Jr.', showAvatar: true,  showName: true,  showTime: true,  time: 'Today, 9:40 PM', callDuration: '12 min', status: 'delivered' },
    { side: 'internal', type: 'default',     sender: 'Dr. Hernandez Leo',   showTime: true,  time: 'Today, 9:50 PM', status: 'read', text: "Hello team, I've looked at Sarah's history. Recommend neurology consult. @Dr. Lee let's coordinate on this." },
    { side: 'right',    type: 'default',     sender: 'Nurse Rachel',         showAvatar: false, showName: false, showTime: true,  time: '9:55 PM', status: 'read', starred: true, text: 'Thanks so much for your help today!' },
  ],
  3: [
    { side: 'left',  type: 'default', sender: 'Maria Garcia',  showAvatar: true,  showName: true,  showTime: false, text: "Hi, this is Maria. I need to reschedule my Thursday appointment if possible." },
    { side: 'right', type: 'default', sender: 'Nurse Rachel',  showAvatar: false, showName: false, showTime: true,  time: '2:05 PM', status: 'read',      text: 'Hi Maria! Of course. Are mornings or afternoons better for you?' },
    { side: 'left',  type: 'default', sender: 'Maria Garcia',  showAvatar: false, showName: false, showTime: false, text: 'Afternoons please, anytime after 2 PM.' },
    { side: 'right', type: 'default', sender: 'Nurse Rachel',  showAvatar: false, showName: false, showTime: true,  time: '2:08 PM', status: 'read',      text: 'Perfect! I have an opening Friday at 3 PM. Does that work?' },
    { side: 'left',  type: 'default', sender: 'Maria Garcia',  showAvatar: false, showName: false, showTime: false, text: 'That works great, thank you so much!' },
    { side: 'right', type: 'default', sender: 'Nurse Rachel',  showAvatar: false, showName: false, showTime: true,  time: '2:10 PM', status: 'delivered', text: "You're all set for Friday at 3 PM. We'll send a reminder 24 hrs before." },
    { side: 'left',  type: 'default', sender: 'Maria Garcia',  showAvatar: false, showName: false, showTime: true,  time: '10:40 PM', text: 'Can you call me when you are free?' },
  ],
  6: [
    { side: 'internal', type: 'default', sender: 'Dr. Hernandez Leo',   showTime: true,  time: 'Today, 8:30 AM', status: 'read', text: "Good morning team. I've reviewed Sarah's latest labs — the headache pattern looks clinically concerning." },
    { side: 'internal', type: 'default', sender: 'Nurse Rebecca Adams', showTime: false, status: 'read', text: "Agree. Her vitals were stable this morning but reported pain scale of 6/10. Should we escalate?" },
    { side: 'internal', type: 'default', sender: 'Dr. Hernandez Leo',   showTime: false, status: 'read', text: "Yes. Recommend scheduling a neurology consult ASAP. @Dr. Lee can you coordinate?" },
    { side: 'internal', type: 'default', sender: 'Dr. Lee',             showTime: true,  time: 'Today, 9:00 AM', status: 'read', text: "On it — neurology has a slot next Tuesday at 10 AM. I'll send the referral now." },
    { side: 'internal', type: 'default', sender: 'Dr. Hernandez Leo',   showTime: true,  time: 'Today, 9:28 PM', status: 'read', text: "Great! Patient has been notified. Let's follow up after Tuesday's consult and update the care plan." },
  ],
  8: [
    { side: 'left',  type: 'default', sender: 'Kristen Fay',  showAvatar: true,  showName: true,  showTime: false, text: "Hello, I had some questions about my upcoming appointment." },
    { side: 'right', type: 'default', sender: 'Nurse Rachel', showAvatar: false, showName: false, showTime: true,  time: '7:12 PM', status: 'read',      text: "Hi Kristen! Of course, what would you like to know?" },
    { side: 'left',  type: 'default', sender: 'Kristen Fay',  showAvatar: false, showName: false, showTime: true,  time: '7:45 PM', text: "When will my next appointment be scheduled?" },
  ],
  11: [
    { side: 'internal', type: 'default', sender: 'Nurse Rebecca Adams', showTime: true,  time: 'Today, 4:15 PM', status: 'read', text: "Quick heads up — patient in room 3 is ready for pre-op prep. All consent forms signed." },
    { side: 'internal', type: 'default', sender: 'Dr. Hernandez Leo',   showTime: false, status: 'read', text: "Thanks Rebecca. Has anesthesia been notified?" },
    { side: 'internal', type: 'default', sender: 'Nurse Rebecca Adams', showTime: true,  time: 'Today, 5:00 PM', status: 'read', text: 'Patient prep ready for tomorrow morning. Anesthesia confirmed. See the attached pre-op notes.' },
  ],
  12: [
    { side: 'left',  type: 'default', sender: 'Frank Morrison', showAvatar: true,  showName: true,  showTime: false, text: "Hey, can you check on my prescription refill? I submitted it last week." },
    { side: 'right', type: 'default', sender: 'Nurse Rachel',   showAvatar: false, showName: false, showTime: true,  time: '4:00 PM', status: 'read',      text: "Hi Frank! Let me check that for you right now." },
    { side: 'right', type: 'default', sender: 'Nurse Rachel',   showAvatar: false, showName: false, showTime: true,  time: '4:02 PM', status: 'read',      text: "The refill was submitted to your pharmacy yesterday afternoon." },
    { side: 'left',  type: 'default', sender: 'Frank Morrison', showAvatar: false, showName: false, showTime: true,  time: '4:30 PM', text: "Prescription refill — still pending?" },
  ],
  14: [
    { side: 'left',  type: 'default', sender: 'Rufus Douglas',  showAvatar: true,  showName: true,  showTime: false, text: "Good afternoon, I wanted to follow up on my recent visit last week." },
    { side: 'right', type: 'default', sender: 'Nurse Rachel',   showAvatar: false, showName: false, showTime: true,  time: '2:20 PM', status: 'read',      text: "Hi Rufus! Great to hear from you. How are you feeling?" },
    { side: 'left',  type: 'default', sender: 'Rufus Douglas',  showAvatar: false, showName: false, showTime: true,  time: '2:22 PM', text: "Feeling much better, thank you Doctor!" },
  ],
  15: [
    { side: 'left',  type: 'default', sender: 'Freda Collins', showAvatar: true,  showName: true,  showTime: false, text: "Hi, I'm reaching out to confirm my appointment for Thursday." },
    { side: 'right', type: 'default', sender: 'Nurse Rachel',  showAvatar: false, showName: false, showTime: true,  time: '11:30 AM', status: 'read',      text: "Hi Freda! Yes, confirmed for Thursday at 10:00 AM. Please arrive 10 min early." },
    { side: 'left',  type: 'default', sender: 'Freda Collins', showAvatar: false, showName: false, showTime: true,  time: '12:00 PM', text: "See you at Thursday's appointment!" },
  ],
};

/* ─── Email thread data ──────────────────────────────────────────────────── */
const EMAIL_DATA = {
  2: {
    subject: 'Reset Password',
    dateDivider: 'Today',
    thread: [
      {
        sender: 'Elbert Boehm', initials: 'EB', scheme: 'patient',
        datetime: '7/22/2024 • 08:26 AM', isReply: false,
        body: "Hi, I am unable to log into my patient portal. I have tried resetting my password three times but keep receiving an error message: 'Invalid token — please try again.' Could you please manually reset my password or send me a new reset link?",
      },
      {
        sender: 'Nurse Rachel', initials: 'NR', scheme: 'provider',
        datetime: '7/22/2024 • 09:05 AM', isReply: true,
        body: "Hi Elbert, I have sent a new password reset link to your registered email address. Please check your inbox and spam folder. The link expires in 24 hours. Let me know if you need further help.",
      },
      {
        sender: 'Automation', initials: 'AU', scheme: 'bot',
        datetime: '7/22/2024 • 09:06 AM', isReply: true,
        body: "Password reset email sent to e.boehm@email.com. Ticket #4821 created. Auto-closing in 48 hours if no reply.",
      },
    ],
  },
  9: {
    subject: 'Lab Results — Q3 Follow-up',
    dateDivider: 'Today',
    thread: [
      {
        sender: 'David Chen', initials: 'DC', scheme: 'patient',
        datetime: '7/22/2024 • 06:30 PM', isReply: false,
        body: "Dear Dr. Johnson, I received my Q3 lab results and noticed my HbA1c came back at 7.2% — slightly above the target we discussed. I've been following the dietary plan. Should we schedule a follow-up to review and discuss any medication adjustments?",
      },
      {
        sender: 'Nurse Rachel', initials: 'NR', scheme: 'provider',
        datetime: '7/22/2024 • 07:00 PM', isReply: true,
        body: "Hi David, Dr. Johnson has been notified and will review your results. We'll be in touch shortly to schedule a follow-up appointment. Thank you for staying on top of your health.",
      },
    ],
  },
};

/* ─── Efax data ──────────────────────────────────────────────────────────── */
const EFAX_DATA = {
  5: {
    from: "Dr. Smith's Office", faxNumber: '+1 (555) 847-2210',
    pages: 3, date: 'Today, 9:15 PM', urgency: 'Routine',
    subject: 'Referral: Cardiology Consult',
    content: [
      "PATIENT REFERRAL — CARDIOLOGY CONSULTATION",
      "Patient: Marcus Allen, DOB: 03/22/1965",
      "Referring Physician: Dr. Thomas Smith, MD",
      "Reason for Referral: Patient presents with atypical chest pain and exertional dyspnea over the past 6 weeks. Echo shows mild LV dysfunction (EF ~45%). Requesting cardiology evaluation and management.",
      "Recent Workup: EKG (attached), Echocardiogram report (attached), CBC & BMP within normal limits.",
    ],
  },
  13: {
    from: 'Valley Lab Network', faxNumber: '+1 (555) 320-7741',
    pages: 5, date: 'Today, 3:00 PM', urgency: 'URGENT',
    subject: 'Blood Panel Results',
    content: [
      "CRITICAL LAB RESULTS — IMMEDIATE ATTENTION REQUIRED",
      "Patient: Sarah J. Thompson, DOB: 07/11/1958",
      "Ordering Physician: Dr. R. Johnson",
      "CRITICAL VALUES FLAGGED:",
      "• Potassium (K+): 6.2 mEq/L [CRITICAL HIGH — Normal: 3.5–5.0]",
      "• Creatinine: 4.1 mg/dL [CRITICAL HIGH — Normal: 0.6–1.2]",
      "• GFR: 14 mL/min/1.73m² [Severe — Stage 5 CKD range]",
      "Please contact patient immediately and consider urgent nephrology referral.",
    ],
  },
};

/* ─── Call thread data ───────────────────────────────────────────────────── */
// type: 'missed' | 'declined' | 'incoming' | 'outgoing'
// dateDivider: show a date strip before this entry
// showEvents:  show "View Call Events ∨"
const CALL_THREADS = {
  4: [
    { type: 'missed',   label: 'Missed Call', datetime: '10:15 PM', dateDivider: 'Today' },
    { type: 'missed',   label: 'Missed Call', datetime: '10:26 PM' },
  ],
  7: [
    { type: 'outgoing', label: 'Outgoing Call(Conference)', duration: '2m 31s',  datetime: '07/02/2024 • 9:19 PM', dateDivider: '07/02/2024', showEvents: true },
    { type: 'incoming', label: 'Incoming Call(Conference)', duration: '30m 31s', datetime: '07/02/2024 • 9:19 PM', showEvents: true },
    { type: 'missed',   label: 'Missed Conference Call',                         datetime: '9:28 PM',               dateDivider: 'Today'       },
    { type: 'outgoing', label: 'Outgoing Call',             duration: '3m 19s',  datetime: '9:28 PM'               },
    { type: 'incoming', label: 'Incoming Call',             duration: '8m',      datetime: '8:30 PM'               },
  ],
  10: [
    { type: 'missed',   label: 'Missed Call',   datetime: '5:42 PM', dateDivider: 'Today' },
    { type: 'declined', label: 'Call Declined', datetime: '5:55 PM' },
  ],
};

/* ─── Call card: direction-arrow SVGs ────────────────────────────────────── */
function OutgoingArrowIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IncomingArrowIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M11 3L3 11M3 11H8.5M3 11V5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Call card: audio-waveform icon (missed) ────────────────────────────── */
function AudioWaveIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect x="1"   y="6"  width="2" height="4"  rx="1" fill={color} opacity="0.5" />
      <rect x="4.5" y="4"  width="2" height="8"  rx="1" fill={color} opacity="0.7" />
      <rect x="8"   y="2"  width="2" height="12" rx="1" fill={color} />
      <rect x="11.5" y="4" width="2" height="8"  rx="1" fill={color} opacity="0.7" />
    </svg>
  );
}

/* ─── CallEventCard ──────────────────────────────────────────────────────── */
function CallEventCard({ event }) {
  const [eventsOpen, setEventsOpen] = useState(false);

  const CONFIGS = {
    missed:   { bg: '#FFF1F2', border: '#FECDD3', arrowColor: '#EF4444', Arrow: IncomingArrowIcon },
    declined: { bg: '#FFF1F2', border: '#FECDD3', arrowColor: '#EF4444', Arrow: IncomingArrowIcon },
    incoming: { bg: '#F0FDF4', border: '#BBF7D0', arrowColor: '#16A34A', Arrow: IncomingArrowIcon },
    outgoing: { bg: 'var(--neutral-75)', border: 'var(--neutral-150)', arrowColor: 'var(--neutral-400)', Arrow: OutgoingArrowIcon },
  };
  const cfg = CONFIGS[event.type] || CONFIGS.outgoing;
  const isMissed = event.type === 'missed' || event.type === 'declined';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        padding: '10px 14px',
        background: cfg.bg,
        border: `0.5px solid ${cfg.border}`,
        borderRadius: 8, gap: 8,
        minWidth: 200, maxWidth: 460,
        boxSizing: 'border-box',
      }}>
        {/* Direction arrow */}
        <div style={{ paddingTop: 2 }}>
          <cfg.Arrow size={14} color={cfg.arrowColor} />
        </div>

        {/* Label + "View Call Events" */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{
            fontSize: 13, fontWeight: 500,
            color: 'var(--neutral-400)', fontFamily: 'Inter, sans-serif',
            whiteSpace: 'nowrap',
          }}>
            {event.label}{event.duration ? ` • ${event.duration}` : ''}
          </span>
          {event.showEvents && (
            <div
              onClick={() => setEventsOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 3,
                marginTop: 3, cursor: 'pointer',
                fontSize: 12, color: 'var(--neutral-300)', fontFamily: 'Inter, sans-serif',
              }}
            >
              View Call Events
              <AltArrowDownLinear
                size={11}
                color="var(--neutral-300)"
                style={{ transform: eventsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
              />
            </div>
          )}
        </div>

        {/* Action icons */}
        {isMissed ? (
          <AudioWaveIcon size={16} color={cfg.arrowColor} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, paddingTop: 1 }}>
            <PlayCircleLinear    size={16} color="var(--neutral-300)" style={{ cursor: 'pointer' }} />
            <DocumentTextLinear  size={16} color="var(--neutral-300)" style={{ cursor: 'pointer' }} />
            <AltArrowRightLinear size={16} color="var(--neutral-300)" style={{ cursor: 'pointer' }} />
          </div>
        )}
      </div>

      {/* Timestamp */}
      <span style={{
        fontSize: 11, color: 'var(--neutral-300)',
        fontFamily: 'Inter, sans-serif', lineHeight: '14px',
      }}>
        {event.datetime}
      </span>
    </div>
  );
}

/* ─── CallThread ─────────────────────────────────────────────────────────── */
function CallThread({ convId }) {
  const events = CALL_THREADS[convId] || [];
  return (
    <div className="thin-scroll" style={{
      flex: 1, overflowY: 'auto',
      padding: '8px 16px 16px',
      display: 'flex', flexDirection: 'column', gap: 12,
      background: 'var(--neutral-0)',
    }}>
      {events.map((event, i) => (
        <React.Fragment key={i}>
          {event.dateDivider && <EmailDateDivider label={event.dateDivider} />}
          <CallEventCard event={event} />
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─── ChatThread ─────────────────────────────────────────────────────────── */
function ChatThread({ convId }) {
  const messages = CHAT_THREADS[convId] || [];
  return (
    <div className="thin-scroll" style={{
      flex: 1, overflowY: 'auto',
      padding: '16px',
      display: 'flex', flexDirection: 'column', gap: 16,
      background: 'var(--neutral-0)',
    }}>
      {messages.map((msg, i) => <ChatBubble key={i} {...msg} />)}
    </div>
  );
}

/* ─── Email: avatar (patient / provider / bot) ───────────────────────────── */
function EmailAvatar({ initials, scheme }) {
  if (scheme === 'bot') {
    return (
      <div style={{
        width: 32, height: 32, borderRadius: 4, flexShrink: 0,
        background: 'var(--neutral-75)',
        border: '0.5px solid var(--neutral-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxSizing: 'border-box',
      }}>
        <SmileCircleLinear size={16} color="var(--neutral-300)" />
      </div>
    );
  }
  return (
    <Avatar
      init={initials}
      size={32}
      scheme={scheme === 'provider' ? 'provider' : 'patient'}
    />
  );
}

/* ─── Email: date divider ────────────────────────────────────────────────── */
function EmailDateDivider({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 16px',
    }}>
      <div style={{ flex: 1, height: '0.5px', background: 'var(--neutral-100)' }} />
      <span style={{
        fontSize: 12, color: 'var(--neutral-300)',
        fontFamily: 'Inter, sans-serif', flexShrink: 0,
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '0.5px', background: 'var(--neutral-100)' }} />
    </div>
  );
}

/* ─── Email: single message row ──────────────────────────────────────────── */
function EmailMessageRow({ msg }) {
  return (
    <div style={{
      padding: '12px 16px',
      borderBottom: '0.5px solid var(--neutral-100)',
      background: 'var(--neutral-0)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <EmailAvatar initials={msg.initials} scheme={msg.scheme} />

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Name + reply indicator + datetime */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
            <span style={{
              fontSize: 13, fontWeight: 500,
              color: 'var(--neutral-400)', fontFamily: 'Inter, sans-serif',
            }}>
              {msg.sender}
            </span>
            {msg.isReply && (
              <AltArrowRightLinear size={12} color="var(--neutral-300)" />
            )}
            <span style={{
              fontSize: 11, color: 'var(--neutral-300)',
              fontFamily: 'Inter, sans-serif', marginLeft: 2,
            }}>
              {msg.datetime}
            </span>
          </div>
          {/* Body */}
          <p style={{
            margin: 0, fontSize: 13, lineHeight: '20px',
            color: 'var(--neutral-400)', fontFamily: 'Inter, sans-serif',
          }}>
            {msg.body}
          </p>
        </div>

        {/* ··· menu */}
        <div style={{ cursor: 'pointer', flexShrink: 0, paddingTop: 2 }}>
          <MenuDotsLinear size={16} color="var(--neutral-200)" />
        </div>
      </div>
    </div>
  );
}

/* ─── Email thread view ──────────────────────────────────────────────────── */
function EmailThread({ convId }) {
  const data = EMAIL_DATA[convId];
  if (!data) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 13, color: 'var(--neutral-300)', fontFamily: 'Inter, sans-serif' }}>
        No messages
      </span>
    </div>
  );

  return (
    <div className="thin-scroll" style={{ flex: 1, overflowY: 'auto', background: 'var(--neutral-0)' }}>
      <EmailDateDivider label={data.dateDivider} />
      {data.thread.map((msg, i) => (
        <EmailMessageRow key={i} msg={msg} />
      ))}
    </div>
  );
}

/* ─── Email subject strip (shown above header) ───────────────────────────── */
function EmailSubjectStrip({ convId }) {
  const data = EMAIL_DATA[convId];
  return (
    <div style={{
      flexShrink: 0,
      padding: '9px 16px',
      borderBottom: '0.5px solid var(--neutral-150)',
      background: 'var(--neutral-0)',
      boxSizing: 'border-box',
    }}>
      <span style={{
        fontSize: 14, fontWeight: 500,
        color: 'var(--neutral-400)', fontFamily: 'Inter, sans-serif',
      }}>
        Subject : {data?.subject ?? ''}
      </span>
    </div>
  );
}

/* ─── Email action bar (Reply / Reply All / Forward / Internal note) ──────── */
function EmailActionBar() {
  const ACTIONS = [
    { label: 'Reply',         Icon: ReplyLinear,      primary: true  },
    { label: 'Reply All',     Icon: ReplyLinear,      primary: false },
    { label: 'Forward',       Icon: AltArrowRightLinear, primary: false },
    { label: 'Internal note', Icon: NotebookLinear,   primary: false },
  ];
  return (
    <div style={{
      flexShrink: 0,
      padding: '10px 16px',
      borderTop: '0.5px solid var(--neutral-150)',
      display: 'flex', alignItems: 'center', gap: 8,
      background: 'var(--neutral-0)',
      boxSizing: 'border-box',
    }}>
      {ACTIONS.map(({ label, Icon, primary }) => (
        <button
          key={label}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 6,
            background: primary ? 'var(--primary-300)' : 'var(--neutral-0)',
            border: primary ? 'none' : '0.5px solid var(--neutral-150)',
            fontSize: 13, fontWeight: primary ? 500 : 400,
            color: primary ? '#fff' : 'var(--neutral-400)',
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { if (primary) e.currentTarget.style.background = 'var(--primary-400)'; }}
          onMouseLeave={e => { if (primary) e.currentTarget.style.background = 'var(--primary-300)'; }}
        >
          <Icon size={14} color={primary ? '#fff' : 'var(--neutral-300)'} />
          {label}
        </button>
      ))}
    </div>
  );
}

/* ─── EfaxView ───────────────────────────────────────────────────────────── */
function EfaxView({ convId }) {
  const data = EFAX_DATA[convId];
  if (!data) return null;
  const isUrgent = data.urgency === 'URGENT';

  return (
    <div className="thin-scroll" style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', background: 'var(--neutral-0)' }}>
      <div style={{
        border: `0.5px solid ${isUrgent ? '#FCA5A5' : 'var(--neutral-150)'}`,
        borderRadius: 8,
        background: isUrgent ? '#FFF5F5' : 'var(--neutral-0)',
        padding: '14px 16px', marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 8, flexShrink: 0,
          background: 'var(--primary-100)',
          border: '0.5px solid var(--primary-200)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <PrinterLinear size={20} color="var(--primary-300)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--neutral-400)', fontFamily: 'Inter, sans-serif' }}>
              {data.subject}
            </span>
            <span style={{
              fontSize: 11, fontWeight: 600,
              color: isUrgent ? '#EF4444' : 'var(--neutral-300)',
              background: isUrgent ? '#FEE2E2' : 'var(--neutral-75)',
              borderRadius: 4, padding: '2px 6px',
            }}>
              {data.urgency}
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--neutral-300)', fontFamily: 'Inter, sans-serif', display: 'flex', gap: 16 }}>
            <span>From: {data.from}</span>
            <span>{data.faxNumber}</span>
            <span>{data.pages} pages</span>
            <span>{data.date}</span>
          </div>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 6,
          border: '0.5px solid var(--neutral-150)',
          background: 'var(--neutral-0)',
          fontSize: 13, color: 'var(--neutral-400)',
          cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        }}>
          <DownloadMinimalisticLinear size={14} color="var(--neutral-300)" />
          Download
        </button>
      </div>

      <div style={{ border: '0.5px solid var(--neutral-150)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{
          padding: '10px 16px', background: 'var(--neutral-75)',
          borderBottom: '0.5px solid var(--neutral-150)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <DocumentLinear size={16} color="var(--neutral-300)" />
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--neutral-400)', fontFamily: 'Inter, sans-serif' }}>
            {data.subject}.pdf
          </span>
          <span style={{ fontSize: 12, color: 'var(--neutral-300)', fontFamily: 'Inter, sans-serif' }}>
            — {data.pages} pages
          </span>
        </div>
        <div style={{ padding: '20px 24px' }}>
          {data.content.map((line, i) => (
            <p key={i} style={{
              margin: '0 0 10px',
              fontSize: i === 0 ? 14 : 13, fontWeight: i === 0 ? 600 : 400,
              lineHeight: '20px',
              color: i === 0 ? 'var(--neutral-400)' : 'var(--neutral-300)',
              fontFamily: 'Inter, sans-serif',
            }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CallRecordView — now just renders the thread ───────────────────────── */
function CallRecordView({ conv }) {
  return <CallThread convId={conv.id} />;
}

/* ─── ChatHeader (dynamic per conv) ─────────────────────────────────────── */
function ChatHeader({ conv }) {
  if (!conv) return null;
  const initials = conv.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  function renderAvatar() {
    if (['chat', 'sms', 'email'].includes(conv.channel)) {
      return <Avatar init={initials} size={36} scheme="patient" />;
    }
    if (conv.channel === 'internal') {
      return <Avatar init={initials} size={36} scheme="provider" />;
    }
    const cfg = CHANNEL_HEADER_CONFIG[conv.channel];
    if (cfg) {
      return (
        <div style={{
          width: 36, height: 36, borderRadius: 4, flexShrink: 0,
          background: cfg.bg,
          border: '0.5px solid var(--primary-200)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box',
        }}>
          <cfg.Icon size={18} color={cfg.color} />
        </div>
      );
    }
    return <Avatar init={initials} size={36} scheme="patient" />;
  }

  function renderMeta() {
    switch (conv.channel) {
      case 'sms':           return <><span>SMS</span><Dot /><span>Patient</span></>;
      case 'email':         return <><span>Patient</span><Dot /><span style={{ color: 'var(--secondary-300)', fontWeight: 500 }}>M (he/him)</span><Dot /><span>53Y</span><Dot /><span>Dr. Robert Frost (PCP)</span></>;
      case 'efax':          return <><span>E-Fax</span><Dot /><span>{EFAX_DATA[conv.id]?.pages ?? 0} pages</span></>;
      case 'call_missed':   return <><span style={{ color: '#EF4444' }}>Missed Call</span></>;
      case 'call_incoming': return <><span style={{ color: '#16A34A' }}>Incoming Call</span></>;
      case 'call_declined': return <><span style={{ color: '#EF4444' }}>Call Declined</span></>;
      case 'internal':      return <><span style={{ color: 'var(--secondary-300)', fontWeight: 500 }}>Internal Chat</span><Dot /><span>Team only</span></>;
      default:              return (
        <>
          <span>Patient</span><Dot />
          <span style={{ color: 'var(--secondary-300)', fontWeight: 500 }}>M</span><Dot />
          <span>53Y</span><Dot />
          <span>Dr. Robert Frost (PCP)</span><Dot />
          <span style={{ color: 'var(--primary-300)', cursor: 'pointer' }}>5 members</span>
        </>
      );
    }
  }

  return (
    <div style={{
      height: 60, flexShrink: 0,
      display: 'flex', alignItems: 'center',
      padding: '0 16px',
      borderBottom: '0.5px solid var(--neutral-150)',
      background: 'var(--neutral-0)',
      boxSizing: 'border-box',
      gap: 10,
    }}>
      {renderAvatar()}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--neutral-400)', fontFamily: 'Inter, sans-serif' }}>
            {conv.name}
          </span>
          <AltArrowRightLinear size={14} color="var(--neutral-300)" />
        </div>
        <div style={{
          fontSize: 12, color: 'var(--neutral-300)',
          display: 'flex', alignItems: 'center', gap: 4,
          fontFamily: 'Inter, sans-serif',
        }}>
          {renderMeta()}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        {[UserCheckRoundedLinear, BookmarkLinear, PhoneLinear, MagniferLinear].map((Icon, i) => (
          <div key={i} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Icon size={18} color="var(--neutral-300)" />
          </div>
        ))}
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <MenuDotsLinear size={18} color="var(--neutral-300)" />
        </div>
      </div>
    </div>
  );
}

function Dot() {
  return <span style={{ color: 'var(--neutral-200)' }}>•</span>;
}

/* ─── Sticky Notes Banner ────────────────────────────────────────────────── */
function StickyNotesBanner() {
  return (
    <div style={{
      flexShrink: 0, height: 36,
      background: '#FFFBEB', borderBottom: '0.5px solid #FDE68A',
      display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 8, boxSizing: 'border-box',
    }}>
      <div style={{
        width: 14, height: 14, borderRadius: 3,
        border: '1.5px solid var(--neutral-200)', flexShrink: 0,
      }} />
      <span style={{ fontSize: 12, color: 'var(--neutral-300)', fontFamily: 'Inter, sans-serif' }}>
        You can add sticky notes here
      </span>
    </div>
  );
}

/* ─── Typing Indicator ───────────────────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, padding: '0 16px 8px' }}>
      <div style={{
        width: 60, height: 34,
        background: 'var(--primary-300)',
        borderRadius: '12px 0 12px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />
        ))}
      </div>
      <span style={{ fontSize: 11, color: 'var(--neutral-300)', fontFamily: 'Inter, sans-serif' }}>
        Nurse Rachel
      </span>
    </div>
  );
}

/* ─── Compose Area ───────────────────────────────────────────────────────── */
function ComposeArea({ channel }) {
  const [isInternal, setIsInternal] = useState(false);
  const [archiveOnSend, setArchiveOnSend] = useState(false);
  const isAlreadyInternal = channel === 'internal';

  const placeholder =
    isAlreadyInternal || isInternal ? 'Visible only to your team • Shift+Enter to change the line'
    : channel === 'sms'             ? 'Type an SMS message...'
    :                                  'Visible to everyone • Shift+Enter to change the line';

  return (
    <div style={{ flexShrink: 0, borderTop: '0.5px solid var(--neutral-150)', background: 'var(--neutral-0)', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '0.5px solid var(--neutral-100)', gap: 12 }}>
        {!isAlreadyInternal && (
          <div onClick={() => setIsInternal(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <div style={{ width: 28, height: 16, borderRadius: 8, position: 'relative', background: isInternal ? 'var(--secondary-300)' : 'var(--neutral-150)', transition: 'background 0.15s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', background: '#fff', top: 2, left: isInternal ? 14 : 2, transition: 'left 0.15s' }} />
            </div>
            <span style={{ fontSize: 12, color: 'var(--neutral-400)', userSelect: 'none', fontFamily: 'Inter, sans-serif' }}>Internal</span>
          </div>
        )}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {[PaperclipLinear, UserPlusLinear, NotebookLinear, CalendarMinimalisticLinear, SmileCircleLinear].map((Icon, i) => (
            <div key={i} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Icon size={16} color="var(--neutral-300)" />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', gap: 8, borderBottom: '0.5px solid var(--neutral-100)' }}>
        <input placeholder={placeholder} style={{ flex: 1, border: '0.5px solid var(--neutral-150)', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: 'var(--neutral-400)', fontFamily: 'Inter, sans-serif', outline: 'none', background: 'var(--neutral-0)', boxSizing: 'border-box' }} />
        <button style={{ width: 32, height: 32, background: 'var(--primary-300)', border: 'none', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <SendSquareLinear size={16} color="#fff" />
        </button>
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <ClockCircleLinear size={18} color="var(--primary-300)" />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '6px 16px' }}>
        <span style={{ flex: 1, fontSize: 11, color: 'var(--neutral-300)', fontFamily: 'Inter, sans-serif' }}>
          Press Enter to send •{' '}
          <span style={{ color: 'var(--primary-300)', cursor: 'pointer' }}>Change</span>
        </span>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', userSelect: 'none' }}>
          <input type="checkbox" checked={archiveOnSend} onChange={e => setArchiveOnSend(e.target.checked)} style={{ accentColor: 'var(--primary-300)', cursor: 'pointer' }} />
          <span style={{ fontSize: 12, color: 'var(--neutral-300)', fontFamily: 'Inter, sans-serif' }}>Archive on send</span>
        </label>
      </div>
    </div>
  );
}

/* ─── ChatView ───────────────────────────────────────────────────────────── */
export default function ChatView({ conv }) {
  if (!conv) return null;
  const { channel } = conv;

  const isMessaging = ['chat', 'sms', 'internal'].includes(channel);
  const isEmail     = channel === 'email';
  const isEfax      = channel === 'efax';
  const isCall      = ['call_missed', 'call_incoming', 'call_declined'].includes(channel);

  return (
    <div style={{
      flex: 1, minWidth: 0,
      height: '100%',
      background: 'var(--neutral-0)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Email puts subject line ABOVE the header */}
      {isEmail && <EmailSubjectStrip convId={conv.id} />}

      <ChatHeader conv={conv} />

      {/* Sticky notes: messaging + email + calls */}
      {(isMessaging || isEmail || isCall) && <StickyNotesBanner />}

      {/* ── Content ── */}
      {isMessaging && <ChatThread convId={conv.id} />}
      {isEmail     && <EmailThread convId={conv.id} />}
      {isEfax      && <EfaxView convId={conv.id} />}
      {isCall      && <CallRecordView conv={conv} />}

      {/* Typing indicator (chat/sms only, not internal or calls) */}
      {isMessaging && channel !== 'internal' && <TypingIndicator />}

      {/* ── Footer ── */}
      {(isMessaging || isCall) && <ComposeArea channel={channel} />}
      {isEmail                  && <EmailActionBar />}
    </div>
  );
}
