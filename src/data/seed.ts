export type Language = {
  id: string;
  name: string;
  autonym: string;
  region: string;
  family: string;
  status: "levantamento" | "validacao" | "publicado";
};

export type DictionaryEntry = {
  id: string;
  languageId: string;
  term: string;
  pronunciation: string;
  partOfSpeech: "substantivo" | "verbo" | "adjetivo" | "expressao";
  portuguese: string;
  english?: string;
  example: string;
  exampleTranslation: string;
  domain: string;
  validation: "exemplo" | "por_validar" | "validado";
};

export type GrammarLesson = {
  id: string;
  languageId: string | "geral";
  title: string;
  category: "ortografia" | "fonetica" | "morfologia" | "sintaxe" | "metodologia";
  level: "basico" | "intermedio" | "avancado";
  summary: string;
  points: string[];
};

export type RoadmapItem = {
  id: string;
  title: string;
  status: "agora" | "proximo" | "futuro";
  detail: string;
};

export const languages: Language[] = [
  {
    id: "emakhuwa",
    name: "Emakhuwa",
    autonym: "Emakhuwa",
    region: "Nampula, Cabo Delgado, Niassa, Zambezia",
    family: "Bantu",
    status: "levantamento",
  },
  {
    id: "xichangana",
    name: "Xichangana",
    autonym: "Xichangana",
    region: "Gaza, Maputo, Inhambane",
    family: "Bantu",
    status: "validacao",
  },
  {
    id: "cinyanja",
    name: "Cinyanja",
    autonym: "Cinyanja",
    region: "Tete, Niassa, Zambezia",
    family: "Bantu",
    status: "validacao",
  },
  {
    id: "cisena",
    name: "Cisena",
    autonym: "Cisena",
    region: "Sofala, Manica, Zambezia, Tete",
    family: "Bantu",
    status: "levantamento",
  },
  {
    id: "elomwe",
    name: "Elomwe",
    autonym: "Elomwe",
    region: "Zambezia, Nampula",
    family: "Bantu",
    status: "levantamento",
  },
  {
    id: "echuwabo",
    name: "Echuwabo",
    autonym: "Echuwabo",
    region: "Zambezia",
    family: "Bantu",
    status: "levantamento",
  },
  {
    id: "xirhonga",
    name: "Xirhonga",
    autonym: "Xirhonga",
    region: "Maputo",
    family: "Bantu",
    status: "levantamento",
  },
  {
    id: "gitonga",
    name: "Gitonga",
    autonym: "Gitonga",
    region: "Inhambane",
    family: "Bantu",
    status: "levantamento",
  },
  {
    id: "ciyao",
    name: "Ciyao",
    autonym: "Ciyao",
    region: "Niassa, Cabo Delgado",
    family: "Bantu",
    status: "levantamento",
  },
  {
    id: "shimakonde",
    name: "Shimakonde",
    autonym: "Shimakonde",
    region: "Cabo Delgado",
    family: "Bantu",
    status: "levantamento",
  },
];

export const dictionaryEntries: DictionaryEntry[] = [
  {
    id: "xichangana-avuxeni",
    languageId: "xichangana",
    term: "Avuxeni",
    pronunciation: "a-vu-xe-ni",
    partOfSpeech: "expressao",
    portuguese: "Bom dia; saudacao",
    english: "Good morning; greeting",
    example: "Avuxeni, mi pfukile kahle.",
    exampleTranslation: "Bom dia, acordei bem.",
    domain: "Saudacoes",
    validation: "por_validar",
  },
  {
    id: "xichangana-kanimambo",
    languageId: "xichangana",
    term: "Kanimambo",
    pronunciation: "ka-ni-mam-bo",
    partOfSpeech: "expressao",
    portuguese: "Obrigado; obrigada",
    english: "Thank you",
    example: "Kanimambo hi ku pfuna.",
    exampleTranslation: "Obrigado pela ajuda.",
    domain: "Cortesia",
    validation: "por_validar",
  },
  {
    id: "cinyanja-moni",
    languageId: "cinyanja",
    term: "Moni",
    pronunciation: "mo-ni",
    partOfSpeech: "expressao",
    portuguese: "Ola; saudacao",
    english: "Hello",
    example: "Moni, muli bwanji?",
    exampleTranslation: "Ola, como esta?",
    domain: "Saudacoes",
    validation: "por_validar",
  },
  {
    id: "cinyanja-zikomo",
    languageId: "cinyanja",
    term: "Zikomo",
    pronunciation: "zi-ko-mo",
    partOfSpeech: "expressao",
    portuguese: "Obrigado; obrigada",
    english: "Thank you",
    example: "Zikomo kwambiri.",
    exampleTranslation: "Muito obrigado.",
    domain: "Cortesia",
    validation: "por_validar",
  },
  {
    id: "cinyanja-madzi",
    languageId: "cinyanja",
    term: "Madzi",
    pronunciation: "ma-dzi",
    partOfSpeech: "substantivo",
    portuguese: "Agua",
    english: "Water",
    example: "Ndikufuna madzi.",
    exampleTranslation: "Quero agua.",
    domain: "Casa e vida diaria",
    validation: "por_validar",
  },
  {
    id: "xichangana-mati",
    languageId: "xichangana",
    term: "Mati",
    pronunciation: "ma-ti",
    partOfSpeech: "substantivo",
    portuguese: "Agua",
    english: "Water",
    example: "Ni lava mati.",
    exampleTranslation: "Quero agua.",
    domain: "Casa e vida diaria",
    validation: "por_validar",
  },
];

