import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const REFRESH_INTERVAL = 1000;
let timerId = null;
let selectDateVal = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (currentDate >= selectedDates[0]) {
      Notify.warning('Please choose a date in the future');
      refs.buttonStart.disabled = true;
      return;
    }
    refs.buttonStart.disabled = false;
    selectDateVal = selectedDates[0];
  },
};

const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  inputField: document.querySelector('input#datetime-picker'),
  valueDays: document.querySelector('.value[data-days]'),
  valueHours: document.querySelector('.value[data-hours]'),
  valueMinutes: document.querySelector('.value[data-minutes]'),
  valueSeconds: document.querySelector('.value[data-seconds]'),
  valueAllLabel: document.querySelectorAll('.timer .label'),
};

for (const i of refs.valueAllLabel) {
  if (i.textContent === 'Seconds') {
    i.textContent = '';
    continue;
  }
  i.textContent = ': \32';
}

refs.valueAllLabel.textContent = ':';
refs.buttonStart.disabled = true;
refs.buttonStart.addEventListener('click', () => {
  refs.inputField.disabled = true;
  refs.buttonStart.disabled = true;
  timerId = setInterval(refreshScreen, REFRESH_INTERVAL);
});

flatpickr(refs.inputField, options);

function refreshScreen() {
  const currentDate = new Date();
  const deltaTime = selectDateVal - currentDate;
  const { days, hours, minutes, seconds } = convertMs(deltaTime);

  refs.valueDays.textContent = addLeadingZero(days);
  refs.valueHours.textContent = addLeadingZero(hours);
  refs.valueMinutes.textContent = addLeadingZero(minutes);
  refs.valueSeconds.textContent = addLeadingZero(seconds);

  if (days + hours + minutes + seconds === 0) {
    clearTimeout(timerId);
    refs.inputField.disabled = false;
    refs.buttonStart.disabled = true;
    Notify.success('Congratulations! Action finished!');
    return;
  }
}

const addLeadingZero = value => value.toString().padStart(2, '0');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
