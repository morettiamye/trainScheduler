var name;
var destination;
var start;
var frequency;

var database = firebase.database();

// On click submit, pushes info to Firebase
$("#submit-button").on("click", function (event) {
    event.preventDefault();

    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    start = $("#start-time").val();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        start: start,
        frequency: frequency
    });


    $("#train-form").trigger("reset")
})



// Function for updating train table / Time uses Moment.js
function table(train) {
    startTime = moment(train.start, "HH:mm").add(-1, "days");
    var currentTime = moment();
    var timeDifference = currentTime.diff(startTime, "minutes");
    var lastTrain = timeDifference % train.frequency;
    console.log("before add", currentTime)
    var nextTrain = currentTime.add(train.frequency - lastTrain, "minutes")
    console.log("after add", currentTime)
    var nextTrainTime = nextTrain.format("h:mm: A")
    var minutesAway = nextTrain.diff(moment(), "minutes")


    // Update table
    var newRow = $("<tr>");
    newRow.append($("<td>").text(train.name));
    newRow.append($("<td>").text(train.destination));
    newRow.append($("<td>").text(train.frequency));
    newRow.append($("<td>").text(nextTrainTime));
    newRow.append($("<td>").text(minutesAway));
    $("#table-body").append(newRow);
}

database.ref().on("child_added", function (snapshot) {
    var snap = snapshot.val();
    table(snap);

});