import React from "react";

interface Props {
  subTitle: string;
  callMyAPI: () => void;
}
//Para evitar que se recarguen todos los componenete sutilizamos memo para que controle los cambios
//Si no cambia nada al usar el memo React controla que el valor del componente no cambia y no lo renderiza evitando renders inecesarios
export const MySubTitle = React.memo(({ subTitle, callMyAPI }: Props) => {
  console.log("My Sub re-render");
  return (
    <>
      <h6 className="text-sm font-semibold uppercase tracking-widest text-blue-600/80 mb-2">
        {subTitle}
      </h6>
      <button
        className="bg-indigo-500 px-2 py-1 rounded-md cursor-pointer"
        onClick={callMyAPI}
      >
        Llamar a función
      </button>
    </>
  );
});
