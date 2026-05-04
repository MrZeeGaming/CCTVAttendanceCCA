let currentPage = 'login';

        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update navigation
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('onclick') === `showPage('${pageId}')`) {
                    link.classList.add('active');
                }
            });
            
            currentPage = pageId;
        }



function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('collapsed');
  }



function goToPage() {
    window.location.href = "studentui.html";
}

function toggleProfileOverlay() {
    const overlay = document.getElementById('profileOverlay');
    overlay.classList.toggle('active');
}

// Close profile overlay when clicking outside
document.addEventListener('click', function(event) {
    const profileIcon = document.getElementById('profileicon');
    const profileOverlay = document.getElementById('profileOverlay');
    
    if (profileOverlay && !profileIcon.contains(event.target) && !profileOverlay.contains(event.target)) {
        profileOverlay.classList.remove('active');
    }
});

function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    modal.classList.add('active');
    document.getElementById('profileOverlay').classList.remove('active');
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    modal.classList.remove('active');
}

function openPasswordModal() {
    const passwordModal = document.getElementById('passwordModal');
    const settingsModal = document.getElementById('settingsModal');
    settingsModal.classList.remove('active');
    passwordModal.classList.add('active');
}

function closePasswordModal() {
    const passwordModal = document.getElementById('passwordModal');
    passwordModal.classList.remove('active');
}

function savePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all password fields.');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match.');
        return;
    }

    alert('Password change saved successfully.');
    closePasswordModal();
}

// Close modal when clicking outside the modal content
document.addEventListener('click', function(event) {
    const settingsModal = document.getElementById('settingsModal');
    const passwordModal = document.getElementById('passwordModal');
    const faceModal = document.getElementById('faceRegistrationModal');
    if (settingsModal && event.target === settingsModal) {
        closeSettingsModal();
    }
    if (passwordModal && event.target === passwordModal) {
        closePasswordModal();
    }
    if (faceModal && event.target === faceModal) {
        closeFaceRegistrationModal();
    }
});

function openProfileEditModal() {
    const profileEditModal = document.getElementById('profileEditModal');
    const settingsModal = document.getElementById('settingsModal');
    settingsModal.classList.remove('active');
    profileEditModal.classList.add('active');
}

function closeProfileEditModal() {
    const profileEditModal = document.getElementById('profileEditModal');
    profileEditModal.classList.remove('active');
}

function setActiveMenu(element) {
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}

function saveProfile() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    if (!firstName || !lastName || !address) {
        alert('Please fill in your first name, last name, and address.');
        return;
    }

    alert('Profile updated successfully.');
    closeProfileEditModal();
}

let faceCaptureStream = null;
let faceCaptureDataUrl = null;

function openFaceRegistrationModal() {
    const faceModal = document.getElementById('faceRegistrationModal');
    const settingsModal = document.getElementById('settingsModal');
    resetFaceCapture();
    settingsModal.classList.remove('active');
    faceModal.classList.add('active');
}

function closeFaceRegistrationModal() {
    const faceModal = document.getElementById('faceRegistrationModal');
    faceModal.classList.remove('active');
    resetFaceCapture();
}

function startFaceCapture() {
    const cameraContainer = document.getElementById('cameraContainer');
    const video = document.getElementById('faceVideo');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Camera access is not supported by your browser.');
        return;
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
            faceCaptureStream = stream;
            video.srcObject = stream;
            cameraContainer.classList.remove('hidden');
            video.play();
        })
        .catch((error) => {
            console.error('Camera error:', error);
            alert('Unable to access the camera. Please allow camera access or try another device.');
        });
}

function takeFaceSnapshot() {
    const video = document.getElementById('faceVideo');
    const preview = document.getElementById('facePreview');
    const snapshotPreview = document.getElementById('snapshotPreview');

    if (!video || video.readyState < 2) {
        alert('Camera is not ready yet. Please wait a moment.');
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    faceCaptureDataUrl = canvas.toDataURL('image/png');
    preview.src = faceCaptureDataUrl;
    snapshotPreview.classList.remove('hidden');
}

function resetFaceCapture() {
    const cameraContainer = document.getElementById('cameraContainer');
    const snapshotPreview = document.getElementById('snapshotPreview');
    const preview = document.getElementById('facePreview');
    const video = document.getElementById('faceVideo');
    const faceInput = document.getElementById('faceImage');

    faceCaptureDataUrl = null;
    if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
    }
    if (cameraContainer) {
        cameraContainer.classList.add('hidden');
    }
    if (snapshotPreview) {
        snapshotPreview.classList.add('hidden');
    }
    if (preview) {
        preview.src = '';
    }
    if (faceInput) {
        faceInput.value = '';
    }
}

