import * as A from 'astronomy-engine';
export const E={
  name:'astronomy-engine',
  sunLon:t=>A.SunPosition(new Date(t)).elon,
  moonLon:t=>A.Ecliptic(A.GeoVector(A.Body.Moon,new Date(t),true)).elon,
  rise(body,dir,lat,lon,startMs){const r=A.SearchRiseSet(A.Body[body],new A.Observer(lat,lon,0),dir,new Date(startMs),1.5);return r?r.date.getTime():null},
  planetLon:(n,t)=>A.Ecliptic(A.GeoVector(A.Body[n],new Date(t),true)).elon,
  eclipses(fromMs,lat,lon,n){const ob=new A.Observer(lat,lon,0),out=[],alt=(b,tm)=>{const q=A.Equator(b,tm,ob,true,true);return A.Horizon(tm,ob,q.ra,q.dec,'normal').altitude};
    let s=A.SearchGlobalSolarEclipse(new Date(fromMs)),l=A.SearchLunarEclipse(new Date(fromMs));
    while(out.length<n){
      if(s.peak.date<=l.peak.date){let v=null;try{const q=A.SearchLocalSolarEclipse(s.peak.AddDays(-3),ob);if(Math.abs(q.peak.time.date-s.peak.date)<864e5&&(q.peak.altitude>0||q.partial_begin.altitude>0||q.partial_end.altitude>0))v=q}catch(e){}
        out.push({type:'solar',kind:s.kind,peak:s.peak.date.getTime(),visible:!!v,begin:v?v.partial_begin.time.date.getTime():null,end:v?v.partial_end.time.date.getTime():null});s=A.NextGlobalSolarEclipse(s.peak)}
      else{const sd=(l.sd_partial>0?l.sd_partial:l.sd_penum)*6e4,pk=l.peak.date.getTime(),vis=[l.peak,l.peak.AddDays(-sd/864e5),l.peak.AddDays(sd/864e5)].some(x=>alt(A.Body.Moon,x)>0);
        out.push({type:'lunar',kind:l.kind,peak:pk,visible:vis,begin:pk-sd,end:pk+sd});l=A.NextLunarEclipse(l.peak)}}
    return out},
  newMoonAfter:t=>A.SearchMoonPhase(0,new Date(t),45).date.getTime()
};
