# แผนการพัฒนาระบบ: ฟีเจอร์ "เดือน ปี" และ "ลำดับที่ สอศ อนุมัติ"

ไฟล์นี้ใช้สำหรับเตือนความจำและอ้างอิงขั้นตอนการทำงานต่อไปในวันพรุ่งนี้

## 📌 สถานะปัจจุบัน (สิ่งที่ทำเสร็จแล้ว)
- [x] **แก้ไขระบบอิมพอร์ต (Excel Parser):** อัปเดตไฟล์ `app.js` (บรรทัดที่ 1059-1077) ให้รองรับการอ่านคอลัมน์ `"เดือน ปี"` (ตัวแปร `approvalMonthYear`) และ `"ลำดับที่ สอศ"` (ตัวแปร `vecSequence`) เรียบร้อยแล้ว ข้อมูลพร้อมถูกบันทึกลงใน State

## 🚀 สิ่งที่ต้องทำต่อ (พรุ่งนี้)
เมื่อพร้อมทำงานต่อ ให้อ่านไฟล์นี้และเริ่มดำเนินการตามขั้นตอนต่อไปนี้:

### 1. หน้า Master List (ตารางข้อมูลหลัก)
- [x] อัปเดตฟังก์ชัน `renderMasterTable()` (เดิมเขียนเป็น renderMasterList) ใน `app.js`
- [x] เพิ่มคอลัมน์แสดงข้อมูล **"เดือน/ปี"** และ **"ลำดับ สอศ."** ในตาราง HTML เพื่อให้ผู้ใช้สามารถมองเห็นข้อมูลนี้ได้ทันที

### 2. หน้าต่างแก้ไขข้อมูล (Edit Modal)
- [x] อัปเดตโครงสร้าง HTML ของ `bookModal` ใน `index.html` ให้มีช่อง Input 2 ช่องใหม่:
  - ช่องกรอก **เดือน ปี ที่อนุมัติ** (Text)
  - ช่องกรอก **ลำดับที่ สอศ.** (Text/Number)
- [x] อัปเดตฟังก์ชัน `editBook()` เพื่อดึงค่า `approvalMonthYear` และ `vecSequence` ไปแสดงในช่อง Input
- [x] อัปเดตฟังก์ชัน `bookForm.addEventListener('submit')` เพื่อดึงค่าจากช่อง Input กลับมาบันทึกลงใน State และ Firebase

### 3. หน้าต่างเพิ่มข้อมูลใหม่ (Add Modal)
- [x] อัปเดตโครงสร้าง HTML ของ `bookModal` ใน `index.html` ให้มีช่อง Input 2 ช่องใหม่ (ใช้ Modal เดียวกันกับ Edit)
- [x] อัปเดตฟังก์ชันฝั่งบันทึกข้อมูล (Add New) ให้ดึงค่าจาก 2 ช่องนี้ไปสร้างเป็น Object ใหม่

### 4. ฟีเจอร์ Export (ถ้ามี)
- [x] ตรวจสอบและเพิ่มข้อมูล 2 ค่านี้ลงใน Export CSV เผื่อสำหรับการนำข้อมูลไปใช้งานต่อ

---
**Note to AI (Antigravity):**
When the user resumes the session and references this feature, strictly follow the checklist above. Ensure that the DOM IDs for the new inputs in `index.html` match the JavaScript logic in `app.js`.
