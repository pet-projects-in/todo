class UsersController < ApplicationController
  def create
    user = User.create(name: params[:name], uuid: SecureRandom.hex, password: params[:password], email: params[:email])
    render json:{
      user: user.attributes.except("password_digest"),
      code: 200
    }
  end

  def login
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      render json:{
        user: user.attributes.except("password_digest"),
        code: 200
      }
    else
      render json:{
        message: "Invalid email or password",
        code: 404
      }
    end
  end
end
