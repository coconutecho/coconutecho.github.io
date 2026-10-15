// Project detail banner enhancements, shared by every page that has a
// <section class="project-hero">:
//   1. Injects a "← 03 Research" back link above the title.
//   2. Builds a compact sticky bar that freezes to the top of the viewport once
//      the big banner scrolls out of view - a back arrow, then
//      "Project name - role" taken from the title and the first meta item.
(function () {
  'use strict';

  var BACK_HREF = 'research.html';   // pages live in /pages/, so relative is fine
  var BACK_NUM = '03';               // Research's number in the masthead index
  var ARROW = '←';

  function shortName(fullTitle) {
    // "Partial Bayesian Networks - Chest X-Rays" -> "Partial Bayesian Networks"
    var i = fullTitle.indexOf(' - ');
    return (i > 0 ? fullTitle.slice(0, i) : fullTitle).trim();
  }

  function stripRolePrefix(s) {
    // drop a leading "Role:" label up to the first colon
    return s.replace(/^\s*[^:]*:\s*/, '').trim();
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&quot;';
    });
  }

  function init() {
    var hero = document.querySelector('.project-hero');
    if (!hero) return;

    var titleEl = hero.querySelector('.project-hero__title');
    var roleEl = hero.querySelector('.project-hero__meta-item'); // first = Role

    // 1. Back link above the title, numbered like the masthead's section index.
    if (!hero.querySelector('.project-hero__back')) {
      var back = document.createElement('a');
      back.className = 'project-hero__back';
      back.href = BACK_HREF;
      back.setAttribute('aria-label', 'Back to Research');
      back.setAttribute('title', 'Back to Research');
      back.innerHTML =
        '<span aria-hidden="true">' + ARROW + '</span>' +
        '<span class="project-hero__back-num">' + BACK_NUM + '</span>' +
        '<span class="project-hero__back-label">Research</span>';
      hero.appendChild(back);
    }

    // 2. Compact sticky bar.
    var name = titleEl ? shortName(titleEl.textContent) : '';
    var role = roleEl ? stripRolePrefix(roleEl.textContent) : '';
    var compact = role ? (name + ' - ' + role) : name;

    var bar = document.createElement('div');
    bar.className = 'project-hero-bar';
    bar.innerHTML =
      '<a class="project-hero-bar__back" href="' + BACK_HREF + '" aria-label="Back to Research" title="Back to Research">' + ARROW + '</a>' +
      '<div class="project-hero-bar__label">' + esc(compact) + '</div>';
    document.body.appendChild(bar);

    // Show the bar once the big banner has scrolled fully above the viewport.
    var ticking = false;
    function update() {
      ticking = false;
      var passed = hero.getBoundingClientRect().bottom <= 0;
      bar.classList.toggle('visible', passed);
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
