require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const { User } = require('../models');
const { Op } = require('sequelize');

const AuthController = {
    store: async (req, res) => {
        try {
            const { name, email, nickname, password } = req.body;
            const hash = bcrypt.hashSync(password, 10);

            const verifyIfUserExists = await User.findOne({
                where: {
                    [Op.or]: [{nickname}, {email}]
                }
            });

            if(verifyIfUserExists) {
                return res.status(400).json({error: true, message: "Não foi possível realizar o cadastro!"});
            }

            const newUser = await User.create({name, email, nickname, password: hash});
            
            const user = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                nickname: newUser.nickname,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
            }

            return res.status(201).json({data: user});

        } catch (error) {
            console.log(error);
             if (error.name === "SequelizeConnectionRefusedError"){
                 return res.status(500).json({error: true, message: "Sistema indisponível, tente novamente mais tarde!"})
             }
 
             if (error.name === "SequelizeUniqueConstraintError"){
                 return res.status(400).json(error.parent.sqlMessage);
             }
 
             if (error.name === "SequelizeValidationError"){
                 return res.status(400).json({error: true, message: `${error.errors[0].type} at ${error.errors[0].path}`})
             }
 
             return res.status(400).json({error: true, message: "Falha na requisição, tente novamente!"});
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({where: {email}});

            if(!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({message: "Usuário e senha estão incorretas ou não existe."});
            }

            const data = {
                id: user.id,
                name: user.name,
                nickname: user.nickname,
            }

            const token = jwt.sign(data, process.env.JWT_KEY, { expiresIn: '1h' });
            data["token"] = token;

            return res.status(200).json({data, message: "Autenticado"});

        } catch (error) {
            console.log(error);
             if (error.name === "SequelizeConnectionRefusedError"){
                 return res.status(500).json({error: true, message: "Sistema indisponível, tente novamente mais tarde!"})
             }
 
             if (error.name === "SequelizeUniqueConstraintError"){
                 return res.status(400).json(error.parent.sqlMessage);
             }
 
             if (error.name === "SequelizeValidationError"){
                 return res.status(400).json({error: true, message: `${error.errors[0].type} at ${error.errors[0].path}`})
             }
 
             return res.status(400).json({error: true, message: "Falha na requisição, tente novamente!"});
        }
    }
};

module.exports = AuthController;