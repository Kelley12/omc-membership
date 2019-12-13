import express = require("express");
import { membershipRouter } from "./membership";
import { MembershipController } from "../controllers";

export function apiRouter({ membershipController }:
    { membershipController: MembershipController }): express.Router {
    const router = express.Router();

    router.use("/membership", membershipRouter(membershipController));

    router.get("*", (_req, res) => res.sendStatus(404));

    return router;
}
