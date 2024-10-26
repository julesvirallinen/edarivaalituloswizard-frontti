"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./index.scss");
require("bootstrap/dist/css/bootstrap.min.css");
const App_js_1 = __importDefault(require("./App.js"));
const client_1 = require("react-dom/client");
(0, client_1.createRoot)(document.getElementById('root')).render((0, jsx_runtime_1.jsx)(App_js_1.default, {}));
