
/* =========================================================
   SUBASH GROUP OF INSTITUTIONS — MAIN SCRIPT
   Courses, event gallery, statistics, navigation and hero
   ========================================================= */


/* =========================================================
   1. COURSES — AUTOMATIC RIGHT-TO-LEFT CAROUSEL
   ========================================================= */

const courses = [
  {
    name: "B.Sc. Nursing",
    category: "Nursing",
    description: "Undergraduate degree programme in nursing.",
    image: "images/gallery/bsc-nursing.jpg",
    link: "bsc.php"
  },
  {
    name: "M.Sc. Nursing",
    category: "Nursing",
    description: "Postgraduate programme in nursing.",
    image: "images/gallery/msc-nursing.jpg",
    link: "msc.php"
  },
  {
    name: "PB B.Sc. Nursing",
    category: "Nursing",
    description: "Post Basic B.Sc. Nursing programme.",
    image: "images/gallery/pb-bsc-nursing.jpg",
    link: "pbbsc.php"
  },
  {
    name: "GNM Nursing",
    category: "Nursing",
    description: "General Nursing and Midwifery.",
    image: "images/gallery/gnm-nursing.jpg",
    link: "gnm.php"
  },
  {
    name: "Diploma in Pharmacy",
    category: "Pharmacy",
    description: "Build your foundation in pharmacy.",
    image: "images/gallery/diploma-in-pharmacy.jpg",
    link: "diploma-in-pharmacy.php"
  },
  {
    name: "B.Sc. Medical Imaging",
    category: "Allied Health",
    description: "Learn medical imaging technology.",
    image: "images/gallery/bsc-medical-imaging.jpg",
    link: "bsc-medical-imaging.php"
  },
  {
    name: "Diploma in O.T. Technology",
    category: "Allied Health",
    description: "Train in operation theatre technology.",
    image: "images/gallery/diploma-ot-technology.jpg",
    link: "diploma-ot-technology.php"
  },
  {
    name: "Diploma in Ophthalmic Technic",
    category: "Allied Health",
    description: "Training in eye-care technology.",
    image: "images/gallery/diploma-in-ophthalmic-technic.jpg",
    link: "diploma-ophtholmic.php"
  }
];

const coursesTrack = document.getElementById("coursesTrack");

if (coursesTrack) {
  function createCourseCard(course) {
    const card = document.createElement("article");
    card.className = "course-card";

    const img = document.createElement("img");
    img.src = course.image;
    img.alt = course.name;
    img.loading = "lazy";

    const content = document.createElement("div");
    content.className = "course-card-content";

    const category = document.createElement("span");
    category.className = "course-category";
    category.textContent = course.category;

    const heading = document.createElement("h3");
    heading.textContent = course.name;

    const description = document.createElement("p");
    description.textContent = course.description;

    const link = document.createElement("a");
    link.className = "course-link";
    link.href = course.link;
    link.textContent = "View programme";

    content.append(category, heading, description, link);
    card.append(img, content);

    return card;
  }

  // Prevent duplicate cards if the script is initialized again.
  coursesTrack.replaceChildren();

  // Original cards.
  courses.forEach(function (course) {
    coursesTrack.appendChild(createCourseCard(course));
  });

  // Duplicate cards for the continuous CSS animation.
  // courses.forEach(function (course) {
  //   const card = createCourseCard(course);
  //   card.setAttribute("aria-hidden", "true");

  //   card.querySelectorAll("a").forEach(function (link) {
  //     link.setAttribute("tabindex", "-1");
  //   });

  //   coursesTrack.appendChild(card);
  // });
}


/* =========================================================
   2. GALLERY — EVENT BUTTONS AND RESPONSIVE IMAGE GRID
   ========================================================= */

// Generate zero-padded filenames such as 01, 02, 03.
// function pad(n) {
//   return n < 10 ? "0" + n : "" + n;
// }

// // Generate image paths for each event.
// function seq(prefix, start, end, padded, skip) {
//   const images = [];

//   for (let i = start; i <= end; i++) {
//     if (skip && skip.indexOf(i) !== -1) {
//       continue;
//     }

//     const number = padded ? pad(i) : i;

//     images.push(
//       "images/gallery/" + prefix + number + ".jpg"
//     );
//   }

//   return images;
// }

// // Existing event names and image collections are preserved.
// const galleryData = [
//   {
//     name: "International Nursing Day",
//     images: seq("IND-", 1, 13, true)
//   },
//   {
//     name: "College Day",
//     images: seq("photos-", 1, 10, true)
//   },
//   {
//     name: "Blood Donation Camp",
//     images: seq("blood-", 1, 5, true)
//   },
//   {
//     name: "AIDS Day",
//     images: seq("aids-", 1, 3, true)
//   },
//   {
//     name: "Lamp Lighting Ceremony",
//     images: seq("lamp-", 1, 4, true)
//   },
//   {
//     name: "Sports Day",
//     images: seq("sports-", 1, 5, true)
//   },
//   {
//     name: "International Yoga Day",
//     images: seq("yoga-", 1, 13, true)
//   },
//   {
//     name: "Campus Life",
//     images: seq("gallery-", 1, 4, true)
//       .concat(seq("env", 1, 8, false))
//       .concat(seq("", 1, 37, false, [5]))
//   }
// ];

