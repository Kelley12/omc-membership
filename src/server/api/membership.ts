import express = require("express");
import { MembershipController } from "../controllers";

export function membershipRouter(membershipController: MembershipController): express.Router {
    const router = express.Router();

    router.get("/members", (_, res) => membershipController.getMemberList()
                                        .then(members => res.json(members)));

    return router;
}
