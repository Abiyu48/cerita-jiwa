import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Inisialisasi Client Baru
const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `Kamu adalah Jiwamu, AI companion untuk kesehatan mental yang empati dan mendukung. Kamu harus:

1. Selalu merespons dengan bahasa Indonesia yang hangat dan empati
2. Tidak pernah menghakimi atau menyalahkan user
3. Memberikan dukungan emosional yang tulus
4. Memberikan saran praktis untuk kesehatan mental
5. Mengakui perasaan user sebagai valid
6. Menggunakan emoji yang tepat untuk menunjukkan empati
7. Menjaga kerahasiaan dan keamanan percakapan
8. Jika user mengalami krisis mental berat, sarankan untuk mencari bantuan profesional
9. Jika user mengeluh tentang bug sistem, masalah teknis, atau keluhan layanan, arahkan mereka ke halaman laporan pengguna dengan mengatakan: "Masalah ini bisa kamu laporkan secara langsung agar cepat ditangani. Aku akan membukakan halaman laporan pengguna, dan laporanmu akan diterima langsung oleh Customer Support." Kemudian tambahkan kode [REDIRECT_TO_REPORT] di akhir respons untuk memicu redirect otomatis.

Topik yang sering dibahas:
- Putus cinta dan sakit hati
- Stres dan kelelahan
- Kecemasan dan panik
- Depresi dan sedih berkepanjangan
- Masalah hubungan
- Masalah keluarga
- Masalah pekerjaan
- Masalah kepercayaan diri

Selalu mulai dengan mengakui perasaan mereka dan berikan dukungan sebelum memberikan saran..`;

