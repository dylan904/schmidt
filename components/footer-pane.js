import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class MyElement extends LitElement {
  createRenderRoot() {
    return this
  }

  render() {
    return html`
        <footer class="ftco-footer">
            <div class="container-xl">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <p class="mb-0 copyright">Copyright &copy;${ new Date().getFullYear() } All rights reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    `;
  }

}

customElements.define('footer-pane', MyElement);
