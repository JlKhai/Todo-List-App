import { useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodoQuery,
} from '../api/apiSlice'
import { Loader } from '@mantine/core'
import { AiFillDelete } from 'react-icons/ai'
import Contactme from '../../components/Contactme'
const TodoList = () => {
  const [list, setList] = useState('')

  const { data: todos, isLoading } = useGetTodoQuery()
  // console.log(todo)
  const [addTodo] = useAddTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  //show loading icon while loading
  if (isLoading) {
    return (
      <Loader
        className="mx-auto items-center h-screen"
        color="violet"
        size="lg"
        variant="dots"
      />
    )
  }

  const listSubmitHandler = (e) => {
    e.preventDefault()
    console.log(list)
    const newList = {
      userId: 1,
      id: Date.now(),
      title: list,
    }
    addTodo(newList)
    setList('')
  }

  return (
    <>
      <div className=" flex flex-col justify-center items-center  h-screen bg-violet-600">
        <h2 className=" font-bold text-3xl text-white mb-2"> Todo Lists</h2>
        <form
          onSubmit={listSubmitHandler}
          className="w-72 md:w-96 flex justify-center items-center gap-3 border-2 p-2 md:p-4  rounded-lg"
        >
          <input
            value={list}
            onChange={(e) => setList(e.target.value)}
            type="text"
            className=" px-3 md:px-4 py-2 border-2 outline-none rounded-lg bg-gray-300 focus:bg-white transition ease-in duration-200"
            placeholder="Enter new todo "
          />
          <button type="submit">
            <FaUpload className="text-violet-800 hover:scale-95 transition ease-in duration-200 bg-white text-4xl cursor-pointer select-none  border p-1 " />
          </button>
        </form>
        <div className="w-96 px-16 py-2 mt-2">
          {todos?.map((todo) => {
            return (
              <div key={todo.id} className="flex justify-between">
                <div className="flex items-center mb-2 gap-2">
                  <input
                    type="checkbox"
                    id={todo?.id}
                    className="peer cursor-pointer h-4 w-4"
                  />
                  <label
                    className="cursor-pointer text-white text-lg select-none peer-checked:line-through peer-checked:text-gray-400"
                    htmlFor={todo?.id}
                  >
                    {' '}
                    {todo?.title}
                  </label>
                </div>
                <div className="flex gap-2">
                  <AiFillDelete
                    onClick={() => deleteTodo(todo?.id)}
                    className="text-white text-3xl  p-1 border cursor-pointer hover:text-red-500 hover:scale-90 transition ease-in duration-200"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Contactme />
    </>
  )
}

export default TodoList
