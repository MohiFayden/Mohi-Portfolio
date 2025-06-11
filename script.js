// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        // CSS handles the hamburger animation now
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            // CSS handles the hamburger animation reset
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            // CSS handles the hamburger animation reset
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll(
        '.about-content, .about-text, .about-highlights, .highlight-item, ' +
        '.experience-item, .skill-item, .project-item'
    );
    animateElements.forEach(el => observer.observe(el));
});

// Typing Animation for Hero Section
function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    
    // Clear the text initially
    heroTitle.innerHTML = '';
    
    // Small delay before starting animation
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 400);
});

// Skill Items Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Contact Form Handling (if you add a form later)
function handleContactForm(event) {
    event.preventDefault();
    
    // Add form handling logic here
    const formData = new FormData(event.target);
    
    // Example: Show success message
    showNotification('Message sent successfully!', 'success');
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontSize: '0.875rem',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Copy Email to Clipboard
function copyEmail() {
    const email = 'contact@mohifayden.com';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copied to clipboard!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Email copied to clipboard!', 'success');
    }
}

// Add click handler to email link
document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            copyEmail();
        });
    }
});

// Performance Optimization: Lazy Loading for Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            // CSS handles the hamburger animation reset
        }
    }
});

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any loading spinners or overlays
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Trigger hero animations after full load
    setTimeout(() => {
        document.querySelector('.hero-title')?.classList.add('animate');
        document.querySelector('.hero-subtitle')?.classList.add('animate');
        document.querySelector('.hero-stats')?.classList.add('animate');
        document.querySelector('.hero-actions')?.classList.add('animate');
        document.querySelector('.code-window')?.classList.add('animate');
    }, 100); // Small delay to ensure rendering is complete
});

// Error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT') {
        console.warn('Failed to load resource:', e.target.src || e.target.href);
        showNotification('Some resources failed to load', 'warning');
    }
});

// Code Window Typing Animation
function startCodeTypingAnimation() {
    const codeElement = document.getElementById('typing-code');
    const template = document.getElementById('code-template');
    
    if (!codeElement || !template) return;
    
    // Get the full HTML content for final display
    const fullContent = template.innerHTML;
    
    // Plain text version for typing
    const plainText = `class MobileArchitect {
    val expertise = listOf(
        "Android Architecture",
        "Kotlin & Jetpack Compose",
        "Scalable Systems",
        "Clean Architecture"
    )
    
    val currentRole = "Senior Software Engineer"
    
    fun buildModernApps() {
        // High-performance mobile • Scalable backends
    }
}`;
    
    let currentIndex = 0;
    let displayText = '';
    
    // Clear initial content
    codeElement.innerHTML = '<span class="cursor">|</span>';
    
    function applySyntaxHighlighting(text) {
        // Create a copy to work with
        let result = text;
        
        // Split into tokens and track positions
        const tokens = [];
        const tokenRegex = /\b(class|val|fun|MobileEngineer|buildImpactfulApps|expertise|currentRole)\b|"[^"]*"|\/\/.*$/gm;
        let match;
        
        // Find all complete tokens in the text
        while ((match = tokenRegex.exec(text)) !== null) {
            tokens.push({
                match: match[0],
                index: match.index,
                type: getTokenType(match[0])
            });
        }
        
        // Apply highlighting from end to beginning to preserve indices
        for (let i = tokens.length - 1; i >= 0; i--) {
            const token = tokens[i];
            const before = result.substring(0, token.index);
            const after = result.substring(token.index + token.match.length);
            
            result = before + `<span class="${token.type}">${token.match}</span>` + after;
        }
        
        return result;
    }
    
    function getTokenType(token) {
        if (['class', 'val', 'fun'].includes(token)) return 'keyword';
        if (token === 'MobileEngineer') return 'class-name';
        if (token === 'buildImpactfulApps') return 'function';
        if (['expertise', 'currentRole'].includes(token)) return 'variable';
        if (token.startsWith('"')) return 'string';
        if (token.startsWith('//')) return 'comment';
        return '';
    }
    
    function typeNextCharacter() {
        if (currentIndex < plainText.length) {
            const char = plainText[currentIndex];
            displayText += char;
            
            // Apply syntax highlighting to the current text
            const highlightedText = applySyntaxHighlighting(displayText);
            
            // Add cursor and display
            codeElement.innerHTML = highlightedText + '<span class="cursor">|</span>';
            
            currentIndex++;
            
            // Vary typing speed for more natural feel
            let delay = 30;
            if (char === ' ') delay = 50;
            if (char === '\n') delay = 150;
            if (char === '{' || char === '}') delay = 100;
            if (char === ';') delay = 80;
            
            setTimeout(typeNextCharacter, delay);
        } else {
            // Apply final syntax highlighting and keep cursor
            setTimeout(() => {
                codeElement.innerHTML = fullContent + '<span class="cursor">|</span>';
            }, 500);
        }
    }
    
    // Start typing after window entrance animation
    setTimeout(typeNextCharacter, 1200);
}

// Photo Modal Logic
document.addEventListener('DOMContentLoaded', function() {
    const navPhoto = document.getElementById('nav-photo');
    const modal = document.getElementById('photo-modal');
    const modalPhoto = modal?.querySelector('.modal-photo');

    if (navPhoto && modal && modalPhoto) {
        // Show modal when navbar photo is clicked
        navPhoto.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from bubbling up to document
            
            // Add a small delay to make the animation feel more responsive
            navPhoto.style.transform = 'scale(0.95)';
            setTimeout(() => {
                navPhoto.style.transform = '';
            }, 150);
            
            modal.classList.add('visible');
            
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        });

        // Hide modal when the overlay is clicked
        modal.addEventListener('click', function(e) {
            // Only close if clicking the overlay, not the photo
            if (e.target === modal) {
                closePhotoModal();
            }
        });

        // Prevent modal from closing when the photo inside is clicked
        modalPhoto.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Add a subtle bounce effect when clicking the photo
            modalPhoto.style.transform = 'scale(0.98) rotate(0deg)';
            setTimeout(() => {
                modalPhoto.style.transform = 'scale(1) rotate(0deg)';
            }, 100);
        });
        
        // Add double-click to close functionality
        modalPhoto.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            closePhotoModal();
        });
    }

    // Function to close the modal with proper cleanup
    function closePhotoModal() {
        const modal = document.getElementById('photo-modal');
        if (modal && modal.classList.contains('visible')) {
            modal.classList.remove('visible');
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }

    // Hide modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePhotoModal();
        }
    });
    
    // Add touch/swipe support for mobile
    if (modalPhoto) {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        
        modalPhoto.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });
        
        modalPhoto.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // Add a subtle transform based on swipe
            if (Math.abs(diff) > 10) {
                const scale = Math.max(0.8, 1 - Math.abs(diff) / 500);
                const rotation = diff / 10;
                modalPhoto.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
                modalPhoto.style.opacity = Math.max(0.5, 1 - Math.abs(diff) / 300);
            }
        }, { passive: true });
        
        modalPhoto.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = currentY - startY;
            
            // If swiped far enough, close the modal
            if (Math.abs(diff) > 100) {
                closePhotoModal();
            } else {
                // Reset the transform
                modalPhoto.style.transform = 'scale(1) rotate(0deg)';
                modalPhoto.style.opacity = '1';
            }
        }, { passive: true });
    }
}); 