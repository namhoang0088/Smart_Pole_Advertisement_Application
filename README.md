## Cài Đặt và Chạy Ứng Dụng

### 1. **Xây Dựng Docker Image**

Để xây dựng Docker image từ Dockerfile, sử dụng lệnh sau trong thư mục chứa Dockerfile:

docker build -t smart-pole-app .

### 1. **Chạy Docker Container**

Sau khi xây dựng image thành công, có thể chạy container từ image này bằng lệnh:

docker run -d -p 3000:3000 --name smart-pole-app-container smart-pole-app
