import React from 'react';
import { MagniferLinear } from 'solar-icon-set';
import { ASSIGNEES } from './constants.js';

export default function AssigneeDropdown({ dropdown, search, onSearch, onSelect, onClose }) {
  return (
    <>
      <div style={{ position:'fixed', inset:0, zIndex:9990 }} onClick={onClose} />
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position:'fixed',
          top: dropdown.rect.bottom + 4,
          left: Math.max(8, dropdown.rect.right - 280),
          width: 280,
          background:'#fff',
          borderRadius:8,
          border:'0.5px solid var(--neutral-150)',
          boxShadow:'0 8px 24px rgba(0,0,0,0.12)',
          padding:8,
          display:'flex',
          flexDirection:'column',
          gap:8,
          zIndex:9991,
          fontFamily:'Inter, sans-serif',
        }}
      >
        {/* Title */}
        <span style={{ fontSize:14, fontWeight:500, color:'var(--neutral-400)' }}>Select Assignee</span>
        {/* Search input */}
        <div style={{ display:'flex', alignItems:'center', gap:6, height:32, borderRadius:6, border:'0.5px solid var(--neutral-150)', padding:'0 10px' }}>
          <MagniferLinear size={14} color="var(--neutral-200)" />
          <input
            autoFocus
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search User"
            style={{ flex:1, border:'none', outline:'none', fontSize:14, color:'var(--neutral-400)', background:'transparent', fontFamily:'Inter, sans-serif' }}
          />
        </div>
        {/* Assignee list */}
        {ASSIGNEES.filter(a => a.name.toLowerCase().includes(search.toLowerCase())).map(a => {
          const isSelected = dropdown.currentAssignee === a.name;
          return (
            <div
              key={a.name}
              onClick={() => onSelect(dropdown.rowName, a)}
              onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--neutral-50)'; }}
              onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
              style={{
                display:'flex', alignItems:'center', gap:8, padding:'6px 8px',
                borderRadius:6, cursor:'pointer',
                background: isSelected ? 'var(--primary-50)' : 'transparent',
                border: isSelected ? '0.5px solid var(--primary-200)' : '0.5px solid transparent',
              }}
            >
              {/* Radio */}
              <div style={{
                width:16, height:16, borderRadius:'50%', flexShrink:0, boxSizing:'border-box',
                border: isSelected ? '5px solid var(--primary-300)' : '1.5px solid var(--neutral-200)',
                background:'#fff',
              }} />
              {/* Avatar */}
              <div style={{
                width:28, height:28, borderRadius:6,
                background:'var(--secondary-100)', border:'1px solid var(--secondary-200)',
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              }}>
                <span style={{ fontSize:10, fontWeight:600, color:'var(--secondary-300)' }}>{a.init}</span>
              </div>
              {/* Name + Role */}
              <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
                <span style={{ fontSize:13, fontWeight:500, color:'var(--neutral-400)' }}>{a.name}</span>
                <span style={{ fontSize:11, color:'var(--neutral-300)' }}>{a.role}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
