// script.js
const countdown = () => {
    extraCount();
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

    interhouseDates = [
        new Date('June 4, 2024 00:00:00'), // Soccer
        new Date('June 8, 2024 00:00:00')]; // Rugby


    const dayCounts = [];
    for (let i = 1; i <= 7; i++) {
        dayCounts[i-1] = countDays(now, graduationDate, i); // Counts occurances of days between today and grad, mon = 1, sun = 7
    }

    // TODO update as the day goes on
    document.getElementById("chapelCount").innerHTML = (dayCounts[2] + dayCounts[5]);
    document.getElementById("sportCount").innerHTML = (dayCounts[1] + dayCounts[3] + dayCounts[5]);
    document.getElementById("360Count").innerHTML = (dayCounts[0] + dayCounts[2]);
    let weekDayCount = 0; 
    dayCounts.slice(0,5).forEach( num => { weekDayCount += num;})
    document.getElementById("blockCount").innerHTML = weekDayCount * 4;

    let IHCount = 0;
    interhouseDates.forEach(date => {
        if (date.getTime() > now) {
            IHCount++;
        }
    });
    document.getElementById("IHCount").innerHTML = IHCount;

    const timeLeft = graduationDate - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    document.getElementById("mealCount").innerHTML = ((days * 3) - dayCounts[6]); // subtract suns cuz there is only 2 meals

}

window.onload = function() {
    extraCount();
};

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
