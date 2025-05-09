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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Handle review form submission
if (document.getElementById('reviewForm')) {
    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const rating = document.getElementById('rating').value;
        const reviewText = document.getElementById('review').value;
        
        // Save to Firebase
        const newReviewRef = database.ref('reviews').push();
        newReviewRef.set({
            name: name,
            email: email,
            rating: rating,
            review: reviewText,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
            alert('Thank you for your review!');
            document.getElementById('reviewForm').reset();
            loadReviews();
        }).catch((error) => {
            alert('Error submitting review: ' + error.message);
        });
    });
    
    // Load existing reviews
    function loadReviews() {
        const reviewsContainer = document.getElementById('reviewsContainer');
        reviewsContainer.innerHTML = '<p>Loading reviews...</p>';
        
        database.ref('reviews').orderByChild('timestamp').once('value', function(snapshot) {
            if (!snapshot.exists()) {
                reviewsContainer.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
                return;
            }
            
            reviewsContainer.innerHTML = '';
            snapshot.forEach(function(childSnapshot) {
                const review = childSnapshot.val();
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review-card';
                
                // Create star rating
                let stars = '';
                for (let i = 0; i < 5; i++) {
                    stars += i < review.rating ? '★' : '☆';
                }
                
                reviewElement.innerHTML = `
                    <h3>${review.name}</h3>
                    <div class="review-rating">${stars}</div>
                    <p>${review.review}</p>
                `;
                
                reviewsContainer.appendChild(reviewElement);
            });
        });
    }
    
    // Load reviews when page loads
    loadReviews();
}
