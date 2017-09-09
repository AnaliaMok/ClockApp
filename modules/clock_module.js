/**
 * File Name: Clock Module
 * Description: Module in charge of displaying the current date
 * and time (both in standard and military time)
 */

/* jshint esversion: 6 */

var Clock = (function(){

    // Date Info
    var today = new Date(),
        month = today.getMonth(),
        day = today.getDate();

    // Month Names used for displaying current date
    let monthNames = [
        "Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July",
        "Aug.", "Sept.", "Oct.", "Nov.r", "Dec."
    ];

    // Just a global id for setTimeout
    var timerId;

    // Code From w3schools example
    function startTime() {

        // Update date object
        today = new Date();

        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('military').innerHTML =
        h + ":" + m + ":" + s;

        // My addition to also show standard time
        if(h > 12){
            // Subtract 12 hours if after 12pm
            h -= 12;
            document.getElementById('standard').innerHTML =
            h + ":" + m + " <span>PM</span>";
        }else{
            document.getElementById('standard').innerHTML =
            h + ":" + m + " AM";
        }

        timerId = window.setTimeout(startTime, 500);
    } // End of startTime

    // Adds zero infront of single digits
    function checkTime(i) {
        if (i < 10) {i = "0" + i;}
        return i;
    }

    // End of adjusted w3schools code

    // Updates the date currently being displayed
    function changeDate(){
        // TODO

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

        document.getElementById("date").innerHTML = `Today is ${monthNames[month]} ${day}`;
    } // End of changeDate

    // Method Mapping
    return {
        init: function(){
            changeDate();
            startTime();
        }
    };

})();
