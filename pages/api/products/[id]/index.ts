import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// GET   /api/products/:id (get a product)
// PATCH /api/products/:id (Update the product)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
	if (req.method === "GET") {
		const id = req.body.id;
		handleGET(id, res);
	} else if (req.method === "PATCH") {
		const { id } = req.body;
		const available = req.body;
		const result = await prisma.product.update({
			where: { product_id: Number(id), },
			data: { available: available },
		});
		handleGET(id, res);
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}

export async function handleGET(id: string | string[], res: NextApiResponse<any>) {
	const result = await prisma.product.findUnique({
		where: { product_id: Number(id), },
	});
	const variations = await prisma.variation.findMany({
		where: { product_id: Number(id), },
	});
	var colors = [];
	var sizes = [];
	var inventories = [];
	variations.forEach(e => {
		colors.push({
			id: e.color_id,
			name: e.color_name
		});
		sizes.push({
			id: e.size_id,
			name: e.size_name
		});
		inventories.push({
			color: {
				id: e.color_id,
				name: e.color_name
			},
			size: {
				id: e.size_id,
				name: e.size_name
			},
			inventory: e.inventory
		});
	});
	res.json({
		status: 0,
		message: "success",
		data: {
			id: result.product_id,
			name: result.name,
			description: result.description,
			picture: result.picture,
			colors: colors,
			sizes: sizes,
			price: result.price,
			available: result.available,
			inventories: inventories,
			startAt: result.startAt,
			endAt: result.endAt,
			sellerId: result.seller_id
		}
	});
}