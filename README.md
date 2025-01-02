# API-TikDark

## Descrição
API desenvolvida utilizando Node.js, Express e TypeScript para criar checkouts dinâmicos com a API Stripe. Os dados fornecidos pelos usuários, como links de vídeos, métricas de redes sociais e valores totais, são salvos em um banco de dados MongoDB e utilizados para criar uma sessão de pagamento.

---

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB** (com Mongoose)
- **Stripe API**

---

## Estrutura do Projeto

```
API-TikDark/
|-- src/
|   |-- config/
|   |   |-- db.ts        # Configuração do banco de dados MongoDB
|   |
|   |-- controllers/
|   |   |-- stripeController.ts  # Controlador para criação de checkout
|   |
|   |-- models/
|   |   |-- Checkout.ts  # Modelo checkout
|   |
|   |-- routes/
|   |   |-- stripeRoutes.ts      # Definição das rotas relacionadas ao Stripe
|   |
|   |-- utils/
|   |   |-- stripe.ts            # Instância configurada do Stripe
|   |
|   |-- server.ts      # Inicialização do servidor Express
|
|-- .env              # Variáveis de ambiente
|-- package.json      # Dependências do projeto
```

---

## Configuração do Ambiente

1. Clone este repositório:
   ```bash
   git clone https://github.com/TikDark/API-TikDark.git
   cd API-TikDark
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env` com as seguintes variáveis:

   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
   STRIPE_SECRET_KEY=your_stripe_secret_key
   SUCCESS_URL=http://localhost:3000/success
   CANCEL_URL=http://localhost:3000/cancel
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

---

## Endpoints

### **1. Criar Checkout**

**POST** `/api/checkout`

#### Parâmetros do Corpo (JSON):
```json
{
  "videoLink": "https://example.com/video",
  "likes": 1500,
  "views": 2000,
  "shares": 500,
  "saves": 300,
  "total": 125.50
}
```

#### Resposta de Sucesso:
```json
{
  "id": "cs_test_a1B2C3D4E5F6G7H8I9J0"
}
```

#### Resposta de Erro:
```json
{
  "error": "Invalid total value"
}
```

---

## Testes com Invoke-WebRequest

Use o comando abaixo no PowerShell para testar a rota:

```powershell
Invoke-WebRequest -Uri "https://api-tik-dark.vercel.app/api/checkout" `
  -Method POST `
  -Body (@{
      videoLink = "https://example.com/video";
      likes = 1500;
      views = 2000;
      shares = 500;
      saves = 300;
      total = 125.50
  } | ConvertTo-Json) `
  -ContentType "application/json"
```

---

## Banco de Dados

Os dados enviados pelo usuário são salvos no MongoDB. A conexão é configurada no arquivo `src/config/db.ts`:

```typescript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export { connectDB };
```

---

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para mais informações.

