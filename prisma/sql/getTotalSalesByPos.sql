SELECT Pos.name AS point_of_sale_name, sum(S.total_amount) AS total_sales
FROM "Sales" AS S
INNER JOIN "Employees" AS E ON E."CID" = S.employee_cid
INNER JOIN "Points_of_sales" AS Pos ON E.pos_name = Pos.name
GROUP BY point_of_sale_name;