app.post('/api/ai-chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    console.log("\n--- [DEBUG: REQUEST MASUK] ---");
    
    // 1. Membangun array contents
    const contents = [];
    
    // Tambahkan history jika ada
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach(msg => {
        if (msg.content) {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          });
        }
      });
    }

    // Tambahkan pesan user saat ini dengan System Prompt
    contents.push({
      role: 'user',
      parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${message}` }]
    });

    console.log("Mengirim ke Model: gemini-3-flash-preview");

    // 2. Memanggil API
    const result = await client.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: contents,
      config: {
        temperature: 0.7,
      }
    });

    // 3. Cara mengambil respons yang benar agar tidak UNDEFINED
    // Di SDK baru, teks ada di result.text, tapi kita proteksi jika kosong
    let aiResponse = "";
    
    if (result && result.text) {
        aiResponse = result.text;
    } else if (result.candidates && result.candidates[0].content.parts[0].text) {
        aiResponse = result.candidates[0].content.parts[0].text;
    } else {
        // Jika masih undefined, kita log full result untuk debug
        console.log("--- [FULL RESULT DEBUG] ---");
        console.dir(result, { depth: null });
        aiResponse = "Maaf, aku tidak bisa memproses pesan itu. Bisa coba bahasa lain? 💙";
    }

    console.log("--- [AI RESPONSE SUCCESS] ---");
    console.log(aiResponse);

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("\n--- [ERROR API] ---");
    console.error("Message:", error.message);
    if (error.details) console.dir(error.details, { depth: null });

    res.status(500).json({
      response: "Aduh, ada gangguan teknis di otakku. Coba lagi ya? 💙",
      error: error.message
    });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper functions for file-based data management
const getReports = () => {
  try {
    const filePath = path.join(__dirname, 'data', 'reports.json');
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading reports:', error);
    return [];
  }
};

const saveReports = (reports) => {
  try {
    const dirPath = path.join(__dirname, 'data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, 'reports.json');
    fs.writeFileSync(filePath, JSON.stringify(reports, null, 2));
  } catch (error) {
    console.error('Error saving reports:', error);
  }
};

const getAuditLogs = () => {
  try {
    const filePath = path.join(__dirname, 'data', 'audit_logs.json');
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading audit logs:', error);
    return [];
  }
};

const saveAuditLogs = (logs) => {
  try {
    const dirPath = path.join(__dirname, 'data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, 'audit_logs.json');
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error('Error saving audit logs:', error);
  }
};

// Report API Endpoints

// Create a new report (User)
app.post('/api/reports', (req, res) => {
  try {
    const { userId, category, description } = req.body;

    if (!userId || !category || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reports = getReports();
    const newReport = {
      id: Date.now().toString(),
      userId,
      category,
      description,
      status: 'baru',
      priority: 'rendah',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      replies: [],
      escalated: false
    };

    reports.push(newReport);
    saveReports(reports);

    res.status(201).json(newReport);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get reports for user
app.get('/api/reports/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const reports = getReports().filter(report => report.userId === userId);
    res.json(reports);
  } catch (error) {
    console.error('Error fetching user reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all reports for CS dashboard
app.get('/api/reports/cs', (req, res) => {
  try {
    const reports = getReports();
    // CS sees all reports except escalated ones
    const csReports = reports.filter(report => !report.escalated);
    res.json(csReports);
  } catch (error) {
    console.error('Error fetching CS reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get escalated reports for admin
app.get('/api/reports/admin', (req, res) => {
  try {
    const reports = getReports();
    const escalatedReports = reports.filter(report => report.escalated);
    res.json(escalatedReports);
  } catch (error) {
    console.error('Error fetching admin reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single report
app.get('/api/reports/:id', (req, res) => {
  try {
    const { id } = req.params;
    const reports = getReports();
    const report = reports.find(r => r.id === id);

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update report status (CS)
app.patch('/api/reports/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status, csId } = req.body;

    if (!status || !csId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reports = getReports();
    const reportIndex = reports.findIndex(r => r.id === id);

    if (reportIndex === -1) {
      return res.status(404).json({ error: 'Report not found' });
    }

    reports[reportIndex].status = status;
    reports[reportIndex].updatedAt = new Date().toISOString();

    saveReports(reports);

    // Add audit log
    const auditLogs = getAuditLogs();
    auditLogs.push({
      id: Date.now().toString(),
      reportId: id,
      action: 'status_update',
      actorId: csId,
      actorRole: 'support',
      details: `Status changed to ${status}`,
      timestamp: new Date().toISOString()
    });
    saveAuditLogs(auditLogs);

    res.json(reports[reportIndex]);
  } catch (error) {
    console.error('Error updating report status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add reply to report (CS)
app.post('/api/reports/:id/reply', (req, res) => {
  try {
    const { id } = req.params;
    const { message, csId, csName } = req.body;

    if (!message || !csId || !csName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reports = getReports();
    const reportIndex = reports.findIndex(r => r.id === id);

    if (reportIndex === -1) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const newReply = {
      id: Date.now().toString(),
      message,
      authorId: csId,
      authorName: csName,
      authorRole: 'support',
      timestamp: new Date().toISOString()
    };

    reports[reportIndex].replies.push(newReply);
    reports[reportIndex].updatedAt = new Date().toISOString();

    saveReports(reports);

    // Add audit log
    const auditLogs = getAuditLogs();
    auditLogs.push({
      id: Date.now().toString(),
      reportId: id,
      action: 'reply',
      actorId: csId,
      actorRole: 'support',
      details: 'Added reply to report',
      timestamp: new Date().toISOString()
    });
    saveAuditLogs(auditLogs);

    res.json(reports[reportIndex]);
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Escalate report to admin (CS)
app.patch('/api/reports/:id/escalate', (req, res) => {
  try {
    const { id } = req.params;
    const { csId, reason } = req.body;

    if (!csId || !reason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reports = getReports();
    const reportIndex = reports.findIndex(r => r.id === id);

    if (reportIndex === -1) {
      return res.status(404).json({ error: 'Report not found' });
    }

    reports[reportIndex].escalated = true;
    reports[reportIndex].escalationReason = reason;
    reports[reportIndex].updatedAt = new Date().toISOString();

    saveReports(reports);

    // Add audit log
    const auditLogs = getAuditLogs();
    auditLogs.push({
      id: Date.now().toString(),
      reportId: id,
      action: 'escalate',
      actorId: csId,
      actorRole: 'support',
      details: `Escalated to admin: ${reason}`,
      timestamp: new Date().toISOString()
    });
    saveAuditLogs(auditLogs);

    res.json(reports[reportIndex]);
  } catch (error) {
    console.error('Error escalating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin decision on escalated report
app.patch('/api/reports/:id/decision', (req, res) => {
  try {
    const { id } = req.params;
    const { decision, adminId, notes } = req.body;

    if (!decision || !adminId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reports = getReports();
    const reportIndex = reports.findIndex(r => r.id === id);

    if (reportIndex === -1) {
      return res.status(404).json({ error: 'Report not found' });
    }

    reports[reportIndex].adminDecision = decision;
    reports[reportIndex].adminNotes = notes || '';
    reports[reportIndex].status = 'selesai';
    reports[reportIndex].updatedAt = new Date().toISOString();

    saveReports(reports);

    // Add audit log
    const auditLogs = getAuditLogs();
    auditLogs.push({
      id: Date.now().toString(),
      reportId: id,
      action: 'decision',
      actorId: adminId,
      actorRole: 'admin',
      details: `Admin decision: ${decision}`,
      timestamp: new Date().toISOString()
    });
    saveAuditLogs(auditLogs);

    res.json(reports[reportIndex]);
  } catch (error) {
    console.error('Error making admin decision:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get audit logs for a report
app.get('/api/reports/:id/audit', (req, res) => {
  try {
    const { id } = req.params;
    const auditLogs = getAuditLogs().filter(log => log.reportId === id);
    res.json(auditLogs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin Profile Management
const getAdminProfiles = () => {
  try {
    const filePath = path.join(__dirname, 'data', 'admin_profiles.json');
    if (!fs.existsSync(filePath)) {
      return {};
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading admin profiles:', error);
    return {};
  }
};

const saveAdminProfiles = (profiles) => {
  try {
    const dirPath = path.join(__dirname, 'data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, 'admin_profiles.json');
    fs.writeFileSync(filePath, JSON.stringify(profiles, null, 2));
  } catch (error) {
    console.error('Error saving admin profiles:', error);
  }
};

// Get admin profile
app.get('/api/admin/profile/:adminId', (req, res) => {
  try {
    const { adminId } = req.params;
    const profiles = getAdminProfiles();
    const profile = profiles[adminId] || {
      name: 'Admin',
      email: 'admin@ceritajiwa.com',
      phone: '+62 812-3456-7890',
      role: 'Super Admin',
      joinDate: 'June 2023',
      department: 'Mental Health Administration',
      profileImage: null,
      wellnessSettings: {
        maxContentPerSession: 15,
        breakReminderInterval: 2,
        wellnessScore: 85
      }
    };
    res.json(profile);
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update admin profile
app.put('/api/admin/profile/:adminId', (req, res) => {
  try {
    const { adminId } = req.params;
    const updateData = req.body;
    const profiles = getAdminProfiles();

    // Merge with existing profile or create new one
    profiles[adminId] = {
      ...profiles[adminId],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    saveAdminProfiles(profiles);
    res.json(profiles[adminId]);
  } catch (error) {
    console.error('Error updating admin profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🚀 Server Jiwamu (SDK Baru) jalan di http://localhost:${port}`);
});