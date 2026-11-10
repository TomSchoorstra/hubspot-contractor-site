export const PLANNER_CSS = String.raw`
/* Calendar */
.panel-top{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:12px}
.panel-top h2,.planner-section-head h2{font-size:22px;font-weight:700;letter-spacing:-.3px}
.planner-layout{display:grid;gap:18px}
.planner-today{border-radius:var(--r-lg);padding:20px;display:grid;gap:14px}
.planner-today-items{display:grid;gap:10px}
.planner-today-item{display:flex;align-items:center;gap:12px;width:100%;min-height:64px;padding:10px 14px;border-radius:var(--r-md);border:1px solid var(--edge-soft);background:rgba(255,255,255,.07);text-align:left;transition:background .2s,transform .15s var(--ease)}
.planner-today-item:hover{background:rgba(255,255,255,.13)}.planner-today-item:active{transform:scale(.985)}
.planner-today-item>span:nth-child(2){flex:1;min-width:0}
.planner-today-item b{display:block;font-size:17px;font-weight:700;font-family:var(--display)}
.planner-today-item small{display:block;font-size:14px;color:var(--mut)}
.planner-today-item>.icon{color:var(--dim)}
.planner-today-empty{font-size:16px;color:var(--mut)}
.planner-today>.primary{width:100%}

.planner-library{order:3}
.planner-templates{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.planner-template{display:grid;grid-template-columns:40px minmax(0,1fr);align-items:center;column-gap:12px;row-gap:10px;min-width:0;padding:14px;border-radius:var(--r-md);border:1px solid var(--edge-soft);background:linear-gradient(165deg,rgba(255,255,255,.1),rgba(255,255,255,.04));box-shadow:inset 0 1px 0 rgba(255,255,255,.22);text-align:left;transition:background .2s,transform .15s var(--ease),border-color .2s}
.planner-template:hover{border-color:var(--edge);background:linear-gradient(165deg,rgba(255,255,255,.16),rgba(255,255,255,.07))}
.planner-template:active{transform:scale(.98)}
.planner-template[draggable=true]{cursor:grab}
.planner-template b{font-family:var(--display);font-size:17px;font-weight:700}
.planner-template b small{display:block;font-family:var(--body,inherit);font-size:13px;font-weight:500;line-height:1.3;color:var(--mut);margin-top:2px}
.planner-template p{grid-column:1/-1;font-size:14px;line-height:1.6;color:var(--mut);padding-top:10px;border-top:1px solid var(--edge-soft)}
.planner-drag-hint,.planner-return{display:none}

.planner-month-panel{border-radius:var(--r-lg);padding:16px 8px 14px;margin:0 -6px}
.planner-month-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:0 8px;margin-bottom:14px}
.planner-month-head h2{font-size:26px;font-weight:800;letter-spacing:-.5px;text-transform:capitalize}
.planner-month-head p{font-size:13px;line-height:1.45;color:var(--mut);margin-top:4px;max-width:26em}
.planner-month-nav{display:flex;gap:8px}
.planner-weekdays{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:3px;font-size:13px;font-weight:600;color:var(--dim);text-align:center;margin-bottom:6px}
.planner-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:3px}
.planner-day{min-width:0;min-height:86px;padding:2px;border-radius:12px;background:rgba(255,255,255,.045);border:1px solid transparent;transition:background .2s,border-color .2s}
.planner-day.other-month{background:transparent}
.planner-day.drag-over{background:rgba(185,168,255,.25);border-color:var(--iris)}
.planner-day-head{display:flex;align-items:center;justify-content:center;width:100%;min-height:36px;border-radius:10px;font-family:var(--display);font-size:15px;font-weight:600;color:var(--mut);transition:background .15s}
.planner-day-head:hover{background:rgba(255,255,255,.1)}
.planner-day-head .plus-day{display:none}
.planner-day-head.is-today span:first-child{display:grid;place-items:center;min-width:30px;height:30px;padding:0 6px;border-radius:999px;background:#fff;color:#0b1124;font-weight:800}
.planner-day-items{display:grid;gap:3px}
/* Events: iris square-ish chip for gym, tide for run. Dashed and hollow = planned, filled with a check = done. */
.planner-event{display:flex;align-items:center;justify-content:center;gap:4px;width:100%;min-width:0;min-height:32px;padding:3px 2px;border-radius:9px;border:1.5px solid var(--iris);background:rgba(185,168,255,.9);color:#16103a;font-size:12px;font-weight:700;text-align:left;transition:transform .15s var(--ease),filter .2s}
.planner-event.run{border-color:var(--tide);background:rgba(116,236,208,.92);color:#04261f;border-radius:999px}
.planner-event.planned{background:transparent;border-style:dashed;color:var(--iris)}
.planner-event.run.planned{color:var(--tide)}
.planner-event:hover{filter:brightness(1.12)}.planner-event:active{transform:scale(.95)}
.planner-event[draggable=true]{cursor:grab}
.planner-event>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.planner-event .icon{width:12px;height:12px;stroke-width:2.6;display:none}
.planner-event .event-full{display:none}
.planner-month-foot{display:flex;align-items:center;justify-content:space-between;gap:10px 16px;flex-wrap:wrap;padding:0 8px;margin-top:14px;font-size:13px;color:var(--mut)}
.planner-legend{display:flex;flex-wrap:wrap;gap:8px 14px}
.planner-legend>span{display:inline-flex;align-items:center;gap:6px}
.legend-mark{display:grid;place-items:center;width:20px;height:20px;border-radius:6px;border:1.5px solid var(--iris);background:var(--iris);color:#16103a}
.legend-mark .icon{width:12px;height:12px;stroke-width:2.6}
.legend-mark.run{border-color:var(--tide);background:var(--tide);color:#04261f;border-radius:50%}
.legend-mark.planned{background:transparent;border-style:dashed;border-color:var(--mut);color:var(--mut)}
.legend-mark.done{background:var(--ink);border-color:var(--ink);color:#0b1124}

/* Picker and editor chrome */
.planner-editor-top{position:sticky;top:0;z-index:15;display:flex;align-items:center;justify-content:space-between;gap:12px;margin:-16px -16px 18px;padding:10px 16px;background:rgba(9,13,32,.78);-webkit-backdrop-filter:blur(18px) saturate(160%);backdrop-filter:blur(18px) saturate(160%);border-bottom:1px solid var(--edge-soft)}
.planner-back{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--edge);background:rgba(255,255,255,.08);font-size:15px;font-weight:600;text-decoration:none;transition:background .2s,transform .15s var(--ease)}
.planner-back:hover{background:rgba(255,255,255,.16)}.planner-back:active{transform:scale(.96)}
.planner-save{justify-content:flex-end;text-align:right;max-width:60%}
.planner-picker h1,.planner-editor-head h1{font-size:34px;line-height:1.1;font-weight:800;letter-spacing:-.8px}
.planner-picker{max-width:720px;margin:0 auto}
.planner-date-label{display:grid;gap:6px}
.planner-picker .planner-date-label{margin:16px 0 18px}
.planner-picker .planner-templates{grid-template-columns:1fr}
.planner-picker-note{margin-top:18px;font-size:15px;color:var(--mut)}
.planner-editor-head{display:grid;gap:14px;margin-bottom:18px}
.planner-editor-head .micro{display:inline-flex;align-items:center;gap:8px}

/* Gym editor */
.planner-exercises{display:grid;gap:14px}
.planner-exercise{padding:16px 14px;border-radius:var(--r-md)}
.planner-exercise-head{display:flex;align-items:flex-end;gap:10px;margin-bottom:12px}
.planner-exercise-head label{flex:1;min-width:0;display:grid;gap:6px}
.planner-exercise-head input{font-family:var(--display);font-size:19px;font-weight:700}
.planner-remove-exercise{display:grid;place-items:center;width:52px;height:52px;flex-shrink:0;border-radius:var(--r-sm);border:1px solid var(--edge-soft);color:var(--mut);transition:background .2s,color .2s}
.planner-remove-exercise:hover{background:rgba(255,156,156,.16);color:var(--rose)}
.exercise-plan{display:grid;gap:10px;margin-bottom:14px;padding:12px 14px;border-radius:var(--r-sm);background:rgba(185,168,255,.12);border:1px solid rgba(185,168,255,.28)}
.exercise-target{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 12px}
.exercise-target strong{font-family:var(--display);font-size:26px;font-weight:800;letter-spacing:-.4px;line-height:1.1}
.exercise-target span{font-size:15px;font-weight:600;color:var(--ink)}
.exercise-plan p{font-size:15px;line-height:1.5;color:var(--mut)}
.exercise-plan .exercise-note{color:var(--amber)}
.exercise-superset{display:inline-flex;width:fit-content;padding:3px 10px;border-radius:999px;background:rgba(255,255,255,.12);font-size:13px;font-weight:700}
.exercise-swap{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:14px;color:var(--mut)}
.exercise-swap button{min-height:40px;padding:0 14px;border-radius:999px;border:1px solid var(--edge);background:rgba(255,255,255,.06);font-size:14px;font-weight:600;transition:background .2s}
.exercise-swap button:hover{background:rgba(255,255,255,.16)}
.exercise-previous{font-size:15px;color:var(--mut);margin-bottom:12px}
.exercise-previous b{color:var(--ink);font-weight:600;font-variant-numeric:tabular-nums}
.planner-set-grid{display:grid;grid-template-columns:26px minmax(0,1fr) minmax(0,1fr) 44px;gap:8px;align-items:center}
.planner-set-head{font-size:13px;font-weight:600;color:var(--mut);margin-bottom:6px}
.planner-set-head span:first-child{text-align:center}
.planner-set-list{display:grid;gap:8px}
.planner-set-number{font-family:var(--display);font-size:17px;font-weight:700;color:var(--mut);text-align:center}
.planner-set-row input{font-family:var(--display);font-size:22px;font-weight:700;text-align:center;min-height:56px;padding:8px 6px}
.planner-remove-set{display:grid;place-items:center;width:44px;height:56px;border-radius:12px;color:var(--dim);font-size:24px;transition:background .2s,color .2s}
.planner-remove-set:hover{background:rgba(255,255,255,.1);color:var(--ink)}
.planner-add-set{display:inline-flex;align-items:center;gap:8px;min-height:48px;padding:0 6px;margin-top:6px;font-size:15px;font-weight:600;color:var(--iris)}
.planner-add-set .icon{width:18px;height:18px}
.planner-add-exercise{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:56px;margin-top:14px;border-radius:var(--r-md);border:1.5px dashed var(--edge);font-size:16px;font-weight:600;color:var(--mut);transition:background .2s,color .2s}
.planner-add-exercise:hover{background:rgba(255,255,255,.07);color:var(--ink)}
.planner-editor-help{font-size:14px;color:var(--mut);margin-top:14px}
.planner-notice{font-size:15px;font-weight:600;color:var(--amber);margin-top:14px;min-height:0}
.planner-notice:empty{display:none}
.planner-delete{min-height:48px;padding:0 18px;margin:26px 0 8px;border-radius:999px;border:1px solid rgba(255,156,156,.4);color:var(--rose);font-size:15px;font-weight:600;transition:background .2s}
.planner-delete:hover{background:rgba(255,156,156,.14)}
.planner-no-workout{padding:28px 22px;border-radius:var(--r-md);border:1px solid var(--edge-soft);background:var(--pane);font-size:16px;color:var(--mut)}

/* Run form */
.planner-run-form{display:grid;gap:16px;padding:18px 16px;border-radius:var(--r-md)}
.planner-run-form label{display:grid;gap:6px}
.planner-run-columns{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.planner-run-columns input{font-family:var(--display);font-size:22px;font-weight:700}
.planner-pace{font-family:var(--display);font-size:20px;font-weight:700;color:var(--tide);min-height:0}
.planner-pace:empty{display:none}

.planner-editing .app{max-width:860px;padding-top:16px;padding-bottom:calc(40px + env(safe-area-inset-bottom))}

@media(min-width:560px){
 .planner-event{justify-content:flex-start;padding:4px 8px;font-size:13px}
 .planner-event .icon{display:block;margin-left:auto}
 .planner-picker .planner-templates{grid-template-columns:repeat(2,minmax(0,1fr))}
 .planner-editor-head{grid-template-columns:minmax(0,1fr) 220px;align-items:end}
}
@media(min-width:900px){
 .planner-layout{grid-template-columns:minmax(0,1fr) 320px;align-items:start;gap:22px}
 .planner-today{grid-column:2;grid-row:1}
 .planner-library{grid-column:2;grid-row:2;order:0}
 .planner-month-panel{grid-column:1;grid-row:1/span 3;margin:0;padding:24px}
 .planner-month-head,.planner-month-foot{padding:0}
 .planner-templates{grid-template-columns:1fr}
 .planner-day{min-height:118px;padding:4px}
 .planner-day-head{justify-content:space-between;padding:0 6px}
 .planner-day-head .plus-day{display:block;opacity:0;font-size:18px;transition:opacity .15s}
 .planner-day:hover .plus-day,.planner-day-head:focus-visible .plus-day{opacity:.8}
 .planner-grid,.planner-weekdays{gap:6px}
 .planner-event .event-full{display:inline}.planner-event .event-short{display:none}
 .planner-editor-top{margin:-16px 0 24px;border-radius:0 0 var(--r-md) var(--r-md);border:1px solid var(--edge-soft);border-top:0}
 .planner-exercises{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}
 .planner-exercise{padding:20px}
 .planner-picker h1,.planner-editor-head h1{font-size:44px}
}
@media(min-width:900px) and (hover:hover) and (pointer:fine){
 .planner-drag-hint{display:block;font-size:13px;color:var(--dim)}
 .planner-return{display:block;margin-top:12px;padding:14px;border-radius:var(--r-md);border:1.5px dashed var(--edge);text-align:center;font-size:14px;color:var(--mut);transition:background .2s,border-color .2s}
 .planner-return.active{background:rgba(255,156,156,.18);border-color:var(--rose);color:var(--ink)}
}
@media(max-width:350px){.planner-set-grid{grid-template-columns:20px minmax(0,1fr) minmax(0,1fr) 40px;gap:6px}.planner-remove-set{width:40px}.planner-exercise{padding:14px 10px}.planner-event{font-size:11px}}
`;
