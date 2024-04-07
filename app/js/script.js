	const inputPassword = document.querySelector('.input-text');
	const charCount = document.querySelector('.input-charlength');
	let previousCount = 0;
	let correct = false;
	let ruleNumber = 1;
	let previousRuleNumber = 0;
	let globalCaptcha = "";

	const charCounter = (currentCount) =>{
		
		//console.log('User input char:', currentCount);
		charCount.innerText = currentCount;
		charCount.style.opacity = '0'; 

		if(currentCount == 1 && previousCount != 2){
			setTimeout(function() {
				charCount.style.opacity = '1'; // Fade in the text
			}, 400); // Adjust the delay as needed
		}
		else if (currentCount == 0){
			setTimeout(function() {
				charCount.style.opacity = '0'; // Fade in the text
			}, 400);
		}else{
			charCount.style.opacity = '1';
		}

		previousCount = currentCount;
		//console.log(previousCount);
	}

	const setCorrect = (ruleNumber) =>{
		
		let ruleTileIDNumber = '#rule-' + ruleNumber;
		alert("correct" + ruleTileIDNumber);
		let ruleTiles = document.querySelector(ruleTileIDNumber);
		var computedValue = getComputedStyle(document.documentElement).getPropertyValue('--green-up');
		ruleTiles.style.setProperty('--rule-number', computedValue);
		ruleTiles.style.setProperty('--rule-text', 'var(--green-down)');
		ruleTiles.style.setProperty('--rule-border', 'var(--green-broder)');
		let ruleIDNumber = '#rule-icon-' + ruleNumber;
		var ruleIcon = document.querySelector(ruleIDNumber);
		ruleIcon.src = 'app//asset//checkmark.svg';
	}

	const setError = (number,desc) =>{
		createRuleSection(number, desc);
	}

	const setIncorrect = (ruleNumber) =>{
		
		let ruleTileIDNumber = '#rule-' + ruleNumber;
		alert("incoorect" + ruleTileIDNumber);
		let ruleTiles = document.querySelector(ruleTileIDNumber);
		var computedValue = getComputedStyle(document.documentElement).getPropertyValue('--red-up');
		ruleTiles.style.setProperty('--rule-number', computedValue);
		ruleTiles.style.setProperty('--rule-text', 'var(--red-down)');
		ruleTiles.style.setProperty('--rule-border', 'var(--red-broder)');
		let ruleIDNumber = '#rule-icon-' + ruleNumber;
		var ruleIcon = document.querySelector(ruleIDNumber);
		ruleIcon.src = 'app//asset//error.svg';
	}

	function isPrime(passwordLength) {
		if (passwordLength < 2) {
		  return false;
		}
	  
		for (let i = 2; i <= Math.sqrt(passwordLength); i++) {
		  if (passwordLength % i === 0) {
			return false;
		  }
		}
	  
		return true;
	  }

	const checkRule = (ruleNumber, currentCount) =>{
		if (ruleNumber == 10){
			
			if(currentCount >= 5){
				setError(ruleNumber,'Your password must be atleast 5 characters long.')
				setCorrect(ruleNumber);
				ruleNumber += 1;
				checkRule(ruleNumber, currentCount);
				if(ruleNumber > previousRuleNumber ){
					previousRuleNumber = ruleNumber;
				}
				
			}else{
				if(previousRuleNumber >= 2){
					setIncorrect(ruleNumber);
					checkRule(2, currentCount);
				}else{
					setError(ruleNumber,'Your password must be atleast 5 characters long.')
				}
				
			}
		}
		else if(ruleNumber == 2){
			
			if(/[A-Z]/.test(inputPassword.innerText)){
				setError(ruleNumber,'Your password must contain an uppercase letter.')
				setCorrect(ruleNumber);
				ruleNumber += 1;
				checkRule(ruleNumber, currentCount)
				if(ruleNumber > previousRuleNumber ){
					previousRuleNumber = ruleNumber;
				}
				

			}else{
				if(previousRuleNumber >= 3){
					setIncorrect(ruleNumber);
					checkRule(3, currentCount);
				}else{
					setError(ruleNumber,'Your password must be atleast 5 characters long.')
				}
				
			}
		}else if(ruleNumber == 3){
			
			if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(inputPassword.innerText)){
				setError(ruleNumber, 'Your password must contain special character.');
				setCorrect(ruleNumber);
				ruleNumber += 1;
				checkRule(ruleNumber, currentCount)
				if(ruleNumber > previousRuleNumber ){
					previousRuleNumber = ruleNumber;
				}
				

			}else{
				if(previousRuleNumber >= 4){
					setIncorrect(ruleNumber);
					checkRule(4, currentCount);
				}else{
					setError(ruleNumber, 'Your password must contain special character.');
				}
				
				
			}
		}else if (ruleNumber == 4) {
			alert("rule 4");
			const regex = /\d/;
			if (regex.test(inputPassword.innerText)) {
				setError(ruleNumber, "Your passowrd must contain atleast one number");
				setCorrect(ruleNumber);
				ruleNumber += 1;
				checkRule(ruleNumber, currentCount);
				if(ruleNumber > previousRuleNumber ){
					previousRuleNumber = ruleNumber;
				}
			} else {
			  if (previousRuleNumber >= 5) {
				setIncorrect(ruleNumber);
				checkRule(5, currentCount);
			  } else {
				setError(ruleNumber, "Your password must contain atleast one number ");
			}
			
			}
		}else if(ruleNumber ==  5){

			const romanNumerals = [
				"I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
				"XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
				"XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX",
				"XXXI", "XXXII", "XXXIII", "XXXIV", "XXXV", "XXXVI", "XXXVII", "XXXVIII", "XXXIX", "XL",
				"XLI", "XLII", "XLIII", "XLIV", "XLV", "XLVI", "XLVII", "XLVIII", "XLIX", "L",
				"LI", "LII", "LIII", "LIV", "LV", "LVI", "LVII", "LVIII", "LIX", "LX",
				"LXI", "LXII", "LXIII", "LXIV", "LXV", "LXVI", "LXVII", "LXVIII", "LXIX", "LXX",
				"LXXI", "LXXII", "LXXIII", "LXXIV", "LXXV", "LXXVI", "LXXVII", "LXXVIII", "LXXIX", "LXXX",
				"LXXXI", "LXXXII", "LXXXIII", "LXXXIV", "LXXXV", "LXXXVI", "LXXXVII", "LXXXVIII", "LXXXIX", "XC",
				"XCI", "XCII", "XCIII", "XCIV", "XCV", "XCVI", "XCVII", "XCVIII", "XCIX", "C"
			];

			let containsRoman =  false;

			for (let i = 0; i < romanNumerals.length; i++) {
				if (inputPassword.innerText.includes(romanNumerals[i])) {
					containsRoman = true;
				}
			}

			if (containsRoman) {
				setError(ruleNumber, "Your passowrd must contain Roman Numeral");
				setCorrect(ruleNumber);
				ruleNumber += 1;
				checkRule(ruleNumber, currentCount);
				if(ruleNumber > previousRuleNumber ){
					previousRuleNumber = ruleNumber;
				}
			} else {
			  if (previousRuleNumber >= 6) {
				setIncorrect(ruleNumber);
				checkRule(6, currentCount);
			  } else {
				setError(ruleNumber, "Your passowrd must contain Roman Numeral");
			}
			
			}

		}else if(ruleNumber ==  6){

			let digits = inputPassword.innerText.replace(/\D/g, '').split('');
			let sum = digits.reduce((acc, curr) => acc + parseInt(curr), 0);

			if (sum == 25) {
				setError(ruleNumber, "Sum of the digits in the password must be equal to 25");
				setCorrect(ruleNumber);
				ruleNumber += 1;
				checkRule(ruleNumber, currentCount);
				if(ruleNumber > previousRuleNumber ){
					previousRuleNumber = ruleNumber;
				}
			} else {
			  if (previousRuleNumber >= 7) {
				setIncorrect(ruleNumber);
				checkRule(7, currentCount);
			  } else {
				setError(ruleNumber, "Sum of the digits in the password must be equal to 25");
			}
			
			}
		}else if(ruleNumber ==  7){

			const desiredPhrases = ["i am loved", "i am worthy", "i am enough", "i am secure"];
			const pattern = new RegExp(desiredPhrases.join("|"), "ig");
			const matches = inputPassword.innerText.match(pattern);

			if (matches !== null && matches.length === 1) {
				setError(ruleNumber, "Your password must contain one of \"i am loved\", \"i am worthy\", \"i am enough\", \"i am loved\"");
				setCorrect(ruleNumber);
				ruleNumber += 1;
				checkRule(ruleNumber, currentCount);
				if(ruleNumber > previousRuleNumber ){
					previousRuleNumber = ruleNumber;
				}
			} else {
			  if (previousRuleNumber >= 8) {
				setIncorrect(ruleNumber);
				checkRule(8, currentCount);
			  } else {
				setError(ruleNumber, "Your password must contain one of \"i am loved\", \"i am worthy\", \"i am enough\", \"i am loved\"");
			}
			
			}
		}else if(ruleNumber ==  8){
			let yourDate = new Date()
			const url = "https://neal.fun/api/password-game/wordle?date="+ yourDate.toISOString().split('T')[0]
			fetch(url)
			.then(response => {
				// Check if the request was successful (status code 200)
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				// Parse the JSON response
				return response.json();
			})
			.then(data => {
				// Do something with the fetched data
				const answer = data.answer.toLowerCase();
				console.log("Wordle answer:", answer);
				if (inputPassword.innerText.toLowerCase().includes(answer)) {
					//console.log("Wordle answer:", answer);
					setError(ruleNumber, "Your password must contain today's ");
					setCorrect(ruleNumber);
					ruleNumber += 1;
					checkRule(ruleNumber, currentCount);
					if(ruleNumber > previousRuleNumber ){
						previousRuleNumber = ruleNumber;
					}
				}else{
					if (previousRuleNumber >= 9) {
						setIncorrect(ruleNumber);
						checkRule(9, currentCount);
					  } else {
						setError(ruleNumber, "Your password must contain today's ");
					}
				}
			})
			.catch(error => {
				// Handle errors
				console.error("Fetch error:", error);
				
			});
		}else if(ruleNumber ==  9){

			let currentTime = new Date();
			let currentHour = currentTime.getHours();
			let currentMinutes = currentTime.getMinutes();
			let time = currentHour + ':' + currentMinutes;

			if (inputPassword.innerText.includes(time)) {
				setError(ruleNumber, "Your password must contain current time in HH:MM format.");
				setCorrect(ruleNumber);
				ruleNumber += 1;
				checkRule(ruleNumber, currentCount);
				if(ruleNumber > previousRuleNumber ){
					previousRuleNumber = ruleNumber;
				}
			} else {
			  if (previousRuleNumber >= 10) {
				setIncorrect(ruleNumber);
				checkRule(11, currentCount);
			  } else {
				setError(ruleNumber, "Your password must contain current time in HH:MM format.");
			}
			
			}
		}
		else if(ruleNumber ==  10){
			if (isPrime(inputPassword.innerText.length)) {
				setError(ruleNumber, "Your password length must be a prime number.");
				setCorrect(ruleNumber);
				ruleNumber += 1;
				checkRule(ruleNumber, currentCount);
				if(ruleNumber > previousRuleNumber ){
					previousRuleNumber = ruleNumber;
				}
			} else {
			  if (previousRuleNumber >= 11) {
				setIncorrect(ruleNumber);
				checkRule(11, currentCount);
			  } else {
				setError(ruleNumber, "Your password length must be a prime number.");
			}
			
			}
		}
		else if(ruleNumber ==  11){

			const uppercaseVowels = ['A', 'E', 'I', 'O', 'U'];
			let vowelFlag = true;
			let vowelPresent = false;

			for (let i = 0; i < inputPassword.innerText.length; i++) {
				if(uppercaseVowels.includes(inputPassword.innerText[i].toUpperCase())){
					vowelPresent = true;
					if(uppercaseVowels.includes(inputPassword.innerText[i])){
						//do nothing

					}
					else{
						vowelFlag = false;
						break;
					}
				}
			}

			if (vowelFlag && vowelPresent) {
				setError(ruleNumber, "Your password must have all the vowels in uppercase.");
				setCorrect(ruleNumber);
				ruleNumber += 1;
				checkRule(ruleNumber, currentCount);
				if(ruleNumber > previousRuleNumber ){
					previousRuleNumber = ruleNumber;
				}
			} else {
			  if (previousRuleNumber >= 12) {
				setIncorrect(ruleNumber);
				checkRule(12, currentCount);
			  } else {
				setError(ruleNumber, "Your password must have all the vowels in uppercase.");
			}
			
			}
		}
		else if(ruleNumber ==  12){
			if(globalCaptcha.length == 0){
				const captchaChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
				let captchlength = 6;
				let captcha = [];
				for (let i = 0; i < captchlength; i++) {
				
					let index = Math.floor(Math.random() * captchaChars.length + 1); 
					if (captcha.indexOf(captchaChars[index]) == -1){
						captcha.push(captchaChars[index]);
					}
					else {
						i--;
					}
				  }
				globalCaptcha = captcha.join("");
			}

			if (inputPassword.innerText.includes(globalCaptcha)) {
				setError(ruleNumber, "Your password must have the following captcha.");
				setCorrect(ruleNumber);
				ruleNumber += 1;
				const won = document.querySelector('.won');
				won.classList.remove('inactive');
				if(ruleNumber > previousRuleNumber ){
					previousRuleNumber = ruleNumber;
				}
			} else {
			  if (previousRuleNumber >= 13) {
				setIncorrect(ruleNumber);
				checkRule(13, currentCount);
			  } else {
				setError(ruleNumber, "Your password must have the following captch.");
			}
			
			}
		}
	}


	

	const performRules = (currentCount) =>{

		setTimeout(function() {
			checkRule(ruleNumber, currentCount);
		}, 200);
	}


	inputPassword.addEventListener('input', function() {
		// Handle user input
		let currentCount = this.innerText.length;

		performRules(currentCount);

		charCounter(currentCount);
		
	});

	const createdRuleNumbers = [];


	// Define a function to create a new rule section
	const createRuleSection = (ruleNumber, ruleDesc) =>{

		if (createdRuleNumbers.includes(ruleNumber)) {
			// Exit the function if the section already exists
			return; 
		}
		// Create elements
		const section = document.createElement('section');
		section.className = 'rule';
		section.id = 'rule-' + ruleNumber;
		
		const ruleContain = document.createElement('div');
		ruleContain.className = 'rule-contain';
		
		const ruleContainer = document.createElement('div');
		ruleContainer.className = 'rule-container';
		
		const ruleNumberDiv = document.createElement('div');
		ruleNumberDiv.className = 'rule-number';
		
		const ruleIcon = document.createElement('img');
		ruleIcon.className = 'rule-icon';
		ruleIcon.id = 'rule-icon-' + ruleNumber;
		ruleIcon.setAttribute('src', 'app\\asset\\error.svg'); 
		
		const ruleNoSpan = document.createElement('span');
		ruleNoSpan.className = 'rule-no';
		ruleNoSpan.textContent = ruleNumber; // Set rule number
		
		ruleNumberDiv.appendChild(ruleIcon);
		ruleNumberDiv.appendChild(document.createTextNode('Rule '));
		ruleNumberDiv.appendChild(ruleNoSpan);
		
		const ruleDescDiv = document.createElement('div');
		ruleDescDiv.className = 'rule-desc';
		ruleDescDiv.textContent = ruleDesc; 

		if(ruleNumber == 8){
			const link = document.createElement('a');
			link.href = "https://www.nytimes.com/games/wordle/index.html";
			link.textContent = " Wordle";
			link.target = "_blank";
			link.className = 'rule-link';
			ruleDescDiv.appendChild(link);
	
			ruleDescDiv.appendChild(document.createTextNode(" answer."));
		}

		if(ruleNumber == 1){
			
			const canv = document.createElement("canvas");
			canv.className = "rule-captcha";
			canv.width = 120;
			canv.height = 50;
			let ctx = canv.getContext("2d");
			ctx.font = "25px Montserrat";
			ctx.strokeText(globalCaptcha, 0, 30);
			ruleDescDiv.appendChild(canv);
		}

		
		var ruleCharLength = document.createElement('div');
		ruleCharLength.className = 'rule-charlength';
		
		// Append elements
		ruleContainer.appendChild(ruleNumberDiv);
		ruleContainer.appendChild(ruleDescDiv);
		
		ruleContain.appendChild(ruleContainer);
		ruleContain.appendChild(ruleCharLength);
		
		section.appendChild(ruleContain);
		
		// Append the new section to the document body or another container element
		document.body.appendChild(section);

		createdRuleNumbers.push(ruleNumber);
		
		setTimeout(function() {
			section.classList.add('fade-in');
		}, 100);
	}
