import React from 'react';
import { EyeLinear } from 'solar-icon-set';
import { OUTREACH1_ATTEMPTS, attemptOutcomeColor } from './constants.js';

export default function AttemptLog({ onOpenSlidePanel }) {
  const conductedCount = OUTREACH1_ATTEMPTS.filter(a => a.conducted).length;
  const allowed = OUTREACH1_ATTEMPTS.length;
  const outcomeColor = attemptOutcomeColor;

  return (
    <div style={{ margin:'0 8px 8px 30px', borderRadius:6, border:'0.5px solid var(--neutral-150)', overflow:'hidden' }}>
      {/* Stats header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 12px', background:'var(--neutral-50)', borderBottom:'0.5px solid var(--neutral-150)' }}>
        <span style={{ fontSize:12, fontWeight:600, color:'var(--neutral-400)' }}>Attempt Log</span>
        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          <span style={{ fontSize:11, fontWeight:500, color:'#145ECC', background:'#F4F8FE', borderRadius:4, padding:'2px 8px', border:'0.5px solid rgba(20,94,204,0.2)' }}>{conductedCount} Completed</span>
          <span style={{ fontSize:11, color:'var(--neutral-300)', background:'#fff', borderRadius:4, padding:'2px 8px', border:'0.5px solid var(--neutral-150)' }}>of {allowed} Total</span>
        </div>
      </div>
      {/* Column headers */}
      <div style={{ display:'grid', gridTemplateColumns:'40px 224px 1fr 80px', background:'var(--neutral-0)', borderBottom:'0.5px solid var(--neutral-100)' }}>
        {['No.','Due Date','Attempt Details','Action'].map((h, hi) => (
          <div key={hi} style={{ padding:'5px 12px', borderRight: hi === 0 ? '0.5px solid var(--neutral-150)' : 'none' }}>
            <span style={{ fontSize:10, fontWeight:500, color:'var(--neutral-300)' }}>{h}</span>
          </div>
        ))}
      </div>
      {/* Attempt rows */}
      {OUTREACH1_ATTEMPTS.map((a, i) => (
        <div key={a.num} style={{ display:'grid', gridTemplateColumns:'40px 224px 1fr 80px', alignItems:'stretch', minHeight:48, borderBottom: i < OUTREACH1_ATTEMPTS.length-1 ? '0.5px solid var(--neutral-100)' : 'none', background: a.outcome === 'Unsuccessful' ? 'linear-gradient(to right, rgba(207,19,34,0.06) 0%, transparent 60%)' : 'var(--neutral-0)' }}>
          {/* No. */}
          <div style={{ padding:'0 12px', borderRight:'0.5px solid var(--neutral-150)', display:'flex', alignItems:'center' }}>
            <span style={{ fontSize:14, fontWeight:500, color:'var(--neutral-400)', fontFamily:'Inter, sans-serif' }}>{a.num}.</span>
          </div>
          {/* Due Date */}
          <div style={{ padding:'0 12px', display:'flex', alignItems:'center' }}>
            <div>
              <div style={{ fontSize:14, fontWeight:400, color:'var(--neutral-400)' }}>Due {a.due} <span style={{ color:'var(--neutral-300)', fontSize:14, fontWeight:400 }}>({a.day})</span></div>
              {a.timeNote && <div style={{ fontSize:14, fontWeight:400, color:'var(--neutral-300)', marginTop:1 }}>{a.timeNote}</div>}
            </div>
          </div>
          {/* Attempt Details: outcome • date/time */}
          <div style={{ padding:'0 12px', display:'flex', alignItems:'center' }}>
            {a.conducted
              ? <span style={{ fontSize:14 }}>
                  {a.outcome && <span style={{ color: outcomeColor(a.outcome), fontWeight:400 }}>{a.outcome}</span>}
                  <span style={{ fontSize:14, fontWeight:400, color:'var(--neutral-300)', margin:'0 4px' }}>•</span>
                  <span style={{ fontSize:14, fontWeight:400, color:'var(--neutral-300)' }}>{a.conducted}</span>
                </span>
              : <span style={{ fontSize:14, fontWeight:400, color:'var(--neutral-200)' }}>Not Logged Yet</span>
            }
          </div>
          {/* Action */}
          <div style={{ display:'flex', alignItems:'center', padding:'0 12px' }}>
            {a.conducted
              ? <div
                  style={{ cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', width:20, height:20 }}
                  onClick={e => { e.stopPropagation(); onOpenSlidePanel({ type:'attempt', row: a, highlightNum: a.num, closing: false }); }}
                >
                  <EyeLinear size={20} color="var(--neutral-300)" />
                </div>
              : <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width:20, height:20 }}>
                  <EyeLinear size={20} color="var(--neutral-150)" />
                </div>
            }
          </div>
        </div>
      ))}
    </div>
  );
}
