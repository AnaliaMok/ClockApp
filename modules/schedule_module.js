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

    /**
     * insertSchedule - Looks for today's events in schedule data, checks current
     *      time and displays future events
     * @return {[type]} [description]
     */
    function insertSchedule(){
        var today = new Date(),
            weekday = today.getDay(),
            schedule = scheduleData[weekday],
            hours = today.getHours(),
            minutes = today.getMinutes();

        // TODO: Test that length works with Sunday
        // Looping through schedule if exists
        if(Object.keys(schedule).length > 0){

            Object.keys(schedule).forEach(function(key){
                var eventTime = schedule[key];
                // TODO: Parse eventTime, determine if it occurs before current
                // time and determine whether or not to add it #schedule

            });

        }else{
            // TODO: Add, Nothing Schedule today message
        }

        // TODO: Call checkSchedule

    } // End of insertSchedule


    /**
     * [checkSchedule description]
     * @return {[type]} [description]
     */
    function checkSchedule(){
        // TODO: Meant to check schedule by the minute to change its
        // contents
        // TODO: Start setTimeout for every minute 60s * 1000ms
    } // End of checkSchedule

    return {
        insertSchedule: insertSchedule
    };

})();
