/*
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Joi from "joi";

export interface Store {
	value: any;
	[key: string]: any;
}

export const StoreSchema = Joi.object<Store>({
	value: Joi.object().unknown(true).required(),
}).options({
	allowUnknown: true,
	abortEarly: false,
});
