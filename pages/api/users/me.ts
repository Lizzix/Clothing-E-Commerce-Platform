import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET   /api/users/me (Get self data)
// PATCH /api/users/me (Update self data)
export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		// TODO: get self data
		const user = await prisma.user.findUnique({
			where: { user_id: Number(req.query.id) }
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
		const { name, phone } = req.query;
		const user = await prisma.user.update({
			where: { user_id: Number(req.body.id) },
			data: {
				name: String(name),
				phone: String(phone)
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
