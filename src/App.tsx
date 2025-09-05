
import { Outlet, NavLink } from 'react-router-dom'

export default function App(){
  const tabs = [
    { to:'/market-explorer', label:'Market' },
    { to:'/two-speed', label:'Two-Speed' },
    { to:'/mece-sandbox', label:'MECE' },
    { to:'/journey-map', label:'Journey' },
    { to:'/stakeholder-lens', label:'Lenses' },
    { to:'/scenario-playground', label:'Playground' }
  ]
  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
        <div className="h1">QData Learning Suite</div>
        <a className="btn secondary" href="https://github.com/new">Upload to GitHub</a>
      </div>
      <div className="nav" style={{marginBottom:24}}>
        {tabs.map(t => (
          <NavLink key={t.to} to={t.to}
            className={({isActive}) => 'chip' + (isActive ? ' ' : '')}>
            {t.label}
          </NavLink>
        ))}
      </div>
      <Outlet/>
      <div style={{marginTop:32}} className="muted">All examples herein are illustrative and fabricated for training.</div>
    </div>
  )
}
