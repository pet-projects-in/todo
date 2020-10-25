import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function Todo({ todo, handleRemove, completed }) {
  return (
    <div className="todo">
      <div className={todo.completed ? 'completed' : '' + 'todo-item'}>{todo.title}</div>
      <div className="actionButton">
        <span className="complete" title="Mark as complete" onClick={() => completed(todo.id)}>Complete</span>
        <span className="completeMobile" title="Mark as complete" onClick={() => completed(todo.id)}>&#10004;</span>
        <span className="deleteBtn" title="Delete this task" onClick={() => handleRemove(todo.id)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
      </div>
    </div>
  )
}
