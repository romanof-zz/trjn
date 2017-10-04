# GET /transits?journey_id=1
get '/transits' do
  Transit.where(journey_id: params[:journey_id]).to_json
end