// const galleryEvents = document.getElementById("galleryEvents");
// const galleryGrid = document.getElementById("galleryGrid");
// const galleryTitle = document.getElementById("evTitle");
// const galleryCount = document.getElementById("evCount");

// if (
//   galleryEvents &&
//   galleryGrid &&
//   galleryTitle &&
//   galleryCount
// ) {
//   // Create a photo element without HTML string injection.
//   function createGalleryImage(src, eventName, index) {
//     const img = document.createElement("img");

//     img.src = src;
//     img.alt = eventName + " - Photo " + (index + 1);
//     img.decoding = "async";
//     img.loading = index < 4 ? "eager" : "lazy";

//     // Hide missing images instead of showing broken-image icons.
//     img.addEventListener("error", function () {
//       img.remove();
//       updateGalleryCount();
//     }, { once: true });

//     return img;
//   }

//   // Update the displayed count to reflect images that loaded.
//   function updateGalleryCount() {
//     const visibleImages = galleryGrid.querySelectorAll("img").length;
//     const failedImages = galleryGrid.dataset.failed === "true";

//     // The displayed count normally shows the event's total.
//     // It is adjusted only when image files are missing.
//     if (failedImages) {
//       galleryCount.textContent = visibleImages + " photos";
//     }
//   }

//   function showGalleryEvent(index) {
//     const event = galleryData[index];

//     if (!event) return;

//     // Highlight the active event button.
//     Array.from(galleryEvents.children).forEach(
//       function (button, buttonIndex) {
//         const active = buttonIndex === index;

//         button.classList.toggle("active", active);
//         button.setAttribute("aria-pressed", String(active));
//       }
//     );

//     // Update heading and photo count.
//     galleryTitle.textContent = event.name;
//     galleryCount.textContent = event.images.length + " photos";

//     // Clear the previously selected event's images.
//     galleryGrid.replaceChildren();
//     galleryGrid.dataset.failed = "false";

//     event.images.forEach(function (src, imageIndex) {
//       const img = createGalleryImage(
//         src,
//         event.name,
//         imageIndex
//       );

//       img.addEventListener("error", function () {
//         galleryGrid.dataset.failed = "true";
//       }, { once: true });

//       galleryGrid.appendChild(img);
//     });
//   }

//   // Create one simple button per event.
//   galleryEvents.replaceChildren();

//   galleryData.forEach(function (event, index) {
//     const button = document.createElement("button");

//     button.type = "button";
//     button.className = "gallery-event-btn";
//     button.textContent = event.name;
//     button.setAttribute("aria-pressed", "false");

//     button.addEventListener("click", function () {
//       showGalleryEvent(index);
//     });

//     galleryEvents.appendChild(button);
//   });

//   // Show International Nursing Day by default.
//   showGalleryEvent(0);
// }
/* =========================================================
   2. GALLERY — AUTOMATIC CAROUSEL (20 PHOTOS)
   ========================================================= */

const galleryPhotos = [
  "IND-01", "IND-02", "IND-03",
  "photos-01", "photos-02", "photos-03",
  "blood-01", "blood-02",
  "aids-01", "aids-02",
  "lamp-01", "lamp-02",
  "sports-01", "sports-02",
  "yoga-01", "yoga-02", "yoga-03",
  "gallery-01", "gallery-02",
  "env1"
].map(function (name) {
  return "images/gallery/" + name + ".jpg";
});

const galleryTrack = document.getElementById("galleryTrack");

if (galleryTrack) {
  galleryTrack.replaceChildren();

  // Two identical sets: the animation moves by exactly one set, then restarts.
  [false, true].forEach(function (isCopy) {
    galleryPhotos.forEach(function (src, index) {
      const item = document.createElement("div");
      item.className = "gallery-item";

      const img = document.createElement("img");
      img.src = src;
      img.alt = isCopy
        ? ""
        : "Subash Group of Institutions campus photo " + (index + 1);
      img.decoding = "async";
      img.draggable = false;

      // Remove a missing photo instead of showing a broken icon.
      img.addEventListener("error", function () {
        item.remove();
      }, { once: true });

      if (isCopy) item.setAttribute("aria-hidden", "true");

      item.appendChild(img);
      galleryTrack.appendChild(item);
    });
  });
}

/* =========================================================
   3. STATISTICS — ANIMATED NUMBER COUNTERS
   ========================================================= */

(function initCounters() {
  const vitals = document.querySelector(".vitals");

  if (!vitals || !("IntersectionObserver" in window)) {
    return;
  }

  let countersStarted = false;

  const observer = new IntersectionObserver(
    function (entries) {
      if (!entries[0].isIntersecting || countersStarted) {
        return;
      }

      countersStarted = true;
      observer.disconnect();

      document.querySelectorAll("[data-n]").forEach(
        function (element) {
          const target = Number(element.dataset.n);

          if (!Number.isFinite(target)) return;

          const duration = 1400;
          let startTime = null;

          function animateCounter(timestamp) {
            if (startTime === null) {
              startTime = timestamp;
            }

            const progress = Math.min(
              (timestamp - startTime) / duration,
              1
            );

            const eased = 1 - Math.pow(1 - progress, 3);

            element.textContent = Math.round(
              target * eased
            );

            if (progress < 1) {
              requestAnimationFrame(animateCounter);
            }
          }

          requestAnimationFrame(animateCounter);
        }
      );
    },
    { threshold: 0.4 }
  );

  observer.observe(vitals);
})();


