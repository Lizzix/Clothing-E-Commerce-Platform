import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const STATUS = ['CHECKING', 'ESTABLISHED', 'DEALING', 'SENDED', 'FINISHED', 'CANCELED'];
// GET   /api/orders/:id (Get the order)
// PATCH /api/orders/:id (Update the order)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
	if (req.method === 'GET') {
		const id = req.body.id;
		handleGET(id, res);
	} else if (req.method == "PATCH") {
		const { id, status } = req.body;
		if (!STATUS.includes(status as string)) {
			res.json({
				status: 1,
				message: 'status is not valid'
			});
		} else {
			const order = await prisma.order.update({
				where: { id: Number(id) },
				data: { status: String(status) },
			});
			handleGET(id, res);
		}
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}

export async function handleGET(id: string | string[], res: NextApiResponse<any>) {
	const order = await prisma.order.findUnique({
		where: { id: Number(id) },
	});
	if (order === null) {
		res.json({
			status: 1,
			message: 'order does not exist'
		});
	} else {
		const items = await prisma.order_Item.findMany({
			where: { orderId: Number(id) },
		});
		res.json({
			status: 0,
			message: "success",
			data: {
				id: order.id,
				items: items,
				totalPrice: order.totalPrice,
				status: order.status,
				sellerId: order.sellerId,
				buyerId: order.buyerId,
				createdAt: order.createdAt,
				updatedAt: order.updatedAt
			}
		});
	}
}