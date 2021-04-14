const request = require('supertest');

const {
	validSample,
	validSampleImgMissing,
	validExpected,
} = require('../testSampleData/routes/filter.sample');

let server;

describe('/api', () => {
	beforeEach(() => {
		server = require('../../index');
	});
	afterEach(() => {
		server.close();
	});
	const send = async data =>
		await request(server).post('/api/filter').send(data);
	describe('POST /filter', () => {
		describe('when request is invalid', () => {
			it(`should send bad(400) and {error} if parsing failed`, async () => {
				const data = '{a:';
				const res = await send(data);
				expect(res.status).toBe(400);
				expect(res.error).not.toBe('');
			});

			it(`should send bad(400) and {error} if no payload attribute`, async () => {
				const data = {};
				const res = await send(data);
				expect(res.status).toBe(400);
				expect(res.error).not.toBe('');
			});

			it(`should send bad(400) and {error} if payload is not an array`, async () => {
				const data = { payload: {} };
				const res = await send(data);
				expect(res.status).toBe(400);
				expect(res.error).not.toBe('');
			});
		});

		describe('when request is valid', () => {
			it(`should send good(200) and {response: []} if payload is an empty array`, async () => {
				const data = { payload: [] };
				const res = await send(data);
				expect(res.status).toBe(200);
				expect(res.body.response).toEqual([]);
			});

			it(`should send good(200) and {response: []} if none fulfill the criterion`, async () => {
				const data = {
					payload: [
						{ slug: 'a', drm: false },
						{ slug: 'a', episodeCount: 0 },
						{},
					],
				};
				const res = await send(data);
				expect(res.status).toBe(200);
				expect(res.body.response).toEqual([]);
			});

			it('should send good(200) and set undefined to res.image if req.image is missing', async () => {
				const data = validSampleImgMissing;
				const expected = {
					title: '16 Kids and Counting',
					slug: 'show/16kidsandcounting',
				};
				const res = await send(data);
				expect(res.status).toBe(200);
				expect(res.body.response[0]).toMatchObject(expected);
			});

			it('should return good (200) and {response : [what fulfill the criterion]}', async () => {
				const data = validSample;
				const expected = validExpected;
				const res = await send(data);
				expect(res.status).toBe(200);
				expect(res.body.response.length).toBe(expected.response.length);
				expected.response.forEach(item => {
					expect(res.body.response).toContainEqual(item);
				});
			});
		});
	});
});
