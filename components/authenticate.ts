import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { getCookie } from "cookies-next";

const authenticated = (func: NextApiHandler) => async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {

	verify(String(getCookie('token', { req, res })), process.env.SECRET, async function (err, decoded) {
		if (!err && decoded) {
			return await func(req, res);
		} else {
			return res.status(401).json({ message: "you are not authenticated" });
		}
	});
};

export default authenticated;