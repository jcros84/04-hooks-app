import { useEffect, useState } from "react";

//Queremos simular un semaforo y según pulsemos el boton cambie el estado de light

//definimos la clase para cada valor
const colors = {
    red: " bg-red-500 animate-pulse",
    yellow: " bg-yellow-500 animate-pulse",
    green: " bg-green-500 animate-pulse",
}
// creamos un tipo de dato
type TrafficLightColor = 'red' | 'yellow' | 'green';

export const TrafficLightWithEffect = () => {
    const [light, setLight] = useState<TrafficLightColor>('red');
    //creamos un useState para una cuenta atrás
    const [countDown, setCountDown] = useState(5);

    //Dentro del effect ejecutamos un setInterval cada Segundo restando 1 cada vez que se ejecuta, la ejecución depende del countDown como Dep
    //useEffect para cuenta atras
    useEffect(() => {
        //console.log({ countDown });
        if (countDown === 0) return;
        const intervalId = setInterval(() => {
            setCountDown((prev) => prev - 1);
        }, 1500)
        //esto se utiliza para evitar bucles infinitos, ya que la modificacion del countDown crea otro efect y es exponencial
        return () => {
            //console.log('Cleanup effect')
            clearInterval(intervalId)
        }

    }, [countDown]);

    useEffect(() => {
        if (countDown > 0) return;

        setCountDown(5);

        if (light === 'red') {
            setLight('green')
            return;
        }

        if (light === 'yellow') {
            setLight('red')
            return;
        }

        if (light === 'green') {
            setLight("yellow")
            return;
        }

    }, [countDown, light])


    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
            <div className="flex flex-col items-center space-y-8">
                <h1 className="text-white text-3xl font-thin">Semáforo con useEffect</h1>
                <h2 className="text-white text-xl">countDown: {countDown}</h2>
                {/* Barra con relleno que varia el tamaño segun countdown */}
                <div className="w-64 bg-amber-50 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${(countDown / 5) * 100}%` }}></div>
                </div>
                {/* Aquí condicionamos el color del círculo al valor de light, así al cambiar el estado todo se renderiza */}
                <div className={`w-32 h-32 ${light === 'red' ? colors[light] : 'bg-gray-500'} rounded-full`}></div>
                <div className={`w-32 h-32 ${light === 'yellow' ? colors[light] : 'bg-gray-500'} rounded-full`}></div>
                <div className={`w-32 h-32 ${light === 'green' ? colors[light] : 'bg-gray-500'} rounded-full`}></div>
            </div>
        </div>
    );
};