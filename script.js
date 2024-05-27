// script.js
const countdown = () => {
    getInfo();
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

const getInfo = () => {
    const graduationDate = new Date('June 22, 2024 00:00:00').getTime();
    const currentDate = new Date
    const now = currentDate.getTime();
    const isWeekday = currentDate.getDay() >= 1 && currentDate.getDay() <= 5;

    const dayCounts = [];
    for (let i = 0; i < 7; i++) {
        dayCounts[i] = countDays(now, graduationDate, i); // Counts occurances of days between today and grad, mon = 1, sun = 7
    }
    let weekDayCount = 0; 
    dayCounts.slice(0,5).forEach( num => { weekDayCount += num;});

    const blockTimes = [
        { startTime: '8:45', endTime: '9:55' },
        { startTime: '10:00', endTime: '11:15' },
        { startTime: '11:40', endTime: '13:30' },
        { startTime: '14:00', endTime: '15:10' }
    ];    
    const mealTimes = [
        { startTime: '7:45', endTime: '8:45' },
        { startTime: '13:10', endTime: '13:30' },
        { startTime: '18:00', endTime: '18:45' }
    ];    
    const sunMealTimes = [
        { startTime: '9:00', endTime: '12:00' },
        { startTime: '17:00', endTime: '17:45' }
    ];    
    interhouseDates = [
        new Date('June 4, 2024 12:00:00'), // Soccer
        new Date('June 8, 2024 12:00:00')  // Rugby
    ]; 

    document.getElementById("chapelCount").innerHTML = getChapelsLeft(dayCounts, currentDate.getDay());
    document.getElementById("sportCount").innerHTML = getSportsLeft(dayCounts, currentDate.getDay());
    document.getElementById("360Count").innerHTML = get360Left(dayCounts, currentDate.getDay());
    document.getElementById("blockCount").innerHTML = getBlocksLeft(weekDayCount, isWeekday, blockTimes);
    document.getElementById("IHCount").innerHTML = getIHLeft(interhouseDates, now);
    document.getElementById("mealCount").innerHTML = getMealsLeft(weekDayCount, dayCounts, mealTimes, sunMealTimes, currentDate.getDay()); 
}

//! Day starts on Sunday: Sun = 0, Mon = 1, Tue = 2, Wed = 3, Thu = 4, Fri = 5, Sat = 6
function getChapelsLeft(dayCounts, currentDay) {
    const wedTime = { startTime: '13:30', endTime: '14:00' };
    const satTime = { startTime: '11:15', endTime: '12:00' };
    console.log(dayCounts);
    if (currentDay == 2) {
        const chapelLeftInDay = getRemainingInstances(wedTime);
        return chapelLeftInDay + dayCounts[3] + dayCounts[6] - 1;
    } else if (currentDay == 5) {
        const chapelLeftInDay = getRemainingInstances(satTime);
        return chapelLeftInDay + dayCounts[3] + dayCounts[6] - 1;
    }
    return dayCounts[3] + dayCounts[6];
}

function getSportsLeft(dayCounts, currentDay) {
    const weekDayTime = { startTime: '15:30', endTime: '17:45' };
    const weekEndTime = { startTime: '13:00', endTime: '16:00' };

    if (currentDay == 2 || currentDay == 4) { // Tue, Thur
        return getRemainingInstances(weekDayTime) + dayCounts[1] + dayCounts[3] + dayCounts[5] - 1;
    } else if (currentDay == 6) { // Saturday
        return getRemainingInstances(weekEndTime) + dayCounts[1] + dayCounts[3] + dayCounts[5] - 1;
    }
    return dayCounts[1] + dayCounts[3] + dayCounts[5];
}

function get360Left(dayCounts, currentDay) {
    const weekDayTime = { startTime: '15:30', endTime: '17:45' };

    // Mon, Wed
    if (currentDay == 1 || currentDay == 3) {
        return getRemainingInstances(weekDayTime) + dayCounts[1] + dayCounts[3] + dayCounts[5] - 1;
    } 
    return dayCounts[1] + dayCounts[3];
}

function getBlocksLeft(weekDayCount, isWeekday, blockTimes) {
    const blocksLeftToday = getRemainingInstances(blockTimes);
    if (isWeekday) {
        return blocksLeftToday + ((weekDayCount-1) * 4);
    } else {
        return weekDayCount * 4;
    }
}

function getIHLeft(interhouseDates, now) {
    let IHCount = 0;
    interhouseDates.forEach(date => {
        if (date.getTime() > now) {
            IHCount++;
        }
    });
    return IHCount;
}

function getMealsLeft(weekDayCount, dayCounts, mealTimes, sunMealTimes, currentDay) {
    let mealsLeft = 0;
    const nonSundays = weekDayCount + dayCounts[6];
    if (currentDay != 0) { // Not a sunday
        const mealsLeftToday = getRemainingInstances(mealTimes);
        mealsLeft = mealsLeftToday + ((nonSundays - 1) * 3) + (dayCounts[0] * 2); // 2 meals on sundays
    }
    else { // Is a Sunday
        const mealsLeftToday = getRemainingInstances(sunMealTimes);
        mealsLeft = mealsLeftToday + ((nonSundays) * 3) + ((dayCounts[0] - 1) * 2);
    }
    return mealsLeft;
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

function getCurrentTimeInMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

// Gets how many more times something will occur in the day
function getRemainingInstances(times) {    
    const currentTime = getCurrentTimeInMinutes();
    let remainingInstances = 0;

    if (times.length > 1){
        times.forEach(block => {
            const [startHour, startMinute] = block.startTime.split(':').map(Number);
            // convert start time to mins since midnight
            const startTimeInMinutes = (startHour * 60) + startMinute;
    
            if (currentTime < startTimeInMinutes) {
                remainingInstances++;
            }
        });
    }
    else {
        const [startHour, startMinute] = times.startTime.split(':').map(Number);
        const startTimeInMinutes = (startHour * 60) + startMinute;

        if (currentTime < startTimeInMinutes) {
            remainingInstances++;
        }
    }
    

    return remainingInstances;
}

window.onload = function() {
    getInfo();
};
