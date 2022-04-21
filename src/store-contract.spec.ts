/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context } from "fabric-contract-api";
import { ChaincodeStub, ClientIdentity } from "fabric-shim";
import { StoreContract } from ".";

import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import * as winston from "winston";

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext implements Context {
	public stub: sinon.SinonStubbedInstance<ChaincodeStub> =
		sinon.createStubInstance(ChaincodeStub);
	public clientIdentity: sinon.SinonStubbedInstance<ClientIdentity> =
		sinon.createStubInstance(ClientIdentity);
	public logging = {
		getLogger: sinon
			.stub()
			.returns(sinon.createStubInstance(winston.createLogger().constructor)),
		setLevel: sinon.stub(),
	};
}

describe("StoreContract", () => {
	let contract: StoreContract;
	let ctx: TestContext;

	beforeEach(() => {
		contract = new StoreContract();
		ctx = new TestContext();
		const test1001 = JSON.stringify({ value: "store 1001 value" });
		ctx.stub.getState.withArgs("1001").resolves(Buffer.from(test1001));
		const test1002 = JSON.stringify({ value: "store 1002 value" });
		ctx.stub.getState.withArgs("1002").resolves(Buffer.from(test1002));
	});

	describe("#storeExists", () => {
		it("should return true for a store", async () => {
			await contract.storeExists(ctx, "1001").should.eventually.be.true;
		});

		it("should return false for a store that does not exist", async () => {
			await contract.storeExists(ctx, "1003").should.eventually.be.false;
		});
	});

	describe("#createStore", () => {
		it("should create a store", async () => {
			await contract.createStore(ctx, "1003", "store 1003 value");
			const test1003 = JSON.stringify({ value: "store 1003 value" });
			ctx.stub.putState.should.have.been.calledOnceWithExactly(
				"1003",
				Buffer.from(test1003)
			);
		});

		it("should throw an error for a store that already exists", async () => {
			await contract
				.createStore(ctx, "1001", "myvalue")
				.should.be.rejectedWith(/The store 1001 already exists/);
		});
	});

	describe("#readStore", () => {
		it("should return a store", async () => {
			await contract
				.readStore(ctx, "1001")
				.should.eventually.deep.equal({ value: "store 1001 value" });
		});

		it("should throw an error for a store that does not exist", async () => {
			await contract
				.readStore(ctx, "1003")
				.should.be.rejectedWith(/The store 1003 does not exist/);
		});
	});

	describe("#updateStore", () => {
		it("should update a store", async () => {
			await contract.updateStore(ctx, "1001", "store 1001 new value");
			const test1001 = JSON.stringify({ value: "store 1001 new value" });
			ctx.stub.putState.should.have.been.calledOnceWithExactly(
				"1001",
				Buffer.from(test1001)
			);
		});

		it("should throw an error for a store that does not exist", async () => {
			await contract
				.updateStore(ctx, "1003", "store 1003 new value")
				.should.be.rejectedWith(/The store 1003 does not exist/);
		});
	});

	describe("#deleteStore", () => {
		it("should delete a store", async () => {
			await contract.deleteStore(ctx, "1001");
			ctx.stub.deleteState.should.have.been.calledOnceWithExactly("1001");
		});

		it("should throw an error for a store that does not exist", async () => {
			await contract
				.deleteStore(ctx, "1003")
				.should.be.rejectedWith(/The store 1003 does not exist/);
		});
	});

	describe("#getHistoryForKey", () => {
		it("should throw an error for a store that does not exist", async () => {
			await contract
				.getHistoryForKey(ctx, "1003")
				.should.be.rejectedWith(/The store 1003 does not exist/);
		});
		it("should have at least 1 history", async () => {
			await ctx.stub.getHistoryForKey("1001");
			ctx.stub.getHistoryForKey.should.have.been.calledOnceWith("1001");
		});
	});
});
