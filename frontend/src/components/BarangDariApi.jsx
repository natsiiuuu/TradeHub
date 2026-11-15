import { useEffect, useState } from 'react'
// Endpoint API 
const API_URL = 'https://dummyjson.com/products?limit=8'

function BarangDariAPI() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fungsi utama: mengambil data dan mengatur state loading / success / error
  async function ambilData() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`Server membalas dengan status ${response.status}`)
      }
      const hasil = await response.json()
      setData(hasil.products)
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
          : err.message
      )
    } finally {
      setLoading(false)
    }
  }

  // Ambil data otomatis saat komponen pertama kali tampil
  useEffect(() => {
    ambilData()
  }, [])

  // Kondisi 1: loading
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 mb-0 text-muted">Memuat rekomendasi barang...</p>
      </div>
    )
  }

  // Kondisi 2: error, dengan tombol Coba Lagi
  if (error) {
    return (
      <div className="alert alert-danger text-center">
        <p className="mb-2">Gagal memuat data: {error}</p>
        <button type="button" className="btn btn-danger btn-sm" onClick={ambilData}>
          <i className="bi bi-arrow-clockwise"></i> Coba Lagi
        </button>
      </div>
    )
  }

  // Kondisi 3: sukses, tampilkan list dengan .map() dan key unik
  return (
    <div className="row g-3">
      {data.map((item) => (
        <div className="col-6 col-lg-3" key={item.id}>
          <div className="card item-card h-100">
            <img src={item.thumbnail} className="card-img-top" alt={item.title} />
            <div className="card-body">
              <small className="text-muted text-capitalize">{item.category}</small>
              <h6 className="card-title mt-1">{item.title}</h6>
              <p className="harga mb-0">${item.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BarangDariAPI