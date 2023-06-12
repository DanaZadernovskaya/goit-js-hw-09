 let intervalId;

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }

  function startChangingColor() {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');

    startButton.disabled = true;
    stopButton.disabled = false;

    intervalId = setInterval(function() {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }

  function stopChangingColor() {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');

    startButton.disabled = false;
    stopButton.disabled = true;

    clearInterval(intervalId);
  }