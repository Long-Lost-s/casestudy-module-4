-- Thêm quyền vào bảng roles
INSERT INTO roles (name) VALUES ('ROLE_ADMIN'), ('ROLE_USER');

-- Thêm một số danh mục món ăn
INSERT INTO categories (name, image_url) VALUES
('Món Bún', 'image5.jpg'),
('Món Cơm', 'image4.jpg');

-- Thêm một số món ăn
INSERT INTO foods (name, address, image_url, open_time, close_time, price, discount_price, discount_usage_count, preparation_time, category_id, featured,  order_count, special_offer, views)
VALUES 
('Bún Bò Huế', '123 Lê Lợi, Huế', 'bunbohue.jpg', '07:00:00', '20:00:00', 50000, 40000,1 ,10, 2, 1, 1,1,1),
('Phở Bò', '456 Nguyễn Trãi, Hà Nội', 'phobo.jpg', '06:30:00', '21:30:00', 60000, 50000,1 ,15, 2,1, 2,1,1),
('Cơm Gà', '789 Lý Tự Trọng, Đà Nẵng', 'comga.jpg', '08:00:00', '22:00:00', 70000,50000,1 ,20, 2,1, 3,1,1);

-- Thêm tags
INSERT INTO tags (name, slug) VALUES 
('Ăn Trưa', 'an-trua'),
('Món Nướng', 'mon-nuong'),
('Ăn Chay', 'an-chay');

-- Gán tags cho món ăn
INSERT INTO food_tags (food_id, tag_id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- servicefee
insert into servicefee (service_fee, service_fee_description) values
(20000, 'shipping fee');
