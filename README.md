📸 Cloud Photo Gallery
A cloud-based photo gallery where users can upload, view, and manage their images — all powered by AWS S3 and Node.js.
This app provides a responsive frontend, secure backend, and persistent cloud storage for images.

🌟 Features
📤 Upload images from your device

🖼️ View all uploaded images in a responsive grid

🗑️ Delete images from the gallery (and S3)

☁️ Stores images on AWS S3 (persistent & scalable)

🔒 Secure backend with environment variable protection

🛠 Tech Stack
Layer	Technology
Frontend	HTML, Tailwind CSS, JavaScript
Backend	Node.js, Express
Cloud	AWS S3 (image storage)
Tools	dotenv, multer, AWS SDK v3

🚀 Project Structure
pgsql
Copy
Edit
cloud-photo-gallery/
├── backend/
│   ├── server.js         # Express server with API routes
│   ├── s3.js             # AWS S3 helper functions
│   ├── .env              # 🔒 NOT pushed to GitHub
│   ├── .env.example      # 🌱 Safe config template
├── frontend/
│   ├── index.html        # UI layout
│   ├── app.js            # Upload + view + delete logic
├── .gitignore
└── README.md
📦 .env Configuration
Your .env file (kept private) should look like this:

**env**
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=your-s3-bucket-name
Don't forget to create .env.example to guide others without exposing secrets.

**🧪 Local Setup Instructions**
1. Clone the Repo
git clone https://github.com/your-username/cloud-photo-gallery.git
cd cloud-photo-gallery
2. Setup the Backend
cd backend
npm install
# Create a .env file using the .env.example template
node server.js
3. Setup the Frontend

cd ../frontend
npm install -g serve  # if not installed
serve -l 8080 .
4. Open in Browser
Frontend: http://localhost:8080

Backend: http://localhost:3000



🙌 Credits
Developed by [Badarqa Shakoor]
Powered by AWS and modern web tools.
