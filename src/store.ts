/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from "fabric-contract-api";
import Joi from "joi";

@Object()
export class Store {
	@Property()
	public value: string;

	[key: string]: any;
}

export const StoreSchema = Joi.object<Store>({
	value: Joi.string().required(),
}).options({
	allowUnknown: true,
	abortEarly: false,
});
