"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
exports.Game = void 0;
var socket_controllers_1 = require("socket-controllers");
var socket_io_1 = require("socket.io");
var Game = /** @class */ (function () {
    function Game() {
        this.movingPlayerId = '';
    }
    Game.prototype.getSocketGameRoom = function (socket) {
        var socketRooms = Array.from(socket.rooms.values()).filter(function (r) { return r !== socket.id; });
        var room = (socketRooms === null || socketRooms === void 0 ? void 0 : socketRooms.length) && socketRooms[0];
        return room;
    };
    Game.prototype.hit = function (io, socket, isHit) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                room = this.getSocketGameRoom(socket);
                if (!isHit)
                    this.movingPlayerId = socket.id;
                io["in"](room).emit('on_player_move_id', this.movingPlayerId);
                socket.to(room).emit('on_hit', isHit);
                return [2 /*return*/];
            });
        });
    };
    Game.prototype.updateGame = function (socket, position) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                room = this.getSocketGameRoom(socket);
                socket.to(room).emit('on_game_update', position);
                return [2 /*return*/];
            });
        });
    };
    Game.prototype.stopGame = function (io, socket) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                room = this.getSocketGameRoom(socket);
                io["in"](room).emit('on_game_stop', this.movingPlayerId);
                this.movingPlayerId = '';
                io["in"](room).emit('on_player_move_id', this.movingPlayerId);
                return [2 /*return*/];
            });
        });
    };
    Game.prototype.terminateGame = function (io, socket) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                room = this.getSocketGameRoom(socket);
                io["in"](room).emit('on_game_terminate');
                this.movingPlayerId = '';
                io["in"](room).emit('on_player_move_id', this.movingPlayerId);
                return [2 /*return*/];
            });
        });
    };
    Game.prototype.playGame = function (io, socket, movingPlayerId) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                room = this.getSocketGameRoom(socket);
                if (movingPlayerId)
                    this.movingPlayerId = movingPlayerId;
                io["in"](room).emit('on_player_move_id', this.movingPlayerId);
                io["in"](room).emit('on_players_can_play');
                socket.to(room).emit('on_game_play');
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        (0, socket_controllers_1.OnMessage)('hit'),
        __param(0, (0, socket_controllers_1.SocketIO)()),
        __param(1, (0, socket_controllers_1.ConnectedSocket)()),
        __param(2, (0, socket_controllers_1.MessageBody)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [socket_io_1.Server,
            socket_io_1.Socket, Boolean]),
        __metadata("design:returntype", Promise)
    ], Game.prototype, "hit");
    __decorate([
        (0, socket_controllers_1.OnMessage)('update_game'),
        __param(0, (0, socket_controllers_1.ConnectedSocket)()),
        __param(1, (0, socket_controllers_1.MessageBody)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
        __metadata("design:returntype", Promise)
    ], Game.prototype, "updateGame");
    __decorate([
        (0, socket_controllers_1.OnMessage)('stop_game'),
        __param(0, (0, socket_controllers_1.SocketIO)()),
        __param(1, (0, socket_controllers_1.ConnectedSocket)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [socket_io_1.Server, socket_io_1.Socket]),
        __metadata("design:returntype", Promise)
    ], Game.prototype, "stopGame");
    __decorate([
        (0, socket_controllers_1.OnMessage)('terminate_game'),
        __param(0, (0, socket_controllers_1.SocketIO)()),
        __param(1, (0, socket_controllers_1.ConnectedSocket)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [socket_io_1.Server, socket_io_1.Socket]),
        __metadata("design:returntype", Promise)
    ], Game.prototype, "terminateGame");
    __decorate([
        (0, socket_controllers_1.OnMessage)('play_game'),
        __param(0, (0, socket_controllers_1.SocketIO)()),
        __param(1, (0, socket_controllers_1.ConnectedSocket)()),
        __param(2, (0, socket_controllers_1.MessageBody)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [socket_io_1.Server,
            socket_io_1.Socket, String]),
        __metadata("design:returntype", Promise)
    ], Game.prototype, "playGame");
    Game = __decorate([
        (0, socket_controllers_1.SocketController)()
    ], Game);
    return Game;
}());
exports.Game = Game;
