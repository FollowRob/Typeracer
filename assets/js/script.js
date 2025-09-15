function setDifficulty(level) {
    document.getElementById("difficultyDropdownBtn").textContent =
      level;
    document.getElementById("difficultyInput").value = level;
  }

  // Typing test sample texts by difficulty
const typingSamples = {
  Easy: [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "A wizards job is to vex chumps quickly in fog."
  ],
  Medium: [
    "Sphinx of black quartz, judge my vow and quickly jump.",
    "The five boxing wizards jump quickly over the lazy dog.",
    "How razorback-jumping frogs can level six piqued gymnasts!"
  ],
  Hard: [
    "Jinxed wizards pluck ivy from the big quilt by the cozy window.",
    "Crazy Frederick bought many very exquisite opal jewels.",
    "We promptly judged antique ivory buckles for the next prize."
  ]
};

// Utility to get a random sample from an array
function getRandomSample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Set sample text based on current difficulty
function updateSampleText() {
  const difficulty = document.getElementById('difficultyInput').value;
  const sampleText = getRandomSample(typingSamples[difficulty]);
  document.getElementById('sampleText').textContent = sampleText;
}

// Called when user selects a difficulty
function setDifficulty(level) {
  document.getElementById('difficultyDropdownBtn').textContent = level;
  document.getElementById('difficultyInput').value = level;
  updateSampleText();
}

// Initialize with a random sample on page load
document.addEventListener('DOMContentLoaded', () => {
  updateSampleText();
});

let testStartTime = null;
let testEndTime = null;

// Start the typing test
function startTest() {
  testStartTime = performance.now();
  testEndTime = null;
  document.getElementById('startBtn').disabled = true;
  document.getElementById('stopBtn').disabled = false;
  document.getElementById('typingInput').value = '';
  document.getElementById('typingInput').focus();
  document.getElementById('resultTime').textContent = '-';
}

// Reset the typing test
function resetTest() {
  testStartTime = null;
  testEndTime = null;
  document.getElementById('typingInput').value = '';
  document.getElementById('resultTime').textContent = '-';
  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;
  updateSampleText();
}

// Attach event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  updateSampleText();
  document.getElementById('startBtn').addEventListener('click', startTest);
  document.getElementById('stopBtn').addEventListener('click', stopTest);
  document.getElementById('retryBtn').addEventListener('click', resetTest);
  // Initial button states
  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;
});

// Helper to count correctly typed words
function countCorrectWords(sample, userInput) {
  const sampleWords = sample.trim().split(/\s+/);
  const userWords = userInput.trim().split(/\s+/);
  let correct = 0;
  for (let i = 0; i < Math.min(sampleWords.length, userWords.length); i++) {
    if (sampleWords[i] === userWords[i]) {
      correct++;
    }
  }
  return correct;
}

// Stop the typing test and display the time, WPM, and level
function stopTest() {
  if (testStartTime === null) return;
  testEndTime = performance.now();
  const elapsedSeconds = ((testEndTime - testStartTime) / 1000);
  const elapsedSecondsRounded = elapsedSeconds.toFixed(2);
  document.getElementById('resultTime').textContent = `${elapsedSecondsRounded} s`;

  // Get sample and user input
  const sampleText = document.getElementById('sampleText').textContent;
  const userInput = document.getElementById('typingInput').value;

  // Calculate correct words and WPM
  const correctWords = countCorrectWords(sampleText, userInput);
  const wpm = elapsedSeconds > 0 ? Math.round((correctWords / elapsedSeconds) * 60) : 0;
  document.getElementById('resultWpm').textContent = wpm;

  // Display difficulty level
  const difficulty = document.getElementById('difficultyInput').value;
  document.getElementById('resultLevel').textContent = difficulty;

  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;
}

// Add a div for highlighted feedback below the sample text if not present
function addHighlightDivIfNeeded() {
  if (!document.getElementById('highlightedSampleText')) {
    const sampleTextDiv = document.getElementById('sampleText');
    const highlightDiv = document.createElement('div');
    highlightDiv.id = 'highlightedSampleText';
    highlightDiv.style.minHeight = '48px';
    highlightDiv.style.marginTop = '8px';
    highlightDiv.style.fontFamily = 'inherit';
    highlightDiv.style.wordBreak = 'break-word';
    sampleTextDiv.parentNode.insertBefore(highlightDiv, sampleTextDiv.nextSibling);
  }
}

// Highlight correct and incorrect words as the user types
function highlightTypingAccuracy() {
  addHighlightDivIfNeeded();
  const sampleText = document.getElementById('sampleText').textContent;
  const userInput = document.getElementById('typingInput').value;

  const sampleWords = sampleText.trim().split(/\s+/);
  const userWords = userInput.trim().split(/\s+/);

  let highlighted = '';
  for (let i = 0; i < sampleWords.length; i++) {
    let word = sampleWords[i];
    if (userWords[i] !== undefined && userWords[i].length > 0) {
      if (userWords[i] === word) {
        highlighted += '<span style="color: blue; font-weight: bold;">' + word + '</span>';
      } else {
        highlighted += '<span style="color: red; font-weight: bold;">' + word + '</span>';
      }
    } else {
      highlighted += '<span>' + word + '</span>';
    }
    if (i < sampleWords.length - 1) highlighted += ' ';
  }
  document.getElementById('highlightedSampleText').innerHTML = highlighted;
}

// Update highlight when sample text changes
function updateSampleText() {
  const difficulty = document.getElementById('difficultyInput').value;
  const sampleText = getRandomSample(typingSamples[difficulty]);
  document.getElementById('sampleText').textContent = sampleText;
  highlightTypingAccuracy();
}

// Reset highlight on retry or new sample
function resetTest() {
  testStartTime = null;
  testEndTime = null;
  document.getElementById('typingInput').value = '';
  document.getElementById('resultTime').textContent = '-';
  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;
  updateSampleText();
  highlightTypingAccuracy();
}

// Attach real-time feedback event
document.addEventListener('DOMContentLoaded', function() {
  addHighlightDivIfNeeded();
  document.getElementById('typingInput').addEventListener('input', highlightTypingAccuracy);
  // ...existing code...
});
