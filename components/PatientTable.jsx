import React from 'react';
import { UsersGroupRoundedLinear } from 'solar-icon-set';
import { Checkbox, TH } from './shared.jsx';
import PatientTableRow from './PatientTableRow.jsx';

const CHECKBOX_W = 36;
const MEMBER_W   = 220;
const ACTION_W   = 160;

export default function PatientTable({
  pageRows,
  currentPage,
  pageSize,
  checkedRows,
  hoveredRow,
  allChecked,
  onToggleAll,
  onToggleRow,
  onHoverRow,
  onOpenDrawer,
  tooltipHideRef,
  onShowBadgeTooltip,
  onHideBadgeTooltip,
  onOpenCallPopup,
  tooltipItems,
}) {
  const safePage = currentPage;

  return (
    <div className="thin-scroll" style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column' }}>
      {/* Empty state */}
      {pageRows.length === 0 && (
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ width:192, height:192, borderRadius:12, background:'var(--neutral-0)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, padding:16, flexShrink:0 }}>
            <div style={{ position:'relative', width:120, height:120, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <div style={{ position:'absolute', width:120, height:120, borderRadius:'50%', border:'1px dashed var(--neutral-150)', background:'transparent', opacity:0.7 }} />
              <div style={{ position:'absolute', width:102, height:102, borderRadius:'50%', border:'1px dashed var(--neutral-150)', background:'transparent', opacity:0.9 }} />
              <div style={{ position:'relative', width:84, height:84, borderRadius:'50%', background:'linear-gradient(180deg, #F9FAFC 0%, #F1F2F3 100%)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <UsersGroupRoundedLinear size={46} color="var(--neutral-200)" />
              </div>
            </div>
            <span style={{ fontSize:12, fontWeight:400, color:'var(--neutral-200)', fontFamily:'Inter, sans-serif', textAlign:'center', lineHeight:'14px', whiteSpace:'nowrap' }}>No members match applied filter</span>
          </div>
        </div>
      )}
      <table style={{ width:'max-content', minWidth:'100%', borderCollapse:'collapse', tableLayout:'fixed', fontFamily:'Inter, sans-serif', display: pageRows.length === 0 ? 'none' : undefined }}>
        <thead>
          <tr>
            {/* Sticky left: checkbox */}
            <th style={{ width:CHECKBOX_W, minWidth:CHECKBOX_W, padding:'0 10px', height:36, borderBottom:'0.5px solid var(--neutral-150)', background:'var(--neutral-0)', position:'sticky', top:0, left:0, zIndex:4 }}>
              <Checkbox checked={allChecked} onClick={onToggleAll} />
            </th>
            {/* Sticky left: Members */}
            <TH label="Members"             w={MEMBER_W} left={CHECKBOX_W} borderRight />
            {/* Scrollable */}
            <TH label="Program Sub Status"  w={160} sticky />
            <TH label="Admit Class"         w={120} sticky />
            <TH label="Next Action Due"     w={150} sticky />
            <TH label="Last Action Missed"  w={150} sticky />
            <TH label="Last Outreach"       w={180} sticky />
            <TH label="Assignee"            w={200} sticky />
            <TH label="Start Date"          w={120} sticky />
            <TH label="Last Admission"      w={120} sticky />
            <TH label="LACE Acuity"         w={100} sticky />
            <TH label="Readmission"         w={100} sticky />
            <TH label="Risk Level"          w={120} sticky />
            <TH label="Tasks"               w={100} sticky />
            <TH label="Care Plan Status"    w={128} sticky />
            {/* Sticky right: Actions */}
            <TH label="Actions" w={ACTION_W} right={0} borderLeft />
          </tr>
        </thead>
        <tbody>
          {pageRows.map((p, i) => {
            const globalIdx = (safePage - 1) * pageSize + i;
            return (
              <PatientTableRow
                key={i}
                patient={p}
                globalIdx={globalIdx}
                isChecked={checkedRows.has(globalIdx)}
                isHovered={hoveredRow === i}
                onToggleCheck={onToggleRow}
                onHoverEnter={() => onHoverRow(i)}
                onHoverLeave={() => onHoverRow(null)}
                onOpenDrawer={onOpenDrawer}
                tooltipHideRef={tooltipHideRef}
                onShowBadgeTooltip={onShowBadgeTooltip}
                onHideBadgeTooltip={onHideBadgeTooltip}
                onOpenCallPopup={onOpenCallPopup}
                tooltipItems={tooltipItems}
                CHECKBOX_W={CHECKBOX_W}
                MEMBER_W={MEMBER_W}
                ACTION_W={ACTION_W}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
