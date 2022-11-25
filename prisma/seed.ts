
import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
// const userData: Prisma.UserCreateInput[] = [
// 	{
// 		email: "bgenty0@barnesandnoble.com",
// 		password: "CZz3FuX0P",
// 		name: "Bebe",
// 		phone: "6022245604"
// 	}, {
// 		email: "echasney1@nih.gov",
// 		password: "C29ly2",
// 		name: "Ekaterina",
// 		phone: "1141480740"
// 	}, {
// 		email: "ospiteri2@google.com",
// 		password: "HK81z0qqV2",
// 		name: "Othilia",
// 		phone: "6433085464"
// 	}, {
// 		email: "elaffin3@tripod.com",
// 		password: "oJNIUxO",
// 		name: "Ezekiel",
// 		phone: "8798351150"
// 	}, {
// 		email: "cmoy4@indiegogo.com",
// 		password: "1LKT7X01Q59x",
// 		name: "Carry",
// 		phone: "7582160058"
// 	}, {
// 		email: "cleaves5@ihg.com",
// 		password: "PN8bAiBwAmK",
// 		name: "Christiano",
// 		phone: "8848927984"
// 	}, {
// 		email: "hbremmell6@cnn.com",
// 		password: "vrGN4BJg8C",
// 		name: "Hanson",
// 		phone: "3399728711"
// 	}, {
// 		email: "myanshonok7@squarespace.com",
// 		password: "KSsmlj",
// 		name: "Martin",
// 		phone: "1572418689"
// 	}, {
// 		email: "cbeltzner8@nydailynews.com",
// 		password: "7Md4HKCo4oF",
// 		name: "Carol-jean",
// 		phone: "1254391394"
// 	}, {
// 		email: "asacase9@odnoklassniki.ru",
// 		password: "Ko5ZLdMhL",
// 		name: "Alphonse",
// 		phone: "4691627289"
// 	}];

async function main() {
	console.log(`Start seeding ...`);
	for (const u of userData) {
		const user = await prisma.user.create({
			data: u,
		});
		console.log(`Created user with id: ${user.user_id}`);
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
