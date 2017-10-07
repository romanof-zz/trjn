require 'net/http'
require 'securerandom'

get '/sessions/:id' do
  session = Session.includes(:user).find_by_session_id(params[:id])
  {
    id: session.user.id,
    username: session.user.username,
    fullname: session.user.fullname,
    access_token: session.access_token,
    email: session.user.email,
    picture: session.user.picture
  }.to_json
end

delete '/sessions/:id' do
  Session.where(session_id: params[:id]).delete_all
end

# it's meant to create session and everything needed for it,
# but called /auth since it's required by satellizer naming convention.
# POST /auth/google {code: code}
post '/auth/:provider' do
  @provider = settings.config[:openid][params[:provider].to_sym]

  response = Net::HTTP.post_form(
    URI.parse(@provider[:url]),
    @provider[:params].merge!({code: params[:code]})
  )

  if response.kind_of? Net::HTTPSuccess
    data = prep_data params[:provider], JSON.parse(response.body)

    user = User.find_by_email(data[:user][:email])
    user = User.create(data[:user]) if user.nil?

    Identity.where({
      external_id: data[:external_id],
      user_id: user.id,
      provider: params[:provider]
    }).first_or_create

    Session.where(user_id: user.id).destroy_all
    session = Session.create({
      session_id: SecureRandom.uuid,
      user_id: user.id,
      access_token: data[:access_token]
    })

    return { token: session.session_id }.to_json
  end
end

def prep_data provider, response
  case provider
  when 'instagram'
    {
      access_token: response['access_token'],
      external_id: response['user']['id'],
      user: {
        username: response['user']['username'],
        fullname: response['user']['full_name'],
        # that's why we disable instagram: no email address.
        # email: response['user']['email'],
        picture: response['user']['profile_picture']
      }
    }
  when 'google'
    uri = URI.parse(settings.config[:openid][params[:provider].to_sym][:profile_url])
    uri.query = "access_token=#{response['access_token']}"
    user_info_response = Net::HTTP.get_response(uri)
    if user_info_response.kind_of? Net::HTTPSuccess
      user_info = JSON.parse(user_info_response.body)
      {
        access_token: response['access_token'],
        external_id: user_info['id'],
        user: {
          username: user_info['displayName'],
          fullname: user_info['displayName'],
          email: user_info['emails'][0]['value'],
          picture: user_info['image']['url']
        }
      }
    end
  end
end
