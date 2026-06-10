import React from 'react';
import {
  CallChatLinear, CalendarMinimalisticLinear, DocumentTextLinear,
  PhoneCallingLinear, EyeLinear, MenuDotsLinear, AltArrowDownLinear,
  CloseCircleLinear, SunLinear, CheckCircleLinear, FlagLinear, PillLinear,
} from 'solar-icon-set';
import { OUTREACH1_ATTEMPTS, attemptOutcomeColor, MILESTONE_ICON_MAP } from './constants.js';
import { TaskIcon, HandHeartIcon, DocumentAddIcon } from './icons.jsx';
import AttemptLog from './AttemptLog.jsx';

export default function MilestonesTab({
  drawerPatient,
  viewBy,
  expandedOutreach,
  onToggleExpandedOutreach,
  completedMilestones,
  onMarkComplete,
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
  const isHarold = drawerPatient?.name === 'Harold Baker';

  const milestoneIcon = (name) => {
    if (name === 'Initial Outreach' || name.startsWith('Follow Up')) return <CallChatLinear size={16} color="var(--neutral-300)" />;
    if (name === 'Task For Med Recon') return <TaskIcon color="var(--neutral-300)" size={16} />;
    if (name === 'Post Discharge Appointment') return <CalendarMinimalisticLinear size={16} color="var(--neutral-300)" />;
    if (name === 'MRP Completion') return <PillLinear size={16} color="var(--neutral-300)" />;
    if (name === 'Post IP Assessment') return <DocumentAddIcon color="var(--neutral-300)" size={16} />;
    if (name === 'Program Completion') return <HandHeartIcon color="var(--neutral-300)" size={16} />;
    return <DocumentTextLinear size={16} color="var(--neutral-300)" />;
  };

  const rows = [
    { name:'Initial Outreach',           due:'04/01/26', day:'Day 3',  attempts:3, status:'Pending', assignee:'Rosa Lee',  assigneeInit:'RL' },
    { name:'Task For Med Recon',         due:'04/01/26', day:null,     attempts:0, status:'Pending', assignee:'John Smith', assigneeInit:'JS' },
    { name:'Post Discharge Appointment', due:'03/31/26', day:null,     attempts:0, status:'Missed',  assignee:'John Smith', assigneeInit:'JS' },
    { name:'MRP Completion',             due:'04/02/26', day:null,     attempts:0, status:'Pending', assignee:'John Smith', assigneeInit:'JS' },
    { name:'Follow Up Outreach 1',                due:'04/02/26', day:'Day 4',  attempts:0, status:'Pending', assignee:'John Smith', assigneeInit:'JS' },
    { name:'Post IP Assessment',         due:'04/07/26', day:null,     attempts:0, status:'Pending', assignee:'John Smith', assigneeInit:'JS' },
    { name:'Follow Up Outreach 2',                due:'04/12/26', day:'Day 10', attempts:0, status:'Pending', assignee:'John Smith', assigneeInit:'JS' },
    { name:'Follow Up Outreach 3',                due:'04/19/26', day:'Day 17', attempts:0, status:'Pending', assignee:'John Smith', assigneeInit:'JS' },
    { name:'Follow Up Outreach 4',                due:'04/26/26', day:'Day 24', attempts:0, status:'Pending', assignee:'John Smith', assigneeInit:'JS' },
    { name:'Follow Up Outreach 5',                due:'05/01/26', day:'Day 30', attempts:0, status:'Pending', assignee:'John Smith', assigneeInit:'JS' },
    { name:'Program Completion',         due:'04/31/26', day:null,     attempts:0, status:'Pending', assignee:'John Smith', assigneeInit:'JS' },
  ].map(r => completedMilestones.has(r.name) ? { ...r, status:'Completed' } : r);

  const statusBadge = (s) => {
    const cfg = s==='Missed'  ? { bg:'#FFF1F0', c:'#CF1322', border:'0.5px solid rgba(207,19,34,0.2)' }
              : s==='Pending' ? { bg:'#FFFCF5', c:'#D9A50B', border:'0.5px solid rgba(217,165,11,0.2)' }
              :                 { bg:'#ECFDF5', c:'#059669', border:'0.5px solid rgba(5,150,105,0.2)' };
    return (
      <span style={{ fontSize:14, fontWeight:400, background:cfg.bg, color:cfg.c, border:cfg.border, borderRadius:4, padding:'2px 6px', whiteSpace:'nowrap' }}>{s}</span>
    );
  };

  const actionCell = (row) => (
    <div style={{ display:'flex', alignItems:'center', gap:8, padding:'0 12px 0 8px' }}>
      {(row.name === 'Initial Outreach' || row.name.startsWith('Follow Up')) ? (
        <div
          style={{ cursor:'pointer', display:'flex', alignItems:'center', flexShrink:0 }}
          onClick={e => { e.stopPropagation(); const rect = e.currentTarget.getBoundingClientRect(); onOpenCallPopup(p => p ? null : { rect, patientName: drawerPatient?.name || 'Patient' }); }}
        >
          <PhoneCallingLinear size={18} color="var(--neutral-300)" />
        </div>
      ) : (
        <div
          style={{ cursor:'pointer', display:'flex', alignItems:'center', flexShrink:0 }}
          onClick={e => {
            e.stopPropagation();
            const type = (row.name === 'Post Discharge Appointment') ? 'appointment'
                       : (row.name === 'Task For Med Recon') ? 'task' : 'other';
            onOpenSlidePanel({ type, row, closing: false });
          }}
        >
          <EyeLinear size={18} color="var(--neutral-300)" />
        </div>
      )}
      <div style={{ width:1, height:14, background:'var(--neutral-150)', flexShrink:0 }} />
      <div
        style={{ display:'flex', alignItems:'center', cursor: (row.name === 'Initial Outreach' || row.name.startsWith('Follow Up')) ? 'default' : 'pointer' }}
        onClick={e => {
          if (row.name === 'Initial Outreach' || row.name.startsWith('Follow Up')) return;
          e.stopPropagation();
          const rect = e.currentTarget.getBoundingClientRect();
          const rowType = (row.name === 'Post Discharge Appointment') ? 'appointment'
                        : (row.name === 'Task For Med Recon') ? 'task' : 'other';
          onOpenThreeDotMenu(p => (p && p.rowName === row.name) ? null : { rect, rowName: row.name, rowType, row });
        }}
      >
        <MenuDotsLinear size={18} color={(row.name === 'Initial Outreach' || row.name.startsWith('Follow Up')) ? 'var(--neutral-150)' : 'var(--neutral-200)'} />
      </div>
    </div>
  );

  const dueDateCell = (row) => (
    <div style={{ padding:'0 8px' }}>
      <span style={{ fontSize:14, color:'var(--neutral-300)' }}>{row.due}{row.day ? ` (${row.day})` : ''}</span>
    </div>
  );

  const milestoneCell = (row) => (
    <div style={{ display:'flex', alignItems:'center', gap:6, padding:'0 8px' }}>
      <div style={{ flexShrink:0 }}>{milestoneIcon(row.name)}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:2, minWidth:0 }}>
        <span style={{ fontSize:14, fontWeight:400, color:'var(--neutral-400)', lineHeight:'16px' }}>{row.name}</span>
        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          {!isHarold && <span style={{ fontSize:12, color:'var(--neutral-300)' }}>Due on: {row.due}{row.day ? `(${row.day})` : ''}</span>}
          {row.attempts > 0 && (
            <>
              {!isHarold && <span style={{ color:'var(--neutral-200)', fontSize:10 }}>•</span>}
              <span
                style={{ fontSize:11, color:'var(--primary-300)', cursor:'pointer', fontWeight:400 }}
                onClick={e => { e.stopPropagation(); onToggleExpandedOutreach(n => n === row.name ? null : row.name); }}
              >{row.attempts} Attempts ›</span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const sectionEmptyState = (text) => (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px 16px', gap:6 }}>
      <div style={{ position:'relative', width:64, height:64, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', width:64, height:64, borderRadius:'50%', border:'1px dashed var(--neutral-150)', background:'transparent' }} />
        <div style={{ position:'absolute', width:52, height:52, borderRadius:'50%', border:'1px dashed var(--neutral-150)', background:'transparent' }} />
        <div style={{ position:'relative', width:40, height:40, borderRadius:'50%', background:'linear-gradient(180deg, #F9FAFC 0%, #F1F2F3 100%)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <FlagLinear size={20} color="var(--neutral-200)" />
        </div>
      </div>
      <span style={{ fontSize:12, color:'var(--neutral-200)', textAlign:'center' }}>{text}</span>
    </div>
  );

  const assigneeCell = (row, isStatusView) => (
    <div style={{ padding:'0 8px', display: isStatusView ? undefined : 'flex', alignItems: isStatusView ? undefined : 'center' }}>
      <div
        onMouseEnter={() => onHoverAssigneeRow(row.name)}
        onMouseLeave={() => onHoverAssigneeRow(null)}
        onClick={e => {
          e.stopPropagation();
          const rect = e.currentTarget.getBoundingClientRect();
          const sel = assigneeSelections[row.name];
          const displayName = sel ? sel.name : row.assignee;
          onOpenAssigneeDropdown({ rowName: row.name, rect, currentAssignee: displayName });
        }}
        style={{
          display:'inline-flex', alignItems:'center', gap: isStatusView ? 4 : 8, cursor:'pointer',
          borderRadius:4, padding: isStatusView ? '2px 4px' : '2px 6px',
          background: (hoveredAssigneeRow === row.name || assigneeDropdown?.rowName === row.name) ? 'var(--neutral-50)' : 'transparent',
          transition:'background 0.1s',
        }}>
        <span style={{ fontSize:14, fontWeight:400, color:'var(--neutral-300)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontFamily:'Inter, sans-serif' }}>
          {assigneeSelections[row.name] ? assigneeSelections[row.name].name : row.assignee}
        </span>
        {(hoveredAssigneeRow === row.name || assigneeDropdown?.rowName === row.name) && (
          <AltArrowDownLinear size={12} color="var(--neutral-300)" style={{ marginLeft: isStatusView ? 8 : undefined, flexShrink:0 }} />
        )}
      </div>
    </div>
  );

  if (viewBy === 'status') {
    const sections = [
      { key:'Missed',    bg:'#FFF1F0', c:'#CF1322', Icon:CloseCircleLinear,  emptyText:'No Milestones Missed'    },
      { key:'Pending',   bg:'#FFFCF5', c:'#D9A50B', Icon:SunLinear,          emptyText:'No Milestones Pending'   },
      { key:'Completed', bg:'#ECFDF5', c:'#059669', Icon:CheckCircleLinear,  emptyText:'No Milestones Completed' },
    ];
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:8, paddingTop:4 }}>
        {sections.map(({ key, bg, c, Icon, emptyText }) => {
          const sectionRows = rows.filter(r => r.status === key);
          return (
            <div key={key} style={{ borderRadius:8, border:'0.5px solid var(--neutral-150)', overflow:'hidden' }}>
              {/* Section header */}
              <div style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 12px', background:bg, borderBottom: sectionRows.length > 0 ? '0.5px solid var(--neutral-150)' : 'none' }}>
                <Icon size={14} color={c} />
                <span style={{ fontSize:12, fontWeight:500, color:c }}>{key}</span>
              </div>
              {/* Column header row */}
              <div style={{ display:'grid', gridTemplateColumns: isHarold ? '1fr 200px' : '1fr 180px 72px', height:32, alignItems:'center', borderBottom:'0.5px solid var(--neutral-150)' }}>
                {(isHarold ? ['Milestones','Due Date'] : ['Milestones','Assignee','Actions']).map((h, hi) => (
                  <div key={h} style={{ fontSize:11, fontWeight:500, color:'var(--neutral-300)', padding: hi === 0 ? '0 8px 0 12px' : '0 8px', whiteSpace:'nowrap' }}>{h}</div>
                ))}
              </div>
              {/* Section content */}
              {sectionRows.length === 0 ? sectionEmptyState(emptyText) : (
                <div style={{ display:'flex', flexDirection:'column' }}>
                  {sectionRows.map((row, i) => (
                    <div key={i} style={ highlightedMilestone === row.name ? { border:'1px solid var(--primary-300)', background:'#FDFDFF', borderRadius:4 } : { borderBottom: i<sectionRows.length-1 ? '0.5px solid var(--neutral-100)' : 'none' }}>
                      <div style={{ display:'grid', gridTemplateColumns: isHarold ? '1fr 200px' : '1fr 180px 72px', alignItems:'center', minHeight:52, padding:'0' }}>
                        {milestoneCell(row)}
                        {isHarold && dueDateCell(row)}
                        {!isHarold && (
                          <div style={{ padding:'0 8px' }}>
                            <div
                              onMouseEnter={() => onHoverAssigneeRow(row.name)}
                              onMouseLeave={() => onHoverAssigneeRow(null)}
                              onClick={e => {
                                e.stopPropagation();
                                const rect = e.currentTarget.getBoundingClientRect();
                                const sel = assigneeSelections[row.name];
                                const displayName = sel ? sel.name : row.assignee;
                                onOpenAssigneeDropdown({ rowName: row.name, rect, currentAssignee: displayName });
                              }}
                              style={{
                                display:'inline-flex', alignItems:'center', gap:4, cursor:'pointer',
                                borderRadius:4, padding:'2px 4px',
                                background: (hoveredAssigneeRow === row.name || assigneeDropdown?.rowName === row.name) ? 'var(--neutral-50)' : 'transparent',
                                transition:'background 0.1s',
                              }}>
                              <span style={{ fontSize:14, color:'var(--neutral-300)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                                {assigneeSelections[row.name] ? assigneeSelections[row.name].name : row.assignee}
                              </span>
                              {(hoveredAssigneeRow === row.name || assigneeDropdown?.rowName === row.name) && (
                                <AltArrowDownLinear size={12} color="var(--neutral-300)" style={{ marginLeft:8, flexShrink:0 }} />
                              )}
                            </div>
                          </div>
                        )}
                        {!isHarold && actionCell(row)}
                      </div>
                      {expandedOutreach === row.name && row.attempts > 0 && <AttemptLog onOpenSlidePanel={onOpenSlidePanel} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', paddingTop:4 }}>
      {/* Column headers */}
      <div style={{ display:'grid', gridTemplateColumns: isHarold ? '1fr 200px 140px' : '1fr 110px 180px 72px', padding:'6px 0', borderBottom:'0.5px solid var(--neutral-150)' }}>
        {(isHarold ? ['Milestones','Due Date','Status'] : ['Milestones','Status','Assignee','Actions']).map(h => (
          <div key={h} style={{ fontSize:11, fontWeight:500, color:'var(--neutral-300)', padding:'0 8px', whiteSpace:'nowrap' }}>{h}</div>
        ))}
      </div>
      {/* Rows */}
      {rows.map((row, i) => (
        <div key={i} style={ highlightedMilestone === row.name ? { border:'1px solid var(--primary-300)', background:'#FDFDFF', borderRadius:4 } : { borderBottom: i<rows.length-1 ? '0.5px solid var(--neutral-100)' : 'none' }}>
          <div style={{ display:'grid', gridTemplateColumns: isHarold ? '1fr 200px 140px' : '1fr 110px 180px 72px', alignItems:'center', minHeight:52, padding:'0' }}>
            {milestoneCell(row)}
            {isHarold && dueDateCell(row)}
            <div style={{ padding:'0 8px' }}>{statusBadge(row.status)}</div>
            {!isHarold && (
              <div
                style={{ padding:'0 8px', display:'flex', alignItems:'center' }}
                onMouseEnter={() => onHoverAssigneeRow(row.name)}
                onMouseLeave={() => onHoverAssigneeRow(null)}
              >
                <div
                  onClick={e => {
                    e.stopPropagation();
                    const rect = e.currentTarget.getBoundingClientRect();
                    const sel = assigneeSelections[row.name];
                    const displayName = sel ? sel.name : row.assignee;
                    onOpenAssigneeDropdown({ rowName: row.name, rect, currentAssignee: displayName });
                  }}
                  style={{
                    display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer',
                    borderRadius:4, padding:'2px 6px',
                    background: (hoveredAssigneeRow === row.name || assigneeDropdown?.rowName === row.name) ? 'var(--neutral-50)' : 'transparent',
                    transition:'background 0.1s',
                  }}>
                  <span style={{ fontSize:14, fontWeight:400, color:'var(--neutral-300)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontFamily:'Inter, sans-serif' }}>
                    {assigneeSelections[row.name] ? assigneeSelections[row.name].name : row.assignee}
                  </span>
                  {(hoveredAssigneeRow === row.name || assigneeDropdown?.rowName === row.name) && (
                    <AltArrowDownLinear size={12} color="var(--neutral-300)" style={{ flexShrink:0 }} />
                  )}
                </div>
              </div>
            )}
            {!isHarold && actionCell(row)}
          </div>
          {expandedOutreach === row.name && row.attempts > 0 && <AttemptLog onOpenSlidePanel={onOpenSlidePanel} />}
        </div>
      ))}
    </div>
  );
}
