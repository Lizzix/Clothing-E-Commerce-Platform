DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Product`;
DROP TABLE IF EXISTS `Variation`;
DROP TABLE IF EXISTS `Activity`;
DROP TABLE IF EXISTS `User_Coupon`;
DROP TABLE IF EXISTS `User_Sells`;
DROP TABLE IF EXISTS `Order`;
DROP TABLE IF EXISTS `Order_Item`;

-- 用戶：編號、姓名、電話、信箱、密碼
CREATE TABLE `User`(
	user_id			INTEGER			UNIQUE NOT NULL,
	email			VARCHAR(128) 	UNIQUE NOT NULL,
	password 		VARCHAR(32) 	NOT NULL,
	name 			VARCHAR(32) 	NOT NULL,
	phone 			VARCHAR(16) 	UNIQUE NOT NULL,
	PRIMARY KEY("user_id")
);

-- 衣物：名稱、描述、圖片連結、價格、上架與否、開始販售時間、結束販售時間
CREATE TABLE `Product`(
	product_id		INTEGER			UNIQUE NOT NULL,
	name 			VARCHAR(32) 	NOT NULL,
	description 	VARCHAR(128) 	NOT NULL,
	picture 		VARCHAR(128) 	NOT NULL,
	price 			INTEGER			NOT NULL,
	available 		BOOLEAN			NOT NULL,
	isOnSale 		BOOLEAN			NOT NULL,
	startAt 		TIMESTAMP		NOT NULL,
	endAt 			TIMESTAMP		NOT NULL,
	seller_id		INTEGER			NOT NULL,
	FOREIGN KEY("seller_id") REFERENCES `User`("user_id"),
	PRIMARY KEY("product_id")
);

-- 同一件衣服可能有多種顏色及尺碼，系統應紀錄每一顏色與尺碼組合之存貨，並且各顏色、尺碼應有其編號及名稱
CREATE TABLE `Variation`(
	variation_id	INTEGER			UNIQUE NOT NULL,
	product_id		INTEGER			NOT NULL,
	color_id		INTEGER			NOT NULL,
	color_name		VARCHAR(16) 	NOT NULL,
	size_id			INTEGER			NOT NULL,
	size_name		VARCHAR(16)		NOT NULL,
	inventory		INTEGER			NOT NULL,
	FOREIGN KEY ("product_id") REFERENCES `Product`("product_id"),
	PRIMARY KEY("variation_id")
);

CREATE TABLE `Activity`(
	activity_id		INTEGER			UNIQUE NOT NULL,
	name			VARCHAR(32) 	NOT NULL,
	format			VARCHAR(8)		NOT NULL CHECK( format IN ('ACTIVITY', 'COUPON') ),
	scope			VARCHAR(8)		NOT NULL CHECK( scope IN ('STORE','PRODUCT') ),
	type			VARCHAR(8)		NOT NULL CHECK( type IN ('MINUS','MULTIPLY') ),
	value			INTEGER			NOT NULL,
	available 		BOOLEAN			NOT NULL,
	startAt 		TIMESTAMP		NOT NULL,
	endAt 			TIMESTAMP		NOT NULL,
	product_id 		INTEGER			NOT NULL,
	seller_id		INTEGER			NOT NULL,
	FOREIGN KEY("product_id") REFERENCES `Product`("product_id"),
	FOREIGN KEY("seller_id") REFERENCES `User`("user_id"),
	PRIMARY KEY("activity_id")
);

CREATE TABLE `User_Coupon`(
	user_id			INTEGER			NOT NULL,
	activity_id		INTEGER			NOT NULL,
	isUsed			BOOLEAN			NOT NULL,
	FOREIGN KEY("user_id") REFERENCES `User`("user_id"),
	FOREIGN KEY("activity_id") REFERENCES `Activity`("activity_id"),
	PRIMARY KEY("user_id", "activity_id")
);

CREATE TABLE `User_Sells`(
	seller_id		INTEGER			NOT NULL,
	product_id		INTEGER			NOT NULL,
	FOREIGN KEY("product_id") REFERENCES `Product`("product_id"),
	FOREIGN KEY("seller_id") REFERENCES `User`("user_id"),
	PRIMARY KEY("seller_id", "product_id")
);

CREATE TABLE `Order`(
	order_id		INTEGER			UNIQUE NOT NULL,
	buyer_id		INTEGER			NOT NULL,
	seller_id		INTEGER			NOT NULL,
	total_price		INTEGER			NOT NULL,
	createAt		TIMESTAMP		NOT NULL,
	updateAt		TIMESTAMP		NOT NULL,
	status			VARCHAR(16)		NOT NULL CHECK( status IN ('CHECKING', 'ESTABLISHED', 'DEALING', 'SENDED', 'FINISHED', 'CANCELED') ),
	activity_id		INTEGER			,
	FOREIGN KEY("buyer_id") REFERENCES `User`("user_id"),
	FOREIGN KEY("seller_id") REFERENCES `User`("user_id"),
	FOREIGN KEY("activity_id") REFERENCES `Activity`("activity_id"),
	PRIMARY KEY("order_id")
);

CREATE TABLE `Order_Item`(
	order_id 		INTEGER			NOT NULL,
	product_id		INTEGER			NOT NULL,
	variation_id	INTEGER			NOT NULL,
	quantity		INTEGER			NOT NULL,
	FOREIGN KEY("order_id") REFERENCES `Order`("order_id"),
	FOREIGN KEY("product_id") REFERENCES `Product`("product_id"),
	FOREIGN KEY("variation_id") REFERENCES `Variation`("variation_id"),
	PRIMARY KEY("order_id", "product_id", "variation_id")
);