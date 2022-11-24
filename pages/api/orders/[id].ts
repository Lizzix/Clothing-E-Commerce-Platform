import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// GET   /api/orders/:id (Get the order)
// PATCH /api/orders/:id (Update the order)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
}
