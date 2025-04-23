function toggleMenu() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("show");
  }

  
  const cards = document.querySelectorAll('.card');

  // Create an intersection observer to track when the cards come into view
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the 'visible' class when the card comes into view
        entry.target.classList.add('visible');
        // Stop observing the element once it's visible
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // Trigger when 50% of the card is in view

  // Observe each card
  cards.forEach(card => {
    observer.observe(card);
  });

const scriptURL = 'https://script.google.com/macros/s/AKfycbzpBDtCvMcgGbpn0FEPqJanBp7RyvSmhAwsd6a5NiIT_2o1Q1Xk55sBnH94iTQMqLwv/exec';
const form = document.getElementById('submitToGoogleSheet');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission

  // Get form fields
  const userName = document.getElementById('userName').value;
  const userEmail = document.getElementById('userEmail').value;
  const userMobile = document.getElementById('userMobile').value;
  const userMessage = document.getElementById('userMessage').value;

  // Basic validation check for empty fields
  if (!userName || !userEmail || !userMobile || !userMessage) {
    alert('Please fill in all fields!');
    return; // Exit if validation fails
  }

  console.log('Form is valid, proceeding to submit.');

  // Show loading state
  const submitButton = document.getElementById('submitButton');
  submitButton.textContent = 'Submitting...';
  submitButton.disabled = true;

  // Create a FormData object to send the form data
  const formData = new FormData(form);

  // Send form data via POST request
  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      console.log('Response from Google Script:', response);
      if (response.ok) {
        console.log('Success!', response);
        window.location.href = 'thank-you.html';
        form.reset(); // Clear the form
      } else {
        console.log('Error: Response not OK', response);
        throw new Error('Failed to submit form');
      }
    })
    .catch((error) => {
      console.error('Error during submission:', error.message);
      alert('There was an error submitting the form. Please try again.');
    })
    .finally(() => {
      // Reset button text and enable button after submission attempt
      submitButton.textContent = 'Submit';
      submitButton.disabled = false;
    });
});
