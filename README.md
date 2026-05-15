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


Alignment/list/attachment fix:
- Fixed Range Dashboard misalignment caused by content being placed inside topbar.
- Replaced floating Back to Login with a topbar button to avoid overlap.
- Removed GO field from forms and replaced with Supporting Attachments + AS required/obtained radio question.
- Added searchable/filterable/sortable 10-row record lists with actions to form pages.
- Added record-details.html and placeholder pages for any missing internal links.
- Reinforced Plan default and Non-Plan classification guidance.


Plan/Non-Plan and APO list fix:
- Fixed Plan/Non-Plan field visibility by hiding the full field wrapper, including labels.
- Classification now appears only for Non-Plan selection.
- Plan remains the default selection.
- Removed the repeated APO Builder form from APO list pages.
- Proposed, Approved and Returned APO list pages are now list-only with 10 searchable/filterable/sortable rows and actions.


Final APO list alignment and Plan/Non-Plan field fix:
- Rebuilt Proposed/Approved/Returned APO list pages as list-only pages.
- Reconstructed headers so topbar and FY selector are always in the correct order.
- Added CSS hardening for list/table alignment.
- Ensured Plan/Non-Plan hide logic hides labels and fields together.


AS / attachments / collapsible menu update:
- Administrative Sanction question is now Plan-only.
- Supporting Attachments are placed last before submit and support multiple attachment rows/files.
- Added beneficiary component blocks to APO entry/builder pages before submit.
- Sidebar menu group headings are now collapsible.


APO action rule update:
- Added Delete action to APO list pages.
- Removed APO listing panels from APO builder/form pages.
- Removed Forward action from Range level.
- Division level keeps Forward action.
- Circle and HQ action areas are approval-focused only.


Prior AS / Master Menu / Collapsible Navigation update:
- Dashboard is outside all collapsible menu groups.
- All menu groups are collapsed initially.
- Prior AS Request is a separate menu category at the end.
- Added Prior AS Request and Prior AS Request List pages.
- Added Master Menu page with searchable control-panel style icon grid.


Range Allocation drill-down update:
- Added range-allocation.html.
- Added Range Allocation Details menu item under Range Post-Budget Activities.
- Added head-wise drill-down cards, component table, color-coded timeline, higher officer details and expenditure entry register.


Range alignment fix:
- Rebuilt range-allocation.html with stable wrapper, aligned KPI cards, drill-down cards, component table and timeline.
- Rebuilt Range Dashboard top infographics to remove repeated count/noise and show one clear count per card.


Range allocation final page fix:
- Rebuilt range-allocation.html from the clean Range Dashboard shell.
- Fixed malformed Financial Year bar that was swallowing the page content.
- Rechecked Range Dashboard clean KPI cards and internal links.


Allocation head/component workflow update:
- Removed timeline from range-allocation.html.
- Reworked range-allocation.html into horizontal head cards with mini graphs and summary details.
- Added separate component-list pages for each budget head.
- Added component detail pages with allocation and expenditure tables/flow details.
- Removed APO Builder duplicate label and standardized Range menu label as APO Entry.


Budget head card and component print update:
- Changed range-allocation.html budget head cards to a 2-column layout.
- Replaced spark-style mini graph with calculated Allocation / Expenditure / Balance bars.
- Realigned budget-head component pages with printable header, print button and printable component register.


Range allocation full-width alignment fix:
- Made range-allocation.html main content full width.
- Reconstructed FY bar placement after topbar.
- Forced footer into normal bottom flow.
- Added page-scoped CSS to avoid left/right broken layout.


Allotment terminology and card cleanup:
- Renamed Allocation to Allotment in visible content.
- Head cards now show Budget, Allotment and Components only; removed Entered and Allocated By details from head cards.
- Allotment is lower than Budget to represent release/disbursement.
- Component cards simplified to avoid repeated stats and status badges; primary action is View Details.
- Removed developer-style labels such as Card View.


Head/component alignment and balance graph fix:
- Removed top-right allotment amount from Budget Head cards.
- Added Balance row to Budget/Allotment/Expenditure graphs.
- Rebuilt head and component pages from the clean Range shell to fix heading/footer side-by-side misalignment.
- Ensured footer is full-width and bottom-aligned on head/component pages.


Wage Distribution Fund Request update:
- Renamed Range Wage Distribution to Wage Distribution Fund Request.
- Infographics now appear only after Excel upload preview.
- Preview is clearly marked Not Submitted with color-coded rows.
- Added range-wage-requests.html for submitted wage requests with status and view links.
- Added wage-request-details.html for viewing submitted request details.
- Added updated Excel template for wage fund request upload.


