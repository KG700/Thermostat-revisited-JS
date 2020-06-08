$(document).ready(function() {
  var thermostat = new Thermostat();

  // $('#temperature').text(thermostat.temperature);
  updateTemperature()

  $('#temperature-up').on('click', function(data) {
    var currentTemperature = parseInt($('#temperature').text())
    console.log(currentTemperature);
    thermostat.up(currentTemperature, updateTemperature);
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
      thermostat.switchPowerSavingModeOn();
      $('#power-saving-status').text('on');
    } else {
      thermostat.switchPowerSavingModeOff();
      $('#power-saving-status').text('off');
    }
    updateTemperature()
  })

  $('#powersaving-on').on('click', function() {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving-status').text('on');
    updateTemperature()
  });

  $('#powersaving-off').on('click', function() {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving-status').text('off');
    updateTemperature()
  });

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
    $('#current-temperature').text(data.main.temp);
  });

  displayWeather('London');

  $('#current-city').change(function(event) {
    var city = $('#current-city').val();
    displayWeather(city);
  })

  function updateTemperature() {
    console.log("I'm in updateTemperature method")
    thermostat.getCurrentTemperature(function(data) {
      console.log("I'm now in the interface helper function");
      console.log(data);
      $('#temperature').text(data.temperature);
      $('body').attr('class', thermostat.energyUsage());
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
