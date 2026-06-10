import React from 'react';
import { PhoneCallingLinear, CloseCircleLinear } from 'solar-icon-set';

export default function CallPopup({ popup, onClose }) {
  const r = popup.rect;
  const firstName = popup.patientName.split(' ')[0];
  const PHONE_OPTIONS = [
    { number:'(581) 824-1591', type:'Primary',   relation:null,           tags:['Most Used','Last Used'], selected:true  },
    { number:'(581) 824-1591', type:'Alternate', relation:null,           tags:[],                        selected:false },
    { number:'(581) 824-1591', type:'Son',       relation:'Albert Flores', tags:[],                       selected:false },
  ];

  return (
    <>
      <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:9998 }} onClick={onClose} />
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position:'fixed',
          top: r.bottom + 8,
          left: Math.max(8, r.right - 320),
          zIndex:9999,
          width:320,
          background:'var(--neutral-0)',
          borderRadius:8,
          border:'0.5px solid var(--neutral-150)',
          boxShadow:'0 8px 24px rgba(0,0,0,0.12)',
          overflow:'hidden',
        }}
      >
        {/* Header */}
        <div style={{ padding:'12px 14px 10px', borderBottom:'0.5px solid var(--neutral-100)' }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--neutral-400)', marginBottom:3 }}>Call {popup.patientName}</div>
              <div style={{ fontSize:11, color:'var(--neutral-300)', lineHeight:'16px' }}>Pref time 10 AM - 5 PM | M-F</div>
              <div style={{ fontSize:11, color:'var(--neutral-300)', lineHeight:'16px' }}>Speaks : English | Chinese</div>
            </div>
            <div style={{ cursor:'pointer', flexShrink:0, marginTop:1 }} onClick={onClose}>
              <CloseCircleLinear size={16} color="var(--neutral-300)" />
            </div>
          </div>
        </div>
        {/* Numbers section */}
        <div style={{ padding:'10px 14px 0' }}>
          <div style={{ fontSize:11, fontWeight:500, color:'var(--neutral-300)', marginBottom:6 }}>{firstName}'s Numbers</div>
          {PHONE_OPTIONS.map((opt, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:8, padding:'7px 10px', borderRadius:6, marginBottom:3,
              background: opt.selected ? 'var(--primary-50)' : 'transparent',
              border: opt.selected ? '0.5px solid var(--primary-200)' : '0.5px solid transparent',
              cursor:'pointer',
            }}>
              <div style={{ width:14, height:14, borderRadius:'50%', border: opt.selected ? '4.5px solid var(--primary-300)' : '1.5px solid var(--neutral-200)', flexShrink:0 }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:500, color:'var(--neutral-400)' }}>{opt.number}</div>
                <div style={{ fontSize:10, color:'var(--neutral-300)' }}>{opt.type}{opt.relation ? ` • ${opt.relation}` : ''}</div>
              </div>
              {opt.tags.length > 0 && (
                <div style={{ display:'flex', gap:3, flexShrink:0 }}>
                  {opt.tags.includes('Most Used') && (
                    <span style={{ fontSize:9, fontWeight:500, color:'#059669', background:'#ECFDF5', border:'0.5px solid rgba(5,150,105,0.2)', borderRadius:4, padding:'1px 5px', whiteSpace:'nowrap' }}>Most Used</span>
                  )}
                  {opt.tags.includes('Last Used') && (
                    <span style={{ fontSize:9, fontWeight:500, color:'var(--primary-300)', background:'var(--primary-100)', border:'0.5px solid var(--primary-200)', borderRadius:4, padding:'1px 5px', whiteSpace:'nowrap' }}>Last Used</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Divider */}
        <div style={{ height:'0.5px', background:'var(--neutral-100)', margin:'8px 14px' }} />
        {/* Call Via */}
        <div style={{ padding:'0 14px 12px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
            <span style={{ fontSize:11, fontWeight:500, color:'var(--neutral-300)' }}>Call Via</span>
            <span style={{ fontSize:10, color:'var(--primary-300)', cursor:'pointer' }}>⇄ Switch Number</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:6, border:'0.5px solid var(--neutral-150)', background:'var(--neutral-0)' }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--secondary-100)', border:'1px solid var(--secondary-200)', color:'var(--secondary-300)', fontSize:10, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>RF</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:500, color:'var(--neutral-400)' }}>Richard Floyd</div>
              <div style={{ fontSize:10, color:'var(--neutral-300)' }}>(584) 451-7666</div>
            </div>
            <span style={{ fontSize:9, fontWeight:500, color:'var(--primary-300)', background:'var(--primary-100)', border:'0.5px solid var(--primary-200)', borderRadius:4, padding:'1px 5px', whiteSpace:'nowrap' }}>Last used</span>
          </div>
        </div>
        {/* Call Now button */}
        <div style={{ padding:'0 14px 14px' }}>
          <button style={{
            width:'100%', padding:'10px', borderRadius:6, border:'none', cursor:'pointer',
            background:'var(--primary-300)', color:'#fff',
            fontSize:13, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:6,
            fontFamily:'Inter, sans-serif',
          }}>
            <PhoneCallingLinear size={14} color="#fff" />
            Call Now
          </button>
        </div>
      </div>
    </>
  );
}
