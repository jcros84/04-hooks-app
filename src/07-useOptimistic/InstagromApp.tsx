import { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";

interface Comment {
  id: number;
  text: string;
  optimistic?: boolean;
}

let lastId = 2;
export const InstagromApp = () => {
  //UseTransition lo usamos para controlar cuando se pinta el comentario y habilitamos el boton con isPending cuando termina
  const [isPending, startTransition] = useTransition();

  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: "¡Gran foto!" },
    { id: 2, text: "Me encanta 🧡" },
  ]);

  //usamos el hook optimistic para controlar la renderización del comentario de forma optimista y sea visible instantanemente.
  //este hook recibe el state actual comments y una funcion-action a ejecutar
  const [optimisticsComments, addCurrentComment] = useOptimistic(
    comments,
    (currentComments, newCommentText: string) => {
      lastId++;
      return [
        ...currentComments,
        {
          id: lastId,
          text: newCommentText + lastId,
          optimistic: true,
        },
      ];
    },
  );

  const handleAddComment = async (formData: FormData) => {
    //Vamos a capturar el mensaje escrito y lo vamos a añadir al array de comentarios
    //simularemos una latencia para que el mensaje aparezca enseguida y obtener la confirmacion despues de un tiempo
    //simulando la llamada al backend y el tiempo que tarde en devolver el ok, pero el usuario ya verá el pantalla el comentario
    const messageText = formData.get("post-message") as string;
    //aqui llamamos a la accion optimista que añade el mensaje
    addCurrentComment(messageText);
    //console.log("Nuevo comentario");

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      /* setComments((prev) => [
        ...prev,
        {
          id: new Date().getTime(),
          text: messageText,
        },
      ]); */

      //!Simulamos el error y deja los comentarios como estaban anteriormente en lugar de añadir el nuevo
      setComments((prev) => prev);
      //Complemento para que aparezcan mensajes flotantes en pantalla
      toast("Error al insertar el comentario", {
        description: "Intentalo denuevo",
        duration: 10000,
        position: "bottom-right",
        action: {
          label: "Cerrar",
          onClick: () => toast.dismiss(),
        },
      });
    });
  };

  return (
    <div className="bg-slate-700 h-screen flex flex-col items-center justify-center">
      {/* Post de ejemplo */}
      <div className="flex flex-col items-center justify-center bg-gray-300 rounded-t-3xl p-4 w-[500px]">
        <img
          src="https://images.unsplash.com/photo-1656069734444-f705d9febc38?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Instagrom"
          className="object-cover rounded-xl mb-4"
        />
        <p className="text-black font-bold mb-4">
          Mira que interesante esta funcionalidad de la API de React.
        </p>
      </div>

      {/* Comentarios */}
      <ul className="flex flex-col items-start justify-center bg-gray-300 w-[500px] p-4">
        {optimisticsComments.map((comment) => (
          <li key={comment.id} className="flex items-center gap-2 mb-2">
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white text-center">A</span>
            </div>
            <p className="text-black">{comment.text}</p>
            {comment.optimistic && (
              <span className="text-gray-500 text-sm">enviando... </span>
            )}
          </li>
        ))}
      </ul>

      {/* Formulario de comentarios */}
      <form
        action={handleAddComment}
        className="flex flex-col items-center justify-center bg-gray-300 w-[500px] rounded-b-3xl p-4"
      >
        <input
          type="text"
          name="post-message"
          placeholder="Escribe un comentario"
          required
          className="w-full p-2 rounded-md mb-2 text-black bg-white"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
