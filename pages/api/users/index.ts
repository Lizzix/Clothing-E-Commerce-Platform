import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// POST /api/users (create a user)

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { name, email, password, phone } = req.body;
	const result = await prisma.user.create({
		data: {
			...req.body,
		},
	});
	res.json(result);
}