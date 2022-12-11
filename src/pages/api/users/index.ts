import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { hash } from 'bcrypt';

// To suppress the warning "API resolved without sending a response for /api/users, this may result in stalled requests."
export const config = {
	api: {
		externalResolver: true,
	},
};

// POST /api/users (create a user)
export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { name, email, password, phone } = req.body;
		hash(password, 10, async function (err, hash) {
			try {
				const result = await prisma.user.create({
					data: {
						name: name,
						email: email,
						password: hash,
						phone: phone
					},
				});
				return res.status(200).json({
					status: 0,
					message: "success",
					data: {
						id: result.id,
						name: result.name,
						email: result.email,
						phone: result.phone,
					}
				});
			} catch (err) {
				return res.status(200).json({
					status: 1,
					message: "user already exists",
				});
			}
		});
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}