import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { setCookie } from 'cookies-next';

// To suppress the warning "API resolved without sending a response for /api/users, this may result in stalled requests."
export const config = {
	api: {
		externalResolver: true,
	},
};

// POST /api/users/signIn (user sign in)
export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { email, password } = req.body;
		const query = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (query === null) {
			res.status(401).json({
				status: 1,
				message: "user does not exist",
			});
		} else {
			compare(password, query.password, function (err, result) {
				if (!err && result) {
					const claims = { id: query.id, name: query.name };
					const jwt = sign(claims, process.env.SECRET, { expiresIn: '2h' });
					setCookie('token', jwt, { req, res, maxAge: 60 * 60 * 24, path: '/', httpOnly: true });
					res.json({
						status: 0,
						message: "success",
						data: {
							id: query.id,
							name: query.name,
							email: query.email,
							phone: query.phone,
							token: jwt,
						}
					});
				} else {
					res.status(401).json({
						status: 1,
						message: "login failed",
					});
				}
			});
		}
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}