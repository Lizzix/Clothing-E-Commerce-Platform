import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// GET /api/sellers/:id/products (Get the seller's products)
// GET /api/sellers/:id/activities (Get the seller's activities)
// GET /api/sellers/:id/coupons (Get the seller's coupons)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
}
