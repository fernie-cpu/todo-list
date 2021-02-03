function getModal() {
    const modalBtn = document.querySelector('.add-task');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');

    modalBtn.addEventListener('click', () => modal.classList.add('modal-active'));
    closeModal.addEventListener('click', () => modal.classList.remove('modal-active'));

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove('modal-active');
        }
    });
}

export {getModal}