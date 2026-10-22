var C = [
  ["B.Sc. Nursing", "Nursing", "Undergraduate degree programme in nursing.", "bsc.php", "#9fe3c6", "#0b2a29"],
  ["M.Sc. Nursing", "Nursing", "Postgraduate programme in nursing.", "msc.php", "#0e4a47", "#eaf7f2"],
  ["PB B.Sc. Nursing", "Nursing", "Post Basic B.Sc. Nursing.", "pbbsc.php", "#ffc93c", "#0b2a29"],
  ["GNM Nursing", "Nursing", "General Nursing and Midwifery.", "gnm.php", "#ff5a4e", "#fff"],
  ["Diploma in Pharmacy", "Pharmacy", "Start your career in pharmacy.", "diploma-in-pharmacy.php", "#f6a6c1", "#3a0b1f"],
  ["B.Sc. Medical Imaging", "Allied health", "Medical Imaging Technology.", "bsc-medical-imaging.php", "#a9c7ff", "#0b1f4a"],
  ["Diploma in O.T. Technology", "Allied health", "Operation Theatre Technology.", "diploma-ot-technology.php", "#c9f08a", "#1c2e05"],
  ["Diploma in Ophthalmic Technic", "Allied health", "Eye-care technician training.", "diploma-ophtholmic.php", "#ffb27a", "#3a1a05"]];
var list = document.getElementById('list'), panel = document.getElementById('panel');
function pick(i) {
  var c = C[i];
  [].forEach.call(list.children, function (li, k) { li.firstChild.setAttribute('aria-selected', k === i) });
  panel.style.background = c[4]; panel.style.color = c[5];
  panel.innerHTML = '<svg viewBox="0 0 400 120" aria-hidden="true"><path d="M0 70 H120 l14-8 14 8 H210 l12 8 8-60 14 100 10-48 H400"/></svg><h3>' + c[0] + '</h3><p>' + c[2] + '</p><a class="btn" href="' + c[3] + '">View programme</a>'
}
C.forEach(function (c, i) { var li = document.createElement('li'), b = document.createElement('button'); b.setAttribute('role', 'tab'); b.innerHTML = c[0] + '<small>' + c[1] + '</small>'; b.onclick = function () { pick(i) }; li.appendChild(b); list.appendChild(li) });
pick(0);
function pad(n) { return n < 10 ? '0' + n : '' + n }
function seq(p, a, b, pd, skip) { var o = []; for (var i = a; i <= b; i++) { if (skip && skip.indexOf(i) > -1) continue; o.push('images/gallery/' + p + (pd ? pad(i) : i) + '.jpg') } return o }
var E = [
  { n: 'International Nursing Day', i: seq('IND-', 1, 13, 1) },
  { n: 'College Day', i: seq('photos-', 1, 10, 1) },
  { n: 'Blood Donation Camp', i: seq('blood-', 1, 5, 1) },
  { n: 'AIDS Day', i: seq('aids-', 1, 3, 1) },
  { n: 'Lamp Lighting Ceremony', i: seq('lamp-', 1, 4, 1) },
  { n: 'Sports Day', i: seq('sports-', 1, 5, 1) },
  { n: 'International Yoga Day', i: seq('yoga-', 1, 13, 1) },
  { n: 'Campus Life', i: seq('gallery-', 1, 4, 1).concat(seq('env', 1, 8)).concat(seq('', 1, 37, 0, [5])) }];
var picker = document.getElementById('picker'), reel = document.getElementById('reel'), bar = document.getElementById('bar'),
  cur = 0, moved = false, calm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
