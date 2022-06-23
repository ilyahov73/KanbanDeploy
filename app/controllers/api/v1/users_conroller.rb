class Api::V1::UsersController < ActionController::API
    def index
      users = User.all
      render json: users
    end
  
    def create
        user = User.create(user_params)
        if user.save
          render json: user
        else
          render json: user.errors
        end
    end
    
    def show
      user = User.find(id)
      render json: user
    end

    def destroy
      user = User.find(params[:id])
      user.destroy
    end
  
    def update
      user = User.find(user_params[:id])
      user.update!(user_params)
    end
  
    private
  
    def user_params
      params.require(:user).permit(:email, :name, :surname, :credit_card_num, :role)
    end
end