import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { decode, JwtPayload } from "jsonwebtoken";
import authenticated from '../../../../components/authenticate';
import { Discount, User_Coupon } from '@prisma/client';

// POST /api/buyers/me/orders (Create order)
// GET  /api/buyers/me/orders (Get my orders)
export default authenticated(async function handle(req: NextApiRequest, res: NextApiResponse) {
	var decoded = decode(req.cookies.token) as JwtPayload;
	// TODO: update for me
	if (req.method === 'GET') {
		const orders = await prisma.order.findMany({
			where: { buyerId: decoded.id },
		});
		let order_list;
		for (const o of orders) {
			const items = await prisma.order_Item.findMany({
				where: { orderId: o.id },
			});
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
	} else if (req.method === 'POST') {
		// TODO:
		const { activityId, couponId, items } = req.body;

		let discount_id = Number(activityId) !== 0 ? Number(activityId) : Number(couponId);
		discount_id = (discount_id === 0) ? 0 : discount_id;

		let seller_id = 0;
		let discount_info : Discount;
		if (discount_id !== 0) {
			discount_info = await prisma.discount.findUnique({
				where: { id: discount_id, },
			});
			seller_id = Number(discount_info.sellerId);
		} else {
			const product = await prisma.product.findUnique({
				where: { id: items[0].productId },
			});
			seller_id = Number(product.sellerId);
		}
		let order_item_list = [];
		let totalPrice = 0;
		for (const o of items) {
			order_item_list.push({
				productId: o.productId,
				variationId: o.variationId,
				quantity: o.amount,
			});
			let product = await prisma.product.findUnique({
				where: { id: o.productId },
			});
			totalPrice += o.amount * product.price;
		}

		if (discount_id != 0) {
			if (discount_info.type === 'MINUS') {
				totalPrice -= discount_info.amount;
			}
			else if (discount_info.type === 'MULTIPLY') {
				totalPrice *= discount_info.amount / 100;
			}
		}

		const result = await prisma.order.create({
			data: {
				totalPrice: totalPrice,
				createdAt: new Date(),
				updatedAt: new Date(),
				status: 'CHECKING',
				Discount:{
					connect: {
						id: discount_id
					}
				},
				User_Order_sellerIdToUser: {
					connect: {
						id: seller_id
					}
				},
				User_Order_buyerIdToUser: {
					connect: {
						id: Number(decoded.id)
					}
				},
				Order_Item: {
					create: order_item_list
				}
			}
		});
		if (couponId !== 0) {
			const updatecoupon = await prisma.user_Coupon.updateMany({
				where: {
					AND: [
						{ userId: Number(decoded.id) },
						{ discountId: Number(couponId) }
					],
				},
				data: { isUsed: true, },
			});
		}

		res.json({
			status: 0,
			message: "success",
			data: result
		});

	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
});