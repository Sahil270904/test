document.addEventListener("DOMContentLoaded", function () {

    // ---------------- RIPPLE EFFECT ----------------
    function createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.querySelector(".ripple");
        if (ripple) ripple.remove();

        button.appendChild(circle);
        
        setTimeout(() => {
            circle.remove();
        }, 600);
    }

    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", createRipple);
    });

    // ---------------- STARS BACKGROUND ----------------
    const starsContainer = document.querySelector(".stars");
    if (starsContainer) {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement("span");
            let size = Math.random() * 3 + 1;
            star.style.width = size + "px";
            star.style.height = size + "px";
            star.style.left = Math.random() * window.innerWidth + "px";
            star.style.top = Math.random() * window.innerHeight + "px";
            star.style.animationDuration = (3 + Math.random() * 8) + "s";
            star.style.animationDelay = Math.random() * 5 + "s";
            starsContainer.appendChild(star);
        }
    }

    // ---------------- BUTTON FADE NAV + MAGNETIC TILT ----------------
    const ctaBtn = document.querySelector(".cta-btn");
    if (ctaBtn) {
        ctaBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const transition = document.getElementById('pageTransition');
            const circle = transition.querySelector('.transition-circle');
            const particlesContainer = document.getElementById('transitionParticles');
            const textEl = transition.querySelector('.transition-text');

            // Position circle at click point
            circle.style.left = e.clientX + 'px';
            circle.style.top = e.clientY + 'px';

            // Spawn burst particles from click point
            const colors = ['#4fd7ff', '#00e5ff', '#ff7a18', '#ff4d6d', '#7df9ff', '#ffffff'];
            for (let i = 0; i < 18; i++) {
                const p = document.createElement('div');
                p.className = 'burst-particle';
                p.style.left = e.clientX + 'px';
                p.style.top = e.clientY + 'px';
                p.style.background = colors[Math.floor(Math.random() * colors.length)];
                p.style.width = (3 + Math.random() * 4) + 'px';
                p.style.height = p.style.width;
                const angle = (i / 18) * 360;
                const dist = 80 + Math.random() * 120;
                const tx = Math.cos(angle * Math.PI / 180) * dist;
                const ty = Math.sin(angle * Math.PI / 180) * dist;
                p.style.setProperty('--burst-dir', `translate(${tx}px, ${ty}px)`);
                p.style.animationDelay = (Math.random() * 0.15) + 's';
                particlesContainer.appendChild(p);
            }

            // Activate transition
            transition.classList.add('active');

            // Fade out page content behind the overlay
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.4s ease';
                document.body.style.opacity = '0.3';
            }, 300);

            // Update text
            setTimeout(() => {
                if (textEl) textEl.textContent = 'Almost there...';
            }, 900);

            setTimeout(() => {
                if (textEl) textEl.textContent = 'Redirecting now';
            }, 1500);

            // Navigate
            setTimeout(() => {
                window.location.href = "/home";
            }, 1800);
        });

        // Magnetic tilt on hover
        ctaBtn.addEventListener("mousemove", function (e) {
            const rect = ctaBtn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            ctaBtn.style.transform = `translateY(-4px) scale(1.05) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        ctaBtn.addEventListener("mouseleave", function () {
            ctaBtn.style.transform = "";
        });
    }

    // ---------------- COUNTER ----------------
    let count = 1;
    const countDisplay = document.getElementById("count");
    const increaseBtn = document.getElementById("increaseBtn");
    const decreaseBtn = document.getElementById("decreaseBtn");

    if (increaseBtn && decreaseBtn && countDisplay) {
        increaseBtn.addEventListener("click", function () {
            count++;
            countDisplay.innerText = count;
        });

        decreaseBtn.addEventListener("click", function () {
            if (count > 1) {
                count--;
                countDisplay.innerText = count;
            }
        });
    }

    // ---------------- SET CURRENT DATE ----------------
    function setCurrentDate() {
        const dateElement = document.getElementById("currentDate");
        if (dateElement) {
            const options = { weekday: 'short', day: 'numeric', month: 'short' };
            const today = new Date();
            dateElement.innerHTML = today.toLocaleDateString('en-IN', options);
        }
        
        const travelDateInput = document.getElementById("travelDate");
        if (travelDateInput) {
            const todayStr = new Date().toISOString().split('T')[0];
            travelDateInput.min = todayStr;
            travelDateInput.value = todayStr;
        }
    }
    setCurrentDate();

    // ---------------- CITY SUGGESTIONS ----------------
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Goa', 'Nagpur', 'Surat', 'Indore'];
    
    function setupSuggestions(inputId, suggestionsId) {
        const input = document.getElementById(inputId);
        const suggestionsDiv = document.getElementById(suggestionsId);
        
        if (!input || !suggestionsDiv) return;
        
        input.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            if (value.length < 2) {
                suggestionsDiv.style.display = 'none';
                return;
            }
            
            const matches = cities.filter(city => city.toLowerCase().includes(value));
            if (matches.length > 0) {
                suggestionsDiv.innerHTML = matches.map(city => `<div class="suggestion-item">${city}</div>`).join('');
                suggestionsDiv.style.display = 'block';
                
                document.querySelectorAll('.suggestion-item').forEach(item => {
                    item.addEventListener('click', function() {
                        input.value = this.innerText;
                        suggestionsDiv.style.display = 'none';
                        showOptions();
                        const event = new Event('input');
                        input.dispatchEvent(event);
                    });
                });
            } else {
                suggestionsDiv.style.display = 'none';
            }
        });
        
        document.addEventListener('click', function(e) {
            if (!input.contains(e.target) && !suggestionsDiv.contains(e.target)) {
                suggestionsDiv.style.display = 'none';
            }
        });
    }
    
    setupSuggestions('fromCity', 'fromSuggestions');
    setupSuggestions('toCity', 'toSuggestions');

    // ---------------- CITY INPUT OPTIONS ----------------
    const fromInput = document.getElementById("fromCity");
    const toInput = document.getElementById("toCity");
    const dateInput = document.querySelector("input[type='date']");
    const incity = document.getElementById("incityOptions");
    const intercity = document.getElementById("intercityOptions");

    window.showOptions = function() {
        if (!fromInput || !toInput) return;
        
        const from = fromInput.value.trim().toLowerCase();
        const to = toInput.value.trim().toLowerCase();

        if (incity) incity.classList.remove("active");
        if (intercity) intercity.classList.remove("active");

        if (!from || !to) return;

        if (from === to) {
            if (incity) incity.classList.add("active");
        } else {
            if (intercity) intercity.classList.add("active");
        }
    }

    function capitalizeCityName(input) {
        if (input && input.value) {
            const words = input.value.split(' ');
            const capitalized = words.map(word => 
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ');
            input.value = capitalized;
        }
    }

    if (fromInput && toInput) {
        fromInput.addEventListener("input", showOptions);
        toInput.addEventListener("input", showOptions);
        fromInput.addEventListener("blur", () => capitalizeCityName(fromInput));
        toInput.addEventListener("blur", () => capitalizeCityName(toInput));
        fromInput.addEventListener("keypress", (e) => { if (e.key === "Enter") showOptions(); });
        toInput.addEventListener("keypress", (e) => { if (e.key === "Enter") showOptions(); });
    }
    
    if (dateInput) {
        dateInput.addEventListener("change", showOptions);
    }

    // ---------------- BUS CARD SELECTION ----------------
    function initializeBusCardSelection() {
        const busCards = document.querySelectorAll('.bus-card');
        busCards.forEach(card => {
            card.removeEventListener('click', card.clickHandler);
            const clickHandler = function() {
                busCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
            };
            card.clickHandler = clickHandler;
            card.addEventListener('click', clickHandler);
        });
    }

    // ---------------- GO TO SUMMARY WITH SMOOTH TRANSITION ----------------
    window.goToSummary = function() {
        const from = document.getElementById("fromCity")?.value;
        const to = document.getElementById("toCity")?.value;
        const date = document.querySelector("input[type='date']")?.value;
        const passengers = parseInt(document.getElementById("count")?.innerText || "1");
        const selectedCard = document.querySelector(".bus-card.selected");
        const bookBtn = document.querySelector(".book-btn");

        if (!from || !to) {
            alert("Please enter both departure and destination cities");
            return;
        }
        
        if (!date) {
            alert("Please select a travel date");
            return;
        }
        
        if (!selectedCard) {
            alert("Please select a bus type");
            return;
        }

        if (bookBtn) {
            bookBtn.disabled = true;
            bookBtn.style.opacity = "0.6";
            bookBtn.innerHTML = '<i data-lucide="loader"></i> Processing...';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        const busType = selectedCard.querySelector("h3")?.innerText || "Bus";
        const priceText = selectedCard.querySelector(".price-pill")?.innerText || "₹0";
        let price = parseInt(priceText.replace(/[^0-9]/g, "")) || 0;
        
        if (priceText.includes("-")) {
            const prices = priceText.match(/\d+/g);
            if (prices) price = parseInt(prices[0]);
        } else if (priceText.includes("From")) {
            const match = priceText.match(/\d+/);
            if (match) price = parseInt(match[0]);
        }
        
        const total = price * passengers;

        const data = { from, to, date, passengers, busType, price, total };
        localStorage.setItem("bookingData", JSON.stringify(data));

        const transition = document.getElementById('pageTransition');
        if (transition) {
            transition.classList.add('active');
            
            setTimeout(() => {
                const textElement = transition.querySelector('p');
                if (textElement) textElement.textContent = 'Almost there...';
            }, 800);
            
            setTimeout(() => {
                const textElement = transition.querySelector('p');
                if (textElement) textElement.textContent = 'Redirecting to summary';
            }, 1600);
        } else {
            document.body.style.transition = "opacity 0.3s ease";
            document.body.style.opacity = "0";
        }

        setTimeout(() => {
            window.location.href = "/summary";
        }, 2000);
    };

    // ---------------- INITIAL SETUP & OBSERVER ----------------
    initializeBusCardSelection();
    
    const observer = new MutationObserver(function() {
        initializeBusCardSelection();
    });
    
    const busOptions = document.getElementById("busOptions");
    if (busOptions) {
        observer.observe(busOptions, { childList: true, subtree: true });
    }
});
// ---------------- SMOOTH NAVIGATION ----------------
window.smoothNavigate = function(url) {
    const transition = document.getElementById('pageTransition');
    if (transition) {
        transition.classList.add('active');
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    } else {
        window.location.href = url;
    }
};