function saveFaceRegistration() {
    const faceImage = document.getElementById('faceImage').value;

    if (!faceImage && !faceCaptureDataUrl) {
        alert('Please upload a face image or capture one with the camera.');
        return;
    }

    alert('Face registration submitted successfully.');
    closeFaceRegistrationModal();
}

const scheduleDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const scheduleStartHour = 7;
const schedulePixelsPerHour = 30;
const studentAccount = 'BSIT 1A';

const adminAssignedSchedules = [
    {
        account: 'BSIT 1A',
        subject: 'Programming 1',
        room: 'Lab 1',
        day: 'Monday',
        start: '08:00',
        end: '10:00'
    },
    {
        account: 'BSIT 1A',
        subject: 'Data Structures',
        room: 'Room 203',
        day: 'Wednesday',
        start: '13:00',
        end: '15:00'
    },
    {
        account: 'BSIT 1A',
        subject: 'Physical Education',
        room: 'Gym',
        day: 'Friday',
        start: '10:00',
        end: '12:00'
    }
];

const subjectAttendanceRecords = [
    { subject: 'Programming 1', date: '2026-05-04', status: 'present' },
    { subject: 'Programming 1', date: '2026-05-11', status: 'late' },
    { subject: 'Programming 1', date: '2026-05-18', status: 'absent' },
    { subject: 'Programming 1', date: '2026-05-25', status: 'present' },
    { subject: 'Data Structures', date: '2026-05-06', status: 'present' },
    { subject: 'Data Structures', date: '2026-05-13', status: 'present' },
    { subject: 'Data Structures', date: '2026-05-20', status: 'late' },
    { subject: 'Data Structures', date: '2026-05-27', status: 'absent' },
    { subject: 'Physical Education', date: '2026-05-01', status: 'present' },
    { subject: 'Physical Education', date: '2026-05-08', status: 'late' },
    { subject: 'Physical Education', date: '2026-05-15', status: 'present' },
    { subject: 'Physical Education', date: '2026-05-22', status: 'absent' },
    { subject: 'Physical Education', date: '2026-05-29', status: 'present' }
];

const demoOngoingClass = {
    subject: 'Programming 1',
    start: '08:00',
    end: '10:00',
    status: 'present',
    progress: 65
};

let selectedSubject = null;
let selectedChatId = 'admin';

const chatThreads = [
    {
        id: 'admin',
        title: 'Registrar Office',
        subtitle: 'Admin',
        messages: [
            {
                sender: 'Registrar Office',
                type: 'staff',
                text: 'Please check your attendance records this week.',
                time: '8:30 AM'
            },
            {
                sender: 'You',
                type: 'student',
                text: 'Noted. Thank you.',
                time: '8:35 AM'
            }
        ]
    },
    {
        id: 'programming',
        title: 'Programming 1',
        subtitle: 'Prof. Santos',
        messages: [
            {
                sender: 'Prof. Santos',
                type: 'staff',
                text: 'Your lab activity is scheduled during our next meeting.',
                time: '10:15 AM'
            }
        ]
    },
    {
        id: 'datastructures',
        title: 'Data Structures',
        subtitle: 'Prof. Reyes',
        messages: [
            {
                sender: 'Prof. Reyes',
                type: 'staff',
                text: 'Review linked lists before Wednesday class.',
                time: '1:05 PM'
            }
        ]
    }
];

function getSchedules() {
    return adminAssignedSchedules.filter((schedule) => schedule.account === studentAccount);
}

function timeToMinutes(timeValue) {
    const [hours, minutes] = timeValue.split(':').map(Number);
    return (hours * 60) + minutes;
}

