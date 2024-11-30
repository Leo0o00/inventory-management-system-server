SELECT
SUM(CASE WHEN extract(month from date) = '01' THEN amount
ELSE 0 END) January,
SUM(CASE WHEN extract(month from date) = '02' THEN amount
ELSE 0 END) February,
SUM(CASE WHEN extract(month from date) = '03' THEN amount
ELSE 0 END) March,
SUM(CASE WHEN extract(month from date) = '04' THEN amount
ELSE 0 END) April,
SUM(CASE WHEN extract(month from date) = '05' THEN amount
ELSE 0 END) May,
SUM(CASE WHEN extract(month from date) = '06' THEN amount
ELSE 0 END) June,
SUM(CASE WHEN extract(month from date) = '07' THEN amount
ELSE 0 END) July,
SUM(CASE WHEN extract(month from date) = '08' THEN amount
ELSE 0 END) August,
SUM(CASE WHEN extract(month from date) = '09' THEN amount
ELSE 0 END) September,
SUM(CASE WHEN extract(month from date) = '10' THEN amount
ELSE 0 END) October,
SUM(CASE WHEN extract(month from date) = '11' THEN amount
ELSE 0 END) November,
SUM(CASE WHEN extract(month from date) = '12' THEN amount
ELSE 0 END) December
FROM "Expenses"
WHERE date BETWEEN date_trunc('year', now()) AND now();