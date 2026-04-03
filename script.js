const schedule = [
    { time: "06:00", label: "06:00 AM", title: "Wake up, freshen up", desc: "Start the day fresh", icon: "ph-sun", category: "cat-rest" },
    { time: "06:15", label: "06:15 AM", title: "Light stretching / warm-up", desc: "Prepare the body", icon: "ph-person-arms-spread", category: "cat-health" },
    { time: "06:30", label: "06:30 AM", title: "Small snack", desc: "Pre-workout fuel", icon: "ph-apple-logo", category: "cat-health" },
    { time: "07:00", label: "07:00 AM", title: "Gym workout", desc: "1 to 1.5 hrs strength/cardio", icon: "ph-barbell", category: "cat-health" },
    { time: "08:30", label: "08:30 AM", title: "Cool down + bath", desc: "Post-workout recovery", icon: "ph-drop", category: "cat-health" },
    { time: "09:00", label: "09:00 AM", title: "Breakfast", desc: "Healthy start", icon: "ph-coffee", category: "cat-health" },
    { time: "09:30", label: "09:30 AM", title: "Learning", desc: "HTML/CSS/Tailwind concepts", icon: "ph-book-open-text", category: "cat-learn" },
    { time: "11:30", label: "11:30 AM", title: "Break", desc: "15–30 mins to refresh", icon: "ph-coffee-bean", category: "cat-rest" },
    { time: "12:00", label: "12:00 PM", title: "Practice coding", desc: "Implement concepts learned", icon: "ph-code", category: "cat-code" },
    { time: "13:30", label: "01:30 PM", title: "Lunch + rest", desc: "Refuel and relax", icon: "ph-hamburger", category: "cat-health" },
    { time: "14:30", label: "02:30 PM", title: "Project work", desc: "Build real UI like login page", icon: "ph-laptop", category: "cat-code" },
    { time: "16:30", label: "04:30 PM", title: "Break / relax", desc: "Step away from screen", icon: "ph-couch", category: "cat-rest" },
    { time: "17:00", label: "05:00 PM", title: "Revision / light learning", desc: "Videos/notes", icon: "ph-notebook", category: "cat-learn" },
    { time: "18:30", label: "06:30 PM", title: "Free time / hobbies", desc: "Do what you love", icon: "ph-game-controller", category: "cat-rest" },
    { time: "19:30", label: "07:30 PM", title: "Dinner", desc: "Last main meal", icon: "ph-fork-knife", category: "cat-health" },
    { time: "20:30", label: "08:30 PM", title: "Quick revision + plan", desc: "Set goals for next day", icon: "ph-list-checks", category: "cat-learn" },
    { time: "21:30", label: "09:30 PM", title: "Relax (no screens)", desc: "Read, meditate, wind down", icon: "ph-book-open", category: "cat-rest" },
    { time: "22:30", label: "10:30 PM", title: "Sleep", desc: "8 hours of recovery", icon: "ph-moon", category: "cat-rest" }
];

const timelineContainer = document.getElementById('timeline');
const timeEl = document.getElementById('current-time');
const dateEl = document.getElementById('current-date');

// Format date to: "Fri 12, Apr"
function formatDate() {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
}

// Convert 24h format "14:30" to minutes from midnight
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

function renderTimeline() {
    timelineContainer.innerHTML = '';

    schedule.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = `timeline-item ${item.category}`;
        itemEl.id = `item-${index}`;

        itemEl.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="time-badge">${item.label}</div>
                <div class="task-details">
                    <div class="icon-wrapper">
                        <i class="ph ${item.icon}"></i>
                    </div>
                    <div class="task-info">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                    </div>
                </div>
            </div>
        `;

        timelineContainer.appendChild(itemEl);
    });
}

function updateTimeAndActiveState() {
    const now = new Date();

    // Update Clock
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    timeEl.innerText = `${hours}:${minutes} ${ampm}`;
    dateEl.innerText = formatDate();

    // Calculate active task
    const currentMins = now.getHours() * 60 + now.getMinutes();

    let activeIndex = -1;
    for (let i = 0; i < schedule.length; i++) {
        const itemMins = timeToMinutes(schedule[i].time);

        if (i === schedule.length - 1) {
            // Last item
            if (currentMins >= itemMins || currentMins < timeToMinutes(schedule[0].time)) {
                activeIndex = i;
            }
        } else {
            const nextItemMins = timeToMinutes(schedule[i + 1].time);
            if (currentMins >= itemMins && currentMins < nextItemMins) {
                activeIndex = i;
                break;
            }
        }
    }

    // Update UI for active item
    document.querySelectorAll('.timeline-item').forEach((el, idx) => {
        if (idx === activeIndex) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

// Initial render
renderTimeline();
updateTimeAndActiveState();

// Update every minute (or more frequently for clock accuracy)
setInterval(updateTimeAndActiveState, 1000);
