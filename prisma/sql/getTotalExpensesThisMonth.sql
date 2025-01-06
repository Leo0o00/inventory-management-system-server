/* SELECT Ec.name AS category_name, sum(E.amount) AS total_amount
FROM "Expenses" AS E
INNER JOIN "Expenses_category" AS Ec on E.exp_category_id = Ec.category_id
WHERE E.date BETWEEN date_trunc('month', now()) AND now()
GROUP BY category_name
ORDER BY 1 DESC; */