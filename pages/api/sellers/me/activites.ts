import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// POST /api/sellers/me/activites (Create activity)
// GET  /api/sellers/me/activites (Get my activities)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
}
