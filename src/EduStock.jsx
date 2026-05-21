import React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';

// ─── AI API ───────────────────────────────────────────────────────────────────
async function callClaude(messages, system) {
  const apiKey = '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';
  const groqMessages = [{ role: 'system', content: system }, ...messages];
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1200,
      messages: groqMessages,
    }),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    return `⚠️ Gagal menghubungi AI: ${err?.error?.message || r.statusText}`;
  }
  const d = await r.json();
  return d.choices?.[0]?.message?.content || 'Tidak ada respons.';
}

const AI_SYS = `Anda adalah tutor investasi saham Indonesia profesional dari EduStock by Septarius Education. Gaya: sabar, jelas, seperti mentor berpengalaman. Selalu contohkan dengan saham IDX nyata. Akhiri analisis saham dengan: ⚠️ Edukatif saja. Bukan saran investasi resmi. DYOR.`;

// ─── 8 MODULES DATA ──────────────────────────────────────────────────────────
const MODULES = [
  {
    id: 'M1',
    num: 1,
    icon: '🏦',
    color: '#06b6d4',
    level: 'Pemula',
    title: 'Fondasi Keuangan & Pasar Modal',
    desc: 'Literasi keuangan dasar, ekosistem pasar modal Indonesia, dan cara kerja investasi.',
    lessons: [
      {
        id: 'M1L1',
        title: 'Apa Itu Keuangan Pribadi?',
        dur: '8 mnt',
        content: `Keuangan pribadi adalah ilmu sekaligus seni mengelola uang secara menyeluruh. Cakupannya meliputi cara kita mendapatkan uang, membelanjakannya secara bijak, menabung secara disiplin, melindungi aset dari risiko, dan menginvestasikannya agar terus berkembang demi mencapai kesejahteraan finansial jangka panjang.\n\nBanyak orang keliru mengira keuangan pribadi hanya soal berhemat atau tidak boros. Padahal keuangan pribadi adalah sebuah sistem hidup yang mencakup seluruh perjalanan finansial seseorang, mulai dari pertama kali menerima gaji pertama, membangun keluarga, hingga menikmati masa pensiun dengan tenang dan bermartabat.\n\n**Mengapa Literasi Keuangan Sangat Penting?**\nSurvei OJK tahun 2023 mencatat indeks literasi keuangan Indonesia berada di angka 49,68 persen. Artinya lebih dari separuh penduduk Indonesia belum memahami keuangan dengan baik. Akibatnya sangat nyata: banyak orang bergaji besar namun tidak memiliki tabungan berarti, terjebak dalam utang konsumtif yang terus membesar, dan sama sekali tidak siap menghadapi masa pensiun.\n\nContoh nyata yang sering terjadi: seorang karyawan bergaji Rp15 juta per bulan bisa jauh lebih miskin dibandingkan rekannya yang bergaji Rp8 juta per bulan, apabila yang pertama tidak mampu mengelola keuangannya dengan benar. Penghasilan besar bukan jaminan kebebasan finansial. Pengelolaan yang cermat adalah kuncinya.\n\n**5 Pilar Utama Keuangan Pribadi**\n\n1. ARUS KAS (Cash Flow) — Arus kas adalah fondasi dari seluruh bangunan keuangan pribadi. Prinsipnya sederhana namun sangat krusial: pemasukan harus selalu lebih besar dari pengeluaran. Catat seluruh sumber pemasukan Anda, baik dari gaji, bisnis sampingan, maupun hasil investasi. Catat pula seluruh pengeluaran, mulai dari kebutuhan pokok, keinginan, hingga cicilan. Gunakan aplikasi pencatat keuangan seperti Money Manager, Wallet, atau cukup spreadsheet sederhana. Target ideal: simpan dan investasikan minimal 20 persen dari penghasilan setiap bulan tanpa gagal.\n\n2. ASET vs LIABILITAS — Inilah konsep paling mengubah cara pandang dari buku legendaris Rich Dad Poor Dad karya Robert Kiyosaki. Aset adalah segala sesuatu yang memasukkan uang ke kantong Anda, contohnya saham yang memberi dividen, properti yang disewakan, bisnis yang menghasilkan, atau deposito berbunga. Liabilitas sebaliknya adalah segala sesuatu yang mengeluarkan uang dari kantong Anda, misalnya kredit kendaraan mewah, cicilan barang elektronik yang nilainya terus turun, atau kartu kredit yang digunakan untuk gaya hidup. Strategi utamanya: terus perbesar kolom aset dan minimalkan liabilitas secara konsisten setiap bulan.\n\n3. DANA DARURAT — Dana darurat adalah jaring pengaman finansial yang wajib dimiliki sebelum melangkah ke investasi apapun. Besaran idealnya adalah 3 hingga 6 kali total pengeluaran bulanan. Bagi yang masih lajang cukup 3 kali lipat, bagi yang sudah menikah sebaiknya 6 kali lipat, dan bagi yang sudah punya anak disarankan 6 hingga 12 kali lipat pengeluaran. Simpan dana darurat di instrumen yang sangat likuid seperti tabungan bank atau reksa dana pasar uang agar bisa diakses kapan saja saat dibutuhkan. Sebagai contoh: jika pengeluaran bulanan Anda Rp5 juta, maka dana darurat minimal yang harus tersedia adalah Rp15 hingga Rp30 juta. Ingat satu aturan besi: jangan pernah mulai berinvestasi sebelum dana darurat Anda terpenuhi.\n\n4. PROTEKSI — Melindungi aset dan penghasilan dari risiko yang tidak terduga adalah pilar keempat yang sering diabaikan. Ada dua jenis proteksi utama yang wajib dimiliki. Pertama adalah asuransi jiwa, yang berfungsi melindungi keluarga secara finansial apabila pencari nafkah utama meninggal dunia. Kedua adalah asuransi kesehatan, yang melindungi tabungan seumur hidup Anda dari terkuras habis hanya karena satu kejadian sakit atau kecelakaan yang memerlukan biaya rumah sakit besar. Besaran premi yang sehat adalah maksimal 10 persen dari total penghasilan bulanan Anda.\n\n5. INVESTASI — Investasi adalah tahap terakhir dan paling menggembirakan, namun hanya boleh dimulai setelah keempat pilar sebelumnya sudah terpenuhi dengan baik. Tujuan investasi adalah membuat uang bekerja untuk Anda, bukan Anda yang harus terus bekerja keras hanya untuk uang. Mulailah dari instrumen yang paling mudah dipahami seperti reksa dana pasar uang atau reksa dana saham, kemudian tingkatkan secara bertahap ke saham individual, properti, atau bisnis sesuai kemampuan dan pemahaman Anda.\n\n**Aturan 50 Banding 30 Banding 20 — Metode Paling Populer**\nMetode alokasi gaji ini pertama dipopulerkan oleh Senator Amerika Serikat Elizabeth Warren dan terbukti efektif untuk berbagai level penghasilan.\n\n50 persen untuk Kebutuhan Pokok: ini mencakup makan sehari-hari, transportasi, tagihan listrik dan air, cicilan rumah atau sewa kost, dan kebutuhan dasar lainnya yang tidak bisa dihindari.\n\n30 persen untuk Keinginan: ini adalah alokasi untuk hal-hal yang membuat hidup lebih menyenangkan namun tidak bersifat wajib, seperti makan di restoran, hiburan, liburan, belanja pakaian, atau berlangganan layanan streaming.\n\n20 persen untuk Tabungan dan Investasi: inilah bagian terpenting yang menentukan masa depan finansial Anda. Alokasikan ke reksa dana, saham, deposito, atau untuk melengkapi dana darurat.\n\nSimulasi Nyata dengan Gaji Rp6 Juta per Bulan:\nKebutuhan 50 persen: Rp3.000.000\nKeinginan 30 persen: Rp1.800.000\nInvestasi 20 persen: Rp1.200.000 per bulan\nApabila Rp1,2 juta per bulan diinvestasikan secara konsisten dengan asumsi return rata-rata 12 persen per tahun selama 10 tahun penuh, nilai akhir portofolio Anda akan mencapai sekitar Rp277 juta. Padahal total uang yang Anda setorkan hanya Rp144 juta. Selisih Rp133 juta adalah murni hasil kekuatan compounding!\n\n**Mindset Keuangan yang Wajib Dibangun Sejak Hari Ini**\n\nPay Yourself First — Ini adalah kebiasaan nomor satu yang membedakan orang yang secara konsisten membangun kekayaan dari mereka yang selalu merasa kekurangan meski bergaji besar. Begitu gaji masuk ke rekening, langsung transfer sejumlah yang sudah Anda tetapkan ke rekening investasi atau tabungan SEBELUM membeli atau membayar apapun. Otomatiskan proses ini agar tidak tergantung pada kemauan dan disiplin harian.\n\nLive Below Your Means — Hiduplah di bawah kemampuan finansial Anda yang sesungguhnya. Jangan terpengaruh tekanan sosial untuk memamerkan kekayaan melalui barang atau gaya hidup yang tidak sesuai kondisi keuangan. Kekayaan sejati bukan tentang apa yang terlihat di luar, melainkan tentang kebebasan finansial yang Anda rasakan setiap harinya.\n\nThink Long Term — Setiap keputusan keuangan yang Anda ambil hari ini, sekecil apapun, akan membentuk kondisi finansial Anda 10 hingga 20 tahun ke depan. Berpikir jangka panjang berarti bersedia menunda kepuasan sesaat demi kebebasan yang jauh lebih berharga di masa mendatang.\n\nMake Money Work for You — Tujuan akhir dari keuangan pribadi yang sehat adalah mencapai titik di mana aset dan investasi Anda menghasilkan penghasilan yang cukup untuk membiayai seluruh gaya hidup Anda tanpa harus aktif bekerja. Inilah yang disebut kebebasan finansial sejati.\n\n**Kesalahan Keuangan Paling Umum di Indonesia**\n\nLifestyle inflation atau gaya hidup yang selalu naik mengikuti kenaikan gaji adalah jebakan paling umum. Banyak orang merasa sudah naik gaji namun tetap tidak bisa menabung lebih banyak karena pengeluaran ikut naik secara proporsional.\n\nTidak memiliki dana darurat sama sekali membuat satu kejadian tak terduga seperti PHK atau sakit bisa langsung menghancurkan kondisi keuangan yang sudah dibangun bertahun-tahun.\n\nBerinvestasi sebelum melunasi utang berbunga tinggi seperti kartu kredit atau pinjaman online adalah kesalahan matematis. Tidak ada investasi yang secara konsisten mampu mengalahkan bunga kartu kredit yang bisa mencapai 24 hingga 36 persen per tahun.\n\nIkut-ikutan investasi tanpa pemahaman yang memadai, baik karena ajakan teman, grup media sosial, atau tren sesaat, sangat sering berakhir dengan kerugian besar dan kapok berinvestasi selamanya.\n\nTidak memiliki tujuan keuangan yang jelas dan tertulis membuat semua usaha menabung dan berinvestasi menjadi tidak terarah dan mudah menyerah di tengah jalan.`,
      },
      {
        id: 'M1L2',
        title: 'Mengenal Pasar Modal Indonesia',
        dur: '10 mnt',
        content: `Pasar modal adalah sistem terorganisir tempat bertemunya pihak yang membutuhkan dana (emiten/perusahaan) dengan pihak yang memiliki kelebihan dana (investor). Berbeda dengan pasar uang yang berjangka pendek, pasar modal fokus pada instrumen jangka panjang.\n\nSederhananya: perusahaan butuh modal untuk berkembang → mereka "jual" kepemilikan (saham) atau surat utang (obligasi) → investor membeli → perusahaan dapat dana → investor dapat keuntungan. Semua pihak diuntungkan!\n\n**Sejarah Singkat BEI:**\nPasar modal Indonesia pertama kali dibuka oleh pemerintah kolonial Belanda pada 14 Desember 1912 di Batavia. Setelah merdeka, sempat vakum dan dibuka kembali pada 1977 oleh Presiden Soeharto. BEI (gabungan BEJ dan BES) resmi beroperasi sejak 2007. Kini BEI adalah salah satu bursa dengan pertumbuhan investor tercepat di Asia Tenggara.\n\n**Ekosistem Lengkap Pasar Modal Indonesia:**\n\n1. BEI (Bursa Efek Indonesia)Penyelenggara bursa resmi, menyediakan sistem perdagangan, mengatur tata tertib. Berlokasi di SCBD Jakarta. Saham BEI sendiri dimiliki oleh perusahaan sekuritas anggota bursa.\n\n2. OJK (Otoritas Jasa Keuangan) — Regulator dan pengawas tertinggi. Dibentuk 2011, menggantikan Bapepam-LK. Mengawasi perbankan, pasar modal, dan industri keuangan non-bank. Melindungi konsumen dan investor dari penipuan.\n\n3. KSEI (Kustodian Sentral Efek Indonesia) — "Brankas" penyimpan efek secara elektronik. Setiap investor punya SID (Single Investor Identification) unik. Saham Anda tersimpan aman di KSEI, bukan di sekuritas — sehingga jika sekuritas bangkrut, saham Anda tetap aman!\n\n4. KPEI (Kliring Penjaminan Efek Indonesia) — Memproses kliring dan penyelesaian transaksi. Menjamin setiap transaksi yang terjadi di BEI. Sistem T+2: transaksi hari ini selesai 2 hari kerja kemudian.\n\n5. Perusahaan Sekuritas — Perantara antara investor dengan bursa. Harus terdaftar dan berizin OJK. Menyediakan platform trading (aplikasi/website). Contoh: BCA Sekuritas, Mirae Asset, Ajaib, Stockbit, Indo Premier.\n\n6. Manajer Investasi — Mengelola reksa dana dan portofolio nasabah. Harus memiliki izin OJK dan Wakil Manajer Investasi (WMI). Contoh: Schroders, Manulife, Eastspring, Batavia Prosperindo.\n\n**Instrumen yang Diperdagangkan di Pasar Modal:**\n\nSaham — Bukti kepemilikan perusahaan. Keuntungan: dividen + capital gain. Risiko: harga fluktuatif, bisa rugi jika perusahaan buruk.\n\nObligasi — Surat utang dari pemerintah atau korporasi. Pemegang obligasi = kreditur (pemberi pinjaman). Keuntungan: kupon (bunga) tetap + pokok dikembalikan saat jatuh tempo. Risiko: gagal bayar (default risk).\n\nReksa Dana — Wadah investasi kolektif dikelola manajer investasi profesional. Cocok untuk pemula karena modal kecil dan terdiversifikasi otomatis. Jenis: pasar uang, pendapatan tetap, campuran, saham.\n\nETF (Exchange Traded Fund) — Reksa dana yang diperdagangkan di bursa seperti saham. Mengikuti indeks tertentu (misal: ETF LQ45, ETF IDX30). Biaya lebih rendah dari reksa dana konvensional.\n\nDerivative — Instrumen turunan (kontrak berjangka, opsi). Sangat berisiko, hanya untuk investor berpengalaman. Contoh: kontrak futures indeks saham di BEI.\n\n**Fakta dan Data BEI Terkini:**\nJumlah emiten: lebih dari 900 perusahaan terdaftar.\nKapitalisasi pasar: lebih dari Rp10.000 triliun.\nJumlah investor (SID): lebih dari 13 juta — mayoritas generasi milenial dan Gen Z.\nNilai transaksi harian rata-rata: Rp10–15 triliun/hari.\nSaham terbesar: BBCA, BBRI, TLKM, ASII, BMRI (berdasarkan market cap).\n\n**Pasar Perdana vs Pasar Sekunder:**\nPasar Perdana (Primary Market): perusahaan pertama kali menjual saham ke publik (IPO — Initial Public Offering). Investor beli langsung dari perusahaan.\nPasar Sekunder (Secondary Market): investor jual-beli saham antar sesama investor. Inilah yang terjadi setiap hari di BEI. Perusahaan tidak terlibat lagi dalam transaksi ini.`,
      },
      {
        id: 'M1L3',
        title: 'Jenis Instrumen Investasi',
        dur: '9 mnt',
        content: `Memilih instrumen investasi yang tepat adalah keputusan krusial yang menentukan apakah tujuan finansial Anda tercapai. Setiap instrumen memiliki karakteristik unik — profil risiko, potensi return, likuiditas, dan horizon waktu yang berbeda.\n\nIngat prinsip emas: tidak ada satu instrumen pun yang terbaik untuk semua orang di semua kondisi. Yang terbaik adalah yang sesuai dengan tujuan, horizon waktu, dan toleransi risiko Anda.\n\n**Piramida Investasi Indonesia (dari paling aman ke paling berisiko):**\n\nLEVEL 1 — PALING AMAN (Pondasi):\nTabungan Bank — Likuiditas sempurna, bisa ditarik kapan saja. Return: 1–3%/tahun (di bawah inflasi). Dijamin LPS hingga Rp2 miliar per nasabah per bank. Cocok untuk: kebutuhan sehari-hari dan dana darurat jangka sangat pendek.\n\nDeposito — Tabungan berjangka (1, 3, 6, 12 bulan). Return: 3–5%/tahun, lebih tinggi dari tabungan biasa. Dijamin LPS hingga Rp2 miliar. Risiko: uang terkunci selama periode deposito, denda jika dicairkan lebih awal. Cocok untuk: dana darurat sekunder atau tujuan jangka pendek 1–2 tahun.\n\nLEVEL 2 — RISIKO RENDAH:\nObligasi Pemerintah Ritel — ORI (Obligasi Negara Ritel), SBR (Saving Bond Ritel), Sukuk Ritel, SBSN. Diterbitkan langsung oleh pemerintah Indonesia — dijamin negara, tidak bisa gagal bayar (selama negara ada). Return: 6–7%/tahun, lebih tinggi dari deposito. Kupon dibayar bulanan. Minimal investasi: Rp1 juta. Cocok untuk: investor konservatif yang ingin return lebih baik dari deposito.\n\nLEVEL 3 — RISIKO MENENGAH:\nReksa Dana Pasar Uang — Investasi di instrumen pasar uang (deposito, SBI, obligasi jangka pendek). Return: 4–6%/tahun. Likuid, bisa dicairkan kapan saja (T+1). Risiko sangat rendah. Cocok untuk: pengganti tabungan/deposito dengan return lebih tinggi.\n\nReksa Dana Pendapatan Tetap — Mayoritas investasi di obligasi. Return: 6–9%/tahun. Fluktuasi rendah. Cocok untuk: tujuan 1–3 tahun.\n\nReksa Dana Campuran — Kombinasi saham dan obligasi. Return: 8–12%/tahun. Risiko moderat. Cocok untuk: tujuan 3–5 tahun.\n\nLEVEL 4 — RISIKO TINGGI:\nReksa Dana Saham — Mayoritas investasi di saham. Return historis: 10–15%/tahun jangka panjang. Fluktuasi tinggi jangka pendek. Cocok untuk: tujuan 5+ tahun.\n\nETF (Exchange Traded Fund) — Reksa dana diperdagangkan di bursa. Mengikuti indeks (LQ45, IDX30, S&P500). Biaya sangat rendah (expense ratio 0,1–0,5%). Transparan dan likuid. Cocok untuk: investor yang ingin diversifikasi luas dengan biaya rendah.\n\nLEVEL 5 — RISIKO SANGAT TINGGI:\nSaham Individual — Potensi return tidak terbatas, tapi risiko juga sangat tinggi. Membutuhkan analisis mendalam (fundamental + teknikal). Bisa untung 100%+ atau rugi hingga 100% (jika perusahaan bangkrut). Cocok untuk: investor yang sudah berpengalaman dan memiliki waktu untuk riset.\n\nProperti — Return dari sewa + kenaikan harga. Return: 8–15%/tahun di lokasi premium. Modal besar (ratusan juta hingga miliaran). Tidak likuid — sulit dijual cepat. Cocok untuk: investor dengan modal besar dan horizon panjang.\n\n**Perbandingan Lengkap Instrumen:**\nDeposito: Return 3-5%, Risiko Sangat Rendah, Likuiditas Rendah, Modal Minimal Rp1jt\nORI/SBR: Return 6-7%, Risiko Sangat Rendah, Likuiditas Rendah, Modal Minimal Rp1jt\nRD Pasar Uang: Return 4-6%, Risiko Sangat Rendah, Likuiditas Tinggi, Modal Minimal Rp10rb\nRD Saham: Return 10-15%, Risiko Tinggi, Likuiditas Sedang, Modal Minimal Rp10rb\nSaham: Return Tidak Terbatas, Risiko Tinggi, Likuiditas Tinggi, Modal Minimal Rp100rb\n\n**Prinsip Alokasi Portofolio Berdasarkan Usia:**\nRumus klasik: persentase saham = 100 minus usia Anda.\nUsia 25 tahun: 75% saham, 25% obligasi/deposito.\nUsia 40 tahun: 60% saham, 40% obligasi/deposito.\nUsia 55 tahun: 45% saham, 55% obligasi/deposito.\n\nIngat: TIDAK ADA investasi yang memberikan return tinggi dengan risiko nol. Jika ada yang menjanjikan itu, sudah pasti penipuan (investasi bodong). Selalu verifikasi legalitas di cekstatus.ojk.go.id sebelum berinvestasi!`,
      },
      {
        id: 'M1L4',
        title: 'Time Value of Money',
        dur: '8 mnt',
        content: `Time Value of Money (TVM) adalah konsep paling fundamental dalam dunia keuangan dan investasi. Prinsipnya sederhana namun dampaknya luar biasa: Rp1.000.000 yang Anda miliki hari ini lebih bernilai dibanding Rp1.000.000 yang akan Anda terima setahun kemudian.\n\nMengapa? Karena uang hari ini bisa diinvestasikan dan berkembang menjadi lebih besar di masa depan. Jika Anda menyimpan Rp1.000.000 di deposito 5%/tahun, setahun kemudian menjadi Rp1.050.000. Jadi, Rp1.000.000 hari ini = Rp1.050.000 setahun kemudian.\n\n**Faktor-faktor yang Mempengaruhi TVM:**\nTingkat bunga/return — semakin tinggi return, semakin besar pertumbuhan.\nWaktu — semakin lama diinvestasikan, semakin besar hasilnya (efek compounding).\nInflasi — musuh uang yang diam-diam menggerus nilai purchasing power Anda.\nFrekuensi compounding — bulanan lebih baik dari tahunan.\n\n**Rumus Future Value (FV):**\nFV = PV × (1 + r)^n\nPV = Present Value (nilai sekarang)\nr = tingkat return per periode\nn = jumlah periode\n\nContoh Kalkulasi Nyata:\nModal: Rp10.000.000\nReturn: 12%/tahun (historis rata-rata reksa dana saham Indonesia)\nWaktu: 10 tahun\nFV = 10.000.000 × (1,12)^10 = Rp31.058.482\nUang Anda hampir 3x lipat dalam 10 tahun tanpa tambah modal!\n\nJika ditambah investasi rutin Rp1.000.000/bulan selama 10 tahun dengan return 12%/tahun:\nTotal modal yang disetorkan: Rp120.000.000\nNilai akhir portofolio: ±Rp230.000.000\nKeuntungan bersih: Rp110.000.000 — hampir sama dengan modal yang disetorkan!\n\n**Rule of 72 — Cara Cepat Menghitung Waktu Menggandakan Uang:**\nRumus: 72 ÷ tingkat return = jumlah tahun untuk uang berlipat ganda.\nReturn 6%/tahun → 72 ÷ 6 = 12 tahun berlipat ganda.\nReturn 12%/tahun → 72 ÷ 12 = 6 tahun berlipat ganda.\nReturn 18%/tahun → 72 ÷ 18 = 4 tahun berlipat ganda.\nReturn 24%/tahun → 72 ÷ 24 = 3 tahun berlipat ganda.\n\nArtinya, investor yang konsisten di reksa dana saham (return 12%/tahun) bisa menggandakan portofolionya setiap 6 tahun!\n\n**Kekuatan Dahsyat Compound Interest:**\nAlbert Einstein menyebut compound interest sebagai "keajaiban dunia ke-8." Mengapa? Karena bunga berbunga — Anda tidak hanya mendapat return dari modal awal, tapi juga return dari return sebelumnya.\n\nPerbandingan dramatis — Ardi vs Budi:\nArdi mulai investasi usia 25, investasi Rp1.000.000/bulan selama 10 tahun, berhenti usia 35. Total modal: Rp120 juta.\nBudi mulai usia 35, investasi Rp1.000.000/bulan selama 30 tahun hingga usia 65. Total modal: Rp360 juta.\nDi usia 65 dengan return 12%/tahun:\nArdi: ±Rp5,8 miliar (modal hanya Rp120 juta!)\nBudi: ±Rp3,5 miliar (modal Rp360 juta, tapi kalah dari Ardi!)\n\nPelajaran: mulai lebih awal jauh lebih powerful daripada investasi lebih banyak tapi terlambat mulai!\n\n**Inflasi — Musuh Diam-Diam Nilai Uang:**\nInflasi Indonesia rata-rata 3–5%/tahun. Artinya, daya beli uang Anda turun setiap tahun jika tidak diinvestasikan.\nRp1.000.000 hari ini = hanya Rp614.000 nilai belinya 10 tahun lagi (asumsi inflasi 5%/tahun).\nIni sebabnya menabung di tabungan biasa (return 1–2%) = rugi riil karena kalah dari inflasi!\n\nTarget minimum investasi: return harus mengalahkan inflasi. Minimal investasi di instrumen return 7–8%/tahun agar kekayaan benar-benar bertumbuh secara riil.\n\n**Aplikasi TVM dalam Perencanaan Keuangan:**\nDana Pensiun: berapa yang harus ditabung sekarang agar punya Rp5 miliar di usia 60?\nBiaya Pendidikan: berapa investasi bulanan untuk biaya kuliah anak 15 tahun lagi?\nBeli Rumah: lebih baik cicil sekarang atau investasi dulu baru beli cash?\nSemua pertanyaan ini bisa dijawab dengan konsep TVM!`,
      },
      {
        id: 'M1L5',
        title: 'Risiko dan Return',
        dur: '7 mnt',
        content: `Dalam dunia investasi, risiko dan return adalah dua sisi mata uang yang tidak bisa dipisahkan. Memahami hubungan keduanya adalah kunci untuk membuat keputusan investasi yang cerdas dan tidak emosional.\n\nDefinisi sederhana:\nReturn = imbal hasil yang Anda dapatkan dari investasi (dalam bentuk % atau nominal).\nRisiko = kemungkinan return aktual berbeda dari return yang diharapkan — bisa lebih rendah, bahkan negatif (rugi).\n\n**Jenis-Jenis Risiko Investasi:**\n\n1. RISIKO SISTEMATIS (Systematic Risk / Market Risk)\nRisiko yang mempengaruhi seluruh pasar — tidak bisa dihilangkan dengan diversifikasi.\nContoh: resesi ekonomi global (2008), pandemi COVID-19 (2020), kenaikan suku bunga agresif The Fed, perang (Rusia-Ukraina 2022).\nSaat COVID-19 melanda (Maret 2020), IHSG anjlok -38% dalam waktu 1 bulan — semua saham turun, tidak ada yang bisa kabur!\nCara menghadapi: investasi jangka panjang, dollar cost averaging, jangan panic selling.\n\n2. RISIKO TIDAK SISTEMATIS (Unsystematic Risk / Specific Risk)\nRisiko yang spesifik pada perusahaan atau sektor tertentu — BISA dikurangi dengan diversifikasi.\nContoh: CEO tertangkap korupsi (saham perusahaan tersebut anjlok). Produk ditarik dari pasar (recall). Persaingan bisnis memburuk. Bencana alam menghancurkan pabrik.\nContoh nyata: Kasus Jiwasraya (2019) — investor yang menaruh semua dana di satu produk investasi ini kehilangan segalanya.\nCara mengurangi: diversifikasi ke minimal 10–15 saham berbeda sektor.\n\n3. RISIKO LIKUIDITAS (Liquidity Risk)\nRisiko tidak bisa menjual aset dengan cepat pada harga yang wajar.\nContoh di saham: saham gorengan dengan volume tipis — Anda mau jual 10 lot tapi tidak ada pembeli, terpaksa jual jauh di bawah harga wajar.\nContoh di properti: butuh uang darurat, tapi rumah susah dijual karena sepi peminat.\nCara mengurangi: pilih saham liquid (masuk indeks LQ45/IDX30), jangan taruh semua di aset tidak likuid.\n\n4. RISIKO INFLASI (Inflation Risk / Purchasing Power Risk)\nRisiko return investasi lebih rendah dari tingkat inflasi — artinya kekayaan riil Anda menyusut meski nominal bertambah.\nContoh: deposito return 4%/tahun, inflasi 5%/tahun → return riil = -1%/tahun. Anda merasa untung, padahal rugi secara daya beli!\nCara mengatasi: investasi di instrumen yang historisnya mengalahkan inflasi (saham, properti, emas jangka panjang).\n\n5. RISIKO NILAI TUKAR (Currency Risk)\nRisiko perubahan kurs mata uang yang mempengaruhi nilai investasi.\nRelevan jika investasi di saham/obligasi luar negeri, atau perusahaan yang pendapatannya dalam USD.\nContoh: Rupiah melemah dari Rp14.000 ke Rp16.000/USD → perusahaan importir rugi, perusahaan eksportir untung.\n\n6. RISIKO KREDIT (Credit Risk)\nRisiko penerbit obligasi gagal membayar bunga atau pokok utang (default).\nLebih relevan untuk obligasi korporasi daripada obligasi pemerintah.\nCara mengurangi: cek rating obligasi dari Pefindo atau Fitch (minimal A-).\n\n**Profil Risiko Investor — Kenali Diri Anda:**\n\nKONSERVATIF: Tidak tahan melihat portofolio turun. Prioritas: keamanan modal. Cocok untuk: usia mendekati pensiun, atau dana untuk kebutuhan dalam 1–3 tahun. Alokasi: 80% deposito/obligasi, 20% saham.\n\nMODERAT: Bisa menerima fluktuasi sedang. Mencari keseimbangan antara pertumbuhan dan keamanan. Cocok untuk: usia 35–50 tahun, tujuan 3–7 tahun. Alokasi: 50% saham, 50% obligasi/reksa dana campuran.\n\nAGRESIF: Siap melihat portofolio turun 30–50% sementara. Prioritas: pertumbuhan maksimal jangka panjang. Cocok untuk: usia muda (20–35 tahun), tujuan 7+ tahun. Alokasi: 80–100% saham.\n\n**Cara Mengukur Risiko:**\nVolatilitas (Standar Deviasi) — semakin tinggi fluktuasi, semakin tinggi risiko.\nBeta — ukuran sensitivitas saham terhadap pergerakan pasar. Beta >1 = lebih volatile dari IHSG. Beta <1 = lebih stabil dari IHSG.\nMax Drawdown — penurunan maksimal dari puncak ke lembah. Cara mengukur seberapa parah kerugian terburuk yang pernah terjadi.\n\n**Risk-Adjusted Return — Return Sejati:**\nJangan hanya lihat return, tapi return per unit risiko yang diambil.\nSharpe Ratio = (Return portofolio - Return bebas risiko) ÷ Standar deviasi.\nSemakin tinggi Sharpe Ratio, semakin efisien portofolio Anda dalam menghasilkan return per unit risiko.`,
      },
      {
        id: 'M1L6',
        title: 'Regulasi dan Perlindungan Investor',
        dur: '8 mnt',
        content: `Investor di Indonesia dilindungi berbagai regulasi yang memastikan pasar modal berjalan adil.\n\n**OJK (Otoritas Jasa Keuangan):**\nMengatur dan mengawasi seluruh sektor jasa keuangan. Melindungi konsumen dari penipuan. Wajibkan transparansi (keterbukaan informasi).\n\n**Perlindungan Aset:**\nSaham Anda disimpan di KSEI — bukan di sekuritas. Jika sekuritas bangkrut, saham Anda tetap aman! Dana Perlindungan Pemodal (DPP): ganti kerugian jika efek hilang karena kejahatan sekuritas, maks Rp25 juta/investor.\n\n**Waspadai Investasi Bodong:**\nCiri-ciri: janji return pasti sangat tinggi (>30%/bulan), tidak terdaftar OJK, skema Ponzi.`,
      },
      {
        id: 'M1L7',
        title: 'Cara Kerja Bursa Efek Indonesia',
        dur: '10 mnt',
        content: `Memahami mekanisme perdagangan BEI adalah kunci bertransaksi secara efektif.\n\n**Jam Perdagangan:**\nSenin–Kamis: Sesi I 09:00–12:00, Sesi II 13:30–15:49. Jumat: Sesi I 09:00–11:30, Sesi II 14:00–15:49.\n\n**Papan Perdagangan:**\nUtama: perusahaan besar (aset bersih >Rp100M). Pengembangan: perusahaan menengah. Akselerasi: startup (sejak 2019).\n\n**Lot dan Fraksi Harga:**\n1 lot = 100 lembar. Fraksi: harga <Rp200 (Rp1), Rp200–500 (Rp2), Rp500–2.000 (Rp5), Rp2.000–5.000 (Rp10), >Rp5.000 (Rp25).\n\n**Auto Rejection:**\n<Rp200: ±35%, Rp200–5.000: ±25%, >Rp5.000: ±20%.`,
      },
      {
        id: 'M1L8',
        title: 'Indeks Saham dan Cara Membacanya',
        dur: '9 mnt',
        content: `Indeks saham adalah tolak ukur kinerja pasar — "rapor" kesehatan bursa secara keseluruhan.\n\n**IHSG:**\nMengukur kinerja seluruh saham di BEI. IHSG 7.200 vs awal tahun 6.500 = return YTD +10,8%.\n\n**Indeks Utama BEI:**\nLQ45: 45 saham paling likuid. IDX30: 30 saham terpilih. IDX80: 80 saham liquid. Sektoral: IDX Finance, IDX Consumer, IDX Energy, dll.\n\n**Indeks Global yang Mempengaruhi:**\nS&P 500 (AS), Dow Jones, Nasdaq, Nikkei (Jepang), Hang Seng (HK) — penurunan global biasanya diikuti BEI.`,
      },
      {
        id: 'M1L9',
        title: 'Cara Membuka Rekening Efek',
        dur: '7 mnt',
        content: `Untuk mulai berinvestasi saham, Anda perlu rekening efek di sekuritas yang diawasi OJK.\n\n**Dokumen yang Dibutuhkan:**\nKTP, NPWP (jika ada), buku rekening bank aktif, foto selfie dengan KTP.\n\n**Langkah Pembukaan:**\nPilih sekuritas → isi formulir online → upload dokumen → video call/e-KYC → tunggu SID dari KSEI → RDN aktif → mulai transaksi.\n\n**Sekuritas Populer:**\nBCA Sekuritas, Mandiri Sekuritas, Mirae Asset (biaya rendah), Ajaib (user-friendly), Stockbit (komunitas aktif).\n\n**Biaya:**\nBeli: 0,10–0,19%. Jual: 0,20–0,29% (termasuk PPh final 0,1%).`,
      },
      {
        id: 'M1L10',
        title: 'Psikologi Dasar Investor',
        dur: '9 mnt',
        content: `Aspek psikologi sering menjadi faktor terbesar yang membedakan investor sukses dan gagal.\n\n**Bias Kognitif Umum:**\nConfirmation Bias: cari informasi yang mendukung keyakinan, abaikan yang bertentangan. Loss Aversion: rasa sakit kehilangan Rp1 juta = 2× rasa senang dapat Rp1 juta. Anchoring: terpaku pada harga pertama yang dilihat. Herding: ikut-ikutan keputusan orang banyak.\n\n**Siklus Emosi Investor:**\nOptimisme → Euforia (puncak harga) → Panik → Capitulation (dasar harga) → Pesimisme → Harap → Optimisme lagi.\n\n**Solusi:**\nBuat aturan investasi tertulis. Hindari cek portofolio terlalu sering. Ikuti proses, bukan emosi. Jurnal setiap keputusan investasi.`,
      },
    ],
    quiz: [
      {
        q: 'Lembaga yang mengawasi seluruh sektor jasa keuangan Indonesia adalah?',
        opts: ['Bank Indonesia', 'OJK', 'BEI', 'KSEI'],
        ans: 1,
      },
      {
        q: 'Dana darurat idealnya berapa kali pengeluaran bulanan?',
        opts: ['1–2×', '3–6×', '7–10×', '12×'],
        ans: 1,
      },
      {
        q: 'Aturan 50-30-20: angka 20% dialokasikan untuk?',
        opts: [
          'Kebutuhan pokok',
          'Keinginan/hiburan',
          'Tabungan dan investasi',
          'Pembayaran utang',
        ],
        ans: 2,
      },
      {
        q: 'Rule of 72 dengan return 12%: uang berlipat ganda dalam berapa tahun?',
        opts: ['4 tahun', '6 tahun', '8 tahun', '10 tahun'],
        ans: 1,
      },
      {
        q: 'Saham Anda disimpan aman di lembaga mana?',
        opts: ['Perusahaan sekuritas', 'Bank pemerintah', 'KSEI', 'OJK'],
        ans: 2,
      },
      {
        q: '1 lot saham berisi berapa lembar?',
        opts: ['10', '50', '100', '1000'],
        ans: 2,
      },
      {
        q: 'Fraksi harga untuk saham Rp1.500 adalah?',
        opts: ['Rp1', 'Rp2', 'Rp5', 'Rp10'],
        ans: 2,
      },
      {
        q: 'Ciri investasi bodong yang paling umum adalah?',
        opts: [
          'Terdaftar OJK',
          'Return pasti >30%/bulan',
          'Memiliki prospektus',
          'Diperdagangkan di BEI',
        ],
        ans: 1,
      },
      {
        q: 'IPO singkatan dari?',
        opts: [
          'Indonesia Public Offering',
          'Initial Public Offering',
          'Initial Private Opportunity',
          'Indonesia Portfolio Option',
        ],
        ans: 1,
      },
      {
        q: 'Jam penutupan sesi II BEI Senin–Kamis adalah?',
        opts: ['15:00', '15:30', '15:49:59', '16:00'],
        ans: 2,
      },
      {
        q: 'Future Value Rp10 juta, 10 tahun, return 12%/tahun adalah sekitar?',
        opts: ['Rp15 juta', 'Rp21 juta', 'Rp31 juta', 'Rp45 juta'],
        ans: 2,
      },
      {
        q: 'Papan pencatatan untuk startup/UKM di BEI adalah?',
        opts: [
          'Papan Utama',
          'Papan Pengembangan',
          'Papan Akselerasi',
          'Papan Reguler',
        ],
        ans: 2,
      },
      {
        q: 'Risiko yang TIDAK bisa dihilangkan dengan diversifikasi disebut?',
        opts: [
          'Risiko spesifik',
          'Risiko likuiditas',
          'Risiko sistematis',
          'Risiko inflasi',
        ],
        ans: 2,
      },
      {
        q: 'Compound interest paling optimal jika?',
        opts: [
          'Investasi sekaligus di akhir',
          'Dimulai lebih awal dan konsisten',
          'Hanya di deposito',
          'Fokus satu instrumen',
        ],
        ans: 1,
      },
      {
        q: 'Biaya jual saham di sekuritas sudah termasuk pajak berapa?',
        opts: ['PPh 0,05%', 'PPh final 0,1%', 'PPh 0,5%', 'PPh 1%'],
        ans: 1,
      },
    ],
  },

  {
    id: 'M2',
    num: 2,
    icon: '🌱',
    color: '#22c55e',
    level: 'Pemula',
    title: 'Dasar-Dasar Investasi Saham',
    desc: 'Mekanisme transaksi, strategi beli/jual, dividen, dan membangun kebiasaan investasi.',
    lessons: [
      {
        id: 'M2L1',
        title: 'Apa Itu Saham dan Cara Kerjanya',
        dur: '8 mnt',
        content: `Saham adalah bukti kepemilikan atas suatu perusahaan. Beli saham = jadi pemilik sebagian perusahaan.\n\n**Hak Pemegang Saham:**\nDividen (bagi hasil laba), Hak Suara di RUPS, Capital Gain (keuntungan kenaikan harga), Sisa Aset saat likuidasi.\n\n**Saham Biasa vs Preferen:**\nBiasa: hak suara, dividen tidak tetap, paling umum diperdagangkan. Preferen: dividen tetap, prioritas likuidasi, biasanya tidak punya hak suara.\n\n**Contoh Nyata:**\nBBCA memiliki ~12,4 miliar lembar. Beli 1 lot (100 lembar) @ Rp9.500 = modal Rp950.000. Anda pemilik sah BCA — sekecil apapun porsinya!`,
      },
      {
        id: 'M2L2',
        title: 'Keuntungan dan Risiko Investasi Saham',
        dur: '9 mnt',
        content: `Memahami jujur keuntungan DAN risiko saham adalah langkah pertama investor bijak.\n\n**Keuntungan:**\nReturn tertinggi jangka panjang (10–15%/tahun historis). IHSG 2009 (550) → 2024 (7.200) = +1.200% dalam 15 tahun! Dividen: passive income 3–6%/tahun. Likuiditas tinggi. Modal mulai Rp100.000.\n\n**Risiko:**\nCapital loss (bisa -100% jika bangkrut). Volatilitas tinggi. Risiko psikologis (panic selling). Risiko informasi (manajemen tidak transparan).\n\n**Kesimpulan:**\nSaham cocok untuk tujuan jangka panjang (5–10+ tahun) dengan pemahaman fluktuasi jangka pendek adalah hal normal.`,
      },
      {
        id: 'M2L3',
        title: 'Memilih Saham Pertama Anda',
        dur: '11 mnt',
        content: `Memilih saham pertama dengan tepat membangun kepercayaan diri dan kebiasaan investasi yang benar.\n\n**Kriteria untuk Pemula:**\nPerusahaan yang Anda kenal (BCA, Unilever, Telkom). Blue chip LQ45/IDX30. Fundamental solid (ROE >10%). Valuasi wajar. Likuiditas tinggi (volume >Rp5M/hari).\n\n**Saham Populer Pemula (untuk studi):**\nBBCA: perbankan terbaik, ROE konsisten. BBRI: bank terbesar, dividen menarik. TLKM: monopoli telekomunikasi. UNVR: consumer goods defensif.\n\n**Peter Lynch — "Invest in What You Know":**\nIbu rumah tangga yang tahu produk terlaris supermarket mungkin lebih dulu tahu perusahaan yang akan tumbuh daripada analis Wall Street.\n\n**Jangan Lakukan:**\nJangan beli dari grup WA/rekomendasi anonim. Jangan all-in satu saham. Jangan beli hanya karena "sudah naik banyak."`,
      },
      {
        id: 'M2L4',
        title: 'Strategi Buy and Hold',
        dur: '8 mnt',
        content: `Buy and Hold adalah strategi paling sederhana dan terbukti paling efektif untuk kebanyakan investor individu.\n\n**Mengapa Efektif:**\nMinimalisasi biaya transaksi. Menghindari kesalahan timing market. Compounding bekerja maksimal. Data: melewatkan 10 hari terbaik pasar dalam 20 tahun bisa memangkas return 50%!\n\n**Contoh Nyata:**\nBeli BBCA 2014 @ Rp3.500 → 2024 @ Rp9.500 = capital gain +171% + dividen ~2–3%/tahun = total return ~220–230% atau ~12–13%/tahun.\n\n**Kapan Harus Jual:**\nFundamental berubah buruk permanen. Ada alternatif jauh lebih baik. Target price tercapai dan valuasi sangat mahal. Kebutuhan dana mendesak.`,
      },
      {
        id: 'M2L5',
        title: 'Dollar Cost Averaging (DCA)',
        dur: '9 mnt',
        content: `DCA adalah investasi rutin dengan jumlah tetap secara berkala, tanpa peduli kondisi pasar.\n\n**Cara Kerja:**\nBulan 1 (harga Rp9.000): beli 111 lembar. Bulan 2 (harga Rp8.000): beli 125 lembar. Bulan 3 (Rp9.500): beli 105 lembar. Total 341 lembar, harga rata-rata Rp8.798 — lebih murah dari rata-rata harga pasar Rp8.833!\n\n**Keunggulan:**\nHilangkan tekanan timing. Otomatis beli lebih banyak saat murah. Disiplin dan konsisten.\n\n**Simulasi Power DCA:**\nRp500.000/bulan, return 12%/tahun, selama 20 tahun → total investasi Rp120 juta → total aset ±Rp494 juta = +312%!`,
      },
      {
        id: 'M2L6',
        title: 'Diversifikasi Portofolio',
        dur: '10 mnt',
        content: `"Don't put all your eggs in one basket" — prinsip terbukti melindungi investor dari kerugian catastrophic.\n\n**Diversifikasi Saham:**\nPer saham: maks 20–25% per saham. Per sektor: jangan konsentrasi satu sektor. Per ukuran: campuran large cap dan mid/small cap.\n\n**Diversifikasi Kelas Aset:**\nAktif (agresif): 80–90% saham + 10–20% obligasi. Moderat: 60% saham + 30% obligasi + 10% kas. Konservatif: 30% saham + 50% obligasi + 20% kas.\n\n**Hindari Over-Diversifikasi:**\nLebih dari 50 saham = sulit monitor + return mendekati indeks + lebih baik beli ETF saja.`,
      },
      {
        id: 'M2L7',
        title: 'Manajemen Risiko Dasar',
        dur: '9 mnt',
        content: `Investor sukses bukan yang tidak pernah rugi, tapi yang bisa membatasi kerugian dan tetap eksis.\n\n**7 Prinsip Manajemen Risiko:**\n1. Hanya investasikan uang yang tidak dibutuhkan 5 tahun ke depan.\n2. Bangun dana darurat dulu.\n3. Posisi sizing: maks 10% per saham untuk pemula.\n4. Stop loss: tentukan batas rugi sebelum beli (-10% sampai -15%).\n5. Jangan gunakan utang/margin.\n6. Review dan rebalancing per kuartal.\n7. Catat jurnal setiap keputusan investasi.`,
      },
      {
        id: 'M2L8',
        title: 'Dividen — Passive Income dari Saham',
        dur: '9 mnt',
        content: `Dividen adalah bagian laba perusahaan yang dibagikan kepada pemegang saham — penghasilan pasif nyata tanpa jual saham.\n\n**Cara Kerja:**\nCum Date → batas terakhir beli untuk berhak dividen. Ex-Date → hari berikutnya, tidak berhak dividen. Payment Date → dividen masuk RDN Anda.\n\n**Dividend Yield = Dividen per Saham ÷ Harga Saham × 100%**\nContoh: BBRI harga Rp5.000, dividen Rp300 → yield 6%.\n\n**Pajak Dividen:**\nPPh Final 10% untuk WNI — dipotong otomatis.\n\n**Saham Dividen Konsisten IDX:**\nBBRI: yield 4–6%. TLKM: yield 4–6%. PTBA: yield tinggi. UNVR: payout ratio hampir 100%.`,
      },
      {
        id: 'M2L9',
        title: 'Membaca Chart Saham Dasar',
        dur: '10 mnt',
        content: `Membaca grafik harga saham adalah skill dasar untuk melihat konteks pergerakan harga.\n\n**Jenis Chart:**\nLine Chart: hanya harga penutupan, untuk tren jangka panjang. Bar Chart (OHLC): Open, High, Low, Close. Candlestick: paling populer, body + shadow atas/bawah.\n\n**Membaca Candlestick:**\nHijau/putih: Close > Open (bullish). Merah/hitam: Close < Open (bearish). Shadow atas: harga tertinggi. Shadow bawah: harga terendah.\n\n**Cara Membaca Tren:**\nUptrend: serangkaian higher high dan higher low. Downtrend: serangkaian lower high dan lower low. Sideways: bergerak dalam range horizontal.\n\n**Volume:**\nSelalu konfirmasi dengan volume. Breakout naik + volume besar = lebih valid.`,
      },
      {
        id: 'M2L10',
        title: 'Membangun Kebiasaan Investasi',
        dur: '8 mnt',
        content: `Investasi bukan tentang satu keputusan besar — tapi kebiasaan kecil yang konsisten bertahun-tahun.\n\n**6 Kebiasaan Investor Sukses:**\n1. Pay Yourself First: transfer ke RDN sebelum belanja apapun.\n2. Belajar Rutin 30 menit/hari.\n3. Monitor tanpa obsesi: cek portofolio 1×/minggu, bukan 10×/hari.\n4. Review berkala: kuartal dan tahunan.\n5. Jurnal investasi: catat semua keputusan.\n6. Network positif: bergabung komunitas investasi sehat.\n\n**Kalimat Pengingat:**\n"Waktu terbaik untuk mulai investasi adalah 20 tahun lalu. Waktu terbaik kedua adalah hari ini."`,
      },
    ],
    quiz: [
      {
        q: 'Hak pemegang saham yang bukan termasuk di bawah ini?',
        opts: [
          'Dividen',
          'Hak suara RUPS',
          'Jaminan tidak rugi',
          'Capital gain',
        ],
        ans: 2,
      },
      {
        q: '1 lot saham BBCA @ Rp9.500, modal yang dikeluarkan adalah?',
        opts: ['Rp95.000', 'Rp950.000', 'Rp9.500.000', 'Rp950'],
        ans: 1,
      },
      {
        q: 'Strategi DCA otomatis membeli lebih banyak saat?',
        opts: [
          'Harga tinggi',
          'Harga rendah',
          'Volume rendah',
          'Pasar bullish',
        ],
        ans: 1,
      },
      {
        q: 'Diversifikasi per saham yang direkomendasikan maksimal?',
        opts: ['10%', '20–25%', '50%', '75%'],
        ans: 1,
      },
      {
        q: 'Pajak dividen untuk WNI adalah?',
        opts: ['5% final', '10% final', '15% final', 'Bebas pajak'],
        ans: 1,
      },
      {
        q: 'Cum Date adalah?',
        opts: [
          'Tanggal pembayaran dividen',
          'Tanggal terakhir beli untuk berhak dividen',
          'Tanggal pengumuman dividen',
          'Tanggal RUPS',
        ],
        ans: 1,
      },
      {
        q: 'Strategi buy and hold paling efektif untuk horizon?',
        opts: ['1–3 bulan', '6 bulan', '1–3 tahun', '5–10+ tahun'],
        ans: 3,
      },
      {
        q: 'Simulasi DCA Rp500K/bulan, return 12%/tahun selama 20 tahun menghasilkan sekitar?',
        opts: ['Rp150 juta', 'Rp250 juta', 'Rp494 juta', 'Rp800 juta'],
        ans: 2,
      },
      {
        q: 'Candlestick merah/hitam berarti?',
        opts: [
          'Close > Open (bullish)',
          'Close < Open (bearish)',
          'Volume sangat tinggi',
          'Support kuat',
        ],
        ans: 1,
      },
      {
        q: 'Data: melewatkan 10 hari terbaik pasar dalam 20 tahun bisa memangkas return hingga?',
        opts: ['10%', '25%', '50%', '75%'],
        ans: 2,
      },
      {
        q: 'Stop loss dasar untuk pemula umumnya berapa persen dari harga beli?',
        opts: ['2–3%', '5–7%', '10–15%', '25–30%'],
        ans: 2,
      },
      {
        q: 'Over-diversifikasi (50+ saham) membuat return mendekati?',
        opts: ['Deposito', 'Obligasi', 'Indeks pasar', '0%'],
        ans: 2,
      },
      {
        q: "Prinsip 'Invest in What You Know' dikemukakan oleh?",
        opts: [
          'Warren Buffett',
          'Benjamin Graham',
          'Peter Lynch',
          'Charlie Munger',
        ],
        ans: 2,
      },
      {
        q: 'IHSG dari 550 (2009) ke 7.200 (2024) adalah kenaikan berapa persen?',
        opts: ['600%', '900%', '1.200%', '1.500%'],
        ans: 2,
      },
      {
        q: 'Kebiasaan investor yang TIDAK disarankan adalah?',
        opts: [
          'Pay yourself first',
          'Cek portofolio 10× sehari',
          'Belajar 30 menit/hari',
          'Jurnal keputusan investasi',
        ],
        ans: 1,
      },
    ],
  },

  {
    id: 'M3',
    num: 3,
    icon: '📊',
    color: '#10b981',
    level: 'Menengah',
    title: 'Analisis Laporan Keuangan',
    desc: 'Membaca neraca, laba rugi, arus kas, dan rasio keuangan untuk menilai kesehatan perusahaan.',
    lessons: [
      {
        id: 'M3L1',
        title: 'Struktur Laporan Keuangan',
        dur: '12 mnt',
        content: `Laporan keuangan adalah "bahasa bisnis" yang wajib dipahami setiap investor saham.\n\n**4 Komponen Utama:**\n1. Laporan Laba Rugi (Income Statement): kinerja selama periode tertentu. Revenue → Laba Kotor → EBIT → Laba Bersih.\n2. Neraca (Balance Sheet): foto kondisi keuangan. ASET = LIABILITAS + EKUITAS (selalu seimbang!).\n3. Laporan Arus Kas: Operating CF (paling penting!), Investing CF, Financing CF.\n4. Catatan Atas Laporan Keuangan (CALK): detail dan informasi tersembunyi.\n\n**Prinsip Accrual vs Cash:**\nAkrual: pendapatan diakui saat transaksi, bukan saat uang diterima. Arus kas lebih sulit dimanipulasi dari laba bersih.`,
      },
      {
        id: 'M3L2',
        title: 'Analisis Laporan Laba Rugi',
        dur: '11 mnt',
        content: `Laporan laba rugi menceritakan seberapa baik perusahaan menghasilkan keuntungan.\n\n**Yang Harus Dicermati:**\nPertumbuhan Revenue YoY: target >10% untuk growth stock. Gross Margin = Laba Kotor ÷ Revenue × 100%: moat kuat jika stabil/naik. EBITDA Margin: lebih akurat mengukur profitabilitas operasional. Net Profit Margin = Laba Bersih ÷ Revenue × 100%: bervariasi per industri (retail 3–5%, bank 15–25%). EPS Growth: harga saham jangka panjang cenderung ikuti pertumbuhan EPS.\n\n**Red Flags:**\nRevenue naik tapi OCF turun. Laba bersih naik dari "other income" bukan operasi inti. Gross margin turun terus — daya saing melemah.`,
      },
      {
        id: 'M3L3',
        title: 'Analisis Neraca Keuangan',
        dur: '13 mnt',
        content: `Neraca adalah "foto" kekuatan finansial perusahaan.\n\n**Rasio Likuiditas:**\nCurrent Ratio = Aset Lancar ÷ Liabilitas Lancar: >1,5 sehat, >2 sangat sehat, <1 bahaya. Quick Ratio = (Aset Lancar − Persediaan) ÷ Liabilitas Lancar: >1 aman.\n\n**Rasio Solvabilitas:**\nDER (Debt to Equity) = Total Utang ÷ Ekuitas: <0,5 konservatif, 0,5–1,5 normal, >2 berisiko (kecuali bank). Debt to EBITDA: <3× aman, >5× berbahaya.\n\n**Ekuitas:**\nROE = Laba Bersih ÷ Ekuitas × 100%: target >15%. Net cash (kas > utang) = perusahaan paling aman saat krisis.`,
      },
      {
        id: 'M3L4',
        title: 'Analisis Arus Kas',
        dur: '11 mnt',
        content: `Arus kas adalah yang paling susah dimanipulasi — itulah mengapa profesional sangat fokus di sini.\n\n**Free Cash Flow (FCF) — Metrik Terpenting:**\nFCF = Operating Cash Flow − CAPEX. FCF positif = perusahaan hasilkan uang nyata setelah investasi untuk pertahankan bisnis.\n\n**Sinyal Kualitas:**\nIdealnya OCF ≥ Laba Bersih. OCF jauh di bawah laba bersih = waspadai manipulasi. OCF negatif tapi laba positif = lampu merah!\n\n**CAPEX Ratio = CAPEX ÷ OCF:**\n<0,5: kas tersisa banyak. >1: CAPEX melebihi kas operasi — butuh utang.\n\n**Cash Conversion Cycle (CCC):**\nCCC = DSO + DIO − DPO. Makin negatif makin baik.`,
      },
      {
        id: 'M3L5',
        title: 'Rasio Keuangan Komprehensif',
        dur: '14 mnt',
        content: `Rasio keuangan memudahkan perbandingan antar perusahaan dan antar waktu.\n\n**Valuasi:**\nP/E = Harga ÷ EPS. EV/EBITDA = (Market Cap + Utang Bersih) ÷ EBITDA (<8× murah, >15× mahal). P/BV = Harga ÷ Nilai Buku per Saham (P/BV <1: di bawah nilai aset bersih).\n\n**Profitabilitas:**\nROE >15%, ROA >8%, ROIC > WACC = value creation.\n\n**Efisiensi:**\nAsset Turnover = Revenue ÷ Total Aset. Inventory Turnover = COGS ÷ Persediaan.\n\n**Dividen:**\nDividend Yield = Dividen per Saham ÷ Harga × 100%. Payout Ratio = Dividen ÷ Laba Bersih (50–70% sehat, >100% tidak berkelanjutan).`,
      },
      {
        id: 'M3L6',
        title: 'Membaca Annual Report',
        dur: '10 mnt',
        content: `Annual Report (Laporan Tahunan) adalah dokumen wajib dibaca sebelum berinvestasi.\n\n**Bagian Kunci:**\n1. Surat dari Direktur Utama: apakah jujur akui tantangan?\n2. MD&A (Management Discussion & Analysis): manajemen jelaskan kinerja, tantangan, strategi.\n3. Tata Kelola (GCG): independensi komisaris, insider ownership >5% = alignment.\n4. Laporan Keuangan Teraudit: oleh KAP Big 4 lebih terpercaya.\n5. CALK: detail aset, utang jatuh tempo, perkara hukum.\n\n**Sumber:**\nidx.co.id → Perusahaan Tercatat → Laporan Keuangan. Stockbit (lebih mudah diakses).`,
      },
      {
        id: 'M3L7',
        title: 'Analisis Tren Multi-Tahun',
        dur: '11 mnt',
        content: `Satu tahun data tidak bercerita banyak. Tren 5–10 tahun mengungkap karakter sesungguhnya.\n\n**Buat Tabel 5–10 Tahun untuk:**\nRevenue (CAGR), Gross & Net Margin, EPS, ROE & ROA, DER, Operating CF, FCF, Dividen per saham.\n\n**Cari Pola:**\nPertumbuhan revenue konsisten atau bergelombang? Margin stabil atau tergerus? ROE konsisten >15%?\n\n**Contoh BBCA (5 tahun):**\nRevenue CAGR 8%, Net Margin 30–35%, ROE 17–19%, EPS growth 10–12%/tahun = fundamental kuat.\n\n**Red Flags Tren:**\nRevenue turun 2 tahun berturut-turut. ROE trend turun 3 tahun. Utang tumbuh jauh lebih cepat dari laba. FCF negatif konsisten.`,
      },
      {
        id: 'M3L8',
        title: 'Analisis Laporan Keuangan Bank',
        dur: '12 mnt',
        content: `Bank memiliki struktur laporan keuangan sangat berbeda — perlu pendekatan analisis khusus.\n\n**Metrik Kunci Bank:**\nNIM (Net Interest Margin): target >5% = sangat baik. NPL (Non-Performing Loan): target <3% sehat, >5% bahaya. BOPO: biaya/pendapatan operasional, target <75% = efisien. LDR: kredit/DPK, target 78–92%. CAR: kecukupan modal, minimum 8%.\n\n**Big 4 Bank IDX:**\nBBCA: ROE 18%, BOPO 55%, NPL <1,5% = kualitas terbaik. BBRI: penetrasi UMKM terbesar. BMRI: transformasi digital. BBNI: fokus korporasi.`,
      },
      {
        id: 'M3L9',
        title: 'Red Flags Laporan Keuangan',
        dur: '10 mnt',
        content: `Mengenali red flags lebih penting dari mengenali peluang — satu investasi buruk bisa hapus keuntungan banyak investasi baik.\n\n**Red Flags Keuangan:**\nPiutang tumbuh jauh lebih cepat dari revenue (manipulasi pengakuan pendapatan?). OCF negatif tapi laba positif terus. Goodwill sangat besar relatif total aset. Perubahan kebijakan akuntansi yang "kebetulan" menguntungkan.\n\n**Red Flags Manajemen:**\nAuditor sering berganti. Transaksi benturan kepentingan. Kompensasi manajemen berlebihan. Gagal deliver guidance berkali-kali.\n\n**Checklist:**\nAda >3 red flag → hindari. Satu red flag saja terkadang sudah cukup untuk avoid.`,
      },
      {
        id: 'M3L10',
        title: 'Studi Kasus: Membedah Laporan Keuangan',
        dur: '15 mnt',
        content: `Terapkan semua konsep pada analisis nyata perusahaan BEI.\n\n**Studi Kasus BBCA:**\nNIM 5,5%, BOPO 55%, NPL <1,5%, ROE 18%, P/BV 4–5× = premium justified karena franchise value superior.\n\n**Studi Kasus UNVR:**\nGross margin ~50%, ROE 80–100% (tinggi karena payout hampir 100%), FCF positif konsisten. Bisnis solid tapi pertumbuhan lambat.\n\n**Studi Kasus Red Flag (Fiktif "XYZ Tbk"):**\nRevenue +30% tapi OCF turun 20%. Laba naik dari penjualan aset. DER melonjak 0,8× → 2,5×. Piutang tumbuh 3× lebih cepat dari revenue. Qualified opinion dari auditor. Kesimpulan: HINDARI.\n\n**Framework Cepat (5 Menit):**\n□ ROE >15% min 3 tahun? □ Revenue tumbuh? □ DER wajar? □ OCF > laba bersih? □ Tidak ada red flag CALK?`,
      },
    ],
    quiz: [
      {
        q: 'Rumus fundamental neraca adalah?',
        opts: [
          'Aset = Pendapatan − Biaya',
          'Aset = Liabilitas + Ekuitas',
          'Ekuitas = Aset − Pendapatan',
          'Aset = Modal + Laba',
        ],
        ans: 1,
      },
      {
        q: 'Laporan keuangan paling susah dimanipulasi adalah?',
        opts: [
          'Neraca',
          'Laporan laba rugi',
          'Laporan arus kas',
          'Catatan CALK',
        ],
        ans: 2,
      },
      {
        q: 'Free Cash Flow dihitung sebagai?',
        opts: [
          'Laba bersih − Dividen',
          'OCF − CAPEX',
          'Revenue − Total Biaya',
          'EBITDA − Bunga − Pajak',
        ],
        ans: 1,
      },
      {
        q: 'Current Ratio yang dianggap aman adalah?',
        opts: ['<1', '1–1,4', '>1,5', 'Tepat 1'],
        ans: 2,
      },
      {
        q: 'ROE mengukur?',
        opts: [
          'Efisiensi penggunaan aset total',
          'Return atas modal pemilik',
          'Kemampuan bayar utang',
          'Margin keuntungan kotor',
        ],
        ans: 1,
      },
      {
        q: 'NIM >5% pada bank Indonesia berarti?',
        opts: [
          'NPL tinggi',
          'Efisiensi sangat baik',
          'Net Interest Margin sangat baik',
          'Modal berlebihan',
        ],
        ans: 2,
      },
      {
        q: 'BOPO <75% pada bank berarti?',
        opts: [
          'NPL rendah',
          'Sangat efisien operasional',
          'Modal besar',
          'Kredit tumbuh pesat',
        ],
        ans: 1,
      },
      {
        q: 'P/BV <1 berarti?',
        opts: [
          'Saham terlalu mahal',
          'Harga di bawah nilai aset bersih',
          'Perusahaan bangkrut',
          'ROE sangat tinggi',
        ],
        ans: 1,
      },
      {
        q: 'Payout ratio >100% berarti?',
        opts: [
          'Perusahaan sangat profitable',
          'Dividen tidak berkelanjutan',
          'Investor mendapat banyak untung',
          'ROE tinggi',
        ],
        ans: 1,
      },
      {
        q: 'EV/EBITDA <8× umumnya berarti?',
        opts: [
          'Perusahaan mahal',
          'Relatif murah untuk kebanyakan sektor',
          'Utang terlalu besar',
          'Margin rendah',
        ],
        ans: 1,
      },
      {
        q: 'Red flag: OCF negatif tapi laba positif mengindikasikan?',
        opts: [
          'Ekspansi agresif',
          'Kemungkinan manipulasi akuntansi',
          'ROE sangat baik',
          'CAPEX tinggi',
        ],
        ans: 1,
      },
      {
        q: 'CAR (Capital Adequacy Ratio) minimum untuk bank Indonesia adalah?',
        opts: ['4%', '8%', '12%', '20%'],
        ans: 1,
      },
      {
        q: 'Analisis tren multi-tahun minimal berapa tahun?',
        opts: ['1 tahun', '2 tahun', '3 tahun', '5–10 tahun'],
        ans: 3,
      },
      {
        q: 'Piutang tumbuh 3× lebih cepat dari revenue mengindikasikan?',
        opts: [
          'Bisnis tumbuh pesat',
          'Potensi manipulasi pengakuan pendapatan',
          'Moat yang kuat',
          'Manajemen excellent',
        ],
        ans: 1,
      },
      {
        q: 'MD&A dalam annual report kepanjangan dari?',
        opts: [
          'Market Data Analysis',
          'Management Discussion and Analysis',
          'Monetary Debt Assessment',
          'Market Development Agenda',
        ],
        ans: 1,
      },
    ],
  },

  {
    id: 'M4',
    num: 4,
    icon: '🔮',
    color: '#8b5cf6',
    level: 'Menengah',
    title: 'Analisis Fundamental & Valuasi Buffett',
    desc: 'Menilai nilai intrinsik saham, economic moat, margin of safety, dan prinsip Warren Buffett.',
    lessons: [
      {
        id: 'M4L1',
        title: 'Framework Analisis Fundamental',
        dur: '10 mnt',
        content: `Analisis fundamental mencari nilai SESUNGGUHNYA bisnis vs harga pasar.\n\n**Top-Down vs Bottom-Up:**\nTop-Down: Ekonomi Global → Indonesia → Sektor → Saham. Cocok untuk yang percaya siklus ekonomi penting.\nBottom-Up (Buffett style): Cari perusahaan fundamental luar biasa → analisis mendalam → beli jika valuasi menarik. Tidak terlalu peduli makro jangka pendek.\n\n**5 Level Analisis:**\n1. Analisis Industri — pasar tumbuh atau menyusut?\n2. Posisi Kompetitif — vs pesaing?\n3. Kualitas Bisnis — model bisnis, moat, manajemen.\n4. Keuangan — laporan keuangan, rasio, tren.\n5. Valuasi — harga saat ini menarik?`,
      },
      {
        id: 'M4L2',
        title: 'Filosofi Investasi Warren Buffett',
        dur: '10 mnt',
        content: `Warren Buffett membangun kekayaan >$100 miliar hampir seluruhnya melalui investasi saham selama 60+ tahun.\n\n**Filosofi Inti:**\n"Harga adalah apa yang Anda bayar. Nilai adalah apa yang Anda dapatkan." "Rule #1: Never lose money. Rule #2: Never forget Rule #1." "Favorite holding period is forever."\n\n**4 Kriteria Utama Buffett:**\n1. Bisnis yang bisa dipahami (Circle of Competence).\n2. Prospek jangka panjang yang menguntungkan (Economic Moat).\n3. Manajemen yang jujur dan kompeten.\n4. Harga yang menarik (Margin of Safety).\n\n**Evolusi Buffett:**\nFase 1 (Graham): beli saham sangat murah secara kuantitatif. Fase 2 (Munger): "lebih baik beli bisnis luar biasa di harga wajar, dari bisnis biasa di harga murah."`,
      },
      {
        id: 'M4L3',
        title: 'Economic Moat — Keunggulan Kompetitif',
        dur: '12 mnt',
        content: `Economic Moat adalah keunggulan kompetitif berkelanjutan yang melindungi perusahaan dari serangan pesaing.\n\n**5 Jenis Economic Moat:**\n1. Intangible Assets: brand kuat, paten. Contoh: UNVR (Rinso, Pepsodent).\n2. Cost Advantage: produksi lebih murah. Contoh: ADRO (lokasi tambang).\n3. Network Effect: semakin banyak pengguna → semakin bernilai. Contoh: GoTo, BBCA.\n4. Switching Costs: pelanggan enggan pindah. Contoh: core banking, ERP.\n5. Efficient Scale: pasar terbatas, tidak ekonomis dimasuki pesaing. Contoh: JSMR (tol).\n\n**Identifikasi Moat dengan Angka:**\nROE konsisten >15% selama 10 tahun. ROIC > WACC secara konsisten. Gross margin stabil meski persaingan meningkat.`,
      },
      {
        id: 'M4L4',
        title: 'Circle of Competence',
        dur: '9 mnt',
        content: `"Investasi dalam Circle of Competence Anda — dan perluas secara perlahan."\n\n**Apa Itu Circle of Competence:**\nArea bisnis yang benar-benar Anda mengerti mendalam — bagaimana menghasilkan uang, apa yang membuat berhasil/gagal, faktor kompetisi, prospek masa depan.\n\n**Identifikasi Circle Anda:**\nIndustri tempat Anda bekerja. Produk yang Anda gunakan sehari-hari. Sektor yang sudah Anda pelajari bertahun-tahun.\n\n**Contoh:**\nDokter → lebih paham farmasi dan healthcare. Banker → lebih paham perbankan. Engineer → lebih paham teknologi dan manufaktur.\n\n**Test Sederhana:**\nBisakah Anda jelaskan bisnis perusahaan ini kepada anak 10 tahun? Jika tidak → mungkin di luar circle Anda.`,
      },
      {
        id: 'M4L5',
        title: 'Intrinsic Value & Margin of Safety',
        dur: '14 mnt',
        content: `Nilai intrinsik adalah nilai "sesungguhnya" bisnis — berapa uang yang akan dihasilkannya seumur hidupnya, didiskontokan ke nilai sekarang.\n\n**Metode Sederhana Buffett:**\n1. Hitung EPS saat ini.\n2. Proyeksikan pertumbuhan EPS 10 tahun.\n3. Proyeksikan P/E terminal.\n4. Hitung present value dengan discount rate 10–12%.\n\n**Contoh:**\nEPS Rp500, growth 12%/tahun 10 tahun → EPS tahun ke-10 = Rp1.552. P/E terminal 15× → harga proyeksi Rp23.280. PV (diskon 10%) = Rp8.978. Total Intrinsic Value ≈ Rp10.178.\n\n**Margin of Safety:**\nMoS = (Intrinsic Value − Harga Pasar) ÷ Intrinsic Value × 100%. Buffett minimal 30–40% MoS. Jika intrinsic value Rp10.000 dan harga Rp7.000 → MoS 30% = aman beli!`,
      },
      {
        id: 'M4L6',
        title: "Porter's Five Forces",
        dur: '11 mnt',
        content: `Framework Michael Porter untuk menilai kemenarikan dan daya saing industri.\n\n**5 Forces:**\n1. Ancaman Pendatang Baru: barrier tinggi (regulasi, modal, brand) → proteksi margin.\n2. Kekuatan Tawar Pemasok: pemasok sedikit/langka → bisa paksa harga tinggi.\n3. Kekuatan Tawar Pembeli: pembeli sedikit dan besar → bisa tekan harga.\n4. Ancaman Produk Substitusi: substitut mudah → pricing power rendah.\n5. Rivalitas Kompetitor: persaingan intense → margin tertekan.\n\n**Industri Terbaik untuk Investor:**\nSemua 5 forces lemah → industri sangat profitable. Contoh IDX: perbankan besar (barrier ketat, oligopoli, switching cost tinggi).`,
      },
      {
        id: 'M4L7',
        title: 'Valuasi DCF (Discounted Cash Flow)',
        dur: '14 mnt',
        content: `DCF adalah metode valuasi paling komprehensif — nilai bisnis = present value semua FCF masa depan.\n\n**Langkah DCF:**\n1. Hitung FCF historis (OCF − CAPEX).\n2. Proyeksikan FCF 5–10 tahun berdasarkan growth historis.\n3. Terminal Value = FCFn × (1+g) ÷ (r−g), g = 3–4%, r = WACC.\n4. Hitung PV semua FCF + Terminal Value.\n5. Kurangi Net Debt, bagi jumlah saham = Intrinsic Value per share.\n\n**Sensitivitas Analisis:**\nBuat skenario: konservatif (growth 10%), base (growth 15%), optimis (growth 20%). Zona aman: sebagian besar skenario memberikan nilai di atas harga saat ini.\n\n**Batasan DCF:**\nSangat sensitif terhadap asumsi. "Garbage in, garbage out." Lebih cocok untuk perusahaan dengan FCF predictable.`,
      },
      {
        id: 'M4L8',
        title: 'Relative Valuation dan Peer Comparison',
        dur: '11 mnt',
        content: `Relative valuation membandingkan perusahaan dengan peers dan rata-rata historisnya.\n\n**Multiple per Sektor IDX:**\nPerbankan: P/BV (BBCA ~4–5×, justified ROE 18%). Consumer: EV/EBITDA 10–15×. Properti: EV/EBITDA 8–12×. Energi: EV/EBITDA 5–8×.\n\n**Proses Peer Comparison:**\n1. Kumpulkan peers truly comparable.\n2. Hitung masing-masing multiple.\n3. Posisikan vs rata-rata peers.\n4. Analisis mengapa premium/discount wajar.\n\n**Gordon Growth Model (dividen):**\nNilai = Dividen per Saham ÷ (Discount Rate − Growth Rate Dividen). Berguna untuk UNVR, TLKM.`,
      },
      {
        id: 'M4L9',
        title: 'Kualitas Manajemen ala Buffett',
        dur: '10 mnt',
        content: `"Invest in a business so good that an idiot could run it, because eventually one will." — Tapi lebih baik jika manajemennya juga luar biasa.\n\n**4 Ciri Manajemen Berkualitas:**\n1. Rasional dalam alokasi modal: buyback saat saham murah, akuisisi dengan harga masuk akal.\n2. Jujur dan transparan: akui kesalahan di annual report.\n3. Orientasi pemegang saham: insider ownership tinggi >5%.\n4. Melawan institutional imperative: tidak ikut-ikutan tren sesaat.\n\n**Cara Riset Manajemen:**\nBaca 5 tahun annual report. Cek insider ownership. Bandingkan guidance vs aktual. Ikuti earnings call.`,
      },
      {
        id: 'M4L10',
        title: 'Menerapkan Prinsip Buffett di BEI',
        dur: '12 mnt',
        content: `Prinsip Buffett bisa diterapkan di pasar saham Indonesia dengan penyesuaian konteks lokal.\n\n**Screening ala Buffett IDX:**\nStep 1: ROE >15% min 5 tahun, DER <2, Revenue >8%/tahun, FCF positif 3 tahun.\nStep 2: Cek moat (brand, switching cost, network effect).\nStep 3: Analisis manajemen (track record, insider ownership).\nStep 4: Valuasi (MoS minimal 25–30%).\n\n**Kandidat Buffett di BEI (studi sendiri dulu):**\nBBCA: wide moat (CASA ratio, network), ROE 18%, manajemen excellent. SIDO: ROE >30%, net cash, brand herbal kuat. ICBP: consumer brand luas, distribusi nasional.\n\n**Perbedaan Indonesia vs AS:**\nGovernance perlu lebih diwaspadai. Keluarga pendiri sering control → bisa blessing or curse. Banyak saham mid-small cap less efficient → lebih banyak peluang alpha.`,
      },
    ],
    quiz: [
      {
        q: "'Harga adalah apa yang Anda bayar, nilai adalah apa yang Anda dapatkan' adalah filosofi?",
        opts: [
          'Benjamin Graham',
          'Charlie Munger',
          'Warren Buffett',
          'Peter Lynch',
        ],
        ans: 2,
      },
      {
        q: 'Circle of Competence berarti?',
        opts: [
          'Hanya investasi di saham melingkar',
          'Berinvestasi di bisnis yang benar-benar dipahami',
          'Diversifikasi di semua sektor',
          'Ikuti rekomendasi analis',
        ],
        ans: 1,
      },
      {
        q: 'Margin of Safety Buffett minimal adalah?',
        opts: ['5–10%', '10–15%', '25–40%', '50–75%'],
        ans: 2,
      },
      {
        q: 'Economic moat BBCA terutama berasal dari?',
        opts: [
          'ATM terbanyak',
          'CASA ratio tinggi dan switching cost (network effect)',
          'Aset terbesar',
          'Modal terbesar',
        ],
        ans: 1,
      },
      {
        q: 'Network Effect sebagai moat berarti?',
        opts: [
          'Jaringan distribusi fisik',
          'Nilai produk meningkat seiring jumlah pengguna',
          'Kerjasama banyak bank',
          'Infrastruktur kuat',
        ],
        ans: 1,
      },
      {
        q: "Terminal value dalam DCF menggunakan Gordon Growth: TVn = FCFn × (1+g) ÷ (WACC−g), 'g' adalah?",
        opts: [
          'Gross margin',
          'Long-term sustainable growth rate',
          'Current growth rate',
          'GDP saat ini',
        ],
        ans: 1,
      },
      {
        q: 'EV (Enterprise Value) = ?',
        opts: [
          'Market Cap saja',
          'Market Cap + Utang Berbunga − Kas',
          'Market Cap − Laba Bersih',
          'Market Cap + Total Aset',
        ],
        ans: 1,
      },
      {
        q: "Porter's Force yang melindungi perbankan Indonesia adalah?",
        opts: [
          'Banyak pesaing baru',
          'Barrier to entry tinggi (regulasi, modal)',
          'Produk mudah disubstitusi',
          'Pembeli sangat kuat',
        ],
        ans: 1,
      },
      {
        q: 'ROE konsisten >15% selama 10 tahun mengindikasikan?',
        opts: [
          'Saham pasti aman',
          'Bisnis berkualitas dengan moat',
          'Dividen pasti tinggi',
          'Valuasi murah',
        ],
        ans: 1,
      },
      {
        q: 'Bottom-up analysis dimulai dari?',
        opts: [
          'Kondisi ekonomi global',
          'Kebijakan suku bunga',
          'Analisis perusahaan individual secara langsung',
          'Kondisi sektor',
        ],
        ans: 2,
      },
      {
        q: 'Efficient scale sebagai moat contohnya adalah?',
        opts: [
          'Brand Unilever',
          'Tol JSMR (pasar terbatas, tidak ekonomis dimasuki pesaing)',
          'Software perbankan',
          'Ekosistem GoTo',
        ],
        ans: 1,
      },
      {
        q: 'Relative valuation yang tepat untuk bank adalah?',
        opts: ['EV/EBITDA', 'P/BV dan P/E', 'Price to Sales', 'P/Cash Flow'],
        ans: 1,
      },
      {
        q: 'Buffett menjual saham TERUTAMA ketika?',
        opts: [
          'Harga turun 10%',
          'Pasar crash',
          'Fundamental bisnis berubah permanen',
          'Quarterly earnings miss',
        ],
        ans: 2,
      },
      {
        q: 'ROIC > WACC secara konsisten berarti?',
        opts: [
          'Perusahaan terlalu berani',
          'Perusahaan menciptakan nilai bagi pemegang saham',
          'Utang terlalu besar',
          'Dividen terlalu tinggi',
        ],
        ans: 1,
      },
      {
        q: 'Switching cost sebagai moat: pelanggan enggan pindah karena?',
        opts: [
          'Harga lebih murah',
          'Biaya dan kerumitan beralih ke kompetitor tinggi',
          'Produk lebih bagus',
          'Lokasi lebih dekat',
        ],
        ans: 1,
      },
    ],
  },

  {
    id: 'M5',
    num: 5,
    icon: '📉',
    color: '#f97316',
    level: 'Menengah',
    title: 'Analisis Teknikal',
    desc: 'Candlestick, support/resistance, moving average, indikator momentum, dan chart patterns.',
    lessons: [
      {
        id: 'M5L1',
        title: 'Filosofi dan Dasar Analisis Teknikal',
        dur: '10 mnt',
        content: `Analisis teknikal mempelajari pergerakan harga dan volume untuk memprediksi arah masa depan.\n\n**3 Asumsi Dasar:**\n1. Market Discounts Everything: harga sudah cerminkan semua informasi.\n2. Prices Move in Trends: tren cenderung berlanjut.\n3. History Repeats Itself: pola berulang karena psikologi manusia konstan.\n\n**Fundamental vs Teknikal:**\nFundamental: WHAT to buy (kualitas). Teknikal: WHEN to buy and sell (timing). Kombinasi keduanya = powerful.\n\n**Tipe Trader per Timeframe:**\nScalper (menit). Day Trader (intraday). Swing Trader (3–10 hari). Position Trader (minggu–bulan). Investor Jangka Panjang (bulan–tahun).`,
      },
      {
        id: 'M5L2',
        title: 'Candlestick Patterns Lengkap',
        dur: '12 mnt',
        content: `Candlestick dikembangkan pedagang beras Jepang abad ke-18 dan masih sangat relevan.\n\n**Anatomy:**\nBody: range Open–Close. Upper Shadow: body ke High. Lower Shadow: body ke Low. Hijau/Putih = Close > Open (bullish). Merah/Hitam = Close < Open (bearish).\n\n**Pola Single Candle:**\nDoji: Open ≈ Close = ketidakpastian, potensi reversal. Hammer: body kecil atas, shadow bawah panjang = bullish reversal di downtrend. Shooting Star: body kecil bawah, shadow atas panjang = bearish reversal di uptrend. Marubozu: body panjang tanpa shadow = momentum sangat kuat.\n\n**Pola Multiple Candle:**\nBullish Engulfing: candle hijau besar "telan" candle merah = bullish reversal kuat. Bearish Engulfing: kebalikan. Morning Star / Evening Star: 3 candle, reversal kuat.`,
      },
      {
        id: 'M5L3',
        title: 'Support, Resistance, dan Trendline',
        dur: '12 mnt',
        content: `Support dan resistance adalah fondasi analisis teknikal.\n\n**Support:**\n"Lantai" — level harga di mana tekanan beli cukup kuat menghentikan penurunan. Identifikasi: level historis, round numbers (Rp5.000, Rp10.000), moving averages, Fibonacci levels.\n\n**Resistance:**\n"Langit-langit" — level di mana tekanan jual kuat.\n\n**Hukum Polarity (Role Reversal):**\nSupport ditembus ke bawah → berubah menjadi resistance. Resistance ditembus ke atas → berubah menjadi support. Salah satu konsep paling berguna!\n\n**Trendline:**\nUptrend: hubungkan 2–3 titik low yang semakin tinggi. Downtrend: hubungkan 2–3 titik high yang semakin rendah. Semakin sering harga bounce → semakin valid.`,
      },
      {
        id: 'M5L4',
        title: 'Moving Averages dan Golden/Death Cross',
        dur: '11 mnt',
        content: `Moving Average adalah indikator teknikal paling populer — identifikasi tren dan sinyal beli/jual.\n\n**SMA vs EMA:**\nSMA: rata-rata sederhana. EMA: bobot lebih pada harga terbaru, lebih responsif. Populer: MA20, MA50, MA100, MA200.\n\n**Penggunaan MA:**\nTren: harga di atas MA200 = uptrend jangka panjang. Support/Resistance dinamis: MA50 sering sebagai support saat uptrend.\n\n**Golden Cross = BULLISH KUAT:**\nMA50 memotong MA200 dari bawah ke atas. Sering mengikuti bottom pasar.\n\n**Death Cross = BEARISH:**\nMA50 memotong MA200 dari atas ke bawah.\n\n**MA Ribbon:**\nPasang MA20, 50, 100, 200 sekaligus. Semua MA berbaris naik = tren sangat kuat.`,
      },
      {
        id: 'M5L5',
        title: 'RSI, MACD, dan Stochastic',
        dur: '13 mnt',
        content: `Indikator momentum mengukur kecepatan dan kekuatan pergerakan harga.\n\n**RSI (Relative Strength Index):**\nSkala 0–100. >70: overbought, <30: oversold. RSI Divergence — SANGAT POWERFUL: Bullish divergence = harga lower low tapi RSI higher low → momentum turun melemah → potensi naik.\n\n**MACD:**\n= EMA12 − EMA26. Signal Line: EMA9 dari MACD. Histogram: MACD − Signal. MACD cross Signal ke atas = bullish. Bawah = bearish.\n\n**Stochastic Oscillator:**\n>80: overbought, <20: oversold. Crossover di zona ekstrem = sinyal entry.\n\n**Prinsip Konfirmasi:**\nJangan gunakan satu indikator saja. Konfirmasi dengan 2–3 sinyal searah sebelum entry.`,
      },
      {
        id: 'M5L6',
        title: 'Bollinger Bands dan ATR',
        dur: '10 mnt',
        content: `Indikator volatilitas membantu mengukur kondisi pasar dan potensi breakout.\n\n**Bollinger Bands:**\nMiddle Band (MA20) ± 2 standar deviasi. BB Squeeze: bands menyempit = volatilitas rendah → potensi breakout besar. Harga menyentuh lower band + RSI oversold = peluang beli. Bandwidth: ukuran lebar bands.\n\n**ATR (Average True Range):**\nMengukur volatilitas rata-rata dalam N periode. Berguna menentukan stop loss yang logis: stop loss = 2×ATR di bawah harga beli. Contoh: ATR BBCA = Rp125/hari → stop loss Rp250 di bawah harga beli.`,
      },
      {
        id: 'M5L7',
        title: 'Chart Patterns: Reversal & Continuation',
        dur: '13 mnt',
        content: `Pola chart mencerminkan psikologi kolektif investor yang berulang.\n\n**Pola Reversal:**\nHead & Shoulders: tiga puncak (left shoulder, head, right shoulder). Breakdown neckline + volume = entry short. Target = tinggi head dari neckline diproyeksikan ke bawah. Inverse H&S: kebalikan, bullish reversal. Double Top: gagal tembus resistance 2× = bearish. Double Bottom: gagal tembus support 2× = bullish.\n\n**Pola Continuation:**\nAscending Triangle: resistance horizontal + higher lows = bullish bias. Descending Triangle: support horizontal + lower highs = bearish. Flags & Pennants: konsolidasi setelah sharp move → lanjut arah sebelumnya.`,
      },
      {
        id: 'M5L8',
        title: 'Volume Analysis',
        dur: '10 mnt',
        content: `Volume adalah "konfirmator" paling jujur dari pergerakan harga.\n\n**Prinsip:**\nHarga naik + volume naik = BULLISH kuat. Harga naik + volume turun = peringatan, rally lemah. Harga turun + volume naik = BEARISH kuat. Breakout paling valid: volume 1,5–2× rata-rata 20 hari.\n\n**On Balance Volume (OBV):**\nHari naik: tambah volume. Hari turun: kurangi volume. OBV naik meski harga flat = akumulasi smart money (bullish signal).\n\n**Volume Spike:**\nVolume 3–5× normal di support = buying climax → potensi reversal naik. Di resistance = selling climax → potensi reversal turun.`,
      },
      {
        id: 'M5L9',
        title: 'Fibonacci Retracement dan Extension',
        dur: '11 mnt',
        content: `Fibonacci adalah matematika alam yang relevan di pasar keuangan.\n\n**Level Fibonacci Retracement:**\n23,6%, 38,2%, 50%, 61,8% (golden ratio, terkuat!), 78,6%.\n\n**Cara Menggambar:**\nUptrend: tarik dari swing low ke swing high. Level 61,8% dan 50% sering menjadi support kuat dalam uptrend.\n\n**Fibonacci Extension:**\n127,2%, 161,8%, 200%, 261,8% — untuk target harga setelah breakout.\n\n**Strategi Retracement Entry:**\n1. Identifikasi tren kuat. 2. Harga koreksi ke 50% atau 61,8% Fibonacci. 3. Entry saat ada konfirmasi candlestick. 4. Stop loss di bawah level Fibonacci berikutnya.`,
      },
      {
        id: 'M5L10',
        title: 'Membangun Trading Plan',
        dur: '11 mnt',
        content: `Trading plan adalah konstitusi investasi Anda — rules yang tidak boleh dilanggar.\n\n**Komponen Trading Plan:**\n1. Universe: saham apa yang dipantau (10–20 saham berkualitas).\n2. Setup: kondisi teknikal trigger beli.\n3. Entry rule: market order atau limit order.\n4. Position sizing: % modal per trade (max 2% risiko).\n5. Stop loss: ATR-based atau level S/R.\n6. Target: R/R minimal 1:2.\n7. Exit rule: kondisi selain target/SL.\n\n**Contoh Setup Sederhana:**\nUniverse: LQ45. Setup: MA20 cross above MA50 + volume di atas rata-rata + RSI 50–60. Stop: close di bawah MA50. Target: 1,618× risk (Fibonacci extension).\n\n**The Most Important Rule:**\nPatuhi trading plan meski merasa "yakin" di luar aturan. Disiplin > kecerdasan.`,
      },
    ],
    quiz: [
      {
        q: 'Doji candlestick mengindikasikan?',
        opts: [
          'Tren naik kuat',
          'Ketidakpastian / potensi reversal',
          'Volume sangat tinggi',
          'Support kuat',
        ],
        ans: 1,
      },
      {
        q: 'Polarity rule: support yang ditembus ke bawah?',
        opts: [
          'Support semakin kuat',
          'Menjadi resistance',
          'Harga pasti naik kembali',
          'Tidak ada perubahan',
        ],
        ans: 1,
      },
      {
        q: 'Golden Cross adalah?',
        opts: [
          'RSI di level 80',
          'Harga menyentuh ATH',
          'MA50 memotong MA200 dari bawah ke atas',
          'Volume tertinggi setahun',
        ],
        ans: 2,
      },
      {
        q: 'RSI Bullish Divergence terjadi saat?',
        opts: [
          'Harga dan RSI keduanya naik',
          'Harga lower low tapi RSI higher low',
          'RSI di atas 70',
          'Harga di atas MA200',
        ],
        ans: 1,
      },
      {
        q: 'Bollinger Band Squeeze mengindikasikan?',
        opts: [
          'Tren kuat',
          'Kondisi overbought',
          'Volatilitas rendah, potensi breakout besar',
          'Sinyal jual',
        ],
        ans: 2,
      },
      {
        q: 'Head and Shoulders adalah pola?',
        opts: [
          'Bullish continuation',
          'Bullish reversal',
          'Bearish reversal',
          'Bearish continuation',
        ],
        ans: 2,
      },
      {
        q: 'Breakout tanpa volume tinggi biasanya?',
        opts: [
          'Lebih valid',
          'Sering false breakout',
          'Lebih kuat',
          'Tanda institutional buying',
        ],
        ans: 1,
      },
      {
        q: 'Level Fibonacci Retracement terkuat (golden ratio) adalah?',
        opts: ['23,6%', '38,2%', '50%', '61,8%'],
        ans: 3,
      },
      {
        q: 'ATR berguna untuk?',
        opts: [
          'Timing entry',
          'Mengukur volatilitas dan tentukan stop loss logis',
          'Mengidentifikasi trend',
          'Memprediksi harga target',
        ],
        ans: 1,
      },
      {
        q: 'OBV naik meski harga flat mengindikasikan?',
        opts: [
          'Distribusi smart money',
          'Akumulasi smart money (bullish)',
          'Volume rendah',
          'Trend akan turun',
        ],
        ans: 1,
      },
      {
        q: 'Hammer candlestick di downtrend mengindikasikan?',
        opts: [
          'Downtrend berlanjut',
          'Potensi bullish reversal',
          'Volume sangat tinggi',
          'Resistance kuat',
        ],
        ans: 1,
      },
      {
        q: 'MACD Signal Buy terjadi ketika?',
        opts: [
          'Histogram positif',
          'RSI di atas 50',
          'MACD Line memotong Signal Line dari bawah ke atas',
          'Harga di atas MA200',
        ],
        ans: 2,
      },
      {
        q: 'Risk/Reward minimal yang direkomendasikan per trade adalah?',
        opts: ['1:0,5', '1:1', '1:2', '1:5'],
        ans: 2,
      },
      {
        q: 'Ascending Triangle memiliki bias?',
        opts: ['Bearish', 'Bullish', 'Netral', 'Sideways'],
        ans: 1,
      },
      {
        q: 'Death Cross adalah?',
        opts: [
          'RSI di bawah 30',
          'MA50 memotong MA200 dari atas ke bawah',
          'Volume terendah setahun',
          'Harga di bawah support',
        ],
        ans: 1,
      },
    ],
  },

  {
    id: 'M6',
    num: 6,
    icon: '🧠',
    color: '#ec4899',
    level: 'Lanjutan',
    title: 'Psikologi Investasi & Market Crash',
    desc: 'Bias kognitif, behavioral finance, sejarah crash pasar, dan strategi bertahan saat krisis.',
    lessons: [
      {
        id: 'M6L1',
        title: 'Pengantar Behavioral Finance',
        dur: '9 mnt',
        content: `Behavioral finance menggabungkan psikologi dan ekonomi untuk menjelaskan mengapa investor sering bertindak irasional.\n\n**Ekonomi Klasik vs Realita:**\nKlasik: investor selalu rasional, memproses semua informasi dengan benar, pasar selalu efisien.\nRealita: investor sering irasional, keputusan dipengaruhi emosi dan bias, pasar sering tidak efisien jangka pendek.\n\n**Pionir:**\nDaniel Kahneman & Amos Tversky: Prospect Theory (Nobel 2002). Richard Thaler: Mental Accounting (Nobel 2017). Robert Shiller: Irrational Exuberance.\n\n**Sistem 1 vs Sistem 2 (Kahneman):**\nSistem 1: cepat, emosional, otomatis. Sistem 2: lambat, analitis, rasional. Investasi baik butuh Sistem 2, tapi Sistem 1 sering ambil alih saat pasar bergejolak.`,
      },
      {
        id: 'M6L2',
        title: 'Loss Aversion dan Prospect Theory',
        dur: '10 mnt',
        content: `Kahneman & Tversky: kehilangan Rp1 juta terasa 2–2,5× lebih sakit dari mendapatkan Rp1 juta.\n\n**Dampak di Investasi:**\nDisposition Effect: jual saham untung terlalu cepat (hindari risiko kehilangan profit), tahan saham rugi terlalu lama (hindari realisasi kerugian). Penelitian: investor ritel rata-rata hold losers 2× lebih lama dari winners.\n\n**Breakeven Effect:**\nAmbil risiko lebih besar saat sedang rugi, berharap breakeven. Berbahaya jika fundamental memang memburuk.\n\n**Cara Melawan:**\nFokus pada total return portfolio, bukan per posisi. Pre-commit pada aturan stop loss sebelum beli. Reframe: "Apakah saya akan beli saham ini HARI INI di harga ini?" Jika tidak → pertimbangkan jual.`,
      },
      {
        id: 'M6L3',
        title: 'Overconfidence, Herding, dan FOMO',
        dur: '10 mnt',
        content: `Tiga bias paling merusak portofolio investor.\n\n**Overconfidence:**\nOverestimate kemampuan sendiri. 93% pengemudi AS merasa "di atas rata-rata." 80%+ fund manager profesional underperform index jangka panjang. Akibat: overtrading → biaya transaksi besar → return lebih rendah.\n\n**Herding (Ikut Kawanan):**\nIkuti keputusan orang banyak meski bertentangan analisis sendiri. Menciptakan bubble dan crash. Contrarian strategy: beli saat orang lain panik, waspada saat euforia.\n\n**FOMO (Fear of Missing Out):**\nBeli saham yang sudah naik 100% karena takut ketinggalan. Sering masuk di puncak. Solusi: buat keputusan berdasarkan analisis sendiri, bukan keramaian media sosial.`,
      },
      {
        id: 'M6L4',
        title: 'Confirmation Bias dan Anchoring',
        dur: '9 mnt',
        content: `Dua bias kognitif yang sangat merusak proses pengambilan keputusan.\n\n**Confirmation Bias:**\nCari informasi yang konfirmasi keyakinan sudah ada, abaikan yang bertentangan. Sudah beli ABCD → hanya baca berita positif ABCD.\n\n**Cara Melawan:**\nAktif cari "bear case" untuk setiap investasi. Sebelum beli: tulis 3 alasan mengapa investasi ini BISA GAGAL. Pre-mortem exercise: bayangkan 2 tahun lagi investasi gagal total — kenapa?\n\n**Anchoring Bias:**\nTerpaku pada informasi pertama. "BBCA Rp3.000 dulu, sekarang Rp9.500 sudah mahal" (padahal fundamental berbeda jauh). Jangan gunakan harga beli sebagai referensi jual.\n\n**Cara Melawan:**\nTanya: "Apakah saya akan beli saham ini hari ini di harga ini?" Buat valuasi independen sebelum baca target price analis.`,
      },
      {
        id: 'M6L5',
        title: 'Mental Accounting dan Regret Aversion',
        dur: '9 mnt',
        content: `Bias yang membuat kita memperlakukan uang secara berbeda tanpa alasan logis.\n\n**Mental Accounting:**\nUang dividen diperlakukan sebagai "uang gratis" → dipakai untuk saham spekulatif. House Money Effect: setelah profit besar, ambil risiko berlebihan karena "bermain uang pasar." Realita: Rp1 juta dari dividen = Rp1 juta dari gaji. Selalu setara!\n\n**Regret Aversion:**\nHindari keputusan yang mungkin menyebabkan penyesalan. Tidak jual saham rugi karena "kalau dijual dan naik besok, nyesal." Paradoks: menghindari potensi menyesal sering menyebabkan penyesalan lebih besar.\n\n**Solusi:**\nFokus pada kualitas proses, bukan outcome. Tanya: "Apakah saya akan membeli posisi ini sekarang di harga sekarang?"`,
      },
      {
        id: 'M6L6',
        title: 'Anatomi Market Crash',
        dur: '11 mnt',
        content: `Market crash adalah penurunan harga saham yang tajam, cepat, dan luas — umumnya >20% dari puncak dalam waktu singkat.\n\n**Definisi:**\nKoreksi: turun 10–20% dari puncak. Bear Market: turun >20%. Crash: turun >20% dalam minggu/hari.\n\n**Penyebab Umum:**\nFundamental ekonomi (resesi, bubble aset). Black Swan (pandemi COVID, 9/11). Krisis kepercayaan (Lehman Brothers). Leverage berlebihan (margin call spiral).\n\n**Historical IHSG Crashes:**\n1998: −65% (krisis moneter). 2008: −55% (krisis global). 2013: −25% (taper tantrum). 2020: −38% COVID.\n\n**Fakta Menenangkan:**\nIHSG selalu recovery dari setiap crash. Investor yang sabar dan tidak panic sell selalu menang jangka panjang.`,
      },
      {
        id: 'M6L7',
        title: 'Sejarah Crash Besar Dunia',
        dur: '12 mnt',
        content: `Mempelajari sejarah crash membantu investor tidak panik dan melihat pola yang berulang.\n\n**Great Depression (1929–1932):**\nDow Jones turun 89% dari puncak. Leverage berlebihan, bubble aset, proteksionisme. Butuh 25 tahun recovery penuh.\n\n**Dot-Com Crash (2000–2002):**\nNasdaq turun 78%. Valuasi internet company irasional (P/E ratusan kali, banyak tidak pernah profit). Pelajaran: harga tidak bisa jauh dari fundamental selamanya.\n\n**Global Financial Crisis (2008):**\nS&P 500 turun 56%. Subprime mortgage bubble, sekuritisasi CDO. Pelajaran: risiko tersembunyi di produk "aman".\n\n**COVID-19 Crash (2020):**\nS&P 500 turun 34% dalam 33 hari — tercepat sejarah. Recovery juga tercepat (5 bulan). Investor beli saat panik → return 150%+ dalam 18 bulan.`,
      },
      {
        id: 'M6L8',
        title: 'Strategi Saat Crash Terjadi',
        dur: '11 mnt',
        content: `Keputusan yang dibuat dalam hitungan hari saat crash bisa mempengaruhi return bertahun-tahun.\n\n**Yang TIDAK Boleh Dilakukan:**\nPanic selling (mengunci kerugian permanen). Menunggu "aman" sebelum beli (sudah terlambat). Menggunakan margin (margin call di harga terburuk). Cek portofolio setiap jam.\n\n**Yang HARUS Dilakukan:**\nTetap tenang — ingat sejarah selalu recovery. Evaluasi fundamental, bukan harga. Akumulasi bertahap dengan cash reserve. Fokus pada kualitas terbaik yang diskon.\n\n**Strategi Cicil Pembelian:**\nTurun 20–25%: deploy 25% cash. Turun 30–35%: deploy 25% lagi. Turun 40%+: deploy sisa cash. Tidak perlu tangkap tepat di bottom!`,
      },
      {
        id: 'M6L9',
        title: 'Membangun Portofolio Tahan Crash',
        dur: '10 mnt',
        content: `Portofolio yang baik dirancang untuk tahan banting saat crash, bukan hanya untuk performa saat bull market.\n\n**Karakteristik Portofolio Anti-Rapuh:**\nDiversifikasi sektoral (defensif + siklikal). Kualitas saham tinggi (net cash, FCF positif, moat kuat, dividen konsisten). Alokasi aset berimbang (saham + obligasi + kas). Menghindari leverage. Cash reserve 10–20% (dry powder untuk peluang crash).\n\n**Mental Framework:**\nAnggap crash sebagai "sale besar" di toko favorit. Barang bagus yang kemarin Rp100.000 sekarang Rp60.000 — Anda beli lebih banyak atau panik dan pergi?`,
      },
      {
        id: 'M6L10',
        title: 'Membangun Proses Investasi Bebas Bias',
        dur: '11 mnt',
        content: `Mengetahui bias saja tidak cukup — perlu sistem yang aktif mengurangi dampaknya.\n\n**5 Framework Anti-Bias:**\n1. Pre-Mortem Analysis: sebelum investasi besar, bayangkan gagal total → tulis 5 alasan mengapa.\n2. Devil's Advocate: minta orang lain berargumen melawan posisi Anda.\n3. Decision Journal: catat reasoning + kondisi emosi saat keputusan. Review 6–12 bulan kemudian.\n4. Rules-Based Investing: DCA otomatis, rebalancing terjadwal, stop loss pre-set.\n5. Cooling-Off Period: tunggu 24–48 jam sebelum eksekusi keputusan besar.\n\n**Mindset Kunci:**\n"You can be wrong on any single investment. But you must be right on the process."`,
      },
    ],
    quiz: [
      {
        q: 'Prospect Theory dikembangkan oleh?',
        opts: [
          'Warren Buffett',
          'Daniel Kahneman & Amos Tversky',
          'Robert Shiller',
          'Richard Thaler',
        ],
        ans: 1,
      },
      {
        q: 'Loss aversion: kehilangan Rp1 juta terasa berapa kali lebih sakit?',
        opts: ['Sama saja', '1,5×', '2–2,5×', '5×'],
        ans: 2,
      },
      {
        q: 'Disposition effect adalah?',
        opts: [
          'Jual saham rugi terlalu cepat',
          'Jual saham untung terlalu cepat dan tahan saham rugi terlalu lama',
          'Beli saham trending',
          'Diversifikasi berlebihan',
        ],
        ans: 1,
      },
      {
        q: 'FOMO paling sering terjadi saat?',
        opts: [
          'Saham di titik terendah',
          'Saham sudah naik 100%+ dan semua orang membicarakannya',
          'Pasar crash',
          'Fundamental membaik',
        ],
        ans: 1,
      },
      {
        q: 'Pre-mortem analysis berarti?',
        opts: [
          'Analisis setelah gagal',
          'Bayangkan investasi gagal SEBELUM keputusan untuk temukan risiko tersembunyi',
          'Analisis pasca crash',
          'Analisis kematian perusahaan',
        ],
        ans: 1,
      },
      {
        q: 'Anchoring bias: harga beli sebagai referensi tidak relevan karena?',
        opts: [
          'Volume berubah',
          'Pasar tidak peduli di harga berapa Anda beli',
          'Analisis teknikal lebih penting',
          'Fundamental berubah',
        ],
        ans: 1,
      },
      {
        q: 'Sistem 2 thinking dibanding Sistem 1 adalah?',
        opts: [
          'Lebih cepat dan emosional',
          'Lebih lambat, analitis, dan logis',
          'Lebih sering digunakan',
          'Lebih mudah dilakukan',
        ],
        ans: 1,
      },
      {
        q: 'Confirmation bias: investor hanya cari informasi yang?',
        opts: [
          'Bertentangan dengan posisinya',
          'Mengkonfirmasi keyakinan yang sudah ada',
          'Dari sumber terpercaya',
          'Bersifat fundamental',
        ],
        ans: 1,
      },
      {
        q: 'Bear market didefinisikan sebagai penurunan lebih dari?',
        opts: ['5%', '10%', '20%', '50%'],
        ans: 2,
      },
      {
        q: 'IHSG crash COVID-19 2020 sebesar?',
        opts: ['−15%', '−25%', '−38%', '−60%'],
        ans: 2,
      },
      {
        q: 'Strategi cicil pembelian saat crash: deploy 25% cash pertama saat turun?',
        opts: ['5–10%', '15–20%', '20–25%', '40–50%'],
        ans: 2,
      },
      {
        q: 'Dot-com crash (2000) mengajarkan?',
        opts: [
          'Teknologi selalu investasi buruk',
          'Valuasi fundamental selalu menang jangka panjang',
          'FOMO adalah strategi baik',
          'Selalu jual saat crash',
        ],
        ans: 1,
      },
      {
        q: "'House Money Effect' terjadi ketika?",
        opts: [
          'Investasi di saham properti',
          "Setelah profit besar, ambil risiko lebih besar karena 'bermain uang pasar'",
          'Uang warisan diinvestasikan',
          'Beli saham dengan KPR',
        ],
        ans: 1,
      },
      {
        q: 'Herding contrarian strategy: beli saat?',
        opts: [
          'Semua orang euforia',
          'Semua orang panik menjual',
          'Volume rendah',
          'RSI di 80',
        ],
        ans: 1,
      },
      {
        q: 'Investasi yang baik membutuhkan lebih banyak?',
        opts: [
          'Sistem 1 (cepat, emosional)',
          'Sistem 2 (lambat, analitis, rasional)',
          'Intuisi',
          'Tips dari orang lain',
        ],
        ans: 1,
      },
    ],
  },

  {
    id: 'M7',
    num: 7,
    icon: '🌍',
    color: '#0891b2',
    level: 'Lanjutan',
    title: 'Makroekonomi, Geopolitik & Perdagangan',
    desc: 'Siklus ekonomi, kebijakan moneter, geopolitik global, komoditas Indonesia, dan perdagangan internasional.',
    lessons: [
      {
        id: 'M7L1',
        title: 'Siklus Pasar Modal dan Ekonomi',
        dur: '11 mnt',
        content: `Pasar modal bergerak dalam siklus yang berulang, didorong ekonomi dan psikologi manusia.\n\n**4 Fase Siklus Pasar:**\n1. Akumulasi (Bottom): pasar jatuh, smart money beli diam-diam, valuasi murah. Terbaik untuk beli tapi paling sulit secara psikologis.\n2. Mark-Up (Bull Market): harga naik konsisten, berita positif, investor ritel mulai masuk.\n3. Distribusi (Top): pasar di puncak, semua optimis, smart money mulai jual.\n4. Mark-Down (Bear Market): harga turun, panic selling di fase akhir.\n\n**Siklus Ekonomi vs Pasar:**\nPasar modal bergerak 6–12 bulan lebih awal dari ekonomi riil. Mulai naik saat ekonomi masih resesi; mulai turun saat ekonomi masih tumbuh.`,
      },
      {
        id: 'M7L2',
        title: 'Suku Bunga dan Dampaknya ke Saham',
        dur: '12 mnt',
        content: `Suku bunga adalah "harga uang" — perubahan suku bunga mempengaruhi hampir semua kelas aset.\n\n**BI Rate dan IHSG:**\nNaik → uang mahal → kredit melambat → ekonomi melambat → valuasi turun (discount rate naik → NPV arus kas turun). Turun → kredit murah → ekspansi → saham cenderung naik.\n\n**Sektor Paling Sensitif:**\nPerbankan: profitabilitas langsung terpengaruh NIM. Properti: KPR mahal/murah. Infrastruktur & Utilitas: leverage tinggi.\n\n**Fed Rate & Dampak ke Indonesia:**\nNaik → capital outflow dari EM → rupiah melemah → BI ikut naikkan rate → tekanan ganda IHSG. CME FedWatch Tool: probabilitas keputusan Fed di pertemuan berikutnya.`,
      },
      {
        id: 'M7L3',
        title: 'Inflasi, GDP, dan Pasar Saham',
        dur: '10 mnt',
        content: `Indikator makroekonomi adalah kompas untuk memahami arah pasar jangka menengah-panjang.\n\n**Inflasi dan Pasar:**\nRendah-moderat (2–4%): ideal. Tinggi (>6%): BI naikkan rate agresif → saham tertekan. Deflasi: demand lemah → juga berbahaya.\n\n**GDP Growth dan Earnings:**\nEkonomi tumbuh → pendapatan rumah tangga naik → belanja naik → revenue naik → earnings naik → saham naik. GDP Indonesia 2023: 5,05% — mendukung pertumbuhan earnings.\n\n**PMI (Purchasing Managers Index):**\n>50 = ekspansi manufaktur/jasa. <50 = kontraksi. Leading indicator yang baik untuk arah ekonomi 3–6 bulan ke depan.\n\n**Siklus Rotasi Sektor:**\nExpansion: siklikal outperform. Recession: defensif (consumer staples, utilities, healthcare) bertahan.`,
      },
      {
        id: 'M7L4',
        title: 'Nilai Tukar Rupiah dan Investasi',
        dur: '10 mnt',
        content: `Nilai tukar rupiah memiliki dampak signifikan dan kompleks terhadap pasar saham Indonesia.\n\n**Rupiah Melemah:**\nPositif: eksportir komoditas (ADRO, PTBA, AALI — revenue USD, biaya IDR). Negatif: importir bahan baku, perusahaan utang USD.\n\n**Rupiah Menguat:**\nPositif: importir, perusahaan utang USD. Negatif: eksportir komoditas.\n\n**Faktor Penentu Nilai Rupiah:**\nNeraca perdagangan. Aliran modal asing. Perbedaan suku bunga. Cadangan devisa BI.\n\n**Cadangan Devisa:**\nIndonesia ~$150 miliar = 6+ bulan impor. Semakin besar → rupiah lebih stabil → BI bisa intervensi saat capital outflow.`,
      },
      {
        id: 'M7L5',
        title: 'Geopolitik dan Pasar Keuangan',
        dur: '10 mnt',
        content: `Geopolitik mempengaruhi pasar melalui beberapa mekanisme kritis.\n\n**Channel Transmisi:**\n1. Risk-On/Risk-Off: ketegangan geopolitik → investor jual aset berisiko → beli safe haven (USD, emas, US Treasury).\n2. Commodity Price Shock: konflik di kawasan produsen → harga komoditas melonjak.\n3. Supply Chain Disruption: perang dagang/sanksi → biaya produksi naik → inflasi.\n4. Capital Flight: instabilitas → modal keluar EM → rupiah dan IHSG tertekan.\n\n**Dampak ke IHSG:**\nInvestor asing ~40–50% pasar BEI → keluar-masuk dana asing sangat berpengaruh. Monitor net foreign buy/sell harian.`,
      },
      {
        id: 'M7L6',
        title: 'Dinamika AS-China dan Implikasinya',
        dur: '11 mnt',
        content: `Persaingan AS-China adalah geopolitik paling penting abad ke-21, dengan dampak nyata bagi Indonesia.\n\n**Perang Dagang:**\n2018+: tarif tinggi AS vs China. China+1 strategy: perusahaan diversifikasi pabrik dari China. Penerima manfaat: Vietnam, Indonesia, India. Indonesia: FDI masuk sektor manufaktur dan baterai EV.\n\n**Semikonduktor Wars:**\nAS blokir chip canggih ke China. TSMC Taiwan menjadi "geopolitical flashpoint." Potensi: jika konflik eskalasi → supply chain chip global terganggu → dampak besar semua sektor.\n\n**Peluang Indonesia:**\nNikel terbesar dunia → kritis untuk baterai EV yang diperlukan AS dan China. Diplomasi "bebas aktif" → balance antara dua kekuatan untuk kepentingan nasional.`,
      },
      {
        id: 'M7L7',
        title: 'Komoditas Utama Indonesia',
        dur: '11 mnt',
        content: `Indonesia adalah salah satu negara paling kaya komoditas di dunia.\n\n**Batu Bara:**\n#1 eksportir batu bara thermal dunia. Saham: ADRO, ITMG, PTBA, BUMI. Driver: kebutuhan listrik China/India, kebijakan energi Eropa. Sunset industry jangka panjang (ESG/transisi energi).\n\n**Nikel:**\nCadangan terbesar dunia (26%+ global). Krusial untuk baterai EV! Saham: INCO, ANTM, MDKA. Hilirisasi: larangan ekspor ore 2020 → smelter masif dibangun → value chain naik.\n\n**CPO (Kelapa Sawit):**\n#1 produsen CPO global (55% supply). Saham: AALI, SIMP, LSIP. Driver: harga kedelai (substitut), biodiesel, El Niño/La Niña.\n\n**Emas:**\nANTM (Antam) proxy emas lokal. Naik saat: suku bunga riil rendah, geopolitik memanas, inflasi tinggi.`,
      },
      {
        id: 'M7L8',
        title: 'Perdagangan Internasional dan Neraca Pembayaran',
        dur: '9 mnt',
        content: `Perdagangan internasional adalah fondasi ekonomi modern — ekspor/impor Indonesia mempengaruhi rupiah dan IHSG.\n\n**Comparative Advantage:**\nIndonesia: kelapa sawit, batu bara, nikel, karet — produksi lebih efisien relatif.\n\n**Neraca Perdagangan:**\nSurplus (ekspor > impor) → permintaan rupiah → rupiah menguat → positif IHSG. Defisit → tekanan rupiah → negatif IHSG.\n\n**Current Account Deficit (CAD):**\nHistoris Indonesia CAD karena defisit jasa dan bunga utang. Surplus perdagangan barang belum cukup offset.\n\n**Cadangan Devisa sebagai Buffer:**\nBI intervensi jual USD saat capital outflow masif → stabilkan rupiah. ~$150M = 6+ bulan impor = buffer memadai.`,
      },
      {
        id: 'M7L9',
        title: 'Hilirisasi dan Industrialisasi Indonesia',
        dur: '11 mnt',
        content: `Hilirisasi adalah kebijakan strategis Indonesia meningkatkan nilai tambah sumber daya alam.\n\n**Mengapa Hilirisasi?**\nSelama ini: ekspor bahan mentah → impor kembali dalam bentuk produk jadi = kehilangan nilai tambah besar.\n\n**Contoh Nikel:**\nOre nikel mentah: $20–30/ton. NPI (Nickel Pig Iron): $100–150/ton. Bahan baterai EV (nickel sulfate): jauh lebih mahal.\n\n**Dampak ke Saham:**\nPositif: INCO, ANTM, MDKA (margin lebih tinggi). Kawasan Industri: KIJA, BEST, SSIA (demand lahan industri). Logistik: demand layanan naik.\n\n**Peta Jalan:**\nNikel → baterai EV. Bauksit → aluminium. Tembaga → kabel, elektronik. Sawit → biodiesel, oleokimia.`,
      },
      {
        id: 'M7L10',
        title: 'Membaca Data Ekonomi Makro untuk Investasi',
        dur: '10 mnt',
        content: `Investor cerdas memantau data makroekonomi untuk memahami lingkungan investasi secara lebih luas.\n\n**Kalender Ekonomi Penting:**\nData AS (paling berpengaruh): Non-Farm Payroll (Jumat pertama tiap bulan), CPI inflasi, FOMC meeting (8×/tahun), GDP. Data Indonesia: BI Rate decision (bulanan), Inflasi CPI (tgl 1–5 tiap bulan), GDP kuartalan, Neraca Perdagangan.\n\n**Cara Membaca Rilis Data:**\nYang penting: data vs ekspektasi pasar. Lebih baik dari ekspektasi = market naik. Lebih buruk = turun. Sesuai ekspektasi = tidak banyak bergerak.\n\n**Yield Curve Inversion:**\nBunga jangka pendek > panjang = sinyal historis resesi dalam 12–18 bulan. Terjadi sebelum setiap resesi AS sejak 1970-an.\n\n**Tools:**\ninvesting.com/economic-calendar, tradingeconomics.com, bi.go.id, bps.go.id.`,
      },
    ],
    quiz: [
      {
        q: 'Pasar modal bergerak berapa bulan lebih awal dari ekonomi riil?',
        opts: ['1–2 bulan', '3–4 bulan', '6–12 bulan', '12–24 bulan'],
        ans: 2,
      },
      {
        q: 'Kenaikan suku bunga BI cenderung berdampak... terhadap valuasi saham.',
        opts: ['Positif', 'Netral', 'Negatif', 'Tidak ada dampak'],
        ans: 2,
      },
      {
        q: 'PMI >50 mengindikasikan?',
        opts: [
          'Kontraksi ekonomi',
          'Ekspansi manufaktur/jasa',
          'Inflasi tinggi',
          'Resesi',
        ],
        ans: 1,
      },
      {
        q: 'Melemahnya rupiah menguntungkan saham?',
        opts: [
          'Importir bahan baku',
          'Perusahaan utang USD besar',
          'Eksportir komoditas (ADRO, PTBA)',
          'Perbankan dengan pinjaman LN',
        ],
        ans: 2,
      },
      {
        q: 'Indonesia memiliki cadangan nikel terbesar di dunia sekitar berapa persen global?',
        opts: ['5%', '10%', '18%', '26%+'],
        ans: 3,
      },
      {
        q: 'Fase pasar modal terbaik untuk beli saham secara psikologis paling sulit adalah?',
        opts: [
          'Mark-Up (bull market)',
          'Distribusi (top)',
          'Akumulasi (bottom)',
          'Mark-Down awal',
        ],
        ans: 2,
      },
      {
        q: 'Net sell asing pada IHSG cenderung mengindikasikan?',
        opts: [
          'Pasar bullish',
          'Tekanan jual dan sentimen bearish',
          'Ekonomi Indonesia kuat',
          'Masuknya saham ke MSCI',
        ],
        ans: 1,
      },
      {
        q: 'Risk-off environment berarti investor?',
        opts: [
          'Beli saham EM agresif',
          'Lari ke safe haven: USD, emas, US Treasury',
          'Beli komoditas',
          'Beli real estate',
        ],
        ans: 1,
      },
      {
        q: 'Hilirisasi nikel Indonesia: larangan ekspor ore diterapkan permanen sejak?',
        opts: ['2014', '2017', '2020', '2022'],
        ans: 2,
      },
      {
        q: 'Yield curve inversion secara historis adalah sinyal?',
        opts: [
          'Bull market akan datang',
          'Resesi dalam 12–18 bulan',
          'Inflasi rendah',
          'Suku bunga akan turun',
        ],
        ans: 1,
      },
      {
        q: 'Konflik Rusia-Ukraina (2022) berdampak POSITIF untuk saham Indonesia di sektor?',
        opts: [
          'Perbankan',
          'Properti',
          'Batu bara dan nikel (substitusi dari Rusia)',
          'Telekomunikasi',
        ],
        ans: 2,
      },
      {
        q: 'China+1 strategy perusahaan global menguntungkan Indonesia karena?',
        opts: [
          'Harga tenaga kerja tinggi',
          'FDI masuk untuk diversifikasi pabrik dari China',
          'Teknologi Indonesia lebih maju',
          'Pasar konsumen besar',
        ],
        ans: 1,
      },
      {
        q: 'Neraca perdagangan surplus berarti?',
        opts: [
          'Impor > ekspor, tekanan rupiah',
          'Ekspor > impor, positif untuk rupiah',
          'Defisit anggaran pemerintah',
          'Utang luar negeri meningkat',
        ],
        ans: 1,
      },
      {
        q: 'Non-Farm Payroll (NFP) AS dirilis?',
        opts: [
          'Setiap hari Senin',
          'Jumat pertama setiap bulan',
          'Tiap tanggal 1',
          'Setelah FOMC meeting',
        ],
        ans: 1,
      },
      {
        q: 'Sektor paling defensif saat resesi ekonomi adalah?',
        opts: [
          'Properti dan otomotif',
          'Consumer staples, utilities, healthcare',
          'Teknologi dan startup',
          'Pertambangan dan energi',
        ],
        ans: 1,
      },
    ],
  },

  {
    id: 'M8',
    num: 8,
    icon: '⚖️',
    color: '#fbbf24',
    level: 'Lanjutan',
    title: 'Manajemen Portofolio & Proyek Akhir',
    desc: 'Modern Portfolio Theory, alokasi aset, risk management, dan simulasi portofolio nyata.',
    lessons: [
      {
        id: 'M8L1',
        title: 'Modern Portfolio Theory (MPT)',
        dur: '13 mnt',
        content: `Harry Markowitz (Nobel 1990) merevolusi investasi dengan menunjukkan diversifikasi mengurangi risiko tanpa korbankan return.\n\n**Konsep Inti:**\nRisiko portfolio ≠ penjumlahan risiko individual. Diversifikasi menghilangkan idiosyncratic risk (risiko spesifik). Yang tersisa: systematic risk (risiko pasar) — tidak bisa dihilangkan.\n\n**Efficient Frontier:**\nKumpulan portfolio yang memberikan return maksimal untuk tingkat risiko tertentu. Portfolio di bawah efficient frontier = suboptimal.\n\n**Korelasi dan Diversifikasi:**\nKorelasi −1: pergerakan berlawanan = diversifikasi maksimal. Korelasi 0: tidak berkorelasi = diversifikasi baik. Korelasi +1: bergerak sama = tidak ada manfaat diversifikasi.\n\n**Sharpe Ratio = (Return Portfolio − Risk-free rate) ÷ Standar Deviasi. Makin tinggi makin baik.**`,
      },
      {
        id: 'M8L2',
        title: 'Alokasi Aset Strategis',
        dur: '11 mnt',
        content: `Asset allocation adalah keputusan terpenting — menentukan 90%+ dari variasi return.\n\n**Kelas Aset Utama:**\nEquity (saham): return tinggi, risiko tinggi. Fixed income (obligasi): return moderat, risiko moderat. Cash & equivalents: return rendah, risiko sangat rendah. Real assets (properti, emas). Alternative (PE, hedge fund).\n\n**Alokasi Berdasarkan Profil:**\nAggressive (>10 tahun): 80% saham, 10% obligasi, 10% cash. Moderate (5–10 tahun): 60% saham, 30% obligasi, 10% cash. Conservative (<5 tahun/pensiunan): 30% saham, 50% obligasi, 20% cash.\n\n**Strategic vs Tactical Allocation:**\nSAA: jangka panjang berdasarkan tujuan. TAA: deviasi jangka pendek berdasarkan kondisi pasar.`,
      },
      {
        id: 'M8L3',
        title: 'Risk Management Portofolio',
        dur: '12 mnt',
        content: `Manajemen risiko adalah fondasi keberhasilan jangka panjang — lindungi modal dulu, baru cari return.\n\n**Jenis Risiko:**\nSystematic (market): tidak bisa dihilangkan diversifikasi. Unsystematic (idiosyncratic): bisa dihilangkan diversifikasi.\n\n**Value at Risk (VaR):**\nKerugian maksimal yang tidak akan dilampaui dengan tingkat kepercayaan tertentu. VaR 95% = Rp10 juta: 95% kemungkinan kerugian 1 hari tidak melebihi Rp10 juta.\n\n**Sizing & Concentration Limits:**\nSatu saham maksimal 20–25% (pemula) atau 30–40% (advanced). Satu sektor maksimal 40%. Stop loss per saham: 7–15%.\n\n**Portfolio Risk Budget:**\nMax drawdown yang bisa ditoleransi (misal −25%) → tentukan position sizing maksimal → jika saham bisa turun 30%, maks alokasi 8% agar max loss dari satu saham hanya 2,4%.`,
      },
      {
        id: 'M8L4',
        title: 'Performance Measurement',
        dur: '10 mnt',
        content: `Mengukur kinerja portofolio secara objektif adalah kunci perbaikan berkelanjutan.\n\n**Alpha:**\nAlpha = Return Portfolio − Return Benchmark (IHSG atau LQ45). Positif = outperform. Negatif = underperform.\n\n**Sharpe Ratio:**\n(Return − Risk-free rate) ÷ Standar deviasi. Sharpe >1 = good, >2 = very good.\n\n**Sortino Ratio:**\nSerupa Sharpe tapi hanya hitung downside deviation. Lebih relevan jika lebih peduli kerugian.\n\n**Attribution Analysis:**\nDari mana alpha berasal? Stock selection (pilih saham tepat) vs Sector allocation (masuk sektor tepat) vs Timing.`,
      },
      {
        id: 'M8L5',
        title: 'Rebalancing Portofolio',
        dur: '9 mnt',
        content: `Rebalancing adalah proses mengembalikan portofolio ke alokasi target secara periodik.\n\n**Mengapa Penting:**\nTanpa rebalancing: saham yang naik mendominasi → risiko naik tanpa disadari. Rebalancing: otomatis sell high, buy low!\n\n**Metode:**\nCalendar-based: setiap 6 bulan atau tahunan. Band-based: rebalance saat aset menyimpang >5% dari target. Hybrid: kombinasi keduanya.\n\n**Rebalancing saat Market Crash:**\nJika saham turun dari 70% ke 50% portofolio → rebalancing otomatis BELI saham (buy low!). Ini adalah "built-in contrarian strategy."`,
      },
      {
        id: 'M8L6',
        title: 'Investasi Pasif vs Aktif',
        dur: '10 mnt',
        content: `Debat terbesar industri asset management — mana yang lebih baik untuk investor ritel?\n\n**Passive Investing:**\nBeli dan hold index (ETF LQ45, IDX30). Biaya sangat rendah (0,1–0,3%/tahun). Tidak perlu analisis mendalam. Return = return indeks dikurangi biaya.\n\n**Active Investing:**\nPilih saham individual. Tujuan: outperform indeks. Statistik: 80%+ fund manager profesional underperform index jangka panjang.\n\n**Passive vs Active di IDX:**\nIDX kurang efisien dari NYSE → lebih banyak peluang alpha. Tapi tetap sulit konsisten outperform.\n\n**Rekomendasi Hybrid:**\nCore (60–70%): passive ETF LQ45 atau reksa dana indeks. Satellite (30–40%): active high-conviction picks.\n\n**Jack Bogle (Vanguard):**\n"In the fund business, you get what you don't pay for." Biaya rendah = alpha yang pasti.`,
      },
      {
        id: 'M8L7',
        title: 'Portofolio untuk Berbagai Tujuan',
        dur: '10 mnt',
        content: `Setiap tujuan keuangan memerlukan pendekatan portofolio berbeda.\n\n**Dana Pendidikan Anak:**\nHorizon jelas. >10 tahun: agresif (80% saham). 5–10 tahun: moderat (60% saham). <5 tahun: konservatif (30% saham).\n\n**Portofolio Pensiun — Bucket Strategy:**\nBucket 1 (0–2 tahun): cash/deposito untuk kebutuhan sehari-hari. Bucket 2 (3–10 tahun): obligasi dan saham defensif. Bucket 3 (>10 tahun): saham growth untuk jaga purchasing power.\n\n**Portofolio Passive Income:**\nFokus: dividend yield + obligasi kupon. Target: yield portfolio minimal 6–8%. Saham dividen konsisten: BBRI, PTBA, TLKM.`,
      },
      {
        id: 'M8L8',
        title: 'Portfolio Review dan Improvement',
        dur: '11 mnt',
        content: `Review portofolio sistematis adalah siklus improvement berkelanjutan.\n\n**Frekuensi Review:**\nHarian: cek berita material SAJA (bukan harga). Mingguan: update thesis jika ada berita penting. Bulanan: P&L review vs benchmark. Quarterly: rebalancing, update model keuangan. Tahunan: strategic review.\n\n**Post-Mortem Analisis:**\nSetiap exit posisi: apa yang benar, apa yang salah? Mengapa thesis benar/salah? Apa yang diperbaiki?\n\n**Kriteria Upgrade Portofolio:**\nGanti saham underperform jika fundamental memburuk ATAU ada alternatif jauh lebih baik. Jangan ganti hanya karena saham lain "naik lebih banyak."\n\n**Mindset Jangka Panjang:**\n"Pasar saham adalah mesin penciptaan kekayaan bagi yang sabar dan penghancur kekayaan bagi yang tidak sabar."`,
      },
      {
        id: 'M8L9',
        title: 'Persiapan Akhir: Siap untuk Investasi',
        dur: '10 mnt',
        content: `Checklist lengkap sebelum mulai investasi saham sungguhan.\n\n**Checklist Finansial:**\n□ Dana darurat 3–6 bulan pengeluaran sudah ada.\n□ Tidak ada utang berbunga tinggi (KTA, kartu kredit).\n□ Asuransi kesehatan aktif.\n□ Modal investasi = uang yang tidak dibutuhkan 5+ tahun.\n\n**Checklist Pengetahuan:**\n□ Bisa baca laporan keuangan dasar.\n□ Memahami analisis fundamental dan teknikal dasar.\n□ Punya IPS (Investment Policy Statement) tertulis.\n□ Menentukan profil risiko sendiri.\n\n**Checklist Operasional:**\n□ Rekening efek sudah aktif.\n□ Mengerti cara beli, jual, dan monitor portofolio di aplikasi.\n□ Stop loss dan target price sudah ditentukan sebelum beli.\n□ Jurnal investasi siap digunakan.\n\n**Kalimat Penutup:**\n"Investasi terbaik adalah investasi pada diri sendiri — pengetahuan yang telah Anda bangun dari kurikulum ini adalah fondasi untuk perjalanan investasi yang sukses."`,
      },
      {
        id: 'M8L10',
        title: 'Proyek Akhir: Simulasi Portofolio',
        dur: '30 mnt',
        content: `🏆 PROYEK AKHIR — Terapkan seluruh ilmu dari 8 modul dalam simulasi investasi komprehensif.\n\n**DELIVERABLES PROYEK:**\n\n📋 Bagian 1: Investment Policy Statement (IPS)\nTuliskan: profil investor Anda, tujuan investasi, time horizon, toleransi risiko, batasan (likuiditas, instrumen), pedoman alokasi aset, dan rules saat crash/bull market.\n\n📊 Bagian 2: Analisis Makro Top-Down\nAnalisis kondisi ekonomi Indonesia saat ini: GDP, suku bunga BI, inflasi, rupiah, sentimen IHSG. Pilih 2–3 sektor yang paling menarik dengan argumentasi.\n\n🔍 Bagian 3: 5 Saham Pilihan\nUntuk setiap saham: investment thesis (2–3 kalimat), analisis fundamental (ROE, DER, growth, moat), analisis teknikal (tren, S/R), valuasi dan target harga, stop loss level, alokasi % portofolio, dan risiko utama.\n\n⚖️ Bagian 4: Risk Management Plan\nAlokasi per saham, diversifikasi sektoral, scenario analysis (bull/base/bear case), dan contingency plan jika crash.\n\n📅 Bagian 5: Monitoring & Review Plan\nJadwal review, trigger untuk rebalancing, dan kapan thesis dievaluasi ulang.\n\n💡 Gunakan tombol "Diskusi dengan AI Tutor" di bawah untuk membantu setiap bagian proyek!`,
      },
    ],
    quiz: [], // Modul 8 = Proyek Akhir, tidak ada kuis
  },
];

