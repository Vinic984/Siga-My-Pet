# SigaMyPet - Mapa Interativo de Humor de Pets

Uma landing page interativa que mostra o humor de pets através de um mapa com pins personalizados.

## 🐾 Funcionalidades

- **Mapa Interativo**: Utilizando Leaflet para exibir um mapa de São Paulo
- **6 Pets Personalizados**: 3 gatos e 3 cachorros com diferentes humores (feliz, triste, com raiva)
- **Pins Coloridos**: Verde para feliz, azul para triste, vermelho para com raiva
- **Popups Informativos**: Ao clicar nos pins, exibe mensagens sobre o humor do pet
- **Painel de Detalhes**: Atualiza com informações completas do pet selecionado
- **Animação do Animal**: Um avatar (gato ou cachorro) reage ao humor do pet selecionado com animações CSS
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Cores Pastéis**: Design moderno e amigável com paleta de cores suaves

## 🎨 Tecnologias Utilizadas

- **React 19**: Biblioteca principal para construção da UI
- **React Leaflet**: Integração do Leaflet com React
- **Tailwind CSS**: Framework de estilização utilitário
- **Lucide React**: Ícones modernos e personalizáveis
- **Leaflet**: Biblioteca de mapas open-source
- **OpenStreetMap**: Tiles do mapa

## 🚀 Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm start
```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📱 Responsividade

O aplicativo foi projetado para funcionar perfeitamente em:
- Desktop (1920x1080 e superior)
- Tablets (768px e superior)
- Smartphones (360px e superior)

## 🗺️ Localização dos Pets

O mapa está centralizado em São Paulo, com 6 pets distribuídos pela região:

### Gatos:
- **Mia** (Feliz) - Área central
- **Frajola** (Triste) - Zona norte
- **Furioso** (Com raiva) - Zona sul

### Cachorros:
- **Rex** (Feliz) - Zona oeste
- **Mel** (Triste) - Zona leste
- **Thor** (Com raiva) - Região central

## 🎭 Animações dos Pets

O avatar do animal exibido (gato ou cachorro) reage conforme o humor do pet selecionado:
- **Feliz**: Animação de pulo (bounce para gato) ou abanando o rabo (wag para cachorro)
- **Triste**: Animação de balanço (sway para gato) ou inclinando a cabeça (headdrop para cachorro)
- **Com raiva**: Animação de tremor (shake para gato) ou pulando como se latisse (bark para cachorro)

## 🎨 Cores e Design

- **Gradiente Background**: Azul pastel para rosa pastel
- **Cards Brancos**: Com sombras suaves e bordas arredondadas
- **Botões Interativos**: Efeitos hover e transições suaves
- **Tipografia**: Sistema de fontes limpo e moderno

## 📦 Estrutura do Projeto

```
sigamypet/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Componente principal
│   ├── index.js        # Ponto de entrada
│   └── index.css       # Estilos globais e Tailwind
├── tailwind.config.js  # Configuração do Tailwind
├── package.json        # Dependências e scripts
└── README.md           # Este arquivo
```

## 🔧 Personalização

Para adicionar mais pets ou modificar localizações, edite o array `pets` no arquivo `src/App.js`.

Para alterar cores e estilos, modifique o `tailwind.config.js` e os estilos em `src/index.css`.

<img width="1919" height="938" alt="image" src="https://github.com/user-attachments/assets/4368c202-0774-449e-b49a-8228b44a8622" />



<img width="1919" height="946" alt="image" src="https://github.com/user-attachments/assets/1a1a6575-178b-4b7a-8c9d-7f1bb789dcf2" />



<img width="1919" height="940" alt="image" src="https://github.com/user-attachments/assets/d9bc5608-c6f9-4da5-809a-90b6f3c77587" />
