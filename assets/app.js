
(function(){
  const sidebar=document.getElementById('sidebar'), scrim=document.getElementById('scrim');
  const menuBtn=document.getElementById('menuBtn');
  if(menuBtn){ menuBtn.onclick=()=>{sidebar.classList.add('open');scrim.classList.add('open');};}
  if(scrim){ scrim.onclick=()=>{sidebar.classList.remove('open');scrim.classList.remove('open');};}
  const fs=document.getElementById('fullScreenBtn');
  if(fs){fs.onclick=async()=>{try{if(!document.fullscreenElement){await document.documentElement.requestFullscreen();fs.textContent='▣'}else{await document.exitFullscreen();fs.textContent='⛶'}}catch(e){alert('Open directly in browser to use fullscreen.')}}}
  document.querySelectorAll('.expand-card').forEach(btn=>btn.addEventListener('click',e=>{
    e.stopPropagation(); const card=btn.closest('.card-fullscreen,.panel,.panel-soft'); if(!card) return;
    if(card.classList.contains('card-expanded')){card.classList.remove('card-expanded');document.body.classList.remove('has-card-expanded');btn.textContent='⛶'}
    else{document.querySelectorAll('.card-expanded').forEach(c=>c.classList.remove('card-expanded'));document.querySelectorAll('.expand-card').forEach(b=>b.textContent='⛶');card.classList.add('card-expanded');document.body.classList.add('has-card-expanded');btn.textContent='×'}
    setTimeout(()=>{window.dispatchEvent(new Event('resize')); if(window._keralaMap) window._keralaMap.invalidateSize();},160);
  }));
  Chart.defaults.color='rgba(247,237,207,.75)';
  Chart.defaults.borderColor='rgba(247,237,207,.11)';
  Chart.defaults.font.family='Inter, sans-serif';
  const gold='rgba(241,211,122,.88)', moss='rgba(121,166,77,.88)', green='rgba(47,209,124,.82)';
  function chart(id, cfg){const el=document.getElementById(id); if(el) new Chart(el,cfg);}
  chart('allocationChart',{type:'bar',data:{labels:['State','Circles','Divisions','Ranges'],datasets:[{label:'Total Budget',data:[1245.8,412.6,732.15,300.25],backgroundColor:gold,borderRadius:8},{label:'Allocation',data:[1098.45,365.28,643.28,267.14],backgroundColor:moss,borderRadius:8}]},options:{maintainAspectRatio:false,plugins:{legend:{labels:{usePointStyle:true}}},scales:{y:{beginAtZero:true},x:{grid:{display:false}}}}});
  chart('fundChart',{type:'doughnut',data:{labels:['Expenditure','Balance'],datasets:[{data:[786.32,312.13],backgroundColor:[moss,gold],borderWidth:1}]},options:{maintainAspectRatio:false,cutout:'64%',plugins:{legend:{position:'bottom'}}}});
  chart('revenueChart',{type:'line',data:{labels:['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'],datasets:[{label:'Target %',data:[36,42,49,55,62,69,76,82],borderColor:'#9bc769',backgroundColor:'rgba(121,166,77,.16)',fill:true,tension:.4}]},options:{maintainAspectRatio:false,scales:{y:{min:0,max:100,ticks:{callback:v=>v+'%'}}}}});
  chart('budgetHeadChart',{type:'bar',data:{labels:['Forest Protection','RIDF','Man-animal conflict','Project Elephant','Biodiversity'],datasets:[{label:'Provision in lakh',data:[2500,3000,2200,1300,1000],backgroundColor:[gold,moss,green,'rgba(214,173,69,.55)','rgba(155,199,105,.55)'],borderRadius:8}]},options:{maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});
  chart('revenueTypeChart',{type:'bar',data:{labels:['TEAK','SANDALWOOD','ROSEWOOD','FDT','GROUND RENT'],datasets:[{label:'Amount',data:[98,72,42,56,31],backgroundColor:moss,borderRadius:8},{label:'Target',data:[120,80,60,70,40],backgroundColor:gold,borderRadius:8}]},options:{maintainAspectRatio:false}});
  chart('fundRequestChart',{type:'doughnut',data:{labels:['Additional','Surrender','Pending Bills','Pending Wages'],datasets:[{data:[26.4,7.8,18.2,3.9],backgroundColor:[gold,moss,'rgba(239,184,77,.85)','rgba(239,82,82,.72)']}]},options:{maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}});
  chart('progressChart',{type:'bar',data:{labels:['Forest Protection','Roads','Buildings','Eco Tourism','Wildlife'],datasets:[{label:'Physical %',data:[72,61,68,84,76],backgroundColor:moss,borderRadius:8},{label:'Financial %',data:[69,57,63,81,71],backgroundColor:gold,borderRadius:8}]},options:{maintainAspectRatio:false,scales:{y:{max:100,ticks:{callback:v=>v+'%'}}}}});
  function initMap(){
    const mapEl=document.getElementById('keralaMap'); if(!mapEl || !window.L || !window.KERALA_BOUNDARY) return;
    window._keralaMap=L.map(mapEl,{zoomControl:true,attributionControl:false,scrollWheelZoom:false});
    function color(u){return u>78?'#2fd17c':u>65?'#9bc769':'#efb84d'}
    const b=L.geoJSON(window.KERALA_BOUNDARY,{style:f=>{const d=f.properties?.District||f.properties?.district||''; const m=window.DISTRICT_FINANCE[d]||{utilization:64};return{color:'#f1d37a',weight:1,fillColor:color(m.utilization),fillOpacity:.24}},onEachFeature:(f,l)=>{const d=f.properties?.District||'District';const m=window.DISTRICT_FINANCE[d]||{};l.bindPopup(`<b style="color:#ffe7a1">${d}</b><br>Budget: ₹ ${m.budget||'-'} Cr<br>Allocation: ₹ ${m.allocation||'-'} Cr<br>Expenditure: ₹ ${m.expenditure||'-'} Cr<br>Utilization: ${m.utilization||'-'}%`);}}).addTo(window._keralaMap);
    if(window.KERALA_CENTERS) L.geoJSON(window.KERALA_CENTERS,{pointToLayer:(f,latlng)=>{const d=f.properties?.District||''; const m=window.DISTRICT_FINANCE[d]||{utilization:60,budget:40};return L.circleMarker(latlng,{radius:5+Math.min(10,(m.budget||30)/20),fillColor:color(m.utilization),color:'#082015',weight:2,fillOpacity:.9});},onEachFeature:(f,l)=>{const d=f.properties?.District||'District';const m=window.DISTRICT_FINANCE[d]||{};l.bindPopup(`<b style="color:#ffe7a1">${d}</b><br>Scheme: ${m.scheme||'-'}<br>Pending approvals: ${m.pending||0}`);}}).addTo(window._keralaMap);
    window._keralaMap.fitBounds(b.getBounds(),{padding:[10,10]}); setTimeout(()=>window._keralaMap.invalidateSize(),300);
  }
  initMap();
})();

// Budget format update

(function(){
  function moneyL(x){return '₹ '+Number(x||0).toLocaleString('en-IN',{maximumFractionDigits:2})+' L';}
  document.querySelectorAll('.filter-table').forEach(tbl=>{const id=tbl.dataset.search; const inp=document.getElementById(id); if(inp) inp.addEventListener('input',()=>{const q=inp.value.toLowerCase(); tbl.querySelectorAll('tbody tr').forEach(tr=>tr.classList.toggle('hide', !tr.textContent.toLowerCase().includes(q)));});});
  if(!window.Chart) return;
  const plan=window.PLAN_BUDGET_HEADS||[], non=window.NON_PLAN_BUDGET_HEADS||[];
  const gold='rgba(241,211,122,.88)', moss='rgba(121,166,77,.88)', green='rgba(47,209,124,.82)', amber='rgba(239,184,77,.85)';
  function c(id,cfg){const el=document.getElementById(id); if(el) new Chart(el,cfg);}
  const planTotal=plan.reduce((a,b)=>a+(+b.budget||0),0), nonTotal=non.reduce((a,b)=>a+(+b.budget||0),0);
  c('planNonPlanChart',{type:'doughnut',data:{labels:['Plan','Non-Plan'],datasets:[{data:[planTotal,nonTotal],backgroundColor:[moss,gold],borderWidth:1}]},options:{maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}});
  const top=plan.slice().sort((a,b)=>(b.budget||0)-(a.budget||0)).slice(0,8);
  c('topPlanHeadsChart',{type:'bar',data:{labels:top.map(x=>x.code),datasets:[{label:'Provision (Rs in lakhs)',data:top.map(x=>x.budget),backgroundColor:gold,borderRadius:8}]},options:{maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true},x:{ticks:{maxRotation:70,minRotation:45}}}}});
  c('performanceFinancialChart',{type:'bar',data:{labels:['Forest Protection','Boundary Survey','Regeneration','NWFP','Roads','Buildings','Eco Tourism','HRD'],datasets:[{label:'Target Fixed',data:[771.317,26.947,3.29,25.516,19.96,71.877,112.038,26.03],backgroundColor:moss,borderRadius:8},{label:'Target Achieved',data:[771.317,26.947,3.29,25.516,19.96,71.877,112.038,26.03],backgroundColor:gold,borderRadius:8}]},options:{maintainAspectRatio:false,scales:{y:{beginAtZero:true}}}});
  c('performanceCategoryChart',{type:'polarArea',data:{labels:['Protection','Infrastructure','Eco Restoration','Livelihood','Capacity'],datasets:[{data:[38,24,16,12,10],backgroundColor:[gold,moss,green,amber,'rgba(155,199,105,.55)']}]},options:{maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}});
})();


