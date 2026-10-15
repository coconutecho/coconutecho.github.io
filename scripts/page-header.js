// Shared masthead for every page - injects the brand, the numbered
// section index, contact links and the theme toggle into
// <header class="page-head" data-page-header></header>. A host marked
// data-no-nav gets no section index (the landing page's P3 menu is that index).
// Must load BEFORE theme.js so its DOMContentLoaded handler registers first and
// the #themeToggle button exists when theme.js wires it up.
(function () {
  'use strict';

  // Section order and numbering follow the landing menu (scripts/p3-menu.js).
  var SECTIONS = [
    { file: 'about.html',      label: 'About' },
    { file: 'experience.html', label: 'Experience' },
    { file: 'research.html',   label: 'Research' },
    { file: 'skills.html',     label: 'Skills' },
    { file: 'education.html',  label: 'Education' }
  ];

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function render() {
    var host = document.querySelector('[data-page-header]');
    if (!host) return;

    // Pages under /pages/ need ../ to reach site-root assets; anything at the
    // root uses no prefix.
    var inSubpage = /\/pages\//.test(window.location.pathname);
    var prefix = inSubpage ? '../' : '';
    var pagesPrefix = inSubpage ? '' : 'pages/';

    // A project detail page belongs to the Research section.
    var file = window.location.pathname.split('/').pop() || 'index.html';
    var inProject = !!document.querySelector('.project-hero');

    var withNav = !host.hasAttribute('data-no-nav');
    var nav = SECTIONS.map(function (s, i) {
      var current = s.file === file ? ' aria-current="page"'
        : (inProject && s.file === 'research.html' ? ' aria-current="true"' : '');
      return '<li><a href="' + pagesPrefix + s.file + '"' + current + '>' +
        '<span class="mast-num">' + pad(i + 1) + '</span>' +
        '<span>' + s.label + '</span>' +
        '</a></li>';
    }).join('');

    host.innerHTML = [
      '<div class="mast', withNav ? '' : ' mast--no-nav', '">',
        '<a class="mast-brand" href="', prefix, 'index.html" aria-label="Back to landing page">',
          '<img class="mast-logo" src="', prefix, 'images/logo.svg" alt="Wenyi Xu logo" />',
          '<span>',
            '<span class="mast-name">WENYI XU</span>',
            '<span class="mast-sub">PSYCHOLOGY&nbsp;PH.D.&nbsp;&middot;&nbsp;USC &middot; MACHINE&nbsp;LEARNING</span>',
          '</span>',
        '</a>',
        withNav ? '<nav class="mast-nav" aria-label="Sections"><ol>' + nav + '</ol></nav>' : '',
        '<div class="mast-links">',
          '<a href="mailto:wenyiecho@gmail.com">EMAIL</a>',
          '<a href="https://www.linkedin.com/in/wenyixuecho" target="_blank" rel="noopener">LINKEDIN</a>',
        '</div>',
        '<div class="mast-utils">',
          '<button type="button" id="themeToggle" class="mast-toggle" aria-label="Toggle theme">',
            '<span data-opt="light">LIGHT</span>',
            '<span class="mast-slash" aria-hidden="true">/</span>',
            '<span data-opt="dark">DARK</span>',
          '</button>',
        '</div>',
      '</div>'
    ].join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
