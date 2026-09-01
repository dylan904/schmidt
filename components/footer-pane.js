import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class FooterPane extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <footer class="foot">
        <div class="wrap foot-grid">
          <div>
            <h2>Looking for someone who finishes the hard part?</h2>
            <p>I am open to conversations about engineering roles. The fastest way to reach me is email &mdash; I answer all of them.</p>
            <a class="foot-mail" href="mailto:devbydylan@gmail.com">devbydylan@gmail.com</a>
          </div>
        </div>
        <div class="wrap"><p class="foot-meta">Dylan Maxey &middot; ${new Date().getFullYear()}</p></div>
      </footer>`;
  }
}

customElements.define('footer-pane', FooterPane);
