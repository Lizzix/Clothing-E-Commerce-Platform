import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const TYPE = ['MINUS', 'MULTIPLY'];
// POST /api/sellers/me/coupons (Create coupon)
// GET  /api/sellers/me/coupons (Get my coupons)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const my_user_id = 1;
	// TODO: update for me
	if (req.method === 'GET') {
		const coupons = await prisma.discount.findMany({
			where: { sellerId: my_user_id, format: "COUPON" },
		});
		res.json({
			status: 0,
			message: "success",
			data: coupons
		});
	}
	else if (req.method === 'POST') {
		const { name, scope, type, value, amount, startAt, endAt, productId } = req.query;
		if (!TYPE.includes(type as string)) {
			res.json({
				status: 1,
				message: 'type is not valid'
			});
		} else {
			if (scope === "PRODUCT") {
				const result = await prisma.discount.create({
					data: {
						name: String(name),
						format: "COUPON",
						scope: "PRODUCT",
						type: String(type),
						value: Number(value),
						amount: Number(amount),
						available: true,
						startAt: new Date(String(startAt)),
						endAt: new Date(String(endAt)),
						Product: {
							connect: {
								id: Number(productId)
							}
						},
						User: {
							connect: {
								id: my_user_id
							}
						},
					},
				});
				res.json({
					status: 0,
					message: "success",
					data: {
						id: result.id,
						name: result.name,
						scope: result.scope,
						type: result.type,
						value: result.value,
						amount: result.amount,
						startAt: result.startAt,
						endAt: result.endAt,
						productId: result.productId,
						sellerId: result.sellerId
					}
				});
			}
			else if (scope == "STORE") {
				const result = await prisma.discount.create({
					data: {
						name: String(name),
						format: "COUPON",
						scope: "STORE",
						type: String(type),
						value: Number(value),
						amount: Number(amount),
						available: true,
						startAt: new Date(String(startAt)),
						endAt: new Date(String(endAt)),
						User: {
							connect: {
								id: my_user_id
							}
						},
					},
				});
				res.json({
					status: 0,
					message: "success",
					data: {
						id: result.id,
						name: result.name,
						scope: result.scope,
						type: result.type,
						value: result.value,
						amount: result.amount,
						startAt: result.startAt,
						endAt: result.endAt,
						productId: result.productId,
						sellerId: result.sellerId
					}
				});
			} else {
				res.json({
					status: 1,
					message: "Invalid scope"
				});
			}
		}
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}
