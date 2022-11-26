import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// GET /api/sellers/:id/products (Get the seller's products)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const id = req.query.id;
	if (req.method === 'GET') {
<<<<<<< Updated upstream
		const products = await prisma.product.findMany({
			where: { sellerId: Number(id) },
=======
		const product = await prisma.product.findMany({
			where: { seller_id: Number(id) },
>>>>>>> Stashed changes
		});
		res.json({
			status: 0,
			message: "success",
<<<<<<< Updated upstream
			data: products
=======
			data: product
>>>>>>> Stashed changes
		});
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}
