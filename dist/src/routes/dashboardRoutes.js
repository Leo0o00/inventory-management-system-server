"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../modules/dashboard/dashboardController");
const router = (0, express_1.Router)();
router.get("", dashboardController_1.getMetrics);
exports.default = router;
