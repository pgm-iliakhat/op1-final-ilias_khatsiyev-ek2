const openEdit = document.querySelectorAll('.openEdit');
const closeButton = document.querySelector('.closeButton');
const editContainer = document.querySelector('.editContainer');


openEdit.forEach((element) => {
    element.addEventListener('click', () => {
        editContainer.style.display = 'flex';
        editContainer.style.zIndex = '1';
    });
});

closeButton.addEventListener('click', () => {
    editContainer.style.display = 'none';
});

