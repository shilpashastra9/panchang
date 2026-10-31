import {sidMoon,marsSid,lagna,NK,RS} from './panchang.mjs';
const IST=19800000,I=(a,n)=>a.includes(n);
const gana=n=>I([0,4,6,7,12,14,16,21,26],n)?0:I([1,3,5,10,11,19,20,24,25],n)?1:2,GN=["Deva","Manushya","Rakshasa"];
const nadi=n=>I([0,5,6,11,12,17,18,23,24],n)?0:I([1,4,7,10,13,16,19,22,25],n)?1:2,ND=["Adi","Madhya","Antya"];
const VR=[2,1,0,3,2,1,0,3,2,1,0,3],VRN=["Shudra","Vaishya","Kshatriya","Brahmin"];
const VS=[0,0,1,2,3,1,1,4,1,2,1,2],VM=[[2,1,1,0,1],[1,2,.5,0,1],[1,.5,2,1,1],[0,0,1,2,0],[1,1,1,0,2]],VSN=["Chatushpada","Manav","Jalchar","Vanchar","Keet"];
const LORD=[2,5,3,1,0,3,5,2,4,6,6,4],FR=[[2,2,2,1,2,0,0],[2,2,1,2,1,1,1],[2,2,2,0,2,1,1],[2,0,1,2,1,2,1],[2,2,2,0,2,0,1],[0,0,1,2,1,2,2],[0,0,0,2,1,2,2]];
const YO=[0,1,2,3,3,4,5,2,5,6,6,7,8,9,8,9,10,10,4,11,12,11,13,0,13,7,1],YN=["Horse","Elephant","Sheep","Serpent","Dog","Cat","Rat","Cow","Buffalo","Tiger","Deer","Monkey","Mongoose","Lion"],YE=[[7,9],[1,13],[0,8],[4,10],[3,12],[11,2],[5,6]];
const tara=(a,b)=>!I([3,5,7],((a-b+27)%27+1)%9);
export function person(d,t,c){const[y,m,dd]=d.split("-").map(Number),[h,mi]=t.split(":").map(Number),ms=Date.UTC(y,m-1,dd,h,mi)-IST,mo=sidMoon(ms),n=Math.floor(mo/(360/27)),r=Math.floor(mo/30),lg=lagna(ms,c),mr=Math.floor(marsSid(ms)/30);
return{n,r,nk:NK[n],rs:RS[r],pada:Math.floor((mo%(360/27))/(360/108))+1,lg:RS[lg],mr,manglik:I([1,4,7,8,12],(mr-lg+12)%12+1)}}
export function match(b,g){const rows=[];
rows.push(["Varna",1,VR[b.r]>=VR[g.r]?1:0,`${VRN[VR[b.r]]} / ${VRN[VR[g.r]]}`]);
rows.push(["Vashya",2,VM[VS[b.r]][VS[g.r]],`${VSN[VS[b.r]]} / ${VSN[VS[g.r]]}`]);
rows.push(["Tara",3,(tara(b.n,g.n)?1.5:0)+(tara(g.n,b.n)?1.5:0),`${NK[b.n]} / ${NK[g.n]}`]);
const yb=YO[b.n],yg=YO[g.n];rows.push(["Yoni",4,yb==yg?4:YE.some(p=>I(p,yb)&&I(p,yg))?0:2,`${YN[yb]} / ${YN[yg]}`]);
const lb=LORD[b.r],lg=LORD[g.r],s=FR[lb][lg]+FR[lg][lb];rows.push(["Graha Maitri",5,s==4?5:s==3?4:s==2?(FR[lb][lg]==1?3:1):s==1?.5:0,`${RS[b.r]} / ${RS[g.r]} lords`]);
const gb=gana(b.n),gg=gana(g.n);rows.push(["Gana",6,[[6,6,1],[5,6,0],[1,0,6]][gb][gg],`${GN[gb]} / ${GN[gg]}`]);
const d1=(g.r-b.r+12)%12+1,d2=(b.r-g.r+12)%12+1;rows.push(["Bhakoot",7,[[2,12],[5,9],[6,8]].some(p=>(d1==p[0]&&d2==p[1])||(d1==p[1]&&d2==p[0]))?0:7,`${RS[b.r]} / ${RS[g.r]}`]);
const nb=nadi(b.n),ng=nadi(g.n);rows.push(["Nadi",8,nb==ng?0:8,`${ND[nb]} / ${ND[ng]}`]);
const total=rows.reduce((a,r)=>a+r[2],0),fr=FR[lb][lg]==2&&FR[lg][lb]==2,same=lb==lg,doshas=[];let back=0;
if(nb==ng){const w=b.r==g.r&&b.n!=g.n?"same Moon sign but different nakshatra":b.n==g.n&&b.pada!=g.pada?"same nakshatra but different pada":same?"both Moon signs have the same lord":"";doshas.push(["Nadi dosha",1,w]);if(w)back+=8}
if(rows[6][2]==0){const w=same?"both Moon sign lords are the same":fr?"the two Moon sign lords are mutual friends":"";doshas.push(["Bhakoot dosha",1,w]);if(w)back+=7}
if(rows[5][2]<=1){const w=rows[4][2]>=4?"Graha Maitri is strong (4 or more points)":"";doshas.push(["Gana dosha",1,w]);if(w)back+=6-rows[5][2]}
if(b.manglik&&g.manglik)doshas.push(["Manglik dosha",1,"both are Manglik, so they balance each other"]);
else[[b,"boy"],[g,"girl"]].forEach(([p,n])=>{if(p.manglik)doshas.push([`Manglik dosha (${n})`,1,I([0,7,9],p.mr)?"Mars is in its own or exalted sign":""])});
const adj=Math.min(36,total+back);return{rows,total,adj,doshas,verdict:adj>=33?"Excellent match":adj>=25?"Very good match":adj>=18?"Acceptable match":"Below the usual minimum of 18"}}
