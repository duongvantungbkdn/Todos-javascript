import html from '../core.js';
import Header from './header.js';
import TodosList from './TodosList.js';
import Footer from './Footer.js';
import {connect} from '../store.js';

function App({todos}) {
    return html`
        <section class="todoapp">
            ${Header()}
            ${todos.length > 0 && TodosList()}
            ${todos.length > 0 && Footer()}
        </section>
    `
}
export default connect()(App);
