import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class MyElement extends LitElement {
  static links = [
    // { title: 'Home', href: './' },
    // { title: 'About', link: '/about.html' },
    { title: 'Services', href: './services' },
    { title: 'Portfolio', href: './portfolio' },
    { title: 'Contact', href: 'mailto:devbydylan@gmail.com' }
    // { title: 'Contact', href: './contact.html' },
  ]

  constructor() {
    super();

    for (const link of MyElement.links) {
        link.active = window.location.pathname.endsWith(link.href.substring(1));
        link.class = `nav-link ${ link.active ? ' active' : '' }`;
    }
  }

  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <nav class="navbar ftco-navbar-light">
          <div class="container-xl">
              <a class="navbar-brand align-items-center" href="/portfolio">
                  <span class="">Dev By Dylan</span>
              </a>
              <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span></span> 
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                      ${MyElement.links.map(link => html`<li class="nav-item">
                          <a class="${ link.class }" href="${ link.href }">
                              ${ link.title }
                          </a>
                      </li>`)}
                  </ul>
              </div>
          </div>
      </nav>
    `;
  }
}

customElements.define('nav-pane', MyElement);
