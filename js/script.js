// Mobile Navbar Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileBtn.querySelector('svg');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    mobileBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`;
                } else {
                    mobileBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>`;
                }
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('svg');
                if (icon) {
                    mobileBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>`;
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
    let overlay = document.getElementById('successPopupOverlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'successPopupOverlay';
        overlay.className = 'fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center opacity-0 invisible transition-all duration-300 popup-overlay';

        const content = document.createElement('div');
        content.className = 'bg-white rounded-3xl p-8 max-w-sm w-[90%] transform scale-90 transition-all duration-300 popup-content shadow-2xl relative overflow-hidden flex flex-col items-center text-center';

        const gradientBar = document.createElement('div');
        gradientBar.className = 'absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent';

        const icon = document.createElement('div');
        icon.className = 'w-20 h-20 bg-emerald-50 text-primary rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner';
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`;

        const heading = document.createElement('h3');
        heading.id = 'popupTitle';
        heading.className = 'font-heading text-2xl font-bold text-slate-800 mb-3';

        const message = document.createElement('p');
        message.id = 'popupText';
        message.className = 'text-slate-500 mb-8 leading-relaxed';

        const btn = document.createElement('button');
        btn.className = 'w-full bg-primary hover:bg-primary-dark text-white font-medium py-3.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2';
        btn.innerHTML = `<span>Awesome!</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>`;
        btn.onclick = () => overlay.classList.remove('active');

        content.appendChild(gradientBar);
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

// Geolocation API Implementation
const locationBtn = document.getElementById('locationBtn');
const locationStatus = document.getElementById('locationStatus');

// Turf locations (Bangalore coordinates as an example)
const TURF_LOCATIONS = [
    { name: "Arena Prime (HSR Layout)", lat: 12.9121, lon: 77.6446 },
    { name: "Greenfield Turf (Koramangala)", lat: 12.9352, lon: 77.6245 },
    { name: "Kickoff Pitch (Indiranagar)", lat: 12.9784, lon: 77.6408 }
];

// Helper to calculate distance in km using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

if (locationBtn) {
    locationBtn.addEventListener('click', () => {
        
        // 1. Check if the browser actually supports Geolocation
        if (!navigator.geolocation) {
            locationStatus.innerHTML = "<span class='text-red-500'>Geolocation is not supported by your browser.</span>";
            return;
        }

        // 2. Tell the user we are searching
        locationStatus.innerHTML = "<span class='text-slate-500 animate-pulse'>Locating you...</span>";
        
        // 3. Request the location
        navigator.geolocation.getCurrentPosition(
            // Success Callback
            (position) => {
                const latitude  = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Calculate distance for all turfs
                const turfsWithDistance = TURF_LOCATIONS.map(turf => {
                    return {
                        ...turf,
                        distance: calculateDistance(latitude, longitude, turf.lat, turf.lon)
                    };
                }).sort((a, b) => a.distance - b.distance);
                
                // Build HTML to display turfs
                let html = `<div class="text-emerald-600 font-semibold mb-3">Nearest turfs:</div>`;
                html += `<div class="flex flex-col gap-2 w-full max-w-sm mx-auto">`;
                turfsWithDistance.forEach(turf => {
                    html += `
                        <div class="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex justify-between items-center text-left hover:border-primary/30 transition-colors">
                            <span class="font-medium text-slate-800 text-sm">${turf.name}</span>
                            <span class="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded ml-3 shrink-0">${turf.distance.toFixed(1)} km</span>
                        </div>
                    `;
                });
                html += `</div>`;
                
                locationStatus.innerHTML = html;
            },
            // Error Callback
            (error) => {
                let errorMsg = "An unknown error occurred.";
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg = "You denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMsg = "The request to get user location timed out.";
                        break;
                }
                locationStatus.innerHTML = `<span class="text-red-500">${errorMsg}</span>`;
            }
        );
    });
}

// Login Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('loginEmail');
            const passwordInput = document.getElementById('loginPassword');
            const errorContainer = document.getElementById('loginError');
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            // Simple email regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showError("Please enter your email address.");
                return;
            }
            
            if (!emailRegex.test(email)) {
                showError("Please enter a valid email address.");
                return;
            }
            
            if (!password) {
                showError("Please enter your password.");
                return;
            }
            
            if (password.length < 6) {
                showError("Password must be at least 6 characters long.");
                return;
            }
            
            // If valid, clear error and simulate login (redirect)
            errorContainer.classList.add('hidden');
            window.location.href = 'index.html';
            
            function showError(msg) {
                errorContainer.textContent = msg;
                errorContainer.classList.remove('hidden');
            }
        });
    }

    // Registration Form Validation & Display
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('regName');
            const emailInput = document.getElementById('regEmail');
            const passwordInput = document.getElementById('regPassword');
            const dobInput = document.getElementById('regDob');
            const sportInput = document.getElementById('regSport');
            const avatarInput = document.getElementById('regAvatar');
            const errorContainer = document.getElementById('registerError');
            const displaySection = document.getElementById('displaySection');
            const userDataCard = document.getElementById('userDataCard');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const dob = dobInput.value;
            const sport = sportInput.value;
            const avatarFile = avatarInput.files[0];
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            // Validation
            if (!name) return showError("Please enter your full name.");
            if (!email || !emailRegex.test(email)) return showError("Please enter a valid email address.");
            if (!password || password.length < 6) return showError("Password must be at least 6 characters.");
            if (!dob) return showError("Please select your date of birth.");
            if (!sport) return showError("Please select your favorite sport.");
            
            errorContainer.classList.add('hidden');
            
            // Local Storage
            const userData = {
                name,
                email,
                dob,
                sport,
                fileName: avatarFile ? avatarFile.name : 'No file chosen',
                timestamp: new Date().toISOString()
            };
            
            let users = JSON.parse(localStorage.getItem('turfUsers')) || [];
            users.push(userData);
            localStorage.setItem('turfUsers', JSON.stringify(users));

            //function to create display item
            const createDisplayItem = (label, value) => `
                <div class="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <span class="text-sm text-slate-500">${label}</span>
                    <span class="text-sm font-medium text-slate-800">${value}</span>
                </div>
            `;

            // Display all the data in a card below
            userDataCard.innerHTML = `
                ${createDisplayItem('Name', userData.name)}
                ${createDisplayItem('Email', userData.email)}
                ${createDisplayItem('Date of Birth', userData.dob)}
                ${createDisplayItem('Sport', userData.sport)}
                ${createDisplayItem('Profile Upload', userData.fileName)}
            `;
            
            displaySection.classList.remove('hidden');
            
            function showError(msg) {
                errorContainer.textContent = msg;
                errorContainer.classList.remove('hidden');
            }
        });
    }
});
