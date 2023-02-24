const { Book } = require("../models");
const countriesApi = require("../services/countries");

const BooksController = {
    index: async (req, res) => {
        try {
            const books = await Book.findAll();
            
            if (!books) {
                return res.status(404).json({message: "Error" });
            }

            return res.status(200).json({data: books})
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
 
             return res.status(400).json({error: true, message: "Falha na requisição, tente novamente!"})
        }
    },

    show: async (req, res) => {
        try {
            const { id } = req.params;

            const book = await Book.findByPk(id, {raw: true});

            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }

            const country = await countriesApi.getByAlphaCode(book.country_code);
            console.log(country)

            /* book.contry = {
                name: country[0].name.common,
                flag: country[0].flags.svg
            } */

            /* book['country'] = {
                name: country[0].name.common,
                flag: country[0].flags.svg
            } */

            Object.assign(book, {
                country: {
                    name: country[0].name.common,
                    flag: country[0].flags.svg
                }
            });

            return res.status(200).json({data: book});
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
 
            return res.status(400).json({error: true, message: "Falha na requisição, tente novamente!"})
        }

    },

    store: async (req, res) => {
        try {
            const { title, total_pages, author, release_year, stock, country_code } = req.body;
            const code = country_code.toUpperCase()
            const [book, created] = await Book.findOrCreate({where: {title, total_pages, author, release_year, stock, country_code: code}});

            if(!created) {
                return res.status(409).json({message: "Produto já cadastrado"});
            }

            return res.status(201).json({data: book})

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
 
             return res.status(400).json({error: true, message: "Falha na requisição, tente novamente!"})
        }
     },

    edit: async (req, res) => { 
        try {
            const id = Number(req.params.id);
            const { title, total_pages, author, release_year, stock } = req.body;

            const verifyBookExists = await Book.findByPk(id);
            console.log(verifyBookExists)

            if(!verifyBookExists) {
                return res.status(404).json({message: "Book not found!"});
            }

            await Book.update({
                title,
                total_pages: Number(total_pages),
                author,
                release_year,
                stock: Number(stock)

            }, {where: {id}});

            const book = await Book.findByPk(id);

            return res.status(201).json({data: book});

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
 
             return res.status(400).json({error: true, message: "Falha na requisição, tente novamente!"})
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const book = await Book.findByPk(id);

            if(!book) {
                return res.status(404).json({message: "Book not found!"});
            }

            await Book.destroy({where: {id}});

            return res.status(204).json();
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
 
             return res.status(400).json({error: true, message: "Falha na requisição, tente novamente!"})
        }
    },
};

module.exports = BooksController;