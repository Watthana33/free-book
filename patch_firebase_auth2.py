import re

def patch_app_auth():
    with open('app.js', 'r', encoding='utf-8') as f:
        js = f.read()

    # Find the start of initAdminEvents
    start_idx = js.find('function initAdminEvents() {')
    
    # We know the function ends at line 940. We can find the exact end of it.
    # The end is `    });\n}`
    end_idx = js.find('    });\n}', start_idx) + 8

    new_admin_events = """function initAdminEvents() {
    const adminToggleBtn = document.getElementById('adminToggleBtn');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');
    const cancelAdminBtn = document.getElementById('cancelAdminBtn');
    const submitAdminLoginBtn = document.getElementById('submitAdminLoginBtn');
    const adminEmailInput = document.getElementById('adminEmailInput');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const adminLoginError = document.getElementById('adminLoginError');

    if (window.firebase && firebase.apps.length > 0) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                state.isAdmin = true;
                localStorage.setItem('freebook_is_admin', 'true');
                updateAdminUI();
            } else {
                state.isAdmin = false;
                localStorage.setItem('freebook_is_admin', 'false');
                updateAdminUI();
            }
        });
    }

    adminToggleBtn.addEventListener('click', () => {
        if (state.isAdmin) {
            if (window.firebase && firebase.apps.length > 0 && firebase.auth().currentUser) {
                firebase.auth().signOut().then(() => {
                    showToast('ออกจากระบบ Admin เรียบร้อย', 'info');
                }).catch(err => {
                    console.error("Logout Error", err);
                    showToast('เกิดข้อผิดพลาดในการออกจากระบบ', 'error');
                });
            } else {
                state.isAdmin = false;
                localStorage.setItem('freebook_is_admin', 'false');
                updateAdminUI();
                showToast('สลับเข้าสู่โหมดทั่วไป (Viewer)', 'info');
            }
        } else {
            if (adminEmailInput) adminEmailInput.value = '';
            adminPasswordInput.value = '';
            adminLoginError.classList.add('hidden');
            adminLoginModal.classList.remove('hidden');
            if (adminEmailInput) adminEmailInput.focus();
            else adminPasswordInput.focus();
        }
    });

    const closeModal = () => adminLoginModal.classList.add('hidden');
    closeAdminModalBtn.addEventListener('click', closeModal);
    cancelAdminBtn.addEventListener('click', closeModal);

    submitAdminLoginBtn.addEventListener('click', () => {
        const email = adminEmailInput ? adminEmailInput.value.trim() : 'admin@freebook.com';
        const password = adminPasswordInput.value.trim();
        
        if (!window.firebase || firebase.apps.length === 0) {
            adminLoginError.textContent = "ยังไม่ได้เชื่อมต่อ Firebase";
            adminLoginError.classList.remove('hidden');
            return;
        }

        submitAdminLoginBtn.disabled = true;
        submitAdminLoginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังตรวจสอบ...';

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                closeModal();
                showToast('เข้าสู่ระบบ Admin สำเร็จ!', 'success');
            })
            .catch((error) => {
                adminLoginError.textContent = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
                adminLoginError.classList.remove('hidden');
                console.error(error.message);
            })
            .finally(() => {
                submitAdminLoginBtn.disabled = false;
                submitAdminLoginBtn.innerHTML = '<i class="fa-solid fa-key"></i> เข้าสู่ระบบ';
            });
    });

    adminPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitAdminLoginBtn.click();
    });

    const changePassBtn = document.getElementById('changePassBtn');
    const changePassModal = document.getElementById('changePassModal');
    const closeChangePassModalBtn = document.getElementById('closeChangePassModalBtn');
    const cancelChangePassBtn = document.getElementById('cancelChangePassBtn');
    const submitChangePassBtn = document.getElementById('submitChangePassBtn');

    changePassBtn.addEventListener('click', () => {
        document.getElementById('oldPassInput').value = '';
        document.getElementById('newPassInput').value = '';
        document.getElementById('confirmPassInput').value = '';
        document.getElementById('changePassError').classList.add('hidden');
        changePassModal.classList.remove('hidden');
    });

    const closePassModal = () => changePassModal.classList.add('hidden');
    closeChangePassModalBtn.addEventListener('click', closePassModal);
    cancelChangePassBtn.addEventListener('click', closePassModal);

    submitChangePassBtn.addEventListener('click', () => {
        const oldPass = document.getElementById('oldPassInput').value.trim();
        const newPass = document.getElementById('newPassInput').value.trim();
        const confirmPass = document.getElementById('confirmPassInput').value.trim();
        const errDiv = document.getElementById('changePassError');

        if (!oldPass || !newPass || !confirmPass) {
            errDiv.textContent = 'กรุณากรอกข้อมูลให้ครบทุกช่อง';
            errDiv.classList.remove('hidden');
            return;
        }
        if (newPass !== confirmPass) {
            errDiv.textContent = 'รหัสผ่านใหม่ไม่ตรงกัน';
            errDiv.classList.remove('hidden');
            return;
        }
        if (newPass.length < 6) {
            errDiv.textContent = 'รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร';
            errDiv.classList.remove('hidden');
            return;
        }

        const user = firebase.auth().currentUser;
        if (!user) {
            errDiv.textContent = 'กรุณาล็อกอินใหม่ก่อนเปลี่ยนรหัสผ่าน';
            errDiv.classList.remove('hidden');
            return;
        }

        submitChangePassBtn.disabled = true;
        submitChangePassBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึก...';

        const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPass);
        user.reauthenticateWithCredential(credential).then(() => {
            return user.updatePassword(newPass);
        }).then(() => {
            showToast('เปลี่ยนรหัสผ่านสำเร็จ', 'success');
            closePassModal();
        }).catch((error) => {
            errDiv.textContent = 'รหัสผ่านเดิมไม่ถูกต้อง หรือเกิดข้อผิดพลาด';
            errDiv.classList.remove('hidden');
            console.error(error);
        }).finally(() => {
            submitChangePassBtn.disabled = false;
            submitChangePassBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> บันทึกรหัสผ่านใหม่';
        });
    });
}"""

    js = js[:start_idx] + new_admin_events + js[end_idx:]

    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(js)

patch_app_auth()
