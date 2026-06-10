import React from 'react';
import QuickDetailsTab from './QuickDetailsTab.jsx';
import MilestonesTab from './MilestonesTab.jsx';

export default function PatientDrawer({
  patient,
  isClosing,
  drawerTab,
  onTabChange,
  onClose,
  viewBy,
  onViewByChange,
  expandedOutreach,
  onToggleExpandedOutreach,
  completedMilestones,
  assigneeSelections,
  hoveredAssigneeRow,
  onHoverAssigneeRow,
  assigneeDropdown,
  onOpenAssigneeDropdown,
  onOpenCallPopup,
  onOpenSlidePanel,
  onOpenThreeDotMenu,
  highlightedMilestone,
}) {
  const TABS = [
    { id:'quick',      label:'Quick Details',     count:8 },
    { id:'milestones', label:'Program Milestones',count:8 },
  ];

  return (
    <div
      className={isClosing ? 'drawer-exit' : 'drawer-enter'}
      style={{ width:700, flexShrink:0, display:'flex', flexDirection:'column', background:'var(--neutral-0)', borderLeft:'0.5px solid var(--neutral-150)', overflow:'hidden' }}
    >
      {/* ── Header ── */}
      <div style={{ height:48, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 12px', borderBottom:'0.5px solid var(--neutral-150)', background:'#fff' }}>
        <span style={{ fontSize:16, fontWeight:500, color:'var(--neutral-400)' }}>
          {patient.name}'s TOC IP Snapshot
        </span>
        <button onClick={onClose} style={{ width:28, height:28, borderRadius:4, border:'0.5px solid var(--neutral-150)', background:'var(--neutral-0)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="var(--neutral-300)" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* ── Tabs ── */}
      <div style={{ height:40, flexShrink:0, display:'flex', alignItems:'center', padding:'0 12px 0 12px', borderBottom:'0.5px solid var(--neutral-150)', background:'#fff', gap:2 }}>
        {TABS.map(({ id, label }) => {
          const active = drawerTab === id;
          return (
            <button key={id} onClick={() => onTabChange(id)}
              style={{ height:40, display:'flex', alignItems:'center', gap:5, padding:'0 8px', border:'none', background:'transparent', cursor:'pointer', flexShrink:0, borderBottom: active ? '2px solid var(--primary-300)' : '2px solid transparent', marginBottom:'-0.5px' }}>
              <span style={{ fontSize:13, fontWeight: active ? 500 : 400, color: active ? 'var(--primary-300)' : 'var(--neutral-300)', whiteSpace:'nowrap', fontFamily:'Inter, sans-serif' }}>{label}</span>
            </button>
          );
        })}
        {drawerTab === 'milestones' && (
          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
            <span style={{ fontSize:12, color:'var(--neutral-300)', fontWeight:400 }}>View By:</span>
            <div style={{ display:'flex', background:'var(--neutral-75)', borderRadius:6, padding:2, gap:1 }}>
              {['Due Date','Status'].map((opt,oi) => {
                const sel = (oi===0 && viewBy==='duedate') || (oi===1 && viewBy==='status');
                return (
                  <div key={opt} onClick={() => onViewByChange(oi===0 ? 'duedate' : 'status')} style={{ height:26, padding:'0 10px', borderRadius:4, background: sel ? '#fff' : 'transparent', border: sel ? '0.5px solid var(--neutral-150)' : 'none', display:'flex', alignItems:'center', cursor:'pointer', fontSize:12, fontWeight: sel ? 500 : 400, color: sel ? 'var(--neutral-400)' : 'var(--neutral-300)', whiteSpace:'nowrap', boxShadow: sel ? '0 1px 2px rgba(0,0,0,0.06)' : 'none' }}>{opt}</div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="thin-scroll" style={{ flex:1, overflowY:'auto', padding:16 }}>
        {drawerTab === 'quick' && (
          <QuickDetailsTab patient={patient} />
        )}

        {drawerTab === 'milestones' && (
          <MilestonesTab
            drawerPatient={patient}
            viewBy={viewBy}
            expandedOutreach={expandedOutreach}
            onToggleExpandedOutreach={onToggleExpandedOutreach}
            completedMilestones={completedMilestones}
            assigneeSelections={assigneeSelections}
            hoveredAssigneeRow={hoveredAssigneeRow}
            onHoverAssigneeRow={onHoverAssigneeRow}
            assigneeDropdown={assigneeDropdown}
            onOpenAssigneeDropdown={onOpenAssigneeDropdown}
            onOpenCallPopup={onOpenCallPopup}
            onOpenSlidePanel={onOpenSlidePanel}
            onOpenThreeDotMenu={onOpenThreeDotMenu}
            highlightedMilestone={highlightedMilestone}
          />
        )}

        {!['quick','milestones'].includes(drawerTab) && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:200, color:'var(--neutral-200)', fontSize:14 }}>
            No content yet
          </div>
        )}
      </div>
    </div>
  );
}
