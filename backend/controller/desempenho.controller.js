const { config } = require("dotenv");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");

config();

const clientDB = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
});

class DesempenhoController {
    async obterCandidaturasPorIdUsuario(req, res) {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const idUsuarioLogado = decodedToken.id;

        try {
            const [rows] = await clientDB.query(
                "SELECT * FROM candidaturas WHERE idUsuario = ?",
                [idUsuarioLogado]
            );

            if (rows.length < 1) {
                return res.status(404).json({ msg: "Nenhuma candidatura encontrada." });
            }

            res.json(rows);
        } catch (error) {
            console.error("Erro ao obter candidaturas do usuário:", error);
            res.status(500).json({ msg: "Erro interno do servidor ao obter candidaturas." });
        }
    }

    async obterCandidaturasPorVaga(req, res) {
        const { idVaga } = req.params;

        try {
            const [rows] = await clientDB.query(
                "SELECT c.idUsuario, u.nomeUsuario, u.emailUsuario FROM candidaturas c INNER JOIN usuario u ON c.idUsuario = u.idUsuario WHERE c.idVaga = ?",
                [idVaga]
            );

            if (rows.length < 1) {
                return res.status(404).json({ msg: "Nenhuma candidatura encontrada para essa vaga." });
            }

            res.json(rows);
        } catch (error) {
            console.error("Erro ao obter candidaturas da vaga:", error);
            res.status(500).json({ msg: "Erro interno do servidor ao obter candidaturas." });
        }
    }

    async obterQuantidadeNovasCandidaturas(req, res) {
        try {
            // Verificar se o cabeçalho Authorization está presente
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ msg: "Token de autenticação não fornecido." });
            }
    
            // Extrair o token do cabeçalho Authorization
            const token = authHeader.split(" ")[1]; // O token está após "Bearer"
            if (!token) {
                return res.status(401).json({ msg: "Formato do token de autenticação inválido." });
            }
    
            // Decodificar o token JWT
            const decodedToken = jwt.verify(token, process.env.SECRET);
            const idEmpresaLogado = decodedToken.id;
    
            // Consultar a quantidade de candidaturas para vagas dessa empresa
            const query = `
                SELECT COUNT(*) AS novasCandidaturas
                FROM candidaturas c
                INNER JOIN vaga v ON c.idVaga = v.idVaga
                WHERE v.idEmpresa = ? AND c.dataCandidatura > NOW() - INTERVAL 1 DAY
            `;
            const [rows] = await clientDB.query(query, [idEmpresaLogado]);
            const quantidadeNovasCandidaturas = rows[0].novasCandidaturas;
    
            res.status(200).json({ novasCandidaturas: quantidadeNovasCandidaturas });
        } catch (error) {
            console.error("Erro ao obter quantidade de novas candidaturas:", error);
            res.status(500).json({ msg: "Erro interno do servidor ao obter quantidade de novas candidaturas." });
        }
    }

    async verificarCandidatura(req, res) {
        const { idVaga, idUsuario } = req.params;

        try {
            // Consulta no banco de dados para verificar se há uma candidatura existente para o usuário e a vaga fornecidos
            const [rows] = await clientDB.query(
                "SELECT * FROM candidaturas WHERE idUsuario = ? AND idVaga = ?",
                [idUsuario, idVaga]
            );

            // Retorna um objeto com o status da candidatura
            const jaCandidatado = rows.length > 0;
            res.status(200).json({ jaCandidatado });
        } catch (error) {
            console.error("Erro ao verificar candidatura:", error);
            res.status(500).json({ msg: "Erro interno do servidor ao verificar candidatura.", error });
        }
    }

    async criarCandidatura(req, res) {
        const { idVaga, statusCandidatura } = req.body;
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const idUsuarioLogado = decodedToken.id;

        if (!idVaga || !statusCandidatura) {
            return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
        }

        try {
            // Verificar se o usuário já se candidatou à vaga
            const [rows] = await clientDB.query(
                "SELECT * FROM candidaturas WHERE idUsuario = ? AND idVaga = ?",
                [idUsuarioLogado, idVaga]
            );

            if (rows.length > 0) {
                return res.status(409).json({ msg: "Você já se candidatou para esta vaga!" });
            }

            // Se não houver candidaturas, criar a nova candidatura
            const novaCandidatura = {
                idUsuario: idUsuarioLogado,
                idVaga,
                statusCandidatura,
                dataCandidatura: new Date()
            };

            await clientDB.query("INSERT INTO candidaturas SET ?", novaCandidatura);

            res.status(201).json({ msg: "Candidatura criada com sucesso!" });
        } catch (error) {
            console.error("Erro ao criar candidatura:", error);
            res.status(500).json({ msg: "Erro interno do servidor ao criar candidatura." });
        }
    }

    async atualizarCandidatura(req, res) {
        const { idCandidatura } = req.params;
        const { statusCandidatura } = req.body;

        try {
            const [result] = await clientDB.query(
                "UPDATE candidaturas SET statusCandidatura = ? WHERE idCandidatura = ?",
                [statusCandidatura, idCandidatura]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ msg: "Candidatura não encontrada." });
            }

            res.status(200).json({ msg: "Candidatura atualizada com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar candidatura:", error);
            res.status(500).json({ msg: "Erro interno do servidor ao atualizar candidatura." });
        }
    }

    async obterVisitasPorUsuario(req, res) {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const idEmpresaLogada = decodedToken.id;

        try {
            const [rows] = await clientDB.query(
                "SELECT * FROM visitas_perfil WHERE idEmpresa = ?",
                [idEmpresaLogada]
            );

            if (rows.length < 1) {
                return res.status(404).json({ msg: "Nenhuma visita encontrada." });
            }

            res.json(rows);
        } catch (error) {
            console.error("Erro ao obter visitas da empresa:", error);
            res.status(500).json({ msg: "Erro interno do servidor ao obter visitas." });
        }
    }

    async criarVisita(req, res) {
        const { idUsuario } = req.body; // ID do usuário que está sendo visitado
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const idEmpresaLogada = decodedToken.id;

        if (!idUsuario) {
            return res.status(422).json({ msg: "O campo idUsuario é obrigatório!" });
        }

        try {
            const novaVisita = { idUsuario, idEmpresa: idEmpresaLogada, dataVisita: new Date() };
            await clientDB.query("INSERT INTO visitas_perfil SET ?", novaVisita);
            res.status(201).json({ msg: "Visita registrada com sucesso!" });
        } catch (error) {
            console.error("Erro ao registrar visita:", error);
            res.status(500).json({ msg: "Erro interno do servidor ao registrar visita." });
        }
    }

    async atualizarVisita(req, res) {
        const { idVisita } = req.params;
        const { idUsuario } = req.body;

        try {
            const [result] = await clientDB.query(
                "UPDATE visitas_perfil SET idUsuario = ? WHERE idVisita = ?",
                [idUsuario, idVisita]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ msg: "Visita não encontrada." });
            }

            res.status(200).json({ msg: "Visita atualizada com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar visita:", error);
            res.status(500).json({ msg: "Erro interno do servidor ao atualizar visita." });
        }
    }
}

module.exports = DesempenhoController;
