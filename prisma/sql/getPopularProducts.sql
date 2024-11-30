-- @param {Int} $1:totalOutValues

SELECT p.branch AS branch, p.model AS model, p.description AS description, sum(quantity) AS quantity
FROM "Sales" AS S
LEFT OUTER JOIN "Products" AS P on S.products_id = P.product_id
GROUP BY branch, model, description
ORDER BY quantity DESC
LIMIT $1;