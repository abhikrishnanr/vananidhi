
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
      const scope = sel.closest('.plan-nonplan-form') || sel.closest('.panel') || document;
      const isNon = String(sel.value).toLowerCase().includes('non');
      const setHidden = (el, hide) => {
        const wrap = el.closest('.field') || el;
        wrap.classList.toggle('hidden-field', hide);
        if ('disabled' in el) el.disabled = hide;
      };
      scope.querySelectorAll('[data-plan-only]').forEach(el=>setHidden(el, isNon));
      scope.querySelectorAll('[data-nonplan-only]').forEach(el=>setHidden(el, !isNon));
    };
    sel.addEventListener('change',apply);
    apply();
  });
})();


// Search / filter / sort support for demo record lists
(function(){
  document.querySelectorAll('.record-list-panel').forEach(panel=>{
    const search = panel.querySelector('.record-search');
    const filter = panel.querySelector('.record-status-filter');
    const sort = panel.querySelector('.record-sort');
    const tbody = panel.querySelector('tbody');
    if(!tbody) return;
    const rows = Array.from(tbody.querySelectorAll('tr'));
    function apply(){
      const q = (search?.value || '').toLowerCase();
      const st = filter?.value || 'All';
      let visible = rows.filter(row=>{
        const text = row.textContent.toLowerCase();
        const status = row.getAttribute('data-status') || 'All';
        return text.includes(q) && (st === 'All' || status === st);
      });
      if(sort){
        const mode = sort.value;
        visible.sort((a,b)=>{
          const ta=a.children[1]?.textContent || '';
          const tb=b.children[1]?.textContent || '';
          const da=a.children[3]?.textContent || '';
          const db=b.children[3]?.textContent || '';
          if(mode === 'Name') return ta.localeCompare(tb);
          if(mode === 'Date') return db.localeCompare(da);
          return (a.children[0]?.textContent || '').localeCompare(b.children[0]?.textContent || '');
        });
      }
      rows.forEach(r=>r.style.display='none');
      visible.forEach(r=>{r.style.display=''; tbody.appendChild(r);});
    }
    [search,filter,sort].forEach(el=>el && el.addEventListener('input', apply));
    apply();
  });
})();


// Multiple supporting attachment rows
(function(){
  document.querySelectorAll('.attachment-box').forEach(box=>{
    const list = box.querySelector('.attachment-list');
    const addBtn = box.querySelector('.add-attachment-btn');
    if(!list || !addBtn || box.dataset.multiReady === '1') return;
    box.dataset.multiReady = '1';
    function row(){
      const wrap = document.createElement('div');
      wrap.className = 'attachment-row';
      wrap.innerHTML = `<select><option>Estimate</option><option>Sketch / Map</option><option>Previous Approval</option><option>Photo Evidence</option><option>Other Supporting Document</option></select><input type="file" multiple><button type="button" class="attachment-remove">Remove</button>`;
      wrap.querySelector('.attachment-remove').addEventListener('click',()=>wrap.remove());
      return wrap;
    }
    box.querySelectorAll('.attachment-remove').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.attachment-row')?.remove()));
    addBtn.addEventListener('click',()=>list.appendChild(row()));
  });
})();


// Sidebar menu groups are collapsed by default; clicking heading toggles the group.
(function(){
  document.querySelectorAll('.nav').forEach(nav=>{
    const children = Array.from(nav.children);
    children.forEach((el, idx)=>{
      if(!el.classList.contains('nav-group-title')) return;
      const items = [];
      for(let i=idx+1;i<children.length;i++){
        if(children[i].classList.contains('nav-group-title')) break;
        if(children[i].tagName && children[i].tagName.toLowerCase()==='a') items.push(children[i]);
      }
      el.classList.add('collapsed');
      items.forEach(a=>a.classList.add('menu-collapsed'));
      el.addEventListener('click',()=>{
        el.classList.toggle('collapsed');
        items.forEach(a=>a.classList.toggle('menu-collapsed'));
      });
    });
  });
})();

