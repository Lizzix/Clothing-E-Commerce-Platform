-- CreateTable
CREATE TABLE "Activity" (
    "activity_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,
    "startAt" DATETIME NOT NULL,
    "endAt" DATETIME NOT NULL,
    "product_id" INTEGER NOT NULL,
    "seller_id" INTEGER NOT NULL,
    CONSTRAINT "Activity_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "User" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Activity_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buyer_id" INTEGER NOT NULL,
    "seller_id" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL,
    "updateAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "activity_id" INTEGER,
    CONSTRAINT "Order_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity" ("activity_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Order_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "User" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Order_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "User" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Order_Item" (
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "variation_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("order_id", "product_id", "variation_id"),
    CONSTRAINT "Order_Item_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "Variation" ("variation_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Order_Item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Order_Item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order" ("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,
    "isOnSale" BOOLEAN NOT NULL,
    "startAt" DATETIME NOT NULL,
    "endAt" DATETIME NOT NULL,
    "seller_id" INTEGER NOT NULL,
    CONSTRAINT "Product_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "User" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User_Coupon" (
    "user_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "isUsed" BOOLEAN NOT NULL,

    PRIMARY KEY ("user_id", "activity_id"),
    CONSTRAINT "User_Coupon_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity" ("activity_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "User_Coupon_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "User_Sells" (
    "seller_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    PRIMARY KEY ("seller_id", "product_id"),
    CONSTRAINT "User_Sells_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "User" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "User_Sells_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Variation" (
    "variation_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "color_id" INTEGER NOT NULL,
    "color_name" TEXT NOT NULL,
    "size_id" INTEGER NOT NULL,
    "size_name" TEXT NOT NULL,
    "inventory" INTEGER NOT NULL,
    CONSTRAINT "Variation_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Activity_1" ON "Activity"("activity_id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Order_1" ON "Order"("order_id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Product_1" ON "Product"("product_id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_User_1" ON "User"("user_id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_User_2" ON "User"("email");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_User_3" ON "User"("phone");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Variation_1" ON "Variation"("variation_id");
Pragma writable_schema=0;
