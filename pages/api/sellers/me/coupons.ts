import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// POST /api/sellers/me/coupons (Create coupon)
// GET  /api/sellers/me/coupons (Get my coupons)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
}
