import express = require("express");
import { MembershipController } from "../controllers";

export function membershipRouter(membershipController: MembershipController): express.Router {
    const router = express.Router();

    router.get("/members", (_, res) => res.json(membershipController.getMemberList()));

    return router;
}
