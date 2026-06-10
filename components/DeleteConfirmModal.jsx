import React from 'react';
import { DangerCircleLinear } from 'solar-icon-set';

export default function DeleteConfirmModal({ confirm, onClose }) {
  return (
    <>
      <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.25)', zIndex:10000 }} onClick={onClose} />
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position:'fixed',
          top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          width: 340,
          background:'#fff',
          borderRadius:12,
          border:'0.5px solid var(--neutral-100)',
          padding:'20px',
          boxShadow:'0 4px 20px rgba(0,0,0,0.14)',
          zIndex:10001,
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          gap:16,
        }}
      >
        {/* Icon + Title + Body */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, width:'100%' }}>
          <DangerCircleLinear size={18} color="#CF1322" strokeWidth={1} />
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, width:'100%' }}>
            <span style={{ fontSize:16, fontWeight:500, color:'var(--neutral-400)', textAlign:'center' }}>
              {confirm.rowType === 'appointment' ? 'Delete Appointment?' : 'Delete Task?'}
            </span>
            <p style={{ fontSize:14, color:'var(--neutral-200)', textAlign:'center', lineHeight:'1.5', margin:0 }}>
              This action will permanently delete this {confirm.rowType === 'appointment' ? 'appointment' : 'task'} from the system.
            </p>
          </div>
        </div>
        {/* Buttons */}
        <div style={{ display:'flex', gap:8, width:'100%' }}>
          <button
            onClick={onClose}
            style={{ flex:1, height:32, borderRadius:4, border:'0.5px solid var(--neutral-200)', background:'#fff', color:'var(--neutral-300)', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter, sans-serif', transition:'background 0.1s' }}
            onMouseEnter={e => e.currentTarget.style.background='var(--neutral-50)'}
            onMouseLeave={e => e.currentTarget.style.background='#fff'}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            style={{ flex:1, height:32, borderRadius:4, border:'0.5px solid rgba(217,45,32,0.5)', background:'#FFF1F0', color:'#CF1322', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter, sans-serif' }}
          >
            {confirm.rowType === 'appointment' ? 'Delete Appointment' : 'Delete Task'}
          </button>
        </div>
      </div>
    </>
  );
}