function formatScheduleTime(timeValue) {
    const [hours, minutes] = timeValue.split(':').map(Number);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

function renderWeekTimeline() {
    const timeline = document.getElementById('weekTimeline');
    const accountLabel = document.getElementById('scheduleAccountLabel');

    if (!timeline) {
        return;
    }

    const schedules = getSchedules()
        .sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

    if (accountLabel) {
        accountLabel.textContent = `Showing admin-assigned schedule for ${studentAccount}`;
    }

    timeline.innerHTML = '';

    scheduleDays.forEach((day) => {
        const dayColumn = document.createElement('div');
        dayColumn.className = 'timeline-day';

        const title = document.createElement('div');
        title.className = 'timeline-day-title';
        title.textContent = day;

        const body = document.createElement('div');
        body.className = 'timeline-day-body';

        const daySchedules = schedules.filter((schedule) => schedule.day === day);

        if (daySchedules.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'timeline-empty';
            emptyMessage.textContent = 'No schedule';
            body.appendChild(emptyMessage);
        }

        daySchedules.forEach((schedule) => {
            const startMinutes = timeToMinutes(schedule.start);
            const endMinutes = timeToMinutes(schedule.end);
            const dayStartMinutes = scheduleStartHour * 60;
            const top = Math.max(0, ((startMinutes - dayStartMinutes) / 60) * schedulePixelsPerHour);
            const height = Math.max(54, ((endMinutes - startMinutes) / 60) * schedulePixelsPerHour);

            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.style.top = `${top}px`;
            item.style.height = `${height}px`;

            const subject = document.createElement('strong');
            subject.textContent = schedule.subject;

            const time = document.createElement('span');
            time.textContent = `${formatScheduleTime(schedule.start)} - ${formatScheduleTime(schedule.end)}`;

            const room = document.createElement('span');
            room.textContent = schedule.room;

            item.appendChild(subject);
            item.appendChild(time);
            item.appendChild(room);

            body.appendChild(item);
        });

        dayColumn.appendChild(title);
        dayColumn.appendChild(body);
        timeline.appendChild(dayColumn);
    });
}

function getAssignedSubjects() {
    return getSchedules().map((schedule) => ({
        subject: schedule.subject,
        room: schedule.room,
        day: schedule.day,
        start: schedule.start,
        end: schedule.end
    }));
}

function renderSubjectList() {
    const subjectList = document.getElementById('subjectList');

    if (!subjectList) {
        return;
    }

    const subjects = getAssignedSubjects();
    subjectList.innerHTML = '';

    if (!selectedSubject && subjects.length > 0) {
        selectedSubject = subjects[0].subject;
    }

    subjects.forEach((subject) => {
        const button = document.createElement('button');
        button.className = 'subject-item';
        button.type = 'button';

        if (subject.subject === selectedSubject) {
            button.classList.add('active');
        }

        const title = document.createElement('strong');
        title.textContent = subject.subject;

        const schedule = document.createElement('span');
        schedule.textContent = `${subject.day}, ${formatScheduleTime(subject.start)} - ${formatScheduleTime(subject.end)} | ${subject.room}`;

        button.appendChild(title);
        button.appendChild(schedule);
        button.addEventListener('click', () => {
            selectedSubject = subject.subject;
            renderSubjectList();
            renderAttendanceCalendar();
        });

        subjectList.appendChild(button);
    });

    renderAttendanceCalendar();
}

function formatDateKey(year, monthIndex, day) {
    return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function formatStatus(status) {
    return status.charAt(0).toUpperCase() + status.slice(1);
}

function getCurrentDayName() {
    return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}

function getCurrentTimeMinutes() {
    const now = new Date();
    return (now.getHours() * 60) + now.getMinutes();
}

function getScheduleProgress(start, end) {
    const currentMinutes = getCurrentTimeMinutes();
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);

    if (currentMinutes <= startMinutes) {
        return 0;
    }

    if (currentMinutes >= endMinutes) {
        return 100;
    }

    return Math.round(((currentMinutes - startMinutes) / (endMinutes - startMinutes)) * 100);
}

function getCurrentOngoingClass() {
    const today = getCurrentDayName();
    const currentMinutes = getCurrentTimeMinutes();

    return getSchedules().find((schedule) => {
        const startMinutes = timeToMinutes(schedule.start);
        const endMinutes = timeToMinutes(schedule.end);
        return schedule.day === today && currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    });
}

function getClassTimeStatus(schedule) {
    const currentMinutes = getCurrentTimeMinutes();
    const startMinutes = timeToMinutes(schedule.start);
    const endMinutes = timeToMinutes(schedule.end);

    if (currentMinutes > endMinutes) {
        return 'finished';
    }

    if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
        return 'ongoing';
    }

    return 'pending';
}

