# GET /users/1
get '/users/:id' do
  user = User.find_by_id(params[:id])
  {
    id: user.id,
    fullname: user.fullname
  }.to_json
end
