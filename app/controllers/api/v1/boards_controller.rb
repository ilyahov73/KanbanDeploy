class Api::V1::BoardsController < ActionController::API
   
    def create
      link = (0...8).map { (65 + rand(26)).chr + "#{rand(0..10)}" }.join
      board = Board.create!(link: link)
      render json: board
    end

    def show
      board = Board.find_by(link: board_params[:link])
      render json: board
    end
    
    private
    def board_params
      params.permit(:title, :link, :id)
    end
end
  