import { EventEmitter2 } from "eventemitter2";
import { Member } from "../../shared";
import { default as axios } from "axios";

export class MembershipController {
    private readonly emitter = new EventEmitter2();
    private readonly rowRegex = /<tr>([\w\s()]|<[\/]*td>)+<\/tr>/g;
    private readonly columnRegex = /<td>([\w\s()]*)<\/td>/g;
    private readonly replaceRegex = /<[\/]*td>/g;

    async getMemberList(): Promise<Member[]> {
        const members: Member[] = [];

        return axios.get("http://bhouse.mynetgear.com/migschkgood2.php")
            .then(res => {
                const table: string = res.data;
                const rows = table.match(this.rowRegex);
                console.log(rows);
                if (rows) {
                    rows.forEach(row => {
                        const columns = row.match(this.columnRegex);
                        if (columns) {
                            const migs = columns[3].replace(this.replaceRegex, "");
                            const member: Member = {
                                "id": columns[0].replace(this.replaceRegex, ""),
                                "lastName": columns[1].replace(this.replaceRegex, ""),
                                "firstName": columns[2].replace(this.replaceRegex, ""),
                                "migs": migs.toLowerCase() === "y" ? true : false,
                                "description": columns[4].replace(this.replaceRegex, ""),
                                "membershipType": columns[5].replace(this.replaceRegex, ""),
                                "family": columns[6].replace(this.replaceRegex, "")
                            };
                            members.push(member);
                        }
                    });
                    return members;
                } else {
                    return members;
                }
            })
            .catch(_ => members);
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