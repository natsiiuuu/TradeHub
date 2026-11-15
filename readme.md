# TradeHub

Forum jual beli barang bekas antar mahasiswa. Penjual dapat memposting barang,
pembeli dapat mencari dan melihat detailnya, dan status barang
(Tersedia, Dipesan, Terjual) dapat diperbarui


## Struktur Repo
| Folder | Isi |
|---|---|
| `/` (root) | Versi awal: HTML, Bootstrap, JavaScript/jQuery |
| `frontend/` | Aplikasi React (Vite) + Bootstrap + Axios |
| `backend/` | REST API NestJS (modul `barang`, data di memori) |
| `docs/screenshots/` | Screenshot setiap tahapan |

## Teknologi
React (Vite), React Router, Bootstrap 5, Axios, NestJS, class-validator.

## Fitur
- Daftar, pencarian, dan filter kategori barang
- Detail barang, tambah barang, ubah status, hapus barang
- Rekomendasi barang dari API eksternal (DummyJSON) dengan state loading, sukses, dan error
- Backend REST dengan validasi DTO serta penanganan error 404 dan 409

## Endpoint Backend
| Method | Path | Fungsi |
|---|---|---|
| GET | /barang | Semua barang |
| GET | /barang/:id | Detail barang (404 jika tidak ada) |
| POST | /barang | Tambah barang (400 jika tidak valid, 409 jika duplikat) |
| PATCH | /barang/:id | Ubah sebagian data |
| DELETE | /barang/:id | Hapus barang (204) |

## Cara Menjalankan
Backend:
```
cd backend
npm install
npm run start:dev
```
Frontend (terminal lain):
```
cd frontend
npm install
npm run dev
```
Buka http://localhost:5173 (backend di http://localhost:3000).

## Screenshot

### Instalasi
![Vite berjalan](docs/screenshots/01-vite-localhost.png)
![Push pertama](docs/screenshots/02-push-pertama.png)

### Frontend
![Beranda](docs/screenshots/03-frontend-beranda.png)
![Tampilan mobile](docs/screenshots/04-frontend-mobile.png)

### Konsumsi API eksternal
![Loading](docs/screenshots/05-api-loading.png)
![Sukses](docs/screenshots/06-api-success.png)
![Error](docs/screenshots/07-api-error.png)

### Backend NestJS
![Hello World](docs/screenshots/08-nest-hello.png)
![Struktur folder](docs/screenshots/09-nest-struktur.png)

### Pengujian endpoint (REST Client)
![GET semua](docs/screenshots/10-get-semua.png)
![GET satu](docs/screenshots/11-get-satu.png)
![GET 404](docs/screenshots/12-get-404.png)
![POST 201](docs/screenshots/13-post-201.png)
![POST 400](docs/screenshots/14-post-400.png)
![POST 409](docs/screenshots/15-post-409.png)
![PATCH](docs/screenshots/16-patch.png)
![DELETE 204](docs/screenshots/17-delete-204.png)
![GET setelah hapus](docs/screenshots/18-get-setelah-hapus.png)

### Alur Frontend dan Backend
![Tambah barang](docs/screenshots/19-alur-tambah.png)
![Ubah status](docs/screenshots/20-alur-ubah.png)
![Hapus barang](docs/screenshots/21-alur-hapus.png)
![Backend mati](docs/screenshots/22-error-backend-mati.png)