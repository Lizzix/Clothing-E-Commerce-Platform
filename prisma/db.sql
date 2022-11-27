PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('f819de1b-a17d-4f24-8cec-fb3af31c1683','2826c44a4ae7499f0a5a4b6c180f74c719b5ec6a950ff8f255da0a849c764eb5',1669284274676,'20221124100434_init',NULL,NULL,1669284274669,1);
CREATE TABLE IF NOT EXISTS "Order_Item" (
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "variationId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("orderId", "productId", "variationId"),
    CONSTRAINT "Order_Item_variation_id_fkey" FOREIGN KEY ("variationId") REFERENCES "Variation" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Order_Item_product_id_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Order_Item_order_id_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO Order_Item VALUES(1,1,1,1);
INSERT INTO Order_Item VALUES(1,1,2,2);
CREATE TABLE IF NOT EXISTS "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,
    "isOnSale" BOOLEAN NOT NULL,
    "startAt" DATETIME NOT NULL,
    "endAt" DATETIME NOT NULL,
    "sellerId" INTEGER NOT NULL,
    CONSTRAINT "Product_seller_id_fkey" FOREIGN KEY ("sellerId") REFERENCES "User" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO Product VALUES(1,'Mens Cotton Jacket','he color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.','https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',1200,0,0,0,0,1);
INSERT INTO Product VALUES(2,'Lock and Love Women''s Removable Hooded Faux Leather Moto Biker Jacket','100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON','https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',780,1,0,0,0,2);
INSERT INTO Product VALUES(3,'MBJ Women''s Solid Short Sleeve Boat Neck V','95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem','https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',500,1,0,0,0,2);
INSERT INTO Product VALUES(4,'Mens Casual Slim Fit','The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.','https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',800,1,0,0,0,3);
INSERT INTO Product VALUES(5,'John Hardy Women''s Legends Naga Gold & Silver Dragon Station Chain Bracelet','Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.','https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',1500,1,0,0,0,4);
CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO User VALUES(1,'bgenty0@barnesandnoble.com','CZz3FuX0P','Bebe','6022245604');
INSERT INTO User VALUES(2,'echasney1@nih.gov','C29ly2','Ekaterina','1141480740');
INSERT INTO User VALUES(3,'ospiteri2@google.com','HK81z0qqV2','Othilia','6433085464');
INSERT INTO User VALUES(4,'elaffin3@tripod.com','oJNIUxO','Ezekiel','8798351150');
INSERT INTO User VALUES(5,'cmoy4@indiegogo.com','1LKT7X01Q59x','Carry','7582160058');
INSERT INTO User VALUES(6,'cleaves5@ihg.com','PN8bAiBwAmK','Christiano','8848927984');
INSERT INTO User VALUES(7,'hbremmell6@cnn.com','vrGN4BJg8C','Hanson','3399728711');
INSERT INTO User VALUES(8,'myanshonok7@squarespace.com','KSsmlj','Martin','1572418689');
INSERT INTO User VALUES(9,'cbeltzner8@nydailynews.com','7Md4HKCo4oF','Carol-jean','1254391394');
INSERT INTO User VALUES(10,'asacase9@odnoklassniki.ru','Ko5ZLdMhL','Alphonse','4691627289');
CREATE TABLE IF NOT EXISTS "Variation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "colorName" TEXT NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "sizeName" TEXT NOT NULL,
    "inventory" INTEGER NOT NULL,
    CONSTRAINT "Variation_product_id_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO Variation VALUES(1,1,1,'white',1,'S',1);
INSERT INTO Variation VALUES(2,1,1,'white',2,'M',10);
INSERT INTO Variation VALUES(3,1,1,'white',3,'L',10);
INSERT INTO Variation VALUES(4,1,1,'white',4,'XL',10);
INSERT INTO Variation VALUES(5,2,1,'yellow',1,'F',5);
INSERT INTO Variation VALUES(6,2,2,'blue',1,'F',5);
INSERT INTO Variation VALUES(7,3,1,'red',1,'S',10);
INSERT INTO Variation VALUES(8,3,1,'red',2,'M',10);
INSERT INTO Variation VALUES(9,3,2,'pink',1,'S',10);
INSERT INTO Variation VALUES(10,3,2,'pink',2,'M',0);
INSERT INTO Variation VALUES(11,4,1,'black',1,'M',10);
INSERT INTO Variation VALUES(12,4,1,'black',2,'L',10);
INSERT INTO Variation VALUES(13,4,2,'grey',1,'M',10);
INSERT INTO Variation VALUES(14,4,2,'grey',2,'L',0);
INSERT INTO Variation VALUES(15,5,1,'green',1,'F',0);
CREATE TABLE IF NOT EXISTS "Order" (
	"id"	INTEGER NOT NULL,
	"buyerId"	INTEGER NOT NULL,
	"sellerId"	INTEGER NOT NULL,
	"totalPrice"	INTEGER NOT NULL,
	"createdAt"	DATETIME NOT NULL,
	"updatedAt"	DATETIME NOT NULL,
	"status"	TEXT NOT NULL,
	"discountId"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "Order_buyer_id_fkey" FOREIGN KEY("buyerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT "Order_seller_id_fkey" FOREIGN KEY("sellerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT "Order_activity_id_fkey" FOREIGN KEY("discountId") REFERENCES "Discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "Order" VALUES(1,6,1,3600,0,0,'ESTABLISHED',NULL);
CREATE TABLE IF NOT EXISTS "User_Coupon" (
	"userId"	INTEGER NOT NULL,
	"discountId"	INTEGER NOT NULL,
	"isUsed"	BOOLEAN NOT NULL,
	CONSTRAINT "User_Coupon_activity_id_fkey" FOREIGN KEY("discountId") REFERENCES "Discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT "User_Coupon_user_id_fkey" FOREIGN KEY("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
	PRIMARY KEY("userId","discountId")
);
INSERT INTO User_Coupon VALUES(6,1,0);
INSERT INTO User_Coupon VALUES(6,2,0);
INSERT INTO User_Coupon VALUES(6,3,1);
INSERT INTO User_Coupon VALUES(6,4,0);
INSERT INTO User_Coupon VALUES(6,5,0);
INSERT INTO User_Coupon VALUES(7,1,0);
INSERT INTO User_Coupon VALUES(7,2,0);
INSERT INTO User_Coupon VALUES(8,5,0);
INSERT INTO User_Coupon VALUES(9,4,0);
INSERT INTO User_Coupon VALUES(1,1,0);
INSERT INTO User_Coupon VALUES(1,2,0);
INSERT INTO User_Coupon VALUES(1,5,0);
CREATE TABLE IF NOT EXISTS "Discount" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"format"	TEXT NOT NULL,
	"scope"	TEXT NOT NULL,
	"type"	TEXT NOT NULL,
	"value"	INTEGER NOT NULL,
	"amount"	INTEGER,
	"available"	BOOLEAN NOT NULL,
	"startAt"	DATETIME NOT NULL,
	"endAt"	DATETIME NOT NULL,
	"productId"	INTEGER,
	"sellerId"	INTEGER NOT NULL,
	CONSTRAINT "Activity_seller_id_fkey" FOREIGN KEY("sellerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT "Activity_product_id_fkey" FOREIGN KEY("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO Discount VALUES(1,'20% OFF','ACTIVITY','PRODUCT','MULTIPLY',80,NULL,0,1669852800000,1670198400000,1,1);
INSERT INTO Discount VALUES(2,'20% OFF','ACTIVITY','STORE','MULTIPLY',80,NULL,1,1669852800000,1672444800000,NULL,1);
INSERT INTO Discount VALUES(3,'-$100 DISCOUNT','COUPON','STORE','MINUS',100,20,1,1667260800000,1669766400000,NULL,2);
INSERT INTO Discount VALUES(4,'NEWCOMER','ACTIVITY','STORE','MINUS',50,NULL,1,1640995200000,1672444800000,NULL,3);
INSERT INTO Discount VALUES(5,'50% OFF','COUPON','PRODUCT','MULTIPLY',50,10,1,1669852800000,1672444800000,5,4);
INSERT INTO Discount VALUES(6,'test','COUPON','STORE','MULTIPLY',90,NULL,1,1670803200000,1670976000000,NULL,1);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('User',12);
INSERT INTO sqlite_sequence VALUES('Product',5);
INSERT INTO sqlite_sequence VALUES('Variation',15);
INSERT INTO sqlite_sequence VALUES('Order',1);
INSERT INTO sqlite_sequence VALUES('Discount',6);
CREATE UNIQUE INDEX "sqlite_autoindex_Product_1" ON "Product"("product_id");
CREATE UNIQUE INDEX "sqlite_autoindex_User_1" ON "User"("user_id");
CREATE UNIQUE INDEX "sqlite_autoindex_User_2" ON "User"("email");
CREATE UNIQUE INDEX "sqlite_autoindex_User_3" ON "User"("phone");
CREATE UNIQUE INDEX "sqlite_autoindex_Variation_1" ON "Variation"("variation_id");
COMMIT;
