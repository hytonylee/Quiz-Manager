class V1::UsersController < ApplicationController

  before_action :authenticate_user!, except: [:create]
  before_action :authorize_user!, except: [:create]

  def new
    user = User.new user_params
  end

  def create
   user = User.new user_params
   if user.save
     render json: {
       jwt: encode_token({
           id: user.id,
           first_name: user.first_name,
           last_name: user.last_name,
           full_name: user.full_name
       })
     }
   else
      errors = error.record.errors.map do |field, message|
        {
          type: error.class.to_s,
          record_type: error.record.class.to_s,
          field: field,
          message: message
        }
      end
      render(
        json: { errors: errors }, status: :unprocessable_entity
      )
   end
  end

  # def show
  #   user = User.find params[:id]
  # end

  private
  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation
    )
  end

  def authorize_user!
    unless can?(:crud, @question)
      flash[:alert] = 'Access Denied!'
      render(
        json: { errors: [{type: "Unauthorized"}] }, status: :unauthorized
      )
    end
  end
end
