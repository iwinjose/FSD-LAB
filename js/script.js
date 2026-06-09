// Mobile Navbar Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Highlight current page in navbar
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        const itemPage = item.getAttribute('href');
        if (currentPage === itemPage || (currentPage === '' && itemPage === 'index.html')) {
            item.classList.add('active');
        }
    });

    // Booking Form Validation and Submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateBookingForm()) {
                saveBookingData();
                showSuccessPopup("Booking Successful!", "Your turf slot has been confirmed.");
                bookingForm.reset();
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateContactForm()) {
                showSuccessPopup("Message Sent!", "We will get back to you shortly.");
                contactForm.reset();
            }
        });
    }
});

// Validation Helpers
const setError = (elementId, message) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    const formGroup = element.parentElement;
    const errorDisplay = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    if (errorDisplay) {
        errorDisplay.innerText = message;
    }
};

const setSuccess = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    const formGroup = element.parentElement;
    const errorDisplay = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    if (errorDisplay) {
        errorDisplay.innerText = '';
    }
};

const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const isValidPhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
};

// Validate Booking Form
function validateBookingForm() {
    let isValid = true;

    // Name
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        setError('name', 'Name cannot be empty');
        isValid = false;
    } else {
        setSuccess('name');
    }

    // Phone
    const phone = document.getElementById('phone').value.trim();
    if (phone === '') {
        setError('phone', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        setError('phone', 'Phone must be exactly 10 digits');
        isValid = false;
    } else {
        setSuccess('phone');
    }

    // Email
    const email = document.getElementById('email').value.trim();
    if (email === '') {
        setError('email', 'Email address is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        setError('email', 'Provide a valid email address');
        isValid = false;
    } else {
        setSuccess('email');
    }

    // Date
    const date = document.getElementById('date').value;
    if (date === '') {
        setError('date', 'Booking date cannot be empty');
        isValid = false;
    } else {
        setSuccess('date');
    }

    // Slot
    const slot = document.getElementById('slot').value;
    if (slot === '') {
        setError('slot', 'Please select a slot');
        isValid = false;
    } else {
        setSuccess('slot');
    }

    return isValid;
}

// Validate Contact Form
function validateContactForm() {
    let isValid = true;

    const name = document.getElementById('contactName').value.trim();
    if (name === '') {
        setError('contactName', 'Name cannot be empty');
        isValid = false;
    } else {
        setSuccess('contactName');
    }

    const email = document.getElementById('contactEmail').value.trim();
    if (email === '') {
        setError('contactEmail', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        setError('contactEmail', 'Provide a valid email format');
        isValid = false;
    } else {
        setSuccess('contactEmail');
    }

    const message = document.getElementById('contactMessage').value.trim();
    if (message === '') {
        setError('contactMessage', 'Message cannot be empty');
        isValid = false;
    } else {
        setSuccess('contactMessage');
    }

    return isValid;
}

// Save to LocalStorage
function saveBookingData() {
    const booking = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        date: document.getElementById('date').value,
        slot: document.getElementById('slot').value,
        booking_id: 'TRF' + Math.floor(Math.random() * 1000000),
        timestamp: new Date().toISOString()
    };

    let bookings = JSON.parse(localStorage.getItem('turfBookings')) || [];
    bookings.push(booking);
    localStorage.setItem('turfBookings', JSON.stringify(bookings));
}

// Success Popup Handling
function showSuccessPopup(title, text) {
    // Create popup elements if they don't exist
    let overlay = document.querySelector('.popup-overlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        
        const content = document.createElement('div');
        content.className = 'popup-content';
        
        const icon = document.createElement('div');
        icon.className = 'popup-icon';
        icon.innerHTML = '<i class="fas fa-check"></i>';
        
        const heading = document.createElement('h3');
        heading.id = 'popupTitle';
        
        const message = document.createElement('p');
        message.id = 'popupText';
        
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = 'Awesome!';
        btn.onclick = () => overlay.classList.remove('active');
        
        content.appendChild(icon);
        content.appendChild(heading);
        content.appendChild(message);
        content.appendChild(btn);
        overlay.appendChild(content);
        document.body.appendChild(overlay);
    }
    
    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupText').textContent = text;
    
    // Show popup
    setTimeout(() => {
        overlay.classList.add('active');
    }, 100);
}
