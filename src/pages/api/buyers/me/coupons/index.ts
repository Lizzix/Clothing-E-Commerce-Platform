import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { decode, JwtPayload } from "jsonwebtoken";
import authenticated from '../../../../../components/authenticate';
import { User_Coupon, Coupon } from '../../../../../lib/interfaces';

// GET  /api/buyers/me/coupons (Get my coupons)
export default authenticated(async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		var decoded = decode(req.cookies.token) as JwtPayload;
		const response = await prisma.user_Coupon.findMany({
			where: { userId: decoded.id },
		});

		const couponsIndex : User_Coupon[] = <User_Coupon[]>response;
		let coupons: Coupon[] = [];

		for (const c of couponsIndex) {
			if (!c.isUsed) {
				const response = await prisma.discount.findUnique({
					where: { id: c.discountId },
				});
				coupons.push(<Coupon>response);
			}
		}

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
});