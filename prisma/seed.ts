
import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
const userData: Prisma.UserCreateInput[] = [
	{
		email: "bgenty0@barnesandnoble.com",
		password: "CZz3FuX0P",
		name: "Bebe",
		phone: "6022245604"
	}];

async function main() {
	console.log(`Start seeding ...`);
	for (const u of userData) {
		const user = await prisma.user.create({
			data: u,
		});
		console.log(`Created user with id: ${user.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
