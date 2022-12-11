import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { decode, JwtPayload } from "jsonwebtoken";
import authenticated from '../../../../../components/authenticate';

// POST /api/buyers/me/coupons/:id (Create coupon)
export default authenticated(async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO: update for me
	if (req.method === 'POST') {
		const coupon_id = req.body.couponId;
		const coupon = await prisma.discount.findMany({
			where: { id: Number(coupon_id), format: "COUPON" },
		});
		if (coupon.length === 0) {
			res.json({
				status: 1,
				message: "coupon not found",
			});
		} else {
			var decoded = decode(req.cookies.token) as JwtPayload;
			try {
				const user_coupon = await prisma.user_Coupon.create({
					data: {
						userId: decoded.id,
						discountId: Number(coupon_id),
						isUsed: false,
					}
				});
			} catch (e) {
				res.json({
					status: 1,
					message: "You already have this coupon.",
				});
				return;
			}
			try {
				const update = await prisma.discount.update({
					where: { id: Number(coupon_id) },
					data: {
						amount: {
							decrement: 1,
						}
					}
				});
				res.json({
					status: 0,
					message: "success",
					data: {
						id: update.id,
						name: update.name,
						scope: update.scope,
						type: update.type,
						value: update.value,
						amount: update.amount,
						startAt: update.startAt,
						endAt: update.endAt,
						productId: update.productId,
						sellerId: update.sellerId,
					}
				});
			} catch (e) {
				res.json({
					status: 1,
					message: "No more coupons.",
				});
			}
		}
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
});