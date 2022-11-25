import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// GET /api/sellers/:id/coupons (Get the seller's coupons)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const id = req.query.id;
	if (req.method === 'GET') {
		const discount = await prisma.discount.findMany({
			where: { sellerId: Number(id), format: "COUPON" },
		});
		res.json({
			status: 0,
			message: "success",
			data: discount
		});
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}
