# SigaMyPet - Sistema de Rastreamento de Coleira Pet

Uma aplicação moderna e responsiva para rastreamento de pets em tempo real, desenvolvida com React e Leaflet.

## 🚀 Funcionalidades

### 🔐 Tela de Login
- **Design moderno e responsivo** com gradientes e sombras elegantes
- **Campo de senha** com opção de mostrar/ocultar senha
- **Campo de numeração da coleira** com ícone ilustrativo
- **Numeração padrão para teste**: 98419
- **Acesso direto** pelo número da coleira (sem necessidade de senha)
- **Animações de carregamento** e feedback visual
- **Validação de formulário** e tratamento de erros

### 🗺️ Tela do Mapa (Mobile-First)
- **Mapa totalmente responsivo** otimizado para dispositivos móveis
- **Localização em tempo real** do pet com atualização automática a cada 5 segundos
- **Controles de zoom** manual (aproximar/afastar)
- **Botão de maximizar** para focar na localização do pet
- **Informações do pet**:
  - Nome do pet
  - Status (Online/Offline) com indicadores visuais
  - Nível de bateria com cores dinâmicas (verde/amarelo/vermelho)
  - Horário da última atualização
- **Interface adaptada para celular** com botões grandes e acessíveis
- **Menu inferior** com ações rápidas (Rota e Alertas)

## 🛠️ Tecnologias Utilizadas

- **React 19.2.4** - Framework principal
- **React Leaflet 5.0.0** - Integração com mapas
- **Leaflet 1.9.4** - Biblioteca de mapas
- **TailwindCSS 3.4.0** - Framework de estilização
- **Lucide React 0.575.0** - Biblioteca de ícones
- **PostCSS 8.5.6** - Processamento de CSS

## 📱 Design Responsivo

A aplicação foi desenvolvida com foco em dispositivos móveis, oferecendo:

- **Layout adaptativo** que se ajusta a qualquer tamanho de tela
- **Interface touch-friendly** com botões grandes e espaçados
- **Mapa otimizado** para visualização em celulares
- **Navegação intuitiva** com gestos simples

## 🎯 Interface do Usuário

### Login
- Visual limpo com gradiente azul-roxo
- Ícones intuitivos (cadeado, tag, olho)
- Feedback visual em todas as interações
- Opção de acesso rápido para demonstração

### Mapa
- Header com informações do pet e botão de voltar
- Mapa ocupando a maior parte da tela
- Controles flutuantes de zoom
- Painel inferior com status e ações
- Indicadores visuais de status (online/offline)

## 🔄 Atualização em Tempo Real

O sistema simula atualizações automáticas:
- **Localização**: atualizada a cada 5 segundos com pequenas variações
- **Bateria**: diminui gradualmente para simular consumo
- **Status**: alterna entre online/offline aleatoriamente
- **Horário**: atualizado a cada refresh

## 🚀 Como Executar

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Inicie a aplicação**:
   ```bash
   npm start
   ```

3. **Acesse no navegador**:
   - Abra `http://localhost:3000`
   - Use a numeração `98419` para teste

## 📱 Modo de Uso

### Acesso Completo
1. Digite qualquer senha
2. Digite o número da coleira (ex: 98419)
3. Clique em "Entrar"

### Acesso Direto
1. Clique em "Acessar pelo número da coleira"
2. Digite apenas o número da coleira
3. Clique em "Acessar Mapa"

### Navegação no Mapa
- **Zoom**: Use os botões + e - ou gestos de pinça
- **Pan**: Arraste o mapa para mover
- **Maximizar**: Clique no botão de maximizar para focar no pet
- **Atualizar**: Clique no botão de refresh para atualizar manualmente

## 🎨 Personalização

### Cores e Temas
- Gradientes personalizáveis no arquivo CSS
- Cores dinâmicas para status de bateria
- Tema claro e moderno

### Ícones
- Biblioteca Lucide React para ícones consistentes
- Ícones SVG para melhor qualidade visual
- Indicadores visuais de status

## 📊 Estrutura do Projeto

```
src/
├── components/
│   ├── Login.js          # Componente de login
│   └── PetMap.js         # Componente do mapa
├── App.js                # Componente principal com roteamento
├── index.css             # Estilos globais
└── index.js              # Ponto de entrada
```

## 🔧 Desenvolvimento Futuro

- Integração com API real de rastreamento
- Autenticação com backend
- Histórico de localizações
- Notificações push
- Geofences (cercas virtuais)
- Múltiplos pets por usuário
- Compartilhamento de localização

## 📄 Licença

Este projeto foi desenvolvido para demonstração das capacidades de desenvolvimento de aplicações web modernas e responsivas.
