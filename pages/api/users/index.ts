import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// POST /api/users (create a user)
export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { name, email, password, phone } = req.body;
		const result = await prisma.user.create({
			data: {
				name: name,
				email: email,
				password: password,
				phone: phone
			},
		});
		res.json({
			status: 0,
			message: "success",
			data: {
				id: result.user_id,
				name: result.name,
				email: result.email,
				phone: result.phone,
			}
		});
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}