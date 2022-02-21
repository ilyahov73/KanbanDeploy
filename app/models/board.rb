class Board < ApplicationRecord
    has_many :colomns

    validates :link, presence: true
end
