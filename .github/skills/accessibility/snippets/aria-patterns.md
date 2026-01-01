# ARIA quick patterns (use sparingly)

## Icon-only button
<button aria-label="Close">…</button>

## Expand/collapse
<button aria-expanded="true|false" aria-controls="panel-id">…</button>
<div id="panel-id" hidden>…</div>

## Tabs (simplified)
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">Tab 1</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">…</div>

## Dialog essentials
role="dialog", aria-modal="true", aria-labelledby="title-id"
Move focus in on open; restore focus on close; Escape closes
