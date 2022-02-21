class Colomn < ApplicationRecord
    belongs_to :board
    has_many :cards, :dependent => :destroy

    validates :title, presence: true
    validates :position, presence: true
end
