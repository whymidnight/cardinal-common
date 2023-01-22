"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secondsToString = exports.secondstoDuration = exports.longDateString = exports.shortDateString = exports.getExpirationString = void 0;
function getExpirationString(expiration, UTCSecondsNow, config) {
    var _a, _b;
    const ranges = (_a = config === null || config === void 0 ? void 0 : config.includes) !== null && _a !== void 0 ? _a : [
        {
            suffix: "d",
            durationSeconds: 60 * 60 * 24,
        },
        {
            suffix: "h",
            durationSeconds: 60 * 60,
            mod: 24,
        },
        {
            suffix: "m",
            durationSeconds: 60,
            mod: 60,
        },
        {
            suffix: "s",
            durationSeconds: 1,
            mod: 60,
        },
    ];
    const secondsRemaining = expiration - UTCSecondsNow;
    const floorOrCeil = (n) => n < 0 ? 0 : expiration - UTCSecondsNow > 0 ? Math.floor(n) : Math.ceil(n);
    const numString = (n, suffix) => {
        return floorOrCeil(n) || (config === null || config === void 0 ? void 0 : config.showZeros)
            ? `${floorOrCeil(n)}${suffix}`
            : "";
    };
    return ranges
        .map(({ durationSeconds, mod, suffix }) => numString(mod
        ? (secondsRemaining / durationSeconds) % mod
        : secondsRemaining / durationSeconds, (config === null || config === void 0 ? void 0 : config.capitalizeSuffix) ? suffix.toUpperCase() : suffix))
        .join((_b = config === null || config === void 0 ? void 0 : config.delimiter) !== null && _b !== void 0 ? _b : " ");
}
exports.getExpirationString = getExpirationString;
function shortDateString(utc_seconds) {
    return `${new Date(utc_seconds * 1000).toLocaleDateString([], {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
    })} ${new Date(utc_seconds * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })}`;
}
exports.shortDateString = shortDateString;
function longDateString(utcSeconds) {
    return new Date(utcSeconds * 1000).toLocaleTimeString(["en-US"], {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    });
}
exports.longDateString = longDateString;
function secondstoDuration(durationSeconds) {
    const years = Math.floor(durationSeconds / 31449600);
    const months = Math.floor((durationSeconds % 31449600) / 2419200);
    const weeks = Math.floor((durationSeconds % 2419200) / 604800);
    const days = Math.floor((durationSeconds % 604800) / 86400);
    const hours = Math.floor((durationSeconds % 86400) / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;
    let duration = "";
    const optionalVals = [`${years}Y`, `${months}M`, `${weeks}w`, `${days}d`];
    const vals = [`${hours}h`, `${minutes}m`, `${seconds}s`];
    for (const val of optionalVals) {
        if (parseInt(val.substring(0, val.length - 1)) > 0) {
            duration += val + " ";
        }
    }
    for (const val of vals) {
        duration += val + " ";
    }
    return duration;
}
exports.secondstoDuration = secondstoDuration;
const secondsToString = (requiredSeconds, showSeconds = true) => {
    if (!requiredSeconds || requiredSeconds <= 0)
        return "0";
    const weeks = Math.floor(requiredSeconds / 60 / 60 / 24 / 7);
    const days = Math.floor((requiredSeconds / 60 / 60 / 24) % 7);
    const hours = Math.floor((requiredSeconds / 60 / 60) % 24);
    const minutes = Math.floor((requiredSeconds / 60) % 60);
    const seconds = Math.round(requiredSeconds % 60);
    return `${weeks ? `${weeks}w ` : ""} ${days ? `${days}d ` : ""}${!weeks && hours ? `${hours}h ` : ""}${!weeks && minutes ? `${minutes}m ` : ""}${seconds && showSeconds ? `${seconds}s` : ""}`;
};
exports.secondsToString = secondsToString;
//# sourceMappingURL=dates.js.map