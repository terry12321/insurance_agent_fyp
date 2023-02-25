import { NextApiRequest, NextApiResponse } from "next";
import { BEinstance } from "../../utils/axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const body = req.body;
        console.log(body)
        const response = await BEinstance.post(
            "/authentication/login",
            {
                username: body.username,
                password: body.password,
            }
        );

        console.log(response);
        res.status(200).send({});
    } catch (error) {
        res.status(500).send({});
    }
}
