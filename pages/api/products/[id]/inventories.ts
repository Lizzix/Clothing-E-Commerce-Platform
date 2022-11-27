import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// PATCH /api/products/:id/inventories (Update the product's inventory)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "PATCH") {
		const { id, colorId, sizeId, inventory } = req.body;
		const variation = await prisma.variation.findMany({
			where: {
				colorId: Number(colorId),
				sizeId: Number(sizeId),
				productId: Number(id)
			}
		});
		if (variation.length === 0) {
			res.json({
				status: 1,
				message: 'product does not exist'
			});
		}
		const result = await prisma.variation.update({
			where: {
				id: variation[0].id
			},
			data: { inventory: Number(inventory) }
		});
		const product = await prisma.product.findUnique({
			where: { id: Number(id), },
		});
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
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}