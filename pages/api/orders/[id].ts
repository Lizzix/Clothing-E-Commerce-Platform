import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// GET   /api/orders/:id (Get the order)
// PATCH /api/orders/:id (Update the order)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
		const id = req.query.id;
		if (req.method === "GET") {
			// TODO: get self data
			const order = await prisma.order.findUnique({
				where: { id: Number(req.query.id) }
			});
			res.json({
				status: 0,
				message: "success",
				data: {
					
						"status": 0,
						"message": "string",
						"data": order
				}
			});
		} else if (req.method === "PATCH") {
			const { name, phone } = req.query;
			const user = await prisma.user.update({
				where: { id: Number(req.body.id) },
				data: {
					name: String(name),
					phone: String(phone)
				}
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
		} else {
			throw new Error(
				`The HTTP ${req.method} method is not supported at this route.`
			);
		}
	
}
