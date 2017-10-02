require 'sinatra'
require "active_record"

Dir[File.dirname(__FILE__) + '/models/*.rb'].each {|f| require f}
Dir[File.dirname(__FILE__) + '/controllers/*.rb'].each {|f| require f}

ActiveRecord::Base.establish_connection(
  YAML::load(File.open('config/database.yml'))[settings.environment.to_s])

set :public_folder, 'static'

get '/' do
  send_file 'static/app/index.html'
end
