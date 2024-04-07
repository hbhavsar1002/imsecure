const inputPassword = document.querySelector('.input-text');
const charCount = document.querySelector('.input-charlength');
let previousCount = 0;
let correct = false;
let ruleNumber = 1;
let previousRuleNumber = 0;

const charCounter = (currentCount) =>{
	
    console.log('User input char:', currentCount);
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
	console.log(previousCount);
}

const setCorrect = (ruleNumber) =>{
	let ruleTileIDNumber = '#rule-' + ruleNumber;
	alert(ruleTileIDNumber);
	let ruleTiles = document.querySelector(ruleTileIDNumber);
	alert(ruleTiles);
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
	alert("incoorect");
	let ruleTileIDNumber = '#rule-' + ruleNumber;
	alert(ruleTileIDNumber);
	let ruleTiles = document.querySelector(ruleTileIDNumber);
	alert(ruleTiles);
	var computedValue = getComputedStyle(document.documentElement).getPropertyValue('--red-up');
	ruleTiles.style.setProperty('--rule-number', computedValue);
	ruleTiles.style.setProperty('--rule-text', 'var(--red-down)');
	ruleTiles.style.setProperty('--rule-border', 'var(--red-broder)');
	let ruleIDNumber = '#rule-icon-' + ruleNumber;
	var ruleIcon = document.querySelector(ruleIDNumber);
	ruleIcon.src = 'app//asset//error.svg';
}

const checkRule = (ruleNumber, currentCount) =>{
	if (ruleNumber == 1){
		setError(ruleNumber,'Your password must be atleast 5 characters long.')
		if(currentCount >= 5){
			setCorrect(ruleNumber);
			ruleNumber += 1;
			checkRule(ruleNumber, currentCount)
		}
	}
	else if(ruleNumber == 2){
		setError(ruleNumber,'Your password must contain an uppercase letter.')
		if(/[A-Z]/.test(inputPassword.innerText)){
			setCorrect(ruleNumber);
			ruleNumber += 1;
			checkRule(ruleNumber, currentCount)
		}
	}else if(ruleNumber == 3){
		
		
		if(/[^a-zA-Z0-9]/.test(inputPassword.innerText)){
			setError(ruleNumber, 'Your password must contain special character.');
			setCorrect(ruleNumber);
			ruleNumber += 1;
			checkRule(ruleNumber, currentCount)
			previousRuleNumber = ruleNumber;

		}else{
			if(previousRuleNumber >= 4){
				setIncorrect(ruleNumber);
			}else{
				setError(ruleNumber, 'Your password must contain special character.');
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
        console.log('Section with rule number ' + ruleNumber + ' already exists.');
        return; // Exit the function if the section already exists
    }
    // Create elements
    var section = document.createElement('section');
    section.className = 'rule';
	section.id = 'rule-' + ruleNumber;
    
    var ruleContain = document.createElement('div');
    ruleContain.className = 'rule-contain';
    
    var ruleContainer = document.createElement('div');
    ruleContainer.className = 'rule-container';
    
    var ruleNumberDiv = document.createElement('div');
    ruleNumberDiv.className = 'rule-number';
    
    var ruleIcon = document.createElement('img');
    ruleIcon.className = 'rule-icon';
	ruleIcon.id = 'rule-icon-' + ruleNumber;
	ruleIcon.setAttribute('src', 'app\\asset\\error.svg'); 
    
    var ruleNoSpan = document.createElement('span');
    ruleNoSpan.className = 'rule-no';
    ruleNoSpan.textContent = ruleNumber; // Set rule number
    
    ruleNumberDiv.appendChild(ruleIcon);
    ruleNumberDiv.appendChild(document.createTextNode('Rule '));
    ruleNumberDiv.appendChild(ruleNoSpan);
    
    var ruleDescDiv = document.createElement('div');
    ruleDescDiv.className = 'rule-desc';
    ruleDescDiv.textContent = ruleDesc; // Set rule description
    
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
