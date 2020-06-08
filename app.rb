require 'sinatra/base'
require 'json'
require_relative './lib/thermostat'

class ThermostatApp < Sinatra::Base

  get "/" do
    File.read('public/index.html')
  end

  get "/temperature" do
    p "I'm sending something"
    thermostat = Thermostat.instance
    p thermostat.temperature
    { temperature: thermostat.temperature }.to_json
  end

  post "/temperature" do
    p "I received something"
    p params[:temperature]
    thermostat = Thermostat.instance
    thermostat.update(params[:temperature])
    { status: 200 }.to_json
  end

  run! if app_file == $0
end
