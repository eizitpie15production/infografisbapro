document.addEventListener('DOMContentLoaded', () => {
    // SEMUA KODE DI SINI BERADA DALAM SATU RUANG LINGKUP (SCOPE)
    
    // ------------------------------------------
    // FITUR 1 & 2: 3D Tilt & Scroll Animation
    // ------------------------------------------
    const kategoriKartu = document.querySelectorAll('.kategori-kartu');

    kategoriKartu.forEach(kartu => {
        kartu.addEventListener('mousemove', (e) => {
            const rect = kartu.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 12;
            const rotateY = ((x - centerX) / centerX) * -12;

            kartu.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
        });

        kartu.addEventListener('mouseleave', () => {
            kartu.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-10px) scale(1.03)`;
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    kategoriKartu.forEach(card => {
        observer.observe(card);
    });

    // ------------------------------------------
    // FITUR 3: Modal (Jendela Pop-up Informasi) - Definisikan Fungsi di Scope Ini
    // ------------------------------------------
    const modalButtons = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('.close-button');
    const modals = document.querySelectorAll('.modal');

    // Fungsi untuk membuka modal (MODIFIKASI UNTUK PROGRESS TRACKING)
    function openModal(modalElement) {
        if (modalElement == null) return;
        modalElement.classList.add('active');
        document.body.style.overflow = 'hidden'; 
        
        // --- TAMBAHAN BARU: Tandai Kartu sebagai Selesai ---
        const modalId = modalElement.id; // Mendapatkan ID modal (misalnya, "modal-frontend")
        
        // Kita menggunakan .replace() untuk menghapus prefix "modal-" 
        // sehingga kita mendapatkan ID kartu yang sesuai (misalnya, "frontend-dev")
        const cardId = modalId.replace('modal-', ''); 
        const targetCard = document.getElementById(cardId);

        if (targetCard) {
            targetCard.classList.add('completed');
        }
        // --------------------------------------------------
    }

    // Fungsi untuk menutup modal
    function closeModal(modalElement) {
        if (modalElement == null) return;
        modalElement.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event listener untuk SEMUA tombol modal (Info dan Dokumentasi)
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalTargetId = button.dataset.modalTarget;
            const modal = document.getElementById(modalTargetId);
            openModal(modal);
            
            // --- PERBAIKAN LOGIKA: TANDAI KARTU INDUK ---
            // Menggunakan .closest() untuk mencari elemen parent terdekat dengan class .kategori-kartu
            const parentCard = button.closest('.kategori-kartu');

            if (parentCard) {
                parentCard.classList.add('completed');
            }
            // ---------------------------------------------
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeModal(modal);
            }
        });
    });
    
    // ------------------------------------------
    // FITUR 4: Tombol Kembali ke Atas (Sekarang ada di dalam DOMContentLoaded)
    // ------------------------------------------
    const tombolKeAtas = document.getElementById('tombol-ke-atas');

    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            tombolKeAtas.classList.add('show');
        } else {
            tombolKeAtas.classList.remove('show');
        }
    }

    window.onscroll = function() {
        scrollFunction();
    };

    tombolKeAtas.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ------------------------------------------
    // FITUR 5: Keyboard Navigation (Sekarang ada di dalam DOMContentLoaded, bisa panggil closeModal)
    // ------------------------------------------
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal); // Panggilan ini sekarang berhasil!
            }
        }
    });
	// Jalankan highlight.js setelah semua elemen dimuat
    hljs.highlightAll();
	
	
	// ------------------------------------------
    // FITUR 7: Spotlight / Dimming Focus Effect
    // ------------------------------------------
    const kategoriContainer = document.querySelector('.kategori-container'); 

    // Saat mouse masuk ke area container, aktifkan mode spotlight
    kategoriContainer.addEventListener('mouseenter', () => {
        kategoriContainer.classList.add('spotlight');
    });

    // Saat mouse keluar dari area container, matikan mode spotlight
    kategoriContainer.addEventListener('mouseleave', () => {
        kategoriContainer.classList.remove('spotlight');
    });

});

// ------------------------------------------
// FITUR: Navigasi Tab di dalam Modal
// (Kode ini menangani SEMUA modal, termasuk Data Science & Mobile)
// ------------------------------------------
const modalNavContainers = document.querySelectorAll('.modal-nav-kategori');

modalNavContainers.forEach(navContainer => {
    navContainer.addEventListener('click', (e) => {
        // Pastikan kita mengklik tombol, bukan area kosong
        if (!e.target.classList.contains('nav-button')) return;

        const clickedButton = e.target;
        const targetId = clickedButton.dataset.target; // Ambil "links-swift"
        const targetContent = document.getElementById(targetId);

        // 1. Nonaktifkan semua tombol di grup ini
        navContainer.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // 2. Aktifkan tombol yang diklik
        clickedButton.classList.add('active');

        // 3. Sembunyikan semua konten di modal ini
        const modalContent = navContainer.closest('.modal-content');
        modalContent.querySelectorAll('.links-container').forEach(container => {
            container.classList.remove('active');
        });

        // 4. Tampilkan konten yang dituju
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});



// --- Kode untuk memutar musik saat diklik ---

// 1. Temukan elemen audio di halaman
const musikLatar = document.querySelector('audio');

// 2. Buat fungsi untuk memulai musik (HANYA SEKALI)
function mulaiMusik() {
    if (musikLatar) {
        // Coba putar musik
        musikLatar.play()
            .then(() => {
                // Berhasil!
                console.log("Musik berhasil diputar.");
            })
            .catch(error => {
                // Gagal (mungkin browser tetap memblokir)
                console.error("Error saat memutar musik:", error);
            });
        
        // 3. Hapus listener ini agar tidak berjalan setiap kali diklik
        document.body.removeEventListener('click', mulaiMusik);
    }
}

// 4. Tambahkan 'event listener' ke seluruh halaman
//    Saat pengguna mengklik di mana saja, jalankan fungsi 'mulaiMusik'
document.body.addEventListener('click', mulaiMusik);