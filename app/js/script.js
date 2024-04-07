

const inputPassword = document.querySelector('.input-text');
const charCount = document.querySelector('.input-charlength');
let previousCount = 0;
let correct = false;
let ruleNumber = 1;

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

const setCorrect = () =>{
	document.documentElement.style.setProperty('--rule-number', 'var(--green-up)');
	document.documentElement.style.setProperty('--rule-text', 'var(--green-down)');
	document.documentElement.style.setProperty('--rule-border', 'var(--green-broder)');
	let ruleIDNumber = '#rule-icon-' + ruleNumber;
	var ruleIcon = document.querySelector(ruleIDNumber);
	ruleIcon.src = 'app//asset//checkmark.svg';
}

const checkRule = (ruleNumber, currentCount) =>{
	if (ruleNumber == 1){
		if(currentCount > 5){
			setCorrect();
		}
	}
}

const performRules = (currentCount) =>{
	
	setTimeout(function() {
		createRuleSection(1, 'Your password must be atleast 5 characters long.');
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
    
    var ruleContain = document.createElement('div');
    ruleContain.className = 'rule-contain';
    
    var ruleContainer = document.createElement('div');
    ruleContainer.className = 'rule-container';
    
    var ruleNumberDiv = document.createElement('div');
    ruleNumberDiv.className = 'rule-number';
    
    var ruleIcon = document.createElement('img');
    ruleIcon.className = 'rule-icon';
	ruleIcon.id = 'rule-icon-' + ruleNumber;
	
    
	if(correct){
		ruleIcon.setAttribute('src', 'app\\asset\\checkmark.svg'); // Set image source
	}else{
		ruleIcon.setAttribute('src', 'app\\asset\\error.svg'); // Set image source
	}
    
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