/* =========================================================
   4. MOBILE NAVIGATION — HAMBURGER AND DROPDOWNS
   ========================================================= */

(function initNavigation() {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const scrim = document.getElementById("scrim");

  // Do nothing on pages without this navigation.
  if (!burger || !menu || !scrim) {
    return;
  }

  function setMenu(open) {
    menu.classList.toggle("open", open);
    burger.classList.toggle("on", open);
    scrim.classList.toggle("on", open);

    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute(
      "aria-label",
      open ? "Close menu" : "Open menu"
    );

    document.body.style.overflow = open ? "hidden" : "";
  }

  burger.addEventListener("click", function () {
    setMenu(!menu.classList.contains("open"));
  });

  scrim.addEventListener("click", function () {
    setMenu(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  // Expand and collapse navigation dropdowns.
  document.querySelectorAll(".arr").forEach(function (button) {
    const item = button.closest(".has-sub");

    if (!item) return;

    const submenu = item.querySelector(".sub");

    button.addEventListener("click", function () {
      const desktop = window.innerWidth > 1200;
      let shouldOpen;

      if (desktop) {
        // If the dropdown is showing (hover or click), this click closes it.
        shouldOpen = getComputedStyle(submenu).visibility !== "visible";
      } else {
        shouldOpen = !item.classList.contains("open");
      }

      // Close any other open dropdown.
      document.querySelectorAll(".has-sub.open").forEach(
        function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove("open");

            const otherButton = otherItem.querySelector(".arr");

            if (otherButton) {
              otherButton.setAttribute("aria-expanded", "false");
            }
          }
        }
      );

      item.classList.toggle("open", shouldOpen);
      item.classList.toggle("shut", desktop && !shouldOpen);

      button.setAttribute("aria-expanded", String(shouldOpen));
    });

    // When the mouse leaves, reset so hover works normally again.
    item.addEventListener("mouseleave", function () {
      if (item.classList.contains("shut")) {
        item.classList.remove("shut");

        if (item.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      }
    });
  });

  // Close the mobile menu after selecting a link.
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  // Close the menu when returning to desktop width.
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1200) {
      setMenu(false);
    }
  });

  // Close open desktop dropdowns when clicking outside.
  document.addEventListener("click", function (event) {
    if (
      window.innerWidth > 1200 &&
      !event.target.closest(".has-sub")
    ) {
      document.querySelectorAll(".has-sub.open").forEach(
        function (item) {
          item.classList.remove("open");

          const button = item.querySelector(".arr");

          if (button) {
            button.setAttribute("aria-expanded", "false");
          }
        }
      );
    }
  });
})();


/* =========================================================
   5. HERO BANNER — AUTOMATIC SLIDE EVERY 4 SECONDS
   ========================================================= */

(function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");

  if (slides.length <= 1) return;

  let currentSlide = 0;

  // Ensure the first slide is visible initially.
  slides.forEach(function (slide, index) {
    slide.classList.toggle("active", index === 0);
  });

  // Respect reduced-motion preferences.
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  window.setInterval(function () {
    slides[currentSlide].classList.remove("active");

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add("active");
  }, 4000);
})();
/* =========================================================
   TESTIMONIALS carousel + FAQ accordion
   ========================================================= */
(function initTestimonials() {
  const track = document.getElementById("tmTrack");
  const dotsBox = document.getElementById("tmDots");
  if (!track || !dotsBox) return;

  const cards = Array.from(track.children);
  let current = 0, timer = null;

  cards.forEach(function (card, i) {
    const dot = document.createElement("i");
    dot.addEventListener("click", function () { goTo(i); restart(); });
    dotsBox.appendChild(dot);
  });

  function setDots(i) {
    Array.from(dotsBox.children).forEach(function (d, k) { d.classList.toggle("on", k === i); });
  }

  function goTo(i) {
    current = (i + cards.length) % cards.length;
    const card = cards[current];
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
    setDots(current);
  }

  // Keep the dots in step when the user swipes or drags.
  track.addEventListener("scroll", function () {
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    cards.forEach(function (c, i) {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    current = best;
    setDots(best);
  }, { passive: true });

  function start() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(function () { goTo(current + 1); }, 5500);
  }
  function stop() { clearInterval(timer); }
  function restart() { stop(); start(); }

  track.addEventListener("mouseenter", stop);
  track.addEventListener("mouseleave", start);
  track.addEventListener("touchstart", stop, { passive: true });
  track.addEventListener("touchend", start, { passive: true });

  setDots(0);
  start();
})();

(function initFaq() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        items.forEach(function (other) { if (other !== item) other.open = false; });
      }
    });
  });
})();