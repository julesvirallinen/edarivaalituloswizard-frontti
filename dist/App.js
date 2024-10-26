"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ElectionData_js_1 = __importDefault(require("./Components/ElectionData.js"));
const MenuButtons_js_1 = __importDefault(require("./Components/MenuButtons.js"));
const ViewSingleCandidate_js_1 = __importDefault(require("./Components/ViewSingleCandidate.js"));
const TopCandidates_js_1 = __importDefault(require("./Components/TopCandidates.js"));
const FilterForm_js_1 = __importDefault(require("./Components/FilterForm.js"));
const yearlyData_json_1 = __importDefault(require("./data/yearlyData.json"));
const byCandidate_json_1 = __importDefault(require("./data/byCandidate.json"));
const years_js_1 = require("./dataUtils/years.js");
function App() {
    const [currentYear, setCurrentYear] = (0, react_1.useState)(2020);
    const [currentCandidate, setCurrentCandidate] = (0, react_1.useState)('');
    const [currentPage, setCurrentPage] = (0, react_1.useState)('top candidates');
    const [filter, setFilter] = (0, react_1.useState)('');
    const menuOptions = ['yearly', 'top candidates'];
    if (currentCandidate !== '') {
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(ViewSingleCandidate_js_1.default, { currentCandidate: currentCandidate, candidate: byCandidate_json_1.default[currentCandidate], setCurrentCandidate: setCurrentCandidate }) }));
    }
    if (currentPage === 'yearly') {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(MenuButtons_js_1.default, { setCurrent: setCurrentPage, current: currentPage, options: menuOptions }), (0, jsx_runtime_1.jsx)(MenuButtons_js_1.default, { setCurrent: setCurrentYear, current: currentYear, options: years_js_1.YEARS }), (0, jsx_runtime_1.jsx)(FilterForm_js_1.default, { filter: filter, setFilter: setFilter }), (0, jsx_runtime_1.jsx)(ElectionData_js_1.default, { candidateData: yearlyData_json_1.default[currentYear], setCurrentCandidate: setCurrentCandidate, filter: filter })] }));
    }
    if (currentPage === 'top candidates') {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(MenuButtons_js_1.default, { setCurrent: setCurrentPage, current: currentPage, options: menuOptions }), (0, jsx_runtime_1.jsx)(TopCandidates_js_1.default, { candidateData: byCandidate_json_1.default, setCurrentCandidate: setCurrentCandidate, filter: filter, setFilter: setFilter })] }));
    }
}
exports.default = App;
