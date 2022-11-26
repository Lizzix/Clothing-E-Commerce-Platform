import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// GET /api/sellers/me/products (Get my products)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const my_user_id = 1;
	// TODO: update for me
	if (req.method === 'GET') {
		const products = await prisma.product.findMany({
			where: { sellerId: my_user_id },
		});
		res.json({
			status: 0,
			message: "success",
			data: products
		});
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}