function renderTodayClasses() {
    const todayClassesDate = document.getElementById('todayClassesDate');
    const todayClassesList = document.getElementById('todayClassesList');

    if (!todayClassesList) {
        return;
    }

    const today = getCurrentDayName();
    const todayClasses = getSchedules()
        .filter((schedule) => schedule.day === today)
        .sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

    if (todayClassesDate) {
        todayClassesDate.textContent = `${today} schedule`;
    }

    todayClassesList.innerHTML = '';

    if (todayClasses.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'today-class-item';
        emptyMessage.textContent = 'No classes scheduled today.';
        todayClassesList.appendChild(emptyMessage);
        return;
    }

    todayClasses.forEach((schedule) => {
        const status = getClassTimeStatus(schedule);
        const item = document.createElement('div');
        item.className = 'today-class-item';

        const main = document.createElement('div');
        main.className = 'today-class-main';

        const details = document.createElement('div');
        const subject = document.createElement('h4');
        subject.textContent = schedule.subject;

        const room = document.createElement('p');
        room.textContent = schedule.room;

        const badge = document.createElement('span');
        badge.className = `class-status status-${status}`;
        badge.textContent = formatStatus(status);

        const time = document.createElement('div');
        time.className = 'today-class-time';
        time.textContent = `${formatScheduleTime(schedule.start)} - ${formatScheduleTime(schedule.end)}`;

        details.appendChild(subject);
        details.appendChild(room);
        main.appendChild(details);
        main.appendChild(badge);
        item.appendChild(main);
        item.appendChild(time);
        todayClassesList.appendChild(item);
    });
}

function updateOngoingClass() {
    const className = document.getElementById('ongoingClassName');
    const scheduleTime = document.getElementById('ongoingScheduleTime');
    const status = document.getElementById('ongoingStatus');
    const progressText = document.getElementById('ongoingProgressText');
    const progressBar = document.getElementById('ongoingProgressBar');

    if (!className || !scheduleTime || !status || !progressText || !progressBar) {
        return;
    }

    const activeClass = getCurrentOngoingClass();
    const displayClass = activeClass || demoOngoingClass;
    const progress = activeClass ? getScheduleProgress(displayClass.start, displayClass.end) : demoOngoingClass.progress;
    const attendanceStatus = displayClass.status || 'present';

    className.textContent = displayClass.subject;
    scheduleTime.textContent = `${formatScheduleTime(displayClass.start)} - ${formatScheduleTime(displayClass.end)}`;
    status.textContent = formatStatus(attendanceStatus);
    status.className = `ongoing-status ${attendanceStatus}`;
    progressText.textContent = `${progress}%`;
    progressBar.style.width = `${progress}%`;
}

function renderAttendanceCalendar() {
    const calendar = document.getElementById('attendanceCalendar');
    const calendarTitle = document.getElementById('calendarMonthTitle');
    const subjectTitle = document.getElementById('attendanceSubjectTitle');
    const subjectSchedule = document.getElementById('attendanceSubjectSchedule');

    if (!calendar) {
        return;
    }

    const subjects = getAssignedSubjects();
    const currentSubject = subjects.find((subject) => subject.subject === selectedSubject) || subjects[0];

    if (!currentSubject) {
        calendar.innerHTML = '<div class="timeline-empty">No assigned subjects.</div>';
        return;
    }

    const today = new Date();
    const year = today.getFullYear();
    const monthIndex = today.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const monthName = firstDay.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const subjectRecords = subjectAttendanceRecords.filter((record) => record.subject === currentSubject.subject);

    if (calendarTitle) {
        calendarTitle.textContent = monthName;
    }

    if (subjectTitle) {
        subjectTitle.textContent = currentSubject.subject;
    }

    if (subjectSchedule) {
        subjectSchedule.textContent = `${currentSubject.day}, ${formatScheduleTime(currentSubject.start)} - ${formatScheduleTime(currentSubject.end)} | ${currentSubject.room}`;
    }

    calendar.innerHTML = '';

    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((weekday) => {
        const weekdayCell = document.createElement('div');
        weekdayCell.className = 'calendar-weekday';
        weekdayCell.textContent = weekday;
        calendar.appendChild(weekdayCell);
    });

    for (let index = 0; index < firstDay.getDay(); index += 1) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendar.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDay.getDate(); day += 1) {
        const dateKey = formatDateKey(year, monthIndex, day);
        const record = subjectRecords.find((attendance) => attendance.date === dateKey);
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';

        if (record) {
            dayCell.classList.add('scheduled', record.status);
        }

        const dayNumber = document.createElement('span');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);

        if (record) {
            const status = document.createElement('span');
            status.className = 'calendar-day-status';
            status.textContent = formatStatus(record.status);

            const time = document.createElement('span');
            time.className = 'calendar-day-time';
            time.textContent = `${formatScheduleTime(currentSubject.start)} - ${formatScheduleTime(currentSubject.end)}`;

            dayCell.appendChild(status);
            dayCell.appendChild(time);
        }

        calendar.appendChild(dayCell);
    }
}

