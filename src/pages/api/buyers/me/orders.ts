import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { decode, JwtPayload } from "jsonwebtoken";
import authenticated from '../../../../components/authenticate';
import { Discount, User_Coupon } from '@prisma/client';

// POST /api/buyers/me/orders (Create order)
// GET  /api/buyers/me/orders (Get my orders)
export default authenticated(async function handle(req: NextApiRequest, res: NextApiResponse) {
	var decoded = decode(req.cookies.token) as JwtPayload;
	if (req.method === 'GET') {
		const orders = await prisma.order.findMany({
			where: { buyerId: decoded.id },
		});
		let order_list = [];
		for (const o of orders) {
			const order_item_infos = await prisma.order_Item.findMany({
				where: { orderId: o.id },
			});
			let items_list = [];
			for (const i of order_item_infos) {
				const product_info = await prisma.product.findUnique({
					where: { id: i.productId },
				});
				const variation_info = await prisma.variation.findUnique({
					where: { id: i.variationId },
				});
				items_list.push({
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
				items: items_list,
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

		let create_order_item_list = [];
		let order_item_list = [];
		let totalPrice = 0;
		for (const o of items) {
			const v = await prisma.variation.findMany({
				where: { productId: o.productId,
				colorName: o.color,
				sizeName: o.size },
			});
			create_order_item_list.push({
				productId: o.productId,
				variationId: v[0].id,
				quantity: o.amount,
			});
			let product = await prisma.product.findUnique({
				where: { id: o.productId },
			});
			totalPrice += o.amount * product.price;
			order_item_list.push({
				productId: o.productId,
				name: product.name,
				description: product.description,
				picture: product.picture,
				color: o.color,
				size: o.size,
				price: product.price,
				amount: o.amount,
			});
		}

		if (discount_id != 0) {
			if (discount_info.type === 'MINUS') {
				totalPrice -= discount_info.amount;
			}
			else if (discount_info.type === 'MULTIPLY') {
				totalPrice *= discount_info.amount / 100;
			}
		}

		let result;
		if (discount_id !== 0) {
			result = await prisma.order.create({
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
						create: create_order_item_list
					}
				}
			});
		} else {
			result = await prisma.order.create({
				data: {
					totalPrice: totalPrice,
					createdAt: new Date(),
					updatedAt: new Date(),
					status: 'CHECKING',
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
						create: create_order_item_list
					}
				}
			});
		}

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
			data: {
				id: result.id,
				items: order_item_list,
				totalPrice: result.totalPrice,
				status: result.status,
				sellerId: result.sellerId,
				buyerId: result.buyerId,
				createdAt: result.createdAt,
				updatedAt: result.updatedAt
			}
		});

	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
});