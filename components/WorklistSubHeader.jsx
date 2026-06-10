import React from 'react';
import { Input, DatePicker, ConfigProvider } from 'antd';
import {
  MagniferLinear, ImportLinear, SortVerticalLinear, FilterLinear, MenuDotsLinear,
  SidebarMinimalisticLinear, AltArrowDownLinear, BackspaceLinear, CalendarLinear,
} from 'solar-icon-set';
import { ACTION_TYPES, DATE_OPTIONS, FILTER_DEFS } from './constants.js';
import { Checkbox } from './shared.jsx';

export default function WorklistSubHeader({
  onToggleSidebar,
  sidebarCollapsed,
  searchQuery,
  onSearchChange,
  filterOpen,
  onToggleFilter,
  activeCount,
  activeFilters,
  openDropdown,
  onOpenDropdown,
  dropdownRefs,
  dropdownState,
  onDropdownStateChange,
  datePickerOpen,
  onDatePickerOpen,
  onApplyFilter,
  onClearAll,
  onEmptyDropdownState,
}) {
  return (
    <div style={{ flexShrink:0, borderBottom:'0.5px solid var(--neutral-150)' }}>
      {/* Top row */}
      <div style={{ height:48, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px 0 10px', gap:8 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
          <div
            onClick={onToggleSidebar}
            style={{ cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', width:28, height:28, borderRadius:4, background:'transparent', flexShrink:0 }}
            onMouseEnter={e => e.currentTarget.style.background='var(--neutral-75)'}
            onMouseLeave={e => e.currentTarget.style.background='transparent'}
          >
            <SidebarMinimalisticLinear size={18} color="var(--neutral-300)" style={{ transform: sidebarCollapsed ? 'scaleX(-1)' : 'none', transition:'transform 0.25s ease', display:'block' }} />
          </div>
          <span style={{ fontSize:16, fontWeight:600, color:'var(--neutral-400)' }}>TOC IP List</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <Input
            prefix={<MagniferLinear size={14} color="var(--neutral-200)" />}
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search by name, email, phone"
            style={{ height:32, width:220 }}
          />
          <div style={{ width:1, height:20, background:'var(--neutral-150)' }} />
          <button style={{ height:32, padding:'0 10px', display:'flex', alignItems:'center', gap:6, border:'0.5px solid var(--neutral-150)', borderRadius:6, background:'var(--neutral-0)', fontSize:14, fontWeight:500, color:'var(--neutral-300)', cursor:'pointer' }}>
            <ImportLinear size={14} color="var(--neutral-300)" />Import
          </button>
          <div style={{ width:1, height:20, background:'var(--neutral-150)' }} />
          {/* Avatar group */}
          <div style={{ display:'flex', alignItems:'center' }}>
            {['DC','RW'].map((init,i) => (
              <div key={init} style={{ width:28, height:28, borderRadius:4, background:'var(--secondary-100)', border:'2px solid #fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:400, color:'var(--secondary-300)', marginLeft:i===0?0:-8, zIndex:2-i, position:'relative' }}>{init}</div>
            ))}
            <div style={{ width:28, height:28, borderRadius:4, background:'var(--neutral-75)', border:'2px solid #fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:400, color:'var(--neutral-300)', marginLeft:-8, position:'relative' }}>+2</div>
          </div>
          <div style={{ width:1, height:20, background:'var(--neutral-150)' }} />
          <button title="Sort" style={{ width:28, height:28, borderRadius:4, border:'0.5px solid var(--neutral-150)', background:'var(--neutral-0)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <SortVerticalLinear size={14} color="var(--neutral-300)" />
          </button>
          {/* Filter toggle — shows active count dot when filters are on */}
          <button
            title="Filter"
            onClick={onToggleFilter}
            style={{ position:'relative', width:28, height:28, borderRadius:4, border: filterOpen ? '0.5px solid var(--primary-300)' : '0.5px solid var(--neutral-150)', background: filterOpen ? 'var(--primary-50)' : 'var(--neutral-0)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <FilterLinear size={14} color={filterOpen ? 'var(--primary-300)' : 'var(--neutral-300)'} />
            {activeCount > 0 && (
              <div style={{ position:'absolute', top:-5, right:-5, minWidth:16, height:16, borderRadius:6, background:'var(--secondary-300)', border:'1.5px solid #fff', display:'flex', alignItems:'center', justifyContent:'center', padding:'0 3px' }}>
                <span style={{ fontSize:9, fontWeight:700, color:'#fff', lineHeight:1 }}>{activeCount}</span>
              </div>
            )}
          </button>
          <button title="More" style={{ width:28, height:28, borderRadius:4, border:'0.5px solid var(--neutral-150)', background:'var(--neutral-0)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <MenuDotsLinear size={14} color="var(--neutral-300)" />
          </button>
        </div>
      </div>

      {/* Filter panel — expands below top row */}
      {filterOpen && (
        <div style={{ padding:'10px 16px 12px', borderTop:'0.5px solid var(--neutral-100)', background:'var(--neutral-0)' }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {FILTER_DEFS.map(({ key, label }) => {
              const active = activeFilters[key];
              const isActionFilter = key === 'nextActionDue' || key === 'lastActionMissed';
              const isDropOpen = openDropdown === key;
              const ds = isActionFilter ? dropdownState[key] : null;

              const handleChipClick = () => {
                if (isActionFilter) {
                  onOpenDropdown(prev => prev === key ? null : key);
                } else {
                  onApplyFilter(key);
                }
              };

              return (
                <div key={key} style={{ position:'relative' }} ref={isActionFilter ? el => { dropdownRefs.current[key] = el; } : undefined}>
                  <button
                    onClick={handleChipClick}
                    style={{
                      height:32, borderRadius:4, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6,
                      padding:'0 10px',
                      background: (active || isDropOpen) ? 'var(--primary-50)' : 'var(--neutral-0)',
                      border: `0.5px solid ${(active || isDropOpen) ? 'var(--primary-200)' : 'var(--neutral-150)'}`,
                    }}>
                    <span style={{ fontSize:13, fontWeight:400, color:(active || isDropOpen) ? 'var(--primary-300)' : 'var(--neutral-300)', whiteSpace:'nowrap' }}>{label}</span>
                    {active && (
                      <>
                        <span style={{ fontSize:13, fontWeight:400, color:'var(--primary-300)' }}>:</span>
                        <span style={{ fontSize:13, fontWeight:500, color:'var(--primary-300)', whiteSpace:'nowrap', maxWidth:180, overflow:'hidden', textOverflow:'ellipsis' }}>{active.value}</span>
                        {active.count && (
                          <span style={{ fontSize:11, fontWeight:500, background:'var(--primary-100)', color:'var(--primary-300)', borderRadius:4, padding:'1px 5px', flexShrink:0 }}>{active.count}</span>
                        )}
                      </>
                    )}
                    <AltArrowDownLinear size={12} color={(active || isDropOpen) ? 'var(--primary-300)' : 'var(--neutral-300)'} style={{ transform: isDropOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.15s' }} />
                  </button>

                  {/* Action filter dropdown */}
                  {isActionFilter && isDropOpen && (() => {
                    const allChecked = ACTION_TYPES.every(a => ds.actions.has(a));
                    const canApply = ds.dateRange !== '' && (ds.dateRange !== 'Custom' || ds.customRange != null);
                    const toggleSelectAll = () => onDropdownStateChange(prev => ({
                      ...prev, [key]: { ...prev[key], actions: allChecked ? new Set() : new Set(ACTION_TYPES) }
                    }));
                    const toggleAction = (action) => onDropdownStateChange(prev => {
                      const newSet = new Set(prev[key].actions);
                      newSet.has(action) ? newSet.delete(action) : newSet.add(action);
                      return { ...prev, [key]: { ...prev[key], actions: newSet } };
                    });
                    return (
                      <div data-dropdown-root onClick={e => e.stopPropagation()} style={{ position:'absolute', top:'calc(100% + 6px)', left:0, zIndex:200, width:300, background:'#fff', borderRadius:8, border:'0.5px solid var(--neutral-150)', boxShadow:'0 8px 24px rgba(0,0,0,0.12)', padding:8, display:'flex', flexDirection:'column', gap:12, fontFamily:'Inter, sans-serif' }}>
                        {/* Select Date Range */}
                        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                          <span style={{ fontSize:14, fontWeight:500, color:'var(--neutral-300)' }}>Select Date Range</span>
                          <div style={{ position:'relative' }}>
                            {/* Trigger field */}
                            <div
                              onClick={() => onDatePickerOpen(p => p === key ? null : key)}
                              style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:32, borderRadius:6, border:`0.5px solid ${datePickerOpen === key ? 'var(--primary-200)' : 'var(--neutral-150)'}`, background:'var(--neutral-0)', padding:'0 10px', cursor:'pointer', userSelect:'none' }}>
                              <span style={{ fontSize:14, color: ds.dateRange ? 'var(--neutral-400)' : 'var(--neutral-200)', fontFamily:'Inter, sans-serif' }}>{ds.dateRange || 'Select Date Range'}</span>
                              <AltArrowDownLinear size={12} color="var(--neutral-300)" style={{ transform: datePickerOpen === key ? 'rotate(180deg)' : 'none', transition:'transform 0.15s' }} />
                            </div>
                            {/* Sub-popup: radio list */}
                            {datePickerOpen === key && (
                              <div style={{ position:'absolute', top:'calc(100% + 4px)', left:0, width:'100%', background:'#fff', borderRadius:8, border:'0.5px solid var(--neutral-150)', boxShadow:'0 8px 24px rgba(0,0,0,0.12)', padding:8, display:'flex', flexDirection:'column', gap:8, zIndex:202, fontFamily:'Inter, sans-serif' }}>
                                {DATE_OPTIONS.map(opt => {
                                  const sel = ds.dateRange === opt;
                                  return (
                                    <label key={opt} onClick={() => { onDropdownStateChange(prev => ({ ...prev, [key]: { ...prev[key], dateRange: opt, customRange: null } })); onDatePickerOpen(null); }} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', height:32, flexShrink:0 }}>
                                      <div style={{ width:16, height:16, borderRadius:'50%', flexShrink:0, border: sel ? '5px solid var(--primary-300)' : '1.5px solid var(--neutral-200)', background:'#fff', boxSizing:'border-box' }} />
                                      <span style={{ fontSize:14, fontWeight:400, color:'var(--neutral-400)' }}>{opt}</span>
                                    </label>
                                  );
                                })}
                                <button onClick={() => { onDropdownStateChange(prev => ({ ...prev, [key]: { ...prev[key], dateRange: '', customRange: null } })); onDatePickerOpen(null); }} style={{ height:32, borderRadius:6, border:'0.5px solid var(--neutral-150)', background:'var(--neutral-0)', fontSize:14, color:'var(--neutral-300)', cursor:'pointer', fontFamily:'Inter, sans-serif' }}
                                  onMouseEnter={e => e.currentTarget.style.background='var(--neutral-50)'}
                                  onMouseLeave={e => e.currentTarget.style.background='var(--neutral-0)'}>
                                  Reset
                                </button>
                              </div>
                            )}
                          </div>
                          {/* Custom date range picker (AntD) shown inline when Custom selected */}
                          {ds.dateRange === 'Custom' && (
                            <DatePicker.RangePicker
                              value={ds.customRange}
                              onChange={val => onDropdownStateChange(prev => ({ ...prev, [key]: { ...prev[key], customRange: val } }))}
                              format="MM/DD/YY"
                              size="small"
                              style={{ width:'100%', height:32 }}
                              getPopupContainer={trigger => trigger.closest('[data-dropdown-root]') || document.body}
                              placeholder={['From Date', 'Till Date']}
                              separator={<span style={{ color:'var(--neutral-300)', fontSize:14 }}>→</span>}
                              suffixIcon={<CalendarLinear size={12} color="var(--neutral-300)" />}
                              allowClear
                            />
                          )}
                        </div>
                        {/* Select Action Type */}
                        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                          <span style={{ fontSize:14, fontWeight:500, color:'var(--neutral-300)', marginBottom:8 }}>Select Action Type</span>
                          {/* Select All */}
                          <label onClick={toggleSelectAll} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', height:32 }}>
                            <div style={{ width:16, height:16, borderRadius:4, flexShrink:0, border: allChecked ? 'none' : '1.5px solid var(--neutral-150)', background: allChecked ? 'var(--primary-300)' : 'var(--neutral-0)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                              {allChecked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </div>
                            <span style={{ fontSize:14, fontWeight:400, color:'var(--neutral-400)', userSelect:'none' }}>Select All</span>
                          </label>
                          <div style={{ height:'0.5px', background:'var(--neutral-100)' }} />
                          {/* Individual action types */}
                          <div style={{ display:'flex', flexDirection:'column', maxHeight:220, overflowY:'auto' }}>
                            {ACTION_TYPES.map(action => {
                              const checked = ds.actions.has(action);
                              return (
                                <label key={action} onClick={() => toggleAction(action)} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', height:32, flexShrink:0 }}>
                                  <div style={{ width:16, height:16, borderRadius:4, flexShrink:0, border: checked ? 'none' : '1.5px solid var(--neutral-150)', background: checked ? 'var(--primary-300)' : 'var(--neutral-0)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                                    {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                  </div>
                                  <span style={{ fontSize:14, fontWeight:400, color:'var(--neutral-400)', userSelect:'none' }}>{action}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                        {/* Footer buttons */}
                        <div style={{ display:'flex', gap:8 }}>
                          <button
                            onClick={() => onDropdownStateChange(prev => ({ ...prev, [key]: onEmptyDropdownState() }))}
                            style={{ flex:1, height:32, borderRadius:6, border:'0.5px solid var(--neutral-150)', background:'var(--neutral-0)', fontSize:14, fontWeight:400, color:'var(--neutral-300)', cursor:'pointer', fontFamily:'Inter, sans-serif', transition:'background 0.1s' }}
                            onMouseEnter={e => e.currentTarget.style.background='var(--neutral-50)'}
                            onMouseLeave={e => e.currentTarget.style.background='var(--neutral-0)'}>
                            Reset
                          </button>
                          <button
                            onClick={canApply ? () => onApplyFilter(key) : undefined}
                            disabled={!canApply}
                            style={{ flex:1, height:32, borderRadius:6, border:'none', fontSize:14, fontWeight:500, fontFamily:'Inter, sans-serif', cursor: canApply ? 'pointer' : 'default', background: canApply ? 'var(--primary-300)' : 'var(--neutral-100)', color: canApply ? '#fff' : 'var(--neutral-150)', transition:'background 0.15s' }}>
                            Apply
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              );
            })}
            {/* Clear all */}
            {activeCount > 0 && (
              <button
                onClick={onClearAll}
                style={{ height:32, borderRadius:4, padding:'0 8px', border:'none', background:'transparent', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:5 }}>
                <BackspaceLinear size={14} color="var(--primary-300)" />
                <span style={{ fontSize:13, fontWeight:400, color:'var(--primary-300)' }}>Clear all</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
