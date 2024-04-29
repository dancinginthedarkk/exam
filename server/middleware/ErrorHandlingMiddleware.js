const ApiError = require('../error/ApiError.js');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message});
    }
    console.log(req, 'hello')

    return res.status(500).json({message: 'Непридвиденная ошибка'})
}