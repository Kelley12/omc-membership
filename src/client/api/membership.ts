import { get } from "../definitions";
import { Member } from "../../shared";

/**
 * An interface to the robot API
 */
class Membership {
    async members(): Promise<Member[]> {
        return get("/api/membership/members");
    }
}

export const membership = new Membership();
