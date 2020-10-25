class TodosController < ApplicationController
  def index
    todos = ToDoItem.where(user_id: params[:token]).order('created_at DESC')
    render json:{
      todos: todos
    } 
  end

  def create
    todo = ToDoItem.new(title: params[:title], user_id: params[:token])
    if todo.save
      render json:{
        todo: todo
      }
    else
      render json:{
        message: todo.errors.messages
      }
    end
  end

  def completed
    ToDoItem.find(params[:id]).update(completed: true)
    render json:{
      message: 'Marked complete.'
    }
  end

  def destroy
    ToDoItem.find(params[:id]).destroy
    render json:{
      message: 'Deleted successfully.'
    }
  end
end
