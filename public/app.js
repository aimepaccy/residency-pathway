const steps = document.querySelectorAll('.step');
const nextBtn = document.querySelector('#next-btn');
const backBtn = document.querySelector('#back-btn');
const form = document.querySelector('#pathway-form');
const results = document.querySelector('#results');
const feedbackForm = document.querySelector('#feedback-form');
const feedbackStatus = document.querySelector('#feedback-status');
let current = 0;

function showStep(n) {
    steps.forEach((step, index) => {
        step.hidden = index !== n;
    });
}

function addCard(title, items) {
    const card = document.createElement('section');
    const heading = document.createElement('h2');
    heading.textContent = title;
    card.appendChild(heading);

    const list = document.createElement('ul');
    items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
    card.appendChild(list);

    results.appendChild(card);
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

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const university = document.querySelector('#university').value;
    const specialty = document.querySelector('#specialty').value;
    const region = document.querySelector('input[name="region"]:checked').value;
    const response = await fetch('/api/pathway', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ specialty, region })
    });
    const data = await response.json();
    if (!response.ok) {
        results.textContent = data.error;
        return;
    }
    results.textContent = '';
    addCard('Best and most likely destinations', data.destinations);
    addCard('What to do now', data.whatToDoNow);
    addCard('Requirements', data.requirements);
    addCard('Sites to visit for more info', data.sites);
});

feedbackForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    feedbackStatus.textContent = '';
    const message = document.querySelector('#feedback').value.trim();
    if (!message) {
        feedbackStatus.textContent = 'Please write something before sending.';
        return;
    }
    console.log('Feedback to send:', message);
});
