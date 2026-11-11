export const NAV_MARKUP = String.raw`
<header class="masthead"><a class="brand" href="#kalender"><span class="brand-mark" data-icon="activity"></span><span>Kracht &amp; 5 km</span></a><div class="local-note" id="localNote" hidden>Lokale test<span>Alleen op dit apparaat</span></div><nav class="dock glass" aria-label="Hoofdnavigatie"><a href="#kalender" data-main-nav="kalender"><span data-icon="calendar"></span>Kalender</a><a href="#bibliotheek" data-main-nav="bibliotheek"><span data-icon="layers"></span>Workouts</a><a href="#run" data-main-nav="run"><span data-icon="run"></span>5 km</a></nav></header>
`;

export const PLANNER_MARKUP = String.raw`
<section class="view" id="view-kalender" aria-labelledby="plannerTitle" hidden>
<header class="page-heading"><div><div class="micro">Kracht &amp; 5 km</div><h1 id="plannerTitle">Kalender</h1></div></header>
<div class="planner-layout">
<section class="planner-today glass" aria-labelledby="plannerTodayHeading"><div class="planner-section-head"><div><h2 id="plannerTodayHeading">Vandaag</h2><p class="panel-sub" id="plannerTodayDate"></p></div></div><p class="week-line" id="weekLine" role="status"></p><div id="plannerTodayItems" class="planner-today-items"></div><button class="primary" id="plannerAddToday" type="button">+ Workout toevoegen</button></section>
<section class="planner-library" aria-labelledby="plannerLibraryHeading"><div class="panel-top"><h2 id="plannerLibraryHeading">Workouts</h2><p class="planner-drag-hint">Sleep naar een dag</p></div><div class="planner-templates" id="plannerTemplates"></div>
<div class="planner-return" id="plannerReturn">Hierheen slepen om te verwijderen</div></section>
<section class="planner-month-panel glass" aria-label="Maandkalender"><div class="planner-month-head"><div><h2 id="plannerMonthTitle"></h2><p>Een training telt als gedaan zodra je hem afrondt.</p></div><div class="planner-month-nav"><button class="icon-button" type="button" id="plannerPrevMonth" aria-label="Vorige maand">‹</button><button class="icon-button" type="button" id="plannerNextMonth" aria-label="Volgende maand">›</button></div></div><div class="planner-weekdays" aria-hidden="true"><span>Ma</span><span>Di</span><span>Wo</span><span>Do</span><span>Vr</span><span>Za</span><span>Zo</span></div><div class="planner-grid" id="plannerDays"></div><div class="planner-month-foot"><span class="planner-legend"><span><i class="legend-mark gym" data-icon="dumbbell"></i>Gym</span><span><i class="legend-mark run" data-icon="run"></i>Run</span><span><i class="legend-mark planned" data-icon="clock"></i>Gepland</span><span><i class="legend-mark done" data-icon="check"></i>Gedaan</span></span><span id="plannerMonthCount"></span></div></section>
</div>
</section>
<section class="view planner-picker" id="view-toevoegen" aria-labelledby="plannerAddTitle" hidden><div class="planner-editor-top"><button type="button" class="planner-back" id="plannerAddBack">‹ Terug</button></div><h1 id="plannerAddTitle">Workout toevoegen</h1><label class="planner-date-label" for="plannerAddDate">Datum<input type="date" id="plannerAddDate" required></label><div class="planner-templates" id="plannerPickerTemplates"></div></section>
<section class="view" id="view-workout" aria-labelledby="plannerWorkoutTitle" hidden><div class="planner-editor-top"><button type="button" class="planner-back" id="plannerWorkoutBack">‹ Terug</button><span class="planner-save" id="plannerEditorSave" role="status" aria-live="polite"></span></div><div id="plannerEditor"></div></section>
<section class="view" id="view-bibliotheek" aria-labelledby="libraryTitle" hidden>
<header class="page-heading"><div><div class="micro">Templates en oefeningen</div><h1 id="libraryTitle">Workouts</h1></div></header>
<section class="lib-section" aria-labelledby="tplHeading"><div class="panel-top"><h2 id="tplHeading">Templates</h2><button type="button" class="ghost" id="tplNew">+ Nieuwe template</button></div><div class="lib-grid" id="tplList"></div></section>
<section class="lib-section" aria-labelledby="exHeading"><div class="panel-top"><h2 id="exHeading">Oefeningen</h2><button type="button" class="ghost" id="exNew">+ Nieuwe oefening</button></div><input class="field" id="exSearch" type="search" placeholder="Zoek een oefening" autocomplete="off" aria-label="Zoek een oefening"><div id="exList" class="lib-list"></div><label class="lib-toggle" for="exArchived"><input type="checkbox" id="exArchived">Toon gearchiveerde oefeningen en templates</label></section>
</section>
<section class="view" id="view-template" aria-labelledby="tplEditorTitle" hidden><div class="planner-editor-top"><a class="planner-back" href="#bibliotheek">‹ Workouts</a><span class="planner-save" id="tplSave" role="status" aria-live="polite"></span></div><h1 class="sr-only" id="tplEditorTitle">Template bewerken</h1><div id="tplEditor"></div></section>
<section class="view" id="view-run" aria-labelledby="runTitle" hidden>
<header class="page-heading"><div><div class="micro">Twaalf runs, één per week</div><h1 id="runTitle">5 km</h1></div></header>
<div id="runView"></div>
</section>
<div class="sheet" id="sheet" hidden><div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheetTitle"><div class="sheet-head"><h2 id="sheetTitle"></h2><button type="button" class="icon-button" id="sheetClose" aria-label="Sluiten">×</button></div><div id="sheetBody"></div></div></div>
`;
