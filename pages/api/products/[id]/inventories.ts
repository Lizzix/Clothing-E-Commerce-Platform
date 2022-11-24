import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'v8';
import prisma from '../../../../lib/prisma';

// PATCH /api/products/:id/inventories (Update the product's inventory)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
	const product_id = req.body.id;
	if (req.method === "PATCH") {
		const { color_id, size_id, inventory } = req.body;
		const variation = await prisma.variation.findMany({
			where: {
				color_id: color_id,
				size_id: size_id,
				product_id: product_id
			}
		});
		const result = await prisma.variation.update({
			where: {
				variation_id: variation[0].variation_id
			},
			data: { inventory: Number(inventory) }
		});
		const product = await prisma.product.findUnique({
			where: { product_id: Number(product_id), },
		});
		const variations = await prisma.variation.findMany({
			where: { product_id: Number(product_id), },
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
				id: product.product_id,
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
				sellerId: product.seller_id
			}
		});

	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}