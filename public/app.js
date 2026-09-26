const steps = document.querySelectorAll('.step');
const nextBtn = document.querySelector('#next-btn');
const backBtn = document.querySelector('#back-btn');
let current = 0;

function showStep(n) {
    steps.forEach((step, index) => {
        step.hidden = index !== n;
    });
}

showStep(current);

nextBtn.addEventListener('click', () => {
    if (current < steps.length - 1) {
        current = current + 1;
        showStep(current);
    }
});

backBtn.addEventListener('click', () => {
    if (current > 0) {
        current = current - 1;
        showStep(current);
    }
});