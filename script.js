// akses semua element yang ada didalam form
let inputElement = [
  document.getElementById("inputUser"),
  document.getElementById("inputPass"),
  document.getElementById("confirmPass"),
  document.getElementById("userRole"),
];

// element form dengan id formInput
const form = document.getElementById("formInput");

// element div id notif
let notification = document.getElementById("notif");
notification.style.display = "none"; // hilangkan nontifikasi
// button notifikasi
let notifBtn = document.getElementById("btnConfirm");

notifBtn.addEventListener("click", () => {
  notification.style.display = "none";
});

// bagian khusus notifikasi ===========================================
// informasi notifikasi
const notifInformation = document.getElementById("information");

// untuk memunculkan notifikasi dan animasi
function formNotifAnimation() {
  notification.style.display = "flex";
  notification.style.opacity = 0;
  notification.style.transition = "opacity 0.2s ease-in-out";
  notification.style.transform = "translateY(0)";
  setTimeout(() => {
    notification.style.opacity = 1;
  }, 0);
}

// untuk memunculkan nontifikasi max character
function charInfo() {
  let maxLength = inputElement[0].maxLength;
  let textInput = inputElement[0].value.length;
  let calculations = maxLength - textInput;
  let charDisplay = document.getElementById("charInfoUser");
  charDisplay.innerHTML = `USERNAME <p>Karakter tersisa ${calculations}</p>`;

  // pengecekan apabila sisa karakter 0
  if (calculations == 0) {
    charDisplay.style.color = "red";
    charDisplay.textContent = "Maksimal karakter tercapai!!";
  } else {
    charDisplay.style.color = "black";
  }
}

// untuk memunculkan masksimal karakter diketik dan animasi
let charNotifUser = document.getElementById("charNotifUser");
function charInputUserAnimation() {
  // notifikasi karakter diketik pada input user
  inputElement[0].addEventListener("focus", () => {
    setTimeout(() => {
      charNotifUser.style.transform = "translateY(0)";
      charNotifUser.style.transition = "transform 0.2s";
    }, 90);
  });
  inputElement[0].addEventListener("blur", () => {
    setTimeout(() => {
      charNotifUser.style.transform = "translateY(-300px)";
      charNotifUser.style.transition = "transform 0.2s";
    }, 90);
  });
  // menampilkan sisa karakter pada saat input user di isi
  inputElement[0].addEventListener("input", () => {
    return charInfo();
  });
}

// untuk memunculkan value input password ketika diketik dan animasi
function charInputPassAnimation() {
  let charNotifPass = document.getElementById("charNotifPass");
  inputElement[1].addEventListener("focus", () => {
    setTimeout(() => {
      charNotifPass.style.transform = "translateY(0)";
      charNotifPass.style.transition = "transform 0.2s";
    }, 90);
  });
  inputElement[1].addEventListener("blur", () => {
    setTimeout(() => {
      charNotifPass.style.transform = "translateY(-300px)";
      charNotifPass.style.transition = "transform 0.2s";
    }, 90);
  });
  inputElement[1].addEventListener("input", () => {
    let charInfoPass = document.getElementById("charInfoPass");
    return (charInfoPass.innerHTML = `PASSWORD <p>"${inputElement[1].value}"</p>`);
  });
}

// bagian khusus notifikasi ===========================================

