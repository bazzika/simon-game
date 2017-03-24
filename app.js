$(function() {

  function SimonGame() {
    var current = this,

      display = $('.display'),
      inputs = $('.s-input'),
      startButton = $('.start-reset button'),
      strictLight = $('.strict button'),
      green = $('.s-green'),
      red = $('.s-red'),
      blue = $('.s-blue'),
      yellow = $('.s-yellow'),

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
      moveArr = ['green', 'red', 'blue', 'yellow'];

    this.init = function() {
      clearInterval(playLights);
      clearInterval(displayInterval);
      inputs.off();
      strictLight.off();
      startButton.off();
      inputs.removeClass('active');
      if (startButton.hasClass('active')) startButton.removeClass('active');
      if (startButton.text() !== 'START') startButton.text('START');
      playerTurn = false;
      pressAllowed = true;
      running = false;
      round = 0;
      time = 1000;
      sequence = [];
      playersequence = [];
      strictLight.on("click", setStrictMode);
      startButton.on("click", toggleGame);
      inputs.on("click", function() {
        if (running && playerTurn && pressAllowed) {
          var button;
          pressAllowed = false;
          if ($(this).hasClass('s-green')) button = green;
          if ($(this).hasClass('s-blue')) button = blue;
          if ($(this).hasClass('s-red')) button = red;
          if ($(this).hasClass('s-yellow')) button = yellow;
          pushButton(button);
          processUserInput(button);
          setTimeout(function() {
            clearButton(button);
            pressAllowed = true;
          }, 400);
        }
      });
    }

    function toggleGame() {
      if (running) {
        current.init();
      } else {
        running = true;
        playerTurn = false;
        startButton.addClass('active');
        startButton.text('RESET');
        processCompTurn();
      }
    }

    function processCompTurn() {
      if (running && !playerTurn && round < 21) {
        round++;
        if (round === 1) {
          flashDisplay("GET READY",3, displayRound);
        } else {
          displayRound();
        }
        if (round < 6) {
          time = 1000;
        } else if (round < 11) {
          time = 900;
        } else if (round < 16) {
          time = 750;
        } else {
          time = 600;
        }
        sequence.push(moveArr[Math.floor(Math.random()*4)]);
        setTimeout(function() {
          playSeq(sequence, time, function() {
            playerTurn = true;
          });
        }, 1000);
      }
    }
    function processUserInput(div) {
      if (running && playerTurn && round < 21) {
        var str = div.attr('class').split(' ')[1].split('-')[1];
        if (playersequence.length < sequence.length) {
          playersequence.push(str);
          if (playersequence[playersequence.length - 1] === sequence[playersequence.length - 1]) {
            if (playersequence.length === sequence.length) {
              playerTurn = false;
              if (round === 20) {
                flashDisplay("WINNER!", 5, function() {
                  current.init();
                  toggleGame();
                });
              } else {
                playersequence = [];
                processCompTurn();
              }
            }
          } else {
            if (strictMode) {
              flashDisplay("!!!", 3, function() {
                current.init();
                toggleGame();
              });
            } else {
              playerTurn = false;
              playersequence = [];
              flashDisplay("!!!", 3, displayRound);
              setTimeout(function() {
                playSeq(sequence, time, function() {
                  playerTurn = true;
                });
              }, 1600);
            }
          }
        }
      }
    }

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
          case "green":
            space = green;
            break;
          case "red":
            space = red;
            break;
          case "blue":
            space = blue;
            break;
          case "yellow":
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

