// script.js


const graduationDate = new Date('June 22, 2024 12:00:00').getTime(); // for countdown
const siteOpenTime = new Date().getTime();
// const graduationDate = new Date('May 3, 2024 12:00:00').getTime(); // Use for testing
const classesEndDate = new Date('June 12, 2024 23:59:59');
const sportEndDate = new Date('June 6, 2024 23:59:59');
const endDate360 = new Date('June 3, 2024 23:59:59');

const arrow = document.getElementById('arrowPrompt');
arrow.style.opacity = 0;

const countdown = () => {
    setCountdownValues();
    const now = new Date().getTime();
    const timeLeft = graduationDate - now;
    setCountdownTotals(timeLeft);

    if (timeLeft < 0) {
        // TODO FIX
        document.querySelector('gradSection').innerHTML = "Congratulations, Graduates!";
        console.log("DONE");
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
};

function setCountdownTotals(timeLeft) {
    document.getElementById('totalDays').innerHTML = Math.floor(timeLeft / (1000 * 60 * 60 * 24)) + " Days Left";
    document.getElementById('totalHours').innerHTML = Math.floor(timeLeft / (1000 * 60 * 60)) + " Hours Left";
    document.getElementById('totalMinutes').innerHTML = Math.floor(timeLeft / (1000 * 60)) + " Minutes Left";
    document.getElementById('totalSeconds').innerHTML = Math.floor(timeLeft / (1000)) + " Seconds Left";
}

setTimeout(() => {
    if ((arrow.style.opacity == 0)) {
        arrow.style.opacity = 1;
    }
    console.log("ITS BEEN 2");
}, 2000);

document.addEventListener("wheel", function(event) {
    if (arrow.style.opacity == 1) {
        document.removeEventListener("wheel", event);
        console.log("ADDING HIDDEN");
        arrow.style.opacity = 0;
    }
});

function scrollToNext() {
    console.log("CLICKED")
    // Find the current and next section
    const currentSection = document.querySelector('.section');
    const nextSection = currentSection.nextElementSibling;

    // Scroll to next section, if it exists
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}

setInterval(countdown, 1000);

const setCountdownValues = () => {
    // const currentDate = new Date('June 12, 2024 18:00:00') // Testing
    const currentDate = new Date();
    const now = currentDate.getTime();
    const isWeekday = currentDate.getDay() >= 1 && currentDate.getDay() <= 5;

    const dayCounts = getDayCounts(now,  new Date('June 22, 2024 23:59:59').getTime()); // need to do grad date at end of day to avoid off by one errors

    let weekDayCount = 0; 
    dayCounts.slice(0,5).forEach( num => { weekDayCount += num;});

    const classDayCounts = getDayCounts(now, classesEndDate);
    let classWeekDayCount = 0; // Week days left until classes end
    classDayCounts.slice(0,5).forEach( num => { classWeekDayCount += num;});
    
    const sportDayCounts = getDayCounts(now, sportEndDate);
    const dayCounts360 = getDayCounts(now, endDate360);

    const blockTimes = [
        { startTime: '8:45', endTime: '9:55' },
        { startTime: '10:00', endTime: '11:15' },
        { startTime: '11:40', endTime: '13:10' },
        { startTime: '14:00', endTime: '15:10' }
    ];    
    const blockTimesWed = [
        { startTime: '9:00', endTime: '9:55'},
        { startTime: '10:00', endTime: '10:55' },
        { startTime: '11:15', endTime: '12:10' },
        { startTime: '12:15', endTime: '13:10' }
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
    
    document.getElementById("chapelCount").innerHTML = getChapelsLeft(dayCounts, currentDate.getDay(), now);
    document.getElementById("sportCount").innerHTML = getSportsLeft(sportDayCounts, currentDate.getDay(), now);
    document.getElementById("360Count").innerHTML = get360Left(dayCounts360, currentDate.getDay());
    document.getElementById("blockCount").innerHTML = getBlocksLeft(classWeekDayCount, currentDate.getDay(), isWeekday, blockTimes, blockTimesWed);
    document.getElementById("IHCount").innerHTML = getIHLeft(interhouseDates, now);
    document.getElementById("mealCount").innerHTML = getMealsLeft(weekDayCount, dayCounts, mealTimes, sunMealTimes, currentDate.getDay()); 
}

//! Day starts on Sunday: Sun = 0, Mon = 1, Tue = 2, Wed = 3, Thu = 4, Fri = 5, Sat = 6
function getChapelsLeft(dayCounts, currentDay, now) {
    //! No chapel on Sat, June 1
    const wedTime = { startTime: '13:30', endTime: '14:00' };
    const satTime = { startTime: '11:15', endTime: '12:00' };
    const extraChapel = new Date('June 20, 2024 19:30:00');
    const noChapelDate = new Date('June 1, 2024 11:15:00');

    let extraChapelCount = 0; // starting at -1 cause there is no chapel on saturday june 1
    if (noChapelDate.getTime() > now) {
        extraChapelCount--;
    }
    if (extraChapel.getTime() > now) {
        extraChapelCount++;
    }
    if (currentDay == 3) {
        const chapelLeftInDay = getRemainingInstances(wedTime);
        return extraChapelCount + chapelLeftInDay + dayCounts[3] + dayCounts[6] - 1;
    } else if (currentDay == 6) {
        const chapelLeftInDay = getRemainingInstances(satTime);
        return extraChapelCount + chapelLeftInDay + dayCounts[3] + dayCounts[6] - 1;
    }
    return extraChapelCount + dayCounts[3] + dayCounts[6];
}

function getSportsLeft(sportDayCounts, currentDay, now) {
    //! No Sport on Tue, June 4

    const weekDayTime = { startTime: '15:30', endTime: '17:45' };
    const weekEndTime = { startTime: '13:00', endTime: '16:00' };
    const noSportDate = new Date('June 3, 2024, 4:15');

    let sportCountChanger = 0;
    if (noSportDate.getTime() > now) {
        sportCountChanger--;
    }

    if (currentDay == 2 || currentDay == 4) { // Tue, Thur
        return sportCountChanger + getRemainingInstances(weekDayTime) + sportDayCounts[2] + sportDayCounts[4] + sportDayCounts[6] - 1;
    } else if (currentDay == 6) { // Saturday
        return sportCountChanger + getRemainingInstances(weekEndTime) + sportDayCounts[2] + sportDayCounts[4] + sportDayCounts[6] - 1;
    }
    return sportDayCounts[1] + sportDayCounts[3] + sportDayCounts[5];
}

function get360Left(dayCounts360, currentDay) {
    const weekDayTime = { startTime: '15:30', endTime: '17:45' };

    // Mon, Wed
    if (currentDay == 1 || currentDay == 3) {
        return getRemainingInstances(weekDayTime) + dayCounts360[1] + dayCounts360[3] - 1;
    } 
    return dayCounts360[1] + dayCounts360[3];
}

function getBlocksLeft(weekDayCount, currentDay, isWeekday, blockTimes, blockTimesWed) {
    if (isWeekday) {
        if (currentDay == 3) {
            return getRemainingInstances(blockTimesWed) + ((weekDayCount-1) * 4);
        }
        return getRemainingInstances(blockTimes) + ((weekDayCount-1) * 4);
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
        mealsLeft = mealsLeftToday + ((nonSundays - 1) * 3) + (dayCounts[0] * 2) + 1; // 2 meals on sundays, assume only breakfast on closing day
    }
    else { // Is a Sunday
        const mealsLeftToday = getRemainingInstances(sunMealTimes);
        mealsLeft = mealsLeftToday + ((nonSundays) * 3) + ((dayCounts[0] - 1) * 2) + 1;
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

function getDayCounts(now, endDate) {
    let dayCounts = [];
    for (let i = 0; i < 7; i++) {
        dayCounts[i] = countDays(now, endDate, i); // Counts occurances of days between today and grad, mon = 1, sun = 7
    }

    return dayCounts;
}

// Gets how many more times something will occur in the day
function getRemainingInstances(times) {    
    const currentTime = getCurrentTimeInMinutes();
    let remainingInstances = 0;

    if (times.length > 1){
        times.forEach(block => {
            const [endHour, endMinute] = block.endTime.split(':').map(Number);
            // convert start time to mins since midnight
            const endTimeInMinutes = (endHour * 60) + endMinute;
    
            if (currentTime < endTimeInMinutes) {
                remainingInstances++;
            }
        });
    }
    else {
        const [endHour, endMinute] = times.endTime.split(':').map(Number);
        const endTimeInMinutes = (endHour * 60) + endMinute;

        if (currentTime < endTimeInMinutes) {
            remainingInstances++;
        }
    }
    

    return remainingInstances;
}

window.onload = function() {
    setCountdownValues();
};