// event listener untuk eksekusi DOM content pada saat browser selesai diload
document.addEventListener("DOMContentLoaded", () => {
  // menghapus default event dari form elem
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // mengambil semua value input
    const inputValue = [
      inputElement[0].value,
      inputElement[1].value,
      inputElement[3].value,
    ];

    // cek pemilihan role
    const selectedRole = [
      inputElement[3].value == "admin",
      inputElement[3].value == "editor",
    ];

    // pengkondisian role admin
    switch (selectedRole[0]) {
      // pengkondisian role editor ============================================================
      case selectedRole[0] !== selectedRole[0]:
        // semuanya memiliki fungsi yang sama seperti case switch statement yang lain, hanya saja ini untuk role editor
        if (inputValue[0] === "" && inputValue[1] === "") {
          formNotifAnimation();
          notifInformation.textContent = "Mohon dilengkapi.";
        } else if (inputValue[1] === "") {
          formNotifAnimation();
          notifInformation.innerHTML =
            "Password masih kosong <p>mohon di isi</p>";
        } else if (inputValue[1].length <= 7) {
          formNotifAnimation();
          notifInformation.innerHTML = "Password minimal <p>8 karakter </p>";
        } else if (inputElement[2].value === "") {
          formNotifAnimation();
          notifInformation.textContent = "Ketik ulang password anda";
        } else if (inputValue[0] === "") {
          formNotifAnimation();
          notifInformation.innerHTML =
            "Mohon isi username <p>terlebih dahulu</p>";
        } else if (!!localStorage.getItem("editors")) {
          formNotifAnimation();
          notifInformation.innerHTML =
            "Editor sudah ada, silahkan <p>mendaftar sebagai admin atau login</p>";
          notifBtn.addEventListener("click", () => {
            window.location.reload();
          });
        } else {
          formNotifAnimation();
          notifInformation.innerHTML = `Hanya boleh ada satu editor <p>maka dari itu ingat</p> <p>informasi login anda</p>`;
          notifBtn.addEventListener("click", () => {
            formNotifAnimation();
            notifInformation.innerHTML = `Username: ${inputValue[0]} <p>Password: ${inputValue[1]}</p> `;
            notifBtn.addEventListener("click", () => {
              const handleConfirm = () => {
                // Membuat objek userData yang berisi username, password, dan role dari inputValue
                let userData = {
                  username: inputValue[0],
                  password: inputValue[1],
                  role: inputValue[2],
                };

                // Menyimpan value userData ke dalam localStorage
                localStorage.setItem("editors", JSON.stringify(userData));
              };
              handleConfirm();
              window.location.reload();
            });
          });
        }

        break;
      // pengkondisian role editor ============================================================

      // pengkondisian role admin ============================================================
      // jika semua form input kosong maka muncul notifikasi
      case inputValue[0] === "" && inputValue[1] === "":
        formNotifAnimation();
        notifInformation.textContent = "Mohon dilengkapi.";
        break;
      // jika password kosong tetapi sudah disubmit akan ada notifikasi
      case inputValue[1] === "":
        formNotifAnimation();
        notifInformation.innerHTML =
          "Password masih kosong <p>mohon di isi</p>";
        break;

      // informasi password minimal 8 karakter
      case inputElement[1].value.length < 7:
        formNotifAnimation();
        notifInformation.innerHTML = "Password minimal <p>8 karakter </p>";
        break;

      // jika form confirm password kosong tetapi sudah disubmit akan ada notifikasi
      case inputElement[2].value === "":
        formNotifAnimation();
        notifInformation.textContent = "Ketik ulang password anda";
        break;

      // jika password tidak sama
      case inputElement[2].value != inputElement[1].value:
        formNotifAnimation();
        notifInformation.innerHTML =
          "Password tidak sama, periksa <p>kembali password anda</p>";
        break;

      // jika username masih kosong
      case inputValue[0] == "":
        formNotifAnimation();
        notifInformation.innerHTML =
          "Mohon isi username <p>terlebih dahulu</p>";
        break;

      // cek apakah admin sudah ada atau belum di local storage
      case !!localStorage.getItem("admin"):
        formNotifAnimation();
        notifInformation.innerHTML =
          "Admin sudah ada, silahkan <p>mendaftar sebagai editor</p>";
        notifBtn.addEventListener("click", () => {
          window.location.reload();
        });
        break;

      // store value ke local storage jika sudah tidak ada masalah lagi
      default:
        // notifikasi peringatan kedua kali
        formNotifAnimation();
        notifInformation.innerHTML =
          "Admin hanya diizinkan ada satu <p>maka dari itu mohon diingat</p> <p>info login yang sudah dibuat</p>";

        // store data dan refresh browser pada saat sudah membaca notifikasi kedua kali
        notifBtn.addEventListener("click", () => {
          formNotifAnimation();
          notifInformation.innerHTML = `Username: ${inputValue[0]} <p>Password: ${inputValue[1]}</p> <p>Role: ${inputElement[3].value}</p>`;
          // push value input ke local storage
          notifBtn.addEventListener("click", () => {
            formNotifAnimation();
            const handleConfirm = () => {
              let userData = {
                username: inputValue[0],
                password: inputValue[1],
                role: inputValue[2],
              };
              localStorage.setItem("admin", JSON.stringify(userData));
            };
            handleConfirm();
            window.location.reload();
          });
        });
        break;
      // pengkondisian role admin ============================================================
    }
  });

  // mengalihkan ke halaman lain pada saat tombol sign in diklik
  let btnSignIn = document.getElementById("signInBtn");

  // mengecek data di local storage sebelum login
  btnSignIn.addEventListener("click", () => {
    if (localStorage.length < 2) {
      formNotifAnimation();
      notifInformation.innerHTML =
        "Data role belum lengkap, silahkan <p>daftarkan role admin dan editor</p>";
    } else {
      window.location.href = "../Sign In and Up/Sign-In/index.html";
    }
  });

  // memanggil fungsi untuk menampilkan informasi karakter diketik username dan password
  inputElement[0].addEventListener("focus", charInputUserAnimation());
  inputElement[1].addEventListener("focus", charInputPassAnimation());

  const showDataBtn = document.getElementById("checkData");
  // menampilkan data
  showDataBtn.addEventListener("click", () => {
    function checkingData() {
      if (localStorage.getItem("admin")) {
        return "editor";
      } else {
        return "admin";
      }
    }
    if (localStorage.key("admin")) {
      notifInformation.textContent = "admin";
    } else {
      notifInformation.textContent = "editor";
    }

    if (localStorage.length <= 0) {
      formNotifAnimation();
      notifInformation.innerHTML =
        "Data kosong, silahkan daftarkan <p>admin dan editor untuk cek data</p> ";
    } else if (localStorage.length <= 1) {
      formNotifAnimation();
      notifInformation.innerHTML = `${localStorage.key(
        ""
      )} sudah ada, silahkan <p>daftar sebagai ${checkingData()} <p>untuk cek data</p></p>`;
    } else {
      const adminData = JSON.parse(localStorage.getItem("admin"));
      const editorData = JSON.parse(localStorage.getItem("editors"));
      formNotifAnimation();
      document.getElementById("warning").textContent = "";
      notifInformation.innerHTML = ` 
    <table>
      <thead>
        <tr>
          <h2>Admin</h2>
          <th>Username</th>
          <th>password</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>${adminData.username}</td>
          <td>${adminData.password}</td>
        </tr>
      </tbody>
    </table>

    <table>
      <thead>
        <tr>
          <h2>Editor</h2>
          <th>Username</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${editorData.username}</td>
          <td>${editorData.password}</td>
        </tr>
      </tbody>
    </table>`;
    }
  });
});
