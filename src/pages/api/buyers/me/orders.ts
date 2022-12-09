import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { decode, JwtPayload } from "jsonwebtoken";
import authenticated from '../../../../components/authenticate';

// POST /api/buyers/me/orders (Create order)
// GET  /api/buyers/me/orders (Get my orders)
export default authenticated(async function handle(req: NextApiRequest, res: NextApiResponse) {
	var decoded = decode(req.cookies.token) as JwtPayload;
	// TODO: update for me
	if (req.method === 'GET') {
		const orders = await prisma.order.findMany({
			where: { buyerId: decoded.id },
		});
		let order_list;
		for (const o of orders) {
			const items = await prisma.order_Item.findMany({
				where: { orderId: o.id },
			});
			order_list.push({
				id: o.id,
				items: items,
				totalPrice: o.totalPrice,
				status: o.status,
				sellerId: o.sellerId,
				buyerId: o.buyerId,
				createdAt: o.createdAt,
				updatedAt: o.updatedAt
			});
		}
		res.json({
			status: 0,
			message: "success",
			data: order_list
		});
	} else if (req.method === 'POST') {
		// TODO:
		const { activityId, couponId, items } = req.body;
		res.json({
			activityId: activityId,
			couponId: couponId,
			items: items
		});

	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
});