import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// POST /api/sellers/me/coupons (Create coupon)
// GET  /api/sellers/me/coupons (Get my coupons)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
	{
		if (req.method === 'POST') {
			const { id, name, scope, type, value, amount, startAt, endAt, productId, sellerId } = req.query;
			if (productId === null) {
			const result = await prisma.discount.create({
				data: {
					// FIXIT:
					name: String(name),
					format: String("COUPON"),
					scope: String(scope),
					type: String(type),
					value: Number(value),
					amount: Number(amount),
					startAt: String(startAt),
					endAt: String(endAt),
					// sellerId: Number(sellerId) 
				},
			});
			res.json({
				status: 0,
				message: "success",
				data: {
					id: result.id,
					name: result.name,
					scope: result.scope,
					type: result.type,
					value: result.value,
					amount: result.amount,
					startAt: result.startAt,
					endAt: result.endAt,
					sellerId: result.sellerId
				}
			});
		}	
		} else {
			throw new Error(
				`The HTTP ${req.method} method is not supported at this route.`
			);
		}
}
}
