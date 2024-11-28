// You can access the RESULTS_MAP from "constants.js" in this file
// since "constants.js" has been included before "script.js" in index.html

// Uncheck the item
function changeToUnchecked(questionName) {
    const id = currentAnswer[questionName];
    const index = "[data-choice-id='" + id + "']"; // Updated selector
    const items = document.querySelectorAll(index);
    for (let item of items) {
        if (item.dataset.questionId === questionName) {
            const image = item.querySelector('.checkbox');
            image.src = 'images/unchecked.png';
            item.style.backgroundColor = '#f4f4f4';
        }
    }
}

// Change the opacity of unchosen images
function changeOpacity(question, itemNoChange) {
    const index = "[data-question-id='" + question + "']";
    const items = document.querySelectorAll(index);
    for (let item of items) {
        if (!(item === itemNoChange)) {
            item.style.opacity = '0.6';
        }
    }
}

// Refresh the web page to re-do the quiz
function refreshWeb() {
    document.location.href = "index.html";
}

// Users cannot change the answer when three questions are already picked
function lockToAnswer() {
    if (currentAnswer['one'] && currentAnswer['two'] && currentAnswer['three']) {
        // Lock all the event-listeners
        for (let item of itemList) {
            item.removeEventListener('click', changeToChecked);
        }
        // Show the result
        let output = document.querySelector('.result');
        let outputTitle = document.querySelector('.result #result-title');
        let outputContent = document.querySelector('.result #result-contents');
        if (currentAnswer['three'] === currentAnswer['two']) {
            outputTitle.innerHTML = "You got: " + RESULTS_MAP[currentAnswer['two']]['title'];
            outputContent.innerHTML = RESULTS_MAP[currentAnswer['two']]['contents'];
        } else {
            outputTitle.innerHTML = "You got: " + RESULTS_MAP[currentAnswer['one']]['title'];
            outputContent.innerHTML = RESULTS_MAP[currentAnswer['one']]['contents'];
        }
        output.style.display = 'block';
        // Restart Button for listening
        const restartBtn = document.querySelector('#restart-quiz');
        restartBtn.addEventListener('click', refreshWeb);
    }
}

// Change the item to the checked status
function changeToChecked(event) {
    const item = event.currentTarget;
    const image = item.querySelector('.checkbox');
    image.src = 'images/checked.png';
    item.style.backgroundColor = '#cfe3ff';
    item.style.opacity = '1';
    const questionPicked = item.dataset.questionId;
    if (currentAnswer[questionPicked]) {
        changeToUnchecked(questionPicked);
    }
    changeOpacity(questionPicked, item);
    currentAnswer[questionPicked] = item.dataset.choiceId;
    lockToAnswer();
}

// Main Function
var currentAnswer = { // Store the answers of the three questions
    'one': '',
    'two': '',
    'three': ''
};

var itemList = document.querySelectorAll('.choice-grid div');
for (const item of itemList) {
    item.addEventListener('click', changeToChecked);
}
