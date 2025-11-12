document.addEventListener('DOMContentLoaded', () => {
    
    // ------------------------------------------
    // FITUR 1: Efek "3D Tilt" pada Kartu saat Hover (JavaScript)
    // ------------------------------------------
    const kategoriKartu = document.querySelectorAll('.kategori-kartu');

    kategoriKartu.forEach(kartu => {
        kartu.addEventListener('mousemove', (e) => {
            const rect = kartu.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 12; // Rotasi maks 12 derajat
            const rotateY = ((x - centerX) / centerX) * -12; // Rotasi maks 12 derajat

            kartu.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
        });

        kartu.addEventListener('mouseleave', () => {
            // Mengembalikan ke posisi hover CSS
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
    
    // Menemukan SEMUA tombol yang memiliki atribut [data-modal-target]
    const modalButtons = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('.close-button');
    const modals = document.querySelectorAll('.modal');

    // Fungsi untuk membuka modal
    function openModal(modalElement) {
        if (modalElement == null) return;
        modalElement.classList.add('active');
        document.body.style.overflow = 'hidden'; // Mencegah scrolling body
    }

    // Fungsi untuk menutup modal
    function closeModal(modalElement) {
        if (modalElement == null) return;
        modalElement.classList.remove('active');
        document.body.style.overflow = 'auto'; // Mengembalikan scrolling body
    }

    // Event listener untuk SEMUA tombol modal (Info dan Dokumentasi)
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalTargetId = button.dataset.modalTarget;
            const modal = document.getElementById(modalTargetId);
            openModal(modal);
        });
    });

    // Event listener untuk tombol tutup 'x'
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Event listener untuk menutup modal saat mengklik di luar konten
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeModal(modal);
            }
        });
    });
});