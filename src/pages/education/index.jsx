import { useState } from 'react';
import { BookOpen, Heart, AlertTriangle, Clock, ArrowRight, X } from 'lucide-react';

const Education = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
  {
    id: 1,
    category: 'Akademik',
    readTime: '5 menit',
    title: 'Mengatasi Burnout Akademik',
    description: 'Strategi praktis untuk mengenali dan mengatasi kelelahan mental akibat tuntutan akademik.',
    content: `Burnout akademik bukan sekadar rasa lelah biasa—ini adalah keadaan kelelahan emosional, fisik, dan mental yang mendalam akibat stres akademik berkepanjangan tanpa pemulihan yang memadai. 
    
Sering kali, pelajar merasa terjebak dalam siklus "harus terus produktif", hingga lupa bahwa tubuh dan pikiran juga butuh istirahat untuk berfungsi optimal. 

Tanda-tanda awal burnout bisa sangat halus: kehilangan minat pada mata pelajaran yang dulu disukai, sulit fokus meski sudah minum kopi, atau merasa marah saat melihat notifikasi tugas baru. Banyak yang menyalahkan diri sendiri, menganggap ini sebagai kegagalan pribadi. Padahal, ini adalah respons alami tubuh terhadap beban yang melebihi kapasitas pemulihannya.

Langkah pertama untuk mengatasinya adalah mengakui tanpa rasa malu bahwa kamu sedang kewalahan. Ini bukan kelemahan—ini kejujuran. Setelah itu, evaluasi ulang jadwalmu. Apakah semua kegiatan benar-benar perlu? Apakah ada ruang untuk "tidak melakukan apa-apa"? 

Memberi diri waktu untuk diam, berjalan santai, atau sekadar menatap langit adalah bentuk perawatan diri yang sah dan penting. Terapkan teknik manajemen waktu seperti metode Pomodoro (25 menit fokus, 5 menit istirahat) dan batasi waktu belajar maksimal 6–7 jam per hari—termasuk kuliah atau sekolah.

Ingat: kualitas belajar jauh lebih penting daripada kuantitas jam duduk di meja. Tidur cukup, makan teratur, dan bergerak setiap hari adalah fondasi yang tidak bisa dikompromikan. 

Terakhir, jangan ragu mencari dukungan. Bicaralah dengan dosen, guru BK, teman dekat, atau layanan konseling kampus. Burnout tidak harus dihadapi sendirian. 

Dengan langkah kecil yang konsisten, kamu bisa kembali menemukan keseimbangan antara prestasi akademik dan kesejahteraan mental. Karena kamu layak sukses—tanpa harus kehilangan dirimu sendiri.`
  },


  {
    id: 2,
    category: 'Teknik',
    readTime: '7 menit',
    title: 'Mindfulness untuk Pemula',
    description: 'Panduan sederhana memulai praktik mindfulness dalam kehidupan sehari-hari.',
    content: `Mindfulness bukan sekadar tren kesehatan mental—ini adalah praktik kuno yang telah terbukti secara ilmiah membantu mengurangi stres, meningkatkan fokus, dan meningkatkan kualitas hidup. 

Banyak yang mengira mindfulness itu rumit atau memerlukan waktu berjam-jam, padahal sebenarnya bisa dimulai dengan langkah kecil yang mudah dilakukan.

Mulai dengan apa yang Anda lakukan setiap hari. Saat makan, coba makan dengan sadar—rasakan tekstur makanan, aromanya, rasanya. Saat berjalan, perhatikan sensasi kaki menyentuh tanah, angin di kulit Anda, suara di sekitar. Ini bukan meditasi formal, tapi kesadaran penuh terhadap momen sekarang.

Coba latihan "3 menit breathing": Duduklah dengan nyaman, tutup mata, dan fokus pada napas Anda selama 3 menit. Hitung napas masuk (1), tahan (2), keluar (3). Jika pikiran melayang, itu normal—kembalikan fokus ke napas tanpa menghakimi diri.

Mindfulness membantu Anda berhenti bereaksi otomatis terhadap stres. Alih-alih panik saat deadline mendekat, Anda bisa bernapas dalam dan menanggapi dengan tenang. Ini membutuhkan latihan konsisten, tapi manfaatnya terasa segera.

Mulai hari ini dengan 5 menit per hari, dan tingkatkan secara bertahap. Ingat, mindfulness bukan tentang mencapai "kesempurnaan" dalam meditasi. Ini tentang menjadi lebih hadir dalam hidup Anda. 

Dengan praktik rutin, Anda akan menemukan kedamaian yang lebih dalam dan kemampuan menghadapi tantangan dengan lebih bijak.`
  },


  {
    id: 3,
    category: 'Pengembangan Diri',
    readTime: '6 menit',
    title: 'Membangun Resiliensi Mental',
    description: 'Cara mengembangkan ketahanan mental untuk menghadapi tantangan hidup.',
    content: `Resiliensi mental adalah kemampuan untuk bangkit kembali setelah menghadapi kesulitan, seperti pohon yang melengkung di angin kencang tapi tidak patah. Ini bukan sifat bawaan, tapi keterampilan yang bisa dilatih dan dikembangkan sepanjang waktu.

Resiliensi dimulai dari pola pikir. Alih-alih melihat kegagalan sebagai akhir, lihat sebagai kesempatan belajar. Orang yang resilien bertanya "Apa yang bisa saya pelajari dari ini?" bukan "Mengapa ini terjadi pada saya?". Mereka fokus pada apa yang bisa dikontrol, bukan apa yang tidak bisa.

Kembangkan jaringan dukungan yang kuat. Orang resilien tahu kapan harus meminta bantuan. Mereka memiliki teman, keluarga, atau mentor yang bisa diandalkan saat sulit. Ini bukan kelemahan, tapi kekuatan.

Latih kemampuan mengelola emosi. Teknik seperti journaling, olahraga, atau meditasi membantu Anda tetap tenang di tengah badai. Tetap terhubung dengan rutinitas harian juga penting—makan teratur, tidur cukup, dan menjaga kesehatan fisik.

Ingat, resiliensi bukan tentang menghindari rasa sakit, tapi tentang belajar hidup dengannya. Setiap tantangan yang Anda atasi membuat Anda lebih kuat. 

Mulai hari ini dengan satu langkah kecil: tulis tiga hal yang Anda syukuri setiap hari. Ini akan membangun fondasi resiliensi yang kokoh.`
  },


  {
    id: 4,
    category: 'Sosial',
    readTime: '5 menit',
    title: 'Mengelola Kecemasan Sosial',
    description: 'Tips praktis mengatasi rasa gugup dalam situasi sosial.',
    content: `Kecemasan sosial adalah ketakutan intens terhadap situasi sosial di mana Anda merasa diperhatikan atau dinilai oleh orang lain. Ini lebih dari sekadar pemalu—ini bisa mengganggu kehidupan sehari-hari, pekerjaan, dan hubungan.

Langkah pertama adalah mengakui bahwa kecemasan sosial itu normal dan banyak orang mengalaminya. Ini bukan kelemahan, tapi respons evolusi yang terlalu aktif.

Mulai dengan tantangan kecil: senyum dan sapa orang yang Anda kenal di kampus. Latih "exposure therapy" bertahap. Mulai dari situasi yang membuat Anda sedikit gugup, seperti membeli kopi, lalu tingkatkan ke percakapan singkat. Setiap kali Anda berhasil, beri diri pujian. Ini akan membangun kepercayaan diri.

Ubah pola pikir negatif. Alih-alih "Semua orang memperhatikan kesalahanku", coba "Kebanyakan orang sibuk dengan pikiran mereka sendiri". Praktikkan afirmasi positif setiap hari.

Jika kecemasan sosial mengganggu kehidupan Anda, pertimbangkan terapi CBT (Cognitive Behavioral Therapy) atau konsultasi dengan profesional kesehatan mental. 

Ada banyak cara untuk mengelola ini, dan Anda tidak perlu melakukannya sendirian.`
  },


  {
    id: 5,
    category: 'Kesehatan',
    readTime: '4 menit',
    title: 'Pola Tidur Sehat untuk Pelajar',
    description: 'Pentingnya tidur berkualitas dan cara memperbaiki sleep hygiene.',
    content: `Tidur bukan sekadar waktu istirahat—ini adalah proses vital di mana otak memproses informasi, membentuk memori, dan memperbaiki sel-sel tubuh. Pelajar yang kurang tidur mengalami penurunan fokus, daya ingat, dan kesehatan mental. Padahal, tidur berkualitas adalah investasi terbaik untuk prestasi akademik.

Remaja dan dewasa muda membutuhkan 7-9 jam tidur setiap malam. Namun, kenyataannya banyak pelajar hanya tidur 5-6 jam karena tugas, media sosial, atau kebiasaan begadang. Ini menciptakan "sleep debt" yang menumpuk dan sulit dibayar.

Bangun sleep hygiene yang baik dimulai dari rutinitas tidur konsisten. Tidurlah dan bangun di waktu yang sama setiap hari, bahkan di akhir pekan. Ini membantu mengatur jam biologis tubuh.

Ciptakan lingkungan tidur yang nyaman: kamar gelap, sejuk, dan tenang. Hindari layar gadget minimal 1 jam sebelum tidur—cahaya biru mengganggu produksi melatonin, hormon tidur.

Jika sulit tidur, jangan berbaring terjaga. Bangun, lakukan aktivitas menenangkan seperti membaca atau mendengarkan musik lembut, lalu coba lagi saat mengantuk. Hindari kafein setelah jam 2 siang dan olahraga berat di malam hari.

Jika masalah tidur berlanjut lebih dari 2 minggu, konsultasi dengan dokter atau psikolog. Tidur yang cukup bukan kemewahan—ini kebutuhan dasar untuk kesehatan fisik dan mental yang optimal.`
  },


  {
    id: 6,
    category: 'Teknik',
    readTime: '3 menit',
    title: 'Teknik Grounding 5-4-3-2-1',
    description: 'Latihan sederhana untuk mengatasi panic attack dan overwhelm.',
    content: `Teknik grounding 5-4-3-2-1 adalah alat sederhana namun efektif untuk membawa Anda kembali ke masa kini saat pikiran sedang kacau atau panik.

5: Lihat 5 hal di sekitar Anda. Apa saja yang bisa Anda lihat? Meja, kursi, buku, jendela, lampu.

4: Sentuh 4 hal yang berbeda. Rasakan tekstur kulit Anda, kain baju, permukaan meja, atau rambut Anda.

3: Dengar 3 suara. Apa yang bisa Anda dengar? Suara napas Anda, suara lalu lintas di luar, detak jantung Anda.

2: Bau 2 hal. Apa yang bisa Anda cium? Bau kopi, parfum Anda, atau udara segar.

1: Rasakan 1 hal. Apa yang bisa Anda rasakan? Rasa air di mulut, atau sensasi kaki menyentuh lantai.

Latihan ini membutuhkan waktu kurang dari 2 menit dan bisa dilakukan di mana saja. Ini membantu mengalihkan fokus dari pikiran yang mengganggu ke sensasi fisik yang nyata. 

Praktikkan secara teratur agar mudah diingat saat dibutuhkan.`
  },


  {
    id: 7,
    category: 'Pengembangan Diri',
    readTime: '5 menit',
    title: 'Mengatur Ekspektasi Diri Sendiri',
    description: 'Belajar membedakan antara ambisi sehat dan perfeksionisme yang merusak.',
    content: `Ekspektasi yang terlalu tinggi terhadap diri sendiri bisa menjadi pedang bermata dua. Di satu sisi, ambisi mendorong kita maju. Di sisi lain, perfeksionisme yang tidak realistis bisa menghancurkan kesehatan mental dan menghambat kemajuan.

Bedakan antara "standar tinggi" dan "perfeksionisme". Standar tinggi berarti berusaha sebaik mungkin sambil menerima bahwa kesalahan adalah bagian dari pembelajaran. Perfeksionisme berarti menolak hasil apapun yang tidak sempurna, takut gagal, dan menunda pekerjaan karena takut tidak cukup baik.

Tanyakan pada diri sendiri: "Apakah ekspektasi ini mendorong saya tumbuh atau malah melumpuhkan saya?" Jika ekspektasi membuat Anda takut mencoba hal baru atau merasa tidak pernah cukup, itu tanda bahaya.

Praktikkan self-compassion. Perlakukan diri sendiri seperti Anda memperlakukan sahabat terbaik. Anda tidak akan menghakimi mereka keras saat gagal, jadi mengapa melakukannya pada diri sendiri?

Tetapkan tujuan SMART: Specific, Measurable, Achievable, Relevant, Time-bound. Bukan "Aku harus sempurna di semua mata kuliah", tapi "Aku akan belajar 2 jam setiap hari untuk meningkatkan nilai Matematika 10 poin semester ini".

Rayakan kemajuan kecil. Setiap langkah maju, sekecil apapun, adalah pencapaian yang patut dihargai. 

Ingat, pertumbuhan adalah proses, bukan destinasi. Beri diri Anda izin untuk menjadi manusia—tidak sempurna, tapi terus belajar dan berkembang.`
  },


  {
    id: 8,
    category: 'Kesehatan',
    readTime: '6 menit',
    title: 'Digital Detox untuk Kesehatan Mental',
    description: 'Cara melepaskan ketergantungan pada layar dan kembali ke kehidupan nyata.',
    content: `Dalam era digital ini, kita menghabiskan rata-rata 7 jam per hari di depan layar. Ini bisa menyebabkan kecemasan, insomnia, dan penurunan produktivitas. Digital detox adalah solusinya.

Mulai dengan "no-phone hour" di pagi hari. Biarkan ponsel Anda di kamar lain saat sarapan. Ini membantu Anda terhubung dengan diri sendiri sebelum terhubung dengan dunia maya.

Tetapkan batasan waktu. Gunakan aplikasi seperti Freedom atau Focus@Will untuk membatasi akses ke media sosial. Matikan notifikasi yang tidak penting.

Buat zona bebas gadget. Ruang makan, kamar tidur, dan saat berkumpul keluarga harus bebas dari layar. Alihkan energi ke aktivitas offline seperti membaca buku, olahraga, atau berkumpul dengan teman.

Ganti scroll dengan aktivitas bermakna. Alih-alih membuka Instagram saat bosan, coba meditasi, jalan-jalan, atau menulis jurnal.

Mulai kecil: detox 1 jam per hari, lalu tingkatkan menjadi seharian penuh seminggu sekali. 

Anda akan merasakan peningkatan fokus, tidur yang lebih baik, dan hubungan yang lebih dalam dengan orang-orang di sekitar Anda.`
  },


  {
    id: 9,
    category: 'Teknik',
    readTime: '4 menit',
    title: 'Menulis Jurnal sebagai Terapi Diri',
    description: 'Manfaat menulis harian untuk mengelola emosi dan meningkatkan kesadaran diri.',
    content: `Menulis jurnal adalah salah satu bentuk terapi diri yang paling sederhana namun paling powerful. Ini bukan tentang menulis dengan indah atau tata bahasa yang sempurna—ini tentang menuangkan pikiran dan perasaan Anda ke atas kertas tanpa filter.

Manfaat menulis jurnal sangat nyata: mengurangi stres, meningkatkan kesadaran diri, membantu memproses emosi, dan bahkan meningkatkan sistem kekebalan tubuh. Saat Anda menulis, Anda memberi ruang bagi pikiran dan perasaan yang selama ini tertahan.

Mulai dengan "free writing" selama 10 menit setiap pagi. Tulis apapun yang ada di pikiran tanpa berhenti atau mengedit. Ini seperti membersihkan mental clutter sebelum memulai hari.

Atau coba "gratitude journaling": setiap malam, tulis 3 hal yang Anda syukuri hari ini. Ini melatih otak untuk fokus pada hal positif, bukan hanya masalah.

Untuk mengelola emosi, gunakan teknik "emotional check-in": tulis apa yang Anda rasakan saat ini, apa yang memicu perasaan itu, dan bagaimana Anda ingin meresponnya. Ini memberi jarak antara emosi dan reaksi, sehingga Anda bisa merespon dengan lebih bijak.

Tidak perlu jurnal mewah—buku catatan biasa atau aplikasi di ponsel sudah cukup. Yang penting adalah konsistensi. Bahkan 5 menit per hari bisa memberikan dampak besar. 

Mulai hari ini, dan saksikan bagaimana menulis mengubah hubungan Anda dengan diri sendiri.`
  },


  {
    id: 10,
    category: 'Akademik',
    readTime: '6 menit',
    title: 'Mengenali dan Mengatasi Prokrastinasi',
    description: 'Memahami akar prokrastinasi dan cara mengubahnya menjadi aksi.',
    content: `Prokrastinasi bukan sekadar malas—ini adalah respons kompleks terhadap ketakutan, perfeksionisme, atau kelelahan. Memahami akarnya adalah langkah pertama mengatasinya.

Kenali pemicunya: takut gagal, tugas terlalu besar, atau kurang motivasi. Alih-alih menunda, pecah tugas menjadi langkah kecil yang mudah dilakukan.

Teknik "2 menit rule": jika sesuatu butuh kurang dari 2 menit, lakukan sekarang. Ini membangun momentum dan mengurangi resistansi.

Gunakan teknik Pomodoro: 25 menit fokus penuh, lalu 5 menit istirahat. Ini membuat tugas terasa lebih manageable.

Ubah lingkungan: hilangkan distraksi, siapkan alat yang dibutuhkan sebelum mulai. Lingkungan yang mendukung membuat aksi lebih mudah.

Ingat, prokrastinasi adalah kebiasaan yang bisa diubah. Mulai dengan satu tugas kecil hari ini, dan bangun momentum dari sana.`
  },


  {
    id: 11,
    category: 'Pengembangan Diri',
    readTime: '5 menit',
    title: 'Menjaga Motivasi Jangka Panjang',
    description: 'Strategi mempertahankan semangat saat tujuan terasa jauh.',
    content: `Motivasi adalah seperti api—kadang menyala besar, kadang meredup. Kunci sukses jangka panjang bukan mengandalkan motivasi sesaat, tapi membangun sistem yang mendukung konsistensi.

Pertama, hubungkan tujuan Anda dengan "why" yang lebih besar. Mengapa Anda kuliah? Bukan sekadar "dapat gelar", tapi mungkin "membuat orang tua bangga" atau "membuka peluang karir yang saya impikan". Saat motivasi turun, "why" ini yang akan menahan Anda.

Kedua, pecah tujuan besar menjadi milestone kecil yang bisa dirayakan. Alih-alih fokus pada "lulus dengan IPK 3.5", rayakan setiap semester yang berhasil Anda lewati dengan nilai baik. Kemajuan kecil yang konsisten lebih powerful daripada lonjakan besar sesekali.

Ketiga, bangun accountability. Ceritakan tujuan Anda pada teman, keluarga, atau mentor yang bisa mendukung dan mengingatkan Anda. Atau bergabung dengan komunitas yang memiliki tujuan serupa—energi kolektif bisa mengangkat semangat saat Anda lelah.

Keempat, terima bahwa ada hari-hari buruk. Anda tidak perlu termotivasi 100% setiap hari. Yang penting adalah bangkit kembali setelah jatuh. Buat rencana cadangan untuk hari-hari sulit: playlist motivasi, quote favorit, atau aktivitas yang mengisi ulang energi Anda.

Terakhir, visualisasi. Bayangkan diri Anda di masa depan yang sudah mencapai tujuan. Rasakan kebanggaan, kelegaan, dan kebahagiaan itu. Ini bukan mimpi kosong—ini adalah peta yang mengarahkan tindakan Anda hari ini.

Ingat, motivasi mungkin datang dan pergi, tapi disiplin dan sistem yang kuat akan membawa Anda sampai finish line.`
  },


  {
    id: 12,
    category: 'Pengembangan Diri',
    readTime: '5 menit',
    title: 'Menghadapi Kegagalan dengan Bijak',
    description: 'Mengubah kegagalan dari akhir menjadi awal yang baru.',
    content: `Kegagalan bukan akhir dari segalanya—ini adalah guru yang paling berharga. Orang sukses terbesar adalah mereka yang gagal paling banyak, tapi terus bangkit.

Ubah perspektif: kegagalan bukan tentang apa yang salah, tapi tentang apa yang bisa diperbaiki. Analisis tanpa menghakimi diri.

Pelajari dari kesalahan. Setiap kegagalan mengajarkan sesuatu yang tidak bisa didapat dari kesuksesan. Bangun kembali dengan lebih kuat. Gunakan pengalaman untuk membuat rencana yang lebih baik.

Ingat, kegagalan sementara tidak mendefinisikan siapa Anda. Ini hanya bagian dari perjalanan menuju kesuksesan.`
  },


  {
    id: 13,
    category: 'Kesehatan',
    readTime: '4 menit',
    title: 'Membangun Rutinitas Pagi yang Menenangkan',
    description: 'Cara memulai hari dengan tenang dan penuh energi positif.',
    content: `Cara Anda memulai pagi menentukan kualitas hari Anda. Rutinitas pagi yang menenangkan bukan tentang bangun jam 4 pagi atau meditasi 2 jam—ini tentang menciptakan ritual yang membuat Anda merasa grounded dan siap menghadapi hari.

Mulai dengan bangun 15 menit lebih awal. Jangan langsung cek ponsel—ini memberi kontrol kepada dunia luar atas mood Anda. Alih-alih, duduk tenang sebentar, tarik napas dalam, dan tetapkan intensi untuk hari ini: "Hari ini, saya akan fokus dan penuh kasih pada diri sendiri".

Lakukan stretching ringan atau yoga 5 menit untuk membangunkan tubuh. Gerakan fisik meningkatkan aliran darah dan energi. Tidak perlu pose rumit—cukup rentangkan tubuh, putar leher, dan rasakan tubuh Anda bangun perlahan.

Sarapan dengan mindful. Alih-alih makan sambil scrolling, nikmati setiap gigitan. Rasakan tekstur, rasa, dan aroma makanan. Ini melatih otak untuk hadir di momen sekarang.

Buat daftar 3 prioritas hari ini. Tidak perlu to-do list panjang yang overwhelming—cukup 3 hal terpenting yang ingin Anda selesaikan. Ini memberi fokus dan arah.

Akhiri dengan afirmasi positif: "Aku mampu menghadapi hari ini dengan tenang. Aku cukup, apa adanya". Ucapkan dengan keras atau tulis di jurnal.

Rutinitas pagi bukan tentang sempurna, tapi tentang konsistensi. Mulai dengan 1-2 kebiasaan kecil, lalu tambahkan satu per satu. Dalam beberapa minggu, Anda akan merasakan perbedaan besar dalam mood dan produktivitas sepanjang hari.`
  },


  {
    id: 14,
    category: 'Sosial',
    readTime: '6 menit',
    title: 'Mengelola Konflik dengan Teman atau Rekan',
    description: 'Cara berkomunikasi asertif tanpa merusak hubungan.',
    content: `Konflik adalah bagian alami dari hubungan manusia. Yang membedakan hubungan sehat dan tidak sehat adalah bagaimana konflik itu dikelola. Komunikasi asertif adalah kuncinya—bukan agresif, bukan pasif, tapi jelas dan menghormati kedua pihak.

Pertama, kenali emosi Anda sebelum bereaksi. Saat sedang marah atau kesal, tunggu hingga emosi mereda sebelum menghadapi orang tersebut. Ini mencegah kata-kata yang menyakitkan yang tidak bisa ditarik kembali.

Gunakan "I-statements" alih-alih "You-statements". Alih-alih "Kamu selalu egois!", coba "Aku merasa diabaikan saat rencanaku tidak dipertimbangkan". Ini menyampaikan perasaan tanpa menyerang karakter orang lain.

Dengarkan dengan empati. Konflik biasanya dua arah. Beri ruang bagi orang lain untuk menjelaskan perspektif mereka tanpa memotong. Terkadang, memahami sudut pandang mereka bisa melembutkan kemarahan Anda.

Fokus pada masalah, bukan orangnya. Alih-alih menyerang karakter, diskusikan perilaku spesifik yang mengganggu. "Saat kamu terlambat tanpa kabar, aku merasa tidak dihargai" lebih konstruktif daripada "Kamu tidak pernah menghargai waktu orang lain".

Cari solusi bersama. Alih-alih memaksa kehendak, tanyakan "Bagaimana kita bisa mengatasi ini bersama?". Ini mengubah konflik dari "saya lawan kamu" menjadi "kita lawan masalah".

Tahu kapan harus mengalah atau berkompromi. Tidak semua pertarungan perlu dimenangkan. Tanyakan pada diri sendiri: "Apakah ini sepadan dengan merusak hubungan?".

Jika konflik terus berulang dan toxic, mungkin saatnya mengevaluasi apakah hubungan ini sehat untuk Anda. Tidak semua hubungan layak dipertahankan, dan itu tidak apa-apa.

Konflik yang dikelola dengan baik bisa memperkuat hubungan. Ini menunjukkan bahwa Anda peduli cukup untuk berkomunikasi jujur, bukan sekadar menghindari masalah.`
  },


  {
    id: 15,
    category: 'Pengembangan Diri',
    readTime: '5 menit',
    title: 'Mengatasi Rasa Tidak Cukup (Impostor Syndrome)',
    description: 'Mengenali dan melawan perasaan sebagai \'penipu\' meski sudah berprestasi.',
    content: `Impostor syndrome adalah perasaan bahwa Anda tidak layak atas kesuksesan yang Anda raih, seolah-olah Anda "menipu" orang lain dan suatu saat akan ketahuan. Bahkan orang-orang sukses pun mengalami ini.

Pertama, akui bahwa perasaan ini nyata dan valid, tapi bukan fakta. Hanya karena Anda merasa tidak cukup, tidak berarti Anda benar-benar tidak cukup. Pisahkan perasaan dari kenyataan.

Dokumentasikan pencapaian Anda. Buat "success journal" di mana Anda mencatat setiap pujian, prestasi, atau momen kebanggaan. Saat impostor syndrome muncul, baca lagi catatan ini sebagai pengingat bahwa Anda memang capable.

Pahami bahwa semua orang belajar. Tidak ada yang langsung ahli. Kesuksesan Anda bukan kebetulan—ini hasil kerja keras, pembelajaran, dan pertumbuhan. Beri diri kredit yang layak.

Bagikan keraguan Anda dengan orang terpercaya. Anda akan terkejut betapa banyak orang yang merasakan hal sama. Ini bukan kelemahan unik Anda, tapi pengalaman manusia yang universal.

Ubah self-talk negatif. Alih-alih "Aku cuma beruntung", coba "Aku bekerja keras untuk ini dan layak mendapatkannya". Alih-alih "Aku tidak tahu apa-apa", coba "Aku sedang belajar dan berkembang".

Terakhir, terima bahwa Anda tidak perlu tahu segalanya untuk menjadi berharga. Kecukupan Anda bukan tentang sempurna—ini tentang terus tumbuh. Anda cukup, apa adanya, sambil terus berkembang menjadi lebih baik.`
  },


  {
    id: 16,
    category: 'Teknik',
    readTime: '3 menit',
    title: 'Latihan Pernapasan untuk Menenangkan Pikiran',
    description: 'Teknik pernapasan sederhana yang bisa dilakukan di mana saja.',
    content: `Pernapasan adalah jembatan antara pikiran dan tubuh. Teknik sederhana ini bisa menenangkan pikiran dalam hitungan detik.

Teknik 4-7-8: Tarik napas selama 4 detik, tahan 7 detik, hembuskan selama 8 detik. Ulangi 4 kali.

Teknik Kotak: Tarik napas 4 detik, tahan 4 detik, hembuskan 4 detik, tahan 4 detik. Bayangkan menggambar kotak.

Pernapasan dalam mengaktifkan sistem parasimpatis, mengurangi hormon stres dan menenangkan pikiran. Praktikkan setiap hari, terutama saat stres. 

Dalam 1-2 menit, Anda akan merasa lebih tenang dan fokus.`
  },


  {
    id: 17,
    category: 'Akademik',
    readTime: '6 menit',
    title: 'Menjaga Keseimbangan Hidup Mahasiswa',
    description: 'Tips mengelola waktu antara kuliah, organisasi, dan kehidupan pribadi.',
    content: `Kehidupan mahasiswa bisa terasa seperti juggling—kuliah, tugas, organisasi, part-time job, kehidupan sosial, dan waktu untuk diri sendiri. Semuanya penting, tapi bagaimana menyeimbangkannya tanpa burnout?

Pertama, pahami bahwa "balance" bukan berarti semua area mendapat waktu sama setiap hari. Ini tentang prioritas yang fleksibel. Ada minggu di mana akademik harus prioritas, ada minggu di mana Anda perlu lebih fokus pada kesehatan mental atau relasi.

Buat "time audit" selama seminggu. Catat kemana waktu Anda sebenarnya pergi—berapa jam kuliah, belajar, organisasi, sosial media, tidur. Ini memberi gambaran realistis apakah waktu Anda selaras dengan prioritas.

Gunakan teknik "time blocking". Alih-alih multitasking, dedikasikan blok waktu spesifik untuk aktivitas tertentu. 9-12 untuk kuliah, 13-15 untuk tugas, 15-17 untuk organisasi, 19-21 untuk relax. Ini meningkatkan fokus dan mengurangi mental clutter.

Pelajari mengatakan "tidak". Anda tidak harus ikut setiap acara atau terima setiap tawaran. Pilih komitmen yang benar-benar selaras dengan tujuan dan nilai Anda.

Jadwalkan "me time" seperti Anda menjadwalkan meeting. Ini bukan egois—ini kebutuhan. Satu jam per hari untuk aktivitas yang mengisi ulang energi: olahraga, hobi, atau sekadar diam.

Evaluasi rutin setiap bulan. Tanyakan: Apakah keseimbangan saat ini sustainable? Apa yang perlu dikurangi atau ditambah? Fleksibilitas adalah kunci—jangan kaku pada sistem yang tidak lagi bekerja.

Ingat, keseimbangan bukan tentang sempurna. Ini tentang membuat pilihan sadar yang mendukung kesejahteraan dan tujuan jangka panjang Anda.`
  },


  {
    id: 18,
    category: 'Kesehatan',
    readTime: '5 menit',
    title: 'Mengelola Emosi Negatif dengan Sehat',
    description: 'Cara mengakui, memahami, dan menyalurkan emosi seperti marah, sedih, atau kecewa.',
    content: `Emosi negatif—marah, sedih, kecewa, cemas—sering dianggap sebagai musuh yang harus dihindari. Padahal, emosi adalah sinyal dari tubuh yang memberi tahu kita tentang kebutuhan atau batas yang dilanggar. Menekan emosi hanya membuat mereka lebih kuat dan muncul dalam bentuk yang lebih destruktif.

Langkah pertama adalah mengakui emosi tanpa menghakimi. Alih-alih "Aku tidak boleh marah", coba "Aku sedang marah, dan itu oke. Ini manusiawi". Beri nama emosi tersebut—penelitian menunjukkan bahwa "labeling" emosi mengurangi intensitasnya.

Rasakan emosi di tubuh Anda. Di mana Anda merasakan kemarahan? Dada yang sesak? Rahang yang tegang? Sadari sensasi fisik ini tanpa bereaksi. Ini menciptakan jarak antara emosi dan tindakan impulsif.

Ekspresikan dengan sehat. Marah? Tulis surat yang tidak akan Anda kirim, pukul bantal, atau olahraga intensif. Sedih? Izinkan diri menangis, dengarkan musik yang menyentuh hati, atau curhat pada teman terpercaya.

Tanyakan: "Apa yang emosi ini coba katakan?" Marah bisa berarti batas Anda dilanggar. Sedih bisa berarti Anda kehilangan sesuatu yang penting. Kecewa bisa berarti ekspektasi tidak terpenuhi. Pahami pesan di balik emosi.

Praktikkan self-compassion. Perlakukan diri Anda dengan kelembutan seperti Anda memperlakukan teman yang sedang berduka. "Ini sulit, dan wajar aku merasa sedih. Aku tidak sendirian dalam perjuangan ini".

Jika emosi negatif terasa overwhelming atau bertahan lebih dari 2 minggu, pertimbangkan konseling profesional. Ada banyak cara mengelola emosi, dan tidak ada yang salah dengan meminta bantuan.

Emosi negatif bukan musuh—mereka adalah bagian dari pengalaman manusia yang lengkap. Dengan mengelolanya dengan bijak, Anda bisa hidup lebih autentik dan seimbang.`
  },


  {
    id: 19,
    category: 'Akademik',
    readTime: '7 menit',
    title: 'Membangun Kebiasaan Belajar yang Efektif',
    description: 'Strategi berbasis sains untuk belajar lebih cerdas, bukan lebih lama.',
    content: `Belajar efektif bukan tentang berapa lama Anda duduk di meja, tapi bagaimana otak Anda memproses informasi. Ilmu neurosains menunjukkan beberapa strategi yang terbukti meningkatkan retensi dan pemahaman.

Pertama, "spaced repetition". Otak lebih mudah mengingat informasi yang dipelajari berulang kali dalam interval waktu. Alih-alih belajar 6 jam sehari sebelum ujian, belajar 1 jam sehari selama 6 hari. Gunakan aplikasi seperti Anki untuk flashcard dengan algoritma spaced repetition.

Kedua, "active recall". Alih-alih membaca ulang catatan pasif, tutup buku dan coba ingat apa yang baru Anda baca. Buat pertanyaan untuk diri sendiri dan jawab tanpa melihat. Ini memaksa otak "bekerja" dan memperkuat koneksi neural.

Ketiga, "interleaving". Alih-alih belajar satu topik sampai tuntas, campur beberapa topik dalam satu sesi. Ini melatih otak membedakan dan mengaplikasikan konsep yang berbeda—skill yang penting untuk ujian.

Keempat, "elaboration". Hubungkan informasi baru dengan yang sudah Anda ketahui. Buat analogi, contoh, atau cerita. Semakin banyak koneksi yang Anda buat, semakin kuat memori tersebut.

Kelima, tidur cukup. Otak memproses dan mengonsolidasi memori saat tidur. Begadang sebelum ujian kontraproduktif—Anda mungkin "belajar" banyak, tapi otak tidak punya waktu menyimpannya ke memori jangka panjang.

Keenam, buat lingkungan belajar yang konsisten. Otak mengasosiasikan tempat dengan aktivitas. Jika Anda selalu belajar di tempat yang sama, otak akan otomatis masuk "mode fokus" saat Anda duduk di sana.

Terakhir, gunakan teknik Pomodoro. 25 menit fokus penuh tanpa distraksi, lalu 5 menit istirahat. Setelah 4 siklus, istirahat lebih lama 15-30 menit. Ini menjaga fokus tetap tajam dan mencegah burnout.

Ingat, kualitas belajar jauh lebih penting daripada kuantitas. 2 jam belajar efektif mengalahkan 6 jam belajar sambil multitasking. Eksperimen dengan teknik ini dan temukan kombinasi yang paling cocok untuk Anda.`
  },


  {
    id: 20,
    category: 'Pengembangan Diri',
    readTime: '5 menit',
    title: 'Menemukan Makna dalam Perjalanan Akademik',
    description: 'Menghubungkan studi dengan nilai dan tujuan hidup yang lebih besar.',
    content: `Banyak mahasiswa merasa kehilangan arah di tengah tuntutan akademik yang tidak ada habisnya. Mereka belajar karena "harus", bukan karena "ingin". Akibatnya, motivasi menipis dan burnout mengintai. Menemukan makna adalah antidotnya.

Mulai dengan bertanya: "Mengapa saya kuliah di jurusan ini?" Jika jawabannya hanya "karena orang tua" atau "karena gajinya bagus", gali lebih dalam. Apa yang benar-benar Anda pedulikan? Masalah apa yang ingin Anda selesaikan di dunia?

Hubungkan mata kuliah dengan nilai pribadi Anda. Kuliah Matematika mungkin terasa abstrak, tapi jika Anda peduli pada pemikiran logis dan pemecahan masalah, itu jadi lebih bermakna. Kuliah Sosiologi terasa membosankan, tapi jika Anda peduli pada keadilan sosial, tiba-tiba setiap teori punya relevansi.

Cari role model atau mentor yang menjalani karir yang Anda minati. Bicara dengan mereka, dengar cerita mereka. Ini memberi gambaran nyata bahwa studi Anda punya tujuan—bukan hanya gelar, tapi persiapan untuk berkontribusi.

Terlibat dalam proyek atau organisasi yang selaras dengan passion Anda. Jika Anda kuliah Psikologi dan peduli pada kesehatan mental remaja, volunteer di hotline atau buat kampanye awareness. Aplikasi langsung memberi makna pada teori yang Anda pelajari.

Refleksi rutin. Setiap akhir semester, tanyakan: Apa yang saya pelajari tentang diri saya? Skill apa yang berkembang? Bagaimana ini membawa saya lebih dekat pada visi hidup saya?

Ingat, pendidikan bukan hanya tentang nilai atau gelar. Ini tentang menjadi versi terbaik dari diri Anda—lebih bijak, lebih capable, lebih terhubung dengan tujuan Anda. 

Saat Anda menemukan makna, belajar bukan lagi beban—ini menjadi perjalanan yang bermakna.`
  }
];

  const tips = [
    'Tidur 7-9 jam setiap malam',
    'Olahraga ringan 20-30 menit/hari',
    'Batasi konsumsi media sosial',
    'Praktikkan gratitude journaling',
    'Jaga koneksi sosial yang bermakna',
    'Makan makanan bergizi seimbang',
    'Luangkan waktu untuk hobi',
    'Jangan ragu mencari bantuan profesional'
  ];

  const crisisContacts = [
    { name: 'Hotline Bunuh Diri (Kemenkes)', phone: '119', available: 'Tersedia 24/7' },
    { name: 'Ambulans', phone: '118 / 119', available: 'Tersedia 24/7' },
    { name: 'Polisi', phone: '110', available: 'Tersedia 24/7' },
    { name: 'Komnas Perempuan', phone: '021-3903963', available: 'Tersedia 24/7' }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Akademik': 'bg-blue-100 text-blue-800',
      'Teknik': 'bg-green-100 text-green-800',
      'Pengembangan Diri': 'bg-purple-100 text-purple-800',
      'Sosial': 'bg-orange-100 text-orange-800',
      'Kesehatan': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Soft Background Blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="blob w-96 h-96 bg-emerald-200 top-20 -left-20 animate-float-soft"></div>
        <div className="blob w-80 h-80 bg-sky-200 top-1/3 -right-32 animate-float-soft-reverse"></div>
        <div className="blob w-72 h-72 bg-emerald-300 bottom-32 left-1/4 animate-float-soft-delayed"></div>
        <div className="blob w-64 h-64 bg-sky-300 bottom-1/3 right-1/4 animate-float-soft"></div>
      </div>

      {/* Header */}
      <section className="px-6 pt-32 pb-12 text-center">
        <div className="max-w-5xl mx-auto space-y-8 slide-up">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
            Edukasi
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              Kesehatan Mental
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Temukan wawasan, tips, dan dukungan untuk perjalanan kesehatan mental Anda
          </p>
        </div>
      </section>

      <div className="px-6 pb-20 space-y-20">
        {/* Articles Section */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-12 slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Pusat Artikel & Wawasan</h2>
            <p className="text-lg text-gray-600">Pelajari topik kesehatan mental dari para ahli</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div key={article.id} className="glass-card p-6 slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm group"
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-12 slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tips Menjaga Kesehatan Mental</h2>
            <p className="text-lg text-gray-600">Langkah-langkah sederhana untuk kesejahteraan sehari-hari</p>
          </div>

          <div className="glass-card p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-3 slide-up" style={{animationDelay: `${index * 0.05}s`}}>
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Crisis Center */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-12 slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Pusat Bantuan Krisis</h2>
            <p className="text-lg text-gray-600">Jika Anda atau seseorang yang Anda kenal dalam keadaan darurat</p>
          </div>

          <div className="glass-card p-8 border-l-4 border-red-500 bg-red-50">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Bantuan Darurat</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Jika Anda merasa dalam bahaya, segera hubungi nomor darurat di bawah ini atau cari bantuan dari orang terdekat. Anda tidak sendirian. 💙
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {crisisContacts.map((contact, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <h4 className="font-semibold text-gray-800 mb-1">{contact.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{contact.available}</p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                  >
                    📞 {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedArticle.category)} mb-2 inline-block`}>
                    {selectedArticle.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedArticle.title}</h2>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedArticle.readTime} Bacaan
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 italic mb-6">"Wawasan Mental"</p>
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {selectedArticle.content}
                </div>
                <p className="text-gray-600 italic mt-6">Semoga artikel ini memberikan wawasan yang bermanfaat untuk perjalanan mentalmu. 💙</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Kembali ke Daftar Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
