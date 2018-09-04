const { DISPLAY, renderHeading } = require('./index');

it('should render the heading', () => {
	DISPLAY.innerHTML = '';
	expect(DISPLAY.innerHTML).not.toContain('JEST WORKS');
	renderHeading({title:'JEST WORKS'});
	expect(DISPLAY.innerHTML).toContain('JEST WORKS');
})

