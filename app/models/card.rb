class Card < ApplicationRecord
    belongs_to :colomn

    validates :title, presence: true
end
