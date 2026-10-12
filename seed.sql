INSERT INTO houses (slug, title, description, price, area, bedrooms, bathrooms, type, district, address, status, created_at) VALUES
('nha-hem-xe-hoi-5x20-quan-1', 'Nhà hẻm xe hơi 5x20 trung tâm', 'Mô tả mẫu...', 6500000000, 100, 4, 3, 'nha-pho', 'quan-1', 'Đường A, Quận 1', 'available', strftime('%s','now')),
('biet-thu-san-vuon-quan-2', 'Biệt thự sân vườn', 'Mô tả mẫu...', 18000000000, 300, 5, 4, 'biet-thu', 'quan-2', 'Đường B, Quận 2', 'available', strftime('%s','now'));

INSERT INTO tags (slug, name) VALUES ('hem-xe-hoi', 'Hẻm xe hơi'), ('gan-truong', 'Gần trường');
INSERT INTO house_tags (house_id, tag_id) VALUES (1, 1), (1, 2), (2, 2);