Range Surrender Amount module:
- Added range-surrender.html as a separate Range module.
- Added component/head charts showing Budget, Allotment, Expenditure and Balance.
- Added surrender request form with balance to be surrendered and automatic remaining balance calculation.
- Added Surrender Request Register with status and view/correct links.
- Added Range menu and Master Menu links.


Surrender workflow split update:
- Split surrender module into Surrender Entry and Surrender Requests pages.
- Surrender Requests page shows submitted-data infographics at top.
- Surrender Entry page shows head cards with prominent search/filter/sort controls for balance and utilization.
- Each head opens a separate component page.
- Each component has a Surrender button opening a modal with amount-to-surrender entry and remaining balance calculation infographic.


Surrender modal validation and global layout fix:
- Added validation so surrender amount cannot be more than available balance.
- Modal submit button remains disabled until a valid surrender amount is entered.
- Rebuilt FY bar placement across all pages so content is not trapped inside the FY row.
- Added global layout hardening so headings, page content and footer stay full-width and bottom-aligned.


Component card and label corrections:
- Surrender component cards now use a maximum of 3 cards per row, with responsive 2/1 columns.
- Added a prominent New Surrender Entry CTA above the submitted surrender request list.
- Renamed Action Plan Request to Submit Action Plan across page/menu labels.
- Renamed Range Progress Update / Progress Update to Progress Updation across page/menu labels.


Range Dashboard redesign:
- Rebuilt range-dashboard.html into a concise command-centre layout.
- Added clear hero summary, role responsibility notes, APO pipeline, financial snapshot, workflow map, operational workbench, attention alerts and recent activity.
- Kept links to all major Range modules: APO Entry, Submit Action Plan, Progress Updation, Allotment, Surrender, Wage Fund Request and Revenue Target.


Range Dashboard graph update:
- Removed Workflow Map and Operational Workbench sections.
- Added Dashboard Analytics with utilization donut, APO status distribution, monthly progress trend graph, revenue/request bars and detail boxes.


HQ Direct Resumption correction:
- Removed chain workflow concept.
- HQ resumption is now direct pull-back from Range, Division or Circle balances.
- Redesigned hq-resumption.html with tabs for From Ranges, From Divisions and From Circles.
- Added pull-back modal with amount validation and remaining balance calculation.
- Added read-only Resumption Details pages for Range, Division and Circle offices.


HQ menu/dashboard/help rework:
- Reorganized HQ menu into APO Submissions, Budget Allocations, Finance Control, Monitoring & Reports, Administration & Masters, and Help.
- Added separate APO Submission Inbox with approve/reject/return actions and status registers.
- Added separate Budget Allocation and Allotment Register modules.
- Redesigned HQ dashboard into a richer but concise graph-led command centre with icons, KPI cards, Kerala circle overview and action centre.
- Completely redesigned Master Menu by workflow category.
- Redesigned sitemap as Help with project-wide categorized explanations for HQ, Range, Division and Circle modules.


HQ Estimator module:
- Added a separate Estimator category in HQ menu.
- Added Forest Work Estimator page with office/head/work selections, rate, quantity, terrain/access loading, labour/material split and live estimate preview.
- Added Estimator Rate Library page.
- Added Estimate Register page.
- Updated HQ dashboard, Master Menu and Help page to include Estimator modules.


Full workflow recheck update:
- Added lower-office approval pages for Action Plan, Wage Fund Request and Surrender Request in Division, Circle and HQ.
- Updated Division and Circle menus to separate Own Submissions from Approvals from Lower Offices.
- Updated Division and Circle dashboards with lower-office approval snapshot cards.
- Reworked HQ APO Inbox with tabs for Forwarded from Circles and Entered from HQ.
- Reworked budget-hq.html as Budget Estimate - HQ, the HQ direct budget estimate entry/register page.
- Restored the Kerala district GeoJSON/Leaflet map in HQ Dashboard with district-wise financial demo data.
- Added HQ menu items for lower-office requests and updated Master Menu / Help.


Theme switcher update:
- Added a top-bar theme switcher near Back to Login and fullscreen controls.
- Themes included: Forest Dark, Projector Green, Light, and Earth Gold.
- Projector Green uses brighter greens and lighter input backgrounds for large/darker displays.
- Light theme uses dark text on light panels and inputs.
- Earth Gold provides an alternate warm high-contrast display mode.
- Sidebar overlay in the existing Forest Dark theme was made more transparent so the background image is visible.
- Inputs, tables, cards, icons, map popups and text colors are theme-aware for better contrast.


Light theme contrast fix:
- Strengthened light theme foreground/background contrast across sidebar, cards, graphs, forms, tables and maps.
- Sidebar now uses a clearer pale overlay with solid readable menu items.
- Graph tracks/fills and SVG text are recolored for light mode.
- Tables, badges, buttons, inputs and map popups now use darker text in light mode.
