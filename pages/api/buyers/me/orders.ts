import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// POST /api/buyers/me/orders (Create order)
// GET  /api/buyers/me/orders (Get my orders)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
}
