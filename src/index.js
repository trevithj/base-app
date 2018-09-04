const redux = require('redux');

//Setup the root reducer and initialize the store
const reducers = {
	SET_TITLE: (state, title) => Object.assign({}, state, {title})
};

const store = redux.createStore((state = {title: 'The Title'}, action) => {
	const reducer = reducers[action.type];
	return reducer ? reducer(state, action.payload) : state;
});


//Define some helpers for rendering and creating elements
const DISPLAY = document.body;
const findByIdOrCreate = (id, type, initFn = () => {}) => {
	let element = document.getElementById(id);
	if (!element) {
		element = document.createElement(type);
		element.id = id;
		initFn(element);
		DISPLAY.appendChild(element);
	}
	return element;
}
const applyStyle = (el, style) => {
	Object.keys(style).forEach(key => {
		el.style[key] = style[key];
	});
}

//Define some sub-renderers
const renderHeading = (state) => {
	const element = findByIdOrCreate('test-head', 'h1');
	element.innerHTML = state.title;
}

const renderComponent = (state) => {
	const element = findByIdOrCreate('test-div', 'div', el => {
		applyStyle(el, {margin: '10px 0 20px', color: 'green'});
		el.innerHTML = ['Hello', 'webpack', 'on the server'].join(' ');
	});
}

const renderButton = (state) => {
	const element = findByIdOrCreate('test-btn', 'button', el => {
		el.innerHTML = 'Test';
		applyStyle(el, {width: '5em', color: 'blue'});
		el.addEventListener('click', (e) => {
			const time = new Date().getTime();
			store.dispatch({type:'SET_TITLE', payload: `The Title at ${time}ms`});
			console.log(store.getState());
		});
	});
}

//Define the main render function (crude as...)
const render = (state) => {
	renderHeading(state);
	renderComponent(state);
	renderButton(state);
}

//now run the renderer each time the state refreshes
store.subscribe(() => {
	render(store.getState());
});
//And force initial rendering
store.dispatch({type:'INIT'});

//export something for testing...
module.exports = {
	renderHeading,
	DISPLAY
};
