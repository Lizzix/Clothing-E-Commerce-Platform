import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// PATCH /api/coupons/:id (Update the coupon)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "PATCH") {
		const id = req.query.id;
		const { amount, available } = req.body;

		const result = await prisma.discount.updateMany({
			where: { id: Number(id), format: "COUPON" },
			data: {
				amount: Number(amount),
				available: (available === "true"),
			}
		});
		if (result.count) {
			const coupon = await prisma.discount.findUnique({
				where: { id: Number(id) },
			});
			res.json({
				status: 0,
				message: "success",
				data: {
					id: coupon.id,
					name: coupon.name,
					scope: coupon.scope,
					type: coupon.type,
					value: coupon.value,
					available: coupon.available,
					startAt: coupon.startAt,
					endAt: coupon.endAt,
					productId: coupon.productId,
					sellerId: coupon.sellerId
				}
			});
		} else {
			res.json({
				status: 1,
				message: "coupon does not exist"
			});
		}

	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}
