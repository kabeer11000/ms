/**
 * Helpers.
 */

const s = 1000, m = s * 60, h = m * 60, d = h * 24, w = d * 7, y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = (val, options) => {
    const type = typeof val;
    if (type === 'string' && val.length > 0) return parse(val);
    else if (type === 'number' && isFinite(val)) return (options || {}).long ? fmtLong(val) : fmtShort(val);
    throw new Error(
        'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} e
 * @return {Number}
 * @api private
 */
const parse = (e) => {
    if ((e = String(e)).length > 100) return undefined;
    const c = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
    if (!c) return undefined;
    const a = parseFloat(c[1]);
    switch ((c[2] || "ms").toLowerCase()) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
            return a * y;
        case "weeks":
        case "week":
        case "w":
            return a * w;
        case "days":
        case "day":
        case "d":
            return a * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return a * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return a * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return a * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
            return a;
        default:
            return undefined;
    }
};

/**
 * Short format for `ms`.
 *
 * @param {Number} t
 * @return {String}
 * @api private
 */

const fmtShort = t => {
    const r = Math.abs(t);
    return r >= d ? Math.round(t / d) + "d" : r >= h ? Math.round(t / h) + "h" : r >= m ? Math.round(t / m) + "m" : r >= s ? Math.round(t / s) + "s" : t + "ms";
}

/**
 * Long format for `ms`.
 *
 * @param {Number} a
 * @return {String}
 * @api private
 */

const fmtLong = a => {
    const l = Math.abs(a);
    return l >= d ? plural(a, l, d, "day") : l >= h ? plural(a, l, h, "hour") : l >= m ? plural(a, l, m, "minute") : l >= s ? plural(a, l, s, "second") : a + " ms"
}

/**
 * Pluralization helper.
 */

const plural = (ms, msAbs, n, name) => Math.round(ms / n) + ' ' + name + (msAbs >= n * 1.5 ? 's' : '');

