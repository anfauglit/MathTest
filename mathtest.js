function genEquation(maxNumber) {
	return Math.round(Math.random() * maxNumber) + " * " + Math.round(Math.random() * maxNumber);
}

var view = {
	displayEquation: function(text) {
		var equation = document.getElementById("randomEquation");
		equation.innerHTML = text;
	},
	displayResults: function(testResults) {
		for (var i = 0; i < data.equationNumber; i++) {
			var results = document.getElementById("result");
			results.innerHTML = results.innerHTML + testResults[i] + "<br>";
		}
	},
	displayStage: function(index, maxNumber) {
		var stageSpan = document.getElementById("current");
		stageSpan.innerHTML = index + "/" + maxNumber;
	}
}

var data = {
	maxRandomNumber: 100,
	equationNumber: 10,
	currentEquation: 0,
	userAnswers: [],
	checkAnswer: function() {
		var userAnswer = [];
		var equation = document.getElementById("randomEquation");
		userAnswer[0] = equation.innerHTML;
		var inputField = document.getElementById("answer");
		userAnswer[1] = inputField.value;
		var numbers = userAnswer[0].split("*");
		rightAnswer = numbers[0] * numbers[1];
		if (rightAnswer == userAnswer[1]) {
			userAnswer[2] = "Right";
		} else {
			userAnswer[2] = "Wrong";
		}
		return userAnswer;
	}	
}

function checkClick() {
	if (data.currentEquation == data.equationNumber) {
		view.displayEquation("The test is over, check your answers");
		view.displayResults(data.userAnswers);
	} else {
		data.userAnswers[data.currentEquation] = data.checkAnswer();
		data.currentEquation++;
		view.displayEquation(genEquation(data.maxRandomNumber));
		view.displayStage(data.currentEquation + 1, data.equationNumber);
		var inputField = document.getElementById("answer");
		inputField.value = "";
	}
}

function test() {
	var startButton = document.getElementById("answerButton");
	view.displayEquation(genEquation(data.maxRandomNumber));
	view.displayStage(data.currentEquation + 1, data.equationNumber);
	startButton.setAttribute("value", "Check");
	startButton.onclick = checkClick;
	var inputField = document.getElementById("answer");
	inputField.onkeypress = handleKeyPress;
}

function handleKeyPress(e) {
	var startButton = document.getElementById("answerButton");
	if (e.keyCode === 13) {
		startButton.click();
		return false;
	}
}

function init() {
	var startButton = document.getElementById("answerButton");
	startButton.onclick = test;
}

window.onload = init;

