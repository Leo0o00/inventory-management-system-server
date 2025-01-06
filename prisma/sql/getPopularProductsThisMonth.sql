SELECT p.branch AS branch, p.model AS model, p.description AS description, sum(Ps.quantity) AS total_quantity_sale
FROM "Products_sales" AS Ps
    INNER JOIN "Products" AS P ON Ps.product_id = P.product_id
    INNER JOIN "Sales" AS S ON Ps.sale_id = S.sales_id
WHERE S.date BETWEEN date_trunc('month', now()) AND now()
GROUP BY p.branch, p.model, p.description
ORDER BY 4 DESC
LIMIT 5;