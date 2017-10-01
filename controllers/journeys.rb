# GET /journey/1/json
get '/journey/:id/:format?', provides: ['html', 'json'] do
  @model = Journey.find_by_id(params[:id])

  case params[:format]
  when 'html'
    haml :journey, locals: {journey: @model}
  else
    @model.to_json
  end
end

# GET /journeys/geojson
get '/journeys/:format', provides: ['json', 'geojson'] do
  @journeys = Journey.all

  case params[:format]
  when 'json'
    @journeys.to_json
  when 'geojson'
    @journeys.map { |j|
      loc = j.location.split(",")
      {
        type: 'Feature',
        properties: {
          title: j.title,
          budget: j.budget,
          duration: j.duration,
        },
        geometry: {
          type: 'Point',
          coordinates: [loc[1].to_f, loc[0].to_f]
        }
      }
    }.to_json
  end
end
