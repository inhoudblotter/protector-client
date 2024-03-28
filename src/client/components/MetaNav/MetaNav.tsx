import styles from "./MetaNav.module.css";

const ITEMS = [
  { url: "/#tire-fitting", label: "Переобувка" },
  { url: "/#repair", label: "Ремонт" },
  { url: "/#storage", label: "Хранение" },
];

export function MetaNav() {
  return (
    <section class={styles.container}>
      <nav itemscope itemtype="http://schema.org/SiteNavigationElement">
        <meta itemprop="name" content="Меню" />
        <ul>
          {ITEMS.map((el, i) => (
            <li key={i}>
              <a itemprop="url" href={el.url}>
                <span itemprop="name">{el.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
