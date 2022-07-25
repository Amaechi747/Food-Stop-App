"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const method_override_1 = __importDefault(require("method-override"));
const users_1 = __importDefault(require("./routes/users"));
const recipe_1 = __importDefault(require("./routes/recipe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const indexRouter = require('../routes/index');
// const usersRouter = require('../routes/users');
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", path_1.default.sep, 'public')));
app.use((0, method_override_1.default)('_method'));
app.use('/user', users_1.default);
app.use('/recipes', recipe_1.default);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error', { error: err, token: req.cookies.token || '' });
});
module.exports = app;
//# sourceMappingURL=app.js.map