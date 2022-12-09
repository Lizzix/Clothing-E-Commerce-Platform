import process from 'node:process';
import {type NextApiHandler, type NextApiRequest, type NextApiResponse} from 'next';
import {verify} from 'jsonwebtoken';
import {getCookie} from 'cookies-next';

const authenticated = (func: NextApiHandler) => async (
	request: NextApiRequest,
	response: NextApiResponse,
) => {
	verify(String(getCookie('token', {req: request, res: response})), process.env.SECRET, async (error, decoded) => {
		if (!error && decoded) {
			return func(request, response);
		}

		response.status(401).json({message: 'you are not authenticated'});
	});
};

export default authenticated;
