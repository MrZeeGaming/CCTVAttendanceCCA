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
    window.location.href = "dashboard.html";
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

