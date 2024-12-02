import React, { useState } from "react";
import "./PopupForm.css";

const PopupForm = ({ parkiranName, onClose, onSubmit }) => {
  const [durasi, setDurasi] = useState(1);
  const [waktuMasuk, setWaktuMasuk] = useState("");

  // Menghitung waktu keluar
  const calculateWaktuKeluar = () => {
    if (!waktuMasuk || !durasi) return "";
    const masuk = new Date(`1970-01-01T${waktuMasuk}`);
    masuk.setHours(masuk.getHours() + parseInt(durasi));
    return masuk.toTimeString().slice(0, 5);
  };
 
  const handleForm = (e) => {
    e.preventDefault();
    const waktuKeluar = calculateWaktuKeluar();
    const bookingData = {
      parkiranName,
      waktuMasuk,
      durasi,
      waktuKeluar,
    };
    onSubmit(bookingData); // Kirim data ke parent
    alert(`Booking berhasil bro untuk ${parkiranName}\nWaktu Keluar: ${waktuKeluar}`);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-header">Booking Tempat Parkir</h2>
        <form className="popup-form" onSubmit={handleForm}>
          <div>
            <label>Nama Parkiran:</label>
            <input type="text" value={parkiranName} readOnly />
          </div>
          <div>
            <label>Waktu Masuk:</label>
            <input
              type="time"
              value={waktuMasuk}
              onChange={(e) => setWaktuMasuk(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Durasi (jam):</label>
            <input
              type="number"
              min="1"
              value={durasi}
              onChange={(e) => setDurasi(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Waktu Keluar:</label>
            <input type="text" value={calculateWaktuKeluar()} readOnly />
          </div>
          <div className="popup-buttons">
            <button type="submit" className="submit">
              Pesan
            </button>
            <button type="button" className="cancel" onClick={onClose}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
