import { PrismaClient } from "@prisma/client";
import {
    getPopularProducts,
    getTotalSales,
    getTotalSoldsProdByMonth,
    getTotalProducts,
    getNoStockProducts,
    getTopSellingEmployees,
    getTotalSalesByPos,
    getPopularProductsThisMonth,
    getSalesByPopularCategories,
    getTotalSalesByMonth,
    getTotalPurchasesByMonth,
    getTotalExpensesThisMonth,
    getTotalExpensesByMonth
} from "@prisma/client/sql";

const prisma = new PrismaClient();

export async function listMetrics() {
    const LIMIT = 5;

    //Total de ventas del mes(comparar con el total del mes anterior)(Valor)
    const totalSalesThisMonth = await prisma.$queryRawTyped(getTotalSales());

    //Productos vendidos en el mes(comparar con el total del mes anterior)(Valor)
    const totalSoldsProds = await prisma.$queryRawTyped(getTotalSoldsProdByMonth());
    
    //Total de productos en existencia(comparar con el total del mes anterior)(Valor)
    const inStockProducts = await prisma.$queryRawTyped(getTotalProducts());

    //Productos agotados(Valor)
    const noStockProducts = await prisma.$queryRawTyped(getNoStockProducts());

    //Trabajadores con mas ventas(Tabla)
    const topSellingEmployees = await prisma.$queryRawTyped(getTopSellingEmployees(LIMIT));

    //Ventas por puestos de venta(Grafico)
    const salesByPos = await prisma.$queryRawTyped(getTotalSalesByPos());

    //Ventas por categorias mas vendidas(Grafico)
    const salesByPopularCategories = await prisma.$queryRawTyped(getSalesByPopularCategories());

    //Productos mas vendidos(Tabla)
    const popularProducts = await prisma.$queryRawTyped(getPopularProducts(LIMIT));

    //Tendencias en ventas del mes(Tabla)
    const popularProductsThisMonth = await prisma.$queryRawTyped(getPopularProductsThisMonth());

    //Total de ventas del mes(comparar con el total de los meses anteriores del año)(Grafico)
    const totalSalesByMonth = await prisma.$queryRawTyped(getTotalSalesByMonth());
    
    //Total de inversion del mes(comparar con el total de los meses anteriores del año)(Grafico)
    const totalPurchasesByMonth = await prisma.$queryRawTyped(getTotalPurchasesByMonth())

    //Total de gastos del mes(comparar con el total de los meses anteriores del año)(Grafico)
    const totalExpensesByMonth = await prisma.$queryRawTyped(getTotalExpensesByMonth())

    //Total de gastos del mes(separado por categorias)(Grafico)
    const totalExpensesThisMonth = await prisma.$queryRawTyped(getTotalExpensesThisMonth())
    


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
        totalExpensesThisMonth,
        totalExpensesByMonth
    };
    
}