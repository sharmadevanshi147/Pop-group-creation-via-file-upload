/**
 * AllPatients.jsx — Fold Health · Milestones Tracking
 */

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Input, Select, DatePicker, ConfigProvider } from 'antd';
import * as XLSX from 'xlsx';
import {
  HomeLinear, UserCircleLinear, CalendarMinimalisticLinear,
  ClipboardListLinear, ChatRoundLinear, PhoneCallingLinear,
  UsersGroupTwoRoundedLinear, UsersGroupRoundedLinear, VolumeLoudLinear, PieChartLinear,
  SettingsLinear, QuestionCircleLinear,
  MagniferLinear, BellLinear, AddSquareLinear,
  AltArrowDownLinear, AltArrowRightLinear, FilterLinear,
  SortVerticalLinear, MenuDotsLinear, ImportLinear,
  StarLinear, ClockCircleLinear, CheckCircleLinear, CheckReadLinear, DangerCircleLinear,
  DocumentTextLinear, SquareAltArrowRightLinear, CallChatLinear,
  BackspaceLinear, CalendarLinear, InfoCircleLinear,
  LightningLinear, EyeLinear, SidebarMinimalisticLinear,
  CloseCircleLinear, SunLinear, FlagLinear,
  TrashBinMinimalisticLinear, TrashBinTrashLinear, PenLinear, PenNewSquareLinear, MapPointLinear,
  UserLinear, TicketLinear, PillLinear,
  UploadMinimalisticLinear,
} from 'solar-icon-set';

import WorklistSubHeader   from './components/WorklistSubHeader.jsx';
import PatientTable        from './components/PatientTable.jsx';
import PaginationBar       from './components/PaginationBar.jsx';
import PatientDrawer       from './components/PatientDrawer.jsx';
import CallPopup           from './components/CallPopup.jsx';
import BadgeTooltip        from './components/BadgeTooltip.jsx';
import ThreeDotMenu        from './components/ThreeDotMenu.jsx';
import AssigneeDropdown    from './components/AssigneeDropdown.jsx';
import DeleteConfirmModal  from './components/DeleteConfirmModal.jsx';
import SlidePanel          from './components/SlidePanel.jsx';
import CommsMenu           from './components/CommsMenu.jsx';
import ConvList, { CONVERSATIONS } from './components/ConvList.jsx';
import ChatView            from './components/ChatView.jsx';
import { ACTION_TYPES }    from './components/constants.js';
import SectionAccordion   from './components/SectionAccordion.jsx';
import FileChipCard        from './components/FileChipCard.jsx';
import { TableIcon, RetryIcon, MiniCloseIcon } from './components/icons.jsx';
import { FOLD_DB, FOLD_DB_MAP } from './constants/fold-db.js';
import { parseXlsxDate, fmtAge } from './utils/formatters.js';
import { PopulationGroupsView } from './PopulationGroupsView.jsx';

/* ─── Mini-bar (file-processing) constants & icons ──────────────────────────
   Used by the floating mini-bar that appears after "Minimize" during upload.
   Kept in sync with PROC_STEPS in PopulationGroupsView.jsx. */
const PROC_STEPS = [
  'Reading the uploaded file',
  'Extracting values for processing',
  'Matching Patient IDs with Fold Patients',
];

const ExpandIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

