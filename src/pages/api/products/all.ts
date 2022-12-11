import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// GET   /api/products/all (get all products)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		const products = await prisma.product.findMany();
		const info_list = [];

		for (const o of products) {
			info_list.push({
				id: o.id,
				name: o.name,
				description: o.description,
				picture: o.picture,
				price: o.price,
				available: o.available,
			})
		};

		res.json({
			status: 0,
			message: "success",
			data: info_list,
		});
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}