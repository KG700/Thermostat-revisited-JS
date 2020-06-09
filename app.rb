require 'sinatra/base'
require 'json'
require_relative './lib/thermostat'

class ThermostatApp < Sinatra::Base

  get "/" do
    File.read('public/index.html')
  end

  get "/temperature" do
    thermostat = Thermostat.instance
    { temperature: thermostat.temperature }.to_json
  end

  post "/temperature" do
    thermostat = Thermostat.instance
    thermostat.update_temperature(params[:temperature])
    { status: 200 }.to_json
  end

  get "/powersavingmode" do
    thermostat = Thermostat.instance
    { power_saving_mode: thermostat.power_saving_mode }.to_json
  end

  post "/powersavingmode" do
    thermostat = Thermostat.instance
    thermostat.update_power_saving_mode(params[:power_saving_mode] == 'true')
    { status: 200 }.to_json
  end

  get "/city" do
    thermostat = Thermostat.instance
    { city: thermostat.city }.to_json
  end

  post "/city" do
    thermostat = Thermostat.instance
    thermostat.update_city(params[:city])
    { status: 200 }.to_json
  end

  run! if app_file == $0
end
