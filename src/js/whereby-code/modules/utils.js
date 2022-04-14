const host = process.env.HOST_TARGET || "whereby.com";

const wherebyUrlRegexp = /https?:\/\/([a-zA-Z0-9-]+)?\.?whereby\.com\/(.*)?/i;

export function getMemberType(t) {
    const {
        member: idMember
    } = t.getContext();
    return t.board("memberships").then(({
        memberships
    }) => {
        const membership = memberships.find(m => m.idMember === idMember);
        // either "normal", "admin" or "anonymous"
        return membership ? membership.memberType : "anonymous";
    });
}

export const sanitize = str => str.replace(/[&<>"'\s=()/]/g, "").trim();

const prependProtocol = str => (str.match(/^https?:\/\//) ? str : `https://${str}`);

export const parseUrl = str => {
    try {
        const url = new URL(prependProtocol(str));
        const {
            href,
            pathname
        } = url;
        const matches = href.match(wherebyUrlRegexp);

        if (!matches) {
            return {
                roomName: "",
                teamName: ""
            };
        }

        const [roomName] = pathname.substring(1).split("/");
        const [, teamName = ""] = matches || [];

        return {
            roomName,
            teamName
        };
    } catch (e) {
        return {
            roomName: "",
            teamName: ""
        };
    }
};

export const getRoomUrl = ({
        teamName,
        roomName,
        params
    }) =>
    new URL(
        `/${roomName}${
            params
                ? `?${Object.keys(params)
                      .map(key => `${key}=${params[key]}`)
                      .join("&")}`
                : ""
        }`,
        `https://${teamName ? `${teamName}.` : ""}${host}`
    ).href;

export function getRoomUrlValue({
    teamName,
    roomName,
    params,
    fallback
}) {
    if ((!teamName && roomName) || !roomName) {
        return fallback;
    }
    return getRoomUrl({
        teamName,
        roomName,
        params
    });
}

// simple replacement for lodash get
export const get = (nestedObj, pathArr, defaultValue = undefined) => {
    return pathArr.reduce(
        (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined) || defaultValue,
        nestedObj
    );
};