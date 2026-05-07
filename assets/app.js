
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
