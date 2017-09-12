/**
 * File Name: Clock Module
 * Description: Module in charge of displaying the current date
 * and time (both in standard and military time)
 */

/* jshint esversion: 6 */

var Clock = (function(){

    // Date Info
    let today = new Date(),
        month = today.getMonth(),
        day = today.getDate();

    // Time info
    let hour = today.getHours(),
        minute = today.getMinutes(),
        seconds = today.getSeconds();

    // Month Names used for displaying current date
    let monthNames = [
        "Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July",
        "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
    ];

    // Just a global id for setTimeout
    let timerId;

    // Canvas Variables
    let canvas = document.getElementById('background-gradient'),
        context = canvas.getContext('2d');

    // Color Stops for Three Stages of the Day
    let colorStops = [
        ["#f1c40f", "#d35400"],     // Early Morning
        ["#1ABC9C", "#3498DB"],     // Day Time
        ["#9b59b6", "#2c3e50"]      // Night Time
    ];

    // By default, the day time theme is selected (Index 1)
    let currStopIdx = 1;


    // Method Definitions

    // Code Adjusted from w3schools example
    function startTime() {

        // Update date object
        var currDay = new Date(),
            currHour = currDay.getHours(),
            currMinute = currDay.getMinutes(),
            currSeconds = currDay.getSeconds();

        currMinute = checkTime(currMinute);
        currSeconds = checkTime(currSeconds);
        document.getElementById('military').innerHTML =
            `${currHour}:${currMinute}:${currSeconds}`;

        // Checking if background gradient should be changed
        if(hour != currHour){
            // Update hour
            hour = currHour;

            // Then update background - if necessary
            changeBackground();
        }

        // Adjusting for standard time
        if(currHour > 12){
            // Subtract 12 currHours if after 12pm
            currHour -= 12;
            document.getElementById('standard').innerHTML =
                `${currHour}:${currMinute} <span>PM</span>`;

        }else{
            document.getElementById('standard').innerHTML =
                `${currHour}:${currMinute} <span>AM</span>`;
        }

        // Checking date
        if(checkDate()){
            // If dates are different, update displayed date
            changeDate();
        }

        // If curr currMinute is a multiple of 5, update schedule
        if(parseInt(currMinute) % 5 === 0 && parseInt(currSeconds) === 0){
            console.log("Updating Schedule...");
            Schedule.updateSchedule();
        }

        timerId = window.setTimeout(startTime, 500);
    } // End of startTime

    // Adds zero infront of single digits
    function checkTime(i) {
        if (i < 10) {i = "0" + i;}
        return i;
    }


    /**
     * checkDate - Creates a new Date object and compares the day and month to
     * the currently set day and month.
     * @return true if day and month are different, false otherwise
     */
    function checkDate(){

        var newDate = new Date();
        return (newDate.getMonth() !== month || newDate.getDate() !== day);

    } // End of checkDate

    // End of adjusted w3schools code


    /**
     * changeDate - Updates the currently displayed date
     */
    function changeDate(){

        // Updating date object
        today = new Date();
        month = today.getMonth();
        day = today.getDate();

        // Formatting & Inserting Date
        // Applying suffix to day of month
        switch(day){
            case 1:
                day += "st";
                break;
            case 2:
                day += "nd";
                break;
            case 3:
                day += "rd";
                break;
            default:
                day += "th";
                break;
        }

        document.getElementById("date").innerHTML =
            `Today is ${monthNames[month]} ${day}`;

    } // End of changeDate


    /**
     * changeBackground - Changes the gradient based on the current time
     * and changed the font color of the schedule list items
     */
    function changeBackground(isInit){

        if(isInit === undefined){
            // By default, function is not called on startup
            isInit = false;
        }

        // Default colorStop selection pair &
        // starting point and ending point of gradient
        var selection = 0,
            startPoint = [],
            endPoint = [];

        if(hour >= 6 && hour < 11){
            // Between 6am and 11am - Early Morning Theme
            selection = 0;

            // Linear gradient with 45 deg rotation CW
            startPoint = [0, 0];
            endPoint = [canvas.width,canvas.height];
        }else if(hour >= 11 && hour < 20){
            // Between 11am and 8pm - Day Time Theme
            selection = 1;

            // Plain Linear gradient from top to bottom
            startPoint = [canvas.width/2, 0];
            endPoint = [canvas.width/2,canvas.height];

        }else if(hour >= 20 || hour < 6){
            // Between 8pm and 6am - Nighttime Theme
            selection = 2;

            // Linear gradient with 45 deg rotation CCW
            startPoint = [0, canvas.height];
            endPoint = [canvas.width, 0];
        }

        // If the current selection is not already active OR if the app
        // just started, change gradient
        if(currStopIdx !== selection || isInit){

            var grad = context.createLinearGradient(
                startPoint[0], startPoint[1], endPoint[0], endPoint[1]
            );

            grad.addColorStop(0, colorStops[selection][0]);
            grad.addColorStop(0.27, colorStops[selection][0]);
            grad.addColorStop(1, colorStops[selection][1]);

            // Change text color of list items
            var listItems = document.getElementsByTagName("li");
            for(var i = 0, length = listItems.length; i < length; i++){
                var currItem = listItems[i];
                if(selection === 0 || selection === 2){
                    // If early time theme or late night theme, use first color stop
                    currItem.style.color = colorStops[selection][0];
                }else{
                    currItem.style.color = colorStops[selection][1];
                }
            }

            context.fillStyle = grad;
            context.fillRect(0, 0, canvas.width, canvas.height);

            currStopIdx = selection;
            console.log("Background Changed!");
        }


    } // End of changeBackground

    // Method Mapping
    return {
        init: function(){
            changeDate();
            startTime();
            changeBackground(true);
        }
    };

})(Schedule);
