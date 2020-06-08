'use strict';

class Thermostat {
  constructor() {
    this.DEFAULT_TEMPERATURE = 20;
    this.temperature = this.DEFAULT_TEMPERATURE;
    this.powerSavingMode = true
    this.MINIMUM_TEMPERATURE = 10;
    this.MAX_LIMIT_PSM_ON = 25;
    this.MAX_LIMIT_PSM_OFF = 32;
    this.MEDIUM_ENERGY_USAGE_LIMIT = 18;
  }

  getCurrentTemperature(callback) {
    // return this.temperature;
    $.get('/temperature', function(res) {
      var data = JSON.parse(res)
      // console.log("Am updating thermostat with the temperature:")
      // console.log(data)
      callback(data);
    })
  }

  up() {
    if (this.isMaximumTemperature()) {
      return;
    }
    // this.temperature += 1;
    this.updateTemperature(this.temperature += 1);
  }

  down() {
    if (this.isMinimumTemperature()) {
      return;
    }
    this.updateTemperature(this.temperature -= 1);
  }

  isMinimumTemperature() {
    return this.temperature === this.MINIMUM_TEMPERATURE;
  }

  isMaximumTemperature() {
    if (this.isPowerSavingModeOn() === false) {
      return this.temperature === this.MAX_LIMIT_PSM_OFF;
    }
    return this.temperature === this.MAX_LIMIT_PSM_ON;
  }

  isPowerSavingModeOn() {
    return this.powerSavingMode === true;
  }

  switchPowerSavingModeOff() {
    this.powerSavingMode = false;
  }

  switchPowerSavingModeOn() {
    this.powerSavingMode = true;
  }

  resetTemperature() {
    // this.temperature = this.DEFAULT_TEMPERATURE;
    this.updateTemperature(this.DEFAULT_TEMPERATURE);
  }

  energyUsage() {
    if (this.temperature < this.MEDIUM_ENERGY_USAGE_LIMIT) {
      return 'low-usage';
    }
    if (this.temperature >= this.MEDIUM_ENERGY_USAGE_LIMIT && this.temperature <= this.MAX_LIMIT_PSM_ON) {
      return 'medium-usage';
    }
    return 'high-usage';
  }

  updateTemperature(value) {
    // console.log("will update ruby's temperature with:")
    // console.log(value)
    $.post('/temperature', { temperature: value })
  }

};
