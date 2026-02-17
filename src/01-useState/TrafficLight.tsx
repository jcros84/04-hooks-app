import { useState } from "react";

//Queremos simular un semaforo y según pulsemos el boton cambie el estado de light

//definimos la clase para cada valor
const colors = {
    red: " bg-red-500 animate-pulse",
    yellow: " bg-yellow-500 animate-pulse",
    green: " bg-green-500 animate-pulse",
}
// creamos un tipo de dato
type TrafficLightColor = 'red' | 'yellow' | 'green';

export const TrafficLight = () => {
    const [light, setLight] = useState<TrafficLightColor>('red');
    // prev es un valor que usa react por defecto con el valor previo antes del set
    // realmente no hace falta pero está para ver su funcionamiento haría falta en un contador por ejemplo setContador(prev + 1)
    const handleColorChange = (color: TrafficLightColor) => {
        console.log({ color });
        setLight((prev) => {
            console.log({ prev });
            return color;
        });
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
            <div className="flex flex-col items-center space-y-8">
                {/* Aquí condicionamos el color del círculo al valor de light, así al cambiar el estado todo se renderiza */}
                <div className={`w-32 h-32 ${light === 'red' ? colors[light] : 'bg-gray-500'} rounded-full`}></div>
                <div className={`w-32 h-32 ${light === 'yellow' ? colors[light] : 'bg-gray-500'} rounded-full`}></div>
                <div className={`w-32 h-32 ${light === 'green' ? colors[light] : 'bg-gray-500'} rounded-full`}></div>

                {/* Botón para cambiar el estado de la luz */}
                <div className="flex gap-2">
                    <button onClick={() => handleColorChange('red')}
                        className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer">
                        Rojo
                    </button>
                    <button onClick={() => handleColorChange('yellow')}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer">
                        Amarillo
                    </button>
                    <button onClick={() => handleColorChange('green')}
                        className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer">
                        Verde
                    </button>
                </div>
            </div>
        </div>
    );
};