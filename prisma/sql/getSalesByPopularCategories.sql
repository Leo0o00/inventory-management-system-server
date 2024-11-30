SELECT Pc.name AS product_category_name, sum(S.total_amount) AS total_sales
FROM "Sales" AS S
    INNER JOIN "Products" AS P ON P.product_id = S.products_id
    INNER JOIN "Products_categories" AS Pc ON P.category_id = Pc.category_id
GROUP BY product_category_name;