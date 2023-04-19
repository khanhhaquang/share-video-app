import { Document } from 'https://deno.land/x/filedb/mod.ts';

interface UserSchema extends Document {
	username: string;
	password: string;
}

interface VideoSchema extends Document {
	shareBy: string;
	url: string;
	title?: string;
	author?: string;
	description?: string;
}

export type { UserSchema, VideoSchema };
