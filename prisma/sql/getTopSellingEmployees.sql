-- @param {Int} $1:totalOutValues

SELECT concat(E.first_name,' ' , E.last_name) AS full_name, count(*) AS total_amount_of_sales, sum(S.quantity) AS total_number_of_products_sold
FROM "Sales" AS S
LEFT OUTER JOIN "Employees" AS E ON S.employee_cid = E."CID"
GROUP BY full_name
LIMIT $1;