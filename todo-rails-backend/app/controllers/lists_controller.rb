class ListsController < ApplicationController
  def show
    list =  List.find(list_ulr: params[:url])
    todos = ToDoItem.where(user_id: list.title).order('created_at DESC')
    render json:{
      todos: todos
    }
  end

  def create
    list =  List.create(list_ulr: SecureRandom.hex(4), title: params[:id])
    render json:{
      url: list.list_ulr
    }
  end
end
