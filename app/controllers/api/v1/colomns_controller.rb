class Api::V1::ColomnsController < ActionController::API
    def index
      colomns = Colomn.where(board_id: params[:board_id]).sort_by { |colomn| colomn.position }
      render json: colomns
    end
  
    def create
        colomn = Colomn.create(colomn_params)
        if colomn.save
          render json: colomn
        else
          render json: colomn.errors
        end
    end
    
    def show
      colomn = Colomn.find_by(position: colomn_params[:position], board_id: colomn_params[:board_id])
      render json: colomn
    end

    def destroy
      colomn = Colomn.find(params[:id])
      colomns = Colomn.where(board_id: colomn.board_id)
      colomns.each do |colomnToChangePosition|
        if (colomnToChangePosition.position > colomn.position)
          colomnToChangePosition.update!(position: colomnToChangePosition.position - 1)
        end
      end
      colomn.destroy
    end
  
    def update
      colomn = Colomn.find(colomn_params[:id])
      colomn.update!(colomn_params)
    end
  
    private
  
    def colomn_params
      params.require(:colomn).permit(:id, :title, :position, :board_id)
    end
end