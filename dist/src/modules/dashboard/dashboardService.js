"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMetrics = listMetrics;
const client_1 = require("@prisma/client");
const sql_1 = require("@prisma/client/sql");
const prisma = new client_1.PrismaClient();
function listMetrics() {
    return __awaiter(this, void 0, void 0, function* () {
        const LIMIT = 5;
        //Total de ventas del mes(comparar con el total del mes anterior)(Valor)
        const totalSalesThisMonth = yield prisma.$queryRawTyped((0, sql_1.getTotalSales)());
        //Productos vendidos en el mes(comparar con el total del mes anterior)(Valor)
        const totalSoldsProds = yield prisma.$queryRawTyped((0, sql_1.getTotalSoldsProdByMonth)());
        //Total de productos en existencia(comparar con el total del mes anterior)(Valor)
        const inStockProducts = yield prisma.$queryRawTyped((0, sql_1.getTotalProducts)());
        //Productos agotados(Valor)
        const noStockProducts = yield prisma.$queryRawTyped((0, sql_1.getNoStockProducts)());
        //Trabajadores con mas ventas(Tabla)
        const topSellingEmployees = yield prisma.$queryRawTyped((0, sql_1.getTopSellingEmployees)(LIMIT));
        //Ventas por puestos de venta(Grafico)
        const salesByPos = yield prisma.$queryRawTyped((0, sql_1.getTotalSalesByPos)());
        //Ventas por categorias mas vendidas(Grafico)
        const salesByPopularCategories = yield prisma.$queryRawTyped((0, sql_1.getSalesByPopularCategories)());
        //Productos mas vendidos(Tabla)
        const popularProducts = yield prisma.$queryRawTyped((0, sql_1.getPopularProducts)(LIMIT));
        //Tendencias en ventas del mes(Tabla)
        const popularProductsThisMonth = yield prisma.$queryRawTyped((0, sql_1.getPopularProductsThisMonth)());
        //Total de ventas del mes(comparar con el total de los meses anteriores del año)(Grafico)
        const totalSalesByMonth = yield prisma.$queryRawTyped((0, sql_1.getTotalSalesByMonth)());
        //Total de inversion del mes(comparar con el total de los meses anteriores del año)(Grafico)
        const totalPurchasesByMonth = yield prisma.$queryRawTyped((0, sql_1.getTotalPurchasesByMonth)());
        //Total de gastos del mes(comparar con el total de los meses anteriores del año)(Grafico)
        const totalExpensesByMonth = yield prisma.$queryRawTyped((0, sql_1.getTotalExpensesByMonth)());
        //Total de gastos del mes(separado por categorias)(Grafico) --- Este esta pendiente a cambios
        // const totalExpensesThisMonth = await prisma.$queryRawTyped(getTotalExpensesThisMonth())
        return {
            popularProducts,
            totalSalesThisMonth,
            totalSoldsProds,
            inStockProducts,
            noStockProducts,
            topSellingEmployees,
            salesByPos,
            salesByPopularCategories,
            popularProductsThisMonth,
            totalSalesByMonth,
            totalPurchasesByMonth,
            // totalExpensesThisMonth,
            totalExpensesByMonth
        };
    });
}
