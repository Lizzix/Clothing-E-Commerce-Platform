DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Product`;
DROP TABLE IF EXISTS `Variation`;
DROP TABLE IF EXISTS `Discount`;
DROP TABLE IF EXISTS `User_Coupon`;
DROP TABLE IF EXISTS `User_Sells`;
DROP TABLE IF EXISTS `Order`;
DROP TABLE IF EXISTS `Order_Item`;

-- 用戶：編號、姓名、電話、信箱、密碼
CREATE TABLE `User`(
	id				INTEGER			UNIQUE NOT NULL,
	email			VARCHAR(128) 	UNIQUE NOT NULL,
	password 		VARCHAR(32) 	NOT NULL,
	name 			VARCHAR(32) 	NOT NULL,
	phone 			VARCHAR(16) 	UNIQUE NOT NULL,
	PRIMARY KEY("id")
);

-- 衣物：名稱、描述、圖片連結、價格、上架與否、開始販售時間、結束販售時間
CREATE TABLE `Product`(
	id		INTEGER			UNIQUE NOT NULL,
	name 			VARCHAR(32) 	NOT NULL,
	description 	VARCHAR(128) 	NOT NULL,
	picture 		VARCHAR(128) 	NOT NULL,
	price 			INTEGER			NOT NULL,
	available 		BOOLEAN			NOT NULL,
	isOnSale 		BOOLEAN			NOT NULL,
	startAt 		TIMESTAMP		NOT NULL,
	endAt 			TIMESTAMP		NOT NULL,
	sellerId		INTEGER			NOT NULL,
	FOREIGN KEY("sellerId") REFERENCES `User`("id"),
	PRIMARY KEY("id")
);

-- 同一件衣服可能有多種顏色及尺碼，系統應紀錄每一顏色與尺碼組合之存貨，並且各顏色、尺碼應有其編號及名稱
CREATE TABLE `Variation`(
	id				INTEGER			UNIQUE NOT NULL,
	productId		INTEGER			NOT NULL,
	colorId			INTEGER			NOT NULL,
	colorName		VARCHAR(16) 	NOT NULL,
	sizeId			INTEGER			NOT NULL,
	sizeName		VARCHAR(16)		NOT NULL,
	inventory		INTEGER			NOT NULL,
	FOREIGN KEY ("productId") REFERENCES `Product`("id"),
	PRIMARY KEY("id")
);

CREATE TABLE `Discount`(
	id		INTEGER			UNIQUE NOT NULL,
	name			VARCHAR(32) 	NOT NULL,
	format			VARCHAR(8)		NOT NULL CHECK( format IN ('ACTIVITY', 'COUPON') ),
	scope			VARCHAR(8)		NOT NULL CHECK( scope IN ('STORE','PRODUCT') ),
	type			VARCHAR(8)		NOT NULL CHECK( type IN ('MINUS','MULTIPLY') ),
	value			INTEGER			NOT NULL,
	amount			INTEGER			NOT NULL,
	available 		BOOLEAN			NOT NULL,
	startAt 		TIMESTAMP		NOT NULL,
	endAt 			TIMESTAMP		NOT NULL,
	productId 		INTEGER			,
	sellerId		INTEGER			NOT NULL,
	FOREIGN KEY("productId") REFERENCES `Product`("id"),
	FOREIGN KEY("sellerId") REFERENCES `User`("id"),
	PRIMARY KEY("id")
);

CREATE TABLE `User_Coupon`(
	userId			INTEGER			NOT NULL,
	discountId		INTEGER			NOT NULL,
	isUsed			BOOLEAN			NOT NULL,
	FOREIGN KEY("userId") REFERENCES `User`("id"),
	FOREIGN KEY("discountId") REFERENCES `Discount`("id"),
	PRIMARY KEY("userId", "discountId")
);

CREATE TABLE `Order`(
	id				INTEGER			UNIQUE NOT NULL,
	buyerId			INTEGER			NOT NULL,
	sellerId		INTEGER			NOT NULL,
	totalPrice		INTEGER			NOT NULL,
	createdAt		TIMESTAMP		NOT NULL,
	updatedAt		TIMESTAMP		NOT NULL,
	status			VARCHAR(16)		NOT NULL CHECK( status IN ('CHECKING', 'ESTABLISHED', 'DEALING', 'SENDED', 'FINISHED', 'CANCELED') ),
	discountId		INTEGER			,
	FOREIGN KEY("buyerId") REFERENCES `User`("id"),
	FOREIGN KEY("sellerId") REFERENCES `User`("id"),
	FOREIGN KEY("discountId") REFERENCES `Discount`("id"),
	PRIMARY KEY("id")
);

CREATE TABLE `Order_Item`(
	orderId 		INTEGER			NOT NULL,
	productId		INTEGER			NOT NULL,
	variationId		INTEGER			NOT NULL,
	quantity		INTEGER			NOT NULL,
	FOREIGN KEY("orderId") REFERENCES `Order`("id"),
	FOREIGN KEY("productId") REFERENCES `Product`("id"),
	FOREIGN KEY("variationId") REFERENCES `Variation`("id"),
	PRIMARY KEY("orderId", "productId", "variationId")
);