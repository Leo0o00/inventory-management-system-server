import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

// Middlewares
import { handleErrors } from "./common/middlewares";

//Routers IMPORTS
import productsRoutes from "./routes/productsRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import productsCategoriesRoutes from "./routes/productsCategoriesRoutes";
import pointOfSalesRoutes from "./routes/pointOfSalesRoutes";
import providerRoutes from "./routes/providerRoutes";

//Para resolver el error: "Error: TypeError: Do not know how to serialize a BigInt"
declare global {
    interface BigInt {
        toJSON(): Number;
    }
}

BigInt.prototype.toJSON = function () { return Number(this) }

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Dashboard route
app.use("/dashboard", dashboardRoutes);

// Products routes
app.use("/products", productsRoutes);

// Products categories routes
app.use("/products-categories", productsCategoriesRoutes);

// Point of Sales routes
app.use("/point-of-sales", pointOfSalesRoutes);

// Providers routes
app.use("/providers", providerRoutes);

// Error handling middleware
app.use(handleErrors);

//Server
const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});