# Sử dụng hình ảnh Node.js chính thức với phiên bản 20 dựa trên Alpine Linux
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies từ package.json với tùy chọn --force
RUN npm install --force

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build ứng dụng (nếu cần)
RUN npm run build

# Mở cổng 3000 để ứng dụng có thể được truy cập
EXPOSE 3000

# Lệnh chạy ứng dụng khi container khởi động
CMD ["npm", "start"]
