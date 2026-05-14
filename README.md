# VanaNidhi Full Demo Portal

Client-facing static HTML prototype for Kerala Forest Department finance and budget software.

Open `index.html` first, then use the sidebar. The sitemap page explains requirement-to-solution mapping.

Pages:
- Dashboard
- Sitemap & Requirement Trace
- APO Workspace
- Budget Estimates
- Forestry Works
- Revenue / eTreasury
- Funds & Pending Bills
- Progress Monitoring
- Reports & Annexures
- Masters & Administration

CDNs used:
- Chart.js
- D3.js
- Leaflet
- Font Awesome
- Google Fonts

Footer: CDIPD, Digital University Kerala.


Flow document update:
- Added role-wise Budget Estimate screens: Range, Division, Circle and HQ.
- Modified Masters & Administration as per new Flow requirements.
- Updated Budget Overview and Sitemap traceability page.
- Added forms for Plan/Non Plan, beneficiary components, prior AS, wage distribution, pending bill, surrender, resumption, revenue target and progress update.


Budget Heads / Performance Budget update:
- Added budget-heads.html using uploaded Plan and Non-Plan Budget Head spreadsheets.
- Added performance-budget.html using Annexure-style Performance Budget format.
- Updated reports.html with infographic icon cards, report catalogue, charts and annexure previews.
- Updated masters-admin.html to use Budget Head Master values and Non-Plan add/edit.
- Updated Budget Overview and Sitemap traceability.


Navigation/workflow update:
- Dashboard label changed to "Integrated Forest Budget & Finance Management System".
- Added separate Hierarchy View menu/page with workflow graph.
- Grouped sidebar menu with headings:
  Main, Pre-Budget Activities, Budget Allocation Activities, Post-Budget Tracking Activities, Administration.
- Dashboard now highlights three major activity blocks.
- Sitemap rewritten as a story-driven workflow guide with categorization and page-purpose explanation.


Role-based portal update:
- Added separate login screens for State/HQ, Range, Division and Circle.
- State/HQ remains the current full version.
- Range, Division and Circle have restricted dashboards and menus only.


Login fix update:
- index.html is now the default login / role selection page.
- Former full dashboard moved to state-dashboard.html.
- Financial Year selector removed from all login pages.
- Login buttons are now direct links, so they work without JS.
- Added floating Back to Login button on all portal pages.


Requirement update package:
- Brighter UI theme.
- Financial Year selector added to major pages.
- HQ dashboard login cards removed.
- Range/Division/Circle labels use APO; HQ uses Budget Estimate.
- HQ APO period management page added.
- GO if available field added to APO workflows.
- Notes fields updated with WYSIWYG editor.
- Range dashboard rebuilt with APO Summary, Progress Details and Revenue Target.
- Prior AS, Action Plan Request, APO filtered lists and Allocation Details pages added.
- Division APO Submissions and Wage Excel Upload added.


HQ / PO responsibility fix:
- Removed PO Component and Subcomponent approval treatment from sub-office dashboard logic.
- Range dashboard now shows APO status only plus progress and revenue sections.
- HQ dashboard restored with previous command-centre sections, maps, charts, approval inbox and rankings.
- HQ now explicitly owns PO Components and Subcomponents management.
- Floating Back to Login button repositioned to avoid overlapping dashboard cards.