function getSelectedThread() {
    return chatThreads.find((thread) => thread.id === selectedChatId) || chatThreads[0];
}

function renderChatThreadList() {
    const threadList = document.getElementById('chatThreadList');

    if (!threadList) {
        return;
    }

    threadList.innerHTML = '';

    chatThreads.forEach((thread) => {
        const latestMessage = thread.messages[thread.messages.length - 1];
        const button = document.createElement('button');
        button.className = 'chat-thread-item';
        button.type = 'button';

        if (thread.id === selectedChatId) {
            button.classList.add('active');
        }

        const title = document.createElement('strong');
        title.textContent = thread.title;

        const preview = document.createElement('span');
        preview.textContent = latestMessage ? latestMessage.text : 'No messages yet';

        button.appendChild(title);
        button.appendChild(preview);
        button.addEventListener('click', () => {
            selectedChatId = thread.id;
            renderChatThreadList();
            renderChatMessages();
        });

        threadList.appendChild(button);
    });
}

function renderChatMessages() {
    const chatTitle = document.getElementById('chatThreadTitle');
    const chatSubtitle = document.getElementById('chatThreadSubtitle');
    const messagesContainer = document.getElementById('chatMessages');

    if (!messagesContainer) {
        return;
    }

    const thread = getSelectedThread();

    if (!thread) {
        messagesContainer.innerHTML = '<div class="chat-empty">No conversations available.</div>';
        return;
    }

    if (chatTitle) {
        chatTitle.textContent = thread.title;
    }

    if (chatSubtitle) {
        chatSubtitle.textContent = thread.subtitle;
    }

    messagesContainer.innerHTML = '';

    if (thread.messages.length === 0) {
        messagesContainer.innerHTML = '<div class="chat-empty">No messages yet.</div>';
        return;
    }

    thread.messages.forEach((message) => {
        const row = document.createElement('div');
        row.className = `message-row ${message.type}`;

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';

        const sender = document.createElement('strong');
        sender.textContent = message.sender;

        const text = document.createElement('p');
        text.textContent = message.text;

        const time = document.createElement('span');
        time.className = 'message-time';
        time.textContent = message.time;

        bubble.appendChild(sender);
        bubble.appendChild(text);
        bubble.appendChild(time);
        row.appendChild(bubble);
        messagesContainer.appendChild(row);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getCurrentTimeLabel() {
    return new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
}

function sendChatMessage() {
    const input = document.getElementById('chatMessageInput');
    const thread = getSelectedThread();

    if (!input || !thread) {
        return;
    }

    const messageText = input.value.trim();

    if (!messageText) {
        return;
    }

    thread.messages.push({
        sender: 'You',
        type: 'student',
        text: messageText,
        time: getCurrentTimeLabel()
    });

    input.value = '';
    renderChatThreadList();
    renderChatMessages();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target && event.target.id === 'chatMessageInput') {
        sendChatMessage();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    renderWeekTimeline();
    renderSubjectList();
    renderChatThreadList();
    renderChatMessages();
    updateOngoingClass();
    renderTodayClasses();
});

