
import { useEffect, useMemo, useState } from 'react'
import type { CaseStudy, ChallengeCard } from '../utils'

export default function MarketExplorer(){
  const [cases, setCases] = useState<CaseStudy[]>([])
  const [quiz, setQuiz] = useState<ChallengeCard[]>([])
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(()=>{
    fetch('/src/data/case_studies.json').then(r=>r.json()).then(setCases)
    fetch('/src/data/challenge_cards.json').then(r=>r.json()).then(setQuiz)
  },[])

  const years = useMemo(()=>Array.from(new Set(cases.map(c=>c.year))).sort((a,b)=>a-b),[cases])

  function answer(idx:number, choice:string){
    if(done) return
    if(quiz[idx].correct === choice) setScore(s=>s+1)
    if(idx === quiz.length-1) setDone(true)
  }

  return (
    <div className="card">
      <div className="h2">AI Market Explorer</div>
      <p className="muted">Explore what actually worked and why. (Fabricated training data.)</p>

      <div className="h3" style={{marginTop:16}}>Timeline</div>
      <div className="grid">
        {years.map(y => (
          <div key={y} className="card">
            <div className="h3">{y}</div>
            {cases.filter(c=>c.year===y).map(c=>(
              <div key={c.id} style={{marginTop:8}}>
                <div><span className="pill">{c.outcome}</span> <b>{c.title}</b></div>
                <div className="muted" style={{fontSize:13}}>{c.summary}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="h3" style={{marginTop:24}}>Reality Check (Quiz)</div>
      <div className="grid">
        {quiz.map((q,idx)=>(
          <div key={q.id} className="card">
            <div><b>{q.prompt}</b></div>
            <div className="muted" style={{fontSize:13}}>Signals: {q.signals.join(' • ')}</div>
            <div style={{display:'flex', gap:8, marginTop:8}}>
              {["Success","Failure","It depends"].map(opt=>(
                <button key={opt} className="btn" onClick={()=>answer(idx,opt)}>{opt}</button>
              ))}
            </div>
            {done && (
              <div style={{marginTop:8}} className="muted">Correct: <b>{q.correct}</b> — {q.rationale}</div>
            )}
          </div>
        ))}
      </div>

      <div style={{marginTop:16, display:'flex', gap:8, alignItems:'center'}}>
        <div className="h3">Score: {score} / {quiz.length}</div>
        {!done && <span className="muted">Answer all to reveal rationales.</span>}
      </div>
    </div>
  )
}
