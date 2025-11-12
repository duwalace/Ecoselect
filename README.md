# ECOSELECT 🌍♻️

**Localizador de Centros de Coleta Seletiva**

ECOSELECT é uma aplicação web moderna desenvolvida em React que ajuda os usuários a encontrar rapidamente centros de coleta seletiva próximos à sua localização. O aplicativo fornece serviços de geolocalização em tempo real, mapas interativos e informações detalhadas sobre cada centro de coleta.

[🌐 Demo ao Vivo](#) | [📖 Documentação](#características)

---

## 📋 Índice

- [Características](#características)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Backend](#api-backend)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## ✨ Características

### Funcionalidades Principais

- **🗺️ Geolocalização em Tempo Real**: Detecta automaticamente a localização atual do usuário
- **🗺️ Mapa Interativo**: Exibe todos os centros de coleta com marcadores clicáveis
- **📍 Identificação do Centro Mais Próximo**: Destaca automaticamente o centro de coleta mais próximo
- **⏰ Horários de Funcionamento**: Mostra horários detalhados de forma amigável
- **📊 Detalhes Completos**: Visualize materiais aceitos, endereço, telefone, email e distância
- **🔍 Filtros por Material**: Filtre centros por materiais aceitos (plástico, papel, vidro, metal, eletrônicos, etc.)
- **🌙 Modo Escuro**: Alterne entre temas claro e escuro com detecção de preferência do sistema
- **📱 PWA (Progressive Web App)**: Instale como aplicativo independente e funciona offline
- **♿ Acessibilidade**: Compatível com WCAG 2.1 Nível AA, navegação por teclado e leitores de tela
- **🎯 12 Centros de Coleta**: Cobertura expandida pela cidade de São Paulo

### Design Responsivo

- **Totalmente Responsivo**: Otimizado para desktop, tablet e dispositivos móveis
  - Desktop: Painel lateral de informações
  - Mobile: Modal em estilo bottom sheet
  - Controles otimizados para toque
  - Múltiplos breakpoints (1024px, 768px, 480px, 360px)

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** 18.3.1 - Framework UI
- **Vite** 6.0.5 - Build tool e servidor de desenvolvimento
- **Leaflet** 1.9.4 - Biblioteca de mapas interativos
- **React-Leaflet** 4.2.1 - Componentes React para Leaflet
- **Axios** 1.7.9 - Cliente HTTP
- **OpenStreetMap** - Provedor de tiles de mapa (sem necessidade de API key)

### Backend
- **Node.js** - Runtime JavaScript
- **Express** 4.18.2 - Framework web
- **CORS** 2.8.5 - Middleware para permitir requisições cross-origin

### Ferramentas de Desenvolvimento
- **ESLint** - Linter de código
- **Vitest** - Framework de testes
- **@testing-library/react** - Testes de componentes React

---

## 📦 Instalação

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Git

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/duwalace/Ecoselect.git
cd Ecoselect
```

2. **Instale as dependências do Frontend (na raiz do projeto)**
```bash
npm install
```
⚠️ **Importante:** Isso instala as dependências do React, Vite, Leaflet, etc.

3. **Instale as dependências do Backend (pasta server)**
```bash
cd server
npm install
cd ..
```
⚠️ **Importante:** O backend tem seu próprio `package.json` com Express, CORS, etc.

4. **Configure as variáveis de ambiente (opcional)**
```bash
# Crie um arquivo .env na raiz do projeto (se necessário)
VITE_API_URL=http://localhost:3001/api
```

> 💡 **Dica:** Você precisa rodar `npm install` em AMBOS os lugares (raiz E server) pois são dois projetos Node.js separados!

---

## 🎯 Como Usar

### Iniciando a Aplicação

Você precisa iniciar **DOIS servidores** (Backend e Frontend):

#### Terminal 1 - Backend API
```bash
cd server
npm start
```
Você verá: `🚀 ECOSELECT API server running on http://localhost:3001`

#### Terminal 2 - Frontend
```bash
npm run dev
```
Acesse: `http://127.0.0.1:5173` ou `http://localhost:5173`

### Usando a Aplicação

1. **Permitir Acesso à Localização**: Quando solicitado, permita que o navegador acesse sua localização
2. **Visualizar Mapa**: O mapa será centralizado automaticamente na sua localização
3. **Centro Mais Próximo**: O centro mais próximo é destacado com um marcador dourado maior

#### 🔍 Filtrar por Material
4. **Abrir Filtros**: Clique no botão de filtro (🔍) no canto superior esquerdo
5. **Selecionar Materiais**: Marque os materiais que deseja reciclar
6. **Ver Resultados**: O mapa atualiza para mostrar apenas centros que aceitam todos os materiais selecionados
7. **Limpar Filtros**: Clique em "Limpar Tudo" para resetar

#### 🗺️ Ver Detalhes dos Centros
8. **Clicar nos Marcadores**: Clique/toque em qualquer marcador para ver informações detalhadas:
   - Distância da sua localização
   - Endereço completo
   - Telefone (clicável para ligar)
   - Email (clicável para enviar email)
   - Horários de funcionamento
   - Materiais aceitos

#### 🌙 Modo Escuro
9. **Alternar Tema**: Clique no botão lua/sol no canto inferior direito
10. **Detecção Automática**: Detecta automaticamente a preferência do seu sistema
11. **Persistente**: Sua preferência é salva para futuras visitas

### Navegação por Teclado
- **Tab**: Navegar entre elementos interativos
- **Escape**: Fechar o painel de informações
- **Enter/Espaço**: Ativar botões e links

### Experiência Mobile
- **Bottom Sheet**: Em dispositivos móveis, o painel aparece como uma gaveta na parte inferior
- **Gestos de Toque**: Deslize e faça pinch para zoom no mapa
- **Controles Otimizados**: Áreas de toque maiores para facilitar a interação
- **PWA**: Instale como aplicativo pelo menu do navegador

---

## 📁 Estrutura do Projeto

```
Ecoselect/
├── public/                      # Arquivos públicos estáticos
│   ├── manifest.json           # Manifesto PWA
│   ├── sw.js                   # Service Worker
│   └── vite.svg                # Ícone
├── server/                      # Backend API
│   ├── data/
│   │   └── centers.json        # Dados dos centros de coleta
│   ├── index.js                # Servidor Express
│   └── package.json            # Dependências do backend
├── src/                         # Código fonte do frontend
│   ├── assets/                 # Recursos estáticos
│   ├── components/             # Componentes React
│   │   ├── CollectionCenterInfo.jsx
│   │   ├── DarkModeToggle.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── Header.jsx
│   │   └── Map.jsx
│   ├── constants/              # Constantes da aplicação
│   │   └── map.js
│   ├── data/                   # Dados estáticos
│   │   └── collectionCenters.js
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useDarkMode.js
│   │   ├── useGeolocation.js
│   │   └── useNearestCenter.js
│   ├── services/               # Serviços de API
│   │   └── api.js
│   ├── test/                   # Testes
│   ├── utils/                  # Funções utilitárias
│   │   └── distance.js
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos globais
│   ├── main.jsx                # Entry point
│   └── index.css               # Estilos base
├── .gitignore                  # Arquivos ignorados pelo Git
├── eslint.config.js            # Configuração do ESLint
├── index.html                  # HTML principal
├── package.json                # Dependências do frontend
├── README.md                   # Este arquivo
├── test-setup.html             # Arquivo de diagnóstico
├── vite.config.js              # Configuração do Vite
└── vitest.config.js            # Configuração de testes
```

---

## 🔌 API Backend

### Endpoints Disponíveis

#### 1. Health Check
```http
GET /api/health
```
Verifica se a API está funcionando.

**Resposta:**
```json
{
  "success": true,
  "message": "ECOSELECT API is running",
  "timestamp": "2025-01-12T10:30:00.000Z"
}
```

#### 2. Buscar Todos os Centros
```http
GET /api/centers
```
Retorna todos os centros de coleta.

**Resposta:**
```json
{
  "success": true,
  "data": [...],
  "count": 12
}
```

#### 3. Buscar Centros Próximos
```http
GET /api/centers/nearby?lat=-23.5505&lng=-46.6333&radius=10
```
Retorna centros dentro de um raio específico (em km).

**Parâmetros:**
- `lat` (obrigatório): Latitude
- `lng` (obrigatório): Longitude
- `radius` (opcional): Raio em km (padrão: 10)

#### 4. Buscar por Cidade
```http
GET /api/centers/city/:city
```
Retorna centros de uma cidade específica.

#### 5. Buscar por Material
```http
GET /api/centers/material/:material
```
Retorna centros que aceitam um material específico.

#### 6. Buscar por ID
```http
GET /api/centers/:id
```
Retorna um centro específico por ID.

---

## 🧪 Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

---

## 🔧 Build para Produção

```bash
# Build do frontend
npm run build

# Preview do build
npm run preview
```

Os arquivos de build estarão na pasta `dist/`.

---

## 🐛 Solução de Problemas

### Problema: WebSocket Connection Failed

**Solução:** Já configurado no `vite.config.js`. Se persistir, acesse usando `http://127.0.0.1:5173`.

### Problema: Geolocalização não funciona

**Soluções:**
1. Verifique se permitiu acesso à localização no navegador
2. Windows: Vá em **Configurações** → **Privacidade** → **Localização** e ative
3. Use HTTPS ou localhost (HTTP não permite geolocalização em produção)

### Problema: Backend não inicia (porta 3001 em uso)

**Solução:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

### Problema: Centros não aparecem no mapa

**Verificar:**
1. Backend está rodando? (`http://localhost:3001/api/health`)
2. Console do navegador (F12) mostra erros?
3. Use o arquivo `test-setup.html` para diagnóstico

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Diretrizes
- Siga os padrões de código do ESLint
- Adicione testes para novas funcionalidades
- Atualize a documentação conforme necessário
- Use commits semânticos (feat, fix, docs, etc.)

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**duwalace**

- GitHub: [@duwalace](https://github.com/duwalace)

---

## 🙏 Agradecimentos

- [OpenStreetMap](https://www.openstreetmap.org/) - Mapas gratuitos
- [Leaflet](https://leafletjs.com/) - Biblioteca de mapas
- [React](https://react.dev/) - Framework UI
- [Vite](https://vitejs.dev/) - Build tool incrível

---

## 📊 Status do Projeto

✅ **Em Desenvolvimento Ativo**

### Roadmap

- [ ] Adicionar mais cidades além de São Paulo
- [ ] Sistema de favoritos
- [ ] Compartilhamento de localização via link
- [ ] Notificações sobre novos centros próximos
- [ ] Avaliações e comentários de usuários
- [ ] Rotas e navegação até o centro
- [ ] Integração com Google Maps/Waze
- [ ] Versão mobile nativa (React Native)

---

## 📞 Suporte

Encontrou um bug ou tem uma sugestão? 

- 🐛 [Abra uma Issue](https://github.com/duwalace/Ecoselect/issues)
- 💬 [Discussões](https://github.com/duwalace/Ecoselect/discussions)

---

<div align="center">

**Feito com 💚 para um mundo mais sustentável**

⭐ Se este projeto te ajudou, deixe uma estrela!

</div>

