"use client";

import { FormEvent, useMemo, useState } from "react";

type Candidate = { name:string; handle:string; initials:string; mutuals:number; vouches:number; strength:"High"|"Medium"|"Low"; status:"Ready"|"Vouched you"|"No vouches"; accent:string };
const candidates: Candidate[] = [
  { name:"Dami", handle:"dami_builds", initials:"DA", mutuals:42, vouches:3, strength:"High", status:"Ready", accent:"#d8ff53" },
  { name:"Tobi Akin", handle:"tobiakin", initials:"TA", mutuals:31, vouches:2, strength:"High", status:"Ready", accent:"#a9e7ff" },
  { name:"Nana", handle:"nanaonchain", initials:"NA", mutuals:18, vouches:1, strength:"Medium", status:"Ready", accent:"#ffc3e5" },
  { name:"Jide", handle:"jidecodes", initials:"JI", mutuals:26, vouches:0, strength:"Low", status:"No vouches", accent:"#e5e2dd" },
  { name:"Mira", handle:"miramakes", initials:"MI", mutuals:14, vouches:2, strength:"Medium", status:"Vouched you", accent:"#ffce73" },
];
type Filter = "Best matches"|"Unused vouches"|"Already vouched";

function RadarMark(){return <span className="brand-mark" aria-hidden="true"><span className="radar-ring"/><span className="radar-dot"/></span>}

export default function Home(){
  const [handle,setHandle]=useState("MojeebMotion");
  const [activeHandle,setActiveHandle]=useState("MojeebMotion");
  const [filter,setFilter]=useState<Filter>("Best matches");
  const [contacted,setContacted]=useState<string[]>([]);
  const [scanning,setScanning]=useState(false);
  const visible=useMemo(()=>filter==="Unused vouches"?candidates.filter(p=>p.status==="Ready"):filter==="Already vouched"?candidates.filter(p=>p.status==="Vouched you"):[...candidates].sort((a,b)=>b.vouches-a.vouches||b.mutuals-a.mutuals),[filter]);
  function scan(event:FormEvent){event.preventDefault();const clean=handle.trim().replace(/^@/,"");if(!clean)return;setScanning(true);window.setTimeout(()=>{setActiveHandle(clean);setScanning(false)},650)}
  function outreach(person:Candidate){setContacted(current=>current.includes(person.handle)?current:[...current,person.handle]);const message=`Hey @${person.handle}, I noticed we’re both on Commons Made. If you still have a vouch left and genuinely rate what I’m building, I’d really appreciate one for @${activeHandle}. Happy to support you too 🤝`;window.open(`https://x.com/intent/post?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer")}
  return <main className="app-shell">
    <header className="topbar"><a className="brand" href="#top" aria-label="Vouch Radar home"><RadarMark/><span>Vouch Radar</span></a><div className="campaign-pill"><span className="pulse"/> Commons campaign live</div><a className="commons-link" href="https://commonsmade.com/vouch" target="_blank" rel="noreferrer">Open Commons <span aria-hidden="true">↗</span></a></header>
    <div className="page" id="top">
      <section className="intro"><div><p className="eyebrow">Your mutuals. Your best shot.</p><h1>Find the people who can still <em>vouch for you.</em></h1><p className="lede">Scan your X mutuals, see who joined Commons, and reach out before their vouches run out.</p></div><div className="deadline-card"><span>Campaign window</span><strong>Ending soon</strong><p>Don’t leave good mutuals unasked.</p></div></section>
      <form className="scanner" onSubmit={scan}><label htmlFor="handle">Your X handle</label><div className="scan-controls"><div className="handle-input"><span>@</span><input id="handle" value={handle} onChange={e=>setHandle(e.target.value)} placeholder="yourhandle" autoComplete="off"/></div><button type="submit" disabled={scanning}>{scanning?"Scanning…":"Scan my mutuals"}<span aria-hidden="true">→</span></button></div><p className="privacy-note"><span aria-hidden="true">●</span> Read-only scan. We never post or DM without you.</p></form>
      <section className="results" aria-live="polite"><div className="results-head"><div><p className="eyebrow">Radar results for @{activeHandle}</p><h2>12 mutuals worth asking</h2></div><div className="stats" aria-label="Scan summary"><div><strong>12</strong><span>matches</span></div><div><strong>8</strong><span>vouches open</span></div><div><strong>3</strong><span>asked</span></div></div></div>
        <div className="filter-row" role="group" aria-label="Filter candidates">{(["Best matches","Unused vouches","Already vouched"] as Filter[]).map(item=><button type="button" key={item} className={filter===item?"active":""} onClick={()=>setFilter(item)}>{item}</button>)}</div>
        <div className="candidate-list">{visible.map(person=>{const asked=contacted.includes(person.handle);return <article className={`candidate ${person.status!=="Ready"?"muted":""}`} key={person.handle}><div className="identity"><div className="avatar" style={{background:person.accent}}>{person.initials}</div><div><h3>{person.name}</h3><a href={`https://x.com/${person.handle}`} target="_blank" rel="noreferrer">@{person.handle}</a></div></div><div className="signals"><span><b>{person.mutuals}</b> shared mutuals</span><span><b>{person.vouches}</b> vouches left</span></div><div className={`strength ${person.strength.toLowerCase()}`}><span/> {person.strength} potential</div><div className="candidate-action">{person.status==="Ready"?<button className={asked?"asked":""} onClick={()=>outreach(person)}>{asked?"Asked ✓":"Ask on X ↗"}</button>:<span className="status-label">{person.status==="Vouched you"?"Already supported you":"No vouches available"}</span>}</div></article>})}</div>
        <p className="data-note"><strong>Prototype data:</strong> live X and Commons connections will replace these representative results.</p>
      </section>
    </div>
    <footer><span>Built for people holding each other down.</span><span>Vouch Radar · Independent community tool</span></footer>
  </main>
}
