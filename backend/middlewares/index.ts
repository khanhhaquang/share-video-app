import { Context } from 'https://deno.land/x/oak/mod.ts';
import { verify } from 'https://deno.land/x/djwt@v2.8/mod.ts';

import { JWT_CRYPTO_KEY } from '../config/index.ts';

const authenticate = async (ctx: Context, next: any) => {
	try {
		const headers: Headers = ctx.request.headers;
		const authorization = headers.get('Authorization');
		if (!authorization) {
			ctx.response.status = 401;
			ctx.response.body = { message: 'Unauthorized' };
			return;
		}
		const jwt = authorization.split(' ')[1].trim();

		if (!jwt) {
			ctx.response.status = 401;
			return;
		}

		const payload = await verify(jwt, JWT_CRYPTO_KEY);

		if (!payload) {
			throw new Error('Token has no payload');
		}

		if (!payload.username) {
			throw new Error('Token/payload has no username');
		}

		ctx.state.username = payload.username;
		await next();
		delete ctx.state.username;
	} catch (error) {
		console.log('🚀 authenticate ~ error:', error);
		ctx.response.status = 401;
		ctx.response.body = { message: 'Unauthorized' };
		return;
	}
};

export default { authenticate };