export const grammarLessons: GrammarLesson[] = [
  {
    id: "metodologia-entrada",
    languageId: "geral",
    title: "Modelo de entrada lexicografica",
    category: "metodologia",
    level: "basico",
    summary: "Formato comum para registar palavras, exemplos e revisao comunitaria.",
    points: [
      "Registar palavra na lingua local, classe gramatical e traducao principal em portugues.",
      "Adicionar pronuncia aproximada, variante regional e frase de exemplo.",
      "Marcar cada item como por validar ate ser revisto por pelo menos dois falantes.",
      "Separar significados diferentes em entradas diferentes quando o uso muda.",
    ],
  },
  {
    id: "ortografia-geral",
    languageId: "geral",
    title: "Normas de escrita e variantes",
    category: "ortografia",
    level: "basico",
    summary: "Espaco para alinhar grafias locais, variantes e decisoes editoriais.",
    points: [
      "Guardar a forma preferida e tambem grafias alternativas quando existirem.",
      "Indicar distrito, comunidade ou fonte que usa determinada variante.",
      "Evitar apagar variantes autenticas; o app deve mostrar contexto de uso.",
      "Criar uma nota editorial quando uma forma for escolhida como padrao do projecto.",
    ],
  },
  {
    id: "bantu-classes",
    languageId: "geral",
    title: "Classes nominais",
    category: "morfologia",
    level: "intermedio",
    summary: "Base para documentar prefixos, plurais e concordancia nas linguas bantu.",
    points: [
      "Identificar o prefixo nominal da palavra no singular e no plural.",
      "Registar como o adjectivo, verbo ou pronome concorda com o nome.",
      "Criar exemplos curtos com nomes de pessoas, objectos, lugares e ideias.",
      "Confirmar excecoes com falantes e materiais locais antes de publicar.",
    ],
  },
  {
    id: "sintaxe-frase",
    languageId: "geral",
    title: "Estrutura da frase",
    category: "sintaxe",
    level: "basico",
    summary: "Quadro para comparar sujeito, verbo, objecto e marcadores de tempo.",
    points: [
      "Recolher frases afirmativas, negativas e interrogativas.",
      "Anotar a posicao dos marcadores de tempo, aspecto e negacao.",
      "Traduzir literalmente e depois dar a traducao natural em portugues.",
      "Usar exemplos do quotidiano para facilitar aprendizagem na escola e em casa.",
    ],
  },
  {
    id: "fonetica-pronuncia",
    languageId: "geral",
    title: "Pronuncia e audio",
    category: "fonetica",
    level: "basico",
    summary: "Preparacao para incluir audio comunitario e notas de pronuncia.",
    points: [
      "Gravar voz de falantes de diferentes idades e regioes quando houver autorizacao.",
      "Guardar pronuncia aproximada para consulta rapida antes de existir audio.",
      "Anotar sons que nao existem no portugues e exemplos de pares minimos.",
      "Associar cada audio a uma licenca e ao consentimento do colaborador.",
    ],
  },
];

export const roadmap: RoadmapItem[] = [
  {
    id: "mvp-web",
    title: "MVP web",
    status: "agora",
    detail: "Pesquisa, filtros, gramatica inicial e contribuicoes locais no navegador.",
  },
  {
    id: "backend",
    title: "Base de dados e revisao",
    status: "proximo",
    detail: "API, contas, niveis de permissao, historico e painel de validadores.",
  },
  {
    id: "audio",
    title: "Audio e offline",
    status: "proximo",
    detail: "Pronuncia gravada, cache offline e exportacao para escolas e comunidades.",
  },
  {
    id: "mobile-desktop",
    title: "Mobile e computador",
    status: "futuro",
    detail: "Transformar a web app em PWA, app Android/iOS e app desktop.",
  },
];