// ─── QUIZ DATA ─────────────────────────────────────────────────────────────────
// (Embedded in each module above)

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function renderContent(text) {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <div key={i} style={{ height: 8 }} />;
    if (line.startsWith('**') && line.endsWith('**') && line.length > 4)
      return (
        <div
          key={i}
          style={{
            fontFamily: "'Fraunces',serif",
            fontWeight: 700,
            fontSize: 15,
            color: '#1a1a2e',
            margin: '16px 0 6px',
            borderBottom: '1px solid rgba(99,102,241,0.15)',
            paddingBottom: 4,
          }}
        >
          {line.slice(2, -2)}
        </div>
      );
    if (line.startsWith('□'))
      return (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 10,
            padding: '4px 0 4px 8px',
            fontSize: 13,
            color: '#374151',
            lineHeight: 1.7,
            alignItems: 'flex-start',
          }}
        >
          <span
            style={{
              color: '#6366f1',
              fontWeight: 700,
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            □
          </span>
          <span>{line.slice(1).trim()}</span>
        </div>
      );
    if (/^[📋📊🔍⚖️📅💡]/.test(line))
      return (
        <div
          key={i}
          style={{
            fontSize: 13,
            color: '#4b5563',
            padding: '4px 0',
            lineHeight: 1.7,
            fontWeight: 500,
          }}
        >
          {line}
        </div>
      );
    if (/^\d+\./.test(line))
      return (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 10,
            padding: '3px 0',
            fontSize: 13,
            color: '#4b5563',
            lineHeight: 1.75,
          }}
        >
          <span
            style={{
              color: '#6366f1',
              fontWeight: 700,
              minWidth: 18,
              flexShrink: 0,
            }}
          >
            {line.match(/^\d+/)[0]}.
          </span>
          <span
            dangerouslySetInnerHTML={{
              __html: line
                .replace(/^\d+\.\s*/, '')
                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        </div>
      );
    const html = line.replace(
      /\*\*([^*]+)\*\*/g,
      "<strong style='color:#1a1a2e;font-weight:600'>$1</strong>"
    );
    return (
      <p
        key={i}
        style={{
          fontSize: 13,
          color: '#6b7280',
          lineHeight: 1.85,
          margin: '2px 0',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home');
  const [activeMod, setActiveMod] = useState(null);
  const [activeLes, setActiveLes] = useState(null);
  const [completed, setCompleted] = useState(new Set());
  const [quizState, setQuizState] = useState({
    active: false,
    idx: 0,
    answers: [],
    finished: false,
  });
  const [chat, setChat] = useState([
    {
      role: 'assistant',
      content:
        'Selamat datang di EduStock! 📚 Saya tutor AI Anda — siap membantu menjelaskan konsep investasi, analisis saham IDX, atau mendampingi Proyek Akhir Anda. Mulai dari mana?',
    },
  ]);
  const [chatIn, setChatIn] = useState('');
  const [chatBusy, setChatBusy] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [aiBusy, setAiBusy] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: 9999, behavior: 'smooth' });
  }, [chat, chatBusy]);

  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const progress = Math.round((completed.size / totalLessons) * 100);

  const openLesson = (mod, les) => {
    setActiveMod(mod);
    setActiveLes(les);
    setPage('lesson');
    setQuizState({ active: false, idx: 0, answers: [], finished: false });
    window.scrollTo(0, 0);
  };

  const markDone = (id) => setCompleted((p) => new Set([...p, id]));

  const startQuiz = () =>
    setQuizState({ active: true, idx: 0, answers: [], finished: false });

  const answerQuiz = (optIdx) => {
    const qs = activeMod.quiz;
    const correct = optIdx === qs[quizState.idx].ans;
    const newAnswers = [...quizState.answers, { chosen: optIdx, correct }];
    if (quizState.idx + 1 >= qs.length) {
      const score = newAnswers.filter((a) => a.correct).length;
      setQuizState((p) => ({ ...p, answers: newAnswers, finished: true }));
      if (score >= Math.floor(qs.length * 0.8))
        markDone(`quiz_${activeMod.id}`);
    } else {
      setQuizState((p) => ({ ...p, idx: p.idx + 1, answers: newAnswers }));
    }
  };

  const sendChat = async () => {
    if (!chatIn.trim() || chatBusy) return;
    const msg = chatIn.trim();
    setChatIn('');
    setChatBusy(true);
    setChat((p) => [...p, { role: 'user', content: msg }]);
    try {
      const hist = [...chat, { role: 'user', content: msg }]
        .slice(-12)
        .map((m) => ({ role: m.role, content: m.content }));
      const reply = await callClaude(hist, AI_SYS);
      setChat((p) => [...p, { role: 'assistant', content: reply }]);
    } catch {
      setChat((p) => [
        ...p,
        { role: 'assistant', content: '⚠️ Koneksi error. Coba lagi.' },
      ]);
    }
    setChatBusy(false);
  };

  const runAI = async () => {
    if (!aiInput.trim()) return;
    setAiBusy(true);
    setAiResult('');
    try {
      const r = await callClaude([{ role: 'user', content: aiInput }], AI_SYS);
      setAiResult(r);
    } catch {
      setAiResult('Gagal. Coba lagi.');
    }
    setAiBusy(false);
  };

  const LevelBadge = ({ level }) => {
    const colors = {
      Pemula: '#10b981',
      Menengah: '#f59e0b',
      Lanjutan: '#ef4444',
    };
    return (
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          padding: '3px 9px',
          borderRadius: 20,
          background: `${colors[level]}18`,
          color: colors[level],
          border: `1px solid ${colors[level]}40`,
        }}
      >
        {level}
      </span>
    );
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,700&display=swap');
       *{box-sizing:border-box;margin:0;padding:0}
       html{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px}
        *{box-sizing:border-box;margin:0;padding:0}
        html{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:#f1f5f9}
        ::-webkit-scrollbar-thumb{background:#c7d2fe;border-radius:3px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes shimmer{0%{background-position:-200px 0}100%{background-position:200px 0}}
        .fade{animation:fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both}
        .card-h{transition:all 0.2s ease;cursor:pointer}
        .card-h:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(99,102,241,0.12)!important}
        .btn-h{transition:all 0.18s ease}
        .btn-h:hover{filter:brightness(1.08);transform:translateY(-1px)}
        .nav-h:hover{background:rgba(99,102,241,0.08)!important;color:#4f46e5!important}
        .lesson-r:hover{background:#f5f3ff!important;cursor:pointer}
        .opt-b:hover{border-color:#6366f1!important;background:#eef2ff!important;transform:translateX(4px)}
        .opt-b{transition:all 0.15s}
        textarea{caret-color:#6366f1}
        input{caret-color:#6366f1}
        a{text-decoration:none;color:inherit}
      `}</style>

      <div
        style={{
          background: '#fafafa',
          color: '#1a1a2e',
          minHeight: '100vh',
          fontFamily: "'Plus Jakarta Sans',sans-serif",
        }}
      >
        {/* ── HEADER ───────────────────────────────────────────────────────── */}
        <header
          style={{
            background: 'rgba(255,255,255,0.97)',
            borderBottom: '1px solid rgba(99,102,241,0.12)',
            position: 'sticky',
            top: 0,
            zIndex: 200,
            backdropFilter: 'blur(12px)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              padding: '0 24px',
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
              }}
              onClick={() => setPage('home')}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  borderRadius: 11,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
                }}
              >
                📈
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Fraunces',serif",
                    fontWeight: 900,
                    fontSize: 19,
                    color: '#1a1a2e',
                    lineHeight: 1.1,
                  }}
                >
                  EduStock
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: '#a5b4fc',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  Septarius Education
                </div>
              </div>
            </div>

            <nav style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {[
                ['home', '🏠 Beranda'],
                ['modul', '📚 Modul'],
                ['analisis', '🔍 Analisis AI'],
                ['chat', '💬 Tutor AI'],
                ['kontak', '📬 Kontak'],
              ].map(([id, lb]) => (
                <button
                  key={id}
                  className="nav-h"
                  onClick={() => setPage(id)}
                  style={{
                    background:
                      page === id ? 'rgba(99,102,241,0.1)' : 'transparent',
                    color: page === id ? '#4f46e5' : '#6b7280',
                    border: 'none',
                    borderRadius: 8,
                    padding: '7px 14px',
                    fontSize: 12,
                    fontWeight: page === id ? 700 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {lb}
                  {id === 'chat' && (
                    <span
                      style={{
                        marginLeft: 4,
                        background: '#6366f1',
                        color: '#fff',
                        borderRadius: 4,
                        fontSize: 9,
                        padding: '1px 5px',
                        fontWeight: 800,
                      }}
                    >
                      AI
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: '#f0f0ff',
                borderRadius: 20,
                padding: '6px 14px',
                border: '1px solid #c7d2fe',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 5,
                  background: '#e0e7ff',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
                    transition: 'width 0.6s ease',
                    borderRadius: 3,
                  }}
                />
              </div>
              <span style={{ fontSize: 11, color: '#6366f1', fontWeight: 700 }}>
                {progress}%
              </span>
            </div>
          </div>
        </header>

        <main
          style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px' }}
        >
          {/* ═══════════════════════════════════════════════════════════════
              HOME PAGE
          ═══════════════════════════════════════════════════════════════ */}
          {page === 'home' && (
            <div className="fade">
              {/* Hero */}
              <div
                style={{
                  background:
                    'linear-gradient(135deg,#1a1a2e 0%,#16213e 40%,#0f3460 70%,#1a1a2e 100%)',
                  borderRadius: 24,
                  padding: '52px 56px 48px',
                  marginBottom: 28,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -60,
                    right: -60,
                    width: 320,
                    height: 320,
                    background:
                      'radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: -80,
                    left: 200,
                    width: 240,
                    height: 240,
                    background:
                      'radial-gradient(circle,rgba(139,92,246,0.15) 0%,transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ position: 'relative', maxWidth: 620 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'rgba(99,102,241,0.2)',
                      border: '1px solid rgba(165,180,252,0.3)',
                      borderRadius: 20,
                      padding: '5px 14px',
                      marginBottom: 22,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        background: '#a5b4fc',
                        borderRadius: '50%',
                        animation: 'pulse 2s infinite',
                        display: 'inline-block',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        color: '#c7d2fe',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                      }}
                    >
                      PLATFORM EDUKASI SAHAM
                    </span>
                  </div>
                  <h1
                    style={{
                      fontFamily: "'Fraunces',serif",
                      fontWeight: 900,
                      fontSize: 42,
                      color: '#f8fafc',
                      lineHeight: 1.15,
                      marginBottom: 16,
                    }}
                  >
                    Kuasai Investasi Saham
                    <br />
                    <em style={{ color: '#a5b4fc', fontStyle: 'italic' }}>
                      Dari Nol Hingga Mahir
                    </em>
                  </h1>
                  <p
                    style={{
                      fontSize: 15,
                      color: '#94a3b8',
                      lineHeight: 1.75,
                      marginBottom: 30,
                    }}
                  >
                    8 modul terstruktur · 80 materi lengkap · 105 soal kuis ·
                    Tutor AI 24/7.
                    <br />
                    Belajar analisis fundamental, teknikal, psikologi investasi,
                    dan bangun portofolio nyata.
                  </p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button
                      className="btn-h"
                      onClick={() => setPage('modul')}
                      style={{
                        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 12,
                        padding: '13px 28px',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 6px 20px rgba(99,102,241,0.4)',
                      }}
                    >
                      🚀 Mulai Belajar
                    </button>
                    <button
                      className="btn-h"
                      onClick={() => setPage('chat')}
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        color: '#e2e8f0',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 12,
                        padding: '13px 28px',
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      💬 Tanya Tutor AI
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4,1fr)',
                  gap: 16,
                  marginBottom: 28,
                }}
              >
                {[
                  {
                    icon: '📚',
                    val: '8',
                    label: 'Modul Lengkap',
                    color: '#6366f1',
                  },
                  {
                    icon: '📖',
                    val: '80',
                    label: 'Total Materi',
                    color: '#10b981',
                  },
                  {
                    icon: '🎯',
                    val: '105',
                    label: 'Soal Kuis',
                    color: '#f59e0b',
                  },
                  {
                    icon: '🤖',
                    val: 'AI',
                    label: 'Tutor Interaktif',
                    color: '#8b5cf6',
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="card-h"
                    onClick={() => setPage(i < 3 ? 'modul' : 'chat')}
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(99,102,241,0.1)',
                      borderRadius: 16,
                      padding: '22px 20px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ fontSize: 26, marginBottom: 8 }}>
                      {s.icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Fraunces',serif",
                        fontWeight: 700,
                        fontSize: 30,
                        color: s.color,
                      }}
                    >
                      {s.val}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#94a3b8',
                        marginTop: 3,
                        fontWeight: 500,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Module Overview */}
              <h2
                style={{
                  fontFamily: "'Fraunces',serif",
                  fontWeight: 700,
                  fontSize: 24,
                  color: '#1a1a2e',
                  marginBottom: 18,
                }}
              >
                Kurikulum 8 Modul
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  gap: 16,
                  marginBottom: 28,
                }}
              >
                {MODULES.map((mod) => {
                  const done = mod.lessons.filter((l) =>
                    completed.has(l.id)
                  ).length;
                  return (
                    <div
                      key={mod.id}
                      className="card-h"
                      style={{
                        background: '#fff',
                        border: `1px solid rgba(99,102,241,0.1)`,
                        borderRadius: 16,
                        padding: 22,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      }}
                      onClick={() => setPage('modul')}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                          }}
                        >
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              background: `${mod.color}18`,
                              borderRadius: 13,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 22,
                            }}
                          >
                            {mod.icon}
                          </div>
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                marginBottom: 3,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: '#a5b4fc',
                                  letterSpacing: '0.1em',
                                }}
                              >
                                MODUL {mod.num}
                              </span>
                              <LevelBadge level={mod.level} />
                            </div>
                            <h3
                              style={{
                                fontFamily: "'Fraunces',serif",
                                fontWeight: 700,
                                fontSize: 15,
                                color: '#1a1a2e',
                              }}
                            >
                              {mod.title}
                            </h3>
                          </div>
                        </div>
                        <span
                          style={{
                            fontFamily: "'Fraunces',serif",
                            fontWeight: 700,
                            fontSize: 18,
                            color: mod.color,
                          }}
                        >
                          {done}/{mod.lessons.length}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          color: '#94a3b8',
                          lineHeight: 1.6,
                          marginBottom: 12,
                        }}
                      >
                        {mod.desc}
                      </p>
                      <div
                        style={{
                          height: 4,
                          background: '#f1f5f9',
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${(done / mod.lessons.length) * 100}%`,
                            height: '100%',
                            background: `linear-gradient(90deg,${mod.color},${mod.color}99)`,
                            borderRadius: 2,
                            transition: 'width 0.6s ease',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AI Features */}
              <div
                style={{
                  background: '#fff',
                  border: '1px solid rgba(99,102,241,0.12)',
                  borderRadius: 20,
                  padding: 28,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                    }}
                  >
                    🤖
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Fraunces',serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: '#1a1a2e',
                      }}
                    >
                      Fitur AI Tutor EduStock
                    </div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>
                      Tanyakan apa saja — tersedia 24/7
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3,1fr)',
                    gap: 14,
                    marginTop: 18,
                  }}
                >
                  {[
                    {
                      icon: '🔍',
                      title: 'Analisis Saham AI',
                      desc: 'Analisis fundamental & teknikal saham IDX apa saja',
                      page: 'analisis',
                    },
                    {
                      icon: '💬',
                      title: 'Chat Tutor',
                      desc: 'Diskusi bebas soal investasi, minta penjelasan ulang',
                      page: 'chat',
                    },
                    {
                      icon: '🏆',
                      title: 'Proyek Akhir',
                      desc: 'Dampingi AI untuk selesaikan simulasi portofolio',
                      page: 'modul',
                    },
                  ].map((f, i) => (
                    <div
                      key={i}
                      className="card-h"
                      style={{
                        background: '#f8f7ff',
                        border: '1px solid rgba(99,102,241,0.12)',
                        borderRadius: 12,
                        padding: 18,
                      }}
                      onClick={() => setPage(f.page)}
                    >
                      <div style={{ fontSize: 26, marginBottom: 10 }}>
                        {f.icon}
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: '#1a1a2e',
                          marginBottom: 5,
                        }}
                      >
                        {f.title}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: '#94a3b8',
                          lineHeight: 1.6,
                        }}
                      >
                        {f.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              MODUL LIST PAGE
          ═══════════════════════════════════════════════════════════════ */}
          {page === 'modul' && (
            <div className="fade">
              <div style={{ marginBottom: 24 }}>
                <h1
                  style={{
                    fontFamily: "'Fraunces',serif",
                    fontWeight: 700,
                    fontSize: 28,
                    color: '#1a1a2e',
                    marginBottom: 6,
                  }}
                >
                  📚 Modul Pembelajaran
                </h1>
                <p style={{ fontSize: 14, color: '#6b7280' }}>
                  Ikuti setiap modul secara berurutan untuk hasil pembelajaran
                  terbaik.
                </p>
              </div>

              {MODULES.map((mod) => {
                const done = mod.lessons.filter((l) =>
                  completed.has(l.id)
                ).length;
                const quizDone = completed.has(`quiz_${mod.id}`);
                return (
                  <div
                    key={mod.id}
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(99,102,241,0.1)',
                      borderRadius: 18,
                      overflow: 'hidden',
                      marginBottom: 20,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Module Header */}
                    <div
                      style={{
                        padding: '22px 26px',
                        borderBottom: '1px solid #f1f5f9',
                        background: `linear-gradient(135deg,${mod.color}08 0%,transparent 60%)`,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                        }}
                      >
                        <div
                          style={{
                            width: 56,
                            height: 56,
                            background: `${mod.color}15`,
                            borderRadius: 15,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 26,
                          }}
                        >
                          {mod.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              marginBottom: 5,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 800,
                                color: mod.color,
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                              }}
                            >
                              MODUL {mod.num}
                            </span>
                            <LevelBadge level={mod.level} />
                            {quizDone && (
                              <span
                                style={{
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: '#10b981',
                                  background: '#d1fae5',
                                  padding: '2px 8px',
                                  borderRadius: 10,
                                }}
                              >
                                ✓ Kuis Selesai
                              </span>
                            )}
                          </div>
                          <h2
                            style={{
                              fontFamily: "'Fraunces',serif",
                              fontWeight: 700,
                              fontSize: 18,
                              color: '#1a1a2e',
                            }}
                          >
                            {mod.title}
                          </h2>
                          <p
                            style={{
                              fontSize: 12,
                              color: '#94a3b8',
                              marginTop: 3,
                            }}
                          >
                            {mod.desc}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div
                            style={{
                              fontFamily: "'Fraunces',serif",
                              fontWeight: 700,
                              fontSize: 22,
                              color: mod.color,
                            }}
                          >
                            {done}/{mod.lessons.length}
                          </div>
                          <div style={{ fontSize: 11, color: '#94a3b8' }}>
                            materi selesai
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: 14,
                          height: 5,
                          background: '#f1f5f9',
                          borderRadius: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${(done / mod.lessons.length) * 100}%`,
                            height: '100%',
                            background: `linear-gradient(90deg,${mod.color},${mod.color}80)`,
                            borderRadius: 3,
                            transition: 'width 0.6s ease',
                          }}
                        />
                      </div>
                    </div>

                    {/* Lesson List */}
                    {mod.lessons.map((les, i) => {
                      const isDone = completed.has(les.id);
                      return (
                        <div
                          key={les.id}
                          className="lesson-r"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            padding: '13px 26px',
                            borderBottom:
                              i < mod.lessons.length - 1
                                ? '1px solid #f8fafc'
                                : 'none',
                            transition: 'background 0.15s',
                          }}
                          onClick={() => openLesson(mod, les)}
                        >
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 9,
                              flexShrink: 0,
                              background: isDone ? '#d1fae5' : '#f1f5f9',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 13,
                              fontWeight: 700,
                              color: isDone ? '#059669' : '#94a3b8',
                            }}
                          >
                            {isDone ? '✓' : i + 1}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: '#374151',
                                marginBottom: 1,
                              }}
                            >
                              {les.title}
                            </div>
                            <div style={{ fontSize: 11, color: '#94a3b8' }}>
                              ⏱ {les.dur}
                            </div>
                          </div>
                          {isDone && (
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: '#059669',
                                background: '#d1fae5',
                                padding: '2px 8px',
                                borderRadius: 8,
                              }}
                            >
                              Selesai
                            </span>
                          )}
                          <span style={{ fontSize: 18, color: '#d1d5db' }}>
                            ›
                          </span>
                        </div>
                      );
                    })}

                    {/* Quiz CTA */}
                    {mod.quiz && mod.quiz.length > 0 && (
                      <div
                        style={{
                          padding: '16px 26px',
                          background: '#f8f7ff',
                          borderTop: '1px solid #f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: 10,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: '#4f46e5',
                            }}
                          >
                            🎯 Kuis Modul: {mod.quiz.length} Soal
                          </div>
                          <div style={{ fontSize: 11, color: '#94a3b8' }}>
                            Selesaikan semua materi lalu uji pemahaman Anda
                          </div>
                        </div>
                        <button
                          className="btn-h"
                          onClick={() => {
                            setActiveMod(mod);
                            setActiveLes(null);
                            setPage('quiz');
                            setQuizState({
                              active: true,
                              idx: 0,
                              answers: [],
                              finished: false,
                            });
                          }}
                          style={{
                            background: `linear-gradient(135deg,${mod.color},${mod.color}cc)`,
                            color: '#fff',
                            border: 'none',
                            borderRadius: 10,
                            padding: '9px 20px',
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: `0 4px 12px ${mod.color}40`,
                          }}
                        >
                          {quizDone ? '🔄 Ulangi Kuis' : '🧠 Mulai Kuis'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              LESSON VIEW
          ═══════════════════════════════════════════════════════════════ */}
          {page === 'lesson' && activeLes && (
            <div className="fade" style={{ maxWidth: 820, margin: '0 auto' }}>
              {/* Breadcrumb */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 12,
                  color: '#94a3b8',
                  marginBottom: 20,
                }}
              >
                <span
                  style={{ cursor: 'pointer', color: '#6b7280' }}
                  onClick={() => setPage('modul')}
                >
                  Modul
                </span>
                <span>›</span>
                <span style={{ color: activeMod.color, fontWeight: 600 }}>
                  {activeMod.title}
                </span>
                <span>›</span>
                <span style={{ color: '#1a1a2e', fontWeight: 600 }}>
                  {activeLes.title}
                </span>
              </div>

              <div
                style={{
                  background: '#fff',
                  border: '1px solid rgba(99,102,241,0.1)',
                  borderRadius: 22,
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    padding: '26px 32px',
                    borderBottom: '1px solid #f1f5f9',
                    background: `linear-gradient(135deg,${activeMod.color}10 0%,transparent 70%)`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <LevelBadge level={activeMod.level} />
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>
                      ⏱ {activeLes.dur}
                    </span>
                    {completed.has(activeLes.id) && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#059669',
                          background: '#d1fae5',
                          padding: '2px 9px',
                          borderRadius: 10,
                        }}
                      >
                        ✓ Selesai
                      </span>
                    )}
                  </div>
                  <h1
                    style={{
                      fontFamily: "'Fraunces',serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: '#1a1a2e',
                    }}
                  >
                    {activeLes.title}
                  </h1>
                </div>

                {/* Content */}
                <div style={{ padding: '28px 32px', lineHeight: 1.85 }}>
                  {renderContent(activeLes.content)}
                </div>

                {/* Actions */}
                <div
                  style={{
                    padding: '18px 32px',
                    borderTop: '1px solid #f1f5f9',
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    background: '#fafafa',
                  }}
                >
                  {!completed.has(activeLes.id) && (
                    <button
                      className="btn-h"
                      onClick={() => markDone(activeLes.id)}
                      style={{
                        background: 'linear-gradient(135deg,#10b981,#059669)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 10,
                        padding: '11px 22px',
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                      }}
                    >
                      ✓ Tandai Selesai
                    </button>
                  )}
                  <button
                    className="btn-h"
                    onClick={() => {
                      setChatIn(
                        `Jelaskan lebih lanjut materi "${activeLes.title}"`
                      );
                      setPage('chat');
                    }}
                    style={{
                      background: '#f0f0ff',
                      color: '#6366f1',
                      border: '1px solid #c7d2fe',
                      borderRadius: 10,
                      padding: '11px 20px',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    💬 Tanya AI
                  </button>
                  <button
                    onClick={() => setPage('modul')}
                    style={{
                      background: 'none',
                      color: '#94a3b8',
                      border: 'none',
                      padding: '11px 14px',
                      fontSize: 13,
                      cursor: 'pointer',
                      marginLeft: 'auto',
                    }}
                  >
                    ← Kembali
                  </button>
                </div>
              </div>

              {/* Next Lesson */}
              {(() => {
                const lessons = activeMod.lessons;
                const idx = lessons.findIndex((l) => l.id === activeLes.id);
                const next = lessons[idx + 1];
                return next ? (
                  <div
                    className="card-h"
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(99,102,241,0.1)',
                      borderRadius: 14,
                      padding: '14px 20px',
                      marginTop: 16,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                    onClick={() => openLesson(activeMod, next)}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        background: `${activeMod.color}18`,
                        borderRadius: 9,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: 13,
                        color: activeMod.color,
                      }}
                    >
                      {idx + 2}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>
                        Materi Berikutnya
                      </div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: '#1a1a2e',
                        }}
                      >
                        {next.title}
                      </div>
                    </div>
                    <span style={{ fontSize: 18, color: `${activeMod.color}` }}>
                      →
                    </span>
                  </div>
                ) : null;
              })()}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              QUIZ PAGE
          ═══════════════════════════════════════════════════════════════ */}
          {page === 'quiz' && activeMod && activeMod.quiz.length > 0 && (
            <div className="fade" style={{ maxWidth: 720, margin: '0 auto' }}>
              <div
                style={{
                  background: '#fff',
                  border: '1px solid rgba(99,102,241,0.1)',
                  borderRadius: 22,
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                {!quizState.finished ? (
                  <>
                    <div
                      style={{
                        padding: '22px 28px',
                        borderBottom: '1px solid #f1f5f9',
                        background: `linear-gradient(135deg,${activeMod.color}12,transparent 70%)`,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: activeMod.color,
                              textTransform: 'uppercase',
                              letterSpacing: '0.1em',
                              marginBottom: 4,
                            }}
                          >
                            🎯 Kuis Modul {activeMod.num}: {activeMod.title}
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: '#374151',
                            }}
                          >
                            Soal {quizState.idx + 1} dari{' '}
                            {activeMod.quiz.length}
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>
                          {Math.round(
                            (quizState.idx / activeMod.quiz.length) * 100
                          )}
                          % selesai
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: 12,
                          height: 5,
                          background: '#f1f5f9',
                          borderRadius: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${
                              (quizState.idx / activeMod.quiz.length) * 100
                            }%`,
                            height: '100%',
                            background: `linear-gradient(90deg,${activeMod.color},${activeMod.color}aa)`,
                            borderRadius: 3,
                            transition: 'width 0.4s ease',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ padding: '28px' }}>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: '#1a1a2e',
                          lineHeight: 1.65,
                          marginBottom: 22,
                        }}
                      >
                        {activeMod.quiz[quizState.idx].q}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 10,
                        }}
                      >
                        {activeMod.quiz[quizState.idx].opts.map((opt, i) => (
                          <button
                            key={i}
                            className="opt-b"
                            onClick={() => answerQuiz(i)}
                            style={{
                              textAlign: 'left',
                              background: '#fafafa',
                              border: '1.5px solid #e5e7eb',
                              borderRadius: 12,
                              padding: '13px 18px',
                              fontSize: 13,
                              color: '#374151',
                              fontFamily: "'Plus Jakarta Sans',sans-serif",
                              fontWeight: 500,
                              cursor: 'pointer',
                            }}
                          >
                            <span
                              style={{
                                fontWeight: 700,
                                color: '#94a3b8',
                                marginRight: 10,
                              }}
                            >
                              {String.fromCharCode(65 + i)}.
                            </span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ padding: '40px 32px', textAlign: 'center' }}>
                    <div style={{ fontSize: 52, marginBottom: 12 }}>
                      {quizState.answers.filter((a) => a.correct).length >=
                      Math.floor(activeMod.quiz.length * 0.8)
                        ? '🎉'
                        : '💪'}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Fraunces',serif",
                        fontWeight: 700,
                        fontSize: 24,
                        color:
                          quizState.answers.filter((a) => a.correct).length >=
                          Math.floor(activeMod.quiz.length * 0.8)
                            ? '#059669'
                            : '#dc2626',
                        marginBottom: 8,
                      }}
                    >
                      Skor: {quizState.answers.filter((a) => a.correct).length}/
                      {activeMod.quiz.length} (
                      {Math.round(
                        (quizState.answers.filter((a) => a.correct).length /
                          activeMod.quiz.length) *
                          100
                      )}
                      %)
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: '#6b7280',
                        marginBottom: 24,
                      }}
                    >
                      {quizState.answers.filter((a) => a.correct).length >=
                      Math.floor(activeMod.quiz.length * 0.8)
                        ? 'Luar biasa! Anda menguasai materi ini dengan baik. ✓'
                        : 'Baca ulang materi lalu coba lagi untuk memperkuat pemahaman.'}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: 10,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      <button
                        className="btn-h"
                        onClick={() =>
                          setQuizState({
                            active: true,
                            idx: 0,
                            answers: [],
                            finished: false,
                          })
                        }
                        style={{
                          background: '#f0f0ff',
                          color: '#6366f1',
                          border: '1px solid #c7d2fe',
                          borderRadius: 10,
                          padding: '10px 20px',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        🔄 Ulangi Kuis
                      </button>
                      <button
                        className="btn-h"
                        onClick={() => setPage('modul')}
                        style={{
                          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 10,
                          padding: '10px 22px',
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
                        }}
                      >
                        Lanjut Modul →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              ANALISIS AI PAGE
          ═══════════════════════════════════════════════════════════════ */}
          {page === 'analisis' && (
            <div className="fade" style={{ maxWidth: 860, margin: '0 auto' }}>
              <div style={{ marginBottom: 24 }}>
                <h1
                  style={{
                    fontFamily: "'Fraunces',serif",
                    fontWeight: 700,
                    fontSize: 28,
                    color: '#1a1a2e',
                    marginBottom: 6,
                  }}
                >
                  🔍 Analisis Saham dengan AI
                </h1>
                <p style={{ fontSize: 14, color: '#6b7280' }}>
                  Masukkan nama/kode saham atau pertanyaan analisis — AI
                  memberikan penjelasan edukatif lengkap.
                </p>
              </div>

              <div
                style={{
                  background: '#fff',
                  border: '1px solid rgba(99,102,241,0.12)',
                  borderRadius: 18,
                  padding: 24,
                  marginBottom: 20,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                }}
              >
                <textarea
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Contoh: Analisis fundamental BBCA | Jelaskan cara membaca P/E ratio | Bagaimana strategi DCA untuk pemula? | Apa itu economic moat?"
                  style={{
                    width: '100%',
                    background: '#f8f7ff',
                    border: '1.5px solid #e0e7ff',
                    borderRadius: 12,
                    padding: '12px 14px',
                    fontSize: 13,
                    color: '#1a1a2e',
                    resize: 'none',
                    outline: 'none',
                    lineHeight: 1.65,
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    minHeight: 80,
                    marginBottom: 14,
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    flexWrap: 'wrap',
                    marginBottom: 16,
                  }}
                >
                  {[
                    'Analisis fundamental BBCA',
                    'Cara membaca P/E ratio',
                    'Apa itu value investing?',
                    'Jelaskan DCF dengan contoh',
                    'Strategi DCA untuk pemula',
                    'Cara menghitung margin of safety',
                    'Analisis saham GOTO',
                    'Perbedaan saham growth vs value',
                  ].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setAiInput(q)}
                      style={{
                        background: aiInput === q ? '#eef2ff' : '#f8f7ff',
                        color: aiInput === q ? '#6366f1' : '#6b7280',
                        border:
                          aiInput === q
                            ? '1px solid #c7d2fe'
                            : '1px solid #e5e7eb',
                        borderRadius: 20,
                        padding: '5px 12px',
                        fontSize: 11,
                        cursor: 'pointer',
                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                        fontWeight: 500,
                        transition: 'all 0.15s',
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <button
                  className="btn-h"
                  onClick={runAI}
                  disabled={aiBusy || !aiInput.trim()}
                  style={{
                    background:
                      aiInput.trim() && !aiBusy
                        ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                        : '#e5e7eb',
                    color: aiInput.trim() && !aiBusy ? '#fff' : '#94a3b8',
                    border: 'none',
                    borderRadius: 11,
                    padding: '12px 28px',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: aiInput.trim() && !aiBusy ? 'pointer' : 'default',
                    boxShadow:
                      aiInput.trim() && !aiBusy
                        ? '0 4px 14px rgba(99,102,241,0.35)'
                        : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {aiBusy ? '⏳ Menganalisis...' : '🔍 Analisis dengan AI'}
                </button>
              </div>

              {(aiBusy || aiResult) && (
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(99,102,241,0.12)',
                    borderRadius: 18,
                    padding: 28,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 18,
                      paddingBottom: 14,
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                      }}
                    >
                      🤖
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: '#1a1a2e',
                        }}
                      >
                        Tutor AI EduStock
                      </div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>
                        Analisis Edukatif Saham IDX
                      </div>
                    </div>
                    {aiBusy && (
                      <div
                        style={{
                          marginLeft: 'auto',
                          width: 20,
                          height: 20,
                          border: '2px solid #e0e7ff',
                          borderTopColor: '#6366f1',
                          borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite',
                        }}
                      />
                    )}
                  </div>
                  {aiBusy ? (
                    <div
                      style={{
                        display: 'flex',
                        gap: 5,
                        padding: '16px 0',
                        alignItems: 'center',
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#6366f1',
                            animation: `pulse 1.2s ${i * 0.18}s infinite`,
                          }}
                        />
                      ))}
                      <span
                        style={{
                          marginLeft: 10,
                          color: '#94a3b8',
                          fontSize: 13,
                        }}
                      >
                        AI sedang menganalisis...
                      </span>
                    </div>
                  ) : (
                    <div style={{ lineHeight: 1.85 }}>
                      {renderContent(aiResult)}
                    </div>
                  )}
                </div>
              )}

              {!aiResult && !aiBusy && (
                <div
                  style={{
                    background: '#fff',
                    border: '2px dashed #e0e7ff',
                    borderRadius: 18,
                    padding: 48,
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      marginBottom: 14,
                      animation: 'float 3s ease-in-out infinite',
                    }}
                  >
                    🔍
                  </div>
                  <div
                    style={{
                      fontFamily: "'Fraunces',serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#1a1a2e',
                      marginBottom: 8,
                    }}
                  >
                    Tanyakan Apa Saja tentang Saham IDX
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: '#94a3b8',
                      maxWidth: 400,
                      margin: '0 auto',
                    }}
                  >
                    Analisis fundamental, teknikal, valuasi, strategi
                    portofolio, atau konsep investasi — AI siap membantu.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              CHAT AI PAGE
          ═══════════════════════════════════════════════════════════════ */}
          {page === 'chat' && (
            <div className="fade" style={{ maxWidth: 820, margin: '0 auto' }}>
              <div style={{ marginBottom: 20 }}>
                <h1
                  style={{
                    fontFamily: "'Fraunces',serif",
                    fontWeight: 700,
                    fontSize: 28,
                    color: '#1a1a2e',
                    marginBottom: 6,
                  }}
                >
                  💬 Tutor AI
                </h1>
                <p style={{ fontSize: 14, color: '#6b7280' }}>
                  Diskusi langsung seperti punya mentor investasi pribadi.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 260px',
                  gap: 18,
                  alignItems: 'start',
                }}
              >
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(99,102,241,0.12)',
                    borderRadius: 18,
                    overflow: 'hidden',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    style={{
                      padding: '14px 18px',
                      borderBottom: '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      background: '#faf9ff',
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                        borderRadius: 11,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                      }}
                    >
                      🤖
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: '#1a1a2e',
                        }}
                      >
                        Tutor AI EduStock
                      </div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>
                        Spesialis Edukasi Saham 
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        fontSize: 11,
                        color: '#10b981',
                      }}
                    >
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          background: '#10b981',
                          borderRadius: '50%',
                          animation: 'pulse 2s infinite',
                          display: 'inline-block',
                        }}
                      />
                      Online
                    </div>
                  </div>

                  <div
                    ref={chatRef}
                    style={{
                      height: 440,
                      overflowY: 'auto',
                      padding: 18,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    {chat.map((m, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems:
                            m.role === 'user' ? 'flex-end' : 'flex-start',
                          gap: 4,
                        }}
                      >
                        {m.role === 'assistant' && (
                          <div
                            style={{
                              fontSize: 10,
                              color: '#94a3b8',
                              paddingLeft: 2,
                            }}
                          >
                            🤖 Tutor AI
                          </div>
                        )}
                        <div
                          style={{
                            maxWidth: '85%',
                            background:
                              m.role === 'user'
                                ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                                : '#f8f7ff',
                            border:
                              m.role === 'user' ? 'none' : '1px solid #e0e7ff',
                            color: m.role === 'user' ? '#fff' : '#4b5563',
                            borderRadius:
                              m.role === 'user'
                                ? '18px 18px 4px 18px'
                                : '18px 18px 18px 4px',
                            padding: '11px 16px',
                            fontSize: 13,
                            lineHeight: 1.75,
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {m.role === 'assistant'
                            ? renderContent(m.content)
                            : m.content}
                        </div>
                      </div>
                    ))}
                    {chatBusy && (
                      <div
                        style={{
                          alignSelf: 'flex-start',
                          background: '#f8f7ff',
                          border: '1px solid #e0e7ff',
                          borderRadius: '18px 18px 18px 4px',
                          padding: '12px 16px',
                          display: 'flex',
                          gap: 5,
                          alignItems: 'center',
                        }}
                      >
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: '50%',
                              background: '#6366f1',
                              animation: `pulse 1.2s ${i * 0.18}s infinite`,
                            }}
                          />
                        ))}
                        <span
                          style={{
                            marginLeft: 8,
                            fontSize: 12,
                            color: '#94a3b8',
                          }}
                        >
                          Sedang menjawab...
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      padding: '10px 14px',
                      borderTop: '1px solid #f1f5f9',
                      display: 'flex',
                      gap: 10,
                      alignItems: 'flex-end',
                      background: '#faf9ff',
                    }}
                  >
                    <textarea
                      rows={2}
                      value={chatIn}
                      onChange={(e) => setChatIn(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendChat();
                        }
                      }}
                      placeholder="Ketik pertanyaan... (Enter kirim, Shift+Enter baris baru)"
                      style={{
                        flex: 1,
                        background: '#fff',
                        border: '1.5px solid #e0e7ff',
                        borderRadius: 10,
                        padding: '10px 12px',
                        fontSize: 13,
                        color: '#1a1a2e',
                        resize: 'none',
                        outline: 'none',
                        lineHeight: 1.6,
                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                      }}
                    />
                    <button
                      className="btn-h"
                      onClick={sendChat}
                      disabled={!chatIn.trim() || chatBusy}
                      style={{
                        background:
                          chatIn.trim() && !chatBusy
                            ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                            : '#e5e7eb',
                        color: chatIn.trim() && !chatBusy ? '#fff' : '#94a3b8',
                        border: 'none',
                        borderRadius: 10,
                        padding: '10px 18px',
                        fontSize: 13,
                        fontWeight: 700,
                        cursor:
                          chatIn.trim() && !chatBusy ? 'pointer' : 'default',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      Kirim ↗
                    </button>
                  </div>
                </div>

                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
                >
                  <div
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(99,102,241,0.12)',
                      borderRadius: 14,
                      padding: 18,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#6366f1',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: 12,
                      }}
                    >
                      💡 Pertanyaan Populer
                    </div>
                    {[
                      'Apa itu P/E ratio dan cara membacanya?',
                      'Jelaskan analisis fundamental vs teknikal',
                      'Cara menghitung nilai wajar saham?',
                      'Strategi investasi pemula modal kecil?',
                      'Apa itu support dan resistance?',
                      'Cara kerja Dollar Cost Averaging?',
                      'Apa yang dimaksud economic moat?',
                      'Kenapa diversifikasi penting?',
                    ].map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setChatIn(q)}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          background: '#f8f7ff',
                          border: '1px solid #e0e7ff',
                          borderRadius: 8,
                          padding: '8px 11px',
                          cursor: 'pointer',
                          color: '#6b7280',
                          fontSize: 11,
                          marginBottom: 5,
                          lineHeight: 1.55,
                          transition: 'all 0.15s',
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                        }}
                      >
                        💬 {q}
                      </button>
                    ))}
                  </div>

                  <div
                    style={{
                      background: '#f0f7ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: 14,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#1d4ed8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 8,
                      }}
                    >
                      💡 Tips Belajar
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: '#1e40af',
                        lineHeight: 1.7,
                      }}
                    >
                      Setelah membaca modul, langsung tanyakan ke AI untuk
                      contoh nyata dari saham IDX. Pembelajaran aktif jauh lebih
                      efektif dari sekadar membaca.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              KONTAK PAGE
          ═══════════════════════════════════════════════════════════════ */}
          {page === 'kontak' && (
            <div className="fade" style={{ maxWidth: 760, margin: '0 auto' }}>
              <div
                style={{
                  background: '#fff',
                  border: '1px solid rgba(99,102,241,0.12)',
                  borderRadius: 22,
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                {/* Hero */}
                <div
                  style={{
                    background:
                      'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',
                    padding: '44px 40px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -40,
                      right: -40,
                      width: 200,
                      height: 200,
                      background:
                        'radial-gradient(circle,rgba(99,102,241,0.2),transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                      borderRadius: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 36,
                      margin: '0 auto 20px',
                      boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
                      animation: 'float 3s ease-in-out infinite',
                    }}
                  >
                    👤
                  </div>
                  <div
                    style={{
                      fontFamily: "'Fraunces',serif",
                      fontWeight: 900,
                      fontSize: 28,
                      color: '#f8fafc',
                      marginBottom: 6,
                    }}
                  >
                    Septarius Pius
                  </div>
                  <div
                    style={{ fontSize: 13, color: '#a5b4fc', marginBottom: 16 }}
                  >
                    Founder & Chief Learning Officer — EduStock by Septarius
                    Education
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'rgba(99,102,241,0.2)',
                      border: '1px solid rgba(165,180,252,0.3)',
                      borderRadius: 20,
                      padding: '6px 16px',
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        background: '#10b981',
                        borderRadius: '50%',
                        animation: 'pulse 2s infinite',
                        display: 'inline-block',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        color: '#c7d2fe',
                        fontWeight: 600,
                      }}
                    >
                      Tersedia untuk konsultasi & kolaborasi
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <div
                  style={{
                    padding: '32px 40px',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Fraunces',serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#1a1a2e',
                      marginBottom: 12,
                    }}
                  >
                    Tentang EduStock
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: '#6b7280',
                      lineHeight: 1.85,
                      marginBottom: 12,
                    }}
                  >
                    EduStock adalah platform edukasi investasi saham Indonesia
                    yang dibangun dengan misi sederhana: membuat literasi
                    keuangan dan investasi saham bisa diakses oleh semua orang,
                    dari pemula hingga yang ingin memperdalam pengetahuan.
                  </p>
                  <p
                    style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.85 }}
                  >
                    Platform ini menggabungkan kurikulum terstruktur (8 modul ·
                    80 materi · 105 kuis) dengan teknologi AI untuk menciptakan
                    pengalaman belajar yang personal, interaktif, dan efektif.
                  </p>
                </div>

                {/* Contact Cards */}
                <div style={{ padding: '32px 40px' }}>
                  <h3
                    style={{
                      fontFamily: "'Fraunces',serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#1a1a2e',
                      marginBottom: 20,
                    }}
                  >
                    Hubungi Saya
                  </h3>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16,
                      marginBottom: 28,
                    }}
                  >
                    {[
                      {
                        icon: '✉️',
                        label: 'Email',
                        value: 'septariuspius9@gmail.com',
                        desc: 'Untuk pertanyaan, feedback, kolaborasi, atau konsultasi',
                        color: '#6366f1',
                        bg: '#f0f0ff',
                        href: 'mailto:septariuspius9@gmail.com',
                      },
                      {
                        icon: '🔗',
                        label: 'LinkedIn',
                        value: 'linkedin.com/in/septariuspius',
                        desc: 'Terhubung secara profesional dan ikuti update terbaru',
                        color: '#0077b5',
                        bg: '#e8f4fd',
                        href: 'https://www.linkedin.com/in/septariuspius',
                      },
                    ].map((c, i) => (
                      <a
                        key={i}
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'block', textDecoration: 'none' }}
                      >
                        <div
                          className="card-h"
                          style={{
                            background: c.bg,
                            border: `1px solid ${c.color}30`,
                            borderRadius: 16,
                            padding: 22,
                          }}
                        >
                          <div style={{ fontSize: 28, marginBottom: 12 }}>
                            {c.icon}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: c.color,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              marginBottom: 4,
                            }}
                          >
                            {c.label}
                          </div>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: 13,
                              color: '#1a1a2e',
                              marginBottom: 6,
                              wordBreak: 'break-all',
                            }}
                          >
                            {c.value}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: '#6b7280',
                              lineHeight: 1.5,
                            }}
                          >
                            {c.desc}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* What can I help */}
                  <div
                    style={{
                      background: '#f8f7ff',
                      border: '1px solid #e0e7ff',
                      borderRadius: 16,
                      padding: 24,
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "'Fraunces',serif",
                        fontWeight: 700,
                        fontSize: 15,
                        color: '#1a1a2e',
                        marginBottom: 14,
                      }}
                    >
                      Apa yang bisa saya bantu?
                    </h4>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 10,
                      }}
                    >
                      {[
                        'Pertanyaan seputar materi investasi',
                        'Feedback dan saran pengembangan platform',
                        'Kolaborasi konten edukasi keuangan',
                        'Konsultasi strategi portofolio',
                        'Diskusi analisis saham IDX',
                        'Peluang kerjasama dan partnership',
                      ].map((item, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            gap: 8,
                            alignItems: 'flex-start',
                            fontSize: 12,
                            color: '#4b5563',
                          }}
                        >
                          <span
                            style={{
                              color: '#6366f1',
                              fontWeight: 700,
                              marginTop: 1,
                              flexShrink: 0,
                            }}
                          >
                            ✓
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer contact */}
                <div
                  style={{
                    padding: '20px 40px',
                    background: '#faf9ff',
                    borderTop: '1px solid #f1f5f9',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>
                    ⚠️ Seluruh konten EduStock bersifat edukatif — bukan saran
                    investasi resmi. Selalu lakukan riset mandiri (DYOR).
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer
          style={{
            borderTop: '1px solid rgba(99,102,241,0.1)',
            padding: '16px 24px',
            background: '#fff',
            marginTop: 32,
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontFamily: "'Fraunces',serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#1a1a2e',
                }}
              >
                EduStock
              </span>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>
                by Septarius Education
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 16,
                fontSize: 12,
                color: '#94a3b8',
              }}
            >
              <span>8 Modul · 80 Materi · 105 Kuis</span>
              <span>·</span>
              <a
                href="mailto:septariuspius9@gmail.com"
                style={{ color: '#6366f1', fontWeight: 600 }}
              >
                septariuspius9@gmail.com
              </a>
              <span>·</span>
              <a
                href="https://www.linkedin.com/in/septariuspius"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0077b5', fontWeight: 600 }}
              >
                LinkedIn
              </a>
            </div>
            <div style={{ fontSize: 11, color: '#cbd5e1' }}>
              ⚠️ Edukatif saja — bukan saran investasi resmi. DYOR.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
