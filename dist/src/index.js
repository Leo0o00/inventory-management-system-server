"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// Middlewares
const middlewares_1 = require("./common/middlewares");
//Routers IMPORTS
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const productsCategoriesRoutes_1 = __importDefault(require("./routes/productsCategoriesRoutes"));
const pointOfSalesRoutes_1 = __importDefault(require("./routes/pointOfSalesRoutes"));
const providerRoutes_1 = __importDefault(require("./routes/providerRoutes"));
BigInt.prototype.toJSON = function () { return Number(this); };
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// Dashboard route
app.use("/dashboard", dashboardRoutes_1.default);
// Products routes
app.use("/products", productsRoutes_1.default);
// Products categories routes
app.use("/products-categories", productsCategoriesRoutes_1.default);
// Point of Sales routes
app.use("/point-of-sales", pointOfSalesRoutes_1.default);
// Providers routes
app.use("/providers", providerRoutes_1.default);
// Error handling middleware
app.use(middlewares_1.handleErrors);
//Server
const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
