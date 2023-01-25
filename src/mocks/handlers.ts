import { rest } from "msw";
import user from './userDummy.json';
import users from './usersDummy.json';
import campaigns from './campaignsDummy.json';

export const handlers = [
    rest.get('/api/auth/me', async (req,res,ctx) => {
        await sleep(200);
        return res(ctx.status(200), ctx.json(user))
    }),
    rest.get('/api/users', async (req,res,ctx) => {
        await sleep(200);
        return res(ctx.status(200), ctx.json(users))
    }),
    rest.get('/api/campaigns', async (req,res,ctx) => {
        await sleep(200);
        return res(ctx.status(200), ctx.json(campaigns))
    }),
    rest.get('/api/users/:email/exists' , async (req,res,ctx) => {
        await sleep(200);
        return res(ctx.status(200), ctx.json({"result": true}))
    }),
    rest.patch('/api/campaigns/1', async (req,res,ctx) => {
        await sleep(200);
        return res(ctx.status(200), ctx.json({"result": true, "id": 1}))
    }),
    rest.post('/api/users', async (req,res,ctx) => {
        await sleep(200);
        return res(ctx.status(200), ctx.json({"result": true, "id": 1}))
    }),
]

async function sleep(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}