# Guia de Contribuição 🤝

Obrigado por considerar contribuir com o ECOSELECT! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Código de Conduta

Este projeto adere a um código de conduta. Ao participar, você deve manter um ambiente respeitoso e acolhedor para todos.

## 🚀 Como Contribuir

### 1. Reportar Bugs

Encontrou um bug? Abra uma [issue](https://github.com/duwalace/Ecoselect/issues) com:

- **Título claro e descritivo**
- **Descrição detalhada** do problema
- **Passos para reproduzir** o bug
- **Comportamento esperado** vs **comportamento atual**
- **Screenshots** (se aplicável)
- **Ambiente**: SO, navegador, versão do Node.js

### 2. Sugerir Melhorias

Tem uma ideia para melhorar o ECOSELECT?

- Abra uma [issue](https://github.com/duwalace/Ecoselect/issues) com a tag `enhancement`
- Descreva sua sugestão em detalhes
- Explique por que seria útil para os usuários

### 3. Contribuir com Código

#### Preparando o Ambiente

```bash
# 1. Fork o projeto
# 2. Clone seu fork
git clone https://github.com/SEU-USUARIO/Ecoselect.git
cd Ecoselect

# 3. Adicione o repositório original como upstream
git remote add upstream https://github.com/duwalace/Ecoselect.git

# 4. Instale as dependências
npm install
cd server && npm install && cd ..

# 5. Crie uma branch para sua feature
git checkout -b feature/minha-feature
```

#### Desenvolvendo

1. **Faça suas alterações**
2. **Siga os padrões de código** (ESLint)
3. **Adicione/atualize testes** se necessário
4. **Teste localmente**:
   ```bash
   # Terminal 1 - Backend
   cd server && npm start
   
   # Terminal 2 - Frontend
   npm run dev
   
   # Terminal 3 - Testes
   npm test
   ```

#### Padrões de Código

- Use **ESLint** para manter a consistência do código
- Siga as convenções de nomenclatura:
  - Componentes: `PascalCase` (ex: `FilterPanel.jsx`)
  - Hooks: `camelCase` começando com `use` (ex: `useGeolocation.js`)
  - Funções: `camelCase` (ex: `calculateDistance`)
  - Constantes: `UPPER_SNAKE_CASE` (ex: `API_BASE_URL`)

#### Commits Semânticos

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona filtro por horário de funcionamento
fix: corrige cálculo de distância
docs: atualiza README com novas instruções
style: formata código com ESLint
refactor: reorganiza estrutura de pastas
test: adiciona testes para FilterPanel
chore: atualiza dependências
```

#### Pull Request

1. **Atualize sua branch** com a main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push para seu fork**:
   ```bash
   git push origin feature/minha-feature
   ```

3. **Abra um Pull Request** com:
   - Título claro e descritivo
   - Descrição detalhada das mudanças
   - Referência à issue relacionada (ex: `Closes #123`)
   - Screenshots (se aplicável)

4. **Checklist**:
   - [ ] Código segue os padrões do projeto
   - [ ] Testes passam (`npm test`)
   - [ ] Sem erros de lint (`npm run lint`)
   - [ ] Documentação atualizada
   - [ ] Commits seguem o padrão semântico

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes React reutilizáveis
├── hooks/         # Custom React Hooks
├── services/      # Serviços de API
├── utils/         # Funções utilitárias
├── constants/     # Constantes da aplicação
└── test/          # Testes
```

## 🧪 Testes

- Adicione testes para novos componentes e funções
- Use `@testing-library/react` para testes de componentes
- Use `vitest` para testes unitários
- Mantenha cobertura de testes acima de 70%

```bash
# Executar testes
npm test

# Testes em modo watch
npm run test:watch

# Cobertura
npm run test:coverage
```

## 📝 Documentação

- Mantenha o README atualizado
- Adicione JSDoc comments em funções complexas
- Documente novas APIs no README

## ❓ Dúvidas

Tem dúvidas? Sinta-se à vontade para:

- Abrir uma [Discussion](https://github.com/duwalace/Ecoselect/discussions)
- Comentar em uma issue existente
- Entrar em contato com os mantenedores

## 🎉 Reconhecimento

Todos os contribuidores serão reconhecidos no README do projeto!

---

**Obrigado por contribuir com o ECOSELECT! 💚🌍**

