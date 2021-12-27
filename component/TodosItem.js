import html from '../core.js';

function TodosItem(todo,index, editIndex) {
    return html`
        <li class="
            ${todo.compeleted && 'completed'}
            ${editIndex === index && 'editing'}
            "
        >
            <div class="view">
                <input 
                    class="toggle" 
                    type="checkbox" 
                    ${todo.compeleted && 'checked'}
                    onchange="dispatch('TOGGLE',${index})"
                >
                <label ondblclick="dispatch('startEdit',${index})">${todo.title}</label>
                <button 
                    class="destroy"
                    onclick="dispatch('REMOVE',${index})"
                >
                </button>
            </div>
            <input class="edit" value="${todo.title}"
            onkeyup="event.keyCode === 13 && !!this.value.trim() && dispatch('endEdit',this.value.trim())
            || event.keyCode === 27 && dispatch('cancelEdit')"
            onblur="!!this.value.trim() && dispatch('endEdit',this.value.trim())"
            >
        </li>
    `
}
export default TodosItem;