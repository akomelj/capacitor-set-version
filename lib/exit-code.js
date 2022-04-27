"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitCode = void 0;
var ExitCode;
(function (ExitCode) {
    ExitCode[ExitCode["OK"] = 0] = "OK";
    ExitCode[ExitCode["ERROR_PROJECT"] = 1] = "ERROR_PROJECT";
    ExitCode[ExitCode["ERROR_ANDROID"] = 2] = "ERROR_ANDROID";
    ExitCode[ExitCode["ERROR_IOS"] = 3] = "ERROR_IOS";
    ExitCode[ExitCode["ERROR_VERSION"] = 4] = "ERROR_VERSION";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
