$(document).ready(function() {
  var thermostat = new Thermostat();
  $('#temperature').text(thermostat.temperature);
  $('#temperature-up').on('click', function() {
    thermostat.up();
    $('#temperature').text(thermostat.temperature);
  });
  $('#temperature-down').on('click', function() {
    thermostat.down();
    $('#temperature').text(thermostat.temperature);
  })

});
