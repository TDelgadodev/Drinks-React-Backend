const CreateError = require('http-errors')
const User = require('../models/User')


const register = async (req,res) =>{
    
    try {
        const { name, password, email} = req.body
        if([name,password,email].includes('') || !name || !password || !email){
            throw CreateError(400,'Todos los campos son obligatorios')
        }
        let user = await User.findOne({
            email : req.body.email
        })

        if(user){
            throw CreateError(400,'El email ya se encuentra registrado')
        }

        user = new User(req.body);
        user.token = 'BDbybyfaf8';
        const useStore = await user.save();
        console.log(useStore);

        return res.status(201).json({
            ok : true,
            message : 'Usuario registrado con exito'
        })
    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            message : error.message || 'Houston we have a problem'
        })
    }
}


const login = async (req,res) =>{
    try {
        const { name, password, email} = req.body
        if([name,password,email].includes('') || !email || !password){
            throw CreateError(400,'Todos los campos son obligatorios')
        }        

        let user = await User.findOne({
            email
        })

        if(!user){
            throw CreateError(400,'Usuario inexistente')
        }


    } catch (error) {
        
    }
}


module.exports = {
    register,
    login
}