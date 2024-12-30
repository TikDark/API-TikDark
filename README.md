# API-TikDark

API para automação de pagamento e cálculo de valores, integrada ao Stripe para o processo de checkout.

## Rotas Disponíveis

### 1. **Cálculo de Valores**
A rota `/api/calculate` permite calcular o valor total com base nas métricas fornecidas (Likes, Views, Shares, Saves e Vídeos).

- **Método**: `POST`
- **URL**: `http://<url>/api/calculate`
- **Corpo da Requisição** (JSON):
  ```json
  {
    "likes": 150,
    "views": 2000,
    "shares": 100,
    "saves": 300,
    "videos": 1
  }
  ```
  - **likes**: Quantidade de likes
  - **views**: Quantidade de visualizações
  - **shares**: Quantidade de compartilhamentos
  - **saves**: Quantidade de salvamentos
  - **videos**: Número de vídeos

- **Resposta Esperada**:
  ```json
  {
    "total": 954
  }
  ```
  O valor total será calculado conforme a tabela de preços definida:
  - Likes: R$0,20 (mínimo: 100)
  - Views: R$0,006 (mínimo: 100)
  - Shares: R$0,16 (mínimo: 100)
  - Saves: R$0,20 (mínimo: 100)
  - Custo por vídeo: R$2 (máximo: 5 vídeos)

### 2. **Checkout**
A rota `/api/checkout` é responsável por iniciar o processo de pagamento com Stripe, redirecionando o usuário para a página de checkout.

- **Método**: `POST`
- **URL**: `http://<url>/api/checkout`
- **Corpo da Requisição** (JSON):
  ```json
  {
    "total": 954
  }
  ```
  - **total**: O valor total calculado que será enviado ao Stripe (em centavos).

- **Resposta Esperada**:
  ```json
  {
    "url": "https://checkout.stripe.com/c/pay/cs_test_a1yBm7XXg8FlCallg67lcpUNAL14AVaKFkIaDieUN9gXSmJP6jNkgsT1yi#fidkdWxOYHwnPyd1blpxYHZxWjA0VUo9Rz1NfVxGSUZHQ3A9VWk9aHI3TEhpaHFCQEtvV0Q8QVdAbX"
  }
  ```
  O link retornado será a URL de checkout do Stripe para o pagamento.

---

## Exemplos de Requisição via PowerShell

Você pode usar o **Invoke-WebRequest** para testar as rotas no PowerShell.

### 1. **Cálculo de Valores**

```powershell
Invoke-WebRequest -Uri http://<url>/api/calculate -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"likes":150,"views":2000,"shares":100,"saves":300,"videos":1}'
```

**Resposta Esperada**:
```json
{
  "total": 954
}
```

### 2. **Checkout**

```powershell
Invoke-WebRequest -Uri http://<url>/api/checkout -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"total":954}'
```

**Resposta Esperada**:
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_a1yBm7XXg8FlCallg67lcpUNAL14AVaKFkIaDieUN9gXSmJP6jNkgsT1yi#fidkdWxOYHwnPyd1blpxYHZxWjA0VUo9Rz1NfVxGSUZHQ3A9VWk9aHI3TEhpaHFCQEtvV0Q8QVdAbX"
}
```

---

## Como Rodar a API

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/seu-repositorio/API-TikDark.git
   ```

2. **Instalar dependências**:
   ```bash
   npm install
   ```

3. **Rodar o servidor**:
   ```bash
   npm run dev
   ```

4. A API estará disponível em `http://<url>`.

---

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.
```