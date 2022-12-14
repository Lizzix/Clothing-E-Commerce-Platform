import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// GET /api/sellers/:id/products (Get the seller's products)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const id = req.query.id;
		if (id !== "me") {
			const products = await prisma.product.findMany({
				where: { sellerId: Number(id) },
			});
			res.json({
				status: 0,
				message: "success",
				data: products
			});
		}
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}
