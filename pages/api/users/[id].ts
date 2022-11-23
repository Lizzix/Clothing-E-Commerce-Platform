import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const user_id = req.query.id;


	if (req.method === 'GET') {
		handleGET(user_id, res);
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}

// GET /api/user/:id
async function handleGET(user_id: string | string[] | undefined, res: NextApiResponse<any>) {
	const user = await prisma.user.findUnique({
		where: { user_id: Number(user_id) },
	});
	console.log("user=", user);
	res.json(user);
}
