var currentDayEl = $("#currentDay");
var timeblockContainerEl = $("#timeblock-container");
var currentHour = dayjs().hour();
var timeblocks = timeblockContainerEl.children();


$(document).ready(function () {
  $("button").click(function() {
    var selectedTimeblockId = $(this).parent().attr("id");
    var unsavedText = $(this).parent().children("textarea").val().trim();
    if (unsavedText !== null) {
      var scheduleItems = JSON.parse(localStorage.getItem("scheduleItems") || "[]");
      var foundIndex = scheduleItems.findIndex(function(item) {
        return item.key === selectedTimeblockId;
    });
      if (foundIndex !== -1) {
        scheduleItems[foundIndex].text = unsavedText;
      } else {
        var scheduleItem = {
          key: selectedTimeblockId,
          text: unsavedText,
        };
        scheduleItems.push(scheduleItem);
      }
      localStorage.setItem("scheduleItems", JSON.stringify(scheduleItems));
    } else {
      return
    } 
  });

  for (var i = 0; i < 9; i++) {
    var timeblock = $(timeblocks[i]);
    var timeblockHour = parseInt(timeblock.attr("data-time"));

    if (currentHour > timeblockHour) {
      timeblock.addClass("past");
    } else if ( currentHour === timeblockHour) {
      timeblock.addClass("present");
    } else {
      timeblock.addClass("future");
    }
  }

  function init() {
    var scheduleItems = JSON.parse(localStorage.getItem("scheduleItems")) || "[]";
    
    for (i = 0; i < scheduleItems.length; i++) {
      var currentHourData = scheduleItems[i];

      if (currentHourData !== null) {
        var selectedHourId = $("#" + currentHourData.key);
        var selectedHourText = currentHourData.text;
        selectedHourId.children("textarea").text(selectedHourText);
      } 
    }
  }
  
  function displayTime() {
    var todayFormat = dayjs().format("MM/DD/YYYY - hh:mm:ss a");
    currentDayEl.text(todayFormat);
  }

  displayTime();
  setInterval(displayTime, 1000);
  init();
  
});
