SELECT count(product_id) AS quantity
FROM "Products"
WHERE stock_quantity = 0;