E.forEach(function (e, i) {
  var b = document.createElement('button'); b.className = 'ev'; b.setAttribute('role', 'tab');
  b.innerHTML = '<img loading="lazy" alt="" src="' + e.i[0] + '" onerror="this.remove()"><span>' + e.n + '</span><small>' + e.i.length + ' photos</small>';
  b.onclick = function () { openEv(i, true) }; picker.appendChild(b)
});
function openEv(i, center) {
  cur = i;
  [].forEach.call(picker.children, function (b, k) { b.setAttribute('aria-selected', k === i) });
  if (center) { var b = picker.children[i]; picker.scrollTo({ left: b.offsetLeft - (picker.clientWidth - b.offsetWidth) / 2, behavior: 'smooth' }) }
  document.getElementById('evTitle').textContent = E[i].n;
  document.getElementById('evCount').textContent = E[i].i.length + ' photos';
  reel.innerHTML = '';
  E[i].i.forEach(function (src, k) {
    var s = document.createElement('button'); s.className = 'shot in'; s.style.animationDelay = (k * 60) + 'ms';
    s.setAttribute('aria-label', E[i].n + ' photo ' + (k + 1));
    s.innerHTML = '<img decoding="async" alt="' + E[i].n + ' at Subash Group of Institutions" src="' + src + '" onerror="this.remove()">';
    s.onclick = function () { if (!moved) openLb(k) }; reel.appendChild(s)
  });
  reel.scrollLeft = 0; frame()
}
/* scroll-linked motion: shots tilt/scale toward the centre, photos drift inside their shapes */
var ticking = false;
function frame() {
  ticking = false;
  var rr = reel.getBoundingClientRect(), mid = rr.left + rr.width / 2, max = reel.scrollWidth - reel.clientWidth, vis = Math.max(reel.clientWidth / reel.scrollWidth * 100, 10);
  bar.style.width = vis + '%'; bar.style.marginLeft = ((max > 0 ? reel.scrollLeft / max : 0) * (100 - vis)) + '%';
  if (calm) return;
  [].forEach.call(reel.children, function (s) {
    var r = s.getBoundingClientRect(), d = ((r.left + r.width / 2) - mid) / rr.width;
    if (Math.abs(d) > 1.3) return;
    s.style.setProperty('--s', (1 - Math.min(Math.abs(d), .8) * .2).toFixed(3));
    s.style.setProperty('--r', (d * 6).toFixed(2) + 'deg');
  })
}
function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame) } }
reel.addEventListener('scroll', req, { passive: true }); window.addEventListener('resize', req);
function stepPx() { return Math.max(280, reel.clientWidth * .6) }
document.getElementById('prev').onclick = function () { reel.scrollBy({ left: -stepPx(), behavior: 'smooth' }) };
document.getElementById('next').onclick = function () { reel.scrollBy({ left: stepPx(), behavior: 'smooth' }) };
/* drag + wheel */
var down = false, sx = 0, sl = 0;
reel.addEventListener('mousedown', function (e) { down = true; moved = false; sx = e.pageX; sl = reel.scrollLeft; reel.classList.add('drag') });
window.addEventListener('mouseup', function () { down = false; reel.classList.remove('drag'); setTimeout(function () { moved = false }, 0) });
window.addEventListener('mousemove', function (e) { if (!down) return; var dx = e.pageX - sx; if (Math.abs(dx) > 5) moved = true; reel.scrollLeft = sl - dx });
reel.addEventListener('wheel', function (e) {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    var s = reel.scrollLeft, end = reel.scrollWidth - reel.clientWidth - 1;
    if (!((s <= 0 && e.deltaY < 0) || (s >= end && e.deltaY > 0))) { e.preventDefault(); reel.scrollLeft += e.deltaY * 1.2 }
  }
}, { passive: false });
/* lightbox */
var lb = document.getElementById('lb'), lbi = document.getElementById('lbi'), lbc = document.getElementById('lbc'), ix = 0;
function showLb() { var l = E[cur].i; lbi.src = l[ix]; lbi.alt = E[cur].n; lbc.textContent = E[cur].n + '  |  ' + (ix + 1) + ' / ' + l.length }
function openLb(i) { ix = i; showLb(); lb.classList.add('on'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden' }
function closeLb() { lb.classList.remove('on'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '' }
function go(d) { var n = E[cur].i.length; ix = (ix + d + n) % n; showLb() }
document.getElementById('lbx').onclick = closeLb; document.getElementById('lbp').onclick = function () { go(-1) }; document.getElementById('lbq').onclick = function () { go(1) };
lb.addEventListener('click', function (e) { if (e.target === lb) closeLb() });
document.addEventListener('keydown', function (e) { if (!lb.classList.contains('on')) return; if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1) });
var tx = 0; lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX }, { passive: true });
lb.addEventListener('touchend', function (e) { var d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) go(d > 0 ? -1 : 1) });
openEv(0, false);
var done = 0; new IntersectionObserver(function (en, o) {
  if (!en[0].isIntersecting || done) return; done = 1; o.disconnect();
  document.querySelectorAll('[data-n]').forEach(function (el) { var t = +el.dataset.n, t0 = null; (function f(t1) { t0 = t0 || t1; var p = Math.min((t1 - t0) / 1400, 1); el.textContent = Math.round(t * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f) })(performance.now()) })
}, { threshold: .4 }).observe(document.querySelector('.vitals'));