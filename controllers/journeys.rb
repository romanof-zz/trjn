# GET /journey/1
get '/journey/:id/:format?', provides: ['html', 'json'] do
  @model = Journey.find_by_id(params[:id])

  case params[:format]
  when 'html'
    haml :journey, locals: {journey: @model}
  else
    @model.to_json
  end
end
