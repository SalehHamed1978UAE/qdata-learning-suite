
import { useEffect, useMemo, useState } from 'react'
import type { Scenario, ProductLine, Speed, Stage } from '../utils'
import { currency } from '../utils'

export default function Playground(){
  const [scenarios,setScenarios] = useState<Scenario[]>([])
  const [sel, setSel] = useState<string>('sc01')
  const [pl, setPl] = useState<ProductLine|undefined>()
  const [sp, setSp] = useState<Speed|undefined>()
  const [st, setSt] = useState<Stage|undefined>()
  const [submitted, setSubmitted] = useState(false)

  useEffect(()=>{
    fetch('/src/data/scenarios.json').then(r=>r.json()).then(setScenarios)
  },[])

  const s = useMemo(()=>scenarios.find(x=>x.id===sel),[scenarios,sel])

  function submit(){ setSubmitted(true) }
  function reset(){ setPl(undefined); setSp(undefined); setSt(undefined); setSubmitted(false) }

  const score = (submitted && s) ? ((pl===s.correctProductLine) + (sp===s.recommendedStartSpeed) + (st===s.startingStage)) : 0

  return (
    <div className="card">
      <div className="h2">Scenario Playground</div>
      <select value={sel} onChange={e=>{setSel(e.target.value); reset();}}>
        {scenarios.map(sc=>(<option key={sc.id} value={sc.id}>{sc.title}</option>))}
      </select>

      {s && (
        <div className="card" style={{marginTop:12}}>
          <div className="h3">{s.client} — {s.title}</div>
          <div className="muted">{s.problem}</div>

          <div style={{display:'grid', gridTemplateColumns:'1fr', gap:12, marginTop:12}}>
            <div>
              <div><b>1) Which product line?</b></div>
              {["OperationalAI","DataAnalytics","AIPlatforms"].map(x=>(
                <button key={x} className="btn" style={{marginRight:8}} onClick={()=>setPl(x as any)}>{x}</button>
              ))}
              {submitted && <div className="muted">Correct: <b>{s.correctProductLine}</b> — {s.rationale.productLine}</div>}
            </div>
            <div>
              <div><b>2) Start with which speed?</b></div>
              {["Solutions","Product"].map(x=>(
                <button key={x} className="btn" style={{marginRight:8}} onClick={()=>setSp(x as any)}>{x}</button>
              ))}
              {submitted && <div className="muted">Recommended: <b>{s.recommendedStartSpeed}</b> — {s.rationale.speed}</div>}
            </div>
            <div>
              <div><b>3) Which stage today?</b></div>
              {["G0","G1","G2","G3"].map(x=>(
                <button key={x} className="btn" style={{marginRight:8}} onClick={()=>setSt(x as any)}>{x}</button>
              ))}
              {submitted && <div className="muted">Answer: <b>{s.startingStage}</b> — {s.rationale.stage}</div>}
            </div>
          </div>

          {!submitted ? (
            <button className="btn" style={{marginTop:12}} onClick={submit}>Submit</button>
          ) : (
            <div className="card" style={{marginTop:12}}>
              <div className="h3">Feedback</div>
              <div>Score: <b>{score}</b> / 3</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:8}}>
                <div className="card">
                  <div className="h3">Evolution</div>
                  <div className="muted">{s.evolution}</div>
                </div>
                <div className="card">
                  <div className="h3">Timeline & Economics</div>
                  <div>Solution: {s.timelineWeeks.solution} weeks — Project: {currency(s.economics.projectUSD)}</div>
                  <div>Product: {s.timelineWeeks.product} weeks — Subscription: {currency(s.economics.productPerMonthUSD)}/month</div>
                </div>
              </div>
              <button className="btn secondary" style={{marginTop:12}} onClick={reset}>Try Another</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
