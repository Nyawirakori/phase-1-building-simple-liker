// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners to all "like" list items
  const likeLiElements = document.querySelectorAll(".like");
  likeLiElements.forEach(likeElement => {
    likeElement.addEventListener("click", likeClicking);
  });
  
  function likeClicking(event) {
    event.preventDefault();
    const heart = event.currentTarget.querySelector(".like-glyph");
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    
    if (heart.textContent === EMPTY_HEART) {
      // If heart is empty, attempt to like
      mimicServerCall()
        .then(() => {
          // Success - change to full heart and add class
          heart.textContent = FULL_HEART;
          heart.classList.add("activated-heart");
        })
        .catch((error) => {
          // Error handling
          modalMessage.textContent = error;
          modal.classList.remove("hidden");
          
          // Hide modal after 3 seconds
          setTimeout(() => {
            modal.classList.add("hidden");
          }, 3000);
        });
    } else {
      // If heart is already full, unlike immediately (no server call)
      heart.textContent = EMPTY_HEART;
      heart.classList.remove("activated-heart");
    }
  }
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}