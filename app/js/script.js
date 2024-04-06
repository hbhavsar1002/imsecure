console.log('HELLO');

const test = () => {
	console.log('this is a test');
};


const inputPassword = document.querySelector('.input-text');
const charCount = document.querySelector('.input-charlength');
let previousCount = 0;

inputPassword.addEventListener('input', function() {
    // Handle user input
	let currentCount = this.innerText.length;
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
	
});


// Define a function to create a new rule section
function createRuleSection(ruleNumber, ruleDesc) {
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
    ruleIcon.setAttribute('src', 'app\\asset\\error.svg'); // Set image source
    
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
}

createRuleSection(1, 'Your password must include an uppercase letter.');
createRuleSection(2, 'Your password must include an lowercase letter.');
createRuleSection(3, 'Your password must be at least 8 characters long.');
