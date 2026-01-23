
const fs = require('fs');
const https = require('https');
const path = require('path');

// 1. Load .env manually
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim();
    envVars[key] = value;
  }
});

const SUPABASE_URL = envVars.VITE_SUPABASE_URL;
const SUPABASE_KEY = envVars.VITE_SUPABASE_ANON_KEY;

console.log('--- System Connection Check ---');
console.log(`Supabase URL: ${SUPABASE_URL ? '✅ Found' : '❌ Missing'}`);
console.log(`Supabase Key: ${SUPABASE_KEY ? '✅ Found' : '❌ Missing'}`);

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Cannot proceed without Supabase credentials.');
  process.exit(1);
}

// 2. Test Connection via simple HTTP Request
const url = new URL(`${SUPABASE_URL}/rest/v1/`);
const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'GET',
  headers: {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
  }
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  if (res.statusCode >= 200 && res.statusCode < 300) {
    console.log('✅ Database Connection Successful (HTTP 200 OK)');
  } else {
    console.log(`⚠️ Connection responded with status ${res.statusCode}. Check if URL/Key are correct.`);
  }
});

req.on('error', (e) => {
  console.error(`❌ Connection Error: ${e.message}`);
});

req.end();
