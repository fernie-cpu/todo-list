function toggleLightMode() {
    const checkbox = document.querySelector('.checkbox');

    checkbox.addEventListener('change', () => {
        document.body.classList.toggle('light');
    });
}

export {toggleLightMode}