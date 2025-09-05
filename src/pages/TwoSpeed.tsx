
import { useState } from 'react'

type Meter = { ttv:number; scale:number; risk:number; trust:number }
type Choice = { text:string; delta:Partial<Meter>; note:string }

const turns: { prompt:string; choices: Choice[] }[] = [
  {
    prompt: "A hospital wants AI scheduling for ORs. How do you start?",
    choices: [
      { text:"Build a generalized multi-hospital product", delta:{ ttv:-2, scale:+2, risk:+1, trust:0 }, note:"Three months in, requirements shift. Pilot delayed." },
      { text:"Ship a custom pilot for 1 OR in 3 weeks", delta:{ ttv:+3, scale:-1, risk:-1, trust:+2 }, note:"Pilot reduces delays by 8%; clinicians advocate expansion." }
    ]
  },
  {
    prompt: "Pilot success; next step?",
    choices: [
      { text:"Keep customizing site-by-site", delta:{ ttv:+1, scale:-2, risk:+1, trust:+1 }, note:"Five versions diverge; maintenance pain grows." },
      { text:"Extract pattern; start product MVP", delta:{ ttv:-1, scale:+3, risk:-1, trust:+1 }, note:"Common components identified; config model defined." }
    ]
  },
  {
    prompt: "Rollout plan?",
    choices: [
      { text:"Big bang to all sites", delta:{ ttv:-1, scale:+1, risk:+2, trust:-1 }, note:"Risk spikes; pushback from stakeholders." },
      { text:"Phased rollout + feedback gates", delta:{ ttv:+1, scale:+2, risk:-1, trust:+2 }, note:"Confidence grows; steady adoption." }
    ]
  }
]

export default function TwoSpeed(){
  const [meter, setMeter] = useState<Meter>({ ttv:0, scale:0, risk:0, trust:0 })
  const [notes, setNotes] = useState<string[]>([])
  const [step, setStep] = useState(0)

  function pick(c:Choice){
    const clamp = (v:number)=> Math.max(-5, Math.min(5, v))
    setMeter(m => ({
      ttv: clamp(m.ttv + (c.delta.ttv ?? 0)),
      scale: clamp(m.scale + (c.delta.scale ?? 0)),
      risk: clamp(m.risk + (c.delta.risk ?? 0)),
      trust: clamp(m.trust + (c.delta.trust ?? 0)),
    }))
    setNotes(n => [...n, c.note])
    setStep(s => s+1)
  }

  const finished = step >= turns.length
  const gold = meter.ttv>=3 && meter.scale>=3 && meter.risk<=0 && meter.trust>=2
  const silver = ( [meter.ttv>=3, meter.scale>=3, meter.risk<=0, meter.trust>=2].filter(Boolean).length >= 2 )

  return (
    <div className="card">
      <div className="h2">Two-Speed Simulator</div>
      <p className="muted">Balance Time-to-Value, Scalability, Risk, and Trust.</p>

      {!finished ? (
        <div className="card" style={{marginTop:8}}>
          <div className="h3">{turns[step].prompt}</div>
          <div style={{display:'flex', gap:12, marginTop:12}}>
            {turns[step].choices.map((c,i)=>(
              <button key={i} className="btn" onClick={()=>pick(c)}>{c.text}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="card" style={{marginTop:8}}>
          <div className="h3">Debrief</div>
          <ul>{notes.map((n,i)=><li key={i} className="muted">{n}</li>)}</ul>
          <div style={{marginTop:8}}>
            Outcome: {gold ? "🏅 Gold" : silver ? "🥈 Silver" : "🥉 Bronze"} — Two-speed paths (pilot → product → phased rollout) tend to dominate.
          </div>
        </div>
      )}

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:16}}>
        {[
          ["Time-to-Value", meter.ttv],
          ["Scalability", meter.scale],
          ["Risk (lower is better)", -meter.risk],
          ["Stakeholder Trust", meter.trust]
        ].map(([label,val],i)=>(
          <div key={i}>
            <div className="muted">{label}</div>
            <div className="meter"><div style={{width: ((Number(val)+5)/10*100)+'%'}}/></div>
          </div>
        ))}
      </div>
    </div>
  )
}
