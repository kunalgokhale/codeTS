var bmr, weight, height, age, calIntake, tgtCalories, exerlevel, sex, goal;

var fatgm, progm, carbgm, fibgm;
var fatcal, procal, carbcal, fibcal;

function calcBMR (sex, weight, height, age)
{
	if (sex = 'male') {
		bmr = (10*weight) + (6.25*height) - (5*age) + 5;
	}
	else {
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
				label: 'Daily Overall Calorie Requirement',
				data: [bmr, tgtCalories],
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
                   // scaleBeginAtZero : true
               }
           }]
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
			data: [progm, fatgm, carbgm, fibgm],
			backgroundColor: [
			'rgba(233, 30, 99, 1)',
			'rgba(33, 150, 243, 1)',
			'rgba(76, 175, 80, 1)',
			'rgba(255, 235, 59, 1)'
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
    // options: circumference
});
}

function showDoughnutCal() {
	var ctx1 = document.getElementById("doughnutCal");

	data = {
		datasets: [{
			data: [procal, fatcal, carbcal, 0],
			backgroundColor: [
			'rgba(233, 30, 99, 1)',
			'rgba(33, 150, 243, 1)',
			'rgba(76, 175, 80, 1)',
			'rgba(255, 235, 59, 1)'
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
    // options: circumference
});
}

function calcCalIntake(exerlevel)
{
	switch(exerlevel) {
		case 'little':
		calIntake = 1.2 * bmr;
		//alert(calIntake);
		break;
		case 'light':
		calIntake = 1.375 * bmr;
		//alert(calIntake);
		break;
		case 'moderate':
		calIntake = 1.5 * bmr;
		//alert(calIntake);
		break;
		case 'heavy':
		calIntake = 1.725 * bmr;
		//alert(calIntake);
		break;
		case 'vheavy':
		calIntake = 1.9 * bmr;
		//alert(calIntake);
		break;
		default:
		break;
	}
}

function calcTgtCalories(goal){
	switch(goal) {
		case 'bulk':
		tgtCalories = bmr + 500;
		//alert(tgtCalories);
		break;
		case 'eathealthy':
		tgtCalories = bmr;
		//alert(tgtCalories);
		break;
		case 'lose':
		tgtCalories = bmr - 500;
		//alert(tgtCalories);
		break;
		case 'protein':
		tgtCalories = bmr;
		//alert(tgtCalories);
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
		progm = 0.96;
	}
	else if (exerlevel == "light") {
		progm = 1.2;
	}
	else if (exerlevel == "moderate") {
		progm = 1.32;
	}
	else if (exerlevel == "heavy") {
		progm = 1.43;
	}
	else if (exerlevel == "vheavy") {
		progm = 1.;
	}
}
else {
	if (exerlevel == "little") {
		progm = 0.8;
	}
	else if (exerlevel == "light") {
		progm = 1;
	}
	else if (exerlevel == "moderate") {
		progm = 1.1;
	}
	else if (exerlevel == "heavy") {
		progm = 1.3;
	}
	else if (exerlevel == "vheavy") {
		progm = 1.5;
	}
}

//fiber
fibgm = 25;
fatcal = fatgm * 9;
procal = progm * 4;
carbcal = tgtCalories - (fatcal + procal);

carbgm = carbcal / 4;

}


