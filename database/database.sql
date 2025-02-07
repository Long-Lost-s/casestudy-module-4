CREATE DATABASE food_manage;
USE food_manage;

-- Bảng users
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       restaurant_name VARCHAR(255),
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng roles
CREATE TABLE roles (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name ENUM('ROLE_ADMIN', 'ROLE_USER', 'ROLE_SELLER') NOT NULL UNIQUE
);

-- Bảng users_roles
CREATE TABLE users_roles (
                             user_id BIGINT,
                             role_id BIGINT,
                             PRIMARY KEY (user_id, role_id),
                             FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                             FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Bảng ServiceFee
CREATE TABLE ServiceFee (
                            ID INT AUTO_INCREMENT PRIMARY KEY,
                            service_fee DECIMAL(10,2) DEFAULT 0,
                            service_fee_description TEXT NOT NULL
);

-- Bảng categories
CREATE TABLE categories (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(255) NOT NULL UNIQUE,
                            image_url TEXT NOT NULL,
                            location_count INT DEFAULT 0
);

-- Bảng foods (đảm bảo bảng này được tạo trước khi bảng food_tags)
CREATE TABLE foods (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       address VARCHAR(255) NOT NULL,
                       image_url TEXT NOT NULL,
                       open_time TIME NOT NULL,
                       close_time TIME NOT NULL,
                       notes TEXT,
                       price DECIMAL(10,2) NOT NULL,
                       discount_price DECIMAL(10,2) NOT NULL,
                       service_fee_id INT,
                       FOREIGN KEY (service_fee_id) REFERENCES ServiceFee(ID),
                       preparation_time INT NOT NULL, -- Thời gian chuẩn bị (phút)
                       discount_code VARCHAR(50),
                       discount_usage_count INT DEFAULT 0,
                       views INT DEFAULT 0,
                       order_count INT DEFAULT 0,
                       featured BOOLEAN DEFAULT FALSE,   -- món ăn đề cử
                       specialoffer BOOLEAN DEFAULT FALSE, -- Món ăn ưu đãi
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       restaurant_name VARCHAR(255),
                       category_id BIGINT,
                       FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Bảng tags
CREATE TABLE tags (
                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                      name VARCHAR(255) NOT NULL UNIQUE,
                      slug VARCHAR(255) NOT NULL UNIQUE,
                      add_count INT DEFAULT 0, -- Số lần tag được thêm vào món ăn
                      view_count INT DEFAULT 0  -- Số lượt xem tag
);

-- Bảng food_tags (bảng này có thể tạo sau khi bảng foods và tags đã tồn tại)
CREATE TABLE food_tags (
                           food_id BIGINT,
                           tag_id BIGINT,
                           PRIMARY KEY (food_id, tag_id),
                           FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE,
                           FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Bảng orders
CREATE TABLE orders (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        user_id BIGINT,
                        food_id BIGINT,
                        quantity INT NOT NULL,
                        total_price DECIMAL(10,2) NOT NULL,
                        order_status ENUM('PENDING', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
                        FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
);

-- Bảng order_items
CREATE TABLE order_items (
                             id BIGINT AUTO_INCREMENT PRIMARY KEY,
                             order_id BIGINT,
                             food_id BIGINT,
                             quantity INT NOT NULL,
                             price DECIMAL(10,2) NOT NULL,
                             FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                             FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
);
