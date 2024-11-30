SELECT Pos.name AS point_of_sale_name, sum(S.total_amount) AS total_sales
FROM "Sales" AS S
INNER JOIN "Products" AS P ON P.product_id = S.products_id
INNER JOIN "Points_of_sales" AS Pos ON P.points_of_sales_id = Pos.pos_id
GROUP BY point_of_sale_name;