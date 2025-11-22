const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('/public'));

// In-memory storage
let campaigns = [];
let targets = {}; // { uniqueId: { email, campaignId, clicked, submitted, inputData } }

// Route: Home (training page)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/training.html'));
});

// Route: Launch Campaign
app.post('/api/campaigns', (req, res) => {
  const { name, subject, template, emails } = req.body;
  const campaignId = campaigns.length + 1;

  campaigns.push({ id: campaignId, name, subject, template, emails });

  emails.forEach(email => {
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const link = `http://localhost:${PORT}/track/${uniqueId}`;
    const html = template.replace('{{ link }}', link);

    // Save target info in memory
    targets[uniqueId] = {
      email,
      campaignId,
      clicked: false,
      submitted: false,
      inputData: null
    };

    // Send email
    const transporter = nodemailer.createTransport({ sendmail: true });
    transporter.sendMail({
      from: 'no-reply@phishing-lab.com',
      to: email,
      subject,
      html
    });
  });

  res.json({ message: "Campaign launched successfully." });
});

// Route: Tracking link
app.get('/track/:uid', (req, res) => {
  const uid = req.params.uid;
  const target = targets[uid];

  if (!target) return res.status(404).send("Invalid tracking link.");

  if (!target.clicked) target.clicked = true;

  res.send(`
    <h2>Secure Login</h2>
    <form method="POST" action="/track/${uid}">
      Email: <input name="email"><br>
      Password: <input name="password" type="password"><br>
      <input type="submit" value="Login">
    </form>
  `);
});

// Route: Form submission
app.post('/track/:uid', (req, res) => {
  const uid = req.params.uid;
  const target = targets[uid];

  if (!target) return res.status(404).send("Invalid submission.");

  let body = '';
  req.on('data', chunk => body += chunk.toString());
  req.on('end', () => {
    target.submitted = true;
    target.inputData = body;
    res.redirect('/training');
  });
});

// Route: Training page
app.get('/training', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

// Route: Analytics (optional)
app.get('/api/analytics', (req, res) => {
  const total = Object.keys(targets).length;
  const clicked = Object.values(targets).filter(t => t.clicked).length;
  const submitted = Object.values(targets).filter(t => t.submitted).length;

  res.json({ total, clicked, submitted });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});