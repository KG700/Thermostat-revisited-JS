$(document).ready(function() {
  var thermostat = new Thermostat();

  updatePowerSavingMode()
  updateTemperature()

  $('#temperature-up').on('click', function(data) {
    var currentTemperature = parseInt($('#temperature').text())
    var powerSavingMode = $('.powersavingmode').is(':checked')
    // console.log(powerSavingMode);
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

// -------

  $('.powersavingmode').on('click', function() {
    if (this.checked) {
      thermostat.switchPowerSavingModeOn();
      // $('#power-saving-status').text('on');
    } else {
      thermostat.switchPowerSavingModeOff();
      // $('#power-saving-status').text('off');
    }
    updateTemperature()
  })

// -------

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
    $('#current-temperature').text(data.main.temp);
  });

  displayWeather('London');

  $('#current-city').change(function(event) {
    var city = $('#current-city').val();
    displayWeather(city);
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

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp);
    });
  };

});
