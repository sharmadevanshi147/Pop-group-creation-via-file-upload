import React from 'react';
import {
  CloseCircleLinear, PenNewSquareLinear, EyeLinear,
  CalendarMinimalisticLinear, ClockCircleLinear, UserCircleLinear,
  MapPointLinear, DocumentTextLinear, AltArrowDownLinear,
  SquareAltArrowRightLinear, CalendarLinear, LightningLinear,
  InfoCircleLinear, CallChatLinear, PhoneCallingLinear,
} from 'solar-icon-set';
import { OUTREACH1_ATTEMPTS, attemptOutcomeColor } from './constants.js';

/* ─── Appointment Panel ─────────────────────────────────────────────────── */
function AppointmentPanel({ onClose }) {
  return (
    <>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:'0.5px solid var(--neutral-100)', flexShrink:0 }}>
        <span style={{ fontSize:15, fontWeight:600, color:'var(--neutral-400)' }}>Appointment Details</span>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <button style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 12px', borderRadius:6, border:'0.5px solid var(--primary-200)', background:'var(--primary-50)', color:'var(--primary-300)', fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:'Inter, sans-serif' }}>
            <PenNewSquareLinear size={12} color="var(--primary-300)" />
            Edit
          </button>
          <div style={{ width:1, height:16, background:'var(--neutral-150)', flexShrink:0 }} />
          <div style={{ cursor:'pointer', width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, color:'var(--neutral-300)', fontWeight:300, lineHeight:1 }} onClick={onClose}>×</div>
        </div>
      </div>

      {/* Patient card */}
      <div style={{ margin:'16px 20px', padding:'12px 14px', background:'var(--neutral-50)', borderRadius:8, border:'0.5px solid var(--neutral-100)', display:'flex', alignItems:'flex-start', gap:12 }}>
        <div style={{ width:40, height:40, borderRadius:8, background:'var(--primary-100)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:13, fontWeight:600, color:'var(--primary-300)' }}>RW</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'var(--neutral-400)', display:'flex', alignItems:'center', gap:6 }}>
            Richard Willson <span style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'inline-block' }} />
          </div>
          <div style={{ fontSize:11, color:'var(--neutral-300)', marginBottom:8 }}>Patient • Male • 03-29-1992 (31Y)</div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <button style={{ display:'flex', alignItems:'center', gap:4, padding:'4px 10px', borderRadius:6, border:'0.5px solid var(--neutral-150)', background:'#fff', fontSize:11, color:'var(--neutral-400)', cursor:'pointer', fontFamily:'Inter, sans-serif', whiteSpace:'nowrap' }}>
              <EyeLinear size={11} color="var(--neutral-400)" />
              View Detailed Profile
            </button>
            <div style={{ width:24, height:24, borderRadius:6, border:'0.5px solid var(--neutral-150)', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}>
              <SquareAltArrowRightLinear size={12} color="var(--neutral-400)" />
            </div>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div style={{ flex:1, overflow:'auto', padding:'0 20px 20px' }}>
        {[
          { label:'Appointment Type', icon:<CalendarMinimalisticLinear size={14} color="var(--neutral-300)" />, value:'CCM First Visit (G0506)' },
          { label:'Date & Time',       icon:<ClockCircleLinear size={14} color="var(--neutral-300)" />, value:'Fri, Feb 09  ·  04:30 PM – 05:00 PM' },
          { label:'Primary Provider',  icon:<UserCircleLinear size={14} color="var(--neutral-300)" />, value:'Dr. Robert Frost' },
          { label:'Location',          icon:<MapPointLinear size={14} color="var(--neutral-300)" />, value:'Fold Health, New York' },
          { label:'Reason for Visit',  icon:<DocumentTextLinear size={14} color="var(--neutral-300)" />, value:'Post Discharge Appointment' },
        ].map(({ label, icon, value }) => (
          <div key={label} style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, color:'var(--neutral-300)', fontWeight:500, marginBottom:4 }}>{label}</div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>{icon}<span style={{ fontSize:13, color:'var(--neutral-400)' }}>{value}</span></div>
          </div>
        ))}

        {/* Status */}
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:11, color:'var(--neutral-300)', fontWeight:500, marginBottom:6 }}>Appointment Status</div>
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', borderRadius:6, border:'0.5px solid var(--neutral-150)', width:200 }}>
            <ClockCircleLinear size={14} color="var(--neutral-300)" />
            <span style={{ fontSize:13, color:'var(--neutral-400)', flex:1 }}>Scheduled</span>
            <AltArrowDownLinear size={12} color="var(--neutral-300)" />
          </div>
        </div>

        {/* Activity tabs */}
        <div style={{ borderTop:'0.5px solid var(--neutral-100)', paddingTop:16 }}>
          <div style={{ display:'flex', gap:4, marginBottom:14 }}>
            {['Activity','Automations'].map((t, i) => (
              <div key={t} style={{ padding:'5px 12px', fontSize:12, fontWeight:500, borderRadius:6, cursor:'pointer', background: i===0 ? '#fff' : 'transparent', border: i===0 ? '0.5px solid var(--neutral-150)' : 'none', color: i===0 ? 'var(--neutral-400)' : 'var(--neutral-300)' }}>{t}</div>
            ))}
          </div>
          {[
            { init:'JD', text:'John Doe changed the Status',         sub:'Niva Bupa → Dr. Robert Frost' },
            { init:'JD', text:'John Doe changed the Status',         sub:'Pending → Accepted' },
            { init:'JD', text:'John Doe changed the Priority',       sub:'At Clinic → Virtual' },
            { init:'JD', text:'John Doe added the Reason for Visit', sub:'None → Anxiety disorder of childhood OR adolescence' },
            { init:'JD', text:'John Doe created the appointment.',   sub:null },
          ].map((item, i) => (
            <div key={i} style={{ display:'flex', gap:10, padding:'8px 0', borderBottom:'0.5px solid var(--neutral-50)' }}>
              <div style={{ width:26, height:26, borderRadius:'50%', background:'var(--primary-100)', color:'var(--primary-300)', fontSize:10, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{item.init}</div>
              <div>
                <div style={{ fontSize:12, color:'var(--neutral-400)' }}>{item.text}</div>
                {item.sub && <div style={{ fontSize:11, color:'var(--neutral-300)', marginTop:2 }}>{item.sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Task Panel ─────────────────────────────────────────────────────────── */
function TaskPanel({ onClose }) {
  return (
    <>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:'0.5px solid var(--neutral-100)', flexShrink:0 }}>
        <span style={{ fontSize:15, fontWeight:600, color:'var(--neutral-400)' }}>Task Details</span>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <button style={{ padding:'6px 14px', borderRadius:6, border:'none', background:'var(--primary-300)', color:'#fff', fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:'Inter, sans-serif' }}>Update</button>
          <div style={{ width:1, height:16, background:'var(--neutral-150)', flexShrink:0 }} />
          <div style={{ cursor:'pointer', width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, color:'var(--neutral-300)', fontWeight:300, lineHeight:1 }} onClick={onClose}>×</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex:1, overflow:'auto', padding:'16px 20px' }}>
        {/* Title */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, color:'var(--neutral-300)', fontWeight:500, marginBottom:4 }}>Title <span style={{ color:'#CF1322' }}>•</span></div>
          <div style={{ padding:'8px 12px', border:'0.5px solid var(--neutral-150)', borderRadius:6, fontSize:13, color:'var(--neutral-400)' }}>Task for Med Recon</div>
        </div>
        {/* Description */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, color:'var(--neutral-300)', fontWeight:500, marginBottom:4 }}>Description</div>
          <div style={{ padding:'8px 12px', border:'0.5px solid var(--neutral-150)', borderRadius:6, minHeight:80, fontSize:13, color:'var(--neutral-400)' }}>Do this patient's med recon</div>
        </div>
        {/* Subtasks */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:600, color:'var(--neutral-400)', marginBottom:8 }}>Subtasks</div>
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', border:'0.5px solid var(--neutral-150)', borderRadius:6, marginBottom:6 }}>
            <div style={{ width:14, height:14, border:'1.5px solid var(--neutral-150)', borderRadius:3 }} />
            <span style={{ fontSize:12, color:'var(--neutral-400)', flex:1 }}>Gather all the related documents</span>
            <span style={{ fontSize:10, color:'var(--secondary-300)', background:'var(--secondary-100)', border:'0.5px solid var(--secondary-200)', borderRadius:4, padding:'1px 6px' }}>In Progress</span>
            <div style={{ width:22, height:22, borderRadius:'50%', background:'var(--primary-100)', fontSize:9, fontWeight:600, color:'var(--primary-300)', display:'flex', alignItems:'center', justifyContent:'center' }}>RW</div>
          </div>
          <div style={{ fontSize:11, color:'var(--primary-300)', cursor:'pointer' }}>+ Add Subtasks</div>
        </div>
        {/* 2-col fields */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
          <div>
            <div style={{ fontSize:11, color:'var(--neutral-300)', fontWeight:500, marginBottom:4 }}>Assigned To <span style={{ color:'#CF1322' }}>•</span></div>
            <div style={{ padding:'7px 10px', border:'0.5px solid var(--neutral-150)', borderRadius:6, fontSize:12, color:'var(--neutral-400)' }}>Kaustubh Kabra</div>
          </div>
          <div>
            <div style={{ fontSize:11, color:'var(--neutral-300)', fontWeight:500, marginBottom:4 }}>Task Pool</div>
            <div style={{ padding:'7px 10px', border:'0.5px solid var(--neutral-150)', borderRadius:6, fontSize:12, color:'var(--neutral-200)', display:'flex', justifyContent:'space-between' }}>Select task Pool <AltArrowDownLinear size={12} color="var(--neutral-200)" /></div>
          </div>
          <div>
            <div style={{ fontSize:11, color:'var(--neutral-300)', fontWeight:500, marginBottom:4 }}>Due Date <span style={{ color:'#CF1322' }}>•</span></div>
            <div style={{ padding:'7px 10px', border:'0.5px solid var(--neutral-150)', borderRadius:6, fontSize:12, color:'var(--neutral-400)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>07-26-2023 <CalendarLinear size={12} color="var(--neutral-300)" /></div>
          </div>
          <div>
            <div style={{ fontSize:11, color:'var(--neutral-300)', fontWeight:500, marginBottom:4 }}>Priority <span style={{ color:'#CF1322' }}>•</span></div>
            <div style={{ padding:'7px 10px', border:'0.5px solid var(--neutral-150)', borderRadius:6, fontSize:12, color:'var(--neutral-400)', display:'flex', alignItems:'center', gap:4 }}><LightningLinear size={12} color="var(--neutral-300)" /> High <AltArrowDownLinear size={12} color="var(--neutral-200)" style={{ marginLeft:'auto' }} /></div>
          </div>
          <div>
            <div style={{ fontSize:11, color:'var(--neutral-300)', fontWeight:500, marginBottom:4, display:'flex', alignItems:'center', gap:4 }}>Member <InfoCircleLinear size={10} color="var(--neutral-200)" /></div>
            <div style={{ padding:'7px 10px', border:'0.5px solid var(--neutral-150)', borderRadius:6, fontSize:12, color:'var(--neutral-400)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>Katherine Moss <SquareAltArrowRightLinear size={12} color="var(--neutral-300)" /></div>
            <div style={{ fontSize:10, color:'var(--neutral-200)', marginTop:3 }}>Add member context for this task</div>
          </div>
          <div>
            <div style={{ fontSize:11, color:'var(--neutral-300)', fontWeight:500, marginBottom:4 }}>Labels</div>
            <div style={{ padding:'7px 10px', border:'0.5px solid var(--neutral-150)', borderRadius:6, fontSize:12, color:'var(--neutral-200)', display:'flex', justifyContent:'space-between' }}>Select Labels <AltArrowDownLinear size={12} color="var(--neutral-200)" /></div>
          </div>
        </div>
        {/* Activity */}
        <div style={{ borderTop:'0.5px solid var(--neutral-100)', paddingTop:14 }}>
          <div style={{ display:'flex', gap:4, marginBottom:10 }}>
            {['Activity','Automations'].map((t, i) => (
              <div key={t} style={{ padding:'5px 12px', fontSize:12, fontWeight:500, borderRadius:6, cursor:'pointer', background: i===0 ? '#fff' : 'transparent', border: i===0 ? '0.5px solid var(--neutral-150)' : 'none', color: i===0 ? 'var(--neutral-400)' : 'var(--neutral-300)' }}>{t}</div>
            ))}
          </div>
          <div style={{ display:'flex', gap:4, marginBottom:12 }}>
            {['All','Comments','History'].map((t, i) => (
              <div key={t} style={{ padding:'4px 10px', fontSize:11, fontWeight:500, borderRadius:4, cursor:'pointer', background: i===0 ? '#fff' : 'transparent', border: i===0 ? '0.5px solid var(--neutral-150)' : 'none', color: i===0 ? 'var(--neutral-400)' : 'var(--neutral-300)' }}>{t}</div>
            ))}
          </div>
          <div style={{ padding:'8px 10px', border:'0.5px solid var(--neutral-150)', borderRadius:6, fontSize:12, color:'var(--neutral-200)', marginBottom:12 }}>Add a comment...</div>
          <div style={{ display:'flex', gap:10, padding:'8px 0' }}>
            <div style={{ width:26, height:26, borderRadius:'50%', background:'var(--primary-100)', color:'var(--primary-300)', fontSize:10, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>JD</div>
            <div>
              <div style={{ fontSize:12, color:'var(--neutral-400)', fontWeight:500 }}>John Doe added a Comment</div>
              <div style={{ fontSize:11, color:'var(--neutral-300)', marginTop:2 }}>All patients who have been either admitted or discharged within last 29 days.</div>
              <div style={{ fontSize:11, color:'var(--neutral-200)', marginTop:4, display:'flex', gap:4 }}>
                <span style={{ cursor:'pointer' }}>Edit</span>
                <span>•</span>
                <span style={{ cursor:'pointer' }}>Delete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Attempt Log Panel ──────────────────────────────────────────────────── */
function AttemptPanel({ highlightNum, onClose }) {
  const ordinals = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th'];
  const attemptName = (num) => `${ordinals[num-1] || num+'th'} Outreach`;

  const getMonthLabel = (a) => {
    const src = a.conducted || a.due;
    if (!src) return 'Unknown';
    const parts = src.split('/');
    if (parts.length < 3) return 'Unknown';
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(parts[0])-1]} 20${parts[2].substring(0,2)}`;
  };

  const grouped = [];
  const seen = new Map();
  OUTREACH1_ATTEMPTS.forEach(a => {
    const lbl = getMonthLabel(a);
    if (!seen.has(lbl)) { seen.set(lbl, grouped.length); grouped.push({ label:lbl, entries:[] }); }
    grouped[seen.get(lbl)].entries.push(a);
  });

  const conductedCount = OUTREACH1_ATTEMPTS.filter(a => a.conducted).length;

  return (
    <>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:'0.5px solid var(--neutral-100)', flexShrink:0 }}>
        <span style={{ fontSize:15, fontWeight:600, color:'var(--neutral-400)', fontFamily:'Inter, sans-serif' }}>Attempt Log</span>
        <div style={{ cursor:'pointer', width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:6 }} onClick={onClose}>
          <CloseCircleLinear size={18} color="var(--neutral-300)" />
        </div>
      </div>

      {/* Patient card */}
      <div style={{ margin:'16px 20px 0', padding:'12px 14px', background:'var(--neutral-50)', borderRadius:8, border:'0.5px solid var(--neutral-100)', display:'flex', alignItems:'flex-start', gap:12, flexShrink:0 }}>
        <div style={{ width:40, height:40, borderRadius:8, background:'var(--primary-100)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:13, fontWeight:600, color:'var(--primary-300)', fontFamily:'Inter, sans-serif' }}>RW</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'var(--neutral-400)', display:'flex', alignItems:'center', gap:6, fontFamily:'Inter, sans-serif' }}>
            Richard Willson <span style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'inline-block' }} />
          </div>
          <div style={{ fontSize:11, fontWeight:400, color:'var(--neutral-300)', fontFamily:'Inter, sans-serif' }}>Patient · Initial Outreach</div>
        </div>
        <div style={{ display:'flex', gap:6, flexShrink:0 }}>
          <span style={{ fontSize:11, fontWeight:500, color:'#145ECC', background:'#F4F8FE', borderRadius:4, padding:'2px 8px', border:'0.5px solid rgba(20,94,204,0.2)', fontFamily:'Inter, sans-serif' }}>{conductedCount} Logged</span>
          <span style={{ fontSize:11, fontWeight:400, color:'var(--neutral-300)', background:'#fff', borderRadius:4, padding:'2px 8px', border:'0.5px solid var(--neutral-150)', fontFamily:'Inter, sans-serif' }}>{OUTREACH1_ATTEMPTS.length} Total</span>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', margin:'12px 20px 0', padding:'0 2px', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:2 }}>
          {[['All', true],['Successful', false],['Unsuccessful', false]].map(([label, active]) => (
            <span key={label} style={{ fontSize:12, fontWeight: active ? 500 : 400, color: active ? 'var(--neutral-400)' : 'var(--neutral-300)', cursor:'pointer', padding:'3px 8px', borderRadius:4, background: active ? 'var(--neutral-50)' : 'transparent', fontFamily:'Inter, sans-serif' }}>{label}</span>
          ))}
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="var(--neutral-300)" strokeWidth="1.5"/><path d="M17 17l3 3" stroke="var(--neutral-300)" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ flex:1, overflow:'auto', padding:'16px 20px 24px', fontFamily:'Inter, sans-serif' }}>
        {grouped.map(({ label, entries }) => (
          <div key={label} style={{ marginBottom:20 }}>
            <div style={{ fontSize:11, fontWeight:500, color:'var(--neutral-300)', marginBottom:12, textTransform:'uppercase', letterSpacing:'0.04em' }}>{label}</div>
            <div style={{ position:'relative', paddingLeft:22 }}>
              <div style={{ position:'absolute', left:5, top:6, bottom:6, width:1, background:'var(--neutral-100)' }} />
              {entries.map((a, ei) => {
                const isHighlighted = a.num === highlightNum;
                const parts = a.conducted ? a.conducted.split(' · ') : [];
                const dateStr = parts[0] || null;
                const timeStr = parts[1] || null;
                return (
                  <div key={a.num} style={{ position:'relative', marginBottom: ei < entries.length-1 ? 12 : 0 }}>
                    <div style={{ position:'absolute', left:-17, top:14, width:9, height:9, borderRadius:'50%', background: isHighlighted ? 'var(--primary-300)' : 'var(--neutral-150)', border: isHighlighted ? '2px solid var(--primary-100)' : '1.5px solid var(--neutral-0)', zIndex:1, boxSizing:'border-box' }} />
                    <div style={{ padding:'10px 12px', borderRadius:8, border:`0.5px solid ${isHighlighted ? 'var(--primary-200)' : 'var(--neutral-100)'}`, background: isHighlighted ? 'var(--primary-50)' : 'var(--neutral-0)', boxShadow: isHighlighted ? 'inset 3px 0 0 var(--primary-300)' : 'none' }}>
                      <div style={{ fontSize:11, fontWeight:400, color:'var(--neutral-300)', marginBottom:6 }}>
                        {dateStr ? `${dateStr} • ${timeStr} • Richard Willson (Co-Ordinator)` : `Due ${a.due}${a.day ? ' · '+a.day : ''} • Richard Willson (Co-Ordinator)`}
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                        <CallChatLinear size={14} color={isHighlighted ? 'var(--primary-300)' : 'var(--neutral-400)'} />
                        <span style={{ fontSize:13, fontWeight:500, color: isHighlighted ? 'var(--primary-400)' : 'var(--neutral-400)' }}>{attemptName(a.num)}</span>
                        <span style={{ fontSize:10, fontWeight:500, color:'var(--primary-300)', background:'var(--primary-50)', border:'0.5px solid var(--primary-100)', borderRadius:4, padding:'1px 6px' }}>TOC IP</span>
                      </div>
                      {a.conducted ? (
                        <div style={{ fontSize:12, fontWeight:400, color: attemptOutcomeColor(a.outcome || '') }}>{a.outcome || '—'}</div>
                      ) : (
                        <div style={{ fontSize:12, fontWeight:400, color:'var(--neutral-200)' }}>Not Logged Yet</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── SlidePanel (orchestrator) ─────────────────────────────────────────── */
export default function SlidePanel({ panel, onClose }) {
  if (!panel) return null;
  const { type, row, closing, highlightNum } = panel;

  return (
    <>
      <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.25)', zIndex:10000 }} onClick={onClose} />
      <div
        className={closing ? 'drawer-exit' : 'drawer-enter'}
        onClick={e => e.stopPropagation()}
        style={{
          position:'fixed', top:8, right:8, bottom:8,
          width:650,
          background:'#fff',
          borderRadius:8,
          boxShadow:'-4px 0 32px rgba(0,0,0,0.14)',
          zIndex:10001,
          overflow:'hidden',
          display:'flex', flexDirection:'column',
        }}
      >
        {type === 'appointment' && <AppointmentPanel onClose={onClose} />}
        {type === 'task'        && <TaskPanel        onClose={onClose} />}
        {type === 'attempt'     && <AttemptPanel     onClose={onClose} highlightNum={highlightNum} />}
      </div>
    </>
  );
}
