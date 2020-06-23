"use strict";
// Para criar um usuário usaremos um nome, email, senha.
Object.defineProperty(exports, "__esModule", { value: true });
function CreateUser(_a) {
    var name = _a.name, _b = _a.email, email = _b === void 0 ? "" : _b, password = _a.password, techs = _a.techs;
    var user = {
        name: name,
        email: email,
        password: password,
        techs: techs,
    };
    return user;
}
exports.default = CreateUser;
