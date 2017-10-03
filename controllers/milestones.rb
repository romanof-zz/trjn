# GET /milestones/1
get '/milestones/:id' do
  Milestone.find_by_id(params[:id]).to_json
end

# GET /milestones?journey_id=1
get '/milestones' do
  Milestone.where(journey_id: params[:journey_id]).map { |m|
    loc = m.location.split(",")
      {
        type: 'Feature',
        properties: {
          id: m.id,
          name: m.name,
          duration: m.duration,
          position: m.position
        },
        geometry: {
          type: 'Point',
          coordinates: [loc[1].to_f, loc[0].to_f]
        }
      }
  }.to_json
end
