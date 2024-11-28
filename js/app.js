// Load the pirate dictionary
let pirateDictionary = {};

fetch('js/pirateDictionary.json')
    .then(response => response.json())
    .then(data => {
        pirateDictionary = data;
    })
    .catch(error => console.error('Error loading pirate dictionary:', error));

// Handle translation
document.getElementById('translateButton').addEventListener('click', () => {
    const input = document.getElementById('userInput').value;
    const errorMessage = document.getElementById('errorMessage');
    if (input.trim() === '') {
        errorMessage.style.display = 'block';
        return;
    }
    errorMessage.style.display = 'none';
    const translatedText = Math.random() < 0.2 ? "ROARRRRRRRRRRRRR" : translateToPirate(input); // 20% chance to say "Make dinosaur sounds!"
    document.getElementById('translatedOutput').textContent = translatedText;
});

// Clear input and output
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('userInput').value = '';
    document.getElementById('translatedOutput').textContent = 'Ahoy! Yer message appears \'ere.';
    document.getElementById('errorMessage').style.display = 'none';
});

// Provide an example
document.getElementById('exampleButton').addEventListener('click', () => {
    const exampleText = "Hello friend, how are you?";
    document.getElementById('userInput').value = exampleText;
    const translatedText = translateToPirate(exampleText);
    document.getElementById('translatedOutput').textContent = translatedText;
});

// Translate text into pirate speak
function translateToPirate(text) {
    return text.split(' ').map(word => {
        const lowerCaseWord = word.toLowerCase().replace(/[^a-z]/g, '');
        const translatedWord = pirateDictionary[lowerCaseWord] || word;
        const punctuation = word.match(/[^a-z]$/i);
        return punctuation ? translatedWord + punctuation[0] : translatedWord;
    }).join(' ');
}
