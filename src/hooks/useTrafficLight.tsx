import { useEffect, useState } from "react";

//Queremos simular un semaforo y según pulsemos el boton cambie el estado de light

//definimos la clase para cada valor
const colors = {
  red: " bg-red-500 animate-pulse",
  yellow: " bg-yellow-500 animate-pulse",
  green: " bg-green-500 animate-pulse",
};
// creamos un tipo de dato
type TrafficLightColor = "red" | "yellow" | "green";

export const useTrafficLight = () => {

  const [light, setLight] = useState<TrafficLightColor>("red");
  //creamos un useState para una cuenta atrás
  const [countDown, setCountDown] = useState(5);

  //Dentro del effect ejecutamos un setInterval cada Segundo restando 1 cada vez que se ejecuta, la ejecución depende del countDown como Dep
  //useEffect para cuenta atras
  useEffect(() => {
    //console.log({ countDown });
    if (countDown === 0) return;
    const intervalId = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1500);
    //esto se utiliza para evitar bucles infinitos, ya que la modificacion del countDown crea otro efect y es exponencial
    return () => {
      //console.log('Cleanup effect')
      clearInterval(intervalId);
    };
  }, [countDown]);

  useEffect(() => {
    if (countDown > 0) return;

    setCountDown(5);

    if (light === "red") {
      setLight("green");
      return;
    }

    if (light === "yellow") {
      setLight("red");
      return;
    }

    if (light === "green") {
      setLight("yellow");
      return;
    }
  }, [countDown, light]);


  return {
    //Values
    countDown,
    light,
    colors,
    //Calculated
    percentage: (countDown / 5) * 100,
    redLight: light === 'red' ? colors[light] : 'bg-gray-500',
    yellowLight: light === 'yellow' ? colors[light] : 'bg-gray-500',
    greenLight: light === 'green' ? colors[light] : 'bg-gray-500',
    //Actions/Methods

  }
}