import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { decode, JwtPayload } from "jsonwebtoken";
import authenticated from '../../../../../components/authenticate';

// GET  /api/buyers/me/coupons (Get my coupons)
export default authenticated(async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		var decoded = decode(req.cookies.token) as JwtPayload;
		const coupons = await prisma.user_Coupon.findMany({
			where: { userId: decoded.id },
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
});