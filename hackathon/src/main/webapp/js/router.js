const routes = {};
export default {
    register(path, component) {
        routes[path] = component
    }, navigate(path) {
        if (location.hash !== '#' + path) location.hash = path; else updateView();
    }
};
window.addEventListener('hashchange', updateView);

async function updateView() {
    try {
        const path = '/' + (location.hash.split('/')[1] || 'wallet');
        const component = routes[path];
        if (!component) throw new Error('404');
        document.querySelector('main').replaceChildren(await component.render());
        document.title = 'Jungfrau Wallet - ' + (component.title || '');
    } catch (e) {
        const div = document.createElement('div');
        div.className = 'container py-5';
        div.innerHTML = '<h1>Page not found</h1>';
        document.querySelector('main').replaceChildren(div);
    }
}
