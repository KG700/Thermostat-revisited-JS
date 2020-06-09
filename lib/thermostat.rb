class Thermostat
  attr_reader :temperature, :power_saving_mode

  def initialize
    @temperature = 20
    @power_saving_mode = true
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

end
