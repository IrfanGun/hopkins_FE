import { createConnection } from 'mysql2';

// Ganti dengan detail koneksi database kamu
const connection = createConnection({
  user: 'hopkins_dev',  // Ganti dengan IP yang benar
  host: 'hopkinsfoundation-members.com',  // Ganti dengan username kamu
  password: '92S7,X24XWSz',  // Ganti dengan password yang benar
  database: 'hopkins_db',  // Ganti dengan nama database kamu
  port: 3306  // Gunakan port yang benar, jika berbeda sesuaikan
});

// Coba koneksi ke MySQL
connection.connect((err) => {
  if (err) {
    console.error('❌ Koneksi gagal:', err);
  } else {
    console.log('✅ Terhubung ke database dengan sukses!');
  }
  connection.end(); // Tutup koneksi setelah selesai
});
