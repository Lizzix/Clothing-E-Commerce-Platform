import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

// GET  /api/buyers/me/coupons (Get my coupons)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO: update for me
	if (req.method === 'GET') {
		const my_user_id = 1;
		const coupons = await prisma.user_Coupon.findMany({
			where: { userId: my_user_id },
		});
		res.json({
			status: 0,
			message: "success",
			data: coupons
		});
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}
