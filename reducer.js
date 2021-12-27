import storage from "./util/storage.js";

const init =  {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.compeleted,
        compeleted: todo => todo.compeleted
    },
    editIndex: null
};

const actions = {
    ADD({todos}, args) {
        const [title] = args;
        todos.unshift({title, compeleted: false});
        storage.set(todos);
    },
    TOGGLE({todos}, index) {
        const todo = todos[index];
        todo.compeleted = !todo.compeleted;
        storage.set(todos);
    },
    REMOVE({todos}, index) {
        todos.splice(index,1);
        storage.set(todos);

    },
    TOGGLE_ALL({todos}, [args]) {
        todos.forEach(todo => todo.compeleted = args); 
        storage.set(todos);
    },
    switchFilter(state, [type]) {
        state.filter = type;
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active);
        storage.set(state.todos);
    },
    startEdit(state, [index]) {
        state.editIndex = index;
    },
    endEdit(state, [args]) {
        if (state.editIndex !== null) {
            state.todos[state.editIndex].title = args;
            
            storage.set(state.todos);
        }        
    },
    cancelEdit(state) {
        state.editIndex = null;
    }
};

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state,args); 
    return state;
};
