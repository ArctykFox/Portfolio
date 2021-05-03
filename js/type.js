function type(strings) {
  var options = {
    strings: strings,
    typeSpeed: 80,
    loop: true,
    smartBackspace: true,
    backDelay: 3 * 1000, //3 SECONDS
  };

  var typed = new Typed(".welcome-message-animated", options);
}
