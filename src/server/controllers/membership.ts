import { EventEmitter2 } from "eventemitter2";
import { Member } from "../../shared";

export class MembershipController {
    private readonly emitter = new EventEmitter2();

    getMemberList(): Member[] {
        let members = [];
        members = [
            {
                "id": "127",
                "lastName": "Kelley",
                "firstName": "Blake",
                "migs": true,
                "description": "Blake's Membership",
                "membershipType": "B",
                "family": "Jesica"
            },
            {
                "id": "243",
                "lastName": "Calugaru",
                "firstName": "Andrei",
                "migs": false,
                "description": "Andrea's Membership",
                "membershipType": "B",
                "family": ""
            },
            {
                "id": "413",
                "lastName": "Schoeppach",
                "firstName": "Chris",
                "migs": true,
                "description": "Chris's Membership",
                "membershipType": "B",
                "family": "Theresa"
            },
            {
                "id": "827",
                "lastName": "Baker",
                "firstName": "Doug",
                "migs": false,
                "description": "Doug's Membership",
                "membershipType": "B",
                "family": ""
            }
        ];
        return members;
    }

    on(event: "Error", cb: (error: Error) => void): this;
    on(event: string, cb: (...args: any[]) => void): this {
        this.emitter.on(event, cb);
        return this;
    }

    onAny(cb: (event: string | string[], ...args: any[]) => void): this {
        this.emitter.onAny(cb);
        return this;
    }
}