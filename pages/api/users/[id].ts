import { decode, JwtPayload } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// GET /api/users/:id (get the user)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		var decoded = decode(req.cookies.token) as JwtPayload;
		const user_id = req.body.id;
		if (user_id != decoded.id) {
			res.status(401).json({
				status: 1,
				message: "You can only view your own profile."
			});
		}
		const user = await prisma.user.findUnique({
			where: { id: Number(user_id) },
		});
		if (user === null) {
			res.json({
				status: 1,
				message: 'user does not exist'
			});
		} else {
			res.json({
				status: 0,
				message: "success",
				data: {
					id: user.id,
					name: user.name,
					email: user.email,
					phone: user.phone,
				},
			});
		}
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}