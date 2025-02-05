// form component
const form = document.getElementById("formInput");

// notification component
let notifBtn = document.getElementById("btnConfirm");
notifBtn.addEventListener("click", () => {
  notification.style.display = "none";
});
let notification = document.getElementById("notif");
notification.style.display = "none";

const notifInformation = document.getElementById("notifInformation");

function formNotifAnimation() {
  notification.style.display = "flex";
  notification.style.opacity = 0;
  notification.style.transition = "opacity 0.2s ease-in-out";
  notification.style.transform = "translateY(0)";
  setTimeout(() => {
    notification.style.opacity = 1;
  }, 0);
}

// event listener untuk eksekusi DOM content pada saat browser selesai diload
document.addEventListener("DOMContentLoaded", () => {
  // akses semua element yang ada didalam form
  let inputElement = [
    document.getElementById("inputUser"),
    document.getElementById("inputPass"),
  ];
  // menghapus default event dari form elem
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // data login admin dan editor
    const inputValue = [inputElement[0].value, inputElement[1].value];
    const adminStorageData = JSON.parse(localStorage.getItem("admin"));
    const editorStorageData = JSON.parse(localStorage.getItem("editors"));

    // pengkondisian role admin
    if (inputValue[0] == "" && inputValue[1] == "") {
      formNotifAnimation();
      notifInformation.textContent = "Mohon dilengkapi.";
    } else if (inputValue[0] == "") {
      formNotifAnimation();
      notifInformation.textContent = "Mohon isi username";
    } else if (inputValue[1] == "") {
      formNotifAnimation();
      notifInformation.textContent = "Mohon isi password";
    } else if (inputValue[0] !== adminStorageData.username) {
      formNotifAnimation();
      notifInformation.textContent = "Username salah";
    } else if (inputValue[1] !== adminStorageData.password) {
      formNotifAnimation();
      notifInformation.textContent = "Password salah";
    } else {
      formNotifAnimation();
      notifInformation.textContent = "Selamat datang admin";
      notifBtn.addEventListener("click", () => {
        window.location.href = "../account/admin/index.html";
      });
      return;
    }

    // pengkondisian role edior
    if (inputValue[0] == "" && inputValue[1] == "") {
      formNotifAnimation();
      notifInformation.textContent = "Mohon dilengkapi.";
    } else if (inputValue[0] == "") {
      formNotifAnimation();
      notifInformation.textContent = "Mohon isi username";
    } else if (inputValue[1] == "") {
      formNotifAnimation();
      notifInformation.textContent = "Mohon isi password";
    } else if (inputValue[0] !== editorStorageData.username) {
      formNotifAnimation();
      notifInformation.textContent = "Username salah";
    } else if (inputValue[1] !== editorStorageData.password) {
      formNotifAnimation();
      notifInformation.textContent = "Password salah";
    } else {
      formNotifAnimation();
      notifInformation.textContent = "Selamat datang editor";
      notifBtn.addEventListener("click", () => {
        window.location.href = "../account/editor/index.html";
      });
      return;
    }
  });
});

const signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});
