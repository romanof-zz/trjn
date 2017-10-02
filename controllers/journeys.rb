# GET /journey/1/json
get '/journeys/:id' do
  Journey.find_by_id(params[:id]).to_json
end

# GET /journeys
get '/journeys' do
  Journey.all.map { |j|
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
