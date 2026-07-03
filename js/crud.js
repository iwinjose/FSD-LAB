let turfs = JSON.parse(localStorage.getItem('adminTurfs')) || [
    { id: 1, name: 'Arena Prime', location: 'HSR Layout', price: 1500, sport: 'Football' },
    { id: 2, name: 'Greenfield Turf', location: 'Koramangala', price: 1200, sport: 'Cricket' },
];

function saveToLocalStorage() {
    localStorage.setItem('adminTurfs', JSON.stringify(turfs));
}

const turfForm = document.getElementById('turfForm');
const turfIdInput = document.getElementById('turfId');
const turfNameInput = document.getElementById('turfName');
const turfLocationInput = document.getElementById('turfLocation');
const turfPriceInput = document.getElementById('turfPrice');
const turfSportInput = document.getElementById('turfSport');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formTitle = document.getElementById('formTitle');

const turfTableBody = document.getElementById('turfTableBody');
const emptyState = document.getElementById('emptyState');
const turfCount = document.getElementById('turfCount');

function init() {
    renderTurfs();

    turfForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
}

function handleFormSubmit(e) {
    e.preventDefault();

    const id = turfIdInput.value;
    const name = turfNameInput.value.trim();
    const location = turfLocationInput.value.trim();
    const price = turfPriceInput.value;
    const sport = turfSportInput.value;

    if (id) {
        updateTurf(parseInt(id), { name, location, price, sport });
    } else {
        createTurf({ name, location, price, sport });
    }

    resetForm();
    renderTurfs();
}

function createTurf(data) {
    const newId = turfs.length > 0 ? Math.max(...turfs.map(t => t.id)) + 1 : 1;

    const newTurf = {
        id: newId,
        name: data.name,
        location: data.location,
        price: data.price,
        sport: data.sport
    };

    turfs.push(newTurf);
    saveToLocalStorage();
}

function updateTurf(id, data) {
    const index = turfs.findIndex(t => t.id === id);
    if (index !== -1) {
        turfs[index] = { ...turfs[index], ...data };
        saveToLocalStorage();
    }
}

function renderTurfs() {
    turfTableBody.innerHTML = '';

    if (turfs.length === 0) {
        emptyState.classList.remove('hidden');
        turfTableBody.parentElement.classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        turfTableBody.parentElement.classList.remove('hidden');

        turfs.forEach(turf => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-slate-50 transition-colors';

            row.innerHTML = `
                <td class="py-4 px-4 text-slate-800 font-medium">${turf.name}</td>
                <td class="py-4 px-4 text-slate-600">${turf.location}</td>
                <td class="py-4 px-4">
                    <span class="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-semibold">${turf.sport}</span>
                </td>
                <td class="py-4 px-4 text-emerald-600 font-bold">₹${turf.price}</td>
                <td class="py-4 px-4 text-center space-x-4 space-y-1 flex items-center">
                    <button onclick="editTurf(${turf.id})" class="btn-warning text-sm px-3 py-1.5">Edit</button>
                    <button onclick="deleteTurf(${turf.id})" class="btn-danger text-sm px-3 py-1.5">Delete</button>
                </td>
            `;

            turfTableBody.appendChild(row);
        });
    }

    turfCount.textContent = turfs.length;
}

window.editTurf = function (id) {
    const turf = turfs.find(t => t.id === id);
    if (!turf) return;

    turfIdInput.value = turf.id;
    turfNameInput.value = turf.name;
    turfLocationInput.value = turf.location;
    turfPriceInput.value = turf.price;
    turfSportInput.value = turf.sport;

    formTitle.textContent = 'Edit Turf';
    saveBtn.textContent = 'Update Turf';
    cancelBtn.classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.deleteTurf = function (id) {
    if (confirm('Are you sure you want to delete this turf?')) {
        turfs = turfs.filter(t => t.id !== id);
        saveToLocalStorage();
        renderTurfs();
    }
}

function resetForm() {
    turfForm.reset();
    turfIdInput.value = '';
    formTitle.textContent = 'Add New Turf';
    saveBtn.textContent = 'Save Turf';
    cancelBtn.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', init);
