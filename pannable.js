export function pannable(node) {
	let x, y;
	
	const handleMousedown = e => {
		[x, y] = [e.clientX, e.clientY];
		
		node.dispatchEvent(new CustomEvent('panstart', {
			detail: {x, y}
		}))
		
		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseup', handleMouseup);
	}
	
	const handleMousemove = e => {
		const [dx, dy] = [e.clientX - x, e.clientY - y];
		[x, y] = [e.clientX, e.clientY];
		
		node.dispatchEvent(new CustomEvent('panmove', {
			detail: {x, y, dx, dy}
		}))
	}
	
	const handleMouseup = e => {
		[x, y] = [e.clientX, e.clientY];
		
		node.dispatchEvent(new CustomEvent('panend', {
			detail: {x, y}
		}))
		
		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseup', handleMouseup);
	}
	
	window.addEventListener('mousedown', handleMousedown);
	
	return {
		destroy() {
			node.removeEventListener('mousedown', handleMousedown);
		}
	};
}