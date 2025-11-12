# 🌐 ECOSELECT API Server

Backend API para o aplicativo ECOSELECT de localização de centros de coleta seletiva.

## 🚀 Start Rápido

```bash
# Na pasta raiz do projeto
npm run server

# Ou diretamente nesta pasta
node index.js
```

API estará disponível em: **http://localhost:3001**

## 📁 Estrutura

```
server/
├── index.js         # Servidor Express com todas as rotas
├── package.json     # Dependências (express, cors, dotenv)
└── data/
    └── centers.json # Dados dos centros de coleta
```

## 🔌 Endpoints

### Health Check
```
GET /api/health
```

### Todos os Centros
```
GET /api/centers
```

### Centros por Cidade
```
GET /api/centers/city/:city
Exemplo: /api/centers/city/São Paulo
```

### Centros Próximos
```
GET /api/centers/nearby?lat=-23.5505&lng=-46.6333&radius=10
```

### Centros por Material
```
GET /api/centers/material/:material
Exemplo: /api/centers/material/Electronics
```

### Centro por ID
```
GET /api/centers/:id
Exemplo: /api/centers/1
```

## 📝 Adicionar Novos Centros

Edite `data/centers.json` e adicione:

```json
{
  "id": 13,
  "name": "Novo Centro",
  "city": "Cidade",
  "state": "XX",
  "lat": -23.0000,
  "lng": -46.0000,
  "address": "Endereço completo",
  "phone": "(XX) XXXX-XXXX",
  "email": "email@exemplo.com",
  "operatingHours": {
    "weekdays": "Monday-Friday: 8:00 AM - 6:00 PM",
    "saturday": "Saturday: Closed",
    "sunday": "Sunday: Closed"
  },
  "acceptedMaterials": ["Plastic", "Paper"],
  "isOpen24h": false
}
```

Reinicie o servidor para carregar os novos dados.

## 🔧 Configuração

### Porta
Padrão: 3001

Para mudar, crie arquivo `.env` na raiz do projeto:
```env
PORT=3002
```

### CORS
Atualmente permite todas as origens.

Para produção, edite `index.js`:
```javascript
app.use(cors({
  origin: 'https://seu-dominio.com'
}));
```

## 🧪 Testar

```bash
# Health check
curl http://localhost:3001/api/health

# Todos os centros
curl http://localhost:3001/api/centers

# Centros próximos
curl "http://localhost:3001/api/centers/nearby?lat=-23.5505&lng=-46.6333&radius=5"
```

## 📊 Formato de Resposta

### Sucesso
```json
{
  "success": true,
  "data": [...],
  "count": 12
}
```

### Erro
```json
{
  "success": false,
  "error": "Mensagem de erro"
}
```

## 🚨 Tratamento de Erros

- `400` - Bad Request (parâmetros inválidos)
- `404` - Not Found (centro não encontrado)
- `500` - Internal Server Error

## 📦 Dependências

- **express** - Framework web
- **cors** - Middleware CORS
- **dotenv** - Variáveis de ambiente

## 🌍 Deploy

### Heroku
```bash
git push heroku main
```

### Railway/Render
Configure:
- Build Command: `cd server && npm install`
- Start Command: `node server/index.js`

### Docker
```dockerfile
FROM node:16
WORKDIR /app
COPY server/ ./
RUN npm install
EXPOSE 3001
CMD ["node", "index.js"]
```

## 📚 Documentação Completa

Ver `/API_DOCUMENTATION.md` na raiz do projeto.

---

**API Version:** 1.0.0  
**Last Updated:** November 2025

