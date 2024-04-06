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



const apiKey = '5e72a621';
const movieTitle = 'The Matrix';

const url = "http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}";

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.Response === 'True') {
      console.log('Movie found:', data.Title);
      // Additional processing of movie data
    } else {
      console.log('Movie not found:', data.Error);
    }
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
  });