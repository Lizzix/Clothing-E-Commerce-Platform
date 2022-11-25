import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// POST /api/users/signIn (user sign in)
export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { email, password } = req.body;
	// TODO: Authentication, JWT
	const result = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	res.json({
		status: 0,
		message: "success",
		data: {
			id: result.id,
			token: "token", // TODO: JWT
		}
	});
}