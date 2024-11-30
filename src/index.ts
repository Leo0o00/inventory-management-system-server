import express from "express";
import bodyParser from "body-parser";

//Routers IMPORTS
import productsRoutes from "./routes/productsRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

//Para resolver el error: "Error: TypeError: Do not know how to serialize a BigInt"
declare global {
    interface BigInt {
        toJSON(): Number;
    }
}

BigInt.prototype.toJSON = function () { return Number(this) }

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Dashboard route
app.use("/dashboard", dashboardRoutes);

// Products routes
app.use("/products", productsRoutes);


// 

//Server
const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});