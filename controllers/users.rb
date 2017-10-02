# GET /users/1
get '/users/:id' do
  User.find_by_id(params[:id]).to_json
end
