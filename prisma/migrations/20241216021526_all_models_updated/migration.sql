-- CreateTable
CREATE TABLE "Points_of_sales" (
    "point_of_sales_id" UUID NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "img" VARCHAR DEFAULT 'no-image',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Points_of_sales_pkey" PRIMARY KEY ("point_of_sales_id")
);

-- CreateTable
CREATE TABLE "Products_categories" (
    "products_categories_id" UUID NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_categories_pkey" PRIMARY KEY ("products_categories_id")
);

-- CreateTable
CREATE TABLE "Providers" (
    "provider_id" UUID NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "phone_number" VARCHAR(45) NOT NULL,
    "email" VARCHAR(100),
    "img" VARCHAR DEFAULT 'no-image',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Providers_pkey" PRIMARY KEY ("provider_id")
);

-- CreateTable
CREATE TABLE "Products" (
    "product_id" UUID NOT NULL,
    "branch" VARCHAR(45) NOT NULL,
    "model" VARCHAR(45) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "img" VARCHAR DEFAULT 'no-image',
    "purchase_price" DECIMAL(10,2) NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "category_name" TEXT NOT NULL,
    "provider_name" TEXT NOT NULL,
    "pos_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "employee_id" UUID NOT NULL,
    "CID" VARCHAR(11) NOT NULL,
    "first_name" VARCHAR(45) NOT NULL,
    "last_name" VARCHAR(45) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(45),
    "img" VARCHAR DEFAULT 'no-image',
    "pos_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,
    "salarySalary_id" UUID NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "Salary" (
    "employee_cid" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Sales" (
    "sales_id" UUID NOT NULL,
    "employee_cid" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("sales_id")
);

-- CreateTable
CREATE TABLE "Products_sales" (
    "sale_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,

    CONSTRAINT "Products_sales_pkey" PRIMARY KEY ("sale_id","product_id")
);

-- CreateTable
CREATE TABLE "Purchases" (
    "purchases_id" UUID NOT NULL,
    "products_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("purchases_id")
);

-- CreateTable
CREATE TABLE "Expenses_category" (
    "expense_category_id" UUID NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expenses_category_pkey" PRIMARY KEY ("expense_category_id")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "expenses_id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "exp_category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("expenses_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "user_id" UUID NOT NULL,
    "username" VARCHAR(16) NOT NULL,
    "password" TEXT NOT NULL,
    "employee_id" UUID NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_time_online" TIMESTAMP(3),
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Points_of_sales_name_key" ON "Points_of_sales"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Points_of_sales_img_key" ON "Points_of_sales"("img");

-- CreateIndex
CREATE UNIQUE INDEX "Products_categories_name_key" ON "Products_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Providers_name_key" ON "Providers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Providers_phone_number_key" ON "Providers"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Providers_img_key" ON "Providers"("img");

-- CreateIndex
CREATE UNIQUE INDEX "Products_img_key" ON "Products"("img");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_CID_key" ON "Employees"("CID");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_phone_number_key" ON "Employees"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_img_key" ON "Employees"("img");

-- CreateIndex
CREATE UNIQUE INDEX "Salary_employee_cid_key" ON "Salary"("employee_cid");

-- CreateIndex
CREATE UNIQUE INDEX "Expenses_category_name_key" ON "Expenses_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_employee_id_key" ON "Users"("employee_id");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "Products_categories"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_provider_name_fkey" FOREIGN KEY ("provider_name") REFERENCES "Providers"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_pos_name_fkey" FOREIGN KEY ("pos_name") REFERENCES "Points_of_sales"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_pos_name_fkey" FOREIGN KEY ("pos_name") REFERENCES "Points_of_sales"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_employee_cid_fkey" FOREIGN KEY ("employee_cid") REFERENCES "Employees"("CID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_employee_cid_fkey" FOREIGN KEY ("employee_cid") REFERENCES "Employees"("CID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products_sales" ADD CONSTRAINT "Products_sales_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sales"("sales_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products_sales" ADD CONSTRAINT "Products_sales_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_exp_category_name_fkey" FOREIGN KEY ("exp_category_name") REFERENCES "Expenses_category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
