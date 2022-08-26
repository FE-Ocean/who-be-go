const main = document.querySelector('main.main');
const loading = document.querySelector('div.main.wrapper-etc');
export const complete = () => {
    if (main instanceof HTMLElement) {
        main.style.display = 'block';
    }
    if (loading instanceof HTMLDivElement) {
        loading.style.display = 'none';
    }
};
