/*
 * SPDX-License-Identifier: Apache-2.0
 */

import Joi from "joi";

export interface Store {
	value: string;
	[key: string]: any;
}

export const StoreSchema = Joi.object<Store>({
	value: Joi.string().required(),
}).options({
	allowUnknown: true,
	abortEarly: false,
});
