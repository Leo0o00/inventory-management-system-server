-- @param {Int} $1:totalOutValues

SELECT concat(e.first_name,' ' , e.last_name) AS full_name, count(*) total_sales
FROM "Sales" AS S
LEFT OUTER JOIN "Employees" AS E ON s.employee_cid = e.CID
GROUP BY full_name
LIMIT $1;