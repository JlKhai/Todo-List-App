import { useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import {
  useDeleteTodoMutation,
  useGetTodoQuery,
  useUpdateTodoMutation,
} from '../api/apiSlice'
import { Checkbox, Loader } from '@mantine/core'
import { AiFillDelete } from 'react-icons/ai'
const TodoList = () => {
  const { data: todo, isLoading } = useGetTodoQuery()
  console.log(todo)
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const [list, setList] = useState('')

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
    updateTodo({
      userId: 1,
      id: Date.now(),
      title: list,
      completed: false,
    })
    todo(updateTodo)
  }

  return (
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
          className="px-3 md:px-4 py-2 border-2 outline-none rounded-lg"
          placeholder="Enter new todo "
        />
        <button type="submit">
          <FaUpload className="text-violet-800 hover:scale-95 bg-white text-4xl cursor-pointer select-none  border p-1 " />
        </button>
      </form>
      <div className="w-96 px-16 py-2">
        {todo?.map((todo) => {
          return (
            <div key={todo.id} className="flex justify-between">
              <div className="flex items-center  gap-2">
                <Checkbox color="green" />

                <p className="text-white mt-1 select-none">{todo?.title}</p>
              </div>
              <div onClick={() => deleteTodo(todo.id)}>
                <AiFillDelete className="text-white text-2xl cursor-pointer hover:text-red-500 hover:scale-90" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TodoList
