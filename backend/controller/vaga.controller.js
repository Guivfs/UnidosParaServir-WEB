  const { config } = require("dotenv");
  const mysql = require("mysql2/promise");
  const jwt = require("jsonwebtoken");
  const VagaModel = require("../model/Vaga");
  const { format } = require('date-fns');

  config();

  const clientDB = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
  });

  class VagaController {
    async obterVagasEmpresa(req, res) {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const idEmpresaLogado = decodedToken.id;

        const [rows] = await clientDB.query(
          "SELECT * FROM vaga WHERE idEmpresa = ?",
          [idEmpresaLogado]
        );

        if (rows.length < 1) {
          return res
            .status(404)
            .json({ msg: "Não foi possível encontrar vagas disponíveis" });
        }

        res.json(rows);
      } catch (error) {
        console.error("Erro ao obter vagas da empresa:", error);
        res.status(500).json({ msg: "Erro interno do servidor ao obter vagas da empresa." });
      }
    }

    async buscarVagasPorTitulo(req, res) {
      const { titulo } = req.query;
    
      try {
        const query = `
          SELECT vaga.*, empresa.nomeEmpresa 
          FROM vaga
          JOIN empresa ON vaga.idEmpresa = empresa.idEmpresa
          WHERE vaga.tituloVaga LIKE ? AND vaga.statusVaga = 'Aberta'
        `;
        const [rows] = await clientDB.query(query, [`%${titulo}%`]);
    
        if (rows.length < 1) {
          return res.status(404).json({ msg: "Nenhuma vaga encontrada com esse título." });
        }
    
        res.json(rows);
      } catch (error) {
        console.error("Erro ao buscar vagas por título:", error);
        res.status(500).json({ msg: "Erro interno do servidor ao buscar vagas por título." });
      }
    }

    async obterVagaPorId(req, res) {
      const { id } = req.params; // ID da vaga
    
      try {
        const query = `
          SELECT vaga.*, 
                 empresa.nomeEmpresa, 
                 usuario.nomeUsuario, 
                 usuario.emailUsuario 
          FROM vaga
          JOIN empresa ON vaga.idEmpresa = empresa.idEmpresa
          LEFT JOIN usuario ON vaga.idUsuario = usuario.idUsuario
          WHERE vaga.idVaga = ?
        `;
        const [vaga] = await clientDB.query(query, [id]);
    
        if (!vaga.length) {
          return res.status(404).json({ msg: 'Vaga não encontrada!' });
        }
    
        const vagaDetalhes = vaga[0];
    
        // Criação do objeto de resposta, incluindo informações do usuário, se disponível
        const vagaResponse = {
          idVaga: vagaDetalhes.idVaga,
          tituloVaga: vagaDetalhes.tituloVaga,
          descVaga: vagaDetalhes.descVaga,
          localizacaoVaga: vagaDetalhes.localizacaoVaga,
          valorPagamento: vagaDetalhes.valorPagamento,
          nomeEmpresa: vagaDetalhes.nomeEmpresa, // Incluindo o nome da empresa no retorno
          statusVaga: vagaDetalhes.statusVaga,
          dataCriacao: vagaDetalhes.dataCriacao,
        };
    
        // Se a vaga estiver preenchida, adiciona as informações do usuário que preencheu
        if (vagaDetalhes.statusVaga === 'Preenchida') {
          vagaResponse.usuarioPreenchido = {
            idUsuario: vagaDetalhes.idUsuario,
            nomeUsuario: vagaDetalhes.nomeUsuario,
            emailUsuario: vagaDetalhes.emailUsuario,
          };
        }
    
        return res.status(200).json({ vaga: vagaResponse });
      } catch (error) {
        console.error('Erro ao buscar vaga:', error);
        return res.status(500).json({ msg: 'Erro ao buscar vaga!' });
      }
    }
    

    async obterVagaAbertaPorId(req, res) {
      const { id } = req.params; // ID da vaga
    
      try {
        const query = `
          SELECT vaga.*, empresa.nomeEmpresa 
          FROM vaga 
          JOIN empresa ON vaga.idEmpresa = empresa.idEmpresa 
          WHERE vaga.idVaga = ? AND vaga.statusVaga = 'Aberta'
        `;
        const [vaga] = await clientDB.query(query, [id]);
    
        if (!vaga.length) {
          return res.status(404).json({ msg: 'Vaga não encontrada!' });
        }
    
        const vagaDetalhes = vaga[0];
    
        return res.status(200).json({
          vaga: {
            idVaga: vagaDetalhes.idVaga,
            tituloVaga: vagaDetalhes.tituloVaga,
            descVaga: vagaDetalhes.descVaga,
            localizacaoVaga: vagaDetalhes.localizacaoVaga,
            valorPagamento: vagaDetalhes.valorPagamento,
            nomeEmpresa: vagaDetalhes.nomeEmpresa, // Incluindo o nome da empresa no retorno
            statusVaga: vagaDetalhes.statusVaga,
            dataCriacao: vagaDetalhes.dataCriacao,
          },
        });
      } catch (error) {
        console.error('Erro ao buscar vaga:', error);
        return res.status(500).json({ msg: 'Erro ao buscar vaga!' });
      }
    }

    async obterVagas(req, res) {
      try {
        const query = `
          SELECT vaga.*, empresa.nomeEmpresa 
          FROM vaga
          JOIN empresa ON vaga.idEmpresa = empresa.idEmpresa
          WHERE vaga.statusVaga = 'Aberta'
        `;
        const [rows] = await clientDB.query(query);
        if (rows.length < 1) {
          return res
            .status(404)
            .json({ msg: "Não foi possível encontrar vagas disponíveis" });
        }
        res.json(rows);
      } catch (error) {
        console.error("Erro ao obter vagas:", error);
        res.status(500).json({ msg: "Erro interno do servidor ao obter vagas." });
      }
    }

    async criarVaga(req, res) {
      const { tituloVaga, descVaga, idEmpresa, statusVaga, dataCriacao, valorPagamento, localizacaoVaga } = req.body; 
    
      if (!tituloVaga || !descVaga || !idEmpresa || !statusVaga || !dataCriacao || !valorPagamento || !localizacaoVaga) {
        return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
      }
    
      try {
        const novaVaga = new VagaModel(tituloVaga, descVaga, idEmpresa, statusVaga, dataCriacao, valorPagamento, localizacaoVaga);
        await clientDB.query("INSERT INTO vaga SET ?", novaVaga);
        res.status(201).json({ msg: "Vaga criada com sucesso!" });
      } catch (error) {
        console.error("Erro ao criar vaga:", error);
        res.status(500).json({ msg: "Erro interno do servidor ao criar vaga." });
      }
    }

    async atualizarVaga(req, res) {
      const { id } = req.params;
      let { tituloVaga, descVaga, statusVaga, dataCriacao, valorPagamento, localizacaoVaga, idEmpresa, idUsuario } = req.body;
    
      // Se idUsuario for undefined, define como null
      idUsuario = idUsuario !== undefined ? idUsuario : null;
    
      if (!tituloVaga || !descVaga || !statusVaga || !valorPagamento || !localizacaoVaga || !idEmpresa) {
        return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
      }

      dataCriacao = format(new Date(dataCriacao), 'yyyy-MM-dd HH:mm:ss');

      try {
        const [result] = await clientDB.query(
          "UPDATE vaga SET tituloVaga = ?, descVaga = ?, statusVaga = ?, dataCriacao = ?, valorPagamento = ?, localizacaoVaga = ?, idEmpresa = ?, idUsuario = ? WHERE idVaga = ?",
          [tituloVaga, descVaga, statusVaga, dataCriacao, valorPagamento, localizacaoVaga, idEmpresa, idUsuario, id]
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ msg: "Vaga não encontrada." });
        }

        res.status(200).json({ msg: "Vaga atualizada com sucesso!" });
      } catch (error) {
        console.error("Erro ao atualizar vaga:", error);
        res.status(500).json({ msg: "Erro interno do servidor ao atualizar vaga." });
      }
    }

    async deletarVaga(req, res) {
      const { id } = req.params;
    
      try {
        // Deletar todas as candidaturas relacionadas a essa vaga
        await clientDB.query("DELETE FROM candidaturas WHERE idVaga = ?", [id]);
    
        // Deletar a vaga em si
        const [result] = await clientDB.query("DELETE FROM vaga WHERE idVaga = ?", [id]);
        if (result.affectedRows === 0) {
          return res.status(404).json({ msg: "Vaga não encontrada." });
        }
    
        res.status(200).json({ msg: "Vaga e candidaturas associadas deletadas com sucesso!" });
      } catch (error) {
        console.error("Erro ao deletar vaga:", error);
        res.status(500).json({ msg: "Erro interno do servidor ao deletar vaga." });
      }
    }

    async preencherVaga(req, res) {
      const { id } = req.params; // ID da vaga que será preenchida
      const { idUsuario } = req.body; // ID do usuário que a empresa escolheu para preencher a vaga
    
      // Verificar se o `idUsuario` foi fornecido
      if (!idUsuario) {
        return res.status(400).json({ msg: "ID do usuário é obrigatório para preencher a vaga." });
      }
    
      try {
        // Verificar se o idUsuario existe na tabela `usuario`
        const [usuario] = await clientDB.query("SELECT * FROM usuario WHERE idUsuario = ?", [idUsuario]);
        if (usuario.length === 0) {
          return res.status(400).json({ msg: "Usuário não encontrado." });
        }
    
        // Atualizar a vaga com o `idUsuario` e alterar o status para 'preenchida'
        const [result] = await clientDB.query(
          "UPDATE vaga SET idUsuario = ?, statusVaga = 'preenchida' WHERE idVaga = ? AND statusVaga = 'aberta'",
          [idUsuario, id]
        );
    
        if (result.affectedRows === 0) {
          return res.status(404).json({ msg: "Vaga não encontrada ou já preenchida." });
        }
    
        res.status(200).json({ msg: "Vaga preenchida com sucesso!" });
      } catch (error) {
        console.error("Erro ao preencher vaga:", error);
        res.status(500).json({ msg: "Erro interno do servidor ao preencher vaga." });
      }
    }
    
    

    async demitirUsuario(req, res) {
      const { idVaga } = req.params;
    
      try {
        await clientDB.query('UPDATE vaga SET statusVaga = "Aberta", idUsuario = NULL WHERE idVaga = ?', [idVaga]);
    
        return res.status(200).json({ msg: 'Usuário demitido e vaga reaberta!' });
      } catch (error) {
        console.error('Erro ao demitir usuário:', error);
        return res.status(500).json({ msg: 'Erro ao demitir usuário!' });
      }
    }
  }

  module.exports = VagaController;
