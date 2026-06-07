# Dicionario Local Mocambique

Aplicacao web para construir um dicionario e uma gramatica digital de linguas locais de Mocambique, com foco em recolha comunitaria, validacao por falantes e expansao futura para mobile e computador.

## Objectivo

- Melhorar o acesso a vocabulario e regras gramaticais das linguas locais.
- Apoiar escolas, investigadores, comunidades e criadores de conteudo.
- Criar uma base tecnica que possa crescer para API, base de dados, audio, offline, app mobile e desktop.

## Primeira versao

- Pesquisa de palavras por lingua, traducao, exemplo e dominio.
- Filtros por lingua e area de uso.
- Notas iniciais de gramatica e metodologia lexicografica.
- Formulario para adicionar contribuicoes no navegador usando `localStorage`.
- Interface responsiva para telemovel, tablet e computador.

Os dados lexicais iniciais sao sementes de demonstracao e devem ser revistos por falantes e especialistas antes de publicacao oficial.

## Como executar

```bash
npm install
npm run dev
```

Depois abra o endereco mostrado pelo Vite, normalmente `http://127.0.0.1:5173/`.

## Estrutura

```text
src/
  App.tsx            Interface e interacoes principais
  data/seed.ts       Linguas, entradas, gramatica e roadmap inicial
  lib/storage.ts     Persistencia local de contribuicoes
  styles.css         Layout responsivo e estilo visual
public/
  assets/            Recursos visuais
```

## Proximas etapas recomendadas

1. Definir conselho editorial por lingua e regras de validacao.
2. Criar backend com PostgreSQL ou SQLite para entradas, variantes, fontes e historico.
3. Adicionar contas de utilizador, papeis e revisao por validadores.
4. Incluir audio, consentimento, licencas e modo offline.
5. Preparar PWA e depois empacotar para Android/iOS e desktop.
