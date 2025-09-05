
import { useState } from 'react'

const gates = [
  { id:'G0', title:'G0 — Solution Stage', def:'Solve one client’s problem in weeks; prove daily use & value.', dur:'2–4 weeks',
    success:'Client uses daily; positive feedback', q:'Is there a pattern here?' },
  { id:'G1', title:'G1 — Pattern Stage', def:'Validate repeatability across 2–3 contexts; identify reusable components.', dur:'4–6 weeks',
    success:'Reusable components identified', q:'Is this worth productizing?' },
  { id:'G2', title:'G2 — Product Dev', def:'Build configurable, multi-tenant MVP; onboard multiple clients.', dur:'6–8 weeks',
    success:'Multiple clients on same codebase', q:'Ready for broad market?' },
  { id:'G3', title:'G3 — General Availability', def:'Market-ready product; self-service possible; pricing & SLAs defined.', dur:'ongoing',
    success:'Clear pricing, SLAs, docs, support', q:'N/A' }
]

const quiz = [
  { prompt:'Pilot in one site, used daily — which stage?', answer:'G0' },
  { prompt:'We have reusable modules and 3 interested clients — which stage?', answer:'G1' },
  { prompt:'Configurable MVP with two clients onboarded — which stage?', answer:'G2' },
  { prompt:'Self-service onboarding & SLAs published — which stage?', answer:'G3' },
  { prompt:'Deciding if pattern merits investment — which stage?', answer:'G1' },
  { prompt:'Evaluating broad market readiness — which stage?', answer:'G2' }
]

export default function Journey(){
  const [sel, setSel] = useState('G0')
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)

  function answer(id:string){
    if(quiz[idx].answer===id) setScore(s=>s+1)
    setIdx(i=>i+1)
  }

  return (
    <div className="card">
      <div className="h2">Solution → Product Journey</div>
      <div style={{display:'flex', gap:8, marginTop:8}}>
        {gates.map(g=>(
          <button key={g.id} className={'btn' + (sel===g.id?'':' secondary')} onClick={()=>setSel(g.id)}>{g.id}</button>
        ))}
      </div>

      <div className="card" style={{marginTop:12}}>
        {gates.filter(g=>g.id===sel).map(g=>(
          <div key={g.id}>
            <div className="h3">{g.title}</div>
            <div className="muted">{g.def}</div>
            <div style={{marginTop:8}}><b>Typical duration:</b> {g.dur}</div>
            <div><b>Success looks like:</b> {g.success}</div>
            <div><b>Decision point:</b> {g.q}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{marginTop:12}}>
        <div className="h3">Gate Quiz</div>
        {idx<quiz.length ? (
          <>
            <div>{quiz[idx].prompt}</div>
            <div style={{display:'flex', gap:8, marginTop:8}}>
              {gates.map(g=>(<button key={g.id} className="btn" onClick={()=>answer(g.id)}>{g.id}</button>))}
            </div>
          </>
        ) : (
          <div>Score: {score} / {quiz.length}</div>
        )}
      </div>

      <div className="card" style={{marginTop:12}}>
        <div className="h3">Economics (illustrative)</div>
        <div className="muted">Services gross margin ≈ 35–40% at G0; Product subscriptions ≈ 70–80% by G3.</div>
      </div>
    </div>
  )
}
