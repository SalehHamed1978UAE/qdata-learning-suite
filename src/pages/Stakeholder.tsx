
import { useEffect, useMemo, useState } from 'react'
import type { Scenario } from '../utils'

const nounMap: Record<string, any> = {
  OilGas: { asset:'compressor', site:'refinery', metric:'uptime' },
  Utilities: { asset:'substation', site:'region', metric:'load factor' },
  Logistics: { asset:'crane', site:'port', metric:'turnaround time' },
  Manufacturing: { asset:'line', site:'plant', metric:'throughput' },
  Healthcare: { asset:'bed', site:'hospital', metric:'LOS' },
  Retail: { asset:'checkout', site:'store', metric:'basket size' },
  Financial: { asset:'claim', site:'portfolio', metric:'loss ratio' },
  PublicSector: { asset:'case', site:'department', metric:'cycle time' },
  CrossDomain: { asset:'asset', site:'site', metric:'KPI' }
}

export default function Stakeholder(){
  const [scenarios,setScenarios] = useState<Scenario[]>([])
  const [stake, setStake] = useState<any[]>([])
  const [sel, setSel] = useState<string>('sc01')
  const [aud, setAud] = useState<'Executive'|'Technical'|'Client'|'Investor'>('Executive')

  useEffect(()=>{
    fetch('/src/data/scenarios.json').then(r=>r.json()).then(setScenarios)
    fetch('/src/data/stakeholder_copy.json').then(r=>r.json()).then(setStake)
  },[])

  const scenario = useMemo(()=>scenarios.find(s=>s.id===sel),[scenarios,sel])
  const template = useMemo(()=>stake.find((s:any)=>s.audience===aud),[stake,aud])
  const nouns = nounMap[scenario?.industry ?? 'CrossDomain']

 function replaceAllSafe(haystack: string, needle: string, replacement: string) {
  // ES2020-safe: split + join
  return haystack.split(needle).join(replacement);
}

function adapt(text: string) {
  if (!scenario) return '';
  let out = text;

  const problemLower = scenario.problem.toLowerCase();
  const nounsLocal = nouns;

  // Example noun swaps (keep order deterministic)
  out = replaceAllSafe(out, 'predictive maintenance',
    problemLower.includes('predict') ? 'predictive maintenance' : problemLower);

  out = replaceAllSafe(out, 'plant', nounsLocal.site);
  out = replaceAllSafe(out, 'site', nounsLocal.site);
  out = replaceAllSafe(out, 'asset', nounsLocal.asset);
  out = replaceAllSafe(out, 'portfolio', 'portfolio');

  return out;
}


  return (
    <div className="card">
      <div className="h2">Stakeholder Lens Viewer</div>
      <div style={{display:'flex', gap:8, flexWrap:'wrap', marginTop:8}}>
        <select value={sel} onChange={e=>setSel(e.target.value)}>
          {scenarios.map(s=>(<option key={s.id} value={s.id}>{s.title}</option>))}
        </select>
        <select value={aud} onChange={e=>setAud(e.target.value as any)}>
          {['Executive','Technical','Client','Investor'].map(a=>(<option key={a} value={a}>{a}</option>))}
        </select>
      </div>

      {scenario && template && (
        <div className="card" style={{marginTop:12}}>
          <div className="h3">{scenario.title} — {aud} Lens</div>
          <div><b>Framing:</b> {adapt(template.framing)}</div>
          <div style={{marginTop:8}}><b>Key Points:</b>
            <ul>
              {template.bullets.map((b:string,i:number)=>(<li key={i}>{adapt(b)}</li>))}
            </ul>
          </div>
          <div><b>Example:</b> “{adapt(template.example)}”</div>
        </div>
      )}
    </div>
  )
}
