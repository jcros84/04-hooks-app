import { useTrafficLight } from "../hooks/useTrafficLight";


export const TrafficLightWithHook = () => {
    //creamos un useHook donde tenemos la lógica
    const { countDown, percentage, redLight, yellowLight, greenLight } = useTrafficLight();

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
            <div className="flex flex-col items-center space-y-8">
                <h1 className="text-white text-3xl font-thin">Semáforo con useEffect</h1>
                <h2 className="text-white text-xl">countDown: {countDown}</h2>
                {/* Barra con relleno que varia el tamaño segun countdown */}
                <div className="w-64 bg-amber-50 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${percentage}%` }}></div>
                </div>
                {/* Aquí condicionamos el color del círculo al valor de light, así al cambiar el estado todo se renderiza */}
                <div className={`w-32 h-32 ${redLight} rounded-full`}></div>
                <div className={`w-32 h-32 ${yellowLight} rounded-full`}></div>
                <div className={`w-32 h-32 ${greenLight} rounded-full`}></div>
            </div>
        </div>
    );
};