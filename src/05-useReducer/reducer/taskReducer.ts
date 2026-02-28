import * as z from "zod";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
//Cramos un interface con todas las tareas de tipo Todo
interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}
//Definimos las acciones que controla el reduce
//se declara el parámetro que se recibe para cada caso conocido como payload
export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "TOGGLE_TODO"; payload: number };

//Definimos el Schema del objeto TODO en ZOD para su validaccion

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

//Definimos el Schema del objeto TaskState en ZOD para su validaccion

const TaskStateSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

//Aqui lo que vamos hacer es comprobar si existe inormación en el localStorage y devolverla
export const getInitialTaskState = (): TaskState => {
  const localStorageTask = localStorage.getItem("task-state");
  if (!localStorageTask) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }
  //Validar el localStorage mediante ZOD
  const result = TaskStateSchema.safeParse(JSON.parse(localStorageTask));
  //Si hay errores, mostramos el log y devolvemos el objeto inicializado para todo siga funcionando
  if (result.error) {
    console.log(result.error);
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }

  return result.data;
};

//Creamos un reducer que siempre debe devolver un estado NUEVO
//y una acción a ejecutar
export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  //Normalmente aparece un switch para determinar cada acción
  //y tenemos que devolver un nuevo estado en cada caso
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      //Hay que devolver un nuevo estado, no podemos añadir un elemento. hay que crear un nuevo objeto
      //para que react lo detecte.
      //La lista de TASK(state) se hace el spread y despues se recorren todos
      //añadiendo el nuevo al final. esto crea en memoria un nuevo array por lo que
      //devolvemos un nuevo estado u objeto ene este caso

      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        completed: state.todos.filter((todo) => todo.completed).length,
        pending: state.pending + 1,
      };
    }

    case "TOGGLE_TODO": {
      //Buscamos en el array el todo que coincide y hacemos update contrario en completed
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      //
      return {
        ...state,
        todos: updatedTodos,
        length: state.todos.length,
        completed: state.todos.filter((todo) => todo.completed).length,
        pending: state.todos.filter((todo) => !todo.completed).length,
      };
    }

    case "DELETE_TODO": {
      const updateTodos = state.todos.filter(
        (todo) => todo.id !== action.payload,
      );

      //Devolvemos un NUEVO array filtrando por todos las tareas menos la del id, de esta manera se elimina
      //Al ser un nuevo arreglo cumplimos la condición de nuevo estado
      return {
        ...state,
        todos: updateTodos,
        length: updateTodos.length,
        completed: updateTodos.filter((todo) => todo.completed).length,
        pending: state.todos.filter((todo) => !todo.completed).length,
      };
    }
    default:
      return state;
  }
};
