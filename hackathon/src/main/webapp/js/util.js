const TEMPLATE_PATH = 'templates/';
export default {
    async loadTemplate(name) {
        const div = document.createElement('div');
        const res = await fetch(TEMPLATE_PATH + name);
        if (!res.ok) throw new Error('Template not found: ' + name);
        div.innerHTML = await res.text();
        return div;
    }, activateNav(view) {
        const hash = location.hash || '#/wallet';
        view.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.getAttribute('href') === hash));
        return view;
    }
};
