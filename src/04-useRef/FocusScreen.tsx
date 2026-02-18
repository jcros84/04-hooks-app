import { useRef } from "react"


export const FocusScreen = () => {

    //este Hook lo declaramos de tipo InputHtml
    const inputRef = useRef<HTMLInputElement>(null);

    //Esta funcion pone el foco en el elemento input referenciado 
    const handleClick = () => {
        console.log(inputRef.current?.value);
        inputRef.current?.select();
    }

    return (
        //Creamos un titulo con un boton, al pulsar el boton hacemos que el Focus vuelva al input
        //pero para evitar que serenderize todo el componente utilizamos el useRef
        //referenciamos el input al hook y al hacer click en el boton se ejecuta el handle
        <div className="bg-dashboard flex flex-col gap-4">
            <h1 className="text-2xl font-thin text-white" >Focus Screen</h1>
            <input
                ref={inputRef}
                type="text"
                className="bg-white text-black px-4 py-2 rounded-md"
                autoFocus>
            </input>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={handleClick}>
                Set Focus
            </button>

        </div>
    )
}


