===========================================
Run Food Delivery Microservices with PM2
===========================================

🧰 Prerequisites:
Make sure you have Node.js and npm installed.

---

## startt frommm hereee:

cd /mnt/f/Folder_Of_Semester/Semester\ 6/Scd\ lab/LAB\ EXAMMMMM/LAB2

## 1️⃣ Install PM2 globally

npm install -g pm2

---

## 2️⃣ Navigate to your project structure

Assuming your VS Code workspace has:

food-delivery/
├── gateway/
│ └── app.js
├── restaurant-service/
│ └── app.js
├── customer-service/
│ └── app.js
├── order-service/
│ └── app.js

Open the terminal in VS Code from the root (food-delivery/).

---

## 3️⃣ Start All Services with PM2

# Start restaurant-service

cd restaurant-service
pm2 start app.js --name restaurant-service

# Start customer-service

cd ../customer-service
pm2 start app.js --name customer-service

# Start order-service

cd ../order-service
pm2 start app.js --name order-service

# Start API Gateway

cd ../gateway
pm2 start app.js --name api-gateway

---

## 4️⃣ Check PM2 Process List

pm2 list

---

## 5️⃣ View Logs of a Service (optional)

pm2 logs restaurant-service
pm2 logs customer-service
pm2 logs order-service
pm2 logs api-gateway

---

## 6️⃣ Stop or Restart a Service (optional)

pm2 stop api-gateway
pm2 restart api-gateway

---

## 7️⃣ Save Process List for Restart After Reboot (optional)

pm2 save
pm2 startup

# Follow the printed instructions after `pm2 startup`
