var countDown = document.querySelector(".count-down");

var secondsLeft = 120;

function setCountDown() {
  var countDownTimer = setInterval(function() {
    secondsLeft--;
    countDown.textContent = secondsLeft + " Test";

    if(secondsLeft === 0) {
      
      clearInterval(countDownTimer);
      
    }

  }, 1000);
}


setCountDown();