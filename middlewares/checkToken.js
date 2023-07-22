const createError =  require('http-errors');
const User = require('../models/User');
const { verify } = require('jsonwebtoken');


module.exports = async (req,res,next) => {

    try {
        if(!req.headers.authorization){
          throw  createError(401, "Se requiere un token")
        }

        const token = req.headers.authorization
        const decoded = verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.user.id).select("-password -token -checked -createdAt -updatedAt -__v")

        next()


    } catch (error) {

        let message;

        switch (error.message) {
            case "jwt malformed":
                message = "Token corrupto"
                break;
            case "jwt expired":
                message = "El Token ha expirado"
                break
            case "invalid token":
                message = "Token inválido"
                break   
            case "invalid signature":
                message = "Firma inválida"
            break     
            default:
                message = error.message
                break;
        }


        return res.status(error.status || 500).json({
            ok:false,
            message: message || "Upss, hubo un error"
        })
    }
}