import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { decode, JwtPayload } from "jsonwebtoken";
import authenticated from '../../../../components/authenticate';
import {handleGETProduct} from '../../products/[id]/index';

// GET /api/sellers/me/products (Get my products)
export default authenticated(async function handle(req: NextApiRequest, res: NextApiResponse) {
	var decoded = decode(req.cookies.token) as JwtPayload;
	if (req.method === 'GET') {
		const products = await prisma.product.findMany({
			where: { sellerId: decoded.id },
		});
		res.json({
			status: 0,
			message: "success",
			data: products
		});
	} else if (req.method === 'POST') {
		const { name, description, picture, colors, sizes, price, available, startAt, endAt} = req.body;
		let variations = [];
		const max = await prisma.product.findMany({
			orderBy: {
				id: 'desc'
			},
			take: 1
		});
		const productId = max[0]?.id + 1;
		for (let i = 0; i < colors.length; i++) {
			variations.push({
				inventory: 10,
				colorId: i,
				colorName: colors[i],
				sizeId: i,
				sizeName: sizes[i],
			})
		}
		const product = await prisma.product.create({
			data: {
				name: name,
				description: description,
				picture: picture,
				price: price,
				isOnSale: false,
				available: available,
				startAt: new Date(startAt),
				endAt: new Date(endAt),
				sellerId: decoded.id,
				Variation: {
					create: variations
				}
			}
		});
		handleGETProduct(productId, res);
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		);
	}
});