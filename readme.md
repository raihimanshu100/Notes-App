1 --  Clone the repo
```bash
git clone https://github.com/raihimanshu100/notes-app.git
cd notes-app

2-- Backend Setup
bash
cd server
npm install
# Create a .env file (see .env.example)
npm start


3-- Frontend Setup
bash
cd ../client
npm install
npm start

.env Setup 

# === MongoDB ===
MONGO_URI=your_mongodb_uri

# === Session Secret ===
SESSION_SECRET=superstrongsecretkey // i have included mine or you can generate your own but remember to use the same everywhere.

# === Google OAuth2 ===
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# === Email OTP (Nodemailer setup) ===
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password


{
⚠Gmail requires App Password (not normal password).
Use .env.example as a guide.
}
