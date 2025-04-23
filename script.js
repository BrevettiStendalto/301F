// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize carousel
    initCarousel();
    
    // Initialize form submission handler
    initContactForm();
    
    // Function to handle the appointment checkbox
    initAppointmentOptions();
    
    // Inizializza il selettore di prefisso telefonico
    initPhonePrefixSelector();
});

// Function to handle appointment checkbox
function initAppointmentOptions() {
    console.log("Initializing appointment options");
    const parmaCheckbox = document.getElementById('parma-appointment');
    const parmaOptions = document.getElementById('parma-options');
    
    // Inizializza tutti i checkbox-container (inclusi quelli del form come Privacy Policy)
    const allCheckboxContainers = document.querySelectorAll('.checkbox-container');
    
    console.log("Found " + allCheckboxContainers.length + " checkbox containers");
    
    allCheckboxContainers.forEach(container => {
        const checkbox = container.querySelector('input[type="checkbox"]');
        const formOption = container.closest('.form-option');
        
        if (checkbox && formOption) {
            // Initial state
            if (checkbox.checked) {
                formOption.classList.add('active');
            } else {
                formOption.classList.remove('active');
            }
            
            // Mobile-friendly click event
            container.addEventListener('click', function(e) {
                // Prevent double-triggering when clicking directly on the checkbox
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                    
                    if (checkbox.checked) {
                        formOption.classList.add('active');
                    } else {
                        formOption.classList.remove('active');
                    }
                    
                    // Gestione specifica per il checkbox di appuntamento Parma
                    if (checkbox.id === 'parma-appointment' && parmaOptions) {
                        if (checkbox.checked) {
                            parmaOptions.style.display = 'block';
                        } else {
                            parmaOptions.style.display = 'none';
                            
                            // Deseleziona tutti i radio button
                            const radioButtons = parmaOptions.querySelectorAll('input[type="radio"]');
                            radioButtons.forEach(radio => {
                                radio.checked = false;
                            });
                        }
                    }
                    
                    // Emit change event
                    const event = new Event('change');
                    checkbox.dispatchEvent(event);
                }
            });
            
            // Listen for direct changes on the checkbox
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    formOption.classList.add('active');
                } else {
                    formOption.classList.remove('active');
                }
                
                // Gestione specifica per il checkbox di appuntamento Parma
                if (this.id === 'parma-appointment' && parmaOptions) {
                    if (this.checked) {
                        parmaOptions.style.display = 'block';
                    } else {
                        parmaOptions.style.display = 'none';
                        
                        // Deseleziona tutti i radio button
                        const radioButtons = parmaOptions.querySelectorAll('input[type="radio"]');
                        radioButtons.forEach(radio => {
                            radio.checked = false;
                        });
                    }
                }
            });
        }
    });
    
    // Handle radio button selection
    const appointmentOptions = document.querySelectorAll('.appointment-option');
    appointmentOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            // Find the radio button inside this option
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                // Remove selected class from all options and add to the clicked one
                appointmentOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            }
        });
    });
}

// Function to handle scroll animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });
    
    // Observe all fade-in elements
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Function to handle carousel
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    // If carousel components are not found, exit early
    if (!carousel || !slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Function to move to a specific slide
    function goToSlide(index) {
        if (index < 0) {
            currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        const offset = -currentSlide * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }
    
    // Add event listeners only if buttons exist
    if (prevButton && nextButton) {
        // Event listeners for buttons
        prevButton.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
        
        nextButton.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
        
        // Auto-advance slides every 5 seconds
        setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }
}

// Function to handle form submission
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', formValues);
            
            // Show appropriate message based on language
            const lang = document.documentElement.lang;
            if (lang === 'it') {
                alert('Grazie per il tuo messaggio! Ti risponderemo presto.');
            } else {
                alert('Thank you for your message! We will get back to you soon.');
            }
            
            // Reset the form
            contactForm.reset();
            
            // Reset appointment options
            const parmaOptions = document.getElementById('parma-options');
            if (parmaOptions) {
                parmaOptions.style.display = 'none';
            }
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const body = document.body;
    
    // Add loaded class to body
    body.classList.add('loaded');
    
    // Hide loader after a short delay
    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
            // Remove loader from DOM after animation
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 500);
        }
    }, 1000);
});

// Funzione per gestire il selettore di prefisso telefonico
function initPhonePrefixSelector() {
    console.log("Initializing phone prefix selector");
    const prefixSelectors = document.querySelectorAll('.phone-prefix-selector');
    
    prefixSelectors.forEach(selector => {
        const selectedPrefix = selector.querySelector('.selected-prefix');
        const dropdown = selector.querySelector('.prefix-dropdown');
        const prefixItems = selector.querySelectorAll('.prefix-item');
        const selectedImg = selectedPrefix.querySelector('img');
        const selectedSpan = selectedPrefix.querySelector('span');
        const hiddenInput = selector.parentElement.querySelector('input[name="phone_prefix"]');
        const searchInput = selector.querySelector('.prefix-search input');
        
        console.log("Setting up phone prefix selector", {selector, selectedPrefix, dropdown});
        
        // Toggle dropdown when clicking on the selected prefix
        selectedPrefix.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Selected prefix clicked");
            selector.classList.toggle('active');
            if (selector.classList.contains('active')) {
                if (searchInput) searchInput.focus();
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!selector.contains(e.target)) {
                selector.classList.remove('active');
            }
        });
        
        // Handle prefix selection
        prefixItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Prefix item clicked");
                
                const prefix = item.getAttribute('data-prefix');
                const country = item.getAttribute('data-country');
                const flagSrc = item.querySelector('img').src;
                
                selectedImg.src = flagSrc;
                selectedSpan.textContent = prefix;
                if (hiddenInput) hiddenInput.value = prefix;
                
                selector.classList.remove('active');
            });
        });
        
        // Handle search functionality
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const searchValue = searchInput.value.toLowerCase();
                
                prefixItems.forEach(item => {
                    const countryName = item.querySelector('.prefix-country').textContent.toLowerCase();
                    const prefixCode = item.querySelector('.prefix-code').textContent.toLowerCase();
                    
                    if (countryName.includes(searchValue) || prefixCode.includes(searchValue)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    });
} 