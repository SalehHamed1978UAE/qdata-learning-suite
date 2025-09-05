
import { Outlet, NavLink } from 'react-router-dom'

export default function App(){
  const tabs = [
    { to:'/onboarding', label:'Onboarding' },
    { to:'/market-explorer', label:'Module 1' }
  ]
  return (
    <div className="container">
      <div className="h1">QData Learning Suite</div>
      <div className="nav">
        {tabs.map(t => (
          <NavLink key={t.to} to={t.to} className={({isActive})=>'chip'}>
            {t.label}
          </NavLink>
        ))}
      </div>
      <Outlet/>
    </div>
  )
}
