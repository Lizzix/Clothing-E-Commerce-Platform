import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// PATCH /api/products/:id (Update the product)
// PATCH /api/products/:id/inventories (Update the product's inventory)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// TODO:
}