// Master Menu search/filter
(function(){
  const input = document.getElementById('masterMenuSearch');
  if(!input) return;
  const tiles = Array.from(document.querySelectorAll('.master-tile'));
  input.addEventListener('input',()=>{
    const q = input.value.toLowerCase();
    tiles.forEach(tile=>{ tile.style.display = tile.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  });
})();


// Range allocation drill-down tab highlight
(function(){
  document.querySelectorAll('.drill-tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      btn.closest('.drill-tabs')?.querySelectorAll('.drill-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
})();


// Wage Distribution Fund Request preview demo
(function(){
  const upload = document.getElementById('wageExcelUpload');
  const preview = document.getElementById('wagePreviewArea');
  const empty = document.getElementById('wageUploadEmpty');
  if(!upload || !preview) return;
  upload.addEventListener('change',()=>{
    if(empty) empty.style.display = 'none';
    preview.style.display = '';
    preview.scrollIntoView({behavior:'smooth', block:'start'});
  });
})();


// Surrender amount calculation
(function(){
  const input = document.getElementById('surrenderAmountInput');
  const available = document.getElementById('availableBalanceInput');
  const remaining = document.getElementById('remainingBalanceInput');
  const status = document.getElementById('surrenderCalcStatus');
  if(!input || !available || !remaining) return;
  function parseVal(v){
    const n = String(v || '').replace(/[^\d.]/g,'');
    return Number(n || 0);
  }
  function fmt(n){
    return '₹ ' + n.toFixed(2) + ' L';
  }
  function calc(){
    const bal = parseVal(available.value);
    const surrender = parseVal(input.value);
    const rem = Math.max(bal - surrender, 0);
    remaining.value = fmt(rem);
    if(status){
      if(surrender <= 0){
        status.innerHTML = '<b>Status:</b> Enter surrender amount to calculate remaining balance.';
      }else if(surrender > bal){
        status.innerHTML = '<b>Status:</b> Surrender amount exceeds available balance. Please reduce the amount.';
      }else{
        status.innerHTML = '<b>Status:</b> Remaining balance calculated. Request is ready for verification and submission.';
      }
    }
  }
  input.addEventListener('input', calc);
  calc();
})();


// Surrender heads sorting/filtering and component surrender modal
(function(){
 const grid=document.querySelector('[data-surrender-head-grid]');
 const search=document.getElementById('surrenderHeadSearch'), typeFilter=document.getElementById('surrenderHeadTypeFilter'), sortSelect=document.getElementById('surrenderHeadSort'), utilFilter=document.getElementById('surrenderUtilFilter');
 if(grid){
  const cards=Array.from(grid.querySelectorAll('[data-head-card]'));
  function apply(){
   const q=(search?.value||'').toLowerCase(), type=typeFilter?.value||'All', util=utilFilter?.value||'All', sort=sortSelect?.value||'balance_desc';
   let visible=cards.filter(c=>{const u=Number(c.dataset.utilization||0);return c.textContent.toLowerCase().includes(q)&&(type==='All'||c.dataset.headType===type)&&(util==='All'||(util==='High'&&u>=70)||(util==='Medium'&&u>=40&&u<70)||(util==='Low'&&u<40));});
   visible.sort((a,b)=>{const ba=Number(a.dataset.balance||0),bb=Number(b.dataset.balance||0),ua=Number(a.dataset.utilization||0),ub=Number(b.dataset.utilization||0); if(sort==='balance_asc')return ba-bb; if(sort==='util_desc')return ub-ua; if(sort==='util_asc')return ua-ub; if(sort==='name')return a.dataset.name.localeCompare(b.dataset.name); return bb-ba;});
   cards.forEach(c=>c.style.display='none'); visible.forEach(c=>{c.style.display='';grid.appendChild(c);});
  }
  [search,typeFilter,sortSelect,utilFilter].forEach(el=>el&&el.addEventListener('input',apply)); apply();
 }
 const modal=document.getElementById('surrenderModalBackdrop'); if(!modal)return;
 const title=document.getElementById('modalComponentTitle'), head=document.getElementById('modalComponentHead'), balInput=document.getElementById('modalAvailableBalance'), surrenderInput=document.getElementById('modalSurrenderAmount'), remainingInput=document.getElementById('modalRemainingBalance'), heroAvailable=document.getElementById('heroAvailableBalance'), heroSurrender=document.getElementById('heroSurrenderAmount'), heroRemaining=document.getElementById('heroRemainingBalance'), status=document.getElementById('modalSurrenderStatus'), submitBtn=document.getElementById('modalSurrenderSubmit');
 function parseVal(v){return Number(String(v||'').replace(/[^\d.]/g,'')||0)} function fmt(n){return '₹ '+n.toFixed(2)+' L'}
 function calc(){const bal=parseVal(balInput?.value),sur=parseVal(surrenderInput?.value),rem=Math.max(bal-sur,0); if(remainingInput)remainingInput.value=fmt(rem); if(heroAvailable)heroAvailable.textContent=fmt(bal); if(heroSurrender)heroSurrender.textContent=fmt(sur); if(heroRemaining)heroRemaining.textContent=fmt(rem); if(status)status.innerHTML=sur<=0?'<b>Status:</b> Enter surrender amount.':(sur>bal?'<b>Status:</b> Surrender amount exceeds available balance. Please enter an amount within the available balance.':'<b>Status:</b> Remaining balance calculated. Ready to submit.'); if(submitBtn){const invalid=sur<=0||sur>bal; submitBtn.disabled=invalid; submitBtn.style.opacity=invalid?'.45':'1'; submitBtn.style.cursor=invalid?'not-allowed':'pointer';} if(surrenderInput){surrenderInput.style.borderColor=(sur>bal)?'#ff9a8a':'rgba(214,173,69,.35)';}}
 document.querySelectorAll('[data-open-surrender-modal]').forEach(btn=>btn.addEventListener('click',()=>{const d=btn.dataset;if(title)title.textContent=d.component||'Component';if(head)head.textContent=d.head||'';if(balInput)balInput.value=d.balance||'0';if(surrenderInput)surrenderInput.value='';calc();modal.classList.add('open');}));
 surrenderInput?.addEventListener('input',calc); modal.querySelectorAll('[data-close-modal]').forEach(btn=>btn.addEventListener('click',()=>modal.classList.remove('open'))); modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
})();


// HQ master menu search and resumption sorting
(function(){
  const search=document.getElementById('hqMasterSearch');
  if(search){
    const tiles=Array.from(document.querySelectorAll('.hq-module-tile'));
    search.addEventListener('input',()=>{const q=search.value.toLowerCase();tiles.forEach(t=>t.style.display=t.textContent.toLowerCase().includes(q)?'':'none')});
  }
  const resGrid=document.querySelector('[data-resumption-grid]');
  if(resGrid){
    const cards=Array.from(resGrid.querySelectorAll('[data-resumption-card]'));
    const q=document.getElementById('resumptionSearch'), level=document.getElementById('resumptionLevel'), sort=document.getElementById('resumptionSort'), purpose=document.getElementById('resumptionPurpose');
    function apply(){
      const term=(q?.value||'').toLowerCase(), lv=level?.value||'All', pu=purpose?.value||'All', so=sort?.value||'balance_desc';
      let visible=cards.filter(c=>c.textContent.toLowerCase().includes(term)&&(lv==='All'||c.dataset.level===lv)&&(pu==='All'||c.dataset.purpose===pu));
      visible.sort((a,b)=>{const ba=+a.dataset.balance,bb=+b.dataset.balance,ua=+a.dataset.util,ub=+b.dataset.util;if(so==='balance_asc')return ba-bb;if(so==='util_desc')return ub-ua;if(so==='util_asc')return ua-ub;return bb-ba});
      cards.forEach(c=>c.style.display='none');visible.forEach(c=>{c.style.display='';resGrid.appendChild(c)});
    }
    [q,level,sort,purpose].forEach(el=>el&&el.addEventListener('input',apply));apply();
  }
})();


// HQ direct resumption tabs, filters and modal
(function(){
  const tabs = Array.from(document.querySelectorAll('[data-resumption-tab]'));
  if(tabs.length){
    tabs.forEach(tab=>{
      tab.addEventListener('click',()=>{
        const key = tab.dataset.resumptionTab;
        tabs.forEach(t=>t.classList.toggle('active', t === tab));
        document.querySelectorAll('[data-resumption-panel]').forEach(panel=>{
          panel.classList.toggle('active', panel.dataset.resumptionPanel === key);
        });
      });
    });
  }

  function setupGrid(panel){
    const grid = panel.querySelector('[data-resumption-grid]');
    if(!grid) return;
    const search = panel.querySelector('[data-resumption-search]');
    const sort = panel.querySelector('[data-resumption-sort]');
    const type = panel.querySelector('[data-resumption-type]');
    const balanceFilter = panel.querySelector('[data-resumption-balance]');
    const cards = Array.from(grid.querySelectorAll('[data-resumption-card]'));
    function apply(){
      const q = (search?.value || '').toLowerCase();
      const s = sort?.value || 'balance_desc';
      const t = type?.value || 'All';
      const bf = balanceFilter?.value || 'All';
      let visible = cards.filter(card=>{
        const bal = Number(card.dataset.balance || 0);
        const okQ = card.textContent.toLowerCase().includes(q);
        const okType = t === 'All' || card.dataset.headType === t;
        const okBal = bf === 'All' || (bf === 'High' && bal >= 5) || (bf === 'Medium' && bal >= 2 && bal < 5) || (bf === 'Low' && bal < 2);
        return okQ && okType && okBal;
      });
      visible.sort((a,b)=>{
        const balA = Number(a.dataset.balance || 0), balB = Number(b.dataset.balance || 0);
        const utilA = Number(a.dataset.util || 0), utilB = Number(b.dataset.util || 0);
        if(s === 'balance_asc') return balA - balB;
        if(s === 'util_desc') return utilB - utilA;
        if(s === 'util_asc') return utilA - utilB;
        if(s === 'name') return a.dataset.name.localeCompare(b.dataset.name);
        return balB - balA;
      });
      cards.forEach(c=>c.style.display='none');
      visible.forEach(c=>{c.style.display='';grid.appendChild(c);});
    }
    [search,sort,type,balanceFilter].forEach(el=>el && el.addEventListener('input', apply));
    apply();
  }
  document.querySelectorAll('[data-resumption-panel]').forEach(setupGrid);

  const modal = document.getElementById('resumptionModalBackdrop');
  if(!modal) return;
  const title = document.getElementById('resumptionModalTitle');
  const source = document.getElementById('resumptionModalSource');
  const available = document.getElementById('resumptionAvailableBalance');
  const pull = document.getElementById('resumptionPullAmount');
  const remaining = document.getElementById('resumptionRemainingBalance');
  const heroAvailable = document.getElementById('resumptionHeroAvailable');
  const heroPull = document.getElementById('resumptionHeroPull');
  const heroRemaining = document.getElementById('resumptionHeroRemaining');
  const heroTarget = document.getElementById('resumptionHeroTarget');
  const status = document.getElementById('resumptionStatus');
  const submit = document.getElementById('resumptionSubmitBtn');

  function parseVal(v){return Number(String(v||'').replace(/[^\d.]/g,'')||0);}
  function fmt(n){return '₹ ' + n.toFixed(2) + ' L';}
  function calc(){
    const bal = parseVal(available?.value);
    const amt = parseVal(pull?.value);
    const rem = Math.max(bal - amt, 0);
    if(remaining) remaining.value = fmt(rem);
    if(heroAvailable) heroAvailable.textContent = fmt(bal);
    if(heroPull) heroPull.textContent = fmt(amt);
    if(heroRemaining) heroRemaining.textContent = fmt(rem);
    if(heroTarget) heroTarget.textContent = 'HQ Pool';
    const invalid = amt <= 0 || amt > bal;
    if(status){
      if(amt <= 0) status.innerHTML = '<b>Status:</b> Enter amount to pull back.';
      else if(amt > bal) status.innerHTML = '<b>Status:</b> Pull-back amount cannot exceed available balance.';
      else status.innerHTML = '<b>Status:</b> Valid pull-back amount. HQ can resume this balance directly.';
    }
    if(submit){submit.disabled = invalid; submit.style.opacity = invalid ? '.45' : '1'; submit.style.cursor = invalid ? 'not-allowed' : 'pointer';}
    if(pull){pull.style.borderColor = amt > bal ? '#ff9a8a' : 'rgba(214,173,69,.35)';}
  }
  document.querySelectorAll('[data-open-resumption-modal]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const d = btn.dataset;
      if(title) title.textContent = d.title || 'Direct Resumption';
      if(source) source.textContent = (d.office || '') + ' • ' + (d.head || '');
      if(available) available.value = d.balance || '₹ 0.00 L';
      if(pull) pull.value = '';
      calc();
      modal.classList.add('open');
    });
  });
  pull?.addEventListener('input', calc);
  modal.querySelectorAll('[data-close-resumption-modal]').forEach(btn=>btn.addEventListener('click',()=>modal.classList.remove('open')));
  modal.addEventListener('click',e=>{if(e.target===modal) modal.classList.remove('open');});
})();
