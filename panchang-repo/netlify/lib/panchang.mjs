import {E} from './engine.mjs';
const M=x=>((x%360)+360)%360,J=t=>t/864e5+2440587.5,IST=19800000;
const sid=(x,t)=>M(x-(23.857+(J(t)-2451545)/365.25*.01397));
const sSun=t=>sid(E.sunLon(t),t),sMoon=t=>sid(E.moonLon(t),t),el=t=>M(E.moonLon(t)-E.sunLon(t));
export const WD=["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],WE=["Ravivar","Somvar","Mangalvar","Budhvar","Guruvar","Shukravar","Shanivar"];
export const MO=["Chaitra","Vaishakha","Jyeshtha","Ashadha","Shravana","Bhadrapada","Ashwin","Kartik","Margashirsha","Pausha","Magha","Phalguna"];
export const MH=["चैत्र","वैशाख","ज्येष्ठ","आषाढ़","श्रावण","भाद्रपद","आश्विन","कार्तिक","मार्गशीर्ष","पौष","माघ","फाल्गुन"];
const RT=["Vasant","Vasant","Grishma","Grishma","Varsha","Varsha","Sharad","Sharad","Hemant","Hemant","Shishir","Shishir"];
const TN=["Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi"];
const NK="Ashwini,Bharani,Krittika,Rohini,Mrigashira,Ardra,Punarvasu,Pushya,Ashlesha,Magha,Purva Phalguni,Uttara Phalguni,Hasta,Chitra,Swati,Vishakha,Anuradha,Jyeshtha,Mula,Purva Ashadha,Uttara Ashadha,Shravana,Dhanishta,Shatabhisha,Purva Bhadrapada,Uttara Bhadrapada,Revati".split(",");
const YG="Vishkambha,Priti,Ayushman,Saubhagya,Shobhana,Atiganda,Sukarma,Dhriti,Shula,Ganda,Vriddhi,Dhruva,Vyaghata,Harshana,Vajra,Siddhi,Vyatipata,Variyana,Parigha,Shiva,Siddha,Sadhya,Shubha,Shukla,Brahma,Indra,Vaidhriti".split(",");
const KR=["Bava","Balava","Kaulava","Taitila","Gara","Vanija","Vishti (Bhadra)"],RS="Mesha,Vrishabha,Mithuna,Karka,Simha,Kanya,Tula,Vrischika,Dhanu,Makar,Kumbha,Meena".split(",");
const FE=[[0,0,1,"Chaitra Navratri begins"],[0,0,9,"Ram Navami"],[0,0,15,"Hanuman Jayanti"],[0,1,1,"Holi (Rangwali)"],[1,0,3,"Akshaya Tritiya"],[2,0,10,"Ganga Dussehra"],[3,0,2,"Jagannath Rath Yatra"],[3,0,15,"Guru Purnima"],[4,0,5,"Nag Panchami"],[4,0,15,"Raksha Bandhan"],[5,1,8,"Krishna Janmashtami"],[5,0,4,"Ganesh Chaturthi"],[6,0,1,"Sharad Navratri begins"],[6,0,8,"Durga Ashtami"],[6,0,10,"Vijayadashami (Dussehra)"],[6,0,15,"Sharad Purnima"],[7,1,4,"Karwa Chauth"],[7,1,13,"Dhanteras"],[7,1,14,"Narak Chaturdashi"],[7,1,15,"Diwali (Lakshmi Puja)"],[7,0,1,"Govardhan Puja"],[7,0,2,"Bhai Dooj"],[7,0,6,"Chhath Puja"],[7,0,11,"Dev Uthani Ekadashi"],[7,0,15,"Kartik Purnima"],[8,0,5,"Vivah Panchami"],[10,0,5,"Vasant Panchami"],[11,1,14,"Maha Shivratri"],[11,0,15,"Holika Dahan"]];
const REF={"Akshaya Tritiya":3,"Ganesh Chaturthi":3,"Dev Uthani Ekadashi":3,"Vijayadashami (Dussehra)":4,"Sharad Purnima":2,"Karwa Chauth":1,"Diwali (Lakshmi Puja)":1,"Holika Dahan":1,"Dhanteras":1,"Maha Shivratri":2,"Krishna Janmashtami":2,"Ram Navami":3};
const ECL=[[2027,1,6,"Surya Grahan (annular, not visible in India)"],[2027,1,20,"Chandra Grahan (penumbral, visible in India)"],[2027,6,18,"Chandra Grahan (penumbral)"],[2027,7,2,"Surya Grahan (partial in India, Sutak applies)"],[2027,7,17,"Chandra Grahan (penumbral)"]];
const CD=["Udveg","Chal","Labh","Amrit","Kaal","Shubh","Rog"],CN=["Shubh","Amrit","Chal","Rog","Kaal","Labh","Udveg"];
export const GOOD={Amrit:1,Shubh:1,Labh:1,Chal:0};
const RAHU=[8,2,7,5,6,4,3],YAMA=[5,4,3,2,1,7,6],GULI=[7,6,5,4,3,2,1];
export const fmt=(t,base)=>{if(t==null)return"—";const l=t+IST,D=new Date(l);let h=D.getUTCHours();const mi=String(D.getUTCMinutes()).padStart(2,"0"),ap=h<12?"AM":"PM";h=h%12||12;return h+":"+mi+" "+ap+(Math.floor(l/864e5)>Math.floor((base+IST)/864e5)?" (next day)":"")};
export const rg=(a,b,base)=>fmt(a,base)+" – "+fmt(b,base);
const asd=(n,t)=>Math.abs(M(E.planetLon(n,t)-E.sunLon(t)+180)-180);
const rise=(y,m,d,c)=>{const s=Date.UTC(y,m,d)-IST;return[E.rise("Sun",1,c.lat,c.lon,s),E.rise("Sun",-1,c.lat,c.lon,s)]};
function ends(f,t){const v=f(t);let a=t,b;for(let i=0;i<170;i++){b=a+9e5;if(f(b)!==v)break;a=b}if(f(b)===v)return null;for(let i=0;i<12;i++){const x=(a+b)/2;f(x)===v?a=x:b=x}return b}
function newMoons(sr){let a=E.newMoonAfter(sr-32*864e5),b;for(;;){b=E.newMoonAfter(a+864e5);if(b>sr)break;a=b}return[a,b]}
function fm(P,ud){const out=[],dl=P.ss-P.sr,sk=Math.floor(el(P.sr)/12)>=15;FE.forEach(f=>{const r=ud?0:REF[f[3]]||0,t=r==1?P.ss+36e5:r==2?P.ss+(864e5-dl)/2:r==3?(P.sr+P.ss)/2:r==4?P.sr+.7*dl:P.sr,ti=Math.floor(el(t)/12),rk=ti>=15;let a=P.am;if(sk&&!rk)a=(a+1)%12;const pm=rk?(a+1)%12:a;if(pm==f[0]&&rk==(f[1]==1)&&ti%15+1==f[2])out.push(f[3])});return out}
export function pan(y,m,d,c,full=false,nf=false){
const[sr,ss]=rise(y,m,d,c),e=el(sr),ti=Math.floor(e/12),k=ti>=15,tn=ti%15+1,wd=new Date(Date.UTC(y,m,d)).getUTCDay();
const sS=sSun(sr),mS=sMoon(sr),ni=Math.floor(mS/(360/27)),yi=Math.floor(M(sS+mS)/(360/27)),ki=Math.floor(e/6);
const[a,b]=newMoons(sr),r1=Math.floor(sSun(a)/30),r2=Math.floor(sSun(b)/30),am=(r1+1)%12,adh=r1==r2,pm=k?(am+1)%12:am;
const rs=Math.floor(sS/30),rsS=Math.floor(sSun(ss)/30),rpS=Math.floor(sSun(ss-864e5)/30),ekn=Math.floor(el(sr+864e5)/12)%15==10,ekm=Math.floor(el((sr+ss)/2)/12)%15==10,fest=[],nm=tn==15?(k?"Amavasya":"Purnima"):TN[tn-1];
const eka=ti%15==10,dva=Math.floor(el(sr-96*6e4)/12)%15==9,pp=nf?null:pan(y,m,d-1,c,false,true),pn=nf?null:pan(y,m,d+1,c,false,true);
if(pp&&!adh){const Q={sr,ss,am},T=fm(Q),PV=fm(pp),NX=fm(pn),UD=fm(Q,1),UP=fm(pp,1);T.forEach(f=>{if(!PV.includes(f))fest.push([f,1])});UD.forEach(f=>{if(!T.includes(f)&&!PV.includes(f)&&!NX.includes(f)&&!UP.includes(f))fest.push([f,1])})}
if(pp){const ks=!eka&&!ekn&&ekm,sm=(eka&&!pp.eka)||ks,vs=(eka&&!dva&&!pp.eka)||(eka&&pp.eka)||(pp.eka&&pp.dva&&!eka)||ks;if(sm||vs)fest.push([(k?"Krishna":"Shukla")+" Ekadashi ("+(sm&&vs?"Smarta and Vaishnava":sm?"Smarta":"Vaishnava")+")",0])}
if(rsS!=rs||rs!=rpS){const nr=rsS!=rs?rsS:rs;fest.push([nr==9?"Makar Sankranti":RS[nr]+" Sankranti",1])}
if(tn==13)fest.push(["Pradosh Vrat",0]);
if(tn==15&&!k)fest.push(["Purnima",0]);if(tn==15&&k)fest.push(["Amavasya",0]);if(tn==4&&k)fest.push(["Sankashti Chaturthi",0]);if(tn==14&&k)fest.push(["Masik Shivratri",0]);
const P={y,m,d,wd,sr,ss,k,tn,nm,pm,am,rs,fest,adh,eka,dva,ekn,ekm,ga:asd("Jupiter",sr)<11,sa:asd("Venus",sr)<10,nk:NK[ni],ki,mi:Math.floor(mS/30),pk:[10,11].includes(Math.floor(mS/30)),bh:ki>=1&&ki<=56&&(ki-1)%7==6,
tl:(k?"Krishna":"Shukla")+" Paksha",ayan:[9,10,11,0,1,2].includes(rs)?"Uttarayan":"Dakshinayan",ritu:RT[am],gy:y+(m<=3&&am>=8?56:57),sh:y-(m<=3&&am>=8?79:78),mon:MO[pm],monH:MH[pm]};
if(!full)return P;
const kn=ki==0?"Kimstughna":ki>=57?["Shakuni","Chatushpada","Naga"][ki-57]:KR[(ki-1)%7];
P.T=[nm,ends(t=>Math.floor(el(t)/12),sr)];P.N=[NK[ni],ends(t=>Math.floor(sMoon(t)/(360/27)),sr)];
P.Y=[YG[yi],ends(t=>Math.floor(M(sSun(t)+sMoon(t))/(360/27)),sr)];P.K=[kn,ends(t=>Math.floor(el(t)/6),sr)];
P.mr=RS[Math.floor(mS/30)];P.sr_=RS[rs];
const s2=rise(y,m,d+1,c)[0],t2=Math.floor(el(s2)/12),dd=(t2-ti+30)%30,tnm=i=>i%15==14?(i==14?"Purnima":"Amavasya"):TN[i%15];
P.kv=dd==0?"Vriddhi tithi (also at next sunrise)":dd>=2?"Kshaya: "+tnm((ti+1)%30)+" skipped":"";
const s0=Date.UTC(y,m,d)-IST;P.mr1=E.rise("Moon",1,c.lat,c.lon,s0);P.ms1=E.rise("Moon",-1,c.lat,c.lon,s0);
const fk=t=>Math.floor(el(t)/6),vs=q=>q>=1&&q<=56&&(q-1)%7==6,e1=P.K[1];P.bd=vs(ki)?[sr,e1]:(vs(ki+1)&&e1&&e1<ss?[e1,ends(fk,e1+6e4)]:null);
const dl=ss-sr,pt=dl/8,sl=n=>[sr+(n-1)*pt,sr+n*pt];P.rahu=sl(RAHU[wd]);P.yama=sl(YAMA[wd]);P.guli=sl(GULI[wd]);
P.abh=[sr+7*dl/15,sr+8*dl/15];P.brh=[sr-96*6e4,sr-48*6e4];
const nl=(864e5-dl)/8;P.cd=[...Array(8)].map((_,i)=>[CD[(3*wd+i)%7],sr+i*dl/8,sr+(i+1)*dl/8]);
P.cn=[...Array(8)].map((_,i)=>[CN[(2*wd+i)%7],ss+i*nl,ss+(i+1)*nl]);return P}

export {NK,YG,TN,KR,RS};

// ---- ascendant, muhurat windows, helpers for kundli ----
export const sidMoon=sMoon,marsSid=t=>sid(E.planetLon("Mars",t),t);
const asc=(t,lat,lon)=>{const r=Math.PI/180,T=(J(t)-2451545)/36525,th=M(280.46061837+360.98564736629*(J(t)-2451545)+lon)*r,ep=(23.4393-.0130042*T)*r;return sid(M(Math.atan2(Math.cos(th),-(Math.sin(th)*Math.cos(ep)+Math.tan(lat*r)*Math.sin(ep)))/r),t)};
export const lagna=(t,c)=>Math.floor(asc(t,c.lat,c.lon)/30);
export function muhWindows(P,c,q){
const{sr,ss,wd}=P,dl=ss-sr,pt=dl/8,sl=n=>[sr+(n-1)*pt,sr+n*pt],bad=[sl(RAHU[wd]),sl(YAMA[wd]),sl(GULI[wd])],cdl=[...Array(8)].map((_,i)=>[CD[(3*wd+i)%7],sr+i*dl/8,sr+(i+1)*dl/8]);
const ok=t=>{if(bad.some(b=>t>=b[0]&&t<b[1]))return 0;const cg=cdl.find(x=>t>=x[1]&&t<x[2]);if(!cg||!q.cg.includes(cg[0]))return 0;
const e=el(t),ti=Math.floor(e/12);if(ti==29||!q.tt.includes(ti%15+1))return 0;const mo=sMoon(t);if(!q.nk.includes(NK[Math.floor(mo/(360/27))]))return 0;
const mr=Math.floor(mo/30);if(mr==10||mr==11)return 0;const kq=Math.floor(e/6);if(kq>=1&&kq<=56&&(kq-1)%7==6)return 0;
if(q.lg&&!q.lg.includes(lagna(t,c)))return 0;return 1};
const out=[];let st=null;for(let t=sr;t<=ss;t+=3e5){const g=ok(t);if(g&&st==null)st=t;if(!g&&st!=null){if(t-st>=15*6e4)out.push([st,t]);st=null}}
if(st!=null&&ss-st>=15*6e4)out.push([st,ss]);return out}
