import { useState } from "react";

type Project = {
  number: string;
  title: string;
  category: "Branding" | "Digital" | "Editorial";
  description: string;
  tags: string[];
  visual: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Forma",
    category: "Branding",
    description: "Identidad para un estudio de arquitectura que convierte ideas en espacios.",
    tags: ["Dirección de arte", "Identidad", "2024"],
    visual: "forma",
  },
  {
    number: "02",
    title: "Nómada",
    category: "Digital",
    description: "Una plataforma editorial para descubrir destinos desde otra perspectiva.",
    tags: ["UX/UI", "Desarrollo", "2024"],
    visual: "nomada",
  },
  {
    number: "03",
    title: "Materia",
    category: "Editorial",
    description: "Diseño y narrativa para una publicación dedicada a los nuevos oficios.",
    tags: ["Editorial", "Fotografía", "2023"],
    visual: "materia",
  },
  {
    number: "04",
    title: "Savia",
    category: "Branding",
    description: "Un sistema de marca vivo para una nueva generación de bienestar.",
    tags: ["Estrategia", "Packaging", "2023"],
    visual: "savia",
  },
];

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    className={`size-5 ${diagonal ? "-rotate-45" : ""}`}
  >
    <path d="M5 12h14M14 6l6 6-6 6" />
  </svg>
);

function ProjectArtwork({ type }: { type: string }) {
  if (type === "forma") {
    return (
      <div className="artwork artwork-forma" aria-hidden="true">
        <div className="forma-word">F</div>
        <div className="forma-circle" />
        <span>ESTUDIO / 24</span>
      </div>
    );
  }

  if (type === "nomada") {
    return (
      <div className="artwork artwork-nomada" aria-hidden="true">
        <div className="nomada-orbit nomada-orbit-one" />
        <div className="nomada-orbit nomada-orbit-two" />
        <div className="nomada-label">NÓMADA</div>
        <div className="nomada-coordinate">
          40.4168° N<br />
          3.7038° W
        </div>
      </div>
    );
  }

  if (type === "materia") {
    return (
      <div className="artwork artwork-materia" aria-hidden="true">
        <div className="materia-grid" />
        <div className="materia-m">M</div>
        <div className="materia-copy">
          NUEVOS
          <br />
          OFICIOS
        </div>
      </div>
    );
  }

  return (
    <div className="artwork artwork-savia" aria-hidden="true">
      <div className="savia-leaf savia-leaf-one" />
      <div className="savia-leaf savia-leaf-two" />
      <div className="savia-leaf savia-leaf-three" />
      <div className="savia-name">SAVIA</div>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const filters = ["Todos", "Branding", "Digital", "Editorial"];
  const visibleProjects =
    filter === "Todos" ? projects : projects.filter((project) => project.category === filter);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a href="#inicio" className="logo" aria-label="Irene Marín, inicio">
          IM<span>®</span>
        </a>
        <nav
          className={menuOpen ? "nav-links nav-open" : "nav-links"}
          aria-label="Navegación principal"
        >
          <a href="#proyectos" onClick={closeMenu}>
            Proyectos
          </a>
          <a href="#perfil" onClick={closeMenu}>
            Perfil
          </a>
          <a href="#contacto" onClick={closeMenu}>
            Contacto
          </a>
        </nav>
        <a className="availability" href="mailto:hola@irenemarin.studio">
          <span />
          Disponible para proyectos
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="eyebrow">Diseñadora & directora de arte — Madrid</div>
        <h1>
          Ideas que se
          <br />
          <span className="hero-indent">
            pueden <i>tocar.</i>
          </span>
        </h1>
        <div className="hero-bottom">
          <p>
            Creo identidades, experiencias digitales y universos visuales para marcas con algo que
            decir.
          </p>
          <a href="#proyectos" className="circle-link" aria-label="Ver proyectos">
            <Arrow />
          </a>
        </div>
        <div className="hero-mark" aria-hidden="true">
          ✦
        </div>
      </section>

      <section className="projects-section" id="proyectos">
        <div className="section-heading">
          <div>
            <span className="section-number">(01)</span>
            <h2>
              Proyectos
              <br />
              seleccionados
            </h2>
          </div>
          <p>
            Una selección de trabajos recientes construidos desde la estrategia, la curiosidad y el
            detalle.
          </p>
        </div>

        <div className="filters" aria-label="Filtrar proyectos">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-visual">
                <ProjectArtwork type={project.visual} />
                <span className="project-number">{project.number}</span>
              </div>
              <div className="project-info">
                <div>
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.description}</p>
                <span className="project-arrow" aria-hidden="true">
                  <Arrow diagonal />
                </span>
              </div>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section" id="perfil">
        <div className="profile-title">
          <span className="section-number">(02)</span>
          <p>Perfil</p>
        </div>
        <div className="profile-content">
          <h2>
            Diseño para hacer
            <br />
            visible lo <i>esencial.</i>
          </h2>
          <div className="profile-columns">
            <p className="profile-intro">
              Soy Irene, diseñadora independiente especializada en construir marcas claras,
              relevantes y llenas de intención.
            </p>
            <div className="profile-body">
              <p>
                Trabajo en la intersección entre estrategia y expresión visual. Me interesa entender
                el porqué antes de decidir el cómo, creando sistemas que funcionan y, sobre todo,
                conectan.
              </p>
              <p>
                Colaboro con estudios, agencias y equipos de todo el mundo desde mi espacio en
                Madrid.
              </p>
              <a
                href="mailto:hola@irenemarin.studio?subject=Cuéntame sobre tu proyecto"
                className="text-link"
              >
                Cuéntame tu proyecto <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="services-heading">
          <span className="section-number">(03)</span>
          <p>Lo que hago</p>
        </div>
        <div className="services-list">
          {[
            ["01", "Estrategia de marca", "Posicionamiento / Narrativa / Arquitectura"],
            ["02", "Identidad visual", "Dirección de arte / Diseño / Sistemas"],
            ["03", "Experiencias digitales", "UX/UI / Web / Dirección creativa"],
          ].map(([number, title, detail]) => (
            <div className="service-row" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
              <Arrow diagonal />
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <p className="contact-kicker">¿Tienes una idea en mente?</p>
        <a href="mailto:hola@irenemarin.studio" className="contact-title">
          Hablemos<span>.</span>
        </a>
        <div className="contact-details">
          <a href="mailto:hola@irenemarin.studio">hola@irenemarin.studio</a>
          <div>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.behance.net" target="_blank" rel="noreferrer">
              Behance
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="logo">
          IM<span>®</span>
        </div>
        <p>© 2025 — Todos los derechos reservados</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </main>
  );
}
