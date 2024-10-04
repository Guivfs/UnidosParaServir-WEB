import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  // Verificar se o header 'authorization' está presente
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.error('Authorization header não encontrado.');
    return res.status(401).json({ msg: 'Acesso negado! Header de autorização ausente.' });
  }

  // Verificar se o token está presente no formato correto
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('Token não encontrado no header de autorização.');
    return res.status(401).json({ msg: 'Acesso negado! Token ausente no header.' });
  }

  try {
    const secret = this.process.env.SECRET;
    const decoded = jwt.verify(token, secret); // Decodificar o token para extrair informações do usuário
    req.user = decoded; // Adicionar informações do usuário decodificado ao objeto `req`
    next();
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    res.status(400).json({ msg: 'Token inválido' });
  }
}

export default authMiddleware;
