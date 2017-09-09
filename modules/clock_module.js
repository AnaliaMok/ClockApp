/**
 * File Name: Clock Module
 * Description: Module in charge of displaying the current date
 * and time (both in standard and military time)
 */

/* jshint esversion: 6 */

var Clock = (function(){

    // Date Info
    let today, month, day;

    // Time info
    let hour, minute, seconds;

    // Month Names used for displaying current date
    let monthNames = [
        "Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July",
        "Aug.", "Sept.", "Oct.", "Nov.r", "Dec."
    ];

    // Just a global id for setTimeout
    let timerId;

    // Code Adjusted from w3schools example
    function startTime() {

        // Update date object
        today = new Date();

        hour = today.getHours();
        minute = today.getMinutes();
        seconds = today.getSeconds();

        minute = checkTime(minute);
        seconds = checkTime(seconds);
        document.getElementById('military').innerHTML =
            `${hour}:${minute}:${seconds}`;


        // My additions to also show standard time
        if(hour > 12){
            // Subtract 12 hours if after 12pm
            hour -= 12;
            document.getElementById('standard').innerHTML =
                `${hour}:${minute} <span>PM</span>`;
        }else{
            document.getElementById('standard').innerHTML =
                `${hour}:${minute} <span>AM</span>`;
        }

        // Checking date
        if(checkDate()){
            // If dates are different, update displayed date
            changeDate();
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

    // Method Mapping
    return {
        init: function(){
            changeDate();
            startTime();
        }
    };

})();
