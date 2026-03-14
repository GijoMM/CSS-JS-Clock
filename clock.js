const secondHand = document.querySelector('.second-hand');
const minutesHand = document.querySelector('.min-hand');
const hoursHand = document.querySelector('.hour-hand');
const hands = document.querySelectorAll('.hand'); // Using querySelectorAll per instructions

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const minutes = now.getMinutes();
  const minutesDegrees = ((minutes / 60) * 360) + 90;
  minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = ((hours / 12) * 360) + 90;
  hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

function removeTransition(e) {
  // Logic to remove transition if needed
}

// Attach event listeners to all hands outside of setDate
hands.forEach(hand => hand.addEventListener('transitioned', removeTransition));

// Run setup only if we are in the browser
if (typeof window !== 'undefined') {
  setInterval(setDate, 1000);
  setDate(); // Initial call to avoid jump
}

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { setDate, removeTransition };
}
