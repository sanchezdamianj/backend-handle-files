console.clear()
const Container = require('./container.js');

const products = new Container('products.txt');

const test = async () => {
	const data = await products.save({ image: "img10", title: "last name2", price: 4, description: "test2" });
	console.log(products.objects);
}

test();
