import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { decode, JwtPayload } from "jsonwebtoken";
import authenticated from '../../../../components/authenticate';

// GET /api/sellers/me/orders (Get my orders)
export default authenticated(async function handle(req: NextApiRequest, res: NextApiResponse) {
	var decoded = decode(req.cookies.token) as JwtPayload;
	if (req.method === 'GET') {
		const orders = await prisma.order.findMany({
			where: { sellerId: decoded.id },
		});
		let order_list = [];
		for (const o of orders) {
			const order_item_infos = await prisma.order_Item.findMany({
				where: { orderId: o.id },
			});
			let items = [];
			for (const i of order_item_infos) {
				const product_info = await prisma.product.findUnique({
					where: { id: i.productId },
				});
				const variation_info = await prisma.variation.findUnique({
					where: { id: i.variationId },
				});
				items.push({
					productId: i.productId,
					name: product_info.name,
					description: product_info.description,
					picture: product_info.picture,
					color: variation_info.colorName,
					size: variation_info.sizeName,
					price: product_info.price,
					amount: i.quantity,
				})
			}
			order_list.push({
				id: o.id,
				items: items,
				totalPrice: o.totalPrice,
				status: o.status,
				sellerId: o.sellerId,
				buyerId: o.buyerId,
				createdAt: o.createdAt,
				updatedAt: o.updatedAt
			});
		}
		res.json({
			status: 0,
			message: "success",
			data: order_list
		});
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
});