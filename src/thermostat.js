'use strict';

class Thermostat {
  constructor() {
    this.MINIMUM_TEMPERATURE = 10;
    this.temperature = 20;
    this.powerSavingMode = true
  }

  getCurrentTemperature() {
    return this.temperature;
  }

  up() {
    this.temperature += 1;
  }

  down() {
    if (this.isMinimumTemperature()) {
      return;
    }
    this.temperature -= 1;
  }

  isMinimumTemperature() {
    return this.temperature === this.MINIMUM_TEMPERATURE;
  }

  isPowerSavingModeOn() {
    return this.powerSavingMode === true;
  }
};
