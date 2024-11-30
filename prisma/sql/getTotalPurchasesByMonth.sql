SELECT
SUM(CASE WHEN extract(month from date) = '01' THEN total_amount
ELSE 0 END) January,
SUM(CASE WHEN extract(month from date) = '02' THEN total_amount
ELSE 0 END) February,
SUM(CASE WHEN extract(month from date) = '03' THEN total_amount
ELSE 0 END) March,
SUM(CASE WHEN extract(month from date) = '04' THEN total_amount
ELSE 0 END) April,
SUM(CASE WHEN extract(month from date) = '05' THEN total_amount
ELSE 0 END) May,
SUM(CASE WHEN extract(month from date) = '06' THEN total_amount
ELSE 0 END) June,
SUM(CASE WHEN extract(month from date) = '07' THEN total_amount
ELSE 0 END) July,
SUM(CASE WHEN extract(month from date) = '08' THEN total_amount
ELSE 0 END) August,
SUM(CASE WHEN extract(month from date) = '09' THEN total_amount
ELSE 0 END) September,
SUM(CASE WHEN extract(month from date) = '10' THEN total_amount
ELSE 0 END) October,
SUM(CASE WHEN extract(month from date) = '11' THEN total_amount
ELSE 0 END) November,
SUM(CASE WHEN extract(month from date) = '12' THEN total_amount
ELSE 0 END) December
FROM "Purchases"
WHERE date BETWEEN date_trunc('year', now()) AND now();