// Endpoint API (untuk simulasi error, ubah sementara jadi /produk-salah)
const API_URL = "https://dummyjson.com/products?limit=8";

const apiContainer = document.querySelector("#api-container");

function buatElemen(tag, kelas, teks) {
    const elemen = document.createElement(tag);
    if (kelas) elemen.className = kelas;
    if (teks) elemen.textContent = teks;
    return elemen;
}

// Kondisi 1: loading
function tampilkanLoading() {
    const wadah = buatElemen("div", "text-center py-5");
    const spinner = buatElemen("div", "spinner-border text-primary");
    spinner.setAttribute("role", "status");
    const teks = buatElemen("p", "mt-2 mb-0 text-muted", "Memuat rekomendasi barang...");

    wadah.append(spinner, teks);
    apiContainer.replaceChildren(wadah);
}

// Kondisi 2: error, dengan tombol Coba Lagi
function tampilkanError(pesan) {
    const kotak = buatElemen("div", "alert alert-danger text-center");
    const teks = buatElemen("p", "mb-2", `Gagal memuat data: ${pesan}`);
    const tombol = buatElemen("button", "btn btn-danger btn-sm", "Coba Lagi");
    tombol.type = "button";
    tombol.addEventListener("click", ambilDataAPI);

    kotak.append(teks, tombol);
    apiContainer.replaceChildren(kotak);
}

// Membuat satu kartu barang (data-id berfungsi sebagai key unik)
function buatKartu(item) {
    const kolom = buatElemen("div", "col-6 col-lg-3");
    kolom.dataset.id = item.id;

    const card = buatElemen("div", "card item-card h-100");

    const gambar = document.createElement("img");
    gambar.src = item.thumbnail;
    gambar.alt = item.title;
    gambar.className = "card-img-top";

    const body = buatElemen("div", "card-body");
    const kategori = buatElemen("small", "text-muted text-capitalize", item.category);
    const judul = buatElemen("h6", "card-title mt-1", item.title);
    const harga = buatElemen("p", "harga mb-0", `$${item.price}`);

    body.append(kategori, judul, harga);
    card.append(gambar, body);
    kolom.appendChild(card);
    return kolom;
}

// Kondisi 3: sukses, tampilkan list memakai .map()
function tampilkanData(daftar) {
    const baris = buatElemen("div", "row g-3");
    const kartu = daftar.map((item) => buatKartu(item));

    baris.append(...kartu);
    apiContainer.replaceChildren(baris);
}

// Fungsi utama: mengambil data dan mengatur kondisi loading / sukses / error
async function ambilDataAPI() {
    tampilkanLoading();

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Server membalas dengan status ${response.status}`);
        }

        const hasil = await response.json();
        tampilkanData(hasil.products);
    } catch (error) {
        const pesan = error.message === "Failed to fetch"
            ? "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
            : error.message;
        tampilkanError(pesan);
    }
}

if (apiContainer) {
    ambilDataAPI();
}