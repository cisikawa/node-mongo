import livro from "../models/Livro.js"
import { autor } from "../models/Autor.js"

class LivroController {
    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).send(listaLivros);
        } catch (erro) {
            res
                .status(500)
                .json({ message: `${erro.message} - falha ao listar livros` });
        }
    }

    static async listarLivrosPorEditora(req, res) {
        const editora = req.query.editora
        try {
            const listaLivrosPorEditora = await livro.find({
                editora: editora 
            });
            res.status(200).json(listaLivrosPorEditora);
        } catch (erro) {
            res
                .status(500)
                .json({ message: `${erro.message} - falha ao listar livros por editora` });
        }
    }

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc}}
            const livroCriado = await livro.create(livroCompleto)
            res.status(201).json({ message: 'criado com sucesso', livro: livroCriado });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro`})
        }
    }

    static async listarLivroPorId(req, res) {
        try{
            const livroEncontrado = await livro.findById(req.params.id)
            res.status(200).send(livroEncontrado)
        }catch (erro){
            res.status(500).json({ message: `${erro.message} - falha ao buscar livro`})
        }
    }

    static async atualizarLivro(req, res) {
        try{
            await livro.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).json({message: "livro atualizado"})
        }catch (erro){
            res.status(500).json({ message: `${erro.message} - falha ao atualizar livro`})
        }
    }

    static async removerLivro(req, res) {
        try{
            await livro.findByIdAndDelete(req.params.id)
            res.status(200).json({message: "livro removido"})
        }catch (erro){
            res.status(500).json({ message: `${erro.message} - falha ao remover livro`})
        }
    }
};

export default LivroController;