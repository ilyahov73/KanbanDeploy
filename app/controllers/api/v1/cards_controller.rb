class Api::V1::CardsController < ActionController::API
    def index
      cards = Card.where(colomn_id: params[:colomn_id]).sort_by { |card| card.created_at }
      render json: cards
    end
  
    def create
      card = Card.create(card_params)
      if card.save
        render json: card
      else
        render json: card.errors
      end
    end
  
    def destroy
      card = Card.find(params[:id])
      card.destroy
    end
  
    def update
      card = Card.find(params[:id])
      card.update!(card_params)
    end
    
    def card_move_left
      card = Card.find(params[:id])
      oldColomn = Colomn.find(card.colomn_id)
      newColomn = Colomn.find_by(position: oldColomn.position - 1, board_id: oldColomn.board_id)
      card.update!(colomn_id: newColomn.id) if newColomn.present?
    end

    def card_move_right
      card = Card.find(params[:id])
      oldColomn = Colomn.find(card.colomn_id)
      newColomn = Colomn.find_by(position: oldColomn.position + 1, board_id: oldColomn.board_id)
      card.update!(colomn_id: newColomn.id) if newColomn.present?
    end
    # def edit
    #   card = Card.find(params[:id])
    #   cardColomn = Colomn.find(card.colomn_id)
    #   cardNewColomn = Colomn.find_by(position: cardColomn.position + 1, board_id: colomn_params[:board_id])
    # end
    private
  
    def card_params
      params.require(:card).permit(:id, :title, :colomn_id)
    end
end