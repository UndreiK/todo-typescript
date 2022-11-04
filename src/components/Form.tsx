import React, { useState } from 'react'
import { BsArrowDownCircle } from 'react-icons/bs'
import { TaskProps } from "../App";

const Form: React.FC<TaskProps> = ({ addTask }) => {
    const [value, setValue] = useState('')

    const handleAddTask: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        addTask(value)
        setValue('')
    }

    const handleClickTask: React.MouseEventHandler<SVGElement> = (e) => {
        e.preventDefault()
        addTask(value)
        setValue('')
    }

    return (
        <form
            onSubmit={(e) => {
                handleAddTask(e)
            }}
        >
            <div className=" flex justify-start items-center h-12">
                <BsArrowDownCircle
                    className=" text-3xl text-gray-700 mr-1 cursor-pointer"
                    onClick={(e) => handleClickTask(e)}
                />
                <input
                    className=" border w-full h-full"
                    type="text"
                    placeholder="enter task..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </form>
    )
}

export default Form
