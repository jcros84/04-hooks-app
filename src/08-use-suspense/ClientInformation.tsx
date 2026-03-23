import { use, useEffect, type Usable } from "react";
import { type user } from "./api/get-user-action";

//sacamos fuera del componenete la llmaada par aevitar bucle infinito
//para poder mandar parametros usamos el Usable de react

interface Props {
  getUser: Usable<user>;
}
// const userPromise = getUserAction(36);

export const ClientInformation = ({ getUser }: Props) => {
  //el use de react gestiona el async y await
  //   const user = use(userPromise);
  const user = use(getUser);
  //Esto es la forma inicial-lo haremos con Suspense y use de API - use
  //   useEffect(() => {
  //     getUserAction(id).then(console.log);
  //   }, [id]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h2 className="text-4xl font-thin text-white">
        {user.name} - #{user.id}
      </h2>

      <p className="text-white text-2xl">{user.location}</p>
      <p className="text-white text-2xl">{user.role}</p>
    </div>
  );
};
