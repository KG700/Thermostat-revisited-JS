'use strict';

class Thermostat {
  constructor() {
    // this.powerSavingMode = true
    this.MINIMUM_TEMPERATURE = 10;
    this.DEFAULT_TEMPERATURE = 20;
    this.MAX_LIMIT_PSM_ON = 25;
    this.MAX_LIMIT_PSM_OFF = 32;
    this.MEDIUM_ENERGY_USAGE_LIMIT = 18;
  }

  getCurrentTemperature(callback) {
    $.get('/temperature', function(res) {
      var data = JSON.parse(res)
      callback(data);
    })
  }

  up(currentTemperature, powerSavingMode, callback) {
    if (this.isMaximumTemperature(currentTemperature, powerSavingMode)) {
      return;
    }
    this.updateTemperature(currentTemperature += 1, callback);
  }

  down(currentTemperature, callback) {
    if (this.isMinimumTemperature(currentTemperature)) {
      return;
    }
    this.updateTemperature(currentTemperature -= 1, callback);
  }

  isMinimumTemperature(temperature) {
    return temperature === this.MINIMUM_TEMPERATURE;
  }

  // --------

  isMaximumTemperature(temperature, powerSavingMode) {
    if (powerSavingMode === false) {
      return temperature === this.MAX_LIMIT_PSM_OFF;
    }
    return temperature === this.MAX_LIMIT_PSM_ON;
  };

  getPowerSavingMode(callback) {
    $.get('/powersavingmode', function(res) {
      var data = JSON.parse(res);
      callback(data);
    })
    // return this.powerSavingMode === true;
  }

  switchPowerSavingModeOff() {
    $.post('/powersavingmode', { power_saving_mode: false })
    // this.powerSavingMode = false;
  }

  switchPowerSavingModeOn() {
    $.post('/powersavingmode', { power_saving_mode: true })
    // this.powerSavingMode = true;
  }

// -------

  resetTemperature() {
    this.updateTemperature(this.DEFAULT_TEMPERATURE);
  }

  energyUsage(temperature) {
    if (temperature < this.MEDIUM_ENERGY_USAGE_LIMIT) {
      return 'low-usage';
    }
    if (temperature >= this.MEDIUM_ENERGY_USAGE_LIMIT && temperature <= this.MAX_LIMIT_PSM_ON) {
      return 'medium-usage';
    }
    return 'high-usage';
  }

  updateTemperature(value, callback) {
    $.post('/temperature', { temperature: value }, callback)
  }

};
