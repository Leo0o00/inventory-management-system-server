SELECT Pc.name AS product_category_name, sum(Ps.total_price) AS total_sales
FROM "Products_sales" AS Ps
    INNER JOIN "Products" AS P ON P.product_id = Ps.product_id
    INNER JOIN "Products_categories" AS Pc ON P.category_name = Pc.name
GROUP BY product_category_name
ORDER BY total_sales DESC;