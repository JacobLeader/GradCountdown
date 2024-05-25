// script.js
const countdown = () => {
    const graduationDate = new Date('June 22, 2024 00:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = graduationDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;

    if (timeLeft < 0) {
        document.getElementById('countdown').innerHTML = "Congratulations, Graduates!";
    }
};

setInterval(countdown, 1000);

const extraCount = () => {
    const graduationDate = new Date('June 22, 2024 00:00:00').getTime();
    const now = new Date().getTime();

    const satCount = countDays(now, graduationDate, 6); // Saturday is represented by 6
    const wedCount = countDays(now, graduationDate, 3); 

    
}


const countDays = (startDate, endDate, dayOfWeek) => {
  let count = 0;
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  // Loop through each day between startDate and endDate
  for (let date = startDate; date <= endDate; date += oneDay) {
    const day = new Date(date).getDay();
    if (day === dayOfWeek) {
      count++;
    }
  }

  return count;
};