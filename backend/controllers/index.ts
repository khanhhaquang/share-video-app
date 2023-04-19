import { Context } from 'https://deno.land/x/oak/mod.ts';
import { create, getNumericDate } from 'https://deno.land/x/djwt@v2.8/mod.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';

import { UserSchema, VideoSchema } from '../schemas/index.ts';
import db from '../db/index.ts';
import { JWT_CRYPTO_KEY } from '../config/index.ts';

const Users = await db.getCollection<UserSchema>('users');
const Videos = await db.getCollection<VideoSchema>('videos');

const userLogin = async (ctx: Context) => {
	const { username, password } = await ctx.request.body().value;

	if (!username || !password) {
		ctx.response.status = 400;
		ctx.response.body = { message: 'Invalid request data' };
		return;
	}

	const exitingUser = await Users.findOne((u) => u.username === username);
	if (!exitingUser) {
		ctx.response.status = 400;
		ctx.response.body = { message: "This user hasn't been registered" };
		return;
	}

	const confirmPassword = await bcrypt.compare(password, exitingUser.password);
	if (!confirmPassword) {
		ctx.response.body = 400;
		ctx.response.body = { message: 'Incorrect password' };
		return;
	}

	const payload = {
		id: exitingUser.id,
		username: exitingUser.username,
		exp: getNumericDate(60 * 60),
	};
	const jwt = await create({ alg: 'HS512', typ: 'JWT' }, payload, JWT_CRYPTO_KEY);

	if (jwt) {
		ctx.response.status = 200;
		ctx.response.body = {
			accessToken: jwt,
			userId: exitingUser.id,
			username: exitingUser.username,
		};
	} else {
		ctx.response.status = 500;
		ctx.response.body = {
			message: 'Internal server error',
		};
	}
};

const userRegister = async (ctx: Context) => {
	const { username, password } = await ctx.request.body().value;

	if (!username || !password) {
		ctx.response.status = 400;
		ctx.response.body = { message: 'Invalid request data' };
		return;
	}

	const exitingUser = await Users.findOne((u) => u.username === username);
	if (exitingUser) {
		ctx.response.status = 400;
		ctx.response.body = { message: 'User already exists' };
		return;
	}

	const salt = await bcrypt.genSalt(8);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await Users.insertOne({
		username,
		password: hashedPassword,
	});

	ctx.response.status = 201;
	ctx.response.body = { message: 'User created', userId: newUser.id, username: newUser.username };
};

const videosShare = async (ctx: Context) => {
	const { url } = await ctx.request.body().value;
	const { username } = ctx.state;

	const newVideo = await Videos.insertOne({
		shareBy: username,
		url,
	});

	ctx.response.status = 201;
	ctx.response.body = { message: 'Video created', ...newVideo };
};

const videosGetList = async (ctx: Context) => {
	const videos = await Videos.findMany((v) => !!v.url);

	ctx.response.status = 200;
	ctx.response.body = {
		data: videos
			.sort((a, b) => {
				if (a.createdAt && b.createdAt) {
					return a.createdAt > b.createdAt ? -1 : 1;
				}
				return 0;
			})
			.value(),
	};
};

export default { userLogin, userRegister, videosShare, videosGetList };
