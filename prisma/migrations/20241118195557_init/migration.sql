-- CreateTable
CREATE TABLE "Points_of_sales" (
    "pos_id" UUID NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Points_of_sales_pkey" PRIMARY KEY ("pos_id")
);

-- CreateTable
CREATE TABLE "Products_categories" (
    "category_id" UUID NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Providers" (
    "provider_id" UUID NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "phone_number" VARCHAR(45) NOT NULL,
    "email" VARCHAR(100),
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Providers_pkey" PRIMARY KEY ("provider_id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "employee_id" UUID NOT NULL,
    "CID" VARCHAR(11) NOT NULL,
    "first_name" VARCHAR(45) NOT NULL,
    "last_name" VARCHAR(45) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(45) NOT NULL,
    "point_of_sales_id" UUID NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "Expenses_category" (
    "category_id" UUID NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expenses_category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Products" (
    "product_id" UUID NOT NULL,
    "branch" VARCHAR(45) NOT NULL,
    "model" VARCHAR(45) NOT NULL,
    "category_id" UUID NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "purchase_price" DECIMAL(10,2) NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "provider_id" UUID NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Salary" (
    "salary_id" UUID NOT NULL,
    "employee_id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Salary_pkey" PRIMARY KEY ("salary_id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "sales_id" UUID NOT NULL,
    "products_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("sales_id")
);

-- CreateTable
CREATE TABLE "Purchases" (
    "purchases_id" UUID NOT NULL,
    "products_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("purchases_id")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "expenses_id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "exp_category_id" UUID NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("expenses_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "user_id" UUID NOT NULL,
    "username" VARCHAR(16) NOT NULL,
    "password" TEXT NOT NULL,
    "employee_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_time_online" TIMESTAMP(3),
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Sales_sumary" (
    "sales_sumary_id" UUID NOT NULL,
    "total_sales" DOUBLE PRECISION NOT NULL,
    "changedPercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sales_sumary_pkey" PRIMARY KEY ("sales_sumary_id")
);

-- CreateTable
CREATE TABLE "Purchases_sumary" (
    "purchases_sumary_id" UUID NOT NULL,
    "total_purchased" DOUBLE PRECISION NOT NULL,
    "changedPercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchases_sumary_pkey" PRIMARY KEY ("purchases_sumary_id")
);

-- CreateTable
CREATE TABLE "Expenses_Sumary" (
    "expenses_sumary_id" UUID NOT NULL,
    "expenses_category_id" UUID NOT NULL,
    "total_expenses" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expenses_Sumary_pkey" PRIMARY KEY ("expenses_sumary_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employees_CID_key" ON "Employees"("CID");

-- CreateIndex
CREATE UNIQUE INDEX "Salary_employee_id_key" ON "Salary"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_employee_id_key" ON "Users"("employee_id");

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_point_of_sales_id_fkey" FOREIGN KEY ("point_of_sales_id") REFERENCES "Points_of_sales"("pos_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Products_categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "Providers"("provider_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_exp_category_id_fkey" FOREIGN KEY ("exp_category_id") REFERENCES "Expenses_category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses_Sumary" ADD CONSTRAINT "Expenses_Sumary_expenses_category_id_fkey" FOREIGN KEY ("expenses_category_id") REFERENCES "Expenses_category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
