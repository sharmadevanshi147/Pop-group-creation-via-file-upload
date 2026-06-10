import React from 'react';
import { ClockCircleLinear, AddSquareLinear, AltArrowRightLinear, ClipboardListLinear } from 'solar-icon-set';
import { MILESTONE_ICON_MAP } from './constants.js';

export default function BadgeTooltip({
  tooltip,
  tooltipHideRef,
  onHide,
  onOpenDrawer,
  onSetDrawerTab,
  onSetViewBy,
  onSetHighlightedMilestone,
  onSetExpandedOutreach,
}) {
  return (
    <div
      onMouseEnter={() => clearTimeout(tooltipHideRef.current)}
      onMouseLeave={onHide}
      style={{
        position:'fixed',
        top: tooltip.rect.bottom + 8,
        left: tooltip.rect.left,
        zIndex:9999,
        width:280,
        background:'#fff',
        borderRadius:8,
        border:'0.5px solid var(--neutral-150)',
        boxShadow:'0 4px 16px rgba(0,0,0,0.14)',
        overflow:'hidden',
      }}>
      {/* Header */}
      {tooltip.type === 'missed' ? (
        <div style={{ padding:'8px 12px', borderBottom:'0.5px solid var(--neutral-100)', background:'#FFF1F0', display:'flex', alignItems:'center', gap:4 }}>
          <ClockCircleLinear size={14} color="#CF1322" style={{ flexShrink:0 }} />
          <span style={{ fontSize:13, fontWeight:500, color:'#CF1322', whiteSpace:'nowrap' }}>
            {tooltip.count} missed on {tooltip.date}
          </span>
        </div>
      ) : (
        <div style={{ padding:'8px 12px', borderBottom:'0.5px solid var(--neutral-100)', background:'#fff', display:'flex', alignItems:'center', gap:4 }}>
          <ClockCircleLinear size={14} color="#D9A50B" style={{ flexShrink:0 }} />
          <span style={{ fontSize:13, fontWeight:500, color:'#D9A50B', whiteSpace:'nowrap' }}>
            {tooltip.count} due on {tooltip.date}
          </span>
        </div>
      )}
      {/* Action rows */}
      {(tooltip.items || []).map((item, ri) => {
        const Icon = MILESTONE_ICON_MAP[item.label] || ClipboardListLinear;
        const accentColor = tooltip.type === 'missed' ? '#CF1322' : 'var(--primary-300)';
        const isLast = ri === (tooltip.items.length - 1);
        return (
          <div
            key={ri}
            onClick={() => {
              const patient = tooltip.patient;
              if (!patient) return;
              onOpenDrawer(patient);
              onSetDrawerTab('milestones');
              onSetViewBy('status');
              onSetHighlightedMilestone(item.label);
              setTimeout(() => onSetHighlightedMilestone(null), 1200);
              if (item.label === 'Initial Outreach') onSetExpandedOutreach('Initial Outreach');
              onHide();
            }}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderBottom: !isLast ? '0.5px solid var(--neutral-100)' : 'none', cursor:'pointer' }}
            onMouseEnter={e => e.currentTarget.style.background='var(--primary-25)'}
            onMouseLeave={e => e.currentTarget.style.background=''}
          >
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <Icon size={16} color="var(--neutral-300)" />
              <div>
                <div style={{ fontSize:13, fontWeight:400, color:'var(--neutral-400)' }}>{item.label}</div>
                {item.attempts && (
                  <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:2 }}>
                    <AddSquareLinear size={11} color={accentColor} />
                    <span style={{ fontSize:11, color: accentColor }}>{item.attempts}</span>
                  </div>
                )}
              </div>
            </div>
            <div style={{ width:28, height:28, borderRadius:4, border:'0.5px solid var(--neutral-150)', background:'var(--neutral-0)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <AltArrowRightLinear size={14} color="var(--neutral-300)" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
