import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { decode, JwtPayload } from "jsonwebtoken";
import authenticated from "../../../components/authenticate";

// To suppress the warning "API resolved without sending a response for /api/users, this may result in stalled requests."
export const config = {
	api: {
		externalResolver: true,
	},
};

// GET   /api/users/me (Get self data)
// PATCH /api/users/me (Update self data)
export default authenticated(async function handle(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	var decoded = decode(req.cookies.token) as JwtPayload;
	if (req.method === "GET") {
		const user = await prisma.user.findUnique({
			where: { id: decoded.id }
		});
		res.json({
			status: 0,
			message: "success",
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
			}
		});
	} else if (req.method === "PATCH") {
		const { name, phone } = req.body;
		let user;
		if ((name === undefined || name === "") && (phone === undefined || phone === "")) {
			res.json({
				status: 1,
				message: "name and phone cannot both be null",
			});
			return;
		}
		else if (name === undefined || name === "") {
			user = await prisma.user.update({
				where: { id: decoded.id },
				data: {
					phone: String(phone)
				}
			});
		} else if (phone === undefined || phone === "") {
			user = await prisma.user.update({
				where: { id: decoded.id },
				data: {
					name: String(name),
				}
			});
		} else {
			user = await prisma.user.update({
				where: { id: decoded.id },
				data: {
					name: String(name),
					phone: String(phone)
				}
			});
		}
		res.json({
			status: 0,
			message: "success",
			data: {
				id: user.id,
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
});

