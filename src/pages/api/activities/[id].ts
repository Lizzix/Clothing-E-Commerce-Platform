import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma';

// PATCH /api/activities/:id (Update the activity)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const id = req.query.id;
	const available = req.body.available;
	if (req.method === 'PATCH') {
		const test = await prisma.discount.findUnique({
			where: {id: Number(id)},
		});
		if (test === null) {
			res.json({
				status: 1,
				message: 'activity does not exist',
			});
		}

		const activity = await prisma.discount.update({
			where: {id: Number(id)},
			data: {available: (available === 'true')},
		});
		res.json({
			status: 0,
			message: 'success',
			data: {
				id: activity.id,
				name: activity.name,
				scope: activity.scope,
				type: activity.type,
				value: activity.value,
				available: activity.available,
				startAt: activity.startAt,
				endAt: activity.endAt,
				productId: activity.productId,
				sellerId: activity.sellerId,
			},
		});
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`,
		);
	}
}
