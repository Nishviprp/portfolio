// ===========================
// SMOOTH SCROLL NAVIGATION
// ===========================

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

// ===========================
// ACTIVE NAV LINK
// ===========================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// ===========================
// CONTACT FORM HANDLING
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name') || this.querySelector('input[type="text"]').value;
    const email = formData.get('email') || this.querySelector('input[type="email"]').value;
    const message = formData.get('message') || this.querySelector('textarea').value;

    // Simple validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Create mailto link (fallback if no backend)
    const mailtoLink = `mailto:nishviprp@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    
    // Try to send via backend if available, otherwise use mailto
    try {
      // If you have a backend endpoint, uncomment and modify:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, message })
      // });

      // For now, show success message and reset form
      alert('Thank you for your message! I\'ll get back to you soon.');
      contactForm.reset();
      
      // Alternatively, redirect to mailto (uncomment if no backend)
      // window.location.href = mailtoLink;
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback to mailto
      window.location.href = mailtoLink;
    }
  });
}

// ===========================
// INTERSECTION OBSERVER (Fade-in animations)
// ===========================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for fade-in effect
document.querySelectorAll('.pillar, .project-card, .education-card, .experience-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===========================
// MOBILE MENU TOGGLE (if needed in future)
// ===========================

// This is a placeholder for future mobile menu functionality
// You can expand this if you add a hamburger menu for mobile

// ===========================
// SCROLL-TO-TOP BUTTON (optional)
// ===========================

function createScrollTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.id = 'scroll-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
    transition: all 0.3s ease;
    z-index: 999;
  `;

  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  button.addEventListener('mouseenter', () => {
    button.style.background = '#2563eb';
    button.style.transform = 'scale(1.1)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.background = 'var(--primary)';
    button.style.transform = 'scale(1)';
  });
}

createScrollTopButton();

// ===========================
// PAGE LOAD ANIMATION
// ===========================

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Set initial opacity for fade-in effect
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Trigger fade-in
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1';
});

// ===========================
// CONSOLE MESSAGE
// ===========================

console.log(
  '%c👋 Hey there!',
  'font-size: 24px; font-weight: bold; color: #3b82f6;'
);
console.log(
  '%cInterested in working together? Reach out at nishviprp@gmail.com',
  'font-size: 14px; color: #64748b;'
);
console.log(
  '%cCheck out my GitHub: https://github.com/Nishviprp',
  'font-size: 12px; color: #64748b;'
);
