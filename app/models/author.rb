# == Schema Information
#
# Table name: authors
#
#  id         :integer          not null, primary key
#  aws_photos :json
#  birth_year :integer
#  death_year :integer
#  fullname   :string           not null
#  reference  :string
#  wiki_url   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Author < ApplicationRecord
  has_many :books, class_name: 'Book', dependent: :restrict_with_error
  has_many :tag_connections, class_name: 'TagConnection', as: :entity, dependent: :destroy
  has_many :tags, through: :tag_connections, class_name: 'Tag'

  mount_base64_uploader :aws_photos, AwsAuthorPhotoUploader

  before_validation :strip_name

  validates :fullname, presence: true, uniqueness: true
  validates :birth_year, numericality: { only_integer: true, allow_nil: true }
  validates :death_year, numericality: { only_integer: true, allow_nil: true }

  def tag_ids
    tag_connections.map(&:tag_id)
  end

  def popularity
    books.sum(:popularity)
  end

  def photo_thumb_url
    aws_photos.url(:thumb)
  end

  def photo_card_url
    aws_photos.url(:card)
  end

  def photo_url
    aws_photos.url
  end

  def photo_url=(value)
    return if value.blank?

    if value =~ /^data:image/
      self.aws_photos = value
    else
      self.remote_aws_photos_url = value
    end
  end

  def books_tags_stats
    books.includes(:tag_connections).references(:tag_connections).group('tag_connections.tag_id').count
  end

  protected

  def strip_name
    return if fullname.blank?

    fullname.strip!
  end
end
