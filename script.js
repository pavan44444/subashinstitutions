(function () {
  'use strict';

  /* ---------- Gallery data (same image paths as your site) ---------- */
  var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
  var seq = function (prefix, from, to, padded, skip) {
    var out = [];
    for (var i = from; i <= to; i++) {
      if (skip && skip.indexOf(i) > -1) continue;
      out.push('images/gallery/' + prefix + (padded ? pad(i) : i) + '.jpg');
    }
    return out;
  };

  var campus = seq('gallery-', 1, 4, true)
    .concat(seq('env', 1, 8, false))
    .concat(seq('', 1, 37, false, [5]));

  var EVENTS = [
    { name: 'International Nursing Day', imgs: seq('IND-', 1, 13, true) },
    { name: 'College Day',               imgs: seq('photos-', 1, 10, true) },
    { name: 'Blood Donation Camp',       imgs: seq('blood-', 1, 5, true) },
    { name: 'AIDS Day',                  imgs: seq('aids-', 1, 3, true) },
    { name: 'Lamp Lighting Ceremony',    imgs: seq('lamp-', 1, 4, true) },
    { name: 'Sports Day',                imgs: seq('sports-', 1, 5, true) },
    { name: 'International Yoga Day',    imgs: seq('yoga-', 1, 13, true) },
    { name: 'Campus Life',               imgs: campus }
  ];

  var eventsEl = document.getElementById('events');
  var stripEl  = document.getElementById('strip');
  var titleEl  = document.getElementById('eventTitle');
  var barEl    = document.getElementById('bar');
  var current  = 0;

  function renderEvents() {
    EVENTS.forEach(function (ev, i) {
      var b = document.createElement('button');
      b.className = 'ev' + (i === 0 ? ' active' : '');
      b.setAttribute('role', 'tab');
      b.innerHTML = '<img loading="lazy" src="' + ev.imgs[0] + '" alt="">' +
                    '<span>' + ev.name + '</span><small>' + ev.imgs.length + ' photos</small>';
      b.addEventListener('click', function () { openEvent(i); });
      eventsEl.appendChild(b);
    });
  }

  function openEvent(i) {
    current = i;
    var ev = EVENTS[i];
    Array.prototype.forEach.call(eventsEl.children, function (c, k) {
      c.classList.toggle('active', k === i);
    });
    titleEl.textContent = ev.name;
    stripEl.innerHTML = '';
    ev.imgs.forEach(function (src, k) {
      var s = document.createElement('button');
      s.className = 'shot';
      s.setAttribute('aria-label', ev.name + ' photo ' + (k + 1));
      var im = new Image();
      im.loading = 'lazy'; im.src = src; im.alt = ev.name + ' - Subash Group of Institutions';
      im.draggable = false;
      im.onerror = function () { s.style.display = 'none'; };
      s.appendChild(im);
      s.addEventListener('click', function () { if (!moved) openLightbox(k); });
      stripEl.appendChild(s);
    });
    stripEl.scrollLeft = 0;
    stripEl.classList.remove('fade'); void stripEl.offsetWidth; stripEl.classList.add('fade');
    updateBar();
  }

  /* ---------- Horizontal scroll: arrows, drag, progress ---------- */
  function step() { return Math.max(260, stripEl.clientWidth * 0.7); }
  document.getElementById('prev').onclick = function () { stripEl.scrollBy({ left: -step(), behavior: 'smooth' }); };
  document.getElementById('next').onclick = function () { stripEl.scrollBy({ left:  step(), behavior: 'smooth' }); };

  function updateBar() {
    var max = stripEl.scrollWidth - stripEl.clientWidth;
    var pct = max > 0 ? (stripEl.scrollLeft / max) * 100 : 100;
    var vis = max > 0 ? (stripEl.clientWidth / stripEl.scrollWidth) * 100 : 100;
    barEl.style.width = Math.max(vis, 8) + '%';
    barEl.style.marginLeft = (pct * (100 - Math.max(vis, 8)) / 100) + '%';
  }
  stripEl.addEventListener('scroll', updateBar, { passive: true });
  window.addEventListener('resize', updateBar);

  var down = false, startX = 0, startL = 0, moved = false;
  stripEl.addEventListener('mousedown', function (e) {
    down = true; moved = false; startX = e.pageX; startL = stripEl.scrollLeft;
    stripEl.classList.add('drag');
  });
  window.addEventListener('mouseup', function () {
    down = false; stripEl.classList.remove('drag');
    setTimeout(function () { moved = false; }, 0);
  });
  window.addEventListener('mousemove', function (e) {
    if (!down) return;
    var dx = e.pageX - startX;
    if (Math.abs(dx) > 5) moved = true;
    stripEl.scrollLeft = startL - dx;
  });
  // Mouse wheel scrolls horizontally when hovering the strip
  stripEl.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && stripEl.scrollWidth > stripEl.clientWidth) {
      var atStart = stripEl.scrollLeft <= 0 && e.deltaY < 0;
      var atEnd = stripEl.scrollLeft >= stripEl.scrollWidth - stripEl.clientWidth - 1 && e.deltaY > 0;
      if (!atStart && !atEnd) { e.preventDefault(); stripEl.scrollLeft += e.deltaY; }
    }
  }, { passive: false });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById('lightbox'),
      lbImg = document.getElementById('lbImg'),
      lbCount = document.getElementById('lbCount'),
      idx = 0;

  function showLb() {
    var list = EVENTS[current].imgs;
    lbImg.src = list[idx];
    lbImg.alt = EVENTS[current].name;
    lbCount.textContent = EVENTS[current].name + '  \u2022  ' + (idx + 1) + ' / ' + list.length;
  }
  function openLightbox(i) { idx = i; showLb(); lb.classList.add('on'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function closeLightbox() { lb.classList.remove('on'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  function nav(d) { var n = EVENTS[current].imgs.length; idx = (idx + d + n) % n; showLb(); }
  document.getElementById('lbClose').onclick = closeLightbox;
  document.getElementById('lbPrev').onclick = function () { nav(-1); };
  document.getElementById('lbNext').onclick = function () { nav(1); };
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('on')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') nav(-1);
    if (e.key === 'ArrowRight') nav(1);
  });
  var tx = 0;
  lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) nav(dx > 0 ? -1 : 1);
  });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger'), navEl = document.getElementById('nav');
  burger.addEventListener('click', function () {
    var open = navEl.classList.toggle('open');
    burger.classList.toggle('on', open);
  });
  document.querySelectorAll('.has-sub > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        a.parentElement.classList.toggle('open');
      }
    });
  });
  navEl.querySelectorAll('.sub a, .nav > ul > li:not(.has-sub) > a').forEach(function (a) {
    a.addEventListener('click', function () { navEl.classList.remove('open'); burger.classList.remove('on'); });
  });

  /* ---------- Scroll reveal + counters ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
    io.observe(el);
  });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = +el.dataset.count, t0 = null;
    function tick(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1400, 1);
      el.firstChild.nodeValue = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  /* ---------- Init ---------- */
  renderEvents();
  openEvent(0);
})();