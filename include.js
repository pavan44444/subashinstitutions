/* include.js: loads components/header.html and components/footer.html,
   fixes their links so they work from ANY folder (home page, Courses/ ...),
   then loads script.js.
   Keep this file in the main site folder, next to index.html. */
(function () {
    const base = new URL(".", document.currentScript.src); // main site folder (holds include.js)

    const parts = [
        { id: "site-header", file: "components/header.html" },
        { id: "site-footer", file: "components/footer.html" }
    ];

    /* Where each page really lives now (old name -> new location) */
    const PAGES = {
        "about": "about.html",
        "chairman": "chairman-message.html",
        "chairman-message": "chairman-message.html",
        "bsc": "Courses/bsc-nursing.html",
        "msc": "Courses/msc-nursing.html",
        "pbbsc": "Courses/pb-bsc-nursing.html",
        "gnm": "Courses/gnm-nursing.html",
        "diploma-in-pharmacy": "Courses/diploma-in-pharmacy.html",
        "bsc-medical-imaging": "Courses/bsc-medical-imaging-technology.html",
        "diploma-ot-technology": "Courses/diploma-in-ot-technology.html",
        "diploma-ophtholmic": "Courses/diploma-in-ophthalmic-technic.html"
    };

    const FOOTER_FALLBACK = `
<footer id="contact">
  <div class="w">
    <div class="f-top">

      <!-- Column 1: contact -->
      <div class="f-col f-about">
        <h2>Come and see us.</h2>
        <h4>Visit</h4>
        <p># 1790/860, B.M. Road, Bidadi, Bangalore – 562 109,<br>Ramanagaram District, Karnataka, India</p>
        <h4>Call</h4>
        <p><a href="tel:+919620409905">+91 96204 09905</a> · <a href="tel:+919620407335">+91 96204 07335</a></p>
        <h4>Write</h4>
        <p><a href="mailto:scnbidadi@gmail.com">scnbidadi@gmail.com</a></p>
        <div class="social">
          <a href="#" class="s-fb" aria-label="Facebook" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg></a>
          <a href="#" class="s-ig" aria-label="Instagram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg></a>
          <a href="#" class="s-x" aria-label="X (Twitter)" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg></a>
          <a href="#" class="s-in" aria-label="LinkedIn" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          <a href="#" class="s-yt" aria-label="YouTube" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        </div>
      </div>

      <!-- Column 2: quick links -->
      <div class="f-col" style="--fc:#ffd23f">
        <h5>Quick links</h5>
        <a href="index.html">Home</a>
        <a href="about.html">About us</a>
        <a href="admissions.html">Admissions</a>
        <a href="apply-online.html">Apply online</a>
        <a href="images/pdf/brochure.pdf" target="_blank" rel="noopener">Download brochure</a>
        <a href="affiliation.html">Affiliation</a>
        <a href="ch-facilities.html">Campus &amp; hostel</a>
        <a href="pc-facilities.html">Placement &amp; clinical</a>
        <a href="index.html#gallery">Gallery</a>
      </div>

      <!-- Column 3: courses -->
      <div class="f-col" style="--fc:#2fd18b">
        <h5>Courses</h5>
        <a href="bsc.html">B.Sc. Nursing</a>
        <a href="msc.html">M.Sc. Nursing</a>
        <a href="pbbsc.html">PB B.Sc. Nursing</a>
        <a href="gnm.html">GNM Nursing</a>
        <a href="diploma-in-pharmacy.html">Diploma in Pharmacy</a>
        <a href="bsc-medical-imaging.html">B.Sc. Medical Imaging</a>
        <a href="diploma-ot-technology.html">Diploma in O.T. Technology</a>
        <a href="diploma-ophtholmic.html">Diploma in Ophthalmic Technic</a>
      </div>

      <!-- Column 4: small map -->
      <div class="f-col f-map" style="--fc:#b79bff">
        <h5>Find us</h5>
        <div class="map"><iframe title="Subash Group of Institutions map" loading="lazy" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.331625877804!2d77.45762801490953!3d12.691764991039886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae44ad6c268d41%3A0x476b55ded4b93eae!2sSubash+Group+of+Institution!5e0!3m2!1sen!2sin!4v1526897050900"></iframe></div>
        <div class="f-btns">
          <a class="btn b-coral" href="https://wa.me/919620407335" target="_blank" rel="noopener">WhatsApp us</a>
          <a class="btn" href="https://www.google.com/maps/search/?api=1&query=Subash+Group+of+Institution+Bidadi" target="_blank" rel="noopener">Get directions</a>
        </div>
      </div>

    </div>

    <div class="fb"><span>© 2026 Subash Group of Institutions. All rights reserved.</span><span>Designed by EMSWEBTECH</span></div>
  </div>
</footer>
`;

    function warn(target, text) {
        target.insertAdjacentHTML(
            "afterbegin",
            '<div style="background:#b00020;color:#fff;padding:14px 18px;font:15px/1.5 sans-serif">' + text + "</div>"
        );
    }

    /* Make every link / image in the header and footer point to the right
       place no matter which folder the current page is in. */
    function fixLinks(root) {
        root.querySelectorAll("a[href], img[src]").forEach(function (el) {
            const attr = el.tagName === "A" ? "href" : "src";
            const raw = el.getAttribute(attr);
            if (!raw || /^(https?:|mailto:|tel:|#|\/\/|data:|javascript:)/i.test(raw)) return;

            const hashAt = raw.indexOf("#");
            const path = hashAt === -1 ? raw : raw.slice(0, hashAt);
            const hash = hashAt === -1 ? "" : raw.slice(hashAt);
            if (!path) return;

            // Links are written relative to the MAIN site folder (where include.js is),
            // e.g. "Courses/msc-nursing.html", and resolved against that folder below.
            let target = path;
            const file = path.split("/").pop();
            const key = file.replace(/\.(php|html)$/i, "");
            if (PAGES[key]) target = PAGES[key];                 // known page: use its real location
            else if (path.indexOf("/") === -1) target = path.replace(/\.php$/i, ".html");
            const u = new URL(target, base);
            el.setAttribute(attr, u.pathname + u.search + hash);
        });
    }

    function load(part) {
        const target = document.getElementById(part.id);
        if (!target) return Promise.resolve();

        if (location.protocol === "file:") {
            warn(target, "Open this page with Live Server (http://127.0.0.1...), not as a file.");
            return Promise.resolve();
        }

        const url = new URL(part.file, base);

        return fetch(url, { cache: "no-store" })
            .then(function (res) {
                if (!res.ok) throw new Error("HTTP " + res.status + " at " + url.pathname);
                return res.text();
            })
            .then(function (html) {
                if (!html.trim()) throw new Error("the file is empty");
                target.innerHTML = html;

                // The footer must have 4 columns. If not, use the built-in footer.
                if (part.id === "site-footer" && target.querySelectorAll(".f-col").length < 4) {
                    console.warn("components/footer.html is incomplete. Using the built-in footer.");
                    target.innerHTML = FOOTER_FALLBACK;
                }
                fixLinks(target);
            })
            .catch(function (err) {
                if (part.id === "site-footer") {
                    console.warn("Could not load footer.html (" + err.message + "). Using the built-in footer.");
                    target.innerHTML = FOOTER_FALLBACK;
                    fixLinks(target);
                } else {
                    warn(target, "Could not load <b>" + part.file + "</b>: " + err.message);
                    console.error(err);
                }
            });
    }

    function markActivePage() {
        document.querySelectorAll("#site-header .menu a").forEach(function (a) {
            if (a.pathname === location.pathname) a.classList.add("active");
        });
    }

    Promise.all(parts.map(load)).then(function () {
        markActivePage();
        const main = document.createElement("script");
        main.src = new URL("script.js", base).href;
        document.body.appendChild(main);
    });
})();