// Separate workflow / budget hierarchy page
(function(){
  const el = document.getElementById('workflowHierarchy');
  if(!el || !window.d3) return;
  const data = {
    name:'Integrated Forest Budget & Finance Management System',
    sub:'VanaNidhi',
    value:'Complete workflow',
    children:[
      {name:'Pre-Budget Activities',sub:'Planning before allocation',value:'APO + Estimates',children:[
        {name:'Office & Masters',sub:'Setup',value:'Users, roles, heads'},
        {name:'APO Preparation',sub:'Field planning',value:'Range → Division → Circle → HQ'},
        {name:'Budget Estimate',sub:'Plan / Non-Plan',value:'Targets + components'},
        {name:'Performance Budget',sub:'Outcome format',value:'Physical + financial targets'}
      ]},
      {name:'Budget Allocation Activities',sub:'After budget finalization',value:'Provision + release',children:[
        {name:'Budget Heads',sub:'Plan & Non-Plan',value:'2026-27 heads'},
        {name:'Allocation to Offices',sub:'HQ → Circle → Division',value:'Head-wise'},
        {name:'Additional Funds',sub:'Requirement/surrender',value:'BH-wise'},
        {name:'Revenue Targets',sub:'eTreasury view',value:'DDO/SCO/CCO'}
      ]},
      {name:'Post-Budget Tracking Activities',sub:'Execution & review',value:'Monitoring',children:[
        {name:'Forestry Works',sub:'Estimate + sanction',value:'SoR / APO linked'},
        {name:'Progress Monitoring',sub:'Monthly',value:'Physical + financial'},
        {name:'Pending Bills',sub:'Liabilities',value:'Bills + wages'},
        {name:'Reports & Annexures',sub:'Review outputs',value:'Client formats'}
      ]}
    ]
  };
  let svg, g, root;
  function render(){
    const holder = el.parentElement;
    const w = holder.clientWidth || 1000;
    const h = holder.clientHeight || 680;
    svg = d3.select(el).attr('viewBox',[0,0,w,h]).attr('preserveAspectRatio','xMidYMid meet');
    svg.selectAll('*').remove();
    const margin = {top:35,right:60,bottom:35,left:60};
    const innerW = w - margin.left - margin.right;
    const innerH = h - margin.top - margin.bottom;
    g = svg.append('g').attr('transform',`translate(${margin.left},${margin.top})`);
    root = d3.hierarchy(data);
    const tree = d3.tree().size([innerW, innerH]);
    tree(root);
    root.descendants().forEach(d => { d.y = d.depth * (innerH/3); });
    g.append('g').selectAll('path').data(root.links()).join('path').attr('class','h-link').attr('d', d => `M${d.source.x},${d.source.y} C${d.source.x},${(d.source.y+d.target.y)/2} ${d.target.x},${(d.source.y+d.target.y)/2} ${d.target.x},${d.target.y}`);
    const node = g.append('g').selectAll('g').data(root.descendants()).join('g').attr('class','h-node').attr('transform',d=>`translate(${d.x},${d.y})`).on('dblclick',(e,d)=>{ window.location.href = pageForNode(d.data.name); });
    node.append('rect').attr('x',-95).attr('y',-36).attr('width',190).attr('height',82);
    node.append('text').attr('class','h-title').attr('text-anchor','middle').attr('y',-14).text(d=>trim(d.data.name,27));
    node.append('text').attr('class','h-sub').attr('text-anchor','middle').attr('y',6).text(d=>trim(d.data.sub || '',28));
    node.append('text').attr('class','h-value').attr('text-anchor','middle').attr('y',25).text(d=>trim(d.data.value || '',28));
  }
  function trim(s,n){ return (s||'').length > n ? s.slice(0,n-1)+'…' : (s||''); }
  function pageForNode(name){
    const map = {
      'Office & Masters':'masters-admin.html',
      'APO Preparation':'apo.html',
      'Budget Estimate':'budget.html',
      'Performance Budget':'performance-budget.html',
      'Budget Heads':'budget-heads.html',
      'Allocation to Offices':'budget-hq.html',
      'Additional Funds':'funds-bills.html',
      'Revenue Targets':'revenue.html',
      'Forestry Works':'forestry-works.html',
      'Progress Monitoring':'progress.html',
      'Pending Bills':'funds-bills.html',
      'Reports & Annexures':'reports.html',
      'Pre-Budget Activities':'sitemap.html',
      'Budget Allocation Activities':'sitemap.html',
      'Post-Budget Tracking Activities':'sitemap.html'
    };
    return map[name] || 'index.html';
  }
  window.addEventListener('resize',()=>setTimeout(render,150));
  render();
})();

// Role login buttons
(function(){document.querySelectorAll('[data-demo-login]').forEach(b=>b.addEventListener('click',()=>{window.location.href=b.dataset.demoLogin;}));})();


// Requirement update helpers: WYSIWYG toolbar + Plan/Non-Plan toggles
(function(){
  document.querySelectorAll('.wysiwyg-toolbar button').forEach(btn=>{
    btn.addEventListener('click',e=>{e.preventDefault(); const cmd=btn.dataset.cmd; if(cmd){document.execCommand(cmd,false,null);}});
  });
  document.querySelectorAll('[data-nonplan-toggle]').forEach(sel=>{
    const apply=()=>{
      const form=sel.closest('.plan-nonplan-form') || document;
      const isNon=String(sel.value).toLowerCase().includes('non');
      form.querySelectorAll('[data-plan-only]').forEach(el=>el.classList.toggle('hidden-field',isNon));
      form.querySelectorAll('[data-nonplan-only]').forEach(el=>el.classList.toggle('hidden-field',!isNon));
    };
    sel.addEventListener('change',apply); apply();
  });
})();
