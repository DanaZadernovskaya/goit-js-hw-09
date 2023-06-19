import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("button[data-start]");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.warning("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

startButton.addEventListener("click", startTimer);

function startTimer() {
 const [year, month, day, hours, minutes] =
    datetimePicker.value.split(/-|:|\s/); // Splitting the date string
  const selectedDate = Date.parse(`
    ${year}-${month}-${day} ${hours}:${minutes}`
  );
  if (selectedDate) {
    const countdown = selectedDate - Date.now();
    if (countdown > 0) {
      disableInputs();
      countdownTimer(countdown);
    } else {
      Notiflix.Notify.warning("Please choose a date in the future");
    }
  }
}

function disableInputs() {
  datetimePicker.disabled = true;
  startButton.disabled = true;
}

function countdownTimer(duration) {
  const timerElement = document.querySelector(".timer");

  const daysElement = timerElement.querySelector("[data-days]");
  const hoursElement = timerElement.querySelector("[data-hours]");
  const minutesElement = timerElement.querySelector("[data-minutes]");
  const secondsElement = timerElement.querySelector("[data-seconds]");

  const intervalId = setInterval(updateTimer, 1000);

  function updateTimer() {
    const { days, hours, minutes, seconds } = convertMs(duration);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);

    duration -= 1000;

    if (duration < 0) {
      clearInterval(intervalId);
      enableInputs();
    }
  }

  function enableInputs() {
    datetimePicker.disabled = false;
    startButton.disabled = false;
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}
