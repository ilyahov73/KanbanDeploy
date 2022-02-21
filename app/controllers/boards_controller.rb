class BoardsController < ApplicationController
    def index 
    end

    def show
      @board = Board.find_by(link: board_params[:link])
      
    end
    
    private
    def board_params
      params.permit(:title, :link, :id)
    end
end