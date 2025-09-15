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
    "A wizard’s job is to vex chumps quickly in fog."
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