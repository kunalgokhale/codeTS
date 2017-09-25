var bmr, weight, height, age, calIntake, tgtCalories, exerlevel, sex, goal;

var fatgm, progm, carbgm, fibgm;
var fatcal, procal, carbcal, fibcal;

function calcBMR (sex, weight, height, age)
{
	if (sex == "Male") {
		bmr = (10*weight) + (6.25*height) - (5*age) + 5;
	}
	else if (sex == "Female") {
		bmr = (10*weight) + (6.25*height) - (5*age) - 161;
	}

	return bmr;
}

function myfunction ()
{
	var exerlvl = document.getElementsByName('exerlvl');
	for (var i = 0, length = exerlvl.length; i < length; i++) {
		if (exerlvl[i].checked) 
		{
			exerlevel = exerlvl[i].value;
		}
	}

	var sexelement = document.getElementsByName('gender');
	for (var i = 0, length = sexelement.length; i < length; i++) {
		if (sexelement[i].checked) 
		{
			sex = sexelement[i].value;
		}
	}

	var goalelement = document.getElementsByName('healthgoal');
	for (var i = 0, length = goalelement.length; i < length; i++) {
		if (goalelement[i].checked) 
		{
			goal = goalelement[i].value;
		}
	}

	name = document.getElementById("fullName").value;
	email = document.getElementById("email").value;
	weight = document.getElementById("weight").value;
	height = document.getElementById("height").value;
	age = document.getElementById("age").value;

	console.log("name::"+name);
	console.log("email::"+email);
	console.log("weight::"+weight);
	console.log("height::"+height);
	console.log("sex::"+sex);
	console.log("age::"+age);
	showResults();

	document.getElementById("name-result").innerHTML = name;
	document.getElementById("email-result").innerHTML = email;
	document.getElementById("age-result").innerHTML = age;
	document.getElementById("gender-result").innerHTML = sex;
	document.getElementById("height-result").innerHTML = height;
	document.getElementById("weight-result").innerHTML = weight;
	
	bmr = calcBMR(sex, weight, height, age);

	calcCalIntake(exerlevel);
	calcTgtCalories(goal);
	calcGrams();

	showBar();

	showDoughnutGm();

	showDoughnutCal();

}

function showBar() {
	var ctx = document.getElementById("myChart");
	var myChart = new Chart(ctx, {
		type: 'horizontalBar',
		data: {
			labels: ["Current", "Target"],
			datasets: [{
				data: [calIntake, tgtCalories],
				backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)'
				],
				borderColor: [
				'rgba(255,99,132,1)',
				'rgba(54, 162, 235, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
               }
           }]
       },
        	legend: {
       			display: false
       		},
       		tooltips: {
       			callbacks: {
       			label: function(tooltipItem) {
       			return tooltipItem.yLabel;
       		}
       	}

       }
}
});
}

function showResults() {
	var x = document.getElementById('result-section');
	var y = document.getElementById('inputInfo');
	if (x.style.display === 'none') {
		x.style.display = 'block';
		y.style.display = 'none';
	} else {
		x.style.display = 'none';
		y.style.display = 'block';
	}
}

function showDoughnutGm() {
	var ctx1 = document.getElementById("doughnutGm");

	data = {
		datasets: [{
			data: [progm.toFixed(2), fatgm.toFixed(2), carbgm.toFixed(2), fibgm.toFixed(2)],
			backgroundColor: [
			'rgba(233, 30, 99, 0.2)',
			'rgba(33, 150, 243, 0.2)',
			'rgba(76, 175, 80, 0.2)',
			'rgba(255, 235, 59, 0.2)'
			],
			borderColor: [
			'rgba(233, 30, 99, 1)',
			'rgba(33, 150, 243, 1)',
			'rgba(76, 175, 80, 1)',
			'rgba(255, 235, 59, 1)'
			],
			borderWidth: 1
		}],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
    'Protein',
    'Fat',
    'Carbohydrates',
    'Fiber'
    ]
};

var myDoughnutChart = new Chart(ctx1, {
	type: 'doughnut',
	data: data
});
}

function showDoughnutCal() {
	var ctx1 = document.getElementById("doughnutCal");

	data = {
		datasets: [{
			data: [procal.toFixed(2), fatcal.toFixed(2), carbcal.toFixed(2)],
			backgroundColor: [
			'rgba(233, 30, 99, 0.2)',
			'rgba(33, 150, 243, 0.2)',
			'rgba(76, 175, 80, 0.2)'
			],
			borderColor: [
			'rgba(233, 30, 99, 1)',
			'rgba(33, 150, 243, 1)',
			'rgba(76, 175, 80, 1)'
			],
			borderWidth: 1
		}],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
    'Protein',
    'Fat',
    'Carbohydrates'
    ]
};

var myDoughnutChart = new Chart(ctx1, {
	type: 'doughnut',
	data: data
});
}

function calcCalIntake(exerlevel)
{
	switch(exerlevel) {
		case 'little':
		calIntake = 1.2 * bmr;
		break;
		case 'light':
		calIntake = 1.375 * bmr;
		break;
		case 'moderate':
		calIntake = 1.5 * bmr;
		break;
		case 'heavy':
		calIntake = 1.725 * bmr;
		break;
		case 'vheavy':
		calIntake = 1.9 * bmr;
		break;
		default:
		break;
	}
}

function calcTgtCalories(goal){
	switch(goal) {
		case 'bulk':
		tgtCalories = bmr + 500;
		break;
		case 'eathealthy':
		tgtCalories = bmr;
		break;
		case 'lose':
		tgtCalories = bmr - 500;
		break;
		case 'protein':
		tgtCalories = bmr;
		break;
		default:
		break;
	}
}

function calcGrams() {
//fat
if (tgtCalories <= 1600) {
	fatgm = 53;
}
else if (tgtCalories > 1600 && tgtCalories <= 2000) {
	fatgm = 65;
}
else if (tgtCalories > 2000 && tgtCalories <= 2200) {
	fatgm = 73;
}
else if (tgtCalories > 2200 && tgtCalories <= 2500) {
	fatgm = 80;
}
else if (tgtCalories > 2500) {
	fatgm = 93;
}

//protein
if (goal == "protein") {
	if (exerlevel == "little") {
		progm = (0.96*weight);
	}
	else if (exerlevel == "light") {
		progm = (1.2*weight);
	}
	else if (exerlevel == "moderate") {
		progm = (1.32*weight);
	}
	else if (exerlevel == "heavy") {
		progm = (1.43*weight);
	}
	else if (exerlevel == "vheavy") {
		progm = (1.5*weight);
	}
}
else {
	if (exerlevel == "little") {
		progm = (0.8*weight);
	}
	else if (exerlevel == "light") {
		progm = (1*weight);
	}
	else if (exerlevel == "moderate") {
		progm = (1.1*weight);
	}
	else if (exerlevel == "heavy") {
		progm = (1.3*weight);
	}
	else if (exerlevel == "vheavy") {
		progm = (1.5*weight);
	}
}

//fiber
fibgm = 25;
fatcal = (fatgm * 9);
procal = (progm * 4);
var temp = fatcal + procal;
carbcal = tgtCalories - temp;

carbgm = (carbcal / 4);

}