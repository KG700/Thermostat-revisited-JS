$(document).ready(function() {
  var thermostat = new Thermostat();

  updatePowerSavingMode()
  updateTemperature()
  updateWeatherCity();

  $('#temperature-up').on('click', function(data) {
    var currentTemperature = parseInt($('#temperature').text())
    var powerSavingMode = $('.powersavingmode').is(':checked')
    thermostat.up(currentTemperature, powerSavingMode, updateTemperature);
  });

  $('#temperature-down').on('click', function() {
    var currentTemperature = parseInt($('#temperature').text())
    thermostat.down(currentTemperature, updateTemperature);
  });

  $('#temperature-reset').on('click', function() {
    thermostat.resetTemperature();
    updateTemperature()
  });

  $('.powersavingmode').on('click', function() {
    if (this.checked) {
      var currentTemperature = parseInt($('#temperature').text())
      thermostat.switchPowerSavingModeOn(currentTemperature, updateTemperature);
    } else {
      thermostat.switchPowerSavingModeOff();
    }
    updateTemperature()
  })

  $('#current-city').change(function(event) {
    var city = $('#current-city').val();
    thermostat.updateWeatherCity(city, displayWeather)
    // displayWeather(city);
  })

  function updateTemperature() {
    thermostat.getCurrentTemperature(function(data) {
      $('#temperature').text(data.temperature);
      $('body').attr('class', thermostat.energyUsage(data.temperature));
    })
  }

  function updatePowerSavingMode() {
    thermostat.getPowerSavingMode(function(data) {
      $('.powersavingmode').prop('checked', data.power_saving_mode)
    })
  }

  function updateWeatherCity() {
    thermostat.getWeatherCity(function(data) {
      $('#current-city option[value=' + data.city + ']').prop('selected', true);
      displayWeather(data.city);
    })
  }

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp);
    });
  };

});
