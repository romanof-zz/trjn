require 'sinatra'
require 'rack'
require 'rack/contrib'
require "active_record"

Dir[File.dirname(__FILE__) + '/models/*.rb'].each {|f| require f}
Dir[File.dirname(__FILE__) + '/controllers/*.rb'].each {|f| require f}


configure do
  use Rack::PostBodyContentTypeParser
  set :config, YAML::load(File.open("config.#{settings.environment}.yml")).deep_symbolize_keys
end

ActiveRecord::Base.establish_connection(settings.config[:database])

set :public_folder, 'static'

get '/' do
  send_file 'static/app/index.html'
end
