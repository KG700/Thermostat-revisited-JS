class Thermostat
  attr_reader :temperature, :power_saving_mode, :city

  def initialize
    @temperature = 20
    @power_saving_mode = true
    @city = "london"
  end

  def self.instance
    @thermostat ||= self.new
  end

  def update_temperature(temperature)
    @temperature = temperature
  end

  def update_power_saving_mode(power_saving_mode)
    @power_saving_mode = power_saving_mode
  end

  def update_city(city)
    @city = city
  end

end
