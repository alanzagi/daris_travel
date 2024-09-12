// Start Fungsi untuk penambahan angka
document.addEventListener("DOMContentLoaded", function () {
  // Pilih semua elemen dengan kelas "counter"
  const counters = document.querySelectorAll(".counter");

  // Buat IntersectionObserver untuk memantau kapan elemen muncul di layar
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // Periksa apakah elemen terlihat di layar
        if (entry.isIntersecting) {
          const counter = entry.target; // Ambil elemen counter
          const target = +counter.getAttribute("data-target"); // Ambil angka target dari atribut data
          const duration = 2000; // Durasi animasi dalam milidetik
          const start = 0; // Mulai counter dari 0
          let startTime = null; // Inisialisasi waktu mulai

          // Fungsi untuk memperbarui nilai counter
          const updateCounter = (currentTime) => {
            if (!startTime) startTime = currentTime; // Tetapkan waktu mulai
            const elapsedTime = currentTime - startTime; // Hitung waktu yang telah berlalu
            const progress = Math.min(elapsedTime / duration, 1); // Hitung kemajuan (0 hingga 1)
            counter.textContent = Math.floor(progress * target) + "+"; // Perbarui teks konten counter
            if (progress < 1) {
              requestAnimationFrame(updateCounter); // Lanjutkan animasi jika belum selesai
            } else {
              counter.textContent = target + "+"; // Tetapkan nilai akhir setelah animasi selesai
            }
          };

          requestAnimationFrame(updateCounter); // Mulai animasi
          observer.unobserve(counter); // Berhenti mengamati setelah animasi selesai
        }
      });
    },
    { threshold: 0.1 } // Memicu ketika 10% elemen terlihat di layar
  );

  // Amati setiap elemen counter
  counters.forEach((counter) => observer.observe(counter));
});
// End Fungsi untuk penambahan angka

// Start Fungsi untuk tombol hubungi
document.querySelectorAll(".hubungi").forEach(function (button) {
  // Tambahkan event listener untuk klik pada setiap tombol dengan kelas "hubungi"
  button.addEventListener("click", function () {
    // Arahkan ke WhatsApp dengan pesan yang sudah diisi
    window.location.href = "https://wa.me/6281521550913?text=halo";
  });
});
// End Fungsi untuk tombol hubungi

const scriptURL = "https://script.google.com/macros/s/AKfycbwxX29-sCSiX0v-OPn5PoHz84W0ktSVm39cVpeUnXciS-z3hoiBn32FpexDPFGy6CdN/exec";
const form = document.forms["database"];
const button = document.getElementById("submit");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Mencegah form dari reload halaman default
  handleSubmit(); // Panggil handleSubmit untuk mengubah status tombol dan mengirim data
});

function handleSubmit() {
  // Ubah tombol menjadi status loading
  button.innerHTML = `
    <div class="flex items-center justify-center w-full">
      <svg class="animate-spin h-5 w-5 border-white border-t-transparent border-2 rounded-full" viewBox="0 0 24 24"></svg>
      <span class="ml-2 md:hidden">Loading...</span>
    </div>`;
  button.disabled = true;
  button.classList.add("bg-cyan-400", "cursor-not-allowed");

  // Kirim data ke Google Sheets
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Success!", response);

      // Kembalikan tombol ke status normal
      button.innerHTML = "Kirim";
      button.disabled = false;
      button.classList.remove("bg-cyan-400", "cursor-not-allowed");
      button.classList.add("bg-cyan-500", "hover:bg-cyan-600");

      // Tampilkan pesan berhasil
      successMessage.classList.remove("hidden");

      // Sembunyikan pesan berhasil setelah 3 detik
      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 3000); // 3 detik
    })
    .catch((error) => {
      console.error("Error!", error.message);

      // Kembalikan tombol ke status normal jika terjadi kesalahan
      button.innerHTML = "Kirim";
      button.disabled = false;
      button.classList.remove("bg-cyan-400", "cursor-not-allowed");
      button.classList.add("bg-cyan-500", "hover:bg-cyan-600");
    });
}
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Mencegah form dari reload halaman default

  // Mengambil data dari form
  const form = e.target;
  const formData = new FormData(form);
  const nama = formData.get("nama");
  const pesan = formData.get("pesan");

  // Membuat URL WhatsApp dengan format yang sesuai
  const whatsappURL = `https://wa.me/6281521550913?text=${encodeURIComponent("Halo, kak.")}%0A%0ANama Saya:%20${encodeURIComponent(nama)}%0APesan:%20${encodeURIComponent(pesan)}`;

  // Redirect ke WhatsApp
  window.open(whatsappURL, "_blank");

  // Jika perlu, tampilkan pesan sukses
  document.getElementById("success-message").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("success-message").classList.add("hidden");
  }, 3000); // Sembunyikan setelah 3 detik
});
