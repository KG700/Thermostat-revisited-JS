require "sinatra/base"
require 'json'
require_relative './lib/thermostat'

class ThermostatApp < Sinatra::Base

  run! if app_file == $0
end
