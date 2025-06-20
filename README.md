# PulseChain ⚡

**PulseChain** é uma aplicação descentralizada (DApp) desenvolvida com o objetivo de permitir que usuários da rede Ethereum publiquem e interajam com mensagens curtas chamadas **Pulses**. Todas as interações são registradas on-chain, promovendo transparência e imutabilidade.

Este projeto utiliza o contrato inteligente [`0xF1E9cFF187D12d8a33862e0108dd216Cdb37aa0b`](https://sepolia.etherscan.io/address/0xF1E9cFF187D12d8a33862e0108dd216Cdb37aa0b), implementado na testnet **Sepolia**, como backend da aplicação.

---

## ✨ Funcionalidades

* Criar postagens (Pulses)
* Curtir e descurtir Pulses
* Interagir com o contrato em tempo real via WebSocket (sem polling)
* Interface moderna e responsiva utilizando Material UI

---

## 🛠️ Tecnologias Utilizadas

* **[React](https://reactjs.org/)** — Interface do usuário
* **[Material UI (MUI)](https://mui.com/)** — Componentes visuais
* **[Wagmi](https://wagmi.sh/)** — Integração com contratos e gerenciamento de estado Web3
* **[Reown AppKit](https://cloud.reown.com/app)** — Autenticação via carteira
* **[RPC Gateway to Ethereum Sepolia](https://ethereum-sepolia-rpc.publicnode.com//)** — WebSocket para escuta de eventos on-chain

---

## 🔍 Destaques Técnicos

* A ABI do contrato é gerada automaticamente via `wagmi` para o arquivo `generated.ts`, facilitando a integração.
* A escuta de eventos on-chain é feita via WebSocket (`ethereum-sepolia-rpc.publicnode.com`), eliminando a necessidade de polling constante.
* Todas as interações respeitam as boas práticas da Web3, incluindo confirmação de transações pelo usuário e uso de testnet.

---

## 🚀 Como Usar a Aplicação

> Nenhuma instalação local é necessária. A aplicação é acessada diretamente no navegador com suporte à carteira MetaMask.

Claro! Aqui está uma sugestão atualizada para o seu **README**, cobrindo as **duas formas de autenticação**: com **carteira MetaMask** e com **e-mail**.

---

### 🔐 Passo 1 – Criar e se autenticar com uma carteira

Você pode se autenticar de duas formas:
**1. Via carteira MetaMask** (extensão)
**2. Via e-mail + código de confirmação**

#### 🔸 Opção 1 – MetaMask (extensão para navegador)

1. Instale a extensão [MetaMask](https://metamask.io/download) no seu navegador.
2. Crie uma nova carteira ou conecte uma já existente.
3. Após conectar a carteira, você poderá autenticar-se diretamente com ela no app.

#### 🔸 Opção 2 – E-mail + código de confirmação

1. Na janela aberta depois de clicar em **Connect Wallet**, clique em **"Haven't got a wallet? Get started"**.
2. Informe seu **e-mail**.
3. Digite o **código de confirmação** que será enviado para sua caixa de entrada, spam ou lixo eletrônico.
4. Pronto! Agora seu login será feito com **e-mail + código de confirmação**.

### 2. Obtenha ETH de teste (Sepolia)

* Acesse o [Ethereum Sepolia Faucet do Google](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
* Faça login com sua conta Google, informe o seu endereço da carteira e clique em **"Receive 0.05 Sepolia ETH"**

### 3. Acesse a aplicação e conecte sua carteira

* Clique em **"Connect Wallet"**
* Escolha a MetaMask e aprove a conexão
* Agora você pode:

    * Criar novos Pulses
    * Curtir ou descurtir outros Pulses
    * Desativar um Pulse (não remove da blockchain, apenas oculta da interface)

> 💡 Cada transação exige confirmação via MetaMask e utiliza o saldo de Sepolia ETH da sua carteira.

---

## 👨‍💻 Para Desenvolvedores

Este projeto também serve como exemplo prático de:

* Como integrar contratos inteligentes com frontend React
* Utilização do `wagmi` para interações avançadas
* Escuta de eventos em tempo real com WebSocket
* Autenticação de usuários Web3 com o Reown AppKit

---

## 📜 Contrato Inteligente

* **Endereço:** [`0xF1E9cFF187D12d8a33862e0108dd216Cdb37aa0b`](https://sepolia.etherscan.io/address/0xF1E9cFF187D12d8a33862e0108dd216Cdb37aa0b)
* **Rede:** Ethereum Testnet Sepolia
* **Código-fonte:** Verificado e disponível no Etherscan

---

## 🤝 Contribuições

Pull requests e sugestões são muito bem-vindos. A ideia é que este projeto sirva como base para outras iniciativas da comunidade Web3.

---

## 🧾 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo [`LICENSE`](./LICENSE) para mais informações.