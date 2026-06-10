import React from 'react';
import {
  CallChatLinear, SquareAltArrowRightLinear, DocumentTextLinear,
  PhoneCallingLinear, MenuDotsLinear,
} from 'solar-icon-set';
import { Checkbox, Avatar, StatusBadge, AdmitChip, RiskBadge, CarePlanBadge } from './shared.jsx';
import { attemptOutcomeColor } from './constants.js';

const outreachColor = s =>
  s==='Successful'   ? '#059669' :
  s==='Unsuccessful' ? '#CF1322' :
  s==='Note'         ? '#D9A50B' :
  'var(--neutral-300)';

export default function PatientTableRow({
  patient: p,
  globalIdx,
  isChecked,
  isHovered,
  onToggleCheck,
  onHoverEnter,
  onHoverLeave,
  onOpenDrawer,
  tooltipHideRef,
  onShowBadgeTooltip,
  onHideBadgeTooltip,
  onOpenCallPopup,
  tooltipItems,
  CHECKBOX_W,
  MEMBER_W,
  ACTION_W,
}) {
  const checked = isChecked;
  const hovered = isHovered;
  const bg = checked ? 'var(--primary-50)' : hovered ? 'var(--primary-25)' : 'var(--neutral-0)';

  const baseTd = { height:52, verticalAlign:'middle', borderBottom:'0.5px solid var(--neutral-100)', fontSize:13, fontWeight:400, color:'var(--neutral-300)', padding:'0 12px', background:bg };
  const stickyTd = (left, right, borderRight, borderLeft) => ({
    ...baseTd,
    position:'sticky',
    left: left!=null ? left : undefined,
    right: right!=null ? right : undefined,
    zIndex: 2,
    boxShadow: borderRight ? '3px 0 6px -2px rgba(0,0,0,0.08)' : borderLeft ? '-3px 0 6px -2px rgba(0,0,0,0.08)' : undefined,
  });

  return (
    <tr
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      className={hovered ? 'wl-action-show' : ''}
    >
      {/* ── Sticky left: checkbox ── */}
      <td style={{ ...stickyTd(0), width:CHECKBOX_W, padding:'0 10px' }}>
        <Checkbox checked={checked} onClick={() => onToggleCheck(globalIdx)} />
      </td>

      {/* ── Sticky left: Members ── */}
      <td style={{ ...stickyTd(CHECKBOX_W, undefined, undefined, undefined), width:MEMBER_W, boxShadow:'3px 0 6px -2px rgba(0,0,0,0.08)', padding:'0 12px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, minWidth:0 }}>
          <Avatar init={p.initials} size={28} scheme="patient" />
          <div style={{ display:'flex', flexDirection:'column', gap:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, minWidth:0 }}>
              <span style={{ fontSize:13, fontWeight:500, color:'var(--neutral-500)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</span>
              <span style={{ fontSize:12, fontWeight:400, color:'var(--neutral-300)', whiteSpace:'nowrap', flexShrink:0 }}>({p.gender} • {p.age})</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
              <span style={{ fontSize:12, color:'var(--neutral-300)' }}>{p.memberId}</span>
              <span style={{ fontSize:10, color:'var(--neutral-200)' }}>•</span>
              <span style={{ fontSize:12, color:'var(--neutral-300)' }}>{p.statusCode}</span>
            </div>
          </div>
        </div>
      </td>

      {/* ── Scrollable middle columns ── */}
      {/* Program Sub Status */}
      <td style={{ ...baseTd, width:160 }}><StatusBadge v={p.status} /></td>

      {/* Admit Class */}
      <td style={{ ...baseTd, width:120 }}>
        {p.admitClass === '-'
          ? <span style={{ fontSize:13, color:'var(--neutral-200)' }}>—</span>
          : p.admitClass === 'Inpatient'
          ? <span style={{ fontSize:13, color:'var(--neutral-300)' }}>Inpatient</span>
          : <AdmitChip v={p.admitClass} />}
      </td>

      {/* Next Action Due */}
      <td style={{ ...baseTd, width:150 }}>
        {p.nextActionDue === '-'
          ? <span style={{ fontSize:13, color:'var(--neutral-200)' }}>—</span>
          : <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ fontSize:13, color:'var(--neutral-300)' }}>{p.nextActionDue}</span>
              {p.nextActionCount != null && (
                <div
                  style={{ width:8, height:8, borderRadius:'50%', background:'#D9A50B', flexShrink:0, cursor:'default' }}
                  onMouseEnter={e => { clearTimeout(tooltipHideRef.current); const ellipseRect = e.currentTarget.getBoundingClientRect(); const containerRect = e.currentTarget.parentElement.getBoundingClientRect(); onShowBadgeTooltip({ rect: { bottom: ellipseRect.bottom, left: containerRect.left }, label: p.nextActionDue, count: p.nextActionCount, date: p.nextActionDue, type: 'due', items: ((tooltipItems || {})[p.name] || {}).dueItems || [], patient: p }); }}
                  onMouseLeave={() => { tooltipHideRef.current = setTimeout(() => onHideBadgeTooltip(), 150); }}
                />
              )}
            </div>}
      </td>

      {/* Last Action Missed */}
      <td style={{ ...baseTd, width:150 }}>
        {p.lastActionMissed === '-'
          ? <span style={{ fontSize:13, color:'var(--neutral-200)' }}>—</span>
          : <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ fontSize:13, color:'var(--neutral-300)' }}>{p.lastActionMissed}</span>
              {p.lastMissedCount != null && (
                <div
                  style={{ width:8, height:8, borderRadius:'50%', background:'#CF1322', flexShrink:0, cursor:'default' }}
                  onMouseEnter={e => { clearTimeout(tooltipHideRef.current); const ellipseRect = e.currentTarget.getBoundingClientRect(); const containerRect = e.currentTarget.parentElement.getBoundingClientRect(); onShowBadgeTooltip({ rect: { bottom: ellipseRect.bottom, left: containerRect.left }, label: p.lastActionMissed, count: p.lastMissedCount, date: p.lastActionMissed, type: 'missed', items: ((tooltipItems || {})[p.name] || {}).missedItems || [], patient: p }); }}
                  onMouseLeave={() => { tooltipHideRef.current = setTimeout(() => onHideBadgeTooltip(), 150); }}
                />
              )}
            </div>}
      </td>

      {/* Last Outreach */}
      <td style={{ ...baseTd, width:180 }}>
        {p.lastOutreach ? (
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <CallChatLinear size={20} color={outreachColor(p.lastOutreach.status)} />
            <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ fontSize:12, fontWeight:400, color:outreachColor(p.lastOutreach.status) }}>{p.lastOutreach.status}</span>
                <span style={{ fontSize:11, color:'var(--neutral-300)' }}>{p.lastOutreach.date}</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:3 }}>
                {Array.from({length:3}).map((_,di) => {
                  const isLastColored = di === p.lastOutreach.dots.length - 1;
                  const dotColor = di < p.lastOutreach.dots.length
                    ? (isLastColored ? outreachColor(p.lastOutreach.status) : p.lastOutreach.dots[di])
                    : 'var(--neutral-150)';
                  return <div key={di} style={{ width:6, height:6, borderRadius:'50%', background:dotColor }} />;
                })}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <CallChatLinear size={20} color="var(--neutral-200)" />
            <span style={{ fontSize:13, color:'var(--neutral-200)' }}>—</span>
          </div>
        )}
      </td>

      {/* Assignee */}
      <td style={{ ...baseTd, width:200 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <Avatar init={p.assigneeInit} size={24} scheme="provider" />
          <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.assignee}</span>
        </div>
      </td>

      {/* Start Date */}
      <td style={{ ...baseTd, width:120 }}>{p.startDate}</td>

      {/* Last Admission */}
      <td style={{ ...baseTd, width:120 }}>{p.lastAdmission}</td>

      {/* LACE Acuity */}
      <td style={{ ...baseTd, width:100 }}>
        <span style={{ fontSize:13, fontWeight:400, color:'var(--neutral-300)' }}>{p.laceAcuity}</span>
      </td>

      {/* Readmission */}
      <td style={{ ...baseTd, width:100 }}>
        <span style={{ fontSize:13, color: p.readmission==='Yes' ? '#CF1322' : 'var(--neutral-300)' }}>{p.readmission}</span>
      </td>

      {/* Risk Level */}
      <td style={{ ...baseTd, width:120 }}>
        <span style={{ fontSize:13, fontWeight:400, color:'var(--neutral-300)' }}>{p.riskLevel}</span>
      </td>

      {/* Tasks */}
      <td style={{ ...baseTd, width:100 }}>
        <span style={{ fontSize:13, fontWeight:400, color:'var(--primary-300)' }}>{p.tasks} Tasks</span>
      </td>

      {/* Care Plan Status */}
      <td style={{ ...baseTd, width:128 }}>
        <span style={{ fontSize:13, fontWeight:400, color: p.carePlan==='Signed' ? '#389E0D' : 'var(--neutral-300)' }}>{p.carePlan}</span>
      </td>

      {/* ── Sticky right: Actions ── */}
      <td style={{ ...stickyTd(undefined, 0, undefined, true), width:ACTION_W, padding:'0 12px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:0 }}>
          {/* Button 1: Open Drawer */}
          <button data-tip="Open Overview" onClick={() => onOpenDrawer(p)} style={{ width:24, height:24, borderRadius:4, border:'none', background:'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.background='var(--neutral-75)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <SquareAltArrowRightLinear size={18} color="var(--neutral-300)" />
          </button>
          {/* Divider */}
          <div style={{ width:1, height:16, background:'var(--neutral-150)', margin:'0 4px', flexShrink:0 }} />
          {/* Button 2: Document Text – View Program */}
          <button data-tip="View Program" style={{ width:28, height:28, borderRadius:4, border:'none', background:'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.background='var(--neutral-75)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <DocumentTextLinear size={18} color="var(--neutral-300)" />
          </button>
          {/* Divider */}
          <div style={{ width:1, height:16, background:'var(--neutral-150)', margin:'0 4px', flexShrink:0 }} />
          {/* Button 3: Call */}
          <button data-tip="Call Patient" style={{ width:28, height:28, borderRadius:4, border:'none', background:'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.background='var(--neutral-75)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}
            onClick={e => { e.stopPropagation(); const rect = e.currentTarget.getBoundingClientRect(); onOpenCallPopup(cp => cp ? null : { rect, patientName: p.name }); }}>
            <PhoneCallingLinear size={18} color="var(--neutral-300)" />
          </button>
          {/* Divider */}
          <div style={{ width:1, height:16, background:'var(--neutral-150)', margin:'0 4px', flexShrink:0 }} />
          {/* Button 4: Menu Dots */}
          <button data-tip="More Options" style={{ width:28, height:28, borderRadius:4, border:'none', background:'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.background='var(--neutral-75)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <MenuDotsLinear size={18} color="var(--neutral-300)" />
          </button>
        </div>
      </td>
    </tr>
  );
}
