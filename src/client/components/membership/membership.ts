import Vue from "vue";
import { Component, VueToElement } from "../../definitions";
import { membership } from "../../api/membership";
import { Member } from "../../../shared";

/**
 * Users component. Displays all users
 */
const vueComponent = Vue.extend({
    template: require("views/membership/membership.html"),

    data(): {
        allMembers: Member[],
        members: Member[],
        searchText: string
    } {
        return {
            allMembers: [],
            members: [],
            searchText: ""
        };
    },

    created() {
        this.getMembers();
    },

    methods: {
        getMembers(): void {
            membership.members().then((members) => {
                this.allMembers = members;
                this.members = members;
            });
        },
        searchMembers(): void {
            if (!this.searchText) {
                this.members = this.allMembers;
            } else {
                this.members = this.allMembers.filter((member) => {
                    return member.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
                        member.firstName.toLowerCase().includes(this.searchText.toLowerCase());
                });
            }
        }
    }
});

/**
 * Displays all users
 */
export class MembershipComponent implements Component {
    private readonly vue = new vueComponent();
    readonly element: Element = VueToElement(this.vue);
}
