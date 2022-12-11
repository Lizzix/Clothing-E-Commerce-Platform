import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// GET   /api/products/:id (get a product)
// PATCH /api/products/:id (Update the product)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		const id = req.query.id;
		handleGETProduct(id, res);
	} else if (req.method === "PATCH") {
		const id = req.query.id;
		const available = req.body.available;
		const product = await prisma.product.findUnique({
			where: { id: Number(id), },
		});
		if (product === null) {
			res.json({
				status: 1,
				message: 'product does not exist'
			});
		}
		const result = await prisma.product.update({
			where: { id: Number(id), },
			data: { available: (available === 'true') },
		});
		handleGETProduct(id, res);
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}

export async function handleGETProduct(id: string | string[] | Number, res: NextApiResponse<any>) {
	const product = await prisma.product.findUnique({
		where: { id: Number(id), },
	});
	if (product === null) {
		res.json({
			status: 1,
			message: 'product does not exist'
		});
	}
	const variations = await prisma.variation.findMany({
		where: { productId: Number(id), },
	});
	var colors = [];
	var sizes = [];
	var inventories = [];
	variations.forEach(e => {
		colors.push({
			id: e.colorId,
			name: e.colorName
		});
		sizes.push({
			id: e.sizeId,
			name: e.sizeName
		});
		inventories.push({
			color: {
				id: e.colorId,
				name: e.colorName
			},
			size: {
				id: e.sizeId,
				name: e.sizeName
			},
			inventory: e.inventory
		});
	});
	res.json({
		status: 0,
		message: "success",
		data: {
			id: product.id,
			name: product.name,
			description: product.description,
			picture: product.picture,
			colors: colors,
			sizes: sizes,
			price: product.price,
			available: product.available,
			inventories: inventories,
			startAt: product.startAt,
			endAt: product.endAt,
			sellerId: product.sellerId
		}
	});
}