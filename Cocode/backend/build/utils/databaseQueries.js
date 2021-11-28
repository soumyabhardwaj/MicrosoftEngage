"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderQuestion = exports.filterQuestions = void 0;
var db_connection_1 = __importDefault(require("../service/db_connection"));
var filterQuestions = function (tags, difficulty, companies) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, db_connection_1.default)("questions")
                    .join("tags", "questions.question_id", "=", "tags.question_id")
                    .join("companies", "questions.question_id", "=", "companies.question_id")
                    .select("questions.question_id", "question_title", "difficulty")
                    .where(function (builder) {
                    tags.map(function (tag) {
                        builder.orWhere(tag, "true");
                    });
                })
                    .where(function (builder) {
                    companies.map(function (company) {
                        builder.orWhere(company, "true");
                    });
                })
                    .whereIn("difficulty", difficulty)
                    .orderBy([{ column: "question_id", order: "asc" }])];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
exports.filterQuestions = filterQuestions;
var renderQuestion = function (question_id) { return __awaiter(void 0, void 0, void 0, function () {
    var question, tags, companies, question_data, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, db_connection_1.default)("questions").select("*").where("question_id", "=", question_id)];
            case 1:
                question = _a.sent();
                return [4 /*yield*/, (0, db_connection_1.default)("tags").select("*").where("question_id", "=", question_id)];
            case 2:
                tags = _a.sent();
                return [4 /*yield*/, (0, db_connection_1.default)("companies").select("*").where("question_id", "=", question_id)];
            case 3:
                companies = _a.sent();
                return [4 /*yield*/, (0, db_connection_1.default)("questions_data").select("*").where("question_id", "=", question_id)];
            case 4:
                question_data = _a.sent();
                response = {
                    question: __assign(__assign({}, question[0]), question_data[0]),
                    tags: tags[0],
                    companies: companies[0],
                };
                return [2 /*return*/, response];
        }
    });
}); };
exports.renderQuestion = renderQuestion;
