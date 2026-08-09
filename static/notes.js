(function () {
    var root = document.documentElement;
    var stored = localStorage.getItem('notes-theme');
    if (stored) root.setAttribute('data-theme', stored);

    var toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', function () {
            var current = root.getAttribute('data-theme');
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            var isDark = current ? current === 'dark' : prefersDark;
            var next = isDark ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem('notes-theme', next);
        });
    }

    var search = document.querySelector('.notes-search');
    if (search) {
        search.addEventListener('input', function () {
            var q = search.value.trim().toLowerCase();
            document.querySelectorAll('.notes-nav li').forEach(function (li) {
                var text = li.textContent.toLowerCase();
                li.style.display = text.indexOf(q) === -1 ? 'none' : '';
            });
        });
    }
})();
