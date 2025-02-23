// Hero Image Slider
const heroImages = [
    'assets/images/support.jpeg',
    'assets/images/community.jpeg',
    'assets/images/workspace.jpeg',
    'assets/images/coffee.jpeg'
];

let currentImageIndex = 0;
const heroImage = document.querySelector('.hero-image');

function changeHeroImage() {
    if (heroImage) {
        heroImage.style.opacity = '0';
        setTimeout(() => {
            heroImage.src = heroImages[currentImageIndex];
            heroImage.style.opacity = '1';
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        }, 500);
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider
    if (heroImage) {
        setInterval(changeHeroImage, 5000);
    }

    // Smooth Scrolling
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

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.querySelector('.submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitButton.disabled = true;

            try {
                const formData = new FormData(contactForm);
                const formDataObject = Object.fromEntries(formData);
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                showMessage('Thank you! Your message has been sent.', 'success');
                contactForm.reset();
            } catch (error) {
                showMessage('Sorry, there was an error. Please try again.', 'error');
                console.error('Form submission error:', error);
            } finally {
                submitButton.disabled = false;
            }
        });
    }
});

// Message Display
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;

    const form = document.getElementById('contactForm');
    if (form) {
        form.insertAdjacentElement('afterend', messageDiv);
        setTimeout(() => messageDiv.remove(), 5000);
    }
}

// Cart functionality
let cart = [];

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cafeCart', JSON.stringify(cart));
    updateCartCount();
    showMessage('Item added to cart', 'success');
}

// Initialize cart from localStorage
const savedCart = localStorage.getItem('cafeCart');
if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
});