import React from 'react';

export default function QuickDetailsTab({ patient }) {
  return (
    <div style={{ display:'flex', gap:16 }}>
      {/* Left column */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:16 }}>
        {/* Admission & Discharge Information */}
        <div>
          <div style={{ fontSize:13, fontWeight:500, color:'var(--neutral-400)', marginBottom:8 }}>Admission &amp; Discharge Information</div>
          <div style={{ border:'0.5px solid var(--neutral-150)', borderRadius:6, overflow:'hidden' }}>
            {[
              ['Admit Class',        patient.admitClass === '-' ? '—' : patient.admitClass],
              ['Admit Date',         patient.lastAdmission || '—'],
              ['Discharge Date',     '03/12/2026'],
              ['Length of Stay',     '11 days'],
              ['Primary Diagnosis',  'Heart Failure'],
              ['Discharge Disposition','Home Health'],
            ].map(([label, value], i, arr) => (
              <div key={label} style={{ display:'flex', alignItems:'center', padding:'8px 12px', borderBottom: i < arr.length-1 ? '0.5px solid var(--neutral-100)' : 'none' }}>
                <span style={{ flex:'0 0 160px', fontSize:12, color:'var(--neutral-300)' }}>{label}</span>
                <span style={{ fontSize:13, color:'var(--neutral-400)', fontWeight:400 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Risk & LACE Acuity */}
        <div>
          <div style={{ fontSize:13, fontWeight:500, color:'var(--neutral-400)', marginBottom:8 }}>Risk &amp; LACE Acuity</div>
          <div style={{ border:'0.5px solid var(--neutral-150)', borderRadius:6, overflow:'hidden' }}>
            {[
              ['LACE Score',        String(patient.laceAcuity)],
              ['Readmission Risk',  patient.readmission],
              ['Risk Level',        patient.riskLevel],
            ].map(([label, value], i, arr) => (
              <div key={label} style={{ display:'flex', alignItems:'center', padding:'8px 12px', borderBottom: i < arr.length-1 ? '0.5px solid var(--neutral-100)' : 'none' }}>
                <span style={{ flex:'0 0 160px', fontSize:12, color:'var(--neutral-300)' }}>{label}</span>
                <span style={{ fontSize:13, color:'var(--neutral-400)', fontWeight:400 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* DM/HIU Eligibility */}
        <div>
          <div style={{ fontSize:13, fontWeight:500, color:'var(--neutral-400)', marginBottom:8 }}>DM/HIU Eligibility</div>
          <div style={{ border:'0.5px solid var(--neutral-150)', borderRadius:6, overflow:'hidden' }}>
            {[
              ['DM Eligible',      'Yes'],
              ['HIU Eligible',     'No'],
              ['Last HbA1c',       '7.2%'],
              ['Last BP Reading',  '128/82'],
              ['Insurance Type',   'Medicare Advantage'],
            ].map(([label, value], i, arr) => (
              <div key={label} style={{ display:'flex', alignItems:'center', padding:'8px 12px', borderBottom: i < arr.length-1 ? '0.5px solid var(--neutral-100)' : 'none' }}>
                <span style={{ flex:'0 0 160px', fontSize:12, color:'var(--neutral-300)' }}>{label}</span>
                <span style={{ fontSize:13, color:'var(--neutral-400)', fontWeight:400 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right column */}
      <div style={{ width:280, flexShrink:0, display:'flex', flexDirection:'column', gap:16 }}>
        <div>
          <div style={{ fontSize:13, fontWeight:500, color:'var(--neutral-400)', marginBottom:8 }}>Additional Information</div>
          <div style={{ border:'0.5px solid var(--neutral-150)', borderRadius:6, overflow:'hidden' }}>
            {[
              ['Assigned To',       patient.assignee],
              ['Program Start',     patient.startDate],
              ['Care Plan',         patient.carePlan],
              ['Sub-Status',        patient.status],
              ['Tasks Open',        String(patient.tasks)],
              ['Member ID',         patient.memberId],
              ['Gender / Age',      `${patient.gender} · ${patient.age}`],
              ['Preferred Call',    '10:00 AM – 12:00 PM'],
              ['Language',          'English'],
              ['Population Type',   'Dynamic'],
              ['Zip Code',          '94110'],
              ['State',             'California'],
            ].map(([label, value], i, arr) => (
              <div key={label} style={{ display:'flex', alignItems:'center', padding:'8px 12px', borderBottom: i < arr.length-1 ? '0.5px solid var(--neutral-100)' : 'none' }}>
                <span style={{ flex:'0 0 120px', fontSize:12, color:'var(--neutral-300)' }}>{label}</span>
                <span style={{ fontSize:12, color:'var(--neutral-400)', fontWeight:400, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
