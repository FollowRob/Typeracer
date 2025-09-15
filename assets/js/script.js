function setDifficulty(level) {
    document.getElementById("difficultyDropdownBtn").textContent =
      level;
    document.getElementById("difficultyInput").value = level;
  }