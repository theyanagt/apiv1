const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const fetch = require("node-fetch");

const { fetchJson } = require('./lib/myfunc');
const scr = require('./lib/index');

const app = express();
const PORT = process.env.PORT || 3000;
app.enable("trust proxy");
app.set("json spaces", 2);

// Mess err
mess = {
    error: {
        status: false,
        message: 'Error, Service Unavaible',
        maintanied_by: 'AyanDev'
    },
    noturl: {
    	status: false,
    	message: 'Error, Invalid Url',
    	maintanied_by: 'AyanDev'
    },
    notquery: {
    	status: false,
    	code: 403,
    	message: 'Error, Invalid Query',
    	maintanied_by: 'AyanDev'
    }
}

// Middleware untuk CORS
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'index.html'));
});

app.get('/stats', (req, res) => {
  const stats = {
    platform: os.platform(),
    architecture: os.arch(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime(),
    cpuModel: os.cpus()[0].model,
    numCores: os.cpus().length,
    loadAverage: os.loadavg(),
    hostname: os.hostname(),
    networkInterfaces: os.networkInterfaces(),
    osType: os.type(),
    osRelease: os.release(),
    userInfo: os.userInfo(),
    processId: process.pid,
    nodeVersion: process.version,
    execPath: process.execPath,
    cwd: process.cwd(),
    memoryUsage: process.memoryUsage()
  };
  res.json(stats);
});

app.get('/api/ragbot', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await scr.ragBot(message);
    res.status(200).json({
      status: 200,
      creator: "AyanDev",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk degreeGuru
app.get('/api/degreeguru', async (req, res) => {
  try {
    const { message }= req.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await scr.degreeGuru(message);
    res.status(200).json({
      status: 200,
      creator: "AyanDev",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk smartContract
app.get('/api/smartcontract', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await scr.smartContract(message);
    res.status(200).json({
      status: 200,
      creator: "AyanDev",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk blackboxAIChat
app.get('/api/blackboxAIChat', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await scr.blackboxAIChat(message);
    res.status(200).json({
      status: 200,
      creator: "AyanDev",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint untuk Roblox
app.get('/api/roblox', async (req, res) => {
  try {
    const message = req.query.message;
    const type = req.query.type; // Tambahkan tipe (name atau id)

    // Cek apakah parameter "message" dan "type" ada
    if (!message || !type) {
      return res.status(400).json({ error: 'Parameter "message" atau "type" tidak ditemukan' });
    }

    // Panggil fungsi Roblox dengan parameter yang benar
    const response = await scr.Roblox(message.split(" "), type); // Pisahkan kata-kata jika diperlukan

    res.status(200).json({
      status: 200,
      creator: "AyanDev",
      data: response
    });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Perbaiki kesalahan penulisan
  }
});




// Handle 404 error
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// Handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app
