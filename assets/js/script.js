document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("mainNav");
    const menuToggle = document.getElementById("menuToggle");
    const toast = document.getElementById("toast");
    const yearEl = document.getElementById("year");
    
    // REPLACE THIS URL with your Google Apps Script Web App URL
    const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(showToast.timer);
        showToast.timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("open");
        });
    }

    // Join Tournament Button Logic
    document.querySelectorAll(".join-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const tourney = button.getAttribute("data-tourney") || "Tournament";
            showToast(`Joining ${tourney}...`);
            setTimeout(() => {
                // Check if we are in index or a subfolder
                const isSubfolder = window.location.pathname.includes('/pages/') || 
                                   window.location.pathname.includes('/contact/') || 
                                   window.location.pathname.includes('/policies/');
                const pathPrefix = isSubfolder ? '' : 'pages/';
                window.location.href = `${pathPrefix}signup.html?tourney=${encodeURIComponent(tourney)}`;
            }, 800);
        });
    });

    // Registration Form Handling (Google Sheets Connection)
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        const params = new URLSearchParams(window.location.search);
        const tourney = params.get("tourney");
        const tourneyDisplay = document.getElementById("selectedTournament");
        const tourneyInput = document.getElementById("tourneyInput");
        
        if (tourney) {
            if (tourneyDisplay) tourneyDisplay.textContent = `Selected: ${tourney}`;
            if (tourneyInput) tourneyInput.value = tourney;
        }

        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById("submitBtn");
            const uid = registerForm.querySelector('[name="uid"]').value;
            const tournament = document.getElementById("tourneyInput").value;

            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";
            
            const formData = new FormData(registerForm);

            // Using fetch to send data to Google Sheets
            fetch(SCRIPT_URL, {
                method: "POST",
                body: formData
            })
            .then(response => {
                // Save registration locally
                saveRegistration(uid, tournament);
                showToast("Registration Submitted! Wait for approval.");
                registerForm.reset();
                setTimeout(() => {
                    window.location.href = "tournaments.html";
                }, 2000);
            })
            .catch(error => {
                console.error("Error!", error.message);
                // Save registration locally even for demo
                saveRegistration(uid, tournament);
                showToast("Registration captured! (Local Demo)");
                setTimeout(() => {
                    window.location.href = "tournaments.html";
                }, 2000);
            });
        });
    }

    function saveRegistration(uid, tournament) {
        let regs = JSON.parse(localStorage.getItem("ff_regs") || "[]");
        regs.push({ uid, tournament, timestamp: Date.now() });
        localStorage.setItem("ff_regs", JSON.stringify(regs));
    }

    // Unlock Room Info Logic
    const unlockButtons = document.querySelectorAll(".unlock-btn");
    if (unlockButtons.length > 0) {
        unlockButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const tournament = btn.getAttribute("data-tourney");
                const uid = prompt(`Enter your Free Fire UID to verify registration for ${tournament}:`);
                
                if (!uid) return;

                const regs = JSON.parse(localStorage.getItem("ff_regs") || "[]");
                const isRegistered = regs.find(r => r.uid === uid && r.tournament === tournament);

                if (isRegistered) {
                    const row = btn.closest("tr");
                    const roomIdCell = row.querySelector(".room-id-cell");
                    const passCell = row.querySelector(".pass-cell");
                    
                    const actualRoomId = roomIdCell.getAttribute("data-value");
                    const actualPass = passCell.getAttribute("data-value");

                    if (actualRoomId === "---") {
                        showToast("Room not created yet. Check back 15 mins before match!");
                    } else {
                        roomIdCell.textContent = actualRoomId;
                        passCell.textContent = actualPass;
                        btn.style.display = "none";
                        showToast("Verification Successful! Info Unlocked.");
                    }
                } else {
                    showToast("No registration found for this UID! Please register first.");
                }
            });
        });
    }

    // Contact Form
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showToast("Message sent! Team FabricBattle will reply soon.");
            contactForm.reset();
        });
    }

    // Year update
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Refresh Logic for Tournaments Page
    const refreshBtn = document.getElementById("refreshBtn");
    const refreshTimerEl = document.getElementById("refreshTimer");
    
    if (refreshBtn) {
        let timeLeft = 9;
        
        const updateTimer = () => {
            if (refreshTimerEl) {
                refreshTimerEl.textContent = `Auto-refresh in ${timeLeft}s`;
            }
            if (timeLeft <= 0) {
                location.reload();
            }
            timeLeft--;
        };

        let timerInterval = setInterval(updateTimer, 1000);

        refreshBtn.addEventListener("click", () => {
            refreshBtn.disabled = true;
            refreshBtn.textContent = "Updating...";
            clearInterval(timerInterval);
            showToast("Updating match info...");
            setTimeout(() => {
                location.reload();
            }, 500);
        });
    }

    // Leaderboard Tab Switching
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetTab = btn.getAttribute("data-tab");

                tabBtns.forEach(b => b.classList.remove("active"));
                tabContents.forEach(c => c.classList.remove("active"));

                btn.classList.add("active");
                const content = document.getElementById(targetTab);
                if (content) content.classList.add("active");
            });
        });
    }
});
