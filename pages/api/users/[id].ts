import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const user_id = req.query.id;
	if (req.method === 'GET') {
		const user = await prisma.user.findUnique({
			where: { user_id: Number(user_id) },
		});
		res.json({
			status: 0,
			message: "success",
			data: {
				id: user.user_id,
				name: user.name,
				email: user.email,
				phone: user.phone,
			}
		});
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}