TradeHub
Deskripsi 
TradeHub adalah aplikasi web forum jual beli barang bekas antar mahasiswa. Aplikasi ini membantu mahasiswa mencari dan menjual barang, seperti buku, kalkulator, elektronik, dan perlengkapan kos.

TradeHub menyediakan informasi status barang berupa Tersedia, Dipesan, dan Terjual agar informasi ketersediaan produk lebih jelas.

Teknologi
1. HTML
2. CSS
3. Bootstrap
4. JavaScript
5. jQuery 4.0.0 melalui CDN

Fitur
1. Menampilkan daftar barang.
2. Mencari dan memfilter barang berdasarkan kategori dan status.
3. Menampilkan detail barang dan informasi penjual.
4. Menyediakan formulir untuk menambahkan barang.
5. Menampilkan status ketersediaan barang.
6. Menampilkan produk dari data dummy menggunakan JavaScript.
7. Mengurutkan produk berdasarkan harga termurah atau termahal.
8. Menyaring produk langsung berdasarkan nama, kategori, dan status.
9. Menampilkan pesan jika tidak ada produk yang sesuai dengan filter.
10. Membuka dan menyembunyikan formulir jual barang dengan animasi jQuery.
11. Memvalidasi nama barang dan harga sebelum form dikirim.

Saya memilih Bootstrap karena framework ini menyediakan banyak komponen yang bisa langsung digunakan, seperti navbar, card produk, form pencarian, dan tombol. Bootstrap juga memudahkan saya membuat tampilan TradeHub yang responsif, sehingga tetap nyaman digunakan di laptop maupun HP. Dengan Bootstrap, proses pembuatan tampilan menjadi lebih cepat dan konsisten, serta lebih mudah dikembangkan untuk menambahkan fitur lain ke depannya.

Implementasi JavaScript dan jQuery
- `script.js` berisi data dummy produk, fungsi filter kategori, dan logika untuk merender serta menyaring produk pada halaman daftar barang.
- Produk pada contoh ini disimpan di dalam array JavaScript dan belum disimpan ke database atau server.
- jQuery dimuat melalui CDN sebelum `script.js` pada halaman daftar barang dan halaman jual barang.
- Pada halaman jual barang, tombol "Jual Barang" mengatur tampilan form dengan efek `slideToggle()`. Form menampilkan pesan error jika nama barang atau harga belum diisi.

Pengujian manual
1. Buka `daftar-barang.html`; pastikan lima produk dummy tampil.
2. Ubah kategori atau status, atau ketik nama barang; pastikan daftar dan jumlah produk diperbarui. Coba juga gabungkan filter kategori dan status.
3. Ubah pilihan pengurutan untuk memeriksa urutan harga.
4. Buka `tambah-barang.html`; klik tombol "Jual Barang" untuk membuka dan menyembunyikan form.

Link sharescreen: https://drive.google.com/file/d/1Jp4eTOn20c_3noe_AX2O57zQVPLiL7NQ/view?usp=sharing
