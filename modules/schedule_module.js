/**
 * File Name: schedule_module.js
 * Description: Module used to display today's events
 */

/* jshint esversion: 6 */

var Schedule = (function(){

    // 'Reference to schedule data
    let scheduleData = data;

    // 'Global' reference to setTimeout id
    let updateId;

    // Reference to current date and time
    let today, weekday, schedule, hours, minutes;

    // Constant for no events template literal
    let NOEVENTS = `<li>Nothing Scheduled</li>`;

    /**
     * updateSchedule - Looks for today's events in schedule data, checks current
     *      time and displays future events
     * @return {[type]} [description]
     */
    function updateSchedule(){
        today = new Date();
        weekday = today.getDay();
        schedule = scheduleData[weekday]; 
        hours = today.getHours();
        minutes = today.getMinutes();

        // Looping through schedule if exists
        var contents = ``;
        if(Object.keys(schedule).length > 0){

            Object.keys(schedule).forEach(function(key){
                var originalTime = schedule[key],
                    eventTime = schedule[key],
                    isMorning = (eventTime.indexOf("AM") !== -1),
                    suffix = (isMorning) ? "AM" : "PM";

                // Removing AM/PM suffix
                eventTime = eventTime.substring(0, eventTime.indexOf(suffix));

                // Converting eventTime into an array to divide hour & minute
                var timeSplit = eventTime.split(":");

                // Converting both indices to ints
                timeSplit[0] = parseInt(timeSplit[0]);
                timeSplit[1] = parseInt(timeSplit[1]);

                if(!isMorning){
                    // Adjusting hours to military time
                    timeSplit[0] += 12;
                }

                // TODO: Simplify
                if(hours < timeSplit[0]){
                    // If current time is before scheduled time, display
                    contents += `<li>${key} <span>@${originalTime}</span></li>`;
                }else if(hours == timeSplit[0]){
                    // If hours are equal, then check minutes
                    if(minutes <= timeSplit[1]){
                        // If current time is before scheduled time, display
                        contents += `<li>${key} <span>@${originalTime}</span></li>`;
                    }
                }

            }); // End of foreach

        } // End of schedule size conditional

        if(contents === ``){
            // If nothing in contents, display message
            contents = NOEVENTS;
        }

        // Insert Content
        document.getElementById("schedule").innerHTML = contents;

    } // End of updateSchedule


    // Mapping methods
    return {
        updateSchedule: updateSchedule
    };

})();
