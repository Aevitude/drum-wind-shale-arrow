import { useEffect } from "react";
import { studioFromSearch } from "./resolve";

export function StudioPage({ search }: { search?: string }) {
  const site = studioFromSearch(search);
  const { skin, studio, name } = site;
  const p = skin.palette;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--skin-bg", p.bg);
    root.style.setProperty("--skin-surface", p.surface);
    root.style.setProperty("--skin-fg", p.text);
    root.style.setProperty("--skin-muted", p.muted);
    root.style.setProperty("--skin-accent", p.accent);
    root.style.setProperty("--skin-glow", p.glow);
    root.dataset.tone = skin.tone;
    document.title = `${name} · ${studio.trade}`;
  }, [name, p, skin.tone, studio.trade]);

  return (
    <div className="atelier" data-tone={skin.tone}>
      <div className="atelier-photo" style={{ backgroundImage: `url(${skin.bgImage})` }} />
      <div className="atelier-shade" />

      <header className="atelier-nav">
        <span className="atelier-mark">{name}</span>
        <span className="atelier-trade">{studio.tradeEn}</span>
      </header>

      <main className="atelier-hero">
        <p className="atelier-kicker">{studio.trade}</p>
        <h1 className="atelier-name">{name}</h1>
        <p className="atelier-line">{studio.line}</p>
        <a className="atelier-cta" href="#visit">
          {studio.cta}
        </a>
      </main>

      <section className="atelier-panel atelier-about">
        <p className="atelier-label">关于</p>
        <p className="atelier-copy">{studio.about}</p>
      </section>

      <section className="atelier-panel">
        <p className="atelier-label">提供</p>
        <ul className="atelier-list">
          {studio.offers.map((item) => (
            <li key={item.no} className="atelier-item">
              <span className="atelier-no">{item.no}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="atelier-panel" id="visit">
        <p className="atelier-label">到访</p>
        <p className="atelier-hours">{studio.hours}</p>
        <p className="atelier-place">{studio.place}</p>
        <button type="button" className="atelier-cta atelier-cta-ghost">
          {studio.cta}
        </button>
      </section>

      <footer className="atelier-foot">
        <span>
          {name} · {studio.trade}
        </span>
        <span>一页交付</span>
      </footer>
    </div>
  );
}
