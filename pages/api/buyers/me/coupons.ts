import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// POST /api/buyers/me/coupons/:id (Create coupon)
// GET  /api/buyers/me/coupons (Get my coupons)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
}
