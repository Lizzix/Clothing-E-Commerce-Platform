import type { NextApiRequest, NextApiResponse } from 'next';
import { type } from 'os';
import { startTransition } from 'react';
import { getEnvironmentData } from 'worker_threads';
import prisma from '../../../../../lib/prisma';

// POST /api/buyers/me/coupons/:id (Create coupon)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
<<<<<<< Updated upstream
	if (req.method === 'POST') {
		const { name, scope, type, value, amount, startAt, endAt, productId, id } = req.query;
		const result = await prisma.discount.create({
			data: {
				name: String(name),
				format: "COUPON",
				scope: String(scope),
				type: String(type),
				value: Number(value),
				amount: Number(amount),
				available: true,
				startAt: String(startAt),
				endAt: String(endAt),
				productId: Number(productId),
				sellerId: Number(id)
			},
		});
		res.json({
			status: 0,
			message: "success",
			data: {

			}
		});

	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
=======
	{
		if (req.method === 'POST') {
			const { id, name, scope, type, value, amout, startAt, endAt, productId, sellerId } = req.query;
			const result = await prisma.discount.create({
				data: {
					id: Number(id),
					name: String(name),
					scope: String(scope),
					type: String(type),
					value: Number(value),
					amount: Number(amount),
					startAt: String(startAt),
					endAt: String(endAt),
					productId: Number(productId),
					sellerId: String(sellerId)
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
			throw new Error(
				`The HTTP ${req.method} method is not supported at this route.`
			);
		}
}
>>>>>>> Stashed changes
}
