const r=n=>Math.floor(Math.random()*n),f=t=>new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"});
const CL=["person","car","truck","bus","motorcycle"],COL=["white","black","silver","red","blue","grey"],WL="HX 77 ZZ GP";
const SOP=[["verify","Verify the alarm on live video, then play back 30 s before the trigger",1],["id","Identify the trigger: who or what, how many, where, which direction",1],["ctx","Check site context: scheduled work, access list, known vehicles, plate watch-list",1],["cls","Classify the event with the disposition below (Genuine, False, or Test/Nuisance)",1],["act","Genuine only: notify keyholder or control room, dispatch response, note the reference number",0],["ev","Bookmark the clip and export the evidence from Playback",0],["safe","Confirm the area is safe and the camera is back to normal",1]];
let cams=[],ev=[],al=[],ex=[],view="live",sel=null,cols=2,T=[],eid=1,aid=1,pb={cam:1,min:600,play:false},sf={cls:"",col:"",plate:"",cam:"",spd:""};
const ls=()=>document.getElementById("usr").value;
function pl(){const L="ABCDEFGHJKLMNPRSTVWXYZ";return Math.random()<.08?WL:L[r(22)]+L[r(22)]+" "+(10+r(89))+" "+L[r(22)]+L[r(22)]+" GP"}
function no(i,c){const v=i%3==0;return{cls:v?CL[1+r(4)]:"person",x:Math.random(),y:.55+Math.random()*.3,vx:(v?.012:.004)*(Math.random()<.5?-1:1)*(.7+Math.random()*.6),col:COL[r(6)],plate:v?pl():""}}
function mk(name,brand,ip){const c={id:cams.length+1,name,brand,ip,an:{line:1,count:1,lpr:1,speed:1,motion:1,pv:1,alarm:1},limit:65,objs:[],cnt:{in:0,out:0,veh:0,per:0},seed:(cams.length+1)*67%360,mt:0};for(let i=0;i<5;i++)c.objs.push(no(i));cams.push(c);return c}
function addEv(c,type,o,speed,t){ev.unshift({id:eid++,t:t||Date.now(),cam:c.id,type,cls:o.cls,col:o.col,plate:o.plate||"",speed:speed||0});if(ev.length>600)ev.pop()}
function raise(c,type,detail){if(al.filter(a=>a.status!="Cleared").length>7)return;al.unshift({id:aid++,cam:c.id,type,detail,t:Date.now(),status:"New",user:"",done:{},disp:"",notes:"",log:[[Date.now(),"Alarm raised: "+type+" ("+detail+")"]]});badge()}
function step(){cams.forEach(c=>{c.objs.forEach((o,i)=>{const p=o.x;o.x+=o.vx;const veh=o.cls!="person";
if((p-.5)*(o.x-.5)<0){const d=o.vx>0?"in":"out";if(c.an.count){c.cnt[d]++;veh?c.cnt.veh++:c.cnt.per++}
if(c.an.line)addEv(c,"Line crossing ("+d+")",o);
if(veh){const k=Math.round(Math.abs(o.vx)*5000);if(c.an.lpr)addEv(c,"LPR",o,k);if(c.an.speed){addEv(c,"Speed",o,k);if(c.an.alarm&&k>c.limit)raise(c,"Speed violation",k+" km/h, limit "+c.limit+", plate "+o.plate)}
if(c.an.alarm&&o.plate==WL)raise(c,"Watch-list plate",o.plate+" crossing "+d)}
else if(c.an.alarm&&d=="in"&&Math.random()<.2)raise(c,"Line-crossing intrusion","Person entered, "+o.col+" clothing")}
if(o.x<-.06||o.x>1.06){const n=no(i);n.x=n.vx>0?-.05:1.05;c.objs[i]=n}});
if(c.an.motion&&++c.mt>60){c.mt=0;addEv(c,"Motion",c.objs[0])}})}
function badge(){const n=al.filter(a=>a.status!="Cleared").length;document.getElementById("nav").innerHTML=[["live","Live"],["cams","Cameras"],["an","Analytics"],["pb","Playback"],["se","Search"],["al","Alarms"]].map(([k,l])=>`<button class="${view==k?"on":""}" data-v="${k}">${l}${k=="al"&&n?`<span class="bd">${n}</span>`:""}</button>`).join("")}
function draw(cv,c,tm){const W=cv.width=480,H=cv.height=270,x=cv.getContext("2d");let g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,`hsl(${c.seed},18%,22%)`);g.addColorStop(1,`hsl(${c.seed},18%,9%)`);x.fillStyle=g;x.fillRect(0,0,W,H);x.fillStyle=`hsl(${c.seed},10%,26%)`;x.fillRect(0,H*.5,W,H*.5);
c.objs.forEach(o=>{const v=o.cls!="person",w=(v?.1:.035)*W,h=(v?.11:.17)*H,px=o.x*W-w/2,py=o.y*H-h;x.fillStyle="#0007";x.fillRect(px,py,w,h);x.fillStyle=o.col=="white"?"#ddd":o.col=="black"?"#222":o.col=="silver"?"#aab":o.col=="grey"?"#778":o.col;x.globalAlpha=.55;x.fillRect(px+2,py+2,w-4,h-4);x.globalAlpha=1;
if(c.an.pv){x.strokeStyle=v?"#f0b429":"#3ccf7a";x.lineWidth=1.5;x.strokeRect(px,py,w,h);x.fillStyle=x.strokeStyle;x.font="10px sans-serif";x.fillText(o.cls+(v&&c.an.lpr?" "+o.plate:""),px,py-3)}});
if(c.an.line){x.setLineDash([6,4]);x.strokeStyle="#ff5d5d";x.lineWidth=2;x.beginPath();x.moveTo(W/2,H*.2);x.lineTo(W/2,H);x.stroke();x.setLineDash([])}
x.fillStyle="#fff";x.font="12px sans-serif";x.fillText(c.name+(tm?"  ▶ PLAYBACK "+tm:"  ● LIVE "+f(Date.now())),8,16);if(c.an.count){x.fillText(`IN ${c.cnt.in}  OUT ${c.cnt.out}`,8,H-8)}}
function loop(){T.forEach(t=>{const c=cams.find(c=>c.id==t.cam);if(c&&t.cv.isConnected)draw(t.cv,c,t.pb?hm(pb.min):"")});setTimeout(()=>requestAnimationFrame(loop),100)}
const hm=m=>String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0");
const opts=(a,v)=>a.map(x=>`<option value="${x[0]}" ${x[0]==v?"selected":""}>${x[1]}</option>`).join("");
const camOpts=v=>opts(cams.map(c=>[c.id,c.name]),v);
function tile(c,p){return `<div><canvas data-c="${c.id}" ${p?"data-p=1":""}></canvas></div>`}
function bind(){T=[...document.querySelectorAll("canvas[data-c]")].map(cv=>({cv,cam:+cv.dataset.c,pb:!!cv.dataset.p}))}
const V={
live(){return `<div class="row" style="margin-bottom:8px"><span class="mu">Grid</span>${[1,2,3].map(n=>`<button class="${cols==n?"on":""}" data-cols="${n}">${n}×${n}</button>`).join("")}<span class="mu">Simulated feeds with live analytics overlay</span></div><div class="grid" style="grid-template-columns:repeat(${cols==1?1:cols==2?"auto-fit,minmax(min(100%,320px),1fr)":"auto-fit,minmax(min(100%,220px),1fr)"},1fr)">${cams.map(c=>tile(c)).join("")}</div>`.replace(/repeat\((\d|auto-fit),(.*?),1fr\)/,(m,a,b)=>a=="1"?"repeat(1,1fr)":m)},
cams(){return `<div class="card"><h3>Add camera</h3><div class="row"><input id="cn" placeholder="Name"><select id="cb">${["Hikvision","Dahua / Amcrest","Axis","Uniview","Hanwha","Bosch","Reolink","Generic RTSP / ONVIF"].map(b=>`<option>${b}</option>`).join("")}</select><input id="ci" placeholder="IP or RTSP URL"><input id="cu" placeholder="User" size="8"><input id="cp" type="password" placeholder="Password" size="8"><button data-a="test">Test connection</button><button class="pri" data-a="add">Save</button></div><p class="mu">In this preview a camera is simulated. In the full server build this takes real RTSP / ONVIF streams.</p></div><div class="card t"><table><tr><th>#</th><th>Name</th><th>Brand</th><th>Address</th><th>Status</th><th></th></tr>${cams.map(c=>`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.brand}</td><td>${c.ip}</td><td style="color:var(--gn)">● Online</td><td><button data-del="${c.id}">Remove</button></td></tr>`).join("")}</table></div>`},
an(){const c=cams.find(c=>c.id==sel)||cams[0];if(!c)return"<div class=card>Add a camera first.</div>";const L=[["line","Line crossing"],["count","People / vehicle counting"],["pv","Person and vehicle detection"],["motion","Motion detection"],["lpr","Licence plate recognition (LPR)"],["speed","Speed detection"],["alarm","Raise alarms from analytics"]];
return `<div class="card"><div class="row"><select data-sel>${camOpts(c.id)}</select><button data-a="all">Apply this setup to all cameras</button></div><div class="grid g2" style="margin-top:8px"><div>${tile(c)}</div><div>${L.map(([k,l])=>`<label><input type="checkbox" data-an="${k}" ${c.an[k]?"checked":""}>${l}</label>`).join("")}<label>Speed limit <input type="number" data-lim value="${c.limit}" style="width:70px"> km/h</label></div></div></div>
<div class="card t"><h3>Counts since start</h3><table><tr><th>Camera</th><th>In</th><th>Out</th><th>People</th><th>Vehicles</th></tr>${cams.map(c=>`<tr><td>${c.name}</td><td>${c.cnt.in}</td><td>${c.cnt.out}</td><td>${c.cnt.per}</td><td>${c.cnt.veh}</td></tr>`).join("")}</table></div>`},
pb(){const c=cams.find(c=>c.id==pb.cam)||cams[0];const es=ev.filter(e=>e.cam==c.id).slice(0,8);return `<div class="card"><div class="row"><select data-pbc>${camOpts(c.id)}</select><button data-a="play">${pb.play?"❚❚ Pause":"▶ Play"}</button><b id="pt">${hm(pb.min)}</b></div><div style="margin:8px 0"><canvas data-c="${c.id}" data-p=1></canvas></div><input type="range" min="0" max="1439" value="${pb.min}" id="sl"><div class="row" style="margin-top:8px"><span>Export from</span><input type="time" id="xa" value="${hm(Math.max(0,pb.min-2))}"><span>to</span><input type="time" id="xb" value="${hm(Math.min(1439,pb.min+3))}"><button class="pri" data-a="exp">Export clip</button></div></div>
<div class="card"><h3>Jump to event</h3>${es.map(e=>`<button data-jump="${new Date(e.t).getHours()*60+new Date(e.t).getMinutes()}" style="margin:2px">${f(e.t)} ${e.type}</button>`).join("")||"<span class=mu>No events yet</span>"}</div>
<div class="card t"><h3>Exports</h3><table>${ex.map(x=>`<tr><td>${x.cam}</td><td>${x.a}–${x.b}</td><td>${x.p<100?x.p+"%":"Ready"}</td><td>${x.p>=100?`<button data-a="dl">Download</button>`:""}</td></tr>`).join("")||"<tr><td class=mu>No exports yet</td></tr>"}</table></div>`},
se(){return `<div class="card"><h3>Smart feature search</h3><div class="row"><select data-sf="cls">${opts([["","Any class"],...CL.map(x=>[x,x])],sf.cls)}</select><select data-sf="col">${opts([["","Any colour"],...COL.map(x=>[x,x])],sf.col)}</select><input data-sf="plate" placeholder="Plate contains" value="${sf.plate}" size="12"><select data-sf="cam">${opts([["","All cameras"],...cams.map(c=>[c.id,c.name])],sf.cam)}</select><input data-sf="spd" type="number" placeholder="Min km/h" value="${sf.spd}" style="width:90px"></div></div><div class="card t" id="res">${res()}</div>`},
al(){const a=al.find(x=>x.id==sel&&0)||al.find(x=>x.id==V.aid)||al[0];return `<div class="grid g2"><div>${al.map(x=>`<div class="al ${x.status} ${a&&a.id==x.id?"s":""}" data-al="${x.id}"><b>#${x.id} ${x.type}</b><br><span class="mu">${cams.find(c=>c.id==x.cam).name} · ${f(x.t)} · ${x.status}${x.user?" · "+x.user:""}</span></div>`).join("")||"<div class=card>No alarms. Alarms appear here as analytics trigger.</div>"}</div>${a?alarm(a):""}</div>`}};
function res(){let l=ev.filter(e=>(!sf.cls||e.cls==sf.cls)&&(!sf.col||e.col==sf.col)&&(!sf.plate||e.plate.toLowerCase().includes(sf.plate.toLowerCase()))&&(!sf.cam||e.cam==sf.cam)&&(!sf.spd||e.speed>=+sf.spd));return `<div class="mu">${l.length} matches</div><table><tr><th>Time</th><th>Camera</th><th>Event</th><th>Class</th><th>Colour</th><th>Plate</th><th>km/h</th></tr>${l.slice(0,60).map(e=>`<tr><td>${f(e.t)}</td><td>${cams.find(c=>c.id==e.cam).name}</td><td>${e.type}</td><td>${e.cls}</td><td>${e.col}</td><td>${e.plate}</td><td>${e.speed||""}</td></tr>`).join("")}</table>`}
function can(a){const ok=SOP.every(s=>!s[2]&&!(s[0]=="act"&&a.disp=="Genuine")||a.done[s[0]]);return a.status=="Handling"&&a.user==ls()&&a.disp&&a.notes.trim().length>=10&&SOP.every(s=>(s[2]||(s[0]=="act"&&a.disp=="Genuine"))?a.done[s[0]]:true)}
function alarm(a){V.aid=a.id;const mine=a.status=="Handling"&&a.user==ls(),ro=!mine;return `<div class="card"><h3>Alarm #${a.id}: ${a.type}</h3><p class="mu">${a.detail}</p><canvas data-c="${a.cam}"></canvas>
<div class="row" style="margin:8px 0">${a.status=="New"?`<button class="pri" data-a="handle">Handle alarm (assign to ${ls()})</button>`:""}${mine?`<button data-a="rel">Release</button>`:""}${a.status=="Handling"&&!mine?`<span class="mu">Assigned to ${a.user}. Switch operator to take over.</span>`:""}${a.status=="Cleared"?`<span style="color:var(--gn)">Cleared by ${a.user} · ${a.disp}</span>`:""}</div>
<div class="sop"><b>Standard operating procedure</b>${SOP.map(([k,l,q],i)=>`<label><input type="checkbox" data-sop="${k}" ${a.done[k]?"checked":""} ${ro||a.status=="Cleared"?"disabled":""}><span>${i+1}. ${l}${q?"":" <span class=mu>(${k=="act"?"required if Genuine":"optional"})</span>"}</span></label>`).join("")}</div>
<div class="row" style="margin:8px 0"><select data-disp ${ro?"disabled":""}>${opts([["","Disposition…"],["Genuine","Genuine"],["False","False alarm"],["Test","Test / nuisance"]],a.disp)}</select></div>
<textarea data-notes placeholder="Operator notes (min 10 characters)" ${ro?"disabled":""}>${a.notes}</textarea>
<div class="row" style="margin-top:8px"><button class="red" data-a="clear" ${can(a)?"":"disabled"}>Clear alarm</button><span class="mu">Clearing needs the assigned operator, all required steps, a disposition and notes.</span></div>
<div style="margin-top:8px"><b>Audit trail</b>${a.log.map(l=>`<div class="mu">${f(l[0])} · ${l[1]}</div>`).join("")}</div></div>`}
const toast=m=>{const t=document.getElementById("toast");t.textContent=m;t.style.display="block";clearTimeout(toast.h);toast.h=setTimeout(()=>t.style.display="none",2600)};
function show(){badge();document.getElementById("main").innerHTML=V[view]();bind()}
const lg=(a,m)=>a.log.push([Date.now(),m+" — "+ls()]);
document.addEventListener("click",e=>{const b=e.target.closest("[data-v],[data-cols],[data-a],[data-del],[data-al],[data-jump]");if(!b)return;const d=b.dataset;
if(d.v){view=d.v;return show()}if(d.cols){cols=+d.cols;return show()}if(d.del){cams=cams.filter(c=>c.id!=d.del);return show()}if(d.al){V.aid=+d.al;return show()}
if(d.jump){pb.min=+d.jump;return show()}
const c=cams.find(c=>c.id==sel)||cams[0],a=al.find(x=>x.id==V.aid);
if(d.a=="test")toast("Camera reachable (simulated)");
if(d.a=="add"){const n=document.getElementById("cn").value||"Camera "+(cams.length+1);mk(n,document.getElementById("cb").value,document.getElementById("ci").value||"192.168.1."+(10+cams.length));show();toast("Camera added")}
if(d.a=="all"){cams.forEach(x=>{x.an={...c.an};x.limit=c.limit});toast("Applied to all cameras")}
if(d.a=="play"){pb.play=!pb.play;show()}
if(d.a=="exp"){const x={cam:cams.find(c=>c.id==pb.cam).name,a:document.getElementById("xa").value,b:document.getElementById("xb").value,p:0};ex.unshift(x);const i=setInterval(()=>{x.p=Math.min(100,x.p+20);if(x.p>=100)clearInterval(i);if(view=="pb")show()},500);show()}
if(d.a=="dl")toast("In the server build this saves an MP4 from the recordings");
if(a){if(d.a=="handle"){a.status="Handling";a.user=ls();lg(a,"Alarm acknowledged and assigned");show()}
if(d.a=="rel"){a.status="New";lg(a,"Released to queue");a.user="";show()}
if(d.a=="clear"&&can(a)){a.status="Cleared";lg(a,"Cleared as "+a.disp);show();toast("Alarm cleared")}}});
document.addEventListener("change",e=>{const t=e.target,d=t.dataset,c=cams.find(c=>c.id==sel)||cams[0],a=al.find(x=>x.id==V.aid);
if("sel"in d){sel=+t.value;show()}if(d.an){c.an[d.an]=t.checked?1:0}if("lim"in d)c.limit=+t.value;
if("pbc"in d){pb.cam=+t.value;show()}
if(d.sop&&a){a.done[d.sop]=t.checked;lg(a,"SOP step "+d.sop+(t.checked?" done":" unticked"));show()}
if("disp"in d&&a){a.disp=t.value;lg(a,"Disposition: "+t.value);show()}
if("notes"in d&&a){a.notes=t.value;show()}});
document.addEventListener("input",e=>{const t=e.target;if(t.dataset.sf){sf[t.dataset.sf]=t.value;document.getElementById("res").innerHTML=res()}
if(t.id=="sl"){pb.min=+t.value;document.getElementById("pt").textContent=hm(pb.min)}});
document.getElementById("usr").onchange=show;
document.getElementById("th").onclick=()=>{const d=document.documentElement,dk=getComputedStyle(d).colorScheme=="dark"||d.dataset.theme=="dark";d.dataset.theme=dk?"light":"dark"};
["Front Gate","Car Park","Main Entrance","Perimeter East"].forEach((n,i)=>mk(n,"Hikvision","192.168.1."+(20+i)));
for(let i=0;i<160;i++){const c=cams[r(4)],o=no(r(5));addEv(c,["Line crossing (in)","Line crossing (out)","Motion","LPR","Speed"][r(5)],o,o.cls!="person"?40+r(40):0,Date.now()-r(86400000))}
ev.sort((a,b)=>b.t-a.t);
setInterval(()=>{step();if(pb.play){pb.min=(pb.min+1)%1440;const s=document.getElementById("sl");if(s){s.value=pb.min;document.getElementById("pt").textContent=hm(pb.min)}}},100);
setInterval(()=>{badge();if(view=="al"){const a=al.find(x=>x.id==V.aid);if(!a||!document.activeElement||document.activeElement.tagName!="TEXTAREA")show()}},5000);
show();loop();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
