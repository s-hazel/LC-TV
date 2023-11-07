schedule = [
    ["CREW", "A", "B", "C", "D", "E"],
    ["G", "F", "E", "D", "C", "B"],
    ["A", "B", "C", "F", "G", "FLEX"],
    ["G", "F", "E", "D", "B", "A"],
    ["A", "C", "D", "E", "F", "G"]
]

setDateAndTime = () => {
    let date = new Date();

    var pageDate = document.getElementById("date")
    pageDate.textContent = date.toLocaleDateString()

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var heading = document.querySelector("h1")
    heading.textContent = weekday[date.getDay()] + "'s Information"

    var pageTime = document.getElementById("time")
    pageTime.textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

setSchedule = () => {
    let date = new Date()

    var scheduleRow = document.getElementById("schedule-row")

    if (date.getDay() !== 0 && date.getDay() !== 6) {
        scheduleToday = schedule[date.getDay() - 1]

        for (i = 0; i < scheduleToday.length; i++) {
            td = document.createElement("td")
            td.textContent = scheduleToday[i]
            scheduleRow.appendChild(td)
        }
    } else {
        message = document.createElement("p")
        message.classList.add("schedule-message")
        message.textContent = "Have a great weekend! 🎉"
        scheduleRow.appendChild(message)
    }
}

setProgress = () => {
    var r = document.querySelector(":root")
    r.style.setProperty('--progress-bar', '0%');

    // Get the current date and time
    let now = new Date();
    console.log("Current time: " + now);

    // Set the start and end times
    let startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 15);
    let endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 41);
    console.log("Start time: " + startTime);
    console.log("End time: " + endTime);

    var percentComplete = document.getElementById("percent-complete")

    if (now >= startTime && now <= endTime) {
        // Calculate the total duration in milliseconds
        let duration = endTime - startTime;
        console.log("Total duration: " + duration);

        // Calculate the elapsed time in milliseconds
        let elapsed = now - startTime;
        console.log("Elapsed time: " + elapsed);

        // Calculate the percentage of time elapsed
        let percentage = (elapsed / duration) * 100;
        console.log("Percentage: " + percentage);

        // Update the width of the progress bar
        r.style.setProperty('--progress-bar', percentage + "%")
        percentComplete.textContent = Math.floor(percentage) + "%"

        // console.log("Progress bar width: " + progressBar.style.width);
    } else {
        // If the current time is outside the range, set the progress bar to 0%
        r.style.setProperty('--progress-bar', '0%')
        console.log("Outside time range. Progress bar width: " + progressBar.style.width);
    }
}

function setTimeRemaining() {
    let now = new Date();

    let time241PM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 41);

    // Calculate the difference in milliseconds
    let difference = time241PM - now;

    var timeRemaining = document.getElementById("time-remaining")

    if (difference > 0) {
        let hours = Math.floor(difference / 1000 / 60 / 60);
        difference -= hours * 1000 * 60 * 60;
        let minutes = Math.floor(difference / 1000 / 60);
        // difference -= minutes * 1000 * 60;
        // let seconds = Math.floor(difference / 1000);
        timeRemaining.textContent = "Time Remaining: " + hours + "h " + minutes + "m"
    }
}

updatePage = () => {
    setDateAndTime()
    setProgress()
    setTimeRemaining()
}

// Call the function every minute

setDateAndTime()
setSchedule()
updatePage()
setInterval(updatePage, 1000);