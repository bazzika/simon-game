$(function() {

  function SimonGame() {
    var current = this,

      display = $('.display'),
      inputs = $('.ss-input'),
      startButton = $('.start-reset button'),
      strictLight = $('.strict button'),
      green = $('.ss-g'),
      red = $('.ss-r'),
      blue = $('.ss-b'),
      yellow = $('.ss-y'),

      greenAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
      redAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
      blueAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
      yellowAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),

      playLights,
      displayInterval,
      strictMode = false,
      running = false,
      pressAllowed = true,
      round = 0,
      time = 1000,
      playerTurn = false,
      sequence = [],
      playersequence = [],
      moveArr = ['g', 'r', 'b', 'y'];


    function flashDisplay(str, num, callback) {
      var count = 0;
      display.text("");
      displayInterval = setInterval(function() {
        display.text(str);
        if (count === num) {
          clearInterval(displayInterval);
          display.text("");
          setTimeout(function() {
            callback.apply();
          }, 200)
        } else {
          setTimeout(function() {
            display.text("");
          }, 200);
        }
        count++;
      }, 400);
    }

    function displayRound() {
      display.text("");
      setTimeout(function() {
        display.text("ROUND " + round);
      }, 400);
    }

  }

  var simon = new SimonGame;
  simon.init(); // start new game
});

