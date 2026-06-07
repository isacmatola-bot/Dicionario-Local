import { FormEvent, useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Filter,
  Globe2,
  Library,
  ListPlus,
  MapPin,
  Mic2,
  Search,
  Sparkles,
} from "lucide-react";
import {
  dictionaryEntries,
  grammarLessons,
  languages,
  roadmap,
  type DictionaryEntry,
  type GrammarLesson,
} from "./data/seed";
import { clearContributions, loadContributions, saveContribution } from "./lib/storage";

type View = "dicionario" | "gramatica" | "contribuir" | "plano";

const viewLabels: Record<View, string> = {
  dicionario: "Dicionario",
  gramatica: "Gramatica",
  contribuir: "Contribuir",
  plano: "Plano",
};

const viewIcons = {
  dicionario: Library,
  gramatica: BookOpen,
  contribuir: ListPlus,
  plano: ClipboardList,
};

const validationLabels: Record<DictionaryEntry["validation"], string> = {
  exemplo: "Exemplo",
  por_validar: "Por validar",
  validado: "Validado",
};

const statusLabels = {
  levantamento: "Levantamento",
  validacao: "Validacao",
  publicado: "Publicado",
};

function getLanguageName(languageId: string) {
  return languages.find((language) => language.id === languageId)?.name ?? "Geral";
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function App() {
  const [activeView, setActiveView] = useState<View>("dicionario");
  const [query, setQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("todos");
  const [selectedDomain, setSelectedDomain] = useState("todos");
  const [selectedEntryId, setSelectedEntryId] = useState(dictionaryEntries[0]?.id ?? "");
  const [selectedLessonId, setSelectedLessonId] = useState(grammarLessons[0]?.id ?? "");
  const [contributions, setContributions] = useState<DictionaryEntry[]>(() => loadContributions());
  const [notice, setNotice] = useState("");

  const allEntries = useMemo(
    () => [...contributions, ...dictionaryEntries],
    [contributions],
  );

  const domains = useMemo(
    () => Array.from(new Set(allEntries.map((entry) => entry.domain))).sort(),
    [allEntries],
  );

  const filteredEntries = useMemo(() => {
    const needle = normalize(query);
    return allEntries.filter((entry) => {
      const matchesLanguage =
        selectedLanguage === "todos" || entry.languageId === selectedLanguage;
      const matchesDomain = selectedDomain === "todos" || entry.domain === selectedDomain;
      const searchable = normalize(
        [
          entry.term,
          entry.portuguese,
          entry.english ?? "",
          entry.example,
          entry.domain,
          getLanguageName(entry.languageId),
        ].join(" "),
      );
      return matchesLanguage && matchesDomain && searchable.includes(needle);
    });
  }, [allEntries, query, selectedDomain, selectedLanguage]);

  const selectedEntry =
    allEntries.find((entry) => entry.id === selectedEntryId) ?? filteredEntries[0];

  const selectedLesson =
    grammarLessons.find((lesson) => lesson.id === selectedLessonId) ?? grammarLessons[0];

  const visibleLessons = grammarLessons.filter(
    (lesson) => selectedLanguage === "todos" || lesson.languageId === selectedLanguage || lesson.languageId === "geral",
  );

  function handleContributionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const draft = {
      languageId: String(form.get("languageId")),
      term: String(form.get("term")).trim(),
      pronunciation: String(form.get("pronunciation")).trim(),
      partOfSpeech: String(form.get("partOfSpeech")) as DictionaryEntry["partOfSpeech"],
      portuguese: String(form.get("portuguese")).trim(),
      english: String(form.get("english")).trim(),
      example: String(form.get("example")).trim(),
      exampleTranslation: String(form.get("exampleTranslation")).trim(),
      domain: String(form.get("domain")).trim() || "Geral",
    };

    if (!draft.term || !draft.portuguese || !draft.example) {
      setNotice("Preencha palavra, traducao e exemplo antes de guardar.");
      return;
    }

    const updated = saveContribution(draft);
    setContributions(updated);
    setNotice("Contribuicao guardada neste navegador.");
    event.currentTarget.reset();
    setActiveView("dicionario");
    setSelectedEntryId(updated[0].id);
  }

  function handleClearContributions() {
    clearContributions();
    setContributions([]);
    setNotice("Contribuicoes locais removidas.");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Navegacao principal">
        <div className="brand-block">
          <div className="brand-mark">
            <Globe2 size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">Mocambique</p>
            <h1>Dicionario Local</h1>
          </div>
        </div>

        <nav className="nav-list">
          {(Object.keys(viewLabels) as View[]).map((view) => {
            const Icon = viewIcons[view];
            return (
              <button
                key={view}
                className={activeView === view ? "active" : ""}
                onClick={() => setActiveView(view)}
                type="button"
                title={viewLabels[view]}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{viewLabels[view]}</span>
              </button>
            );
          })}
        </nav>

        <div className="language-panel">
          <p className="panel-title">Linguas</p>
          <div className="language-list">
            {languages.slice(0, 6).map((language) => (
              <button
                key={language.id}
                className={selectedLanguage === language.id ? "selected" : ""}
                onClick={() => setSelectedLanguage(language.id)}
                type="button"
              >
                <span>{language.name}</span>
                <small>{statusLabels[language.status]}</small>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="topbar-copy">
            <p className="eyebrow">Lexico, gramatica e validacao comunitaria</p>
            <h2>{viewLabels[activeView]}</h2>
          </div>
          <img
            src="/assets/language-workbench.svg"
            alt="Mesa de trabalho linguistico"
            className="topbar-art"
          />
        </header>

        <section className="stats-grid" aria-label="Resumo do projecto">
          <article>
            <Library size={20} aria-hidden="true" />
            <strong>{allEntries.length}</strong>
            <span>entradas</span>
          </article>
          <article>
            <Globe2 size={20} aria-hidden="true" />
            <strong>{languages.length}</strong>
            <span>linguas</span>
          </article>
          <article>
            <BookOpen size={20} aria-hidden="true" />
            <strong>{grammarLessons.length}</strong>
            <span>notas gramaticais</span>
          </article>
          <article>
            <CheckCircle2 size={20} aria-hidden="true" />
            <strong>{contributions.length}</strong>
            <span>contribuicoes locais</span>
          </article>
        </section>

        {notice && (
          <div className="notice" role="status">
            {notice}
          </div>
        )}

        {activeView === "dicionario" && (
          <DictionaryView
            domains={domains}
            entries={filteredEntries}
            query={query}
            selectedDomain={selectedDomain}
            selectedEntry={selectedEntry}
            selectedLanguage={selectedLanguage}
            onDomainChange={setSelectedDomain}
            onEntrySelect={setSelectedEntryId}
            onLanguageChange={setSelectedLanguage}
            onQueryChange={setQuery}
          />
        )}

        {activeView === "gramatica" && (
          <GrammarView
            lessons={visibleLessons}
            selectedLesson={selectedLesson}
            onLessonSelect={setSelectedLessonId}
          />
        )}

        {activeView === "contribuir" && (
          <ContributionView
            contributions={contributions}
            onClear={handleClearContributions}
            onSubmit={handleContributionSubmit}
          />
        )}

        {activeView === "plano" && <RoadmapView />}
      </section>
    </main>
  );
}

type DictionaryViewProps = {
  domains: string[];
  entries: DictionaryEntry[];
  query: string;
  selectedDomain: string;
  selectedEntry?: DictionaryEntry;
  selectedLanguage: string;
  onDomainChange: (value: string) => void;
  onEntrySelect: (id: string) => void;
  onLanguageChange: (value: string) => void;
  onQueryChange: (value: string) => void;
};

function DictionaryView({
  domains,
  entries,
  query,
  selectedDomain,
  selectedEntry,
  selectedLanguage,
  onDomainChange,
  onEntrySelect,
  onLanguageChange,
  onQueryChange,
}: DictionaryViewProps) {
  return (
    <section className="content-layout">
      <div className="main-column">
        <div className="toolbar" aria-label="Filtros do dicionario">
          <label className="search-field">
            <Search size={18} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Pesquisar palavra, traducao, exemplo"
            />
          </label>
          <label className="select-field">
            <Globe2 size={18} aria-hidden="true" />
            <select
              value={selectedLanguage}
              onChange={(event) => onLanguageChange(event.target.value)}
            >
              <option value="todos">Todas as linguas</option>
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>
          </label>
          <label className="select-field">
            <Filter size={18} aria-hidden="true" />
            <select value={selectedDomain} onChange={(event) => onDomainChange(event.target.value)}>
              <option value="todos">Todos os dominios</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="entry-list">
          {entries.map((entry) => (
            <button key={entry.id} type="button" onClick={() => onEntrySelect(entry.id)}>
              <div>
                <span className="entry-term">{entry.term}</span>
                <span className="entry-language">{getLanguageName(entry.languageId)}</span>
              </div>
              <strong>{entry.portuguese}</strong>
              <small>{entry.domain}</small>
            </button>
          ))}
          {entries.length === 0 && <p className="empty-state">Sem resultados para estes filtros.</p>}
        </div>
      </div>

      <aside className="detail-panel" aria-label="Entrada seleccionada">
        {selectedEntry ? (
          <>
            <div className="detail-header">
              <div>
                <p className="eyebrow">{getLanguageName(selectedEntry.languageId)}</p>
                <h3>{selectedEntry.term}</h3>
              </div>
              <span className={`badge ${selectedEntry.validation}`}>
                {validationLabels[selectedEntry.validation]}
              </span>
            </div>
            <dl className="definition-list">
              <div>
                <dt>Pronuncia</dt>
                <dd>{selectedEntry.pronunciation}</dd>
              </div>
              <div>
                <dt>Classe</dt>
                <dd>{selectedEntry.partOfSpeech}</dd>
              </div>
              <div>
                <dt>Portugues</dt>
                <dd>{selectedEntry.portuguese}</dd>
              </div>
              {selectedEntry.english && (
                <div>
                  <dt>Ingles</dt>
                  <dd>{selectedEntry.english}</dd>
                </div>
              )}
            </dl>
            <div className="example-block">
              <Mic2 size={18} aria-hidden="true" />
              <div>
                <strong>{selectedEntry.example}</strong>
                <span>{selectedEntry.exampleTranslation}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="empty-state">Seleccione uma entrada.</p>
        )}
      </aside>
    </section>
  );
}

type GrammarViewProps = {
  lessons: GrammarLesson[];
  selectedLesson?: GrammarLesson;
  onLessonSelect: (id: string) => void;
};

function GrammarView({ lessons, selectedLesson, onLessonSelect }: GrammarViewProps) {
  return (
    <section className="content-layout">
      <div className="main-column">
        <div className="lesson-grid">
          {lessons.map((lesson) => (
            <button key={lesson.id} type="button" onClick={() => onLessonSelect(lesson.id)}>
              <span>{lesson.category}</span>
              <strong>{lesson.title}</strong>
              <small>{lesson.level}</small>
            </button>
          ))}
        </div>
      </div>

      <article className="detail-panel">
        {selectedLesson ? (
          <>
            <div className="detail-header">
              <div>
                <p className="eyebrow">{getLanguageName(selectedLesson.languageId)}</p>
                <h3>{selectedLesson.title}</h3>
              </div>
              <span className="badge validado">{selectedLesson.level}</span>
            </div>
            <p className="lesson-summary">{selectedLesson.summary}</p>
            <ul className="point-list">
              {selectedLesson.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="empty-state">Seleccione uma nota gramatical.</p>
        )}
      </article>
    </section>
  );
}

type ContributionViewProps = {
  contributions: DictionaryEntry[];
  onClear: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function ContributionView({ contributions, onClear, onSubmit }: ContributionViewProps) {
  return (
    <section className="contribution-layout">
      <form className="contribution-form" onSubmit={onSubmit}>
        <div className="form-grid">
          <label>
            Lingua
            <select name="languageId" defaultValue={languages[0].id}>
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Palavra
            <input name="term" placeholder="Ex.: palavra local" />
          </label>
          <label>
            Pronuncia
            <input name="pronunciation" placeholder="Ex.: pa-la-vra" />
          </label>
          <label>
            Classe
            <select name="partOfSpeech" defaultValue="substantivo">
              <option value="substantivo">Substantivo</option>
              <option value="verbo">Verbo</option>
              <option value="adjetivo">Adjetivo</option>
              <option value="expressao">Expressao</option>
            </select>
          </label>
          <label>
            Traducao em portugues
            <input name="portuguese" placeholder="Ex.: casa" />
          </label>
          <label>
            Traducao em ingles
            <input name="english" placeholder="Opcional" />
          </label>
          <label>
            Dominio
            <input name="domain" placeholder="Ex.: Familia, escola, saude" />
          </label>
          <label className="wide-field">
            Exemplo na lingua local
            <textarea name="example" placeholder="Escreva uma frase curta" rows={3} />
          </label>
          <label className="wide-field">
            Traducao do exemplo
            <textarea name="exampleTranslation" placeholder="Traducao natural em portugues" rows={3} />
          </label>
        </div>
        <button className="primary-action" type="submit">
          <ListPlus size={18} aria-hidden="true" />
          Guardar contribuicao
        </button>
      </form>

      <aside className="queue-panel">
        <div className="detail-header">
          <div>
            <p className="eyebrow">Fila local</p>
            <h3>Contribuicoes</h3>
          </div>
          <button className="ghost-action" type="button" onClick={onClear}>
            Limpar
          </button>
        </div>
        <div className="queue-list">
          {contributions.map((entry) => (
            <article key={entry.id}>
              <strong>{entry.term}</strong>
              <span>{getLanguageName(entry.languageId)}</span>
              <small>{entry.portuguese}</small>
            </article>
          ))}
          {contributions.length === 0 && (
            <p className="empty-state">Ainda nao ha contribuicoes neste navegador.</p>
          )}
        </div>
      </aside>
    </section>
  );
}

function RoadmapView() {
  return (
    <section className="roadmap-view">
      <div className="language-catalog">
        {languages.map((language) => (
          <article key={language.id}>
            <div>
              <strong>{language.name}</strong>
              <span>{language.autonym}</span>
            </div>
            <p>
              <MapPin size={15} aria-hidden="true" />
              {language.region}
            </p>
            <small>{statusLabels[language.status]}</small>
          </article>
        ))}
      </div>

      <div className="roadmap-list">
        {roadmap.map((item) => (
          <article key={item.id} className={item.status}>
            <span>
              <Sparkles size={16} aria-hidden="true" />
              {item.status}
            </span>
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default App;
