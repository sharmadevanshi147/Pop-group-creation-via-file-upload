import React from 'react';
import { StarLinear, ClockCircleLinear, CheckCircleLinear } from 'solar-icon-set';

export const Checkbox = ({ checked, onClick }) => (
  <div onClick={onClick} style={{ width:16, height:16, borderRadius:4, flexShrink:0, border: checked?'none':'1.5px solid var(--neutral-150)', background: checked?'var(--primary-300)':'var(--neutral-0)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'all 0.15s' }}>
    {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
  </div>
);

export const StatusBadge = ({ v }) => {
  const cfg = v==='New'
    ? { Icon: StarLinear,         iconColor:'var(--primary-300)', circleBg:'var(--primary-100)' }
    : v==='Engaged'
    ? { Icon: ClockCircleLinear,  iconColor:'#D9A50B',            circleBg:'#FFFCF5'            }
    : { Icon: CheckCircleLinear,  iconColor:'#389E0D',            circleBg:'#F6FFED'            };
  return (
    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
      <div style={{ width:20, height:20, borderRadius:'50%', background:cfg.circleBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <cfg.Icon size={12} color={cfg.iconColor} />
      </div>
      <span style={{ fontSize:13, fontWeight:400, color:'var(--neutral-300)', whiteSpace:'nowrap' }}>{v}</span>
    </div>
  );
};

export const AdmitChip = ({ v }) => {
  const cfg = v==='Inpatient'       ? {bg:'var(--primary-100)',  c:'var(--primary-300)'}
            : v==='ER Visit'        ? {bg:'#FFF1F0',             c:'#CF1322'}
            : v==='Skilled Nursing' ? {bg:'var(--neutral-75)',   c:'var(--neutral-400)'}
            :                         {bg:'var(--secondary-50)', c:'var(--secondary-300)'};
  return <span style={{ fontSize:11, fontWeight:500, background:cfg.bg, color:cfg.c, borderRadius:4, padding:'1px 6px', whiteSpace:'nowrap' }}>{v}</span>;
};

export const ActionChip = ({ v }) => (
  <span style={{ fontSize:11, fontWeight:400, background:'var(--neutral-75)', color:'var(--neutral-300)', borderRadius:4, padding:'1px 6px', whiteSpace:'nowrap', border:'0.5px solid var(--neutral-150)' }}>{v}</span>
);

export const MoreBadge = ({ n }) => (
  <span style={{ fontSize:11, fontWeight:400, background:'var(--neutral-75)', color:'var(--neutral-300)', borderRadius:4, padding:'1px 5px' }}>+{n} More</span>
);

export const RiskBadge = ({ v }) => {
  const cfg = v.includes('High')   ? {bg:'#FFF1F0', c:'#CF1322'}
            : v.includes('Medium') ? {bg:'#FFFCF5', c:'#D9A50B'}
            :                         {bg:'#F6FFED', c:'#389E0D'};
  return <span style={{ fontSize:11, fontWeight:500, background:cfg.bg, color:cfg.c, borderRadius:4, padding:'1px 6px', whiteSpace:'nowrap' }}>{v}</span>;
};

export const CarePlanBadge = ({ v }) => {
  const cfg = v==='Signed'  ? {bg:'#ECFDF5', c:'#059669'}
            : v==='Pending' ? {bg:'#FFFCF5', c:'#D9A50B'}
            :                  {bg:'var(--neutral-75)', c:'var(--neutral-300)'};
  return <span style={{ fontSize:12, fontWeight:500, background:cfg.bg, color:cfg.c, borderRadius:4, padding:'2px 8px', whiteSpace:'nowrap' }}>{v}</span>;
};

export const TwoLineCell = ({ top, chip, more = 1 }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
    <span style={{ fontSize:13, color:'var(--neutral-300)', whiteSpace:'nowrap' }}>{top}</span>
    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
      <ActionChip v={chip} />
      <span style={{ color:'var(--neutral-200)', fontSize:10 }}>•</span>
      <MoreBadge n={more} />
    </div>
  </div>
);

export const Avatar = ({ init, size=28, scheme='patient' }) => {
  const isProvider = scheme==='provider';
  return (
    <div style={{
      width:size, height:size, borderRadius:4, flexShrink:0,
      background: isProvider ? 'var(--secondary-100)' : 'var(--primary-100)',
      border: isProvider ? '0.5px solid var(--secondary-200)' : '0.5px solid var(--primary-200)',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:11, fontWeight:400,
      color: isProvider ? 'var(--secondary-300)' : 'var(--primary-300)',
    }}>{init}</div>
  );
};

export const TH = ({ label, w, sticky, left, right, borderRight, borderLeft }) => (
  <th style={{
    width:w, minWidth:w, maxWidth:w,
    padding:'0 12px', height:36,
    fontSize:12, fontWeight:500, color:'var(--neutral-300)',
    textAlign:'left', whiteSpace:'nowrap',
    background:'var(--neutral-0)',
    borderBottom:'0.5px solid var(--neutral-150)',
    position: sticky||left!=null||right!=null ? 'sticky' : 'relative',
    top: sticky||left!=null||right!=null ? 0 : undefined,
    left: left!=null ? left : undefined,
    right: right!=null ? right : undefined,
    zIndex: left!=null||right!=null ? 4 : sticky ? 2 : undefined,
    boxShadow: borderRight ? '3px 0 6px -2px rgba(0,0,0,0.08)' : borderLeft ? '-3px 0 6px -2px rgba(0,0,0,0.08)' : undefined,
  }}>
    <span>{label}</span>
  </th>
);
