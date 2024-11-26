document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const translateButton = document.getElementById('translate-button');
    const saveButton = document.getElementById('save-button');
    const translatedText = document.getElementById('translated-text');
    const speechBubble = document.getElementById('speech-bubble');
    const historyList = document.getElementById('history-list');
    const displayedInput = document.getElementById('displayed-input');
    const clearHistoryButton = document.getElementById('clear-history-button');

    let pirateDictionary = {};

    fetch('js/pirateDictionary.json')
        .then(response => response.json())
        .then(data => {
            pirateDictionary = data;
            console.log('Pirate dictionary loaded:', pirateDictionary); // Debugging line
        })
        .catch(error => {
            console.error('Error loading pirate dictionary:', error);
        });

    const translateToPirateSpeak = (text) => {
        return text.split(' ').map(word => pirateDictionary[word.toLowerCase()] || word).join(' ');
    };

    const addToHistory = (text) => {
        const listItem = document.createElement('li');
        listItem.textContent = text;
        historyList.appendChild(listItem);
    };

    translateButton.addEventListener('click', () => {
        const inputText = userInput.value.trim();

        if (!inputText) {
            translatedText.textContent = "Arrr! Enter somethin', ye scallywag!";
        } else {
            const translation = translateToPirateSpeak(inputText);
            translatedText.textContent = translation;
            displayedInput.textContent = inputText;
            addToHistory(translation);
        }

        speechBubble.style.display = 'block';

        setTimeout(() => {
            speechBubble.style.display = 'none';
        }, 3000);
    });

    saveButton.addEventListener('click', () => {
        const blob = new Blob([translatedText.textContent], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "translatedText.txt");
    });

    clearHistoryButton.addEventListener('click', () => {
        historyList.innerHTML = '';
    });
});
