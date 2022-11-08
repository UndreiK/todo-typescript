import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import { BsCircle, BsCheckCircle, BsXCircle } from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid'

export interface ITask {
  id: string;
  task: string;
  complete: boolean;
}


const App: React.FC = () => {

  const [todos, setTodos] = useState<ITask[]>(
      JSON.parse(localStorage.getItem('todo-list') || '') || []
  )

  const [filtered, setFiltered] = useState(todos)


  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    setFiltered(todos)
  }, [todos])

  const addTask = (data: string) => {
    if (data) {
      const newTask = {
        id: uuidv4(),
        task: data,
        complete: false,
      }
      setTodos((todos) => [...todos, newTask])
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(
        todos.map((todo: ITask) => {
          if (todo.id !== id) return todo
          return { ...todo, complete: !todo.complete }
        })
    )
  }

  const deleteTask = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearCompletedTask = () => {
    setTodos(todos.filter((todo) => !todo.complete))
  }

  const todoFilter = (completedTodos: string) => {
    if (completedTodos === 'all') return setFiltered(todos)
    if (completedTodos === 'active') {
      const newTodo = [...todos].filter((item) => !item.complete)
      setFiltered(newTodo)
    }
    if (completedTodos === 'complete') {
      const newTodo = [...todos].filter((item) => item.complete)
      setFiltered(newTodo)
    }
  }

  return (
      <>
        <div className="flex justify-start items-center bg-gray-100 min-h-screen text-gray-700 text-xl flex-col">
          <h1 className=" text-9xl font-thin mt-52 text-gray-400 tracking-widest">
            todos
          </h1>
          <div className=" bg-white min-w-[600px] shadow-md p-1 relative before:absolute before:left-[2%] before:top-full before:h-2 before:w-[96%] before:shadow-md">
            <Form addTask={addTask} />
            {filtered.map((todo) => (
                <div
                    className={
                        (todo.complete
                            ? 'line-through text-gray-400'
                            : 'no-underline') +
                        ' flex justify-center items-center h-12 border-b [&_.invisible]:hover:visible'
                    }
                    onClick={() => toggleTodo(todo.id)}
                    key={todo.id}
                >
                  {todo.complete ? (
                      <BsCheckCircle className=" text-3xl text-gray-400 mr-1 cursor-pointer" />
                  ) : (
                      <BsCircle className=" text-3xl text-gray-700 mr-1 cursor-pointer" />
                  )}

                  <div className=" w-full">{todo.task}</div>
                  <BsXCircle
                      className=" text-3xl text-rose-400 mr-1 cursor-pointer invisible"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteTask(todo.id)
                      }}
                  />
                </div>
            ))}

            <div className="flex justify-between items-center h-12">
              <p className=" p-2">
                {todos.filter((t) => !t.complete).length} items left
              </p>
              <div>
                <button
                    className=" p-2 hover:text-gray-400 focus-within:text-rose-400"
                    onClick={() => todoFilter('all')}
                >
                  all
                </button>
                <button
                    className=" p-2 hover:text-gray-400 focus-within:text-rose-400"
                    onClick={() => todoFilter('active')}
                >
                  active
                </button>
                <button
                    className=" p-2 hover:text-gray-400 focus-within:text-rose-400"
                    onClick={() => todoFilter('complete')}
                >
                  completed
                </button>
              </div>
              <button
                  className=" p-2 hover:text-gray-400"
                  onClick={clearCompletedTask}
              >
                clear completed
              </button>
            </div>
          </div>
        </div>
      </>
  )
}

export default App


