require 'nokogiri'

# GET /posts/1
get '/posts/:id' do
  Post.includes(:author).find_by_id(params[:id]).to_json(include: :author)
end

# GET /posts
get '/posts' do
  Post.includes(:author).where(published: 1).order(created_at: :desc).limit(20).map { |post|
    post.text = Nokogiri::HTML(post.text).text.split(/\s+/, 50)[0...50].join(' ')
    post
  }.to_json(include: :author)
end
