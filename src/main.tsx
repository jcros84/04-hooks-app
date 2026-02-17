import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//import { HooksApp } from './HooksApp'

import './index.css'
//import { TrafficLight } from './01-useState/TrafficLight'
// import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect'
// import { TrafficLightWithHook } from './02-useEffect/TrafficLightWithHook'
import { PokemonPage } from './03-examples/PokemonPage'
//import { NavBar } from './navbar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <NavBar /> */}
    <PokemonPage />
  </StrictMode>
)
