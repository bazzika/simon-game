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


    function setStrictMode() {
      if (!running) {
        if (strictMode) {
          strictMode = false;
          strictLight.removeClass('active');
        } else {
          strictMode = true;
          strictLight.addClass('active');
        }
      }
    }

    function playSeq(arr, time) {
      var args = arguments;
      var space;
      var i = 0;
      playLights = setInterval(function() {
        switch (arr[i]) {
          case "g":
            space = green;
            break;
          case "r":
            space = red;
            break;
          case "b":
            space = blue;
            break;
          case "y":
            space = yellow;
            break;
        }
        pushButton(space);
        setTimeout(function() {
          clearButton(space);
        }, time / 2);
        i++;
        if(i === arr.length){
          if (args.length > 2) {
            args[2].apply();
          }
          clearInterval(playLights);
        }
      }, time);
    }
    function pushButton(div) {
      switch (div) {
        case green:
          greenAudio.play();
          break;
        case blue:
          blueAudio.play();
          break;
        case red:
          redAudio.play();
          break;
        case yellow:
          yellowAudio.play();
          break;
      }
      div.addClass("active");
    }
      function clearButton(div) {
      switch (div) {
        case green:
          greenAudio.pause();
          greenAudio.currentTime = 0;
          break;
        case blue:
          blueAudio.pause();
          blueAudio.currentTime = 0;
          break;
        case red:
          redAudio.pause();
          redAudio.currentTime = 0;
          break;
        case yellow:
          yellowAudio.pause();
          yellowAudio.currentTime = 0;
          break;
      }
      div.removeClass("active");
    }


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

