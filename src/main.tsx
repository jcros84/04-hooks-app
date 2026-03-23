import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

//import { HooksApp } from './HooksApp'

import "./index.css";
// import { InstagromApp } from "./07-useOptimistic/InstagromApp";
import { ClientInformation } from "./08-use-suspense/ClientInformation";
import { getUserAction } from "./08-use-suspense/api/get-user-action";
// import { MemoHook } from "./06-memos/MemoHook";
// import { MemoCounter } from "./06-memos/MemoCounter";
// import { TasksApp } from './05-useReducer/TasksApp'
// import { TasksAppReduce } from './05-useReducer/TasksAppReduce'
// import { ScrambleWordsUseState } from './05-useReducer/ScrambleWords'
// import { ScrambleWords } from "./05-useReducer/ScrambleWords";
//import { TrafficLight } from './01-useState/TrafficLight'
// import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect'
// import { TrafficLightWithHook } from './02-useEffect/TrafficLightWithHook'
// import { PokemonPage } from './03-examples/PokemonPage'
// import { FocusScreen } from './04-useRef/FocusScreen'
//import { NavBar } from './navbar'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* usando el suspense de react podemos controlar el render hasta que terminen
    los hijos */}
    <Suspense
      fallback={
        <div className="bg-gray-600 flex flex-col">
          <h1 className="text-white">Cargando la API.......</h1>
        </div>
      }
    >
      <ClientInformation getUser={getUserAction(500)} />
    </Suspense>
    {/* <Toaster /> */}
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <NavBar /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <TasksAppReduce /> */}
    {/* <ScrambleWords /> */}
    {/* <ScrambleWords /> */}
    {/* <MemoHook /> */}
    {/* <MemoCounter /> */}
    {/* <InstagromApp /> */}
  </StrictMode>,
);
