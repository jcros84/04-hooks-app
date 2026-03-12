import { useCounter } from "@/hooks/useCounter";
import { useMemo } from "react";
//Funcion para simular una carga de trabjo en la creación del componente
const heavyFuncion = (iteraciones: number) => {
  console.time("Registo_Llamada");
  for (let index = 0; index < iteraciones; index++) {
    console.log("Vamos iterando......");
  }
  console.timeEnd("Registo_Llamada");
  return `${iteraciones} itereaciones realizadas`;
};

export const MemoCounter = () => {
  const { counter, increment } = useCounter(12500);
  const { counter: counter2, increment: increment2 } = useCounter(15);

  //aqui obligamos a llamar a la funcion
  //Usamos el useMemo para memorizar el valor que se devuelve. se envia un funcion callback que ejecuta la otra funcion e indicamos la dependencia
  //Si no usaramos el Memo de esta función cuando se renderiza cualquier componenete lanzaria esta funcion pesada, en futuras versiones de react esto estará solucionado
  const valueHeavy = useMemo(() => heavyFuncion(counter), [counter]);
  //const valueHeavy = heavyFuncion(counter);
  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Memo - Counter {valueHeavy}</h1>
      <hr />
      <h4>Counter: {counter}</h4>
      <h4>Counter2: {counter2}</h4>
      <button
        className="bg-blue-400 rounded-md px-4 py-2 text-white cursor-help"
        onClick={increment}
      >
        +1
      </button>

      <button
        className="bg-blue-400 rounded-md px-4 py-2 text-white cursor-help"
        onClick={increment2}
      >
        +1 - DOS
      </button>
    </div>
  );
};
