import { useCallback, useState } from "react";
import { MySubTitle } from "./ui/MySubTitle";
import { MyTitle } from "./ui/MyTitle";

export const MemoHook = () => {
  const [title, setTitle] = useState("Titulo Principal");
  const [subTitle, setSubTitle] = useState("Titulo Secundario");
  //Usamos el useCallback de react para memorizar la funcion y evitar el re-render
  const handelMyAPICall = useCallback(() => {
    console.log("Lllamada API", subTitle);
  }, [subTitle]);
  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">MEMO APP</h1>

      <MyTitle title={title} />

      <MySubTitle subTitle={subTitle} callMyAPI={handelMyAPICall} />

      <button
        onClick={() => {
          setTitle("Título Cambiado, " + new Date().getTime());
        }}
        className="bg-blue-500 text-white rounded-md px-4 py-2 cursor-default"
      >
        Cambiar titulo
      </button>
      <button
        onClick={() => {
          //   setSubTitle("Sub---Título Cambiado, " + new Date().getTime());
          setSubTitle("Sub---Título Cambiado");
        }}
        className="bg-blue-800 text-white rounded-md px-4 py-2 cursor-crosshair"
      >
        Cambiar Subtitulo
      </button>
    </div>
  );
};
