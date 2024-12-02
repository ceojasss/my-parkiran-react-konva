import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import PopupForm from "./PopupForm";

const ParkiranKonva = () => {
  const [selectedSlot, setSelectedSlot] = useState(null); // Menyimpan Parkiran yang Sedang Dipilih / Di tunjuk
  const [showForm, setShowForm] = useState(false); // Mengontrol apakah form booking ditampilkan
  const [bookingList, setBookingList] = useState([]); // Menyimpan daftar booking
  const [bookedSlots, setBookedSlots] = useState([]); // Menandakan bahwa parkiran yang sudah dibooking

  // Peta lokasi tempat parkir
  const parkiran = [
    { id: "A1", x: 50, y: 50 },    
    { id: "A2", x: 150, y: 50 },
    { id: "A3", x: 250, y: 50 },
    { id: "A4", x: 50, y: 150 },
    { id: "A5", x: 150, y: 150 },
    { id: "A6", x: 250, y: 150 },
    { id: "A7", x: 50, y: 250 },
    { id: "A8", x: 150, y: 250 },
    { id: "A9", x: 250, y: 250 },
  ];

  // Ketika pengguna mengklik salah satu parkiran
  const handleSlotClick = (id) => {
    // Cek apakah parkiran sudah dibooking  
    if (bookedSlots.includes(id)) {
      alert(`Parkiran ${id} sudah dibooking.`);
      return;
    }
    setSelectedSlot(id);
     // Set parkiran yang dipilih
    setShowForm(true); // Tampilkan form booking
  };

  

  // Ketika form booking berhasil di-submit
  const handleFormSubmit = (formData) => {

    console.log('form data :',formData );
    
    // Tambahkan data booking baru ke daftar booking
    setBookingList((prevList) => [...prevList, formData]);

    // Tandai parkiran sebagai "dibooking"
    setBookedSlots((prevSlots) => [...prevSlots, formData.parkiranName]);

    // Timer untuk mengosongkan parkiran setelah waktu habis
    const durasiMiliseconds = formData.durasi * 60 * 60 * 1000; // Konversi durasi dari jam ke milidetik
    setTimeout(() => {
      // Hapus status "dibooking" untuk parkiran ini setelah waktu habis
      setBookedSlots((prevSlots) =>
        prevSlots.filter((slot) => slot !== formData.parkiranName)
      );

      // Hapus data booking dari tabel setelah waktu habis
      setBookingList((prevList) =>
        prevList.filter((booking) => booking.parkiranName !== formData.parkiranName)
      );
    }, durasiMiliseconds);

    setShowForm(false); // Tutup form booking
  };


  // console.log('booking list : ',bookingList);

  // console.log('booked slot', bookedSlots);
  
  
  return (
    <div>
      {/* Canvas untuk menggambar parkiran */}
      <Stage width={400} height={400}>
        <Layer>
          {parkiran.map((slot) => (
            <React.Fragment key={slot.id}>
              {/* Kotak parkiran */}
              <Rect
                x={slot.x}
                y={slot.y}
                width={80}
                height={80}
                fill={bookedSlots.includes(slot.id) ? "red" : "green"} // Jika dibooking, warna merah; jika kosong, warna hijau
                stroke="#000"
                strokeWidth={2}
                onClick={() => handleSlotClick(slot.id)} // Klik untuk memilih parkiran
              />
              {/* Nama parkiran */}
              <Text
                x={slot.x + 20}
                y={slot.y + 30}
                text={slot.id} // Menampilkan ID parkiran (contoh: A1, A2)
                fontSize={18} 
                fill="#FFF"
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>

      {/* Form booking */}
      {showForm && (
        <PopupForm
          parkiranName={selectedSlot} // Kirim nama parkiran ke form
          onClose={() => setShowForm(false)} // Fungsi untuk menutup form
          onSubmit={handleFormSubmit} // Fungsi untuk menangani submit form
        />
      )}

      {/* Tabel daftar booking */}
      <h3>Data Booking Parkiran</h3>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Parkiran</th>
            <th>Waktu Masuk</th>
            <th>Durasi (jam)</th>
            <th>Waktu Keluar</th>
          </tr>
        </thead>
        <tbody>
          {bookingList.length > 0 ? (
            bookingList.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.parkiranName}</td>
                <td>{data.waktuMasuk}</td>
                <td>{data.durasi}</td>
                <td>{data.waktuKeluar}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Belum ada booking.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParkiranKonva;
