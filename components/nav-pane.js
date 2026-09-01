import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class NavPane extends LitElement {
  static links = [
    { title: 'Work', href: '/' },
    { title: 'What I do', href: '/services' },
  ];

  createRenderRoot() { return this; }

  render() {
    const here = window.location.pathname.replace(/\/index\.html$/, '/');
    return html`
      <nav class="nav" aria-label="Primary">
        <div class="wrap nav-in">
          <a class="brand" href="/">Dev By Dylan</a>
          <ul>
            ${NavPane.links.map((link) => html`<li>
              <a class="link" href="${link.href}"
                 aria-current="${here === link.href ? 'page' : 'false'}">${link.title}</a>
            </li>`)}
            <li><a class="cta" href="mailto:devbydylan@gmail.com">Get in touch</a></li>
          </ul>
        </div>
      </nav>`;
  }
}

customElements.define('nav-pane', NavPane);
