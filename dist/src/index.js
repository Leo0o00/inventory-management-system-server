"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
//Routers IMPORTS
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
BigInt.prototype.toJSON = function () { return Number(this); };
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Dashboard route
app.use("/dashboard", dashboardRoutes_1.default);
// Products routes
app.use("/products", productsRoutes_1.default);
// 
//Server
const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
