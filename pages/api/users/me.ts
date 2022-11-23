import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET   /api/users/me (Get self data)
// PATCH /api/users/me (Update self data)
export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const user = await prisma.user.findUnique({
			where: { user_id: Number(req.query.id) }
		});
		res.json(user);
	} else if (req.method === "PATCH") {
		const user = await prisma.user.update({
			where: { user_id: Number(req.query.id) },
			data: req.body,
		});
		res.json(user);
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}
