# Colecionaê

O Colecionaê é uma proposta de pasta digital para organizar coleções de cartas de Pokémon TCG, Magic: The Gathering e Yu-Gi-Oh!.

O projeto é desenvolvido para a disciplina de **Desenvolvimento de Software para Web (2026.2)** da **Universidade Federal do Ceará (UFC) - Campus Quixadá**.

## Contexto

Colecionadores e jogadores da comunidade de Quixadá enfrentam dificuldades para controlar suas cartas usando cadernos, planilhas ou ferramentas pouco práticas. O Colecionaê busca oferecer uma interface simples, visual e adaptada ao celular para facilitar consultas durante trocas, partidas e campeonatos.

## Interação Realizada e Escuta Comunitária

* **Público Beneficiado:** Colecionadores e jogadores de Card Games da comunidade de Quixadá.
* **Necessidades Relatadas:** Durante a conversa com os colecionadores, identificamos dores como a dificuldade de lembrar a quantidade exata de cartas, a burocracia excessiva para atualizar inventários em aplicativos tradicionais e a fragmentação na busca por preços em plataformas separadas (*LigaMagic*, *LigaPokémon*, *LigaYuGiOh* e *MypCards*).
* **Retorno sobre a Proposta:** A ideia de uma interface em formato de "pasta de cartas" acessível diretamente pelo celular (inspirada em métodos visuais de organização) foi muito bem recebida e validada pelo grupo.

## Proposta inicial

O protótipo apresenta a seleção dos três jogos e estabelece a identidade visual da aplicação. A evolução planejada inclui:

- visualização das cartas em uma grade inspirada em uma pasta física;
- controle da quantidade de cartas;
- filtros por coleção e cartas faltantes;
- links para referências de mercado.

## Estado atual

Esta versão é um protótipo inicial em HTML e CSS, com:

- página inicial responsiva;
- cards para Pokémon TCG, Magic: The Gathering e Yu-Gi-Oh!;
- identidade visual própria;
- navegação visual entre as coleções.

Funcionalidades com JavaScript, banco de dados, APIs e persistência de dados serão consideradas em etapas posteriores.

## Tecnologias

- HTML5
- CSS3
- Google Fonts
- Git e GitHub

## Como executar

Abra o arquivo `index.html` no navegador ou use o Live Server do VS Code. Não há dependências para instalar.

## Estrutura

```text
ProjetoWEB_Colecionae/
├── index.html
├── styles.css
└── README.md