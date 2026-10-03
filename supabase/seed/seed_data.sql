-- ==============================================================================
-- NIRAV KHIMAT VIHAR — INITIAL SEED DATA (DEVELOPMENT & DEMO PURPOSES)
-- NOTE: Real property data, room counts, and tariffs must be verified by management.
-- ==============================================================================

-- 1. Insert Initial Super Admin (Password: Admin@NKV2026! hashed with bcrypt)
-- Hash generated for default admin development access
INSERT INTO admins (id, email, password_hash, name, role, is_active)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'admin@niravkhimatvihar.com',
  '$2b$10$w8cRk8zT2H2VpZb7wS4J1u1R7T.8e5Kx2Lz8M9Q1P3O5R7T9U1V3W',
  'Dharamshala Administrator',
  'SUPER_ADMIN',
  true
) ON CONFLICT (email) DO NOTHING;

-- 2. Insert Room Types
INSERT INTO room_types (id, name, slug, description, short_description, capacity, base_price, currency, bed_type, room_size_sqft, is_active)
VALUES 
(
  'b0000000-0000-0000-0000-000000000001',
  '2-Bed Standard A/C Room',
  '2-bed-standard-ac',
  'Spacious and serene air-conditioned accommodation ideal for yatris and couples. Features clean attached washroom with 24-hour hot water, comfortable twin beds, and peaceful ambiance designed for restful stay after Shatrunjaya Yatra.',
  'Serene air-conditioned room for 2 guests with attached modern bath & hot water.',
  2,
  1200.00,
  'INR',
  '2 Single Beds',
  180,
  true
),
(
  'b0000000-0000-0000-0000-000000000002',
  '3-Bed Executive A/C Room',
  '3-bed-executive-ac',
  'Comfortable air-conditioned family room accommodating up to 3 guests. Equipped with superior ventilation, attached bathroom, continuous hot water, luggage wardrobe, and clean linen.',
  'Spacious A/C room for 3 guests with premium bedding and pristine attached bath.',
  3,
  1600.00,
  'INR',
  '3 Single Beds / 1 Queen + 1 Single',
  240,
  true
),
(
  'b0000000-0000-0000-0000-000000000003',
  '4-Bed Family A/C Room',
  '4-bed-family-ac',
  'Designed for pilgrim families visiting Palitana together. Features spacious quarters, 4 comfortable beds, ample storage space, double vanity washroom facilities, and 24-hour hot water.',
  'Large family A/C suite for 4 guests with spacious quarters and dedicated amenities.',
  4,
  2000.00,
  'INR',
  '4 Single Beds',
  320,
  true
),
(
  'b0000000-0000-0000-0000-000000000004',
  '6-Bed Yatri Suite A/C',
  '6-bed-yatri-suite',
  'Generously proportioned group suite tailored for Sangh yatris and extended family groups. Features multiple beds, spacious attached bathroom, hot water geyser, and peaceful courtyard views.',
  'Generous group suite for 6 yatris with ample space and complete amenities.',
  6,
  2800.00,
  'INR',
  '6 Single Beds',
  450,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Room Amenities
INSERT INTO room_amenities (room_type_id, name, icon_name)
VALUES
-- 2 Bed
('b0000000-0000-0000-0000-000000000001', 'Split Air Conditioning', 'Snowflake'),
('b0000000-0000-0000-0000-000000000001', 'Attached Bathroom', 'Bath'),
('b0000000-0000-0000-0000-000000000001', '24-Hour Hot Water', 'Flame'),
('b0000000-0000-0000-0000-000000000001', 'Pure RO Drinking Water', 'Droplets'),
('b0000000-0000-0000-0000-000000000001', 'Daily Housekeeping', 'Sparkles'),

-- 3 Bed
('b0000000-0000-0000-0000-000000000002', 'Split Air Conditioning', 'Snowflake'),
('b0000000-0000-0000-0000-000000000002', 'Attached Bathroom', 'Bath'),
('b0000000-0000-0000-0000-000000000002', '24-Hour Hot Water', 'Flame'),
('b0000000-0000-0000-0000-000000000002', 'Wardrobe & Luggage Rack', 'DoorClosed'),
('b0000000-0000-0000-0000-000000000002', 'Pure RO Drinking Water', 'Droplets'),

-- 4 Bed
('b0000000-0000-0000-0000-000000000003', 'Split Air Conditioning', 'Snowflake'),
('b0000000-0000-0000-0000-000000000003', 'Attached Bathroom', 'Bath'),
('b0000000-0000-0000-0000-000000000003', '24-Hour Hot Water', 'Flame'),
('b0000000-0000-0000-0000-000000000003', 'Spacious Seating Area', 'Armchair'),
('b0000000-0000-0000-0000-000000000003', 'Pure RO Drinking Water', 'Droplets'),

-- 6 Bed
('b0000000-0000-0000-0000-000000000004', 'Split Air Conditioning', 'Snowflake'),
('b0000000-0000-0000-0000-000000000004', 'Large Attached Bathroom', 'Bath'),
('b0000000-0000-0000-0000-000000000004', '24-Hour Hot Water', 'Flame'),
('b0000000-0000-0000-0000-000000000004', 'Multiple Charging Ports', 'Zap'),
('b0000000-0000-0000-0000-000000000004', 'Pure RO Drinking Water', 'Droplets');

-- 4. Insert Physical Concrete Rooms
INSERT INTO rooms (id, room_type_id, room_number, floor, status, is_active)
VALUES
-- 2-Bed Standard Rooms
('c0000000-0000-0000-0000-000000000101', 'b0000000-0000-0000-0000-000000000001', 'A-101', 1, 'AVAILABLE', true),
('c0000000-0000-0000-0000-000000000102', 'b0000000-0000-0000-0000-000000000001', 'A-102', 1, 'AVAILABLE', true),
('c0000000-0000-0000-0000-000000000103', 'b0000000-0000-0000-0000-000000000001', 'A-103', 1, 'AVAILABLE', true),
('c0000000-0000-0000-0000-000000000104', 'b0000000-0000-0000-0000-000000000001', 'A-104', 1, 'AVAILABLE', true),

-- 3-Bed Executive Rooms
('c0000000-0000-0000-0000-000000000201', 'b0000000-0000-0000-0000-000000000002', 'B-201', 2, 'AVAILABLE', true),
('c0000000-0000-0000-0000-000000000202', 'b0000000-0000-0000-0000-000000000002', 'B-202', 2, 'AVAILABLE', true),
('c0000000-0000-0000-0000-000000000203', 'b0000000-0000-0000-0000-000000000002', 'B-203', 2, 'AVAILABLE', true),
('c0000000-0000-0000-0000-000000000204', 'b0000000-0000-0000-0000-000000000002', 'B-204', 2, 'AVAILABLE', true),

-- 4-Bed Family Rooms
('c0000000-0000-0000-0000-000000000301', 'b0000000-0000-0000-0000-000000000003', 'C-301', 3, 'AVAILABLE', true),
('c0000000-0000-0000-0000-000000000302', 'b0000000-0000-0000-0000-000000000003', 'C-302', 3, 'AVAILABLE', true),
('c0000000-0000-0000-0000-000000000303', 'b0000000-0000-0000-0000-000000000003', 'C-303', 3, 'AVAILABLE', true),
('c0000000-0000-0000-0000-000000000304', 'b0000000-0000-0000-0000-000000000003', 'C-304', 3, 'AVAILABLE', true),

-- 6-Bed Yatri Suites
('c0000000-0000-0000-0000-000000000401', 'b0000000-0000-0000-0000-000000000004', 'D-401', 4, 'AVAILABLE', true),
('c0000000-0000-0000-0000-000000000402', 'b0000000-0000-0000-0000-000000000004', 'D-402', 4, 'AVAILABLE', true)
ON CONFLICT (room_number) DO NOTHING;

-- 5. Insert Gallery Placeholders
INSERT INTO gallery_items (title, category, image_url, alt_text, is_active, sort_order)
VALUES
('Dharamshala Exterior Architecture', 'property', '/images/gallery/exterior-1.jpg', 'Peaceful exterior facade of Nirav Khimat Vihar Dharamshala in Palitana', true, 1),
('Serene Guest Accommodation', 'rooms', '/images/gallery/room-1.jpg', 'Clean, well-lit air-conditioned pilgrim room with comfortable beds', true, 2),
('Bhojanshala Satvik Dining', 'dining', '/images/gallery/dining-1.jpg', 'Pure Jain Bhojanshala dining facility serving traditional satvik meals', true, 3),
('Reception & Welcome Lounge', 'property', '/images/gallery/reception-1.jpg', 'Warm and welcoming reception desk and waiting lounge for yatris', true, 4),
('Palitana Shatrunjaya Hill View', 'palitana', '/images/gallery/palitana-1.jpg', 'Sacred Shatrunjaya hill vista near Taleti Palitana', true, 5),
('Clean Corridors & Peaceful Courtyard', 'property', '/images/gallery/courtyard-1.jpg', 'Peaceful inner courtyard with lush potted plants and natural sunlight', true, 6);
