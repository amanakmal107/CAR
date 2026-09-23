document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const navbar = document.getElementById("navbar");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll(".nav-link, .nav-cta, .nav-whatsapp-btn").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  // Navbar scroll background
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Generate Hero Floating Particles
  const particlesContainer = document.getElementById("hero-particles");
  if (particlesContainer) {
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      p.style.animationDuration = `${5 + Math.random() * 6}s`;
      particlesContainer.appendChild(p);
    }
  }

  // 3. Scroll Reveal for Regular Elements
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Car Breakdown Scroll Animation & Disassembly
  const breakdownSection = document.getElementById("breakdown");
  const progressFill = document.getElementById("breakdown-progress-fill");
  const progressText = document.getElementById("breakdown-progress-text");

  // SVG Elements
  const partBody = document.getElementById("part-body");
  const partEngine = document.getElementById("part-engine");
  const partTrans = document.getElementById("part-trans");
  const partWheelF = document.getElementById("part-wheel-f");
  const partWheelR = document.getElementById("part-wheel-r");
  const partBrakeF = document.getElementById("part-brake-f");
  const partBrakeR = document.getElementById("part-brake-r");
  const partSuspF = document.getElementById("part-susp-f");
  const partSuspR = document.getElementById("part-susp-r");
  const partElectrical = document.getElementById("part-electrical");
  const partExhaust = document.getElementById("part-exhaust");

  // Labels
  const lblEngine = document.getElementById("bd-lbl-engine");
  const lblTrans = document.getElementById("bd-lbl-trans");
  const lblSusp = document.getElementById("bd-lbl-suspension");
  const lblBrake = document.getElementById("bd-lbl-brake");
  const lblElec = document.getElementById("bd-lbl-electrical");
  const lblExhaust = document.getElementById("bd-lbl-exhaust");

  const updateCarBreakdown = () => {
    if (!breakdownSection) return;

    const rect = breakdownSection.getBoundingClientRect();
    const sectionHeight = breakdownSection.offsetHeight - window.innerHeight;

    // Calculate progress between 0 and 1
    let progress = -rect.top / sectionHeight;
    progress = Math.max(0, Math.min(1, progress));

    if (progressFill) {
      progressFill.style.width = `${progress * 100}%`;
    }

    // Dynamic explanatory stage text
    if (progressText) {
      if (progress < 0.1) {
        progressText.textContent = "Scroll to reveal car internals & diagnostic points";
      } else if (progress < 0.3) {
        progressText.textContent = "Phase 1: Lifting chassis & revealing powertrain";
      } else if (progress < 0.6) {
        progressText.textContent = "Phase 2: Disassembling engine block, transmission & exhaust";
      } else if (progress < 0.85) {
        progressText.textContent = "Phase 3: Exposing brakes, steering & suspension assembly";
      } else {
        progressText.textContent = "Full diagnostic breakdown complete. AutoMedics AMG precision check.";
      }
    }

    // --- Component Animations based on scroll progress ---

    // 1. Car Body Lifts Upwards
    const bodyLift = progress * -120;
    const bodyFade = Math.max(0.15, 1 - progress * 1.1);
    if (partBody) {
      partBody.style.transform = `translateY(${bodyLift}px)`;
      partBody.style.opacity = bodyFade;
    }

    // 2. Engine moves upwards-forward into clear view
    const engineY = progress * -40;
    const engineX = progress * -30;
    if (partEngine) {
      partEngine.style.transform = `translate(${engineX}px, ${engineY}px)`;
    }

    // 3. Transmission slides backwards & slightly down
    const transX = progress * 40;
    const transY = progress * 15;
    if (partTrans) {
      partTrans.style.transform = `translate(${transX}px, ${transY}px)`;
    }

    // 4. Wheels separate outward
    const wheelFX = progress * -60;
    const wheelRX = progress * 60;
    if (partWheelF) partWheelF.style.transform = `translateX(${wheelFX}px)`;
    if (partWheelR) partWheelR.style.transform = `translateX(${wheelRX}px)`;

    // 5. Brakes stay near wheel hubs or expand
    const brakeFX = progress * -30;
    const brakeRX = progress * 30;
    if (partBrakeF) partBrakeF.style.transform = `translateX(${brakeFX}px)`;
    if (partBrakeR) partBrakeR.style.transform = `translateX(${brakeRX}px)`;

    // 6. Exhaust lowers downwards
    const exhaustY = progress * 30;
    if (partExhaust) {
      partExhaust.style.transform = `translateY(${exhaustY}px)`;
    }

    // 7. Electrical harness pulses / shifts
    if (partElectrical) {
      partElectrical.style.transform = `translateY(${progress * -15}px)`;
    }

    // --- Interactive labels activation thresholds ---
    const toggleLabel = (el, start, end) => {
      if (!el) return;
      if (progress >= start && progress <= end) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    };

    toggleLabel(lblEngine, 0.15, 0.95);
    toggleLabel(lblTrans, 0.25, 0.95);
    toggleLabel(lblSusp, 0.35, 0.95);
    toggleLabel(lblBrake, 0.45, 0.95);
    toggleLabel(lblElec, 0.2, 0.95);
    toggleLabel(lblExhaust, 0.4, 0.95);
  };

  window.addEventListener("scroll", updateCarBreakdown, { passive: true });
  updateCarBreakdown();

  // 5. Contact Form & WhatsApp Dispatch
  const contactForm = document.getElementById("contact-form");
  const formWhatsappBtn = document.getElementById("form-whatsapp-btn");

  const dispatchToWhatsApp = () => {
    const name = document.getElementById("form-name")?.value.trim() || "";
    const phone = document.getElementById("form-phone")?.value.trim() || "";
    const car = document.getElementById("form-car")?.value.trim() || "";
    const service = document.getElementById("form-service")?.value || "General Service";
    const message = document.getElementById("form-message")?.value.trim() || "";

    const text = encodeURIComponent(
      `Hello AutoMedics Garage AMG! I would like to book a service:\n\n` +
      `*Name:* ${name || 'Customer'}\n` +
      `*Phone:* ${phone || 'Not provided'}\n` +
      `*Vehicle:* ${car || 'Not specified'}\n` +
      `*Service Requested:* ${service}\n` +
      (message ? `*Notes:* ${message}\n\n` : `\n`) +
      `Location: New Industrial Area, Street 47, Building 69 Zone 57, Doha\n` +
      `(Sent via AutoMedics Garage Website)`
    );

    window.open(`https://wa.me/message/BEIVRW32THGTK1?text=${text}`, '_blank');
  };

  if (formWhatsappBtn) {
    formWhatsappBtn.addEventListener("click", () => {
      dispatchToWhatsApp();
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("form-submit-btn");
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Booking Confirmed! Forwarding to WhatsApp...";
        submitBtn.style.background = "#2ecc71";
        submitBtn.style.color = "#fff";

        setTimeout(() => {
          dispatchToWhatsApp();
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
          submitBtn.style.color = "";
        }, 1200);
      }
    });
  }
});
