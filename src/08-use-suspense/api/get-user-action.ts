export interface user {
  id: number;
  name: string;
  location: string;
  role: string;
}

export const getUserAction = async (id: number) => {
  //hacemos una espera de 2 milisegundos para simular latencia
  await new Promise((res) => setTimeout(res, 2000));
  console.log("resuelta");
  return {
    id: id,
    name: "Juan Carlos Ros",
    location: "Elche Spain 03204",
    role: "RPA - ADM",
  };
};
