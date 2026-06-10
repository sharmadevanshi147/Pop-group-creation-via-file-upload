import React from 'react';
import { CheckReadLinear, PenLinear, TrashBinMinimalisticLinear } from 'solar-icon-set';

export default function ThreeDotMenu({ menu, onClose, onMarkComplete, onOpenSlidePanel, onOpenDeleteConfirm }) {
  return (
    <>
      <div style={{ position:'fixed', inset:0, zIndex:9990 }} onClick={onClose} />
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position:'fixed',
          top: menu.rect.bottom + 4,
          left: Math.max(8, menu.rect.right - 191),
          width: 191,
          background:'#fff',
          borderRadius: 8,
          border:'0.5px solid var(--neutral-100)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
          zIndex: 9991,
          padding: '8px',
          display:'flex',
          flexDirection:'column',
          gap:8,
        }}
      >
        {/* Mark as Completed */}
        <div
          style={{ display:'flex', alignItems:'center', gap:4, padding:'0 8px', height:32, borderRadius:4, cursor:'pointer', transition:'background 0.1s' }}
          onMouseEnter={e => e.currentTarget.style.background='var(--primary-25)'}
          onMouseLeave={e => e.currentTarget.style.background=''}
          onClick={() => {
            if (menu?.rowName) {
              onMarkComplete(menu.rowName);
            }
            onClose();
          }}
        >
          <CheckReadLinear size={14} color="var(--neutral-300)" />
          <span style={{ fontSize:14, color:'var(--neutral-400)', fontWeight:400 }}>Mark as Completed</span>
        </div>
        {/* Edit Task / Edit Appointment */}
        <div
          style={{ display:'flex', alignItems:'center', gap:4, padding:'0 8px', height:32, borderRadius:4, cursor:'pointer', transition:'background 0.1s' }}
          onMouseEnter={e => e.currentTarget.style.background='var(--primary-25)'}
          onMouseLeave={e => e.currentTarget.style.background=''}
          onClick={() => { if (menu.row) onOpenSlidePanel({ type: menu.rowType, row: menu.row, closing: false }); onClose(); }}
        >
          <PenLinear size={14} color="var(--neutral-300)" />
          <span style={{ fontSize:14, color:'var(--neutral-400)', fontWeight:400 }}>{menu.rowType === 'appointment' ? 'Edit Appointment' : 'Edit Task'}</span>
        </div>
        {/* Delete Task / Delete Appointment */}
        <div
          style={{ display:'flex', alignItems:'center', gap:4, padding:'0 8px', height:32, borderRadius:4, cursor:'pointer', transition:'background 0.1s' }}
          onMouseEnter={e => e.currentTarget.style.background='#FFF1F0'}
          onMouseLeave={e => e.currentTarget.style.background=''}
          onClick={() => { onOpenDeleteConfirm({ rowName: menu.rowName, rowType: menu.rowType }); onClose(); }}
        >
          <TrashBinMinimalisticLinear size={14} color="#CF1322" />
          <span style={{ fontSize:14, color:'#CF1322', fontWeight:400 }}>{menu.rowType === 'appointment' ? 'Delete Appointment' : 'Delete Task'}</span>
        </div>
      </div>
    </>
  );
}