/* ─── Custom SVG Icons ───────────────────────────────────────────────────── */
const TaskIcon = ({ color = 'currentColor', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.36223 10.1887C4.17179 9.9887 3.8553 9.98098 3.65533 10.1714C3.45537 10.3619 3.44765 10.6784 3.63809 10.8783L4.00016 10.5335L4.36223 10.1887ZM4.76207 11.3335L4.4 11.6783C4.49437 11.7774 4.62523 11.8335 4.76207 11.8335C4.89891 11.8335 5.02976 11.7774 5.12414 11.6783L4.76207 11.3335ZM7.0289 9.67832C7.21934 9.47836 7.21162 9.16187 7.01166 8.97143C6.81169 8.78098 6.4952 8.7887 6.30476 8.98867L6.66683 9.3335L7.0289 9.67832ZM4.36223 5.522C4.17179 5.32204 3.8553 5.31432 3.65533 5.50476C3.45537 5.6952 3.44765 6.01169 3.63809 6.21166L4.00016 5.86683L4.36223 5.522ZM4.76207 6.66683L4.4 7.01166C4.49437 7.11075 4.62523 7.16683 4.76207 7.16683C4.89891 7.16683 5.02976 7.11075 5.12414 7.01166L4.76207 6.66683ZM7.0289 5.01166C7.21934 4.81169 7.21162 4.4952 7.01166 4.30476C6.81169 4.11432 6.4952 4.12204 6.30476 4.322L6.66683 4.66683L7.0289 5.01166ZM8.66683 5.50016C8.39069 5.50016 8.16683 5.72402 8.16683 6.00016C8.16683 6.2763 8.39069 6.50016 8.66683 6.50016V6.00016V5.50016ZM12.0002 6.50016C12.2763 6.50016 12.5002 6.2763 12.5002 6.00016C12.5002 5.72402 12.2763 5.50016 12.0002 5.50016V6.00016V6.50016ZM8.66683 10.1668C8.39069 10.1668 8.16683 10.3907 8.16683 10.6668C8.16683 10.943 8.39069 11.1668 8.66683 11.1668V10.6668V10.1668ZM12.0002 11.1668C12.2763 11.1668 12.5002 10.943 12.5002 10.6668C12.5002 10.3907 12.2763 10.1668 12.0002 10.1668V10.6668V11.1668ZM8.00016 14.6668V14.1668C6.41468 14.1668 5.27587 14.1658 4.40921 14.0492C3.55694 13.9347 3.04313 13.7167 2.66336 13.337L2.30981 13.6905L1.95625 14.0441C2.55279 14.6406 3.31281 14.9108 4.27597 15.0403C5.22474 15.1679 6.44295 15.1668 8.00016 15.1668V14.6668ZM1.3335 8.00016H0.833496C0.833496 9.55738 0.832434 10.7756 0.959994 11.7244C1.08949 12.6875 1.35971 13.4475 1.95625 14.0441L2.30981 13.6905L2.66336 13.337C2.28359 12.9572 2.06566 12.4434 1.95108 11.5911C1.83456 10.7245 1.8335 9.58565 1.8335 8.00016H1.3335ZM14.6668 8.00016H14.1668C14.1668 9.58565 14.1658 10.7245 14.0492 11.5911C13.9347 12.4434 13.7167 12.9572 13.337 13.337L13.6905 13.6905L14.0441 14.0441C14.6406 13.4475 14.9108 12.6875 15.0403 11.7244C15.1679 10.7756 15.1668 9.55738 15.1668 8.00016H14.6668ZM8.00016 14.6668V15.1668C9.55738 15.1668 10.7756 15.1679 11.7244 15.0403C12.6875 14.9108 13.4475 14.6406 14.0441 14.0441L13.6905 13.6905L13.337 13.337C12.9572 13.7167 12.4434 13.9347 11.5911 14.0492C10.7245 14.1658 9.58565 14.1668 8.00016 14.1668V14.6668ZM8.00016 1.3335V1.8335C9.58565 1.8335 10.7245 1.83456 11.5911 1.95108C12.4434 2.06566 12.9572 2.28359 13.337 2.66336L13.6905 2.30981L14.0441 1.95625C13.4475 1.35971 12.6875 1.08949 11.7244 0.959994C10.7756 0.832434 9.55738 0.833496 8.00016 0.833496V1.3335ZM14.6668 8.00016H15.1668C15.1668 6.44295 15.1679 5.22474 15.0403 4.27597C14.9108 3.31281 14.6406 2.55279 14.0441 1.95625L13.6905 2.30981L13.337 2.66336C13.7167 3.04313 13.9347 3.55694 14.0492 4.40921C14.1658 5.27587 14.1668 6.41468 14.1668 8.00016H14.6668ZM8.00016 1.3335V0.833496C6.44295 0.833496 5.22474 0.832434 4.27597 0.959994C3.31281 1.08949 2.55279 1.35971 1.95625 1.95625L2.30981 2.30981L2.66336 2.66336C3.04313 2.28359 3.55694 2.06566 4.40921 1.95108C5.27587 1.83456 6.41468 1.8335 8.00016 1.8335V1.3335ZM1.3335 8.00016H1.8335C1.8335 6.41468 1.83456 5.27587 1.95108 4.40921C2.06566 3.55694 2.28359 3.04313 2.66336 2.66336L2.30981 2.30981L1.95625 1.95625C1.35971 2.55279 1.08949 3.31281 0.959994 4.27597C0.832434 5.22474 0.833496 6.44295 0.833496 8.00016H1.3335ZM4.00016 10.5335L3.63809 10.8783L4.4 11.6783L4.76207 11.3335L5.12414 10.9887L4.36223 10.1887L4.00016 10.5335ZM4.76207 11.3335L5.12414 11.6783L7.0289 9.67832L6.66683 9.3335L6.30476 8.98867L4.4 10.9887L4.76207 11.3335ZM4.00016 5.86683L3.63809 6.21166L4.4 7.01166L4.76207 6.66683L5.12414 6.322L4.36223 5.522L4.00016 5.86683ZM4.76207 6.66683L5.12414 7.01166L7.0289 5.01166L6.66683 4.66683L6.30476 4.322L4.4 6.322L4.76207 6.66683ZM8.66683 6.00016V6.50016H12.0002V6.00016V5.50016H8.66683V6.00016ZM8.66683 10.6668V11.1668H12.0002V10.6668V10.1668H8.66683V10.6668Z" fill={color}/>
  </svg>
);
const HandHeartIcon = ({ color = 'currentColor', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.76666 5.86829L6.47212 6.27233V6.27233L6.76666 5.86829ZM8.00016 2.07093L7.6618 2.43905C7.8531 2.61489 8.14722 2.61489 8.33853 2.43905L8.00016 2.07093ZM9.23367 5.86829L9.5282 6.27234V6.27234L9.23367 5.86829ZM8.00016 6.45082L8.00016 6.95082V6.95082L8.00016 6.45082ZM3.3335 13.0924C3.05735 13.0924 2.8335 13.3163 2.8335 13.5924C2.8335 13.8686 3.05735 14.0924 3.3335 14.0924V13.5924V13.0924ZM12.8032 9.96233L12.5019 9.56337V9.56337L12.8032 9.96233ZM11.5984 10.8724L11.2971 10.4735V10.4735L11.5984 10.8724ZM9.85287 9.85076L9.59675 10.2802V10.2802L9.85287 9.85076ZM10.1525 10.0956L9.77908 10.4281H9.77908L10.1525 10.0956ZM10.0139 11.6468L9.93512 11.153V11.153L10.0139 11.6468ZM9.71137 11.6863L9.66031 11.1889H9.66031L9.71137 11.6863ZM8.54834 11.1908C8.27342 11.1648 8.02951 11.3667 8.00355 11.6416C7.97759 11.9165 8.17942 12.1604 8.45434 12.1864L8.50134 11.6886L8.54834 11.1908ZM12.0651 13.3912L12.2825 13.8415H12.2825L12.0651 13.3912ZM13.4801 12.4974L13.8199 12.8643V12.8643L13.4801 12.4974ZM14.5408 11.114L14.1166 10.8493L14.1166 10.8493L14.5408 11.114ZM10.0687 11.5185L10.3974 11.8952H10.3975L10.0687 11.5185ZM3.04426 10.4209C2.81901 10.5807 2.7659 10.8928 2.92565 11.118C3.08539 11.3433 3.39748 11.3964 3.62273 11.2366L3.3335 10.8288L3.04426 10.4209ZM14.2832 9.96219L14.5845 9.56316V9.56316L14.2832 9.96219ZM10.4048 13.876L10.3249 13.3824V13.3824L10.4048 13.876ZM6.85105 13.7977L6.95194 13.308V13.308L6.85105 13.7977ZM6.76666 5.86829L7.06119 5.46424C6.60105 5.12882 6.11024 4.72091 5.73938 4.29101C5.35651 3.84718 5.16683 3.45505 5.16683 3.14334H4.66683H4.16683C4.16683 3.82169 4.55246 4.44607 4.9822 4.94421C5.42395 5.45629 5.98306 5.91582 6.47212 6.27233L6.76666 5.86829ZM4.66683 3.14334H5.16683C5.16683 2.43758 5.51351 2.03503 5.93049 1.89471C6.36519 1.74842 7.01341 1.84306 7.6618 2.43905L8.00016 2.07093L8.33853 1.70282C7.48697 0.920081 6.46852 0.658535 5.61154 0.946936C4.73684 1.2413 4.16683 2.06432 4.16683 3.14334H4.66683ZM9.23367 5.86829L9.5282 6.27234C10.0173 5.91583 10.5764 5.4563 11.0181 4.94422C11.4479 4.44607 11.8335 3.82169 11.8335 3.14333H11.3335H10.8335C10.8335 3.45505 10.6438 3.84719 10.2609 4.29102C9.89009 4.72092 9.39928 5.12882 8.93914 5.46425L9.23367 5.86829ZM11.3335 3.14333H11.8335C11.8335 2.06431 11.2635 1.24129 10.3888 0.946935C9.5318 0.658536 8.51335 0.920081 7.6618 1.70282L8.00016 2.07093L8.33853 2.43905C8.98692 1.84306 9.63514 1.74842 10.0698 1.89471C10.4868 2.03503 10.8335 2.43758 10.8335 3.14333H11.3335ZM6.76666 5.86829L6.47212 6.27233C6.97552 6.63929 7.3747 6.95081 8.00016 6.95082L8.00016 6.45082L8.00017 5.95082C7.75684 5.95082 7.62328 5.87399 7.06119 5.46424L6.76666 5.86829ZM9.23367 5.86829L8.93914 5.46425C8.37705 5.87399 8.24349 5.95082 8.00017 5.95082L8.00016 6.45082L8.00016 6.95082C8.62563 6.95082 9.0248 6.6393 9.5282 6.27234L9.23367 5.86829ZM3.3335 13.5924V14.0924H4.84012V13.5924V13.0924H3.3335V13.5924ZM12.8032 9.96233L12.5019 9.56337L11.2971 10.4735L11.5984 10.8724L11.8998 11.2714L13.1046 10.3613L12.8032 9.96233ZM9.85287 9.85076L9.59675 10.2802C9.67004 10.3239 9.73021 10.3732 9.77908 10.4281L10.1525 10.0956L10.526 9.76311C10.4022 9.62407 10.2603 9.51161 10.109 9.42134L9.85287 9.85076ZM10.0139 11.6468L9.93512 11.153C9.86907 11.1635 9.79959 11.1732 9.72685 11.1816L9.7844 11.6783L9.84194 12.175C9.92896 12.1649 10.0126 12.1533 10.0926 12.1405L10.0139 11.6468ZM9.7844 11.6783L9.72685 11.1816C9.70496 11.1842 9.68278 11.1866 9.66031 11.1889L9.71137 11.6863L9.76243 12.1837C9.78925 12.1809 9.81575 12.178 9.84195 12.175L9.7844 11.6783ZM9.71137 11.6863L9.66031 11.1889C9.34192 11.2216 8.96664 11.2303 8.54834 11.1908L8.50134 11.6886L8.45434 12.1864C8.94191 12.2324 9.38301 12.2226 9.76244 12.1837L9.71137 11.6863ZM12.0651 13.3912L12.2825 13.8415C12.7554 13.6132 13.3806 13.2711 13.8199 12.8643L13.4801 12.4974L13.1404 12.1306C12.8157 12.4313 12.3034 12.721 11.8478 12.9409L12.0651 13.3912ZM13.4801 12.4974L13.8199 12.8643C14.2544 12.4618 14.6814 11.8331 14.965 11.3786L14.5408 11.114L14.1166 10.8493C13.8362 11.2987 13.4687 11.8265 13.1404 12.1306L13.4801 12.4974ZM10.0687 11.5185L9.73988 11.1418C9.71289 11.1654 9.69241 11.1795 9.67912 11.1872C9.66563 11.1949 9.66609 11.1923 9.67962 11.1894L9.7844 11.6783L9.88918 12.1672C10.1045 12.121 10.2771 12.0003 10.3974 11.8952L10.0687 11.5185ZM9.7844 11.6783L9.67962 11.1894C9.68687 11.1878 9.69767 11.1863 9.71137 11.1863V11.6863V12.1863C9.77373 12.1863 9.83328 12.1792 9.88918 12.1672L9.7844 11.6783ZM10.1525 10.0956L9.77908 10.4281C9.97188 10.6446 9.95286 10.9559 9.73988 11.1418L10.0687 11.5185L10.3975 11.8952C11.0421 11.3326 11.0773 10.3824 10.526 9.76311L10.1525 10.0956ZM9.85287 9.85076L10.109 9.42134C9.03154 8.7787 7.69999 8.72462 6.4561 8.9656C5.2059 9.20782 3.9765 9.7598 3.04426 10.4209L3.3335 10.8288L3.62273 11.2366C4.44343 10.6546 5.54128 10.1614 6.6463 9.94735C7.75765 9.73204 8.80931 9.81052 9.59675 10.2802L9.85287 9.85076ZM11.5984 10.8724L11.2971 10.4735C10.8442 10.8156 10.4161 11.0763 9.93512 11.153L10.0139 11.6468L10.0926 12.1405C10.8269 12.0234 11.4189 11.6347 11.8998 11.2714L11.5984 10.8724ZM14.2832 9.96219L14.5845 9.56316C13.9813 9.10775 13.1049 9.10783 12.5019 9.56337L12.8032 9.96233L13.1046 10.3613C13.351 10.1751 13.7354 10.1751 13.9819 10.3612L14.2832 9.96219ZM14.2832 9.96219L13.9819 10.3612C14.1895 10.518 14.2012 10.7137 14.1166 10.8493L14.5408 11.114L14.965 11.3786C15.3639 10.7392 15.1418 9.98395 14.5845 9.56316L14.2832 9.96219ZM10.4048 13.876L10.4847 14.3696C11.0879 14.2719 11.7082 14.1187 12.2825 13.8415L12.0651 13.3912L11.8478 12.9409C11.3935 13.1601 10.8775 13.293 10.3249 13.3824L10.4048 13.876ZM6.85105 13.7977L6.75016 14.2875C7.96911 14.5386 9.25189 14.5691 10.4847 14.3696L10.4048 13.876L10.3249 13.3824C9.21356 13.5623 8.0533 13.5349 6.95194 13.308L6.85105 13.7977ZM4.84012 13.5924V14.0924C5.47986 14.0924 6.12722 14.1591 6.75016 14.2875L6.85105 13.7977L6.95194 13.308C6.26315 13.1661 5.54819 13.0924 4.84012 13.0924V13.5924ZM3.3335 10.3335H2.8335V13.6668H3.3335H3.8335V10.3335H3.3335ZM1.3335 13.6668H1.8335V10.3335H1.3335H0.833496V13.6668H1.3335ZM2.3335 14.6668V14.1668C2.05735 14.1668 1.8335 13.943 1.8335 13.6668H1.3335H0.833496C0.833496 14.4953 1.50507 15.1668 2.3335 15.1668V14.6668ZM3.3335 13.6668H2.8335C2.8335 13.943 2.60964 14.1668 2.3335 14.1668V14.6668V15.1668C3.16192 15.1668 3.8335 14.4953 3.8335 13.6668H3.3335ZM2.3335 9.3335V9.8335C2.60964 9.8335 2.8335 10.0574 2.8335 10.3335H3.3335H3.8335C3.8335 9.50507 3.16192 8.8335 2.3335 8.8335V9.3335ZM2.3335 9.3335V8.8335C1.50507 8.8335 0.833496 9.50507 0.833496 10.3335H1.3335H1.8335C1.8335 10.0574 2.05735 9.8335 2.3335 9.8335V9.3335Z" fill={color}/>
  </svg>
);
const DocumentAddIcon = ({ color = 'currentColor', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.12 5.35971L12.429 5.05076C12.9409 4.53885 13.7708 4.53885 14.2827 5.05076C14.7946 5.56266 14.7946 6.39261 14.2827 6.90451L13.9738 7.21347M12.12 5.35971C12.12 5.35971 12.1586 6.01625 12.7379 6.59555C13.3172 7.17485 13.9738 7.21347 13.9738 7.21347M12.12 5.35971L9.27961 8.20013C9.08722 8.39252 8.99103 8.48871 8.9083 8.59477C8.81071 8.71989 8.72705 8.85527 8.65878 8.9985C8.60091 9.11993 8.55789 9.24899 8.47185 9.5071L8.10727 10.6009M13.9738 7.21347L11.1334 10.0539C10.941 10.2463 10.8448 10.3425 10.7387 10.4252C10.6136 10.5228 10.4782 10.6065 10.335 10.6747C10.2136 10.7326 10.0845 10.7756 9.82639 10.8616L8.73264 11.2262M8.73264 11.2262L8.46528 11.3153C8.33826 11.3577 8.19822 11.3246 8.10354 11.23C8.00887 11.1353 7.97581 10.9952 8.01815 10.8682L8.10727 10.6009M8.73264 11.2262L8.10727 10.6009M5.33333 8.66683H7M5.33333 6.00016H9.66667M5.33333 11.3335H6.33333M13.219 2.11454C12.4379 1.3335 11.1808 1.3335 8.66667 1.3335H7.33333C4.81918 1.3335 3.5621 1.3335 2.78105 2.11454C2 2.89559 2 4.15267 2 6.66683V9.3335C2 11.8477 2 13.1047 2.78105 13.8858C3.5621 14.6668 4.81918 14.6668 7.33333 14.6668H8.66667C11.1808 14.6668 12.4379 14.6668 13.219 13.8858C13.8477 13.2571 13.9703 12.3199 13.9942 10.6668" stroke={color} strokeLinecap="round"/>
  </svg>
);

/* ─── Global CSS ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
  html, body, #root { height: 100%; width: 100%; font-family: 'Inter', sans-serif; background: #fff; overflow: hidden; }

  :root {
    --primary-500: #1A0647; --primary-400: #5020A0; --primary-300: #8C5AE2;
    --primary-200: #D7C0FF; --primary-100: #F5F0FF; --primary-50: #FCFAFF; --primary-25: #FDFDFF;
    --secondary-400: #A93F0A; --secondary-300: #F47A3E;
    --secondary-200: #FBCEB7; --secondary-100: #FEEEE7; --secondary-50: #FFF8F5;
    --neutral-500: #16181D; --neutral-400: #3A485F; --neutral-300: #6F7A90;
    --neutral-200: #8A94A8; --neutral-150: #D0D6E1; --neutral-100: #E9ECF1;
    --neutral-75: #F3F4F7; --neutral-50: #F6F7F8; --neutral-0: #FFFFFF;
  }

  .nav-item-inner { transition: background 0.15s ease; }
  .nav-item-wrap:hover .nav-item-inner { background: rgba(255,255,255,0.09) !important; }

  @keyframes ai-glow {
    0%, 100% { filter: drop-shadow(0 0 0px #1D9CAE) brightness(1); }
    50%       { filter: drop-shadow(0 0 5px #D378FF) brightness(1.2); }
  }
  .ai-icon-animate { animation: ai-glow 2s ease-in-out infinite; display: flex; }

  .ask-unity-btn {
    height: 32px; border-radius: 4px; padding: 0 8px;
    display: flex; align-items: center; gap: 4px;
    cursor: pointer; flex-shrink: 0;
    background: linear-gradient(#fff, #fff) padding-box,
                linear-gradient(to bottom, #1D9CAE, #D378FF) border-box;
    border: 0.5px solid transparent; white-space: nowrap;
  }
  .ask-unity-text {
    font-size: 14px; font-weight: 400; line-height: 1;
    background: linear-gradient(to bottom, #1D9CAE, #D378FF);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  @media (max-width: 1300px) { .topbar-schedule { display: none !important; } }
  @media (max-width: 900px) {
    .topbar-create-label { display: none !important; }
    .topbar-breadcrumb  { display: none !important; }
    .ask-unity-text     { display: none !important; }
  }
  @media (max-width: 700px) { .topbar-bell-badge { display: none !important; } }

  /* ── Drawer ── */
  @keyframes drawer-in  { from { transform: translateX(100%); opacity:0.4; } to { transform: translateX(0); opacity:1; } }
  @keyframes drawer-out { from { transform: translateX(0); opacity:1; }   to { transform: translateX(100%); opacity:0.4; } }
  .drawer-enter { animation: drawer-in  350ms cubic-bezier(0.32,0,0.15,1) forwards; }
  .drawer-exit  { animation: drawer-out 350ms cubic-bezier(0.32,0,0.15,1) forwards; }

  /* ── Action-button tooltips ── */
  [data-tip] { position: relative; }
  [data-tip]::after {
    content: attr(data-tip);
    position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%);
    background: #fff; color: var(--neutral-400);
    font-size: 11px; font-weight: 400; font-family: 'Inter', sans-serif;
    white-space: nowrap; padding: 4px 8px;
    border-radius: 4px; border: 0.5px solid var(--neutral-150);
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
    pointer-events: none; opacity: 0; transition: opacity 0.12s;
    z-index: 9000;
  }
  [data-tip]:hover::after { opacity: 1; }

  /* ── antd field overrides: scoped to drawer only ─────────────────────── */
  /* CSS variable overrides on antd v5 component root classes */
  .drawer-enter .ant-select-css-var,
  .drawer-exit  .ant-select-css-var {
    --ant-control-height: 32px;
    --ant-select-border-size: 0.5px;
    --ant-line-width: 0.5;
  }
  /* Select wrapper & selector */
  .drawer-enter .ant-select-single,
  .drawer-exit  .ant-select-single  { height: 32px !important; }
  .drawer-enter .ant-select-selector,
  .drawer-exit  .ant-select-selector {
    height: 32px !important;
    min-height: 32px !important;
    padding: 0 8px !important;
    border: 0.5px solid var(--neutral-200) !important;
    border-radius: 6px !important;
    box-shadow: none !important;
    font-size: 14px !important;
    font-family: 'Inter', sans-serif !important;
    display: flex !important;
    align-items: center !important;
  }
  /* Select text */
  .drawer-enter .ant-select-selection-item,
  .drawer-enter .ant-select-selection-placeholder,
  .drawer-exit  .ant-select-selection-item,
  .drawer-exit  .ant-select-selection-placeholder {
    font-size: 14px !important;
    font-family: 'Inter', sans-serif !important;
    line-height: 30px !important;
  }
  .drawer-enter .ant-select-selection-placeholder,
  .drawer-exit  .ant-select-selection-placeholder { color: var(--neutral-200) !important; font-weight: 400 !important; }
  .drawer-enter .ant-input::placeholder,
  .drawer-exit  .ant-input::placeholder { font-weight: 400 !important; color: var(--neutral-200) !important; }
  .drawer-enter .ant-select-selection-item,
  .drawer-exit  .ant-select-selection-item        { color: var(--neutral-400) !important; }
  /* Disabled Frequency */
  .drawer-enter .ant-select-disabled .ant-select-selector,
  .drawer-exit  .ant-select-disabled .ant-select-selector {
    background: var(--neutral-50) !important;
    cursor: not-allowed !important;
  }
  .drawer-enter .ant-select-disabled .ant-select-selection-item,
  .drawer-exit  .ant-select-disabled .ant-select-selection-item { color: var(--neutral-150) !important; }
  /* Plain Input (segment name, no affix) */
  .drawer-enter .ant-input:not(textarea),
  .drawer-exit  .ant-input:not(textarea) {
    height: 32px !important;
    min-height: 32px !important;
    padding: 0 8px !important;
    border: 0.5px solid var(--neutral-200) !important;
    border-radius: 6px !important;
    box-shadow: none !important;
    font-size: 14px !important;
    font-family: 'Inter', sans-serif !important;
    color: var(--neutral-400) !important;
  }
  /* TextArea */
  .drawer-enter textarea.ant-input,
  .drawer-exit  textarea.ant-input {
    height: 66px !important;
    min-height: 66px !important;
    max-height: 66px !important;
    padding: 8px !important;
    resize: none !important;
    border: 0.5px solid var(--neutral-200) !important;
    border-radius: 6px !important;
    box-shadow: none !important;
    font-size: 14px !important;
    font-family: 'Inter', sans-serif !important;
    color: var(--neutral-400) !important;
  }
  /* Hover / focus within drawer */
  .drawer-enter .ant-input:not(textarea):hover,
  .drawer-enter .ant-input:not(textarea):focus,
  .drawer-enter textarea.ant-input:hover,
  .drawer-enter textarea.ant-input:focus,
  .drawer-enter .ant-select:not(.ant-select-disabled):hover .ant-select-selector,
  .drawer-enter .ant-select-focused .ant-select-selector,
  .drawer-exit  .ant-input:not(textarea):hover,
  .drawer-exit  .ant-input:not(textarea):focus,
  .drawer-exit  textarea.ant-input:hover,
  .drawer-exit  textarea.ant-input:focus,
  .drawer-exit  .ant-select:not(.ant-select-disabled):hover .ant-select-selector,
  .drawer-exit  .ant-select-focused .ant-select-selector {
    border: 0.5px solid var(--primary-300) !important;
    box-shadow: 0 0 0 3px var(--primary-100) !important;
  }
  /* ── Antd Select option selected state ── */
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: var(--primary-50) !important;
    border: 0.5px solid var(--primary-200) !important;
    border-radius: 4px !important;
    margin: 2px 4px !important;
    box-sizing: border-box !important;
  }
  .ant-select-item-option {
    border-radius: 4px !important;
    margin: 2px 4px !important;
  }
  /* DatePicker border */
  .ant-picker { border: 0.5px solid var(--neutral-150) !important; border-radius: 6px !important; font-family: 'Inter', sans-serif !important; font-size: 12px !important; box-shadow: none !important; }
  .ant-picker:hover, .ant-picker-focused { border: 0.5px solid var(--primary-300) !important; box-shadow: 0 0 0 3px var(--primary-100) !important; }
  .ant-picker-input > input { font-size: 12px !important; font-family: 'Inter', sans-serif !important; color: var(--neutral-400) !important; }
  .ant-picker-input > input::placeholder { color: var(--neutral-200) !important; }
  .ant-picker-separator { color: var(--neutral-300) !important; }
  .ant-input::placeholder, .ant-input-affix-wrapper .ant-input::placeholder { color: var(--neutral-200) !important; }

  /* ── Patients Menu ── */
  .pm-item {
    display: flex; align-items: center; gap: 8px;
    padding: 0 12px 0 28px; height: 32px;
    font-size: 14px; font-weight: 400; color: var(--neutral-500);
    cursor: pointer; transition: background 0.1s; user-select: none;
  }
  .pm-item:hover { background: var(--neutral-50); }
  .pm-item.active { background: var(--primary-50); color: var(--primary-300); }
  .pm-section-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 8px 0 12px; height: 32px;
    font-size: 14px; font-weight: 500; color: var(--neutral-500);
    cursor: pointer; user-select: none; transition: background 0.1s;
  }
  .pm-section-header:hover { background: var(--neutral-50); }
  .pm-group-label {
    display: flex; align-items: center; padding: 4px 12px;
    font-size: 12px; font-weight: 400; color: var(--neutral-300);
  }

  /* ── Table ── */
  .wl-action-btn { opacity: 0; transition: opacity 0.1s; }
  .wl-action-show .wl-action-btn { opacity: 1; }

  /* ── Patient search input placeholder ── */
  .pat-search-input::placeholder { color: var(--neutral-200) !important; font-weight: 400; }

  /* ── Thin scrollbar ── */
  .thin-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
  .thin-scroll::-webkit-scrollbar-track { background: transparent; }
  .thin-scroll::-webkit-scrollbar-thumb { background: var(--neutral-150); border-radius: 3px; }
  .thin-scroll::-webkit-scrollbar-thumb:hover { background: var(--neutral-200); }

  /* ── Pagination ── */
  .pg-btn {
    min-width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    border: 0.5px solid var(--neutral-150); border-radius: 4px;
    background: var(--neutral-0); color: var(--neutral-400);
    font-size: 13px; font-weight: 400; cursor: pointer; transition: background 0.1s;
  }
  .pg-btn:hover { background: var(--neutral-50); }
  .pg-btn.active { background: var(--primary-300); color: #fff; border-color: var(--primary-300); font-weight: 500; }
  .pg-btn.dots { border: none; background: transparent; cursor: default; color: var(--neutral-300); }

  /* ── Population Groups ── */
  @keyframes pg-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pg-spin-rev {
    to { transform: rotate(-360deg); }
  }
  @keyframes pg-pulse {
    0%, 100% { opacity:1; transform:scale(1); }
    50%       { opacity:0.65; transform:scale(0.88); }
  }
  @keyframes pg-progress {
    0%   { left:-40%; }
    50%  { left: 40%; }
    100% { left:120%; }
  }
  @keyframes pg-slide-up {
    from { transform:translateY(18px); opacity:0; }
    to   { transform:translateY(0);    opacity:1; }
  }
  @keyframes pg-dot-pulse {
    0%, 80%, 100% { transform:scale(0.55); opacity:0.25; background:var(--primary-200); }
    40%           { transform:scale(1);    opacity:1;    background:var(--primary-300); }
  }
  @keyframes pg-shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes pg-badge-pop {
    0%   { transform:scale(0.4); opacity:0; }
    60%  { transform:scale(1.15); }
    100% { transform:scale(1);   opacity:1; }
  }
  @keyframes pg-step-check {
    from { transform:scale(0) rotate(-20deg); opacity:0; }
    to   { transform:scale(1) rotate(0deg);  opacity:1; }
  }
  @keyframes pg-fade-up {
    from { transform:translateY(10px); opacity:0; }
    to   { transform:translateY(0);    opacity:1; }
  }
  @keyframes toast-in {
    from { transform:translateY(-120%); opacity:0; }
    to   { transform:translateY(0);     opacity:1; }
  }
  @keyframes toast-out {
    from { transform:translateY(0);     opacity:1; }
    to   { transform:translateY(-120%); opacity:0; }
  }
  .toast-enter { animation: toast-in  280ms cubic-bezier(0.32,0,0.15,1) forwards; }
  .toast-exit  { animation: toast-out 260ms cubic-bezier(0.32,0,0.15,1) forwards; }
  @keyframes row-slide-out {
    0%   { transform: translateX(0);    opacity: 1; max-height: 400px; }
    55%  { transform: translateX(80px); opacity: 0; max-height: 400px; }
    100% { transform: translateX(80px); opacity: 0; max-height: 0;   padding-top: 0; padding-bottom: 0; border-width: 0; }
  }
  .row-removing { animation: row-slide-out 0.35s cubic-bezier(0.32,0,0.15,1) forwards; overflow: hidden; pointer-events: none; }
  tr:hover .pg-row-actions { opacity:1 !important; }
  .pg-type-card:hover { border-color:var(--primary-200) !important; background:var(--primary-50) !important; }
  .pg-crit-select:focus { border-color:var(--primary-300) !important; outline:none; }
  .pg-input:focus { border-color:var(--primary-300) !important; box-shadow:0 0 0 3px var(--primary-100) !important; outline:none; }
`;

/* ─── Nav data ───────────────────────────────────────────────────────────── */
const NAV_MAIN = [
  { id: 'home',       label: 'Home',            Icon: HomeLinear,                 badge: false },
  { id: 'population', label: 'Population',       Icon: UserCircleLinear,           badge: false },
  { id: 'calendar',   label: 'Calendar',         Icon: CalendarMinimalisticLinear, badge: false },
  { id: 'tasks',      label: 'Tasks',            Icon: ClipboardListLinear,        badge: false },
  { id: 'comms',      label: 'Comms',            Icon: ChatRoundLinear,            badge: true  },
  { id: 'calls',      label: 'Calls',            Icon: PhoneCallingLinear,         badge: false },
  { id: 'leads',      label: 'Leads &\nContact', Icon: UsersGroupTwoRoundedLinear, badge: false },
  { id: 'campaign',   label: 'Campaign',         Icon: VolumeLoudLinear,           badge: false },
  { id: 'analytics',  label: 'Analytics',        Icon: PieChartLinear,             badge: false },
  { id: 'settings',   label: 'Settings',         Icon: SettingsLinear,             badge: false },
];
const NAV_BOTTOM = [
  { id: 'help', label: 'Help', Icon: QuestionCircleLinear, active: false, badge: false },
];

/* ─── NavItem ────────────────────────────────────────────────────────────── */
function NavItem({ label, Icon, active, badge }) {
  const [hovered, setHovered] = useState(false);
  const dim = active ? '#fff' : hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)';
  return (
    <div className="nav-item-wrap" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', width: 64, height: 64, margin: '1px 4px', cursor: 'pointer', flexShrink: 0 }}>
      <div className="nav-item-inner" style={{
        position: 'absolute', inset: 2, borderRadius: 12,
        background: active ? 'var(--primary-400)' : 'transparent',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
      }}>
        <Icon size={20} color={dim} />
        <span style={{ fontSize: 10, fontWeight: 400, color: dim, lineHeight: '12px', textAlign: 'center', whiteSpace: 'pre-line', maxWidth: 54 }}>{label}</span>
      </div>
      {badge && (
        <div style={{ position:'absolute', top:6, right:6, minWidth:16, height:16, borderRadius:6, background:'var(--secondary-300)', border:'1.5px solid var(--primary-500)', zIndex:2, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 4px' }}>
          <span style={{ fontSize:9, fontWeight:700, color:'#fff', lineHeight:1 }}>3</span>
        </div>
      )}
    </div>
  );
}

/* ─── ProviderNavMenu ────────────────────────────────────────────────────── */
function ProviderNavMenu({ activeTab, onTabChange }) {
  return (
    <nav style={{ width: 72, height: '100vh', flexShrink: 0, background: 'var(--primary-500)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, paddingBottom: 8, overflow: 'hidden', zIndex: 200 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {NAV_MAIN.map(({ id, ...p }) => (
          <div key={id} onClick={() => onTabChange && onTabChange(id)} style={{ width: '100%' }}>
            <NavItem {...p} active={activeTab === id} />
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {NAV_BOTTOM.map(({ id, ...p }) => (
          <div key={id} onClick={() => onTabChange && onTabChange(id)} style={{ width: '100%' }}>
            <NavItem {...p} active={activeTab === id} />
          </div>
        ))}
      </div>
    </nav>
  );
}

/* ─── FoldLogo ───────────────────────────────────────────────────────────── */
function FoldLogo({ height = 32 }) {
  const w = Math.round((351 / 65) * height);
  return (
    <svg width={w} height={height} viewBox="0 0 351 65" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M65 32.5C65 35.6576 63.7456 38.686 61.5128 40.9188C59.28 43.1516 56.2517 44.4059 53.0941 44.4059H32.5C30.7817 44.4059 29.1019 44.9155 27.6731 45.8701C26.2444 46.8248 25.1308 48.1817 24.4732 49.7693C23.8157 51.3568 23.6436 53.1037 23.9788 54.789C24.3141 56.4743 25.1415 58.0224 26.3566 59.2375C27.5716 60.4525 29.1197 61.28 30.805 61.6152C32.4904 61.9505 34.2373 61.7784 35.8248 61.1208C37.4124 60.4633 38.7692 59.3497 39.7239 57.9209C40.6786 56.4922 41.1881 54.8124 41.1881 53.0941V47.6238C41.1881 47.197 41.3576 46.7878 41.6594 46.4861C41.9611 46.1844 42.3703 46.0148 42.797 46.0148C43.2237 46.0148 43.633 46.1844 43.9347 46.4861C44.2364 46.7878 44.4059 47.197 44.4059 47.6238V53.0941C44.4059 55.4488 43.7077 57.7507 42.3994 59.7086C41.0912 61.6666 39.2317 63.1926 37.0562 64.0937C34.8807 64.9948 32.4868 65.2306 30.1773 64.7712C27.8677 64.3118 25.7463 63.1779 24.0812 61.5128C22.4162 59.8478 21.2822 57.7263 20.8228 55.4168C20.3634 53.1073 20.5992 50.7134 21.5004 48.5378C22.4015 46.3623 23.9275 44.5029 25.8854 43.1946C27.8433 41.8864 30.1452 41.1881 32.5 41.1881H53.0941C55.3983 41.1881 57.6082 40.2728 59.2375 38.6434C60.8668 37.0141 61.7822 34.8042 61.7822 32.5C61.7822 30.1958 60.8668 27.9859 59.2375 26.3566C57.6082 24.7272 55.3983 23.8119 53.0941 23.8119H47.6238C47.1971 23.8119 46.7878 23.6424 46.4861 23.3406C46.1844 23.0389 46.0149 22.6297 46.0149 22.203C46.0149 21.7763 46.1844 21.367 46.4861 21.0653C46.7878 20.7636 47.1971 20.5941 47.6238 20.5941H53.0941C56.2517 20.5941 59.28 21.8484 61.5128 24.0812C63.7456 26.314 65 29.3423 65 32.5ZM23.8119 27.0297C23.8119 26.603 23.6424 26.1938 23.3406 25.892C23.0389 25.5903 22.6297 25.4208 22.203 25.4208C21.7763 25.4208 21.367 25.5903 21.0653 25.892C20.7636 26.1938 20.5941 26.603 20.5941 27.0297V32.5C20.5941 34.2183 20.0845 35.8981 19.1299 37.3269C18.1752 38.7556 16.8183 39.8692 15.2307 40.5268C13.6432 41.1844 11.8963 41.3564 10.211 41.0212C8.52565 40.6859 6.97757 39.8585 5.76252 38.6434C4.54746 37.4284 3.72 35.8803 3.38477 34.195C3.04954 32.5096 3.22159 30.7627 3.87917 29.1752C4.53676 27.5877 5.65033 26.2308 7.07909 25.2761C8.50784 24.3214 10.1876 23.8119 11.9059 23.8119H37.9703C38.3944 23.8036 38.7989 23.6315 39.0989 23.3315C39.3988 23.0316 39.571 22.6271 39.5792 22.203C39.5792 21.7763 39.4097 21.367 39.108 21.0653C38.8062 20.7636 38.397 20.5941 37.9703 20.5941H11.9059C9.55117 20.5941 7.24929 21.2923 5.29136 22.6006C3.33344 23.9088 1.80742 25.7683 0.906291 27.9438C0.00515914 30.1193 -0.230619 32.5132 0.228774 34.8227C0.688168 37.1323 1.8221 39.2537 3.48718 40.9188C5.15225 42.5838 7.27369 43.7178 9.58321 44.1772C11.8927 44.6366 14.2866 44.4008 16.4622 43.4996C18.6377 42.5985 20.4971 41.0725 21.8054 39.1146C23.1136 37.1567 23.8119 34.8548 23.8119 32.5V27.0297ZM22.203 18.9851C22.6271 18.9769 23.0316 18.8048 23.3315 18.5048C23.6315 18.2048 23.8036 17.8004 23.8119 17.3762V11.9059C23.8119 9.60171 24.7272 7.39185 26.3566 5.76251C27.9859 4.13317 30.1958 3.21782 32.5 3.21782C34.8042 3.21782 37.0141 4.13317 38.6434 5.76251C40.2728 7.39185 41.1881 9.60171 41.1881 11.9059V37.9703C41.1881 38.397 41.3576 38.8062 41.6594 39.108C41.9611 39.4097 42.3703 39.5792 42.797 39.5792C43.2212 39.571 43.6256 39.3988 43.9256 39.0989C44.2256 38.7989 44.3977 38.3944 44.4059 37.9703V11.9059C44.4059 10.3424 44.098 8.79423 43.4997 7.34973C42.9013 5.90524 42.0243 4.59274 40.9188 3.48717C39.8132 2.3816 38.5007 1.50461 37.0562 0.906284C35.6117 0.307954 34.0635 0 32.5 0C30.9365 0 29.3883 0.307954 27.9438 0.906284C26.4993 1.50461 25.1868 2.3816 24.0812 3.48717C22.9757 4.59274 22.0987 5.90524 21.5004 7.34973C20.902 8.79423 20.5941 10.3424 20.5941 11.9059V17.3762C20.5941 17.8029 20.7636 18.2122 21.0653 18.5139C21.367 18.8156 21.7763 18.9851 22.203 18.9851Z" fill="#8C5AE2"/>
      <path d="M88.4442 21.9821C86.849 23.4 86.0219 25.5269 86.0219 28.3038V32.3213H102.151V36.6933H86.0219V50.9318H81V28.2447C81 24.2272 82.2998 21.0368 84.8403 18.7326C87.3807 16.4285 90.9847 15.3059 95.593 15.3059C97.483 15.3007 99.3669 15.5188 101.206 15.9558C102.826 16.3602 104.365 17.0396 105.755 17.9646L104.101 22.1003C101.613 20.4693 98.684 19.6441 95.7112 19.737C92.5208 19.737 90.0985 20.5051 88.4442 21.9821Z" fill="#8C5AE2"/>
      <path d="M113.317 49.4547C111.244 48.334 109.525 46.656 108.355 44.6101C107.191 42.4493 106.582 40.0336 106.582 37.5795C106.582 35.1254 107.191 32.7096 108.355 30.5488C109.525 28.5029 111.244 26.8249 113.317 25.7042C115.522 24.5787 117.961 23.9919 120.437 23.9919C122.912 23.9919 125.351 24.5787 127.556 25.7042C129.6 26.8435 131.295 28.5184 132.46 30.5488C133.66 32.6977 134.29 35.1181 134.29 37.5795C134.29 40.0409 133.66 42.4613 132.46 44.6101C131.295 46.6405 129.6 48.3154 127.556 49.4547C125.363 50.6186 122.919 51.2272 120.437 51.2272C117.954 51.2272 115.51 50.6186 113.317 49.4547ZM125.015 45.7917C126.372 45.015 127.479 43.8672 128.206 42.4832C128.983 40.9656 129.389 39.2847 129.389 37.5795C129.389 35.8742 128.983 34.1934 128.206 32.6757C127.479 31.2917 126.372 30.1439 125.015 29.3672C123.601 28.6319 122.031 28.248 120.437 28.248C118.843 28.248 117.272 28.6319 115.858 29.3672C114.483 30.1403 113.357 31.2876 112.608 32.6757C111.831 34.1934 111.425 35.8742 111.425 37.5795C111.425 39.2847 111.831 40.9656 112.608 42.4832C113.357 43.8714 114.483 45.0187 115.858 45.7917C117.259 46.5676 118.835 46.9746 120.437 46.9746C122.038 46.9746 123.614 46.5676 125.015 45.7917Z" fill="#8C5AE2"/>
      <path d="M141.026 13.7698H145.871V50.9318H141.026V13.7698Z" fill="#8C5AE2"/>
      <path d="M180.256 13.7698V50.9318H175.648V46.6779C174.606 48.1367 173.2 49.2977 171.571 50.0456C169.868 50.8325 168.012 51.2358 166.136 51.2272C163.704 51.2557 161.305 50.6661 159.164 49.5138C157.167 48.3529 155.515 46.6807 154.379 44.6692C153.219 42.4882 152.63 40.0494 152.665 37.5795C152.614 35.1079 153.204 32.6651 154.379 30.4898C155.499 28.4819 157.156 26.8251 159.164 25.7042C161.305 24.5519 163.704 23.9624 166.136 23.9909C167.944 23.9723 169.735 24.3347 171.394 25.0543C172.972 25.776 174.351 26.871 175.411 28.2447V13.7698H180.256ZM171.098 45.7917C172.473 45.0187 173.6 43.8714 174.348 42.4832C175.086 40.9538 175.469 39.2776 175.469 37.5795C175.469 35.8814 175.086 34.2051 174.348 32.6757C173.6 31.2876 172.473 30.1403 171.098 29.3672C169.684 28.6319 168.114 28.248 166.52 28.248C164.926 28.248 163.355 28.6319 161.941 29.3672C160.58 30.1575 159.457 31.3005 158.691 32.6757C157.914 34.1934 157.508 35.8742 157.508 37.5795C157.508 39.2848 157.914 40.9656 158.691 42.4832C159.457 43.8584 160.58 45.0014 161.941 45.7917C163.342 46.5676 164.918 46.9747 166.52 46.9747C168.122 46.9747 169.697 46.5676 171.098 45.7917Z" fill="#8C5AE2"/>
      <path d="M211.983 26.9449C213.991 28.8946 214.996 31.7895 214.996 35.5707V50.9318H210.151V36.1024C210.151 33.5029 209.501 31.6123 208.26 30.2534C207.02 28.8946 205.247 28.3038 202.943 28.3038C200.639 28.3038 198.276 29.0718 196.74 30.6079C195.204 32.144 194.495 34.33 194.495 37.1659V50.9318H189.65V13.7698H194.495V28.0084C195.549 26.7113 196.909 25.6963 198.453 25.0543C200.17 24.3221 202.022 23.9598 203.888 23.9909C207.315 23.9909 209.974 24.9952 211.983 26.9449Z" fill="#8C5AE2"/>
      <path d="M248.199 39.1746H226.576C226.815 41.3952 227.919 43.4324 229.648 44.8464C231.519 46.2979 233.839 47.0502 236.206 46.9733C239.396 46.9733 241.996 45.9099 243.945 43.783L246.604 46.8551C245.373 48.2646 243.837 49.3757 242.114 50.1046C240.193 50.8509 238.149 51.2317 236.088 51.2272C233.477 51.2786 230.896 50.6689 228.584 49.4547C226.463 48.3572 224.701 46.6763 223.503 44.6101C222.303 42.4638 221.691 40.0383 221.731 37.5795C221.693 35.1396 222.305 32.7336 223.503 30.6079C224.58 28.5568 226.22 26.8556 228.23 25.7042C230.353 24.5592 232.73 23.9698 235.142 23.9908C237.518 23.9609 239.86 24.5515 241.937 25.7042C243.929 26.8593 245.549 28.561 246.604 30.6079C247.764 32.7889 248.353 35.2277 248.317 37.6976C248.317 38.1112 248.258 38.5838 248.199 39.1746ZM229.293 30.1943C227.754 31.6379 226.789 33.5894 226.576 35.6889H243.65C243.464 33.5817 242.494 31.621 240.932 30.1943C239.352 28.76 237.275 27.9971 235.142 28.0674C232.994 28.0122 230.904 28.7721 229.293 30.1943Z" fill="#8C5AE2"/>
      <path d="M280.93 24.2272V50.9318H276.322V46.678C275.28 48.1367 273.874 49.2977 272.245 50.0456C270.542 50.8325 268.686 51.2358 266.81 51.2272C264.396 51.2641 262.014 50.6737 259.897 49.5138C257.869 48.3732 256.193 46.6973 255.053 44.6692C253.893 42.4882 253.304 40.0494 253.339 37.5795C253.288 35.1079 253.878 32.6651 255.053 30.4898C256.179 28.4661 257.86 26.8059 259.897 25.7042C262.014 24.5444 264.396 23.954 266.81 23.9909C268.618 23.9724 270.409 24.3347 272.068 25.0543C273.653 25.7912 275.048 26.8828 276.144 28.2447V24.2272H280.93ZM271.772 45.7917C273.159 45.0351 274.29 43.8835 275.022 42.4832C275.76 40.9538 276.143 39.2776 276.143 37.5795C276.143 35.8814 275.76 34.2052 275.022 32.6758C274.29 31.2754 273.159 30.1239 271.772 29.3672C270.358 28.6319 268.788 28.248 267.194 28.248C265.6 28.248 264.029 28.6319 262.615 29.3672C261.254 30.1575 260.131 31.3006 259.365 32.6758C258.588 34.1934 258.182 35.8742 258.182 37.5795C258.182 39.2848 258.588 40.9656 259.365 42.4832C260.131 43.8584 261.254 45.0015 262.615 45.7917C264.016 46.5676 265.592 46.9747 267.194 46.9747C268.795 46.9747 270.371 46.5676 271.772 45.7917Z" fill="#8C5AE2"/>
      <path d="M290.088 13.7698H294.932V50.9318H290.088V13.7698Z" fill="#8C5AE2"/>
      <path d="M320.396 49.3366C319.62 49.9586 318.74 50.4386 317.796 50.7545C316.74 51.0603 315.647 51.2194 314.547 51.2272C311.888 51.2272 309.761 50.4591 308.344 49.0412C306.926 47.6232 306.098 45.5554 306.098 42.8377V28.2447H301.549V24.2272H306.098V18.4372H310.943V24.2272H318.565V28.2447H310.943V42.6604C310.865 43.8583 311.245 45.0412 312.007 45.969C312.408 46.3687 312.889 46.6802 313.418 46.8836C313.947 47.0871 314.513 47.178 315.079 47.1506C316.457 47.2018 317.805 46.7385 318.86 45.8508L320.396 49.3366Z" fill="#8C5AE2"/>
      <path d="M347.987 26.9449C349.996 28.8946 351 31.7895 351 35.5707V50.9318H346.155V36.1024C346.155 33.5029 345.505 31.6123 344.265 30.2534C343.024 28.8946 341.252 28.3038 338.947 28.3038C336.643 28.3038 334.28 29.0718 332.744 30.6079C331.208 32.144 330.499 34.33 330.499 37.1659V50.9318H325.654V13.7698H330.499V28.0084C331.554 26.7113 332.914 25.6963 334.457 25.0543C336.174 24.3221 338.026 23.9598 339.893 23.9909C343.319 23.9909 345.978 24.9952 347.987 26.9449Z" fill="#8C5AE2"/>
    </svg>
  );
}

/* ─── Breadcrumb helpers ─────────────────────────────────────────────────── */
const COMMS_LABELS = {
  assigned:   'Assigned to Me',
  mentions:   'Mentions',
  others:     'Assigned to Others',
  unassigned: 'Unassigned',
  missed:     'Missed Calls',
  starred:    'Starred',
  archived:   'Archived',
  all:        'All Conversations',
  chat:       'Chat',
  sms:        'SMS',
  calls:      'Calls',
  email:      'Email',
  efax:       'E-fax',
  internal:   'Internal Chat',
};

function getSecondaryLabel(activeNavTab, activeNavItem, activeCommsItem) {
  if (activeNavTab === 'comms') return COMMS_LABELS[activeCommsItem] || activeCommsItem || '';
  const pop = PM_POPULATION.find(o => o.label === activeNavItem);
  if (pop) return pop.display || activeNavItem.replace('pg:', '');
  return activeNavItem || '';
}

/* ─── TopNavBar ──────────────────────────────────────────────────────────── */
function TopNavBar({ activeNavItem, activeNavTab, activeCommsItem }) {
  const mainLabel      = NAV_MAIN.find(n => n.id === activeNavTab)?.label?.replace('\n', ' ') || 'Population';
  const secondaryLabel = getSecondaryLabel(activeNavTab, activeNavItem || 'TOC IP List', activeCommsItem);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', height: 48, flexShrink: 0, background: 'var(--neutral-0)', borderBottom: '1px solid var(--neutral-150)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <FoldLogo height={20} />
        <span style={{ fontSize: 14, color: 'var(--neutral-150)', fontWeight: 400, lineHeight: 1, userSelect: 'none' }}>/</span>
        <div className="topbar-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--neutral-200)' }}>{mainLabel}</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--neutral-200)' }}>/</span>
          <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--neutral-400)' }}>{secondaryLabel}</span>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minWidth: 0 }}>
        <div style={{ flexShrink: 0, width: 'auto' }}>
          <Input
            prefix={<MagniferLinear size={14} color="var(--neutral-200)" />}
            placeholder="Search Patients or Members"
            style={{ height: 32, fontSize: 14, width: 220 }}
          />
        </div>
        <button className="ask-unity-btn">
          <span className="ai-icon-animate">
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sp0" x1="6" y1="-9.42" x2="-8.3009" y2="-0.391016" gradientUnits="userSpaceOnUse"><stop stopColor="#1E9DAE"/><stop offset="1" stopColor="#D478FF"/></linearGradient>
                <linearGradient id="sp1" x1="6" y1="-9.42" x2="-8.3009" y2="-0.391016" gradientUnits="userSpaceOnUse"><stop stopColor="#1E9DAE"/><stop offset="1" stopColor="#D478FF"/></linearGradient>
              </defs>
              <path d="M3.35559 0.438563C3.58622 -0.146188 4.41378 -0.146187 4.64441 0.438564L5.35909 2.25066C5.4295 2.42919 5.57081 2.5705 5.74934 2.64091L7.56144 3.35559C8.14619 3.58622 8.14619 4.41378 7.56144 4.64441L5.74934 5.35909C5.57081 5.4295 5.4295 5.57081 5.35909 5.74934L4.64441 7.56144C4.41378 8.14619 3.58622 8.14619 3.35559 7.56144L2.64091 5.74934C2.5705 5.57081 2.42919 5.4295 2.25066 5.35909L0.438563 4.64441C-0.146188 4.41378 -0.146187 3.58622 0.438564 3.35559L2.25066 2.64091C2.42919 2.5705 2.5705 2.42919 2.64091 2.25066L3.35559 0.438563Z" fill="url(#sp0)"/>
              <path d="M8.99232 6.89875C9.11436 6.5893 9.55231 6.5893 9.67435 6.89875L10.2081 8.25206C10.2453 8.34653 10.3201 8.42132 10.4146 8.45858L11.7679 8.99232C12.0774 9.11436 12.0774 9.55231 11.7679 9.67435L10.4146 10.2081C10.3201 10.2453 10.2453 10.3201 10.2081 10.4146L9.67435 11.7679C9.55231 12.0774 9.11436 12.0774 8.99232 11.7679L8.45858 10.4146C8.42132 10.3201 8.34653 10.2453 8.25206 10.2081L6.89875 9.67435C6.5893 9.55231 6.5893 9.11436 6.89875 8.99232L8.25206 8.45858C8.34653 8.42132 8.42132 8.34653 8.45858 8.25206L8.99232 6.89875Z" fill="url(#sp1)"/>
            </svg>
          </span>
          <span className="ask-unity-text">Ask Unity</span>
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <button style={{ position: 'relative', width: 32, height: 32, border: '1px solid var(--neutral-150)', borderRadius: 6, background: 'var(--neutral-0)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <BellLinear size={18} color="var(--neutral-300)" />
          <span style={{ position: 'absolute', top: 3, right: 3, width: 14, height: 14, borderRadius: 4, background: 'var(--secondary-300)', border: '1.5px solid #fff', fontSize: 8, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>8</span>
        </button>
        <div style={{ width: 1, height: 20, background: 'var(--neutral-150)' }} />
        <button style={{ height: 32, padding: '0 14px', background: 'var(--primary-300)', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-400)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--primary-300)'}>
          <span className="topbar-create-label">Create New</span>
        </button>
        <button className="topbar-schedule" style={{ height: 32, padding: '0 14px', background: 'var(--neutral-0)', color: 'var(--neutral-300)', border: '1px solid var(--neutral-150)', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--neutral-50)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--neutral-0)'}>Schedule</button>
        <div style={{ width: 1, height: 20, background: 'var(--neutral-150)' }} />
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--secondary-100)', border: '1.5px solid var(--secondary-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 400, color: 'var(--secondary-300)', cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}>DC</div>
      </div>
    </header>
  );
}

/* ─── Patients Menu data ─────────────────────────────────────────────────── */
const PM_WORKLIST_PRIVATE = ['Day Optimizer','Review HRA','IP Visits','High Risk','High Cost','Stable','Care In-progress'];
const PM_WORKLIST_SHARED  = [
  { label:'TOC IP List', badge:10 },
  { label:'SNP List',    badge:24 },
  { label:'AWV List',    badge:18 },
  { label:'TOC ED List', badge:7  },
  { label:'HIU List',    badge:32 },
  { label:'DM List',     badge:15 },
  { label:'HEDIS List',  badge:9  },
];
const PM_PATIENTS         = [{ label:'My Patients', badge:8 },{ label:'All Patients', badge:8 }];
const PM_POPULATION       = [{ label:'pg:All', display:'All', badge:8 },{ label:'pg:Static', display:'Static', badge:8 },{ label:'pg:Dynamic', display:'Dynamic', badge:8 }];
const PM_EMPLOYERS        = [{ label:'Active', badge:8 },{ label:'Not Qualified', badge:8 },{ label:'Lost', badge:8 }];
const PM_LEADS            = [{ label:'Leads', badge:8 },{ label:'Supporting Members', badge:8 },{ label:'Others', badge:8 }];

/* ─── PatientsMenu ───────────────────────────────────────────────────────── */
function PatientsMenu({ activeItem, onSelect, collapsed }) {
  const [expanded, setExpanded] = useState({ worklists:true, patients:true, population:false, employers:false, leads:false });
  const toggle = k => setExpanded(p => ({ ...p, [k]: !p[k] }));

  const SectionHeader = ({ id, label }) => (
    <div className="pm-section-header" onClick={() => {
      toggle(id);
      if (id === 'population') onSelect('pg:All');
    }}>
      <span>{label}</span>
      {expanded[id] ? <AltArrowDownLinear size={16} color="var(--neutral-300)" /> : <AltArrowRightLinear size={16} color="var(--neutral-300)" />}
    </div>
  );

  const Item = ({ label, display, badge }) => (
    <div className={`pm-item${activeItem === label ? ' active' : ''}`} style={{ paddingLeft: 20 }} onClick={() => onSelect(label)}>
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{display || label}</span>
      {badge != null && (
        <span style={{ fontSize: 10, fontWeight: 500, color: activeItem === label ? 'var(--primary-300)' : 'var(--neutral-300)', background: activeItem === label ? 'var(--primary-100)' : 'var(--neutral-75)', borderRadius: 4, padding: '1px 5px', flexShrink: 0 }}>{badge}</span>
      )}
    </div>
  );

  /* grey badge for both list labels per Fold design system */
  const GroupLabel = ({ text }) => (
    <div className="pm-group-label">
      <span style={{ fontSize: 11, background: 'var(--neutral-75)', color: 'var(--neutral-300)', border: '0.5px solid var(--neutral-150)', borderRadius: 4, padding: '1px 6px', fontWeight: 500 }}>{text}</span>
    </div>
  );

  return (
    <div style={{ width: collapsed ? 0 : 190, minWidth: collapsed ? 0 : 190, display: 'flex', flexDirection: 'column', background: 'var(--neutral-0)', borderRight: collapsed ? 'none' : '0.5px solid var(--neutral-150)', overflow: 'hidden', transition: 'width 0.25s ease, min-width 0.25s ease' }}>
      {/* Nav */}
      <div className="thin-scroll" style={{ flex: 1, overflowY: 'auto' }}>
        <SectionHeader id="worklists" label="Worklists" />
        {expanded.worklists && (
          <>
            <GroupLabel text="Private List" />
            {PM_WORKLIST_PRIVATE.map(l => <Item key={l} label={l} />)}
            <GroupLabel text="Shared List" />
            {PM_WORKLIST_SHARED.map(({ label, badge }) => <Item key={label} label={label} badge={badge} />)}
          </>
        )}
        <SectionHeader id="patients" label="Patients" />
        {expanded.patients && PM_PATIENTS.map(({ label, badge }) => <Item key={label} label={label} badge={badge} />)}
        <SectionHeader id="population" label="Population Groups" />
        {expanded.population && PM_POPULATION.map(({ label, display, badge }) => <Item key={label} label={label} display={display} badge={badge} />)}
        <SectionHeader id="employers" label="Employers" />
        {expanded.employers && PM_EMPLOYERS.map(({ label, badge }) => <Item key={label} label={label} badge={badge} />)}
        <SectionHeader id="leads" label="Leads & Contacts" />
        {expanded.leads && PM_LEADS.map(({ label, badge }) => <Item key={label} label={label} badge={badge} />)}
      </div>
    </div>
  );
}

/* ─── AWV table data — columns from 311-28666, values from 311-28684 ─────── */
const AWV_PATIENTS = [
  { initials:'AB', name:'Anna Brown',       memberId:'#324966', gender:'F', age:'58y 2m', statusCode:'En', utr:'UTR(45d)', status:'New',       admitClass:'Inpatient', nextActionDue:'04/15/2026', nextActionCount:3, lastActionMissed:'03/20/2026', lastMissedCount:2, lastOutreach:{ status:'Successful',    date:'3/12/26', dots:['#CF1322','#CF1322','#059669'] }, assigneeInit:'RW', assignee:'Dr. Deborah Hintz',   startDate:'08/03/2024', lastAdmission:'03/01/2026', laceAcuity:7,  readmission:'No',  riskLevel:'High Risk',   tasks:7, carePlan:'Signed',       action:'View Program'     },
  { initials:'HB', name:'Harold Baker',     memberId:'#312841', gender:'M', age:'67y 5m', statusCode:'NE', utr:'UTR(12d)', status:'Engaged',   admitClass:'-',         nextActionDue:'-',           nextActionCount:null, lastActionMissed:'-',           lastMissedCount:null, lastOutreach:null, assigneeInit:'EC', assignee:'Dr. Emily Carter',    startDate:'09/15/2024', lastAdmission:'03/15/2026', laceAcuity:5,  readmission:'Yes', riskLevel:'Medium Risk', tasks:5, carePlan:'No Care Plan', action:'Launch Program'   },
  { initials:'CL', name:'Christine Lewis',  memberId:'#298453', gender:'F', age:'72y 1m', statusCode:'En', utr:'UTR(30d)', status:'New',       admitClass:'-',         nextActionDue:'04/18/2026', nextActionCount:5, lastActionMissed:'03/25/2026', lastMissedCount:1, lastOutreach:{ status:'Unsuccessful',     date:'4/01/26', dots:['#CF1322','#CF1322'] }, assigneeInit:'JP', assignee:'Dr. James Park',      startDate:'10/02/2024', lastAdmission:'02/20/2026', laceAcuity:4,  readmission:'No',  riskLevel:'Low Risk',    tasks:4, carePlan:'No Care Plan', action:'Begin Program'    },
  { initials:'DS', name:'David Scott',      memberId:'#341287', gender:'M', age:'64y 8m', statusCode:'Co', utr:'UTR(7d)',  status:'Completed', admitClass:'Inpatient', nextActionDue:'04/22/2026', nextActionCount:2, lastActionMissed:'04/10/2026', lastMissedCount:3, lastOutreach:{ status:'Successful',    date:'4/05/26', dots:['#CF1322','#059669','#059669'] }, assigneeInit:'SJ', assignee:'Dr. Sarah Johnson',   startDate:'07/28/2024', lastAdmission:'03/28/2026', laceAcuity:8,  readmission:'Yes', riskLevel:'High Risk',   tasks:6, carePlan:'Signed',       action:'Finalize Program' },
  { initials:'ET', name:'Emily Torres',     memberId:'#309128', gender:'F', age:'55y 4m', statusCode:'NE', utr:'UTR(60d)', status:'New',       admitClass:'-',         nextActionDue:'-',           nextActionCount:null, lastActionMissed:'-',           lastMissedCount:null, lastOutreach:null, assigneeInit:'AW', assignee:'Dr. Alex Wong',       startDate:'11/10/2024', lastAdmission:'03/20/2026', laceAcuity:3,  readmission:'No',  riskLevel:'Low Risk',    tasks:2, carePlan:'Pending',      action:'Kickoff Program'  },
  { initials:'FB', name:'Frank Bishop',     memberId:'#287654', gender:'M', age:'79y 0m', statusCode:'En', utr:'UTR(21d)', status:'Engaged',   admitClass:'-',         nextActionDue:'04/12/2026', nextActionCount:4, lastActionMissed:'03/30/2026', lastMissedCount:1, lastOutreach:{ status:'Note', date:'3/28/26', dots:['#CF1322'] }, assigneeInit:'MG', assignee:'Dr. Maria Gomez',     startDate:'08/20/2024', lastAdmission:'02/28/2026', laceAcuity:6,  readmission:'No',  riskLevel:'Medium Risk', tasks:3, carePlan:'Signed',       action:'Assess Program'   },
  { initials:'GD', name:'Grace Davis',      memberId:'#318975', gender:'F', age:'61y 9m', statusCode:'NE', utr:'UTR(90d)', status:'New',       admitClass:'-',         nextActionDue:'04/28/2026', nextActionCount:6, lastActionMissed:'04/18/2026', lastMissedCount:3, lastOutreach:{ status:'Note',     date:'4/10/26', dots:['#CF1322','#CF1322'] }, assigneeInit:'KP', assignee:'Dr. Kevin Patel',     startDate:'12/05/2024', lastAdmission:'04/01/2026', laceAcuity:5,  readmission:'Yes', riskLevel:'High Risk',   tasks:5, carePlan:'No Care Plan', action:'Review Program'   },
  { initials:'HW', name:'Henry Wilson',     memberId:'#302341', gender:'M', age:'70y 6m', statusCode:'Co', utr:'UTR(3d)',  status:'Completed', admitClass:'Inpatient', nextActionDue:'04/30/2026', nextActionCount:2, lastActionMissed:'-',           lastMissedCount:null, lastOutreach:{ status:'Successful',    date:'4/15/26', dots:['#CF1322','#059669'] }, assigneeInit:'LC', assignee:'Dr. Linda Chen',      startDate:'06/15/2024', lastAdmission:'04/10/2026', laceAcuity:9,  readmission:'Yes', riskLevel:'High Risk',   tasks:4, carePlan:'Signed',       action:'Expand Program'   },
  { initials:'IM', name:'Irene Martinez',   memberId:'#295867', gender:'F', age:'68y 3m', statusCode:'En', utr:'UTR(15d)', status:'Engaged',   admitClass:'-',         nextActionDue:'05/02/2026', nextActionCount:3, lastActionMissed:'04/25/2026', lastMissedCount:2, lastOutreach:{ status:'Unsuccessful',     date:'4/20/26', dots:['#CF1322','#CF1322','#CF1322'] }, assigneeInit:'RL', assignee:'Dr. Robert Lee',      startDate:'09/30/2024', lastAdmission:'03/05/2026', laceAcuity:4,  readmission:'No',  riskLevel:'Medium Risk', tasks:7, carePlan:'No Care Plan', action:'Launch Program'   },
  { initials:'JT', name:'Julia Thompson',   memberId:'#334512', gender:'F', age:'53y 11m', statusCode:'NE', utr:'UTR(45d)', status:'Engaged',  admitClass:'-',         nextActionDue:'-',           nextActionCount:null, lastActionMissed:'04/28/2026', lastMissedCount:4, lastOutreach:null,                                                                               assigneeInit:'SH', assignee:'Dr. Samantha Hughes', startDate:'10/20/2024', lastAdmission:'04/18/2026', laceAcuity:6,  readmission:'Yes', riskLevel:'Medium Risk', tasks:2,  carePlan:'Pending',      action:'Complete Program' },

  { initials:'KR', name:'Kevin Ross',        memberId:'#356781', gender:'M', age:'74y 2m',  statusCode:'En', utr:'UTR(18d)', status:'New',       admitClass:'Inpatient', nextActionDue:'05/05/2026', nextActionCount:2,    lastActionMissed:'04/22/2026', lastMissedCount:1,    lastOutreach:{ status:'Successful',    date:'4/28/26', dots:['#059669','#059669'] },             assigneeInit:'RW', assignee:'Dr. Deborah Hintz',   startDate:'01/14/2025', lastAdmission:'04/20/2026', laceAcuity:8,  readmission:'No',  riskLevel:'High Risk',   tasks:6,  carePlan:'Signed',       action:'View Program'     },
  { initials:'LN', name:'Laura Nelson',      memberId:'#321098', gender:'F', age:'60y 7m',  statusCode:'Co', utr:'UTR(5d)',  status:'Completed', admitClass:'-',         nextActionDue:'05/08/2026', nextActionCount:3,    lastActionMissed:'-',           lastMissedCount:null, lastOutreach:{ status:'Note', date:'5/01/26', dots:['#CF1322'] },                           assigneeInit:'EC', assignee:'Dr. Emily Carter',    startDate:'02/03/2025', lastAdmission:'03/25/2026', laceAcuity:4,  readmission:'No',  riskLevel:'Low Risk',    tasks:3,  carePlan:'No Care Plan', action:'Finalize Program' },
  { initials:'MF', name:'Michael Foster',    memberId:'#309874', gender:'M', age:'81y 0m',  statusCode:'En', utr:'UTR(33d)', status:'Engaged',   admitClass:'-',         nextActionDue:'05/10/2026', nextActionCount:5,    lastActionMissed:'04/30/2026', lastMissedCount:2,    lastOutreach:null,                                                                               assigneeInit:'JP', assignee:'Dr. James Park',      startDate:'11/28/2024', lastAdmission:'04/05/2026', laceAcuity:7,  readmission:'Yes', riskLevel:'High Risk',   tasks:4,  carePlan:'Pending',      action:'Assess Program'   },
  { initials:'NP', name:'Nancy Parker',      memberId:'#342567', gender:'F', age:'66y 4m',  statusCode:'NE', utr:'UTR(22d)', status:'New',       admitClass:'-',         nextActionDue:'-',           nextActionCount:null, lastActionMissed:'-',           lastMissedCount:null, lastOutreach:null,                                                                               assigneeInit:'SJ', assignee:'Dr. Sarah Johnson',   startDate:'12/10/2024', lastAdmission:'03/30/2026', laceAcuity:3,  readmission:'No',  riskLevel:'Low Risk',    tasks:1,  carePlan:'No Care Plan', action:'Kickoff Program'  },
  { initials:'OC', name:'Oscar Chen',        memberId:'#287345', gender:'M', age:'69y 9m',  statusCode:'Co', utr:'UTR(9d)',  status:'Completed', admitClass:'Inpatient', nextActionDue:'05/12/2026', nextActionCount:1,    lastActionMissed:'04/20/2026', lastMissedCount:3,    lastOutreach:{ status:'Successful',    date:'5/05/26', dots:['#CF1322','#CF1322','#059669'] },      assigneeInit:'AW', assignee:'Dr. Alex Wong',       startDate:'08/22/2024', lastAdmission:'05/01/2026', laceAcuity:6,  readmission:'Yes', riskLevel:'Medium Risk', tasks:5,  carePlan:'Signed',       action:'Expand Program'   },
  { initials:'PR', name:'Patricia Reed',     memberId:'#318234', gender:'F', age:'57y 6m',  statusCode:'En', utr:'UTR(41d)', status:'New',       admitClass:'-',         nextActionDue:'05/14/2026', nextActionCount:4,    lastActionMissed:'05/02/2026', lastMissedCount:2,    lastOutreach:{ status:'Unsuccessful',     date:'5/07/26', dots:['#CF1322','#CF1322'] },              assigneeInit:'MG', assignee:'Dr. Maria Gomez',     startDate:'01/07/2025', lastAdmission:'04/28/2026', laceAcuity:5,  readmission:'No',  riskLevel:'Medium Risk', tasks:8,  carePlan:'No Care Plan', action:'Begin Program'    },
  { initials:'QM', name:'Quinton Miles',     memberId:'#301456', gender:'M', age:'75y 1m',  statusCode:'NE', utr:'UTR(55d)', status:'Engaged',   admitClass:'-',         nextActionDue:'-',           nextActionCount:null, lastActionMissed:'05/05/2026', lastMissedCount:1,    lastOutreach:null,                                                                               assigneeInit:'KP', assignee:'Dr. Kevin Patel',     startDate:'09/12/2024', lastAdmission:'04/15/2026', laceAcuity:9,  readmission:'Yes', riskLevel:'High Risk',   tasks:3,  carePlan:'Pending',      action:'Launch Program'   },
  { initials:'RS', name:'Rachel Stone',      memberId:'#336789', gender:'F', age:'62y 3m',  statusCode:'En', utr:'UTR(14d)', status:'New',       admitClass:'Inpatient', nextActionDue:'05/16/2026', nextActionCount:6,    lastActionMissed:'04/25/2026', lastMissedCount:4,    lastOutreach:{ status:'Note',     date:'5/10/26', dots:['#CF1322'] },                          assigneeInit:'LC', assignee:'Dr. Linda Chen',      startDate:'03/18/2025', lastAdmission:'05/05/2026', laceAcuity:7,  readmission:'No',  riskLevel:'High Risk',   tasks:6,  carePlan:'Signed',       action:'Review Program'   },
  { initials:'ST', name:'Samuel Turner',     memberId:'#293012', gender:'M', age:'78y 8m',  statusCode:'Co', utr:'UTR(2d)',  status:'Completed', admitClass:'-',         nextActionDue:'05/18/2026', nextActionCount:2,    lastActionMissed:'-',           lastMissedCount:null, lastOutreach:{ status:'Successful',    date:'5/12/26', dots:['#059669','#059669'] },             assigneeInit:'RL', assignee:'Dr. Robert Lee',      startDate:'07/05/2024', lastAdmission:'05/08/2026', laceAcuity:4,  readmission:'No',  riskLevel:'Low Risk',    tasks:2,  carePlan:'No Care Plan', action:'Complete Program'  },
  { initials:'TW', name:'Teresa Walsh',      memberId:'#348901', gender:'F', age:'55y 10m', statusCode:'NE', utr:'UTR(67d)', status:'Engaged',   admitClass:'-',         nextActionDue:'-',           nextActionCount:null, lastActionMissed:'05/08/2026', lastMissedCount:3,    lastOutreach:null,                                                                               assigneeInit:'SH', assignee:'Dr. Samantha Hughes', startDate:'02/25/2025', lastAdmission:'04/22/2026', laceAcuity:5,  readmission:'Yes', riskLevel:'Medium Risk', tasks:4,  carePlan:'Pending',      action:'Assess Program'   },
  { initials:'UH', name:'Ulric Hammond',     memberId:'#312678', gender:'M', age:'72y 5m',  statusCode:'En', utr:'UTR(28d)', status:'New',       admitClass:'Inpatient', nextActionDue:'05/20/2026', nextActionCount:3,    lastActionMissed:'05/10/2026', lastMissedCount:1,    lastOutreach:{ status:'Note', date:'5/15/26', dots:['#CF1322','#CF1322'] },              assigneeInit:'RW', assignee:'Dr. Deborah Hintz',   startDate:'01/30/2025', lastAdmission:'05/12/2026', laceAcuity:8,  readmission:'Yes', riskLevel:'High Risk',   tasks:7,  carePlan:'Signed',       action:'View Program'     },
  { initials:'VJ', name:'Vivian James',      memberId:'#325890', gender:'F', age:'63y 0m',  statusCode:'Co', utr:'UTR(11d)', status:'Completed', admitClass:'-',         nextActionDue:'05/22/2026', nextActionCount:4,    lastActionMissed:'-',           lastMissedCount:null, lastOutreach:{ status:'Successful',    date:'5/18/26', dots:['#CF1322','#059669','#059669'] },      assigneeInit:'EC', assignee:'Dr. Emily Carter',    startDate:'08/14/2024', lastAdmission:'05/15/2026', laceAcuity:3,  readmission:'No',  riskLevel:'Low Risk',    tasks:5,  carePlan:'Signed',       action:'Finalize Program' },
  { initials:'WB', name:'Walter Barnes',     memberId:'#297234', gender:'M', age:'80y 3m',  statusCode:'NE', utr:'UTR(38d)', status:'Engaged',   admitClass:'-',         nextActionDue:'-',           nextActionCount:null, lastActionMissed:'05/12/2026', lastMissedCount:2,    lastOutreach:null,                                                                               assigneeInit:'JP', assignee:'Dr. James Park',      startDate:'10/08/2024', lastAdmission:'04/30/2026', laceAcuity:6,  readmission:'Yes', riskLevel:'Medium Risk', tasks:3,  carePlan:'No Care Plan', action:'Launch Program'   },
  { initials:'XC', name:'Xena Collins',      memberId:'#340123', gender:'F', age:'58y 7m',  statusCode:'En', utr:'UTR(19d)', status:'New',       admitClass:'-',         nextActionDue:'05/24/2026', nextActionCount:5,    lastActionMissed:'05/14/2026', lastMissedCount:3,    lastOutreach:{ status:'Unsuccessful',     date:'5/20/26', dots:['#CF1322','#CF1322','#CF1322'] },      assigneeInit:'SJ', assignee:'Dr. Sarah Johnson',   startDate:'03/03/2025', lastAdmission:'05/18/2026', laceAcuity:5,  readmission:'No',  riskLevel:'Medium Risk', tasks:9,  carePlan:'No Care Plan', action:'Begin Program'    },
  { initials:'YM', name:'Yvonne Morgan',     memberId:'#308567', gender:'F', age:'67y 2m',  statusCode:'Co', utr:'UTR(6d)',  status:'Completed', admitClass:'Inpatient', nextActionDue:'05/26/2026', nextActionCount:1,    lastActionMissed:'05/16/2026', lastMissedCount:1,    lastOutreach:{ status:'Successful',    date:'5/22/26', dots:['#059669'] },                          assigneeInit:'AW', assignee:'Dr. Alex Wong',       startDate:'06/20/2024', lastAdmission:'05/20/2026', laceAcuity:9,  readmission:'Yes', riskLevel:'High Risk',   tasks:4,  carePlan:'Signed',       action:'Expand Program'   },
  { initials:'ZP', name:'Zachary Powell',    memberId:'#322345', gender:'M', age:'71y 11m', statusCode:'NE', utr:'UTR(48d)', status:'New',       admitClass:'-',         nextActionDue:'-',           nextActionCount:null, lastActionMissed:'-',           lastMissedCount:null, lastOutreach:null,                                                                               assigneeInit:'MG', assignee:'Dr. Maria Gomez',     startDate:'11/15/2024', lastAdmission:'05/10/2026', laceAcuity:2,  readmission:'No',  riskLevel:'Low Risk',    tasks:1,  carePlan:'Pending',      action:'Kickoff Program'  },
  { initials:'AF', name:'Alice Fleming',     memberId:'#337890', gender:'F', age:'64y 4m',  statusCode:'En', utr:'UTR(26d)', status:'Engaged',   admitClass:'-',         nextActionDue:'05/28/2026', nextActionCount:6,    lastActionMissed:'05/18/2026', lastMissedCount:4,    lastOutreach:{ status:'Note',     date:'5/24/26', dots:['#CF1322','#CF1322'] },              assigneeInit:'KP', assignee:'Dr. Kevin Patel',     startDate:'02/12/2025', lastAdmission:'05/22/2026', laceAcuity:6,  readmission:'Yes', riskLevel:'High Risk',   tasks:8,  carePlan:'No Care Plan', action:'Review Program'   },
  { initials:'BK', name:'Benjamin Kirk',     memberId:'#295678', gender:'M', age:'76y 6m',  statusCode:'Co', utr:'UTR(4d)',  status:'Completed', admitClass:'Inpatient', nextActionDue:'05/30/2026', nextActionCount:2,    lastActionMissed:'-',           lastMissedCount:null, lastOutreach:{ status:'Successful',    date:'5/26/26', dots:['#CF1322','#059669'] },              assigneeInit:'LC', assignee:'Dr. Linda Chen',      startDate:'07/28/2024', lastAdmission:'05/25/2026', laceAcuity:7,  readmission:'No',  riskLevel:'Medium Risk', tasks:5,  carePlan:'Signed',       action:'Complete Program'  },
  { initials:'CA', name:'Clara Avery',       memberId:'#311234', gender:'F', age:'59y 9m',  statusCode:'NE', utr:'UTR(72d)', status:'New',       admitClass:'-',         nextActionDue:'-',           nextActionCount:null, lastActionMissed:'05/20/2026', lastMissedCount:2,    lastOutreach:null,                                                                               assigneeInit:'RL', assignee:'Dr. Robert Lee',      startDate:'12/22/2024', lastAdmission:'05/15/2026', laceAcuity:4,  readmission:'Yes', riskLevel:'Medium Risk', tasks:3,  carePlan:'Pending',      action:'Assess Program'   },
  { initials:'DH', name:'Douglas Hale',      memberId:'#344567', gender:'M', age:'83y 1m',  statusCode:'En', utr:'UTR(16d)', status:'Engaged',   admitClass:'-',         nextActionDue:'06/01/2026', nextActionCount:3,    lastActionMissed:'05/22/2026', lastMissedCount:1,    lastOutreach:{ status:'Note', date:'5/28/26', dots:['#CF1322'] },                          assigneeInit:'SH', assignee:'Dr. Samantha Hughes', startDate:'09/05/2024', lastAdmission:'05/28/2026', laceAcuity:8,  readmission:'No',  riskLevel:'High Risk',   tasks:6,  carePlan:'No Care Plan', action:'Launch Program'   },
  { initials:'EV', name:'Eleanor Vance',     memberId:'#300789', gender:'F', age:'61y 5m',  statusCode:'Co', utr:'UTR(8d)',  status:'Completed', admitClass:'Inpatient', nextActionDue:'06/03/2026', nextActionCount:4,    lastActionMissed:'05/24/2026', lastMissedCount:3,    lastOutreach:{ status:'Unsuccessful',     date:'5/30/26', dots:['#CF1322','#CF1322'] },              assigneeInit:'RW', assignee:'Dr. Deborah Hintz',   startDate:'04/10/2025', lastAdmission:'05/30/2026', laceAcuity:5,  readmission:'Yes', riskLevel:'Medium Risk', tasks:7,  carePlan:'Signed',       action:'Finalize Program' },
  { initials:'FO', name:'Felix Ortega',      memberId:'#326012', gender:'M', age:'68y 0m',  statusCode:'NE', utr:'UTR(53d)', status:'New',       admitClass:'-',         nextActionDue:'-',           nextActionCount:null, lastActionMissed:'-',           lastMissedCount:null, lastOutreach:null,                                                                               assigneeInit:'EC', assignee:'Dr. Emily Carter',    startDate:'01/18/2025', lastAdmission:'05/20/2026', laceAcuity:3,  readmission:'No',  riskLevel:'Low Risk',    tasks:2,  carePlan:'No Care Plan', action:'Kickoff Program'  },
  { initials:'GN', name:'Gloria Nash',       memberId:'#339234', gender:'F', age:'73y 8m',  statusCode:'En', utr:'UTR(31d)', status:'Engaged',   admitClass:'-',         nextActionDue:'06/05/2026', nextActionCount:5,    lastActionMissed:'05/26/2026', lastMissedCount:2,    lastOutreach:{ status:'Successful',    date:'6/01/26', dots:['#CF1322','#CF1322','#059669'] },      assigneeInit:'JP', assignee:'Dr. James Park',      startDate:'08/30/2024', lastAdmission:'06/01/2026', laceAcuity:6,  readmission:'Yes', riskLevel:'High Risk',   tasks:4,  carePlan:'Pending',      action:'Begin Program'    },
  { initials:'HY', name:'Howard Young',      memberId:'#297456', gender:'M', age:'77y 3m',  statusCode:'Co', utr:'UTR(1d)',  status:'Completed', admitClass:'Inpatient', nextActionDue:'06/07/2026', nextActionCount:1,    lastActionMissed:'-',           lastMissedCount:null, lastOutreach:{ status:'Successful',    date:'6/03/26', dots:['#059669','#059669','#059669'] },      assigneeInit:'SJ', assignee:'Dr. Sarah Johnson',   startDate:'05/16/2024', lastAdmission:'06/03/2026', laceAcuity:9,  readmission:'No',  riskLevel:'High Risk',   tasks:3,  carePlan:'Signed',       action:'Expand Program'   },
  { initials:'IA', name:'Isabelle Archer',   memberId:'#313678', gender:'F', age:'54y 6m',  statusCode:'NE', utr:'UTR(44d)', status:'New',       admitClass:'-',         nextActionDue:'-',           nextActionCount:null, lastActionMissed:'05/28/2026', lastMissedCount:5,    lastOutreach:null,                                                                               assigneeInit:'AW', assignee:'Dr. Alex Wong',       startDate:'03/28/2025', lastAdmission:'05/25/2026', laceAcuity:4,  readmission:'Yes', riskLevel:'Medium Risk', tasks:10, carePlan:'No Care Plan', action:'Review Program'   },
  { initials:'JD', name:'Jerome Dixon',      memberId:'#328901', gender:'M', age:'70y 1m',  statusCode:'En', utr:'UTR(23d)', status:'Engaged',   admitClass:'-',         nextActionDue:'06/09/2026', nextActionCount:3,    lastActionMissed:'05/30/2026', lastMissedCount:1,    lastOutreach:{ status:'Note',     date:'6/05/26', dots:['#CF1322','#CF1322'] },              assigneeInit:'MG', assignee:'Dr. Maria Gomez',     startDate:'10/14/2024', lastAdmission:'06/05/2026', laceAcuity:5,  readmission:'No',  riskLevel:'Medium Risk', tasks:6,  carePlan:'No Care Plan', action:'Launch Program'   },
  { initials:'KL', name:'Katherine Lane',    memberId:'#342123', gender:'F', age:'65y 10m', statusCode:'Co', utr:'UTR(7d)',  status:'Completed', admitClass:'Inpatient', nextActionDue:'06/11/2026', nextActionCount:2,    lastActionMissed:'06/01/2026', lastMissedCount:2,    lastOutreach:{ status:'Successful',    date:'6/07/26', dots:['#CF1322','#059669'] },              assigneeInit:'KP', assignee:'Dr. Kevin Patel',     startDate:'06/02/2024', lastAdmission:'06/07/2026', laceAcuity:7,  readmission:'Yes', riskLevel:'High Risk',   tasks:5,  carePlan:'Signed',       action:'Complete Program'  },
  { initials:'LG', name:'Leonard Grant',     memberId:'#300345', gender:'M', age:'82y 7m',  statusCode:'NE', utr:'UTR(61d)', status:'New',       admitClass:'-',         nextActionDue:'-',           nextActionCount:null, lastActionMissed:'-',           lastMissedCount:null, lastOutreach:null,                                                                               assigneeInit:'LC', assignee:'Dr. Linda Chen',      startDate:'11/01/2024', lastAdmission:'05/30/2026', laceAcuity:8,  readmission:'No',  riskLevel:'High Risk',   tasks:2,  carePlan:'Pending',      action:'View Program'     },
  { initials:'MB', name:'Miriam Bell',       memberId:'#315567', gender:'F', age:'56y 2m',  statusCode:'En', utr:'UTR(35d)', status:'Engaged',   admitClass:'-',         nextActionDue:'06/13/2026', nextActionCount:7,    lastActionMissed:'06/03/2026', lastMissedCount:3,    lastOutreach:{ status:'Note', date:'6/09/26', dots:['#CF1322','#CF1322'] },              assigneeInit:'RL', assignee:'Dr. Robert Lee',      startDate:'02/20/2025', lastAdmission:'06/09/2026', laceAcuity:4,  readmission:'Yes', riskLevel:'Medium Risk', tasks:8,  carePlan:'No Care Plan', action:'Assess Program'   },
  { initials:'NC', name:'Nathan Cruz',       memberId:'#329789', gender:'M', age:'79y 4m',  statusCode:'Co', utr:'UTR(3d)',  status:'Completed', admitClass:'Inpatient', nextActionDue:'06/15/2026', nextActionCount:4,    lastActionMissed:'06/05/2026', lastMissedCount:2,    lastOutreach:{ status:'Unsuccessful',     date:'6/11/26', dots:['#CF1322','#CF1322','#CF1322'] },      assigneeInit:'SH', assignee:'Dr. Samantha Hughes', startDate:'09/25/2024', lastAdmission:'06/11/2026', laceAcuity:6,  readmission:'No',  riskLevel:'Medium Risk', tasks:3,  carePlan:'Signed',       action:'Finalize Program' },
];

/* ─── Per-patient ellipse tooltip items ─────────────────────────────────── */
const PATIENT_TOOLTIP_ITEMS = {
  'Anna Brown':      { dueItems:[{label:'Initial Outreach',attempts:'3 Attempts'},{label:'MRP Completion'},{label:'Task For Med Recon'}],         missedItems:[{label:'Post Discharge Appointment'},{label:'MRP Completion'}] },
  'Christine Lewis': { dueItems:[{label:'Follow Up Outreach 2'},{label:'Post IP Assessment'},{label:'Assessments'}],                                       missedItems:[{label:'Initial Outreach',attempts:'2 Attempts'}] },
  'David Scott':     { dueItems:[{label:'Follow Up Outreach 1'},{label:'MRP Completion'}],                                                                  missedItems:[{label:'Follow Up Outreach 1'},{label:'Task For Med Recon'},{label:'Post IP Assessment'}] },
  'Frank Bishop':    { dueItems:[{label:'Initial Outreach',attempts:'2 Attempts'},{label:'Task For Med Recon'},{label:'Program Completion'}],       missedItems:[{label:'MRP Completion'}] },
  'Grace Davis':     { dueItems:[{label:'Follow Up Outreach 3'},{label:'Post Discharge Appointment'},{label:'Assessments'}],                                missedItems:[{label:'Follow Up Outreach 3'},{label:'Post Discharge Appointment'},{label:'Assessments'}] },
  'Henry Wilson':    { dueItems:[{label:'Follow Up Outreach 1'},{label:'Tasks'}] },
  'Irene Martinez':  { dueItems:[{label:'Follow Up Outreach 2'},{label:'MRP Completion'},{label:'Appointments'}],                                           missedItems:[{label:'Initial Outreach',attempts:'3 Attempts'},{label:'Follow Up Outreach 1'}] },
  'Julia Thompson':  { missedItems:[{label:'Follow Up Outreach 2'},{label:'Task For Med Recon'},{label:'Program Completion'},{label:'Assessments'}] },
  'Kevin Ross':      { dueItems:[{label:'Initial Outreach',attempts:'2 Attempts'},{label:'Task For Med Recon'}],                                   missedItems:[{label:'Post Discharge Appointment'}] },
  'Laura Nelson':    { dueItems:[{label:'Follow Up Outreach 4'},{label:'Post IP Assessment'},{label:'Program Completion'}] },
  'Michael Foster':  { dueItems:[{label:'Follow Up Outreach 1'},{label:'Assessments'},{label:'Tasks'}],                                                     missedItems:[{label:'Follow Up Outreach 4'},{label:'MRP Completion'}] },
  'Oscar Chen':      { dueItems:[{label:'MRP Completion'}],                                                                                        missedItems:[{label:'Follow Up Outreach 1'},{label:'Task For Med Recon'},{label:'Post IP Assessment'}] },
  'Patricia Reed':   { dueItems:[{label:'Follow Up Outreach 2'},{label:'Post Discharge Appointment'},{label:'Assessments'}],                                missedItems:[{label:'Initial Outreach',attempts:'2 Attempts'},{label:'Appointments'}] },
  'Quinton Miles':   { missedItems:[{label:'Tasks'}] },
  'Rachel Stone':    { dueItems:[{label:'Follow Up Outreach 5'},{label:'Program Completion'},{label:'Tasks'},{label:'Appointments'}],                       missedItems:[{label:'Follow Up Outreach 5'},{label:'Post IP Assessment'},{label:'Program Completion'},{label:'Appointments'}] },
  'Samuel Turner':   { dueItems:[{label:'Initial Outreach',attempts:'3 Attempts'},{label:'MRP Completion'}] },
  'Teresa Walsh':    { missedItems:[{label:'Follow Up Outreach 2'},{label:'MRP Completion'},{label:'Assessments'}] },
  'Ulric Hammond':   { dueItems:[{label:'Follow Up Outreach 3'},{label:'Task For Med Recon'},{label:'Post IP Assessment'}],                                 missedItems:[{label:'Task For Med Recon'}] },
  'Vivian James':    { dueItems:[{label:'Follow Up Outreach 1'},{label:'Assessments'},{label:'Appointments'}] },
  'Walter Barnes':   { missedItems:[{label:'Follow Up Outreach 3'},{label:'Post Discharge Appointment'}] },
  'Xena Collins':    { dueItems:[{label:'Follow Up Outreach 4'},{label:'MRP Completion'},{label:'Program Completion'}],                                     missedItems:[{label:'Initial Outreach',attempts:'2 Attempts'},{label:'Follow Up Outreach 1'},{label:'Tasks'}] },
  'Yvonne Morgan':   { dueItems:[{label:'Tasks'}],                                                                                                 missedItems:[{label:'Post IP Assessment'}] },
  'Alice Fleming':   { dueItems:[{label:'Follow Up Outreach 2'},{label:'Post Discharge Appointment'},{label:'Task For Med Recon'},{label:'Assessments'}],   missedItems:[{label:'Follow Up Outreach 2'},{label:'Task For Med Recon'},{label:'Assessments'},{label:'Program Completion'}] },
  'Benjamin Kirk':   { dueItems:[{label:'Initial Outreach',attempts:'3 Attempts'},{label:'Follow Up Outreach 1'}] },
  'Clara Avery':     { missedItems:[{label:'Follow Up Outreach 4'},{label:'MRP Completion'}] },
  'Douglas Hale':    { dueItems:[{label:'Follow Up Outreach 5'},{label:'MRP Completion'},{label:'Tasks'}],                                                  missedItems:[{label:'Tasks'}] },
  'Eleanor Vance':   { dueItems:[{label:'Follow Up Outreach 3'},{label:'Post IP Assessment'},{label:'Appointments'}],                                       missedItems:[{label:'Follow Up Outreach 1'},{label:'Post Discharge Appointment'},{label:'Assessments'}] },
  'Gloria Nash':     { dueItems:[{label:'Follow Up Outreach 2'},{label:'Assessments'},{label:'Program Completion'}],                                        missedItems:[{label:'Follow Up Outreach 5'},{label:'MRP Completion'}] },
  'Howard Young':    { dueItems:[{label:'Post Discharge Appointment'}] },
  'Isabelle Archer': { missedItems:[{label:'Initial Outreach',attempts:'2 Attempts'},{label:'Follow Up Outreach 2'},{label:'Task For Med Recon'}] },
  'Jerome Dixon':    { dueItems:[{label:'Follow Up Outreach 1'},{label:'Task For Med Recon'},{label:'MRP Completion'}],                                     missedItems:[{label:'Post IP Assessment'}] },
  'Katherine Lane':  { dueItems:[{label:'Follow Up Outreach 4'},{label:'Post IP Assessment'}],                                                             missedItems:[{label:'Follow Up Outreach 3'},{label:'Appointments'}] },
  'Miriam Bell':     { dueItems:[{label:'Initial Outreach',attempts:'3 Attempts'},{label:'Follow Up Outreach 3'},{label:'Assessments'}],                    missedItems:[{label:'Follow Up Outreach 4'},{label:'MRP Completion'},{label:'Tasks'}] },
  'Nathan Cruz':     { dueItems:[{label:'Follow Up Outreach 5'},{label:'MRP Completion'},{label:'Tasks'}],                                                  missedItems:[{label:'Follow Up Outreach 1'},{label:'Post Discharge Appointment'}] },
};

/* ─── Attempt log data (module-scope so the slide panel can access it) ───── */
const OUTREACH1_ATTEMPTS = [
  { num:4, due:'04/01/26', day:'Day 3',         timeNote:null,                   conducted:null,                  outcome:null           },
  { num:3, due:'03/31/26', day:'Day 2',         timeNote:'12:00 Noon – 8:00 PM', conducted:'03/31/26 · 2:14 PM',  outcome:'Unsuccessful' },
  { num:2, due:'03/31/26', day:'Day 2',         timeNote:'Before 12:00 Noon',    conducted:'03/31/26 · 10:22 AM', outcome:'Unsuccessful' },
  { num:1, due:'03/30/26', day:'Day 0 / Day 1', timeNote:null,                   conducted:'03/30/26 · 4:45 PM',  outcome:'Unsuccessful' },
];
const attemptOutcomeColor = (o) =>
  o === 'Successful'   ? '#059669' :
  o === 'Unsuccessful' ? '#CF1322' :
  'var(--neutral-200)';

/* ─── AWVWorklist ────────────────────────────────────────────────────────── */
const PAGE_SIZE = 10;


/* ─── AWVWorklist — lean orchestrator, all state here, renders imported components ── */
function AWVWorklist({ onToggleSidebar, sidebarCollapsed }) {

  /* ── State ── */
  const [currentPage,        setCurrentPage]        = useState(1);
  const [pageSize,           setPageSize]           = useState(10);
  const [searchQuery,        setSearchQuery]        = useState('');
  const [goToInput,          setGoToInput]          = useState('');
  const [checkedRows,        setCheckedRows]        = useState(new Set());
  const [hoveredRow,         setHoveredRow]         = useState(null);
  const [badgeTooltip,       setBadgeTooltip]       = useState(null);
  const [drawerPatient,      setDrawerPatient]      = useState(null);
  const [drawerClosing,      setDrawerClosing]      = useState(false);
  const [drawerTab,          setDrawerTab]          = useState('quick');
  const [viewBy,             setViewBy]             = useState('duedate');
  const [expandedOutreach,   setExpandedOutreach]   = useState(null);
  const [callPopup,          setCallPopup]          = useState(null);
  const [completedMilestones,setCompletedMilestones]= useState(new Set());
  const tooltipHideRef                              = useRef(null);
  const [highlightedMilestone, setHighlightedMilestone] = useState(null);
  const [threeDotMenu,       setThreeDotMenu]       = useState(null);
  const [deleteConfirm,      setDeleteConfirm]      = useState(null);
  const [slidePanel,         setSlidePanel]         = useState(null);
  const [filterOpen,         setFilterOpen]         = useState(false);
  const [openDropdown,       setOpenDropdown]       = useState(null);
  const [datePickerOpen,     setDatePickerOpen]     = useState(null);
  const [assigneeDropdown,   setAssigneeDropdown]   = useState(null);
  const [assigneeSelections, setAssigneeSelections] = useState({});
  const [assigneeSearch,     setAssigneeSearch]     = useState('');
  const [hoveredAssigneeRow, setHoveredAssigneeRow] = useState(null);
  const dropdownRefs = useRef({});

  const emptyDropdownState = () => ({ actions: new Set(ACTION_TYPES), dateRange: '', customRange: null });
  const [dropdownState, setDropdownState] = useState({
    nextActionDue:    emptyDropdownState(),
    lastActionMissed: emptyDropdownState(),
  });
  const [activeFilters, setActiveFilters] = useState({
    assignedTo:       { value:'Me',                             count:'+2' },
    programSubStatus: { value:'New',                            count:'+2' },
    programDueDate:   { value:'05/23/2026 – 08/25/2026',        count:'+2' },
  });

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    if (!openDropdown) return;
    const handler = e => {
      const ref = dropdownRefs.current[openDropdown];
      if (ref && !ref.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openDropdown]);

  /* ── Drawer helpers ── */
  const openDrawer = patient => {
    setDrawerPatient(patient);
    setDrawerClosing(false);
    setDrawerTab('quick');
    setViewBy('duedate');
  };
  const closeDrawer = () => {
    setDrawerClosing(true);
    setHighlightedMilestone(null);
    setTimeout(() => { setDrawerPatient(null); setDrawerClosing(false); }, 350);
  };

  /* ── Slide-panel helpers ── */
  const closeSlidePanel = () => {
    setSlidePanel(p => p ? { ...p, closing: true } : null);
    setTimeout(() => setSlidePanel(null), 350);
  };

  /* ── Filter helpers ── */
  const toggleFilter = key => setActiveFilters(prev => {
    const next = { ...prev };
    if (next[key]) {
      delete next[key];
    } else {
      const defaults = {
        assignedTo:       { value:'Me',                             count:'+2' },
        programSubStatus: { value:'New',                            count:'+2' },
        programDueDate:   { value:'05/23/2026 – 08/25/2026',        count:'+2' },
        nextActionDue:    { value:'Initial Outreach • Due Today',    count:'+2' },
        memberStatus:     { value:'Active',    count:null },
        gender:           { value:'Female',    count:null },
        language:         { value:'Spanish',   count:null },
        carePlanStatus:   { value:'Signed',    count:null },
        populationType:   { value:'Dynamic',   count:null },
        utrFlag:          { value:'Yes',       count:null },
        utrAge:           { value:'>30 days',  count:null },
      };
      next[key] = defaults[key] || { value:'Selected', count:null };
    }
    return next;
  });
  const activeCount = Object.keys(activeFilters).length;

  const applyActionFilter = key => {
    const ds = dropdownState[key];
    const actions = [...ds.actions];
    const allSelected = actions.length === ACTION_TYPES.length;
    const dateLabel = ds.dateRange === 'Custom'
      ? (ds.customRange ? `${ds.customRange[0].format('MM/DD/YY')} – ${ds.customRange[1].format('MM/DD/YY')}` : 'Custom')
      : ds.dateRange;
    const actionLabel = allSelected ? 'All Actions'
      : actions.length === 1 ? actions[0]
      : `${actions[0]} +${actions.length - 1}`;
    const value = dateLabel ? `${actionLabel} • ${dateLabel}` : actionLabel;
    const count = !allSelected && actions.length > 1 ? `+${actions.length - 1}` : null;
    setActiveFilters(prev => ({
      ...prev,
      [key]: { value, count, filterConfig: { dateRange: ds.dateRange, customRange: ds.customRange, actions: allSelected ? null : new Set(actions) } },
    }));
    setOpenDropdown(null);
  };

  /* ── Date filter helpers ── */
  const parseDateField = str => {
    if (!str || str === '-') return null;
    const [m, dd, y] = str.split('/');
    if (!m || !dd || !y) return null;
    return new Date(Number(y), Number(m) - 1, Number(dd));
  };
  const dateInRange = (dateStr, filterConfig) => {
    if (!filterConfig || !filterConfig.dateRange) return true;
    const d = parseDateField(dateStr);
    if (!d) return false;
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd   = new Date(todayStart.getTime() + 24*60*60*1000 - 1);
    const { dateRange, customRange } = filterConfig;
    if (dateRange === 'Due Today')           return d >= todayStart && d <= todayEnd;
    if (dateRange === 'Due Tomorrow')        { const s = new Date(todayStart.getTime()+24*60*60*1000); const e = new Date(s.getTime()+24*60*60*1000-1); return d >= s && d <= e; }
    if (dateRange === 'Due within 48 Hours') return d >= todayStart && d <= new Date(now.getTime()+48*60*60*1000);
    if (dateRange === 'Due within 72 Hours') return d >= todayStart && d <= new Date(now.getTime()+72*60*60*1000);
    if (dateRange === 'Custom' && customRange) {
      const s = customRange[0].toDate(), e = customRange[1].toDate();
      const sd = new Date(s.getFullYear(), s.getMonth(), s.getDate());
      const ed = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59);
      return d >= sd && d <= ed;
    }
    return true;
  };

  /* ── Filtered + paginated data ── */
  const q          = searchQuery.trim().toLowerCase();
  const nadConfig  = activeFilters.nextActionDue?.filterConfig   || null;
  const lamConfig  = activeFilters.lastActionMissed?.filterConfig || null;
  const filtered = AWV_PATIENTS.filter(p => {
    if (q && !(p.name.toLowerCase().includes(q) || p.memberId.toLowerCase().includes(q) || p.assignee.toLowerCase().includes(q))) return false;
    if (nadConfig) {
      if (!dateInRange(p.nextActionDue, nadConfig)) return false;
      if (nadConfig.actions && nadConfig.actions.size > 0) {
        const dueItems = (PATIENT_TOOLTIP_ITEMS[p.name] || {}).dueItems || [];
        if (!dueItems.some(item => nadConfig.actions.has(item.label))) return false;
      }
    }
    if (lamConfig) {
      if (!dateInRange(p.lastActionMissed, lamConfig)) return false;
      if (lamConfig.actions && lamConfig.actions.size > 0) {
        const missedItems = (PATIENT_TOOLTIP_ITEMS[p.name] || {}).missedItems || [];
        if (!missedItems.some(item => lamConfig.actions.has(item.label))) return false;
      }
    }
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage   = Math.min(currentPage, totalPages);
  const pageRows   = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const allChecked = pageRows.length > 0 && pageRows.every((_, i) => checkedRows.has((safePage-1)*pageSize+i));
  const toggleAll  = () => {
    const indices = pageRows.map((_, i) => (safePage-1)*pageSize+i);
    setCheckedRows(prev => {
      const n = new Set(prev);
      allChecked ? indices.forEach(i => n.delete(i)) : indices.forEach(i => n.add(i));
      return n;
    });
  };
  const toggleRow  = i => setCheckedRows(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });

  /* ── Page number list ── */
  const buildPages = () => {
    if (totalPages <= 7) return Array.from({ length:totalPages }, (_, i) => i+1);
    if (safePage <= 4)   return [1,2,3,4,5,'...',totalPages];
    if (safePage >= totalPages-3) return [1,'...',totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages];
    return [1,'...',safePage-1,safePage,safePage+1,'...',totalPages];
  };

  /* ── Badge-tooltip handlers ── */
  const showBadgeTooltip = data => { clearTimeout(tooltipHideRef.current); setBadgeTooltip(data); };
  const hideBadgeTooltip = ()   => { tooltipHideRef.current = setTimeout(() => setBadgeTooltip(null), 150); };

  /* ── Mark milestone complete ── */
  const handleMarkComplete = rowName => {
    setCompletedMilestones(prev => { const n = new Set(prev); n.add(rowName); return n; });
    setThreeDotMenu(null);
  };

  /* ── Render ── */
  return (
    <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

      {/* ── Main worklist column ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'var(--neutral-0)', minWidth:0 }}>

        <WorklistSubHeader
          onToggleSidebar={onToggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
          searchQuery={searchQuery}
          onSearchChange={v => { setSearchQuery(v); setCurrentPage(1); }}
          filterOpen={filterOpen}
          onToggleFilter={() => setFilterOpen(v => !v)}
          activeCount={activeCount}
          activeFilters={activeFilters}
          openDropdown={openDropdown}
          onOpenDropdown={setOpenDropdown}
          dropdownRefs={dropdownRefs}
          dropdownState={dropdownState}
          onDropdownStateChange={setDropdownState}
          datePickerOpen={datePickerOpen}
          onDatePickerOpen={setDatePickerOpen}
          onApplyFilter={key => {
            if (key === 'nextActionDue' || key === 'lastActionMissed') {
              applyActionFilter(key);
            } else {
              toggleFilter(key);
            }
          }}
          onClearAll={() => setActiveFilters({})}
          onEmptyDropdownState={emptyDropdownState}
        />

        <PatientTable
          pageRows={pageRows}
          currentPage={safePage}
          pageSize={pageSize}
          checkedRows={checkedRows}
          hoveredRow={hoveredRow}
          allChecked={allChecked}
          onToggleAll={toggleAll}
          onToggleRow={toggleRow}
          onHoverRow={setHoveredRow}
          onOpenDrawer={openDrawer}
          tooltipHideRef={tooltipHideRef}
          onShowBadgeTooltip={showBadgeTooltip}
          onHideBadgeTooltip={hideBadgeTooltip}
          onOpenCallPopup={setCallPopup}
          tooltipItems={PATIENT_TOOLTIP_ITEMS}
        />

        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          safePage={safePage}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={n => { setPageSize(n); setCurrentPage(1); }}
          goToInput={goToInput}
          onGoToInputChange={setGoToInput}
          onGoToPage={() => {
            const n = parseInt(goToInput);
            if (!isNaN(n) && n >= 1 && n <= totalPages) { setCurrentPage(n); setGoToInput(''); }
          }}
          buildPages={buildPages}
        />

      </div>{/* end main column */}

      {/* ── Right drawer ── */}
      {drawerPatient && (
        <PatientDrawer
          patient={drawerPatient}
          isClosing={drawerClosing}
          drawerTab={drawerTab}
          onTabChange={setDrawerTab}
          onClose={closeDrawer}
          viewBy={viewBy}
          onViewByChange={setViewBy}
          expandedOutreach={expandedOutreach}
          onToggleExpandedOutreach={setExpandedOutreach}
          completedMilestones={completedMilestones}
          assigneeSelections={assigneeSelections}
          hoveredAssigneeRow={hoveredAssigneeRow}
          onHoverAssigneeRow={setHoveredAssigneeRow}
          assigneeDropdown={assigneeDropdown}
          onOpenAssigneeDropdown={setAssigneeDropdown}
          onOpenCallPopup={setCallPopup}
          onOpenSlidePanel={setSlidePanel}
          onOpenThreeDotMenu={setThreeDotMenu}
          highlightedMilestone={highlightedMilestone}
        />
      )}

      {/* ── Overlays ── */}
      {callPopup && (
        <CallPopup popup={callPopup} onClose={() => setCallPopup(null)} />
      )}
      {badgeTooltip && (
        <BadgeTooltip
          tooltip={badgeTooltip}
          tooltipHideRef={tooltipHideRef}
          onHide={() => setBadgeTooltip(null)}
          onOpenDrawer={openDrawer}
          onSetDrawerTab={setDrawerTab}
          onSetViewBy={setViewBy}
          onSetHighlightedMilestone={setHighlightedMilestone}
          onSetExpandedOutreach={setExpandedOutreach}
        />
      )}
      {threeDotMenu && (
        <ThreeDotMenu
          menu={threeDotMenu}
          onClose={() => setThreeDotMenu(null)}
          onMarkComplete={handleMarkComplete}
          onOpenSlidePanel={setSlidePanel}
          onOpenDeleteConfirm={setDeleteConfirm}
        />
      )}
      {assigneeDropdown && (
        <AssigneeDropdown
          dropdown={assigneeDropdown}
          search={assigneeSearch}
          onSearch={setAssigneeSearch}
          onSelect={(rowName, a) => {
            setAssigneeSelections(prev => ({ ...prev, [rowName]: a }));
            setAssigneeDropdown(null);
            setAssigneeSearch('');
          }}
          onClose={() => { setAssigneeDropdown(null); setAssigneeSearch(''); }}
        />
      )}
      {deleteConfirm && (
        <DeleteConfirmModal confirm={deleteConfirm} onClose={() => setDeleteConfirm(null)} />
      )}
      {slidePanel && (
        <SlidePanel panel={slidePanel} onClose={closeSlidePanel} />
      )}

    </div>
  );
}


export default function App() {
  const [activeNavItem, setActiveNavItem] = useState('TOC IP List');
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  /* which top-level nav tab is active: 'population' | 'comms' | others */
  const [activeNavTab, setActiveNavTab] = useState('population');
  const [activeCommsItem, setActiveCommsItem] = useState('assigned');
  const [activeConvId, setActiveConvId] = useState(1);

  const handleNavTabChange = (tabId) => {
    setActiveNavTab(tabId);
    /* reset population nav item when switching back */
    if (tabId === 'population') setActiveNavItem('TOC IP List');
  };

  /* ── persistent mini-bar (survives navigation away from population view) ── */
  const [miniBarInfo, setMiniBarInfo] = useState(null);
  // { procStep, loadingStartAt, fileName, segName, uploadState, popNav }
  const miniBarExpandRef    = useRef(null); // set by PopulationGroupsView → () => setMiniBar(false)
  const miniBarCloseRef     = useRef(null); // set by PopulationGroupsView → closeModal
  /* keeps PopulationGroupsView mounted off-screen after "Show Summary" is clicked
     so its position:fixed drawer renders over the current screen */
  const [popViewKeptMounted, setPopViewKeptMounted] = useState(false);
  /* true when off-screen PopView's drawer is open — App renders the backdrop at root z-level */
  const [popViewDrawerOpen, setPopViewDrawerOpen] = useState(false);
  /* stable key for PopView — set once at mini-bar start, does not change when miniBarInfo clears */
  const [miniBarPopKey, setMiniBarPopKey] = useState(null);

  /* ── toast (success + error) ── */
  const [toast, setToast] = useState(null); // { message, type:'success'|'error', exiting }
  const toastTimerRef = useRef(null);
  const showToast = (message, type = 'success') => {
    clearTimeout(toastTimerRef.current);
    setToast({ message, type, exiting: false });
    toastTimerRef.current = setTimeout(() => {
      setToast(t => t ? { ...t, exiting: true } : null);
      setTimeout(() => setToast(null), 300);
    }, 2000);
  };

  /* ── advance steps + auto-complete when navigated away ── */
  useEffect(() => {
    if (!miniBarInfo || miniBarInfo.uploadState !== 'loading') return;
    const elapsed = Date.now() - (miniBarInfo.loadingStartAt || Date.now());
    const rem = t => Math.max(0, t - elapsed);
    const timers = [];
    if (rem(8000) > 0)  timers.push(setTimeout(() => setMiniBarInfo(i => i ? { ...i, procStep: Math.max(i.procStep, 1) } : i), rem(8000)));
    if (rem(18000) > 0) timers.push(setTimeout(() => setMiniBarInfo(i => i ? { ...i, procStep: Math.max(i.procStep, 2) } : i), rem(18000)));
    if (rem(28000) > 0) timers.push(setTimeout(() => setMiniBarInfo(i => i ? { ...i, procStep: Math.max(i.procStep, 3) } : i), rem(28000)));
    if (rem(30000) > 0) timers.push(setTimeout(() => setMiniBarInfo(i => i ? { ...i, uploadState: 'complete' } : i), rem(30000)));
    else setMiniBarInfo(i => i ? { ...i, uploadState: 'complete' } : i);
    return () => timers.forEach(clearTimeout);
  }, [miniBarInfo?.uploadState]);

  const isPopulationView = activeNavItem === 'pg:All' || activeNavItem === 'pg:Static' || activeNavItem === 'pg:Dynamic';
  const activePopFilter  = isPopulationView ? activeNavItem.replace('pg:', '') : 'All';

  /* Keep PopView mounted (off-screen) while mini-bar or summary drawer is active */
  const miniBarActive   = !!(miniBarInfo || popViewKeptMounted);
  /* Stable key: don't remount PopView while mini-bar flow is in progress */
  const stablePopKey    = miniBarActive
    ? (miniBarPopKey?.replace('pg:', '') || activePopFilter)
    : activePopFilter;
  const popViewFilter   = miniBarActive && !isPopulationView
    ? (miniBarInfo?.popNav?.replace('pg:', '') || 'All')
    : activePopFilter;

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#8C5AE2', colorPrimaryBorder: '#8C5AE2', colorPrimaryBg: '#F5F0FF', colorPrimaryHover: '#8C5AE2', fontFamily: 'Inter, sans-serif', borderRadius: 6, controlOutlineWidth: 3, controlOutline: '#F5F0FF' } }}>
      <style>{GLOBAL_CSS}</style>
      <div style={{ display:'flex', alignItems:'stretch', width:'100vw', height:'100vh', overflow:'hidden' }}>
        <ProviderNavMenu activeTab={activeNavTab} onTabChange={handleNavTabChange} />
        <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, overflow:'hidden' }}>
          <TopNavBar activeNavItem={activeNavItem} activeNavTab={activeNavTab} activeCommsItem={activeCommsItem} />
          <div style={{ flex:1, display:'flex', overflow:'hidden', background:'var(--neutral-0)' }}>
            {/* ── Sidebar: Patients menu OR Comms menu depending on active tab ── */}
            {activeNavTab === 'comms'
              ? <CommsMenu activeItem={activeCommsItem} onSelect={setActiveCommsItem} />
              : <PatientsMenu activeItem={activeNavItem} onSelect={setActiveNavItem} collapsed={menuCollapsed} />
            }

            {/* ── Comms content: conversation list + chat view ── */}
            {activeNavTab === 'comms' && (
              <>
                <ConvList activeId={activeConvId} onSelect={setActiveConvId} channelFilter={activeCommsItem} />
                <ChatView conv={CONVERSATIONS.find(c => c.id === activeConvId) || CONVERSATIONS[0]} />
              </>
            )}

            {/* PopulationGroupsView stays mounted while mini-bar active; off-screen when navigated away
                NOTE: must NOT be gated on activeNavTab — unmounting on Comms tab nulls miniBarExpandRef,
                which breaks "Show Summary". Always keep it mounted when miniBarActive. */}
            {(isPopulationView || miniBarActive) && (
              <div style={
                isPopulationView && activeNavTab !== 'comms'
                  ? { flex:1, display:'flex', overflow:'hidden', minWidth:0 }
                  : { position:'fixed', left:'-200vw', top:0, width:'100vw', height:'100vh', zIndex:2000 }
              }>
                <PopulationGroupsView
                  key={stablePopKey}
                  activeFilter={popViewFilter}
                  onToggleSidebar={() => setMenuCollapsed(m => !m)}
                  sidebarCollapsed={menuCollapsed}
                  onMiniBarOpen={info => { setMiniBarInfo({ ...info, popNav: activeNavItem }); setMiniBarPopKey(activeNavItem); }}
                  miniBarExpandRef={miniBarExpandRef}
                  miniBarCloseRef={miniBarCloseRef}
                  onModalClose={() => { setPopViewKeptMounted(false); setPopViewDrawerOpen(false); setMiniBarPopKey(null); }}
                  onBackdropChange={open => setPopViewDrawerOpen(open)}
                  onGroupCreated={name => showToast('Population Group Created Successfully', 'success')}
                  onUploadError={msg => showToast(msg, 'error')}
                  onMemberAdded={msg => showToast(msg, 'success')}
                />
              </div>
            )}

            {activeNavTab !== 'comms' && !isPopulationView && (
              <AWVWorklist onToggleSidebar={() => setMenuCollapsed(m => !m)} sidebarCollapsed={menuCollapsed} />
            )}
          </div>
        </div>
      </div>

      {/* ── App-level backdrop: covers current screen when off-screen PopView drawer opens ── */}
      {popViewDrawerOpen && !isPopulationView && (
        <div
          onClick={() => { miniBarCloseRef.current?.(); setPopViewDrawerOpen(false); setPopViewKeptMounted(false); }}
          style={{ position:'fixed', inset:0, background:'rgba(22,24,29,0.25)', zIndex:1999 }}
        />
      )}

      {/* ── Toast (success + error) ── */}
      {toast && (
        <div style={{ position:'fixed', top:12, left:'50%', transform:'translateX(-50%)', zIndex:9999, pointerEvents:'none' }}>
          <div className={toast.exiting ? 'toast-exit' : 'toast-enter'} style={{ pointerEvents:'auto' }}>
          <div style={{
            display:'flex', alignItems:'center', gap:8,
            background: toast.type === 'error' ? '#DC2626' : '#009B53',
            borderRadius:8,
            padding:'4px 4px 4px 12px',
            height:32, boxSizing:'border-box',
            whiteSpace:'nowrap',
          }}>
            {/* Text */}
            <span style={{ fontSize:14, fontWeight:500, color:'#fff', lineHeight:'120%', flex:1 }}>
              {toast.message}
            </span>
            {/* Dismiss */}
            <button
              onClick={() => { clearTimeout(toastTimerRef.current); setToast(t => t ? { ...t, exiting:true } : null); setTimeout(() => setToast(null), 300); }}
              style={{ width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center', border:'none', background:'none', cursor:'pointer', borderRadius:4, flexShrink:0 }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1L9 9M9 1L1 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          </div>
        </div>
      )}

      {/* ── App-level mini-bar: persists across navigation ── */}
      {miniBarInfo && (
        <div style={{ position:'fixed', bottom:20, right:20, zIndex:3000, animation:'pg-slide-up 0.3s cubic-bezier(0.32,0,0.15,1)' }}>
          {miniBarInfo.uploadState !== 'complete' ? (
            /* Processing */
            <div style={{ background:'#fff', borderRadius:12, boxShadow:'0 8px 32px rgba(0,0,0,0.15)', border:'0.5px solid var(--neutral-150)', width:400, overflow:'hidden' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderBottom:'0.5px solid var(--neutral-100)' }}>
                <div style={{ width:32, height:32, borderRadius:8, background:'var(--primary-100)', border:'0.5px solid var(--primary-200)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <TableIcon color="var(--primary-300)" size={16} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:'var(--neutral-400)' }}>Processing File</div>
                  <div style={{ fontSize:14, color:'var(--neutral-200)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{miniBarInfo.fileName || miniBarInfo.segName || 'New Group'}</div>
                </div>
                <button onClick={() => { miniBarExpandRef.current?.(); setPopViewKeptMounted(true); setMiniBarInfo(null); }}
                  style={{ width:28, height:28, border:'none', background:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, borderRadius:4 }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--neutral-75)'}
                  onMouseLeave={e => e.currentTarget.style.background='none'}
                  title="Expand">
                  <ExpandIcon size={16} color="var(--neutral-300)" />
                </button>
              </div>
              <div style={{ padding:'14px 16px' }}>
                {PROC_STEPS.map((step, i) => {
                  const done   = (miniBarInfo.procStep ?? 0) > i;
                  const active = (miniBarInfo.procStep ?? 0) === i && miniBarInfo.uploadState === 'loading';
                  return (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:10, marginBottom: i < PROC_STEPS.length-1 ? 12 : 0 }}>
                      {done ? (
                        <div style={{ width:20, height:20, borderRadius:'50%', background:'#009B53', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, animation:'pg-step-check 0.25s ease' }}>
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      ) : active ? (
                        <div style={{ width:20, height:20, borderRadius:'50%', border:'2px solid var(--primary-300)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--primary-300)', animation:'pg-pulse 1s ease-in-out infinite' }} />
                        </div>
                      ) : (
                        <div style={{ width:20, height:20, borderRadius:'50%', border:'1.5px solid var(--neutral-150)', flexShrink:0 }} />
                      )}
                      <span style={{ fontSize:14, color: done?'#16a34a' : active?'var(--primary-300)' : 'var(--neutral-200)', fontWeight: (done||active)?500:400, transition:'color 0.2s' }}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Done */
            <div style={{ background:'#fff', borderRadius:12, boxShadow:'0 8px 32px rgba(0,0,0,0.15)', border:'0.5px solid #bbf7d0', width:400, overflow:'hidden', animation:'pg-fade-up 0.3s ease' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderBottom:'0.5px solid #dcfce7', background:'linear-gradient(90deg, #f0fdf4 0%, #ffffff 100%)' }}>
                <div style={{ width:32, height:32, borderRadius:'50%', background:'#009B53', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, animation:'pg-badge-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
                  <svg width="16" height="13" viewBox="0 0 16 13" fill="none"><path d="M1.5 6.5L5.5 10.5L14.5 1.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:'var(--neutral-400)' }}>File Extracted &amp; Processed</div>
                  <div style={{ fontSize:14, color:'var(--neutral-300)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{miniBarInfo.fileName || miniBarInfo.segName}</div>
                </div>
                <button onClick={() => { miniBarCloseRef.current?.(); setMiniBarInfo(null); }}
                  style={{ width:28, height:28, border:'none', background:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:6 }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--neutral-75)'}
                  onMouseLeave={e => e.currentTarget.style.background='none'}>
                  <MiniCloseIcon />
                </button>
              </div>
              <div style={{ padding:'14px 16px' }}>
                <button
                  onClick={() => {
                    // PopView is always mounted (off-screen when away) — expand drawer directly
                    miniBarExpandRef.current?.();
                    setPopViewKeptMounted(true); // ensure it stays mounted after miniBarInfo clears
                    setMiniBarInfo(null);
                  }}
                  style={{ width:'100%', height:36, background:'var(--primary-300)', color:'#fff', border:'none', borderRadius:8, fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'Inter, sans-serif', transition:'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--primary-400)'}
                  onMouseLeave={e => e.currentTarget.style.background='var(--primary-300)'}>
                  Show Summary
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </ConfigProvider>
  );
}
