SELECT p.branch AS branch, p.model AS model, p.description AS description, sum(S.quantity) AS total_quantity_sale
FROM "Sales" AS S INNER JOIN "Products" AS P ON S.products_id = P.product_id
WHERE S.date BETWEEN date_trunc('month', now()) AND now()
GROUP BY p.branch, p.model, p.description
ORDER BY 4 DESC
LIMIT 5;