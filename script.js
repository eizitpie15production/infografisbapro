document.addEventListener('DOMContentLoaded', () => {
    
    // ------------------------------------------
    // FITUR 1: Efek "3D Tilt" pada Kartu saat Hover (JavaScript)
    // ------------------------------------------
    const kategoriKartu = document.querySelectorAll('.kategori-kartu');

    kategoriKartu.forEach(kartu => {
        kartu.addEventListener('mousemove', (e) => {
            const rect = kartu.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posisi X relatif terhadap kartu
            const y = e.clientY - rect.top;  // Posisi Y relatif terhadap kartu

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Sesuaikan faktor rotasi untuk kontrol yang lebih halus
            const rotateX = ((y - centerY) / centerY) * 12; // Rotasi maks 12 derajat
            const rotateY = ((x - centerX) / centerX) * -12; // Rotasi maks 12 derajat

            // Saat mouse bergerak di atas, terapkan efek 3D tilt + efek hover CSS
            kartu.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
        });

        kartu.addEventListener('mouseleave', () => {
            // Saat mouse keluar, kembalikan rotasi ke 0, tapi pertahankan efek hover CSS
            // Transisi di CSS akan membuatnya kembali dengan mulus
            kartu.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-10px) scale(1.03)`;
        });
    });

    // ------------------------------------------
    // FITUR MODERN: Scroll-Driven Animations (Intersection Observer)
    // ------------------------------------------
    const observerOptions = {
        root: null, // Mengamati viewport
        rootMargin: '0px',
        threshold: 0.2 // Ketika 20% elemen terlihat, picu animasi
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Berhenti mengamati setelah animasi dipicu
            }
        });
    }, observerOptions);

    // Terapkan observer ke setiap kartu
    kategoriKartu.forEach(card => {
        observer.observe(card);
    });

    // ------------------------------------------
    // FITUR 3: Modal (Jendela Pop-up Informasi)
    // ------------------------------------------
    const infoButtons = document.querySelectorAll('.info-button');
    const closeButtons = document.querySelectorAll('.close-button');
    const modals = document.querySelectorAll('.modal');

    // Fungsi untuk membuka modal
    function openModal(modalElement) {
        if (modalElement == null) return;
        modalElement.classList.add('active'); // Tambahkan kelas active untuk transisi CSS
        document.body.style.overflow = 'hidden'; // Mencegah scrolling body saat modal aktif
    }

    // Fungsi untuk menutup modal
    function closeModal(modalElement) {
        if (modalElement == null) return;
        modalElement.classList.remove('active'); // Hapus kelas active untuk transisi CSS
        document.body.style.overflow = 'auto'; // Mengembalikan scrolling body
    }

    // Event listener untuk tombol "Selengkapnya"
    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalTargetId = button.dataset.modalTarget; // Ambil ID modal dari data-modal-target
            const modal = document.getElementById(modalTargetId);
            openModal(modal);
        });
    });

    // Event listener untuk tombol tutup 'x'
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal'); // Cari elemen modal terdekat
            closeModal(modal);
        });
    });

    // Event listener untuk menutup modal saat mengklik di luar konten modal
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            // Jika yang diklik adalah area overlay modal (bukan modal-content)
            if (e.target.classList.contains('modal')) {
                closeModal(modal);
            }
        });
    });
});