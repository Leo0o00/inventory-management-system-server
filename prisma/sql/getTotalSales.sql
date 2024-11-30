SELECT sum(total_amount) AS total_monthly_sales
FROM "Sales" AS S
WHERE S.date BETWEEN date_trunc('month', now()) AND now();
