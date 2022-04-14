import localizationSettings from "./modules/localizationSettings";
import {
    getStoredValues
} from "./modules/storage";
import {
    getMemberType,
    sanitize,
    getRoomUrl
} from "./modules/utils";

import cogWheelIcon from "../images/cogwheel.svg";
import popoutIcon from "../images/popout.svg";
import wherebyIcon from "../images/whereby-icon.svg";

const staticPath = process.env.BUILT_STATIC_PATH;

let initialized = false;
let isOpen = false;

function boardBarWrapper({
    t,
    teamName,
    roomName,
    memberType,
    onCogwheelClick
}) {
    const roomUrl = getRoomUrl({
        roomName: sanitize(roomName),
        teamName: sanitize(teamName),
        params: {
            iframeSource: "trello.com",
            video: "off",
            audio: "off",
            embed: true,
        },
    });
    const actions = [{
            icon: new URL(popoutIcon, staticPath).href,
            url: roomUrl,
            callback: () => {
                isOpen = false;
                return t.closeBoardBar();
            },
            alt: "Pop out in separate window",
            position: "left",
        },
        ...(memberType !== "admin" ?
            [] :
            [{
                icon: new URL(cogWheelIcon, staticPath).href,
                callback: onCogwheelClick,
                alt: "Change Whereby power-up settings",
                position: "right",
            }, ]),
    ];
    return t.boardBar({
        url: roomUrl,
        accentColor: "#ebecf0",
        height: 355, // initial height for iframe (in px, max 60% of the screen height)
        resizable: true,
        // callback: () => console.log("Goodbye"),
        title: getRoomUrl({
            roomName,
            teamName
        }),
        actions,
    });
}

function showSettings(t) {
    return t.popup({
        title: t.localizeKey("whereby-settings-title"),
        url: "./settings.html",
        callback() {
            return Promise.all([getStoredValues(t), getMemberType(t)]).then(
                ([{
                    teamName,
                    roomName,
                    defaultOpen
                }, memberType]) => {
                    t.closeBoardBar();
                    if (defaultOpen || isOpen) {
                        boardBarWrapper({
                            t,
                            teamName,
                            roomName,
                            memberType,
                            onCogwheelClick: showSettings
                        });
                    }
                }
            );
        },
    });
}

function boardButtons(t) {
    return Promise.all([getStoredValues(t), getMemberType(t)]).then(
        ([{
            teamName,
            roomName,
            defaultOpen
        }, memberType]) => {
            isOpen = defaultOpen;
            const button = {
                icon: new URL(wherebyIcon, staticPath).href,
                text: t.localizeKey("whereby-powerup-button"),
            };
            const openBoard = () => {
                boardBarWrapper({
                    t,
                    teamName,
                    roomName,
                    memberType,
                    onCogwheelClick: showSettings
                });
            };

            if (roomName) {
                if (defaultOpen && !initialized) {
                    initialized = true;
                    openBoard();
                }
                button.callback = () => {
                    isOpen = !isOpen;
                    if (!isOpen) {
                        t.closeBoardBar();
                    } else {
                        openBoard();
                    }
                };
            } else {
                // Without room a name, ask the user to set one when they
                // click on the board button.
                button.callback = showSettings;
            }

            return [button];
        }
    );
}

function onDisable(t) {
    return t.closeBoardBar();
}

function onEnable(t) {
    return t.modal({
        url: "./settings.html?modal",
        height: 500,
        width: 200,
        title: t.localizeKey("whereby-settings-title"),
    });
}

window.TrelloPowerUp.initialize({
    "board-buttons": boardButtons,
    "on-disable": onDisable,
    "on-enable": onEnable,
    "show-settings": showSettings,
}, {
    localization: localizationSettings,
});