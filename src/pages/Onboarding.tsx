
import { useState } from 'react'

export default function Onboarding(){
  const [done, setDone] = useState(false)
  return (
    <div className="card">
      <div className="h2">QData Academy Onboarding</div>
      <p className="muted">Learn the Two-Speed × Three Product Lines model step by step.</p>
      <button className="btn" onClick={()=>setDone(true)}>Mark Complete</button>
      {done && <div>✅ Onboarding complete!</div>}
    </div>
  )
}
