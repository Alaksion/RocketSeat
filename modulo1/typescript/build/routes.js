"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateUser_1 = __importDefault(require("./services/CreateUser"));
function helloWorld(req, res) {
    var user = CreateUser_1.default({
        name: "Lucao",
        password: "12345",
        techs: [
            { tech: "Javascript", skill: 100 },
            { tech: "Node", skill: 100 },
            "Deno",
            "React Native"
        ]
    });
    return res.json(user);
}
exports.default = helloWorld;
