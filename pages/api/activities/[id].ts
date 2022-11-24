import { request } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// PATCH /api/activities/:id (Update the activity)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const activity_id = req.body.id;
	const { available } = req.body;
	if (req.method === 'PATCH') {
		const activity = await prisma.activity.update({
			where: { activity_id: Number(activity_id) },
			data: { available: available },
		});
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
}