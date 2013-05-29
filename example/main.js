$(document).ready(function() {
	setFormToStart();
});

function setFormToStart() {
	$("#PRNG_EXAMPLE").hide();
	$("#input_area").hide();
	$("#text_output").html("");
	$("#tf").val('');
	$("#tf").off("keypress");
	$("#Start").show();
}

//Called from 'Generate Text' button
function startText() {
	if ($("#input_area").is(":hidden")){
		$("#input_area").slideDown("fast");
		$("#tf").focus();
		$("#tf").val('');
		$("#tf").off("keypress");
		$("#tf").on("keypress", keyPressEvent);
		$("#text_output").html(generateText(getNewWord(), 15));
		$("#Start").hide();
	}
}

//Data Collection
var timeDelta = new Array();
var timeDeltaDigest = new Array();

//Add a keypress
function addDelay(delay) {
	timeDelta.push(delay);
}

//Figure out deltas from timestamps
function digestArray(sourceArray) {
	var storeArray = new Array();
	var delta;
	for (var i = 1; i < sourceArray.length; i++){
		delta = sourceArray[i] - sourceArray[i - 1];
		storeArray.push(delta);
	}
	return storeArray;
}

function keyPressEvent(e) {
	//Different browsers have different event formats
	if (e && e.timeStamp){
		addDelay(e.timeStamp);
	} else {
		var d = new Date();
		addDelay(d.getTime());
	}
	
	//Standard finished typing checks
	if ((e.keyIdentifier == "Enter" || e.keyCode == "13" || e.key == "Enter")){
		collectionComplete();
	}
}

function resetApplication() {
	if (!$("#input_area").is(":visible")){
		timeDelta = [];
		timeDeltaDigest = [];
		startText();
		$("#input_area").slideDown();
		$("#PRNG_EXAMPLE").fadeOut("fast");
		$("#textcap > h1").fadeIn("fast",
		function(){
			$("#btn").show();
		});
	}
}

function collectionComplete() {
	if ($("#input_area").is(":visible")){
		$("#input_area").slideUp();
		$("#textcap > h1").fadeOut("fast",
		function(){
			$("#PRNG_EXAMPLE").fadeIn("fast");
		});
		parseAndSend();
	}
}

function newNumbers() {
	$('#prngOutput').html(getBytes(1));
}

//Collection of functions to run after data completion
function parseAndSend() {
	timeDeltaDigest = digestArray(timeDelta);
	initRNG(timeDeltaDigest.join(""));
	newNumbers();
}