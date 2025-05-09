// Initialize Firebase with your config
const firebaseConfig = {
        apiKey: "AIzaSyAxb6WvLi_gnGNYRuypXX_DG66xXs38Guk",
        authDomain: "restaurent-website-daa7f.firebaseapp.com",
        databaseURL: "https://restaurent-website-daa7f-default-rtdb.firebaseio.com",
        projectId: "restaurent-website-daa7f",
        storageBucket: "restaurent-website-daa7f.firebasestorage.app",
        messagingSenderId: "472166430674",
        appId: "1:472166430674:web:c3e1336043cbce5e347a0b"
};


  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Submit review function
  function setupReviewForm() {
    const reviewForm = document.getElementById('reviewForm');
    if (!reviewForm) return;
  
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const rating = document.getElementById('rating').value;
      const reviewText = document.getElementById('review').value;
      
      const newReviewRef = database.ref('reviews').push();
      newReviewRef.set({
        name: name,
        email: email,
        rating: rating,
        review: reviewText,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        alert('Thank you for your review!');
        reviewForm.reset();
        loadReviews();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert('Error: ' + error.message);
      });
    });
  }
  
  // Run when page loads
  window.addEventListener('DOMContentLoaded', () => {
    setupReviewForm();
    loadReviews();
  });
