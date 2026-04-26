// Family members shown in the "With Love From Our Families" section
const familyMembers = [
	// Uncles, aunts and extended family
	"Lalit Narayan Jha",
	"Ravindra Jha",
	"Subh Narayan Jha",
	"Kanhaiya Kumar Jha",
	"Rudra Narayan Jha",
	"Surya Narayan Jha",
	"Chandrakant Jha",
	"Udit Narayan Jha",
	"Dhirendra Jha",
	"Pintu Jha",
	"Durganand Jha",
	"Dipesh Jha",
	"Dinesh Jha",
	"Rupa Jha",
	"Nisha Jha",
	"Raman Jha",
	"Priya Jha",
	"Riya Jha",
	"Sandhya Jha",
	"Bhawa Jha",
	"Nikhil Jha",
	"Abhay Jha",
	"Uday Jha",
	"Baba Jha",
	"Gyanendra Jha",
	"Basistha Jha",
	"Bidhwata Jha",
	"Rajiv Jha",
	"Chotu Bauwa",
	"Rakhi Jha",
	"Gudiya Jha",
	"Pooja Jha",
	"Samjhana Jha",
	"Aayushi Mishra",
	"Dhiru Jha",
	"Gopal Jha",
	"Govind Jha",
];

// Initialize AOS animations
document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      // Soften animations on small screens
      disable: () => window.innerWidth < 420,
      offset: 80,
    });
  }

  setupSmoothScroll();
  setupNavToggle();
  setupGalleryLightbox();
  setupRsvpForm();
  populateFamilyList();
});

function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 64;
        const rect = target.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    });
  });
}

function setupNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
    }
  });
}

function setupGalleryLightbox() {
  const gallery = document.getElementById("galleryGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  if (!gallery || !lightbox || !lightboxImage || !lightboxClose) return;

  gallery.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;
    lightboxImage.src = img.src;
    lightbox.classList.add("visible");
    lightbox.setAttribute("aria-hidden", "false");
  });

  function closeLightbox() {
    lightbox.classList.remove("visible");
    lightbox.setAttribute("aria-hidden", "true");
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
}

function setupRsvpForm() {
  const form = document.getElementById("rsvpForm");
  const feedback = document.getElementById("formFeedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.guestName.value.trim();
    const count = form.guestCount.value.trim();
    const attending = form.attending.value;
    const message = form.message.value.trim();

    if (!name || !count || !attending) {
      feedback.textContent = "Please fill all required fields.";
      feedback.className = "form-feedback error";
      return;
    }

    const email = "your-email@example.com"; // TODO: replace with your email address
    const subject = `RSVP: ${name} - ${attending}`;
    const bodyLines = [
      `Name: ${name}`,
      `Number of Guests: ${count}`,
      `Attending: ${attending}`,
      "",
      "Message:",
      message || "(no message)",
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    window.location.href = mailtoLink;
    feedback.textContent =
      "Thank you! We have opened your email app with the RSVP details.";
    feedback.className = "form-feedback success";
  });
}

function populateFamilyList() {
	const list = document.querySelector(".family-list");
	if (!list) return;

	list.innerHTML = "";
	familyMembers.forEach((name) => {
	  const li = document.createElement("li");
	  li.textContent = name;
	  list.appendChild(li);
	});
}
