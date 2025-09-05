
import { useEffect, useState } from 'react'
import type { ProblemStatement, ProductLine } from '../utils'

function classifyRule(text:string): ProductLine {
  const t = text.toLowerCase()
  const has = (w:string)=> t.includes(w)
  const infra = ["platform","api ","apis","data lake","feature store","multi-tenant","shared"]
  const act = ["auto-approve","auto approve","assign","execute","control","shut","automatically","auto-"]
  const insight = ["dashboard","forecast","report","alert","recommend"]
  if (infra.some(k=>has(k))) return "AIPlatforms"
  if (act.some(k=>has(k))) return "OperationalAI"
  if (insight.some(k=>has(k))) return "DataAnalytics"
  // default by verbs
  return "DataAnalytics"
}

export default function MECE(){
  const [items, setItems] = useState<ProblemStatement[]>([])
  const [answers, setAnswers] = useState<Record<string, ProductLine>>({})
  const [free, setFree] = useState("We need to optimize truck routing and automatically assign drivers daily.")

  useEffect(()=>{
    fetch('/src/data/mece_problems.json').then(r=>r.json()).then(setItems)
  },[])

  const score = Object.entries(answers).reduce((acc,[id,pl])=>{
    const correct = items.find(i=>i.id===id)?.correctProductLine
    return acc + (pl===correct ? 1 : 0)
  },0)

  return (
    <div className="card">
      <div className="h2">MECE Product Lines Sandbox</div>
      <p className="muted">Classify by core intent: act (Operational AI), inform (Analytics), enable many (Platforms).</p>

      <div className="grid">
        {items.map(p=>(
          <div key={p.id} className="card">
            <div style={{fontWeight:700}}>{p.text}</div>
            <div className="muted" style={{fontSize:12}}>{p.industry}</div>
            <div style={{display:'flex', gap:8, marginTop:8}}>
              {["OperationalAI","DataAnalytics","AIPlatforms"].map(pl=>(
                <button key={pl} className="btn" onClick={()=>setAnswers(a=>({...a,[p.id]:pl as ProductLine}))}>{pl}</button>
              ))}
            </div>
            {answers[p.id] && (
              <div style={{marginTop:8}} className="muted">
                {answers[p.id]===p.correctProductLine
                  ? <>✅ Correct. <i>{p.explanation}</i></>
                  : <>❌ Not quite. This is <b>{p.correctProductLine}</b> because <i>{p.explanation}</i></>}
                {p.tricky && <div>Fair catch — it’s tricky. Decide by whether the system <b>acts</b> or <b>informs</b>.</div>}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card" style={{marginTop:16}}>
        <div className="h3">Free-text classification</div>
        <textarea value={free} onChange={e=>setFree(e.target.value)} style={{width:'100%', minHeight:80, background:'#0e141c', color:'white', border:'1px solid #243041', borderRadius:8, padding:8}}/>
        <div style={{marginTop:8}}>
          Predicted: <span className="pill">{classifyRule(free)}</span>
        </div>
      </div>

      <div className="h3" style={{marginTop:12}}>Score: {score} / {items.length}</div>
    </div>
  )
}
