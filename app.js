var ICONS = {
  mars: '<circle cx="8" cy="8.6" r="3.6"/><path d="M10.9 10.9 16.6 5.2"/><path d="M16.6 5.2v4.2M16.6 5.2h-4.2"/>',
  venus: '<circle cx="12" cy="7.8" r="3.6"/><path d="M12 11.4V19"/><path d="M8.8 15.5h6.4"/>',
  calendar: '<rect x="3.2" y="4.8" width="17.6" height="15.4" rx="3"/><path d="M8 2.8v4M16 2.8v4M3.2 9.6h17.6"/>',
  clock: '<circle cx="12" cy="12" r="8.4"/><path d="M12 7.2V12l3.4 2"/>',
  pin: '<path d="M12 21s-6.2-5.2-6.2-10.2a6.2 6.2 0 1 1 12.4 0C18.2 15.8 12 21 12 21z"/><circle cx="12" cy="10.8" r="2.4"/>',
  heart: '<path d="M12 20.4C5.6 15.9 3.4 12.2 3.4 9.4A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8.6 2.8c0 2.8-2.2 6.5-8.6 11z"/>',
  gift: '<rect x="4.2" y="8.4" width="15.6" height="4" rx="1.2"/><path d="M6 12.4V19a1.6 1.6 0 0 0 1.6 1.6h8.8A1.6 1.6 0 0 0 18 19v-6.6"/><path d="M12 8.4v12.2"/><path d="M12 8.4H8.4a2.4 2.4 0 1 1 2.3-3.9L12 6.7l1.3-2.2a2.4 2.4 0 1 1 2.3 3.9H12z"/>',
  check: '<path d="m5.5 12.5 4.2 4L18.5 7.5"/>',
  arrow: '<path d="M5 12h13"/><path d="m13 6 6 6-6 6"/>',
  map: '<path d="M9.5 4 3 6.6v13.8L9.5 18l5 2.4 6.5-2.6V5.2L14 8z"/><path d="M9.5 4v14M14 8v12.4"/>'
};

function paintIcons() {
  document.querySelectorAll('[data-ic]').forEach(function (el) {
    var key = el.getAttribute('data-ic');
    if (!ICONS.hasOwnProperty(key)) return;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.7');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', 'ic');
    svg.innerHTML = ICONS[key];
    el.replaceWith(svg);
  });
}

function chooseTeam(id) {
  var body = document.body;
  var intro = document.getElementById('intro');
  var main = document.getElementById('main');

  body.classList.remove('team-nino', 'team-nina');
  body.classList.add(id === 'nino' ? 'team-nino' : 'team-nina');

  var hex = id === 'nino' ? '0c3d9b' : 'c3026b';
  document.title = (id === 'nino' ? 'Team Niño' : 'Team Niña') + ' · Revelación de Género · Yeny & Camilo';

  var fav = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22%3E%3Crect width=%2264%22 height=%2264%22 rx=%2216%22 fill=%22%23' + hex + '%22/%3E%3Ctext x=%2232%22 y=%2242%22 font-family=%22Arial%22 font-weight=%22bold%22 font-size=%2226%22 fill=%22white%22 text-anchor=%22middle%22%3EYC%3C/text%3E%3C/svg%3E';
  var link = document.querySelector('link[rel="icon"]');
  if (link) link.setAttribute('href', fav);

  burstConfetti(id === 'nino' ? 'blue' : 'pink');

  intro.classList.add('closed');
  setTimeout(function () {
    intro.style.display = 'none';
    main.classList.add('show');
    setTimeout(observeSections, 60);
  }, 820);
}

document.querySelectorAll('.pick-card').forEach(function (btn) {
  btn.addEventListener('click', function () {
    chooseTeam(btn.getAttribute('data-team'));
  });
});

var sight = null;
if ('IntersectionObserver' in window) {
  sight = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('in');
      else e.target.classList.remove('in');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -12% 0px' });
}

function observeSections() {
  document.querySelectorAll('#main .rv').forEach(function (el) {
    if (sight) sight.observe(el);
    else el.classList.add('in');
  });
}

var end = new Date('2026-08-23T13:00:00-05:00').getTime();
function tick() {
  var diff = Math.max(0, Math.floor((end - Date.now()) / 1000));
  document.getElementById('d').textContent = String(Math.floor(diff / 86400)).padStart(2, '0');
  document.getElementById('h').textContent = String(Math.floor(diff % 86400 / 3600)).padStart(2, '0');
  document.getElementById('m').textContent = String(Math.floor(diff % 3600 / 60)).padStart(2, '0');
  document.getElementById('s').textContent = String(diff % 60).padStart(2, '0');
}
tick();
setInterval(tick, 1000);

var mapLink = document.getElementById('map-link');
if (mapLink) {
  mapLink.setAttribute('target', '_blank');
  mapLink.setAttribute('rel', 'noopener');
  mapLink.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Parque los Frailejones, vía Sibaté - La Unión, Sibaté, Colombia'));
}

function burstConfetti(tone) {
  var colors = tone === 'blue'
    ? ['#1476e8', '#45b7ff', '#8fd0ff', '#ffd766', '#ffffff']
    : ['#e0188a', '#ff8fc0', '#ffc9e2', '#ffd766', '#ffffff'];
  var area = document.getElementById('confetti');
  for (var i = 0; i < 120; i++) {
    var p = document.createElement('i');
    p.className = 'piece';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = (4 + Math.random() * 6) + 'px';
    p.style.height = (8 + Math.random() * 7) + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    p.style.animationDuration = (2.6 + Math.random() * 2.8) + 's';
    p.style.animationDelay = (Math.random() * 0.7) + 's';
    area.appendChild(p);
    (function (el) {
      setTimeout(function () { el.remove(); }, 6500);
    })(p);
  }
}

paintIcons();