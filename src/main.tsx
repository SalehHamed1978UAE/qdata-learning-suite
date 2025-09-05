
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import MarketExplorer from './pages/MarketExplorer'
import TwoSpeed from './pages/TwoSpeed'
import MECE from './pages/MECE'
import Journey from './pages/Journey'
import Stakeholder from './pages/Stakeholder'
import Playground from './pages/Playground'

const router = createBrowserRouter([
  { path: '/', element: <App/>,
    children: [
      { index: true, element: <MarketExplorer/> },
      { path: 'market-explorer', element: <MarketExplorer/> },
      { path: 'two-speed', element: <TwoSpeed/> },
      { path: 'mece-sandbox', element: <MECE/> },
      { path: 'journey-map', element: <Journey/> },
      { path: 'stakeholder-lens', element: <Stakeholder/> },
      { path: 'scenario-playground', element: <Playground/> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
