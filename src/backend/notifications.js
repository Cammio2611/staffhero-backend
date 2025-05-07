"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyAdmins = void 0;
// src/backend/notifications.ts
var socket_1 = require("./socket");
var notifyAdmins = function (message) {
    var io = (0, socket_1.getIO)();
    io.emit("new_notification", message);
};
exports.notifyAdmins = notifyAdmins;
