const produk = [
    { id: 1, nama: "Kipas Angin", kategori: "Elektronik", harga: 65000, kondisi: "Baik", status: "tersedia", lokasi: "Telkom University" },
    { id: 2, nama: "Headset Gaming", kategori: "Elektronik", harga: 150000, kondisi: "Seperti Baru", status: "dipesan", lokasi: "Dayeuhkolot" },
    { id: 3, nama: "Kalkulator", kategori: "Elektronik", harga: 80000, kondisi: "Baik", status: "tersedia", lokasi: "Buah Batu" },
    { id: 4, nama: "Novel Bulan", kategori: "Buku", harga: 45000, kondisi: "Cukup", status: "tersedia", lokasi: "Telkom University" },
    { id: 5, nama: "Jaket Hoodie", kategori: "Fashion", harga: 100000, kondisi: "Baik", status: "terjual", lokasi: "Bandung" }
];

function filterProdukByKategori(data, kategori) {
    if (!kategori) {
        return data;
    }

    return data.filter((barang) => barang.kategori === kategori);
}

const productContainer = document.querySelector("#product-container");
const filterForm = document.querySelector("#filter-form");
const categoryFilter = document.querySelector("#category-filter");
const statusFilter = document.querySelector("#status-filter");
const searchInput = document.querySelector("#search");
const sortSelect = document.querySelector("#urutkan");
const productCount = document.querySelector("#product-count");

function renderProduk() {
    if (!productContainer) return;

    let hasilFilter = filterProdukByKategori(produk, categoryFilter.value);
    const kataKunci = searchInput.value.trim().toLocaleLowerCase("id");

    if (kataKunci) {
        hasilFilter = hasilFilter.filter((barang) =>
            barang.nama.toLocaleLowerCase("id").includes(kataKunci)
        );
    }

    if (statusFilter.value) {
        hasilFilter = hasilFilter.filter((barang) => barang.status === statusFilter.value);
    }

    if (sortSelect.value === "termurah") {
        hasilFilter = [...hasilFilter].sort((a, b) => a.harga - b.harga);
    } else if (sortSelect.value === "termahal") {
        hasilFilter = [...hasilFilter].sort((a, b) => b.harga - a.harga);
    }

    productContainer.replaceChildren();
    productCount.textContent = `Menampilkan ${hasilFilter.length} barang`;

    if (hasilFilter.length === 0) {
        const pesanKosong = document.createElement("p");
        pesanKosong.className = "col-12 text-muted";
        pesanKosong.setAttribute("role", "status");
        pesanKosong.textContent = "Tidak ada barang yang sesuai dengan filter.";
        productContainer.appendChild(pesanKosong);
        return;
    }

    hasilFilter.forEach((barang) => {
        const kolom = document.createElement("div");
        kolom.className = "col-6 col-md-4";

        const card = document.createElement("article");
        card.className = "card produk-card h-100";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body p-3 d-flex flex-column";

        const status = document.createElement("span");
        status.className = "badge align-self-start mb-2";
        if (barang.status === "tersedia") {
            status.classList.add("bg-success");
        } else if (barang.status === "dipesan") {
            status.classList.add("bg-warning", "text-dark");
        } else {
            status.classList.add("bg-danger");
        }
        status.textContent = barang.status.charAt(0).toUpperCase() + barang.status.slice(1);

        const nama = document.createElement("h6");
        nama.className = "produk-nama mb-1";
        nama.textContent = barang.nama;

        const detail = document.createElement("small");
        detail.className = "text-muted d-block";
        detail.textContent = `${barang.kategori} · Kondisi ${barang.kondisi}`;

        const lokasi = document.createElement("small");
        lokasi.className = "text-muted d-block mb-2";
        lokasi.textContent = barang.lokasi;

        const harga = document.createElement("p");
        harga.className = "harga mb-2 mt-auto";
        harga.textContent = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(barang.harga);

        const linkDetail = document.createElement("a");
        linkDetail.href = "detail-barang.html";
        linkDetail.className = "btn btn-primary btn-sm w-100";
        linkDetail.textContent = "Lihat Detail";

        cardBody.append(status, nama, detail, lokasi, harga, linkDetail);
        card.appendChild(cardBody);
        kolom.appendChild(card);
        productContainer.appendChild(kolom);
    });
}

if (filterForm) {
    filterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        renderProduk();
    });
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", renderProduk);
}

if (statusFilter) {
    statusFilter.addEventListener("change", renderProduk);
}

if (searchInput) {
    searchInput.addEventListener("input", renderProduk);
}

if (sortSelect) {
    sortSelect.addEventListener("change", renderProduk);
}

renderProduk();

$(function () {
    const $formContainer = $("#jual-form-container");
    const $toggleButton = $("#toggle-form-btn");
    const $form = $("#jual-form");
    const $error = $("#form-error");

    if ($formContainer.length && $toggleButton.length) {
        $formContainer.hide();

        $toggleButton.on("click", function () {
            const akanDitampilkan = !$formContainer.is(":visible");

            $formContainer.stop(true, true).slideToggle();
            $(this).attr("aria-expanded", String(akanDitampilkan));
        });
    }

    $form.on("submit", function (event) {
        const nama = $("#nama-barang").val().trim();
        const harga = $("#harga").val().trim();

        if (!nama || !harga) {
            event.preventDefault();
            $error
                .text("Nama barang dan harga wajib diisi.")
                .stop(true, true)
                .fadeIn();
            return;
        }

        $error.hide().text("");

        if (!this.checkValidity()) {
            event.preventDefault();
            this.reportValidity();
        }
    });
});