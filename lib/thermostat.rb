class Thermostat
  attr_reader :temperature

  def initialize
    @temperature = 20
  end

  def self.instance
    @thermostat ||= self.new
  end

  def update(temperature)
    # p "I'm updating the thermostat instance"
    # p temperature
    @temperature = temperature
  end

end
