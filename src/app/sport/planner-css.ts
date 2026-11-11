export const PLANNER_CSS = String.raw`
/* Calendar */
.panel-top{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:12px}
.panel-top h2,.planner-section-head h2{font-size:22px;font-weight:700;letter-spacing:-.3px}
.planner-layout{display:grid;gap:18px}
.planner-today{border-radius:var(--r-lg);padding:20px;display:grid;gap:14px}
.planner-today-items{display:grid;gap:10px}
.planner-today-item{display:flex;align-items:center;gap:12px;width:100%;min-height:64px;padding:10px 14px;border-radius:var(--r-md);border:1px solid var(--edge-soft);background:rgba(var(--w),.07);text-align:left;transition:background .2s,transform .15s var(--ease)}
.planner-today-item:hover{background:rgba(var(--w),.13)}.planner-today-item:active{transform:scale(.985)}
.planner-today-item>span:nth-child(2){flex:1;min-width:0}
.planner-today-item b{display:block;font-size:17px;font-weight:700;font-family:var(--display)}
.planner-today-item small{display:block;font-size:14px;color:var(--mut)}
.planner-today-item>.icon{color:var(--dim)}
.planner-today-empty{font-size:16px;color:var(--mut)}
.planner-today>.primary{width:100%}

.planner-library{order:3}
.planner-templates{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.planner-template{display:grid;grid-template-columns:40px minmax(0,1fr);align-items:center;column-gap:12px;row-gap:10px;min-width:0;padding:14px;border-radius:var(--r-md);border:1px solid var(--edge-soft);background:linear-gradient(165deg,rgba(var(--w),.1),rgba(var(--w),.04));box-shadow:inset 0 1px 0 rgba(255,255,255,.22);text-align:left;transition:background .2s,transform .15s var(--ease),border-color .2s}
.planner-template:hover{border-color:var(--edge);background:linear-gradient(165deg,rgba(var(--w),.16),rgba(var(--w),.07))}
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
.planner-day{min-width:0;min-height:86px;padding:2px;border-radius:12px;background:rgba(var(--w),.045);border:1px solid transparent;transition:background .2s,border-color .2s}
.planner-day.other-month{background:transparent}
.planner-day.drag-over{background:rgba(185,168,255,.25);border-color:var(--iris)}
.planner-day-head{display:flex;align-items:center;justify-content:center;width:100%;min-height:36px;border-radius:10px;font-family:var(--display);font-size:15px;font-weight:600;color:var(--mut);transition:background .15s}
.planner-day-head:hover{background:rgba(var(--w),.1)}
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
.legend-mark{display:grid;place-items:center;width:20px;height:20px;border-radius:6px;border:1.5px solid var(--iris);background:var(--iris-fill);color:#16103a}
.legend-mark .icon{width:12px;height:12px;stroke-width:2.6}
.legend-mark.run{border-color:var(--tide);background:var(--tide-fill);color:#04261f;border-radius:50%}
.legend-mark.planned{background:transparent;border-style:dashed;border-color:var(--mut);color:var(--mut)}
.legend-mark.done{background:var(--ink);border-color:var(--ink);color:#0b1124}

/* Picker and editor chrome */
.planner-editor-top{position:sticky;top:0;z-index:15;display:flex;align-items:center;justify-content:space-between;gap:12px;margin:-16px -16px 18px;padding:10px 16px;background:var(--bar);-webkit-backdrop-filter:blur(18px) saturate(160%);backdrop-filter:blur(18px) saturate(160%);border-bottom:1px solid var(--edge-soft)}
.planner-back{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--edge);background:rgba(var(--w),.08);font-size:15px;font-weight:600;text-decoration:none;transition:background .2s,transform .15s var(--ease)}
.planner-back:hover{background:rgba(var(--w),.16)}.planner-back:active{transform:scale(.96)}
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
.exercise-superset{display:inline-flex;width:fit-content;padding:3px 10px;border-radius:999px;background:rgba(var(--w),.12);font-size:13px;font-weight:700}
.exercise-swap{display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:14px;color:var(--mut)}
.exercise-swap button{min-height:40px;padding:0 14px;border-radius:999px;border:1px solid var(--edge);background:rgba(var(--w),.06);font-size:14px;font-weight:600;transition:background .2s}
.exercise-swap button:hover{background:rgba(var(--w),.16)}
.exercise-previous{font-size:15px;color:var(--mut);margin-bottom:12px}
.exercise-previous b{color:var(--ink);font-weight:600;font-variant-numeric:tabular-nums}
.planner-set-grid{display:grid;grid-template-columns:26px minmax(0,1fr) minmax(0,1fr) 44px;gap:8px;align-items:center}
.planner-set-head{font-size:13px;font-weight:600;color:var(--mut);margin-bottom:6px}
.planner-set-head span:first-child{text-align:center}
.planner-set-list{display:grid;gap:8px}
.planner-set-number{font-family:var(--display);font-size:17px;font-weight:700;color:var(--mut);text-align:center}
.planner-set-row input{font-family:var(--display);font-size:22px;font-weight:700;text-align:center;min-height:56px;padding:8px 6px}
.planner-remove-set{display:grid;place-items:center;width:44px;height:56px;border-radius:12px;color:var(--dim);font-size:24px;transition:background .2s,color .2s}
.planner-remove-set:hover{background:rgba(var(--w),.1);color:var(--ink)}
.planner-add-set{display:inline-flex;align-items:center;gap:8px;min-height:48px;padding:0 6px;margin-top:6px;font-size:15px;font-weight:600;color:var(--iris)}
.planner-add-set .icon{width:18px;height:18px}
.planner-add-exercise{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:56px;margin-top:14px;border-radius:var(--r-md);border:1.5px dashed var(--edge);font-size:16px;font-weight:600;color:var(--mut);transition:background .2s,color .2s}
.planner-add-exercise:hover{background:rgba(var(--w),.07);color:var(--ink)}
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
 .planner-exercise{padding:20px}
 .planner-picker h1,.planner-editor-head h1{font-size:44px}
}
@media(min-width:900px) and (hover:hover) and (pointer:fine){
 .planner-drag-hint{display:block;font-size:13px;color:var(--dim)}
 .planner-return{display:block;margin-top:12px;padding:14px;border-radius:var(--r-md);border:1.5px dashed var(--edge);text-align:center;font-size:14px;color:var(--mut);transition:background .2s,border-color .2s}
 .planner-return.active{background:rgba(255,156,156,.18);border-color:var(--rose);color:var(--ink)}
}
@media(max-width:350px){.planner-exercise{padding:14px 10px}.planner-event{font-size:11px}}

/* Week line */
.week-line{font-size:15px;font-weight:600;color:var(--ink);padding:10px 14px;border-radius:var(--r-sm);background:rgba(116,236,208,.12);border:1px solid rgba(116,236,208,.26)}

/* Workout editor: one exercise per card, sets confirmed one by one */
.ex-block{display:grid;gap:8px}
.ex-block.is-pair{padding:8px;margin:0 -8px;border-radius:calc(var(--r-md) + 8px);border:1px dashed var(--edge)}
.ex-block.dragging{position:relative;z-index:2;opacity:.92;box-shadow:0 18px 40px -16px rgba(0,0,0,.8);border-radius:var(--r-md)}
.ex-block.dragging .planner-exercise{border-color:var(--iris)}
body.is-sorting{cursor:grabbing;-webkit-user-select:none;user-select:none}
.ex-head{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.drag-handle{display:grid;place-items:center;width:40px;height:52px;margin-left:-6px;flex-shrink:0;border-radius:12px;color:var(--mut);cursor:grab;touch-action:none}
.drag-handle .icon{fill:currentColor;stroke:none;width:22px;height:22px}
.drag-handle:hover{color:var(--ink);background:rgba(var(--w),.08)}
.ex-title{flex:1;min-width:0}
.ex-title h2{font-size:20px;font-weight:800;letter-spacing:-.3px;line-height:1.15;overflow-wrap:anywhere}
.ex-title p{font-size:14px;color:var(--mut);margin-top:2px}
.ex-title .ex-target{font-family:var(--display);font-size:17px;font-weight:800;color:var(--ink)}
.ex-action{display:inline-grid;place-items:center;min-height:44px;padding:0 12px;flex-shrink:0;border-radius:12px;border:1px solid var(--edge-soft);font-size:14px;font-weight:600;color:var(--mut);transition:background .2s,color .2s}
.ex-action:hover{background:rgba(var(--w),.1);color:var(--ink)}
.ex-action.icon-only{width:44px;padding:0}
.ex-action.icon-only:hover{background:rgba(255,156,156,.16);color:var(--rose)}
.ex-action .icon{width:18px;height:18px}
.set-head,.set-row{display:grid;grid-template-columns:26px minmax(0,1fr) minmax(0,1fr) 56px;gap:8px;align-items:center}
.set-head.no-weight,.set-row.no-weight{grid-template-columns:26px minmax(0,1fr) 56px}
.set-head{font-size:13px;font-weight:600;color:var(--mut);margin-bottom:6px;text-align:center}
.set-row input{font-family:var(--display);font-size:22px;font-weight:700;text-align:center;min-height:56px;padding:8px 6px}
/* A grey number is a proposal from last time. It only becomes yours when you confirm the set. */
.set-row input::placeholder{color:#8a93ad;font-weight:600}
.set-row.is-done input{background:#d9f7ee;border-color:var(--tide-deep)}
.set-tick{display:grid;place-items:center;width:56px;height:56px;border-radius:var(--r-sm);border:2px dashed var(--edge);color:var(--dim);transition:background .15s,color .15s,border-color .15s,transform .15s var(--ease)}
.set-tick .icon{width:26px;height:26px;stroke-width:2.6}
.set-tick:hover{border-color:var(--tide);color:var(--tide)}
.set-tick:active{transform:scale(.92)}
.set-tick[aria-pressed=true]{border-style:solid;border-color:var(--tide);background:var(--tide-fill);color:#04261f}
.set-actions{display:flex;flex-wrap:wrap;gap:4px 18px;margin-top:6px}
.planner-add-set.minus{color:var(--mut)}
.workout-note{display:grid;gap:6px;margin-top:18px}
.finish-area{display:grid;gap:4px;margin-top:18px}
.run-log-confirm{width:100%;min-height:56px}
.run-log-edit{justify-content:center}
.run-inline-plan{padding:16px;border-radius:var(--r-md);margin-bottom:14px}
.run-inline-plan h2{font-size:20px;font-weight:800;letter-spacing:-.3px;margin-bottom:8px}
.run-step{display:grid;grid-template-columns:32px minmax(0,1fr);gap:12px;padding:10px 0;border-bottom:1px solid var(--edge-soft)}
.run-step-number{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:rgba(116,236,208,.18);color:var(--tide);font-family:var(--display);font-size:15px;font-weight:800}
.run-step strong{font-size:16px;font-weight:700}
.run-step p{font-family:var(--display);font-size:18px;font-weight:800;color:var(--ink);margin-top:2px}
.run-note{font-size:15px;line-height:1.5;color:var(--mut);margin-top:12px}

/* Library and templates */
.lib-section{margin-bottom:30px}
.lib-section .panel-top{align-items:center}
.lib-grid{display:grid;gap:10px}
.lib-card{display:grid;gap:4px;padding:16px;border-radius:var(--r-md);text-decoration:none;transition:transform .15s var(--ease),border-color .2s}
.lib-card:hover{border-color:var(--edge)}.lib-card:active{transform:scale(.99)}
.lib-card b{font-family:var(--display);font-size:19px;font-weight:800}
.lib-card small{font-size:14px;font-weight:600;color:var(--mut)}
.lib-card p{font-size:14px;line-height:1.5;color:var(--mut);margin-top:6px;padding-top:8px;border-top:1px solid var(--edge-soft)}
.lib-list{display:grid;gap:6px;margin-top:12px}
.lib-list h3{font-size:14px;font-weight:700;color:var(--mut);margin:12px 0 2px}
.lib-row{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:60px;padding:8px 14px;border-radius:var(--r-sm);border:1px solid var(--edge-soft);background:rgba(var(--w),.06);text-align:left;transition:background .2s}
.lib-row:hover{background:rgba(var(--w),.12)}
.lib-row b{display:block;font-size:17px;font-weight:700}
.lib-row small{display:block;font-size:14px;color:var(--mut)}
.lib-row>.icon{color:var(--dim)}
.is-archived{opacity:.6}
.lib-toggle{display:flex;align-items:center;gap:10px;min-height:44px;margin-top:14px;font-size:15px}
.lib-toggle input,.slot-super input{width:22px;height:22px;accent-color:var(--iris-deep)}
.tpl-name{display:grid;gap:6px;grid-column:1/-1}
.tpl-name input{font-family:var(--display);font-size:24px;font-weight:800}
.tpl-hint{margin:-6px 0 16px;max-width:44em}
.tpl-slots{display:grid;gap:10px}
.slot-row{display:grid;grid-template-columns:40px minmax(0,1fr) 44px;gap:6px;align-items:start;padding:14px 12px;border-radius:var(--r-md)}
.slot-row.dragging{position:relative;z-index:2;border-color:var(--iris);box-shadow:0 18px 40px -16px rgba(0,0,0,.8)}
.slot-main h3{font-size:18px;font-weight:800;margin-bottom:8px;overflow-wrap:anywhere}
.slot-fields{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.slot-fields label{display:grid;gap:4px}
.slot-fields .field{font-family:var(--display);font-size:20px;font-weight:700;text-align:center;padding:8px 6px}
.slot-super{display:flex;align-items:center;gap:10px;min-height:44px;margin-top:8px;font-size:14px}

/* Sheet: pick or edit an exercise without leaving the workout */
.sheet{position:fixed;inset:0;z-index:50;display:flex;align-items:flex-end;justify-content:center;background:rgba(3,6,18,.6)}
.sheet-panel{width:min(560px,100%);max-height:88dvh;overflow-y:auto;padding:18px 16px calc(22px + env(safe-area-inset-bottom));border-radius:var(--r-lg) var(--r-lg) 0 0;border:1px solid var(--edge);background:var(--solid);box-shadow:0 -24px 60px -20px rgba(6,10,36,.6);overscroll-behavior:contain}
.sheet-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
.sheet-head h2{font-size:24px;font-weight:800;letter-spacing:-.4px}
.sheet-form{display:grid;gap:14px}
.sheet-form label{display:grid;gap:6px}
.sheet-form .text-button{justify-content:center}
body.sheet-open{overflow:hidden}
.pick-list{margin-bottom:6px}

/* 5 km */
.run-summary{display:grid;gap:18px;padding:22px 20px;border-radius:var(--r-lg);margin-bottom:16px}
.run-summary h2{font-size:30px;line-height:1.1;font-weight:800;letter-spacing:-.6px;margin-top:4px}
.run-summary p{font-size:15px;color:var(--mut);margin-top:6px}
.run-baseline,.run-progress{padding-top:16px;border-top:1px solid var(--edge-soft)}
.run-baseline>span,.run-progress>span{display:block;font-size:14px;font-weight:600;color:var(--mut)}
.run-baseline strong{display:block;font-family:var(--display);font-size:26px;font-weight:800;letter-spacing:-.4px;font-variant-numeric:tabular-nums}
.run-baseline small{display:block;font-size:14px;color:var(--mut)}
.run-progress strong{font-family:var(--display);font-size:26px;font-weight:800;font-variant-numeric:tabular-nums;margin-right:8px}
.run-progress>span{display:inline}
.run-progress-track{height:10px;border-radius:999px;background:rgba(var(--w),.12);margin-top:12px;overflow:hidden}
.run-progress-track i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,var(--iris-deep),var(--tide-deep))}
.run-intro{margin-bottom:16px;max-width:46em;line-height:1.5}
.run-list{display:grid;gap:10px}
.run-card{border-radius:var(--r-md);padding:0 16px}
.run-card.is-next{border-color:var(--iris);box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 0 0 1px var(--iris),0 24px 60px -28px rgba(124,98,240,.9)}
.run-card summary{display:flex;align-items:center;gap:12px;min-height:68px;padding:8px 0;cursor:pointer;list-style:none}
.run-card summary::-webkit-details-marker{display:none}
.run-num{display:grid;place-items:center;width:36px;height:36px;flex-shrink:0;border-radius:50%;background:var(--tide-fill);color:#04261f;font-family:var(--display);font-size:17px;font-weight:800}
.run-card-title{flex:1;min-width:0}
.run-card-title b{display:block;font-family:var(--display);font-size:18px;font-weight:800}
.run-card-title small{display:block;font-size:14px;color:var(--mut)}
.run-card-body{padding:4px 0 16px}
.run-card-body button{width:100%;margin-top:14px}

@media(min-width:560px){.lib-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.sheet{align-items:center}.sheet-panel{border-radius:var(--r-lg)}}
@media(min-width:900px){
 .lib-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
 .lib-list{grid-template-columns:repeat(2,minmax(0,1fr))}.lib-list h3{grid-column:1/-1}
 .run-summary{grid-template-columns:1.4fr 1fr 1fr;align-items:center;gap:28px;padding:28px}
 .run-summary h2{font-size:38px}
 .run-baseline,.run-progress{padding-top:0;border-top:0;padding-left:28px;border-left:1px solid var(--edge-soft)}
 .run-list{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}
}
`;
