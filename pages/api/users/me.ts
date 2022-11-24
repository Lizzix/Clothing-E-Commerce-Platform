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
			where: { user_id: Number(req.body.id) }
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
	} else if (req.method === "PATCH") {
		const { name, phone } = req.body;
		const user = await prisma.user.update({
			where: { user_id: Number(req.body.id) },
			data: {
				name: name,
				phone: phone
			}
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
