/************************************************************************
 * This file is part of EspoCRM.
 *
 * EspoCRM - Open Source CRM application.
 * Copyright (C) 2014-2023 Yurii Kuznietsov, Taras Machyshyn, Oleksii Avramenko
 * Website: https://www.espocrm.com
 *
 * EspoCRM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * EspoCRM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EspoCRM. If not, see http://www.gnu.org/licenses/.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "EspoCRM" word.
 ************************************************************************/

define('storage', [], function () {

    /**
     * A storage. Data is saved across browser sessions, has no expiration time.
     *
     * @class
     * @name Class
     * @memberOf module:storage
     */
    let Storage = function () {};

    _.extend(Storage.prototype, /** @lends module:storage.Class# */{

        /**
         * @protected
         */
        prefix: 'espo',

        /**
         * @protected
         */
        storageObject: localStorage,

        /**
         * @private
         * @param {string} type
         * @returns {string}
         */
        composeFullPrefix: function (type) {
            return this.prefix + '-' + type;
        },

        /**
         * @private
         * @param {string} type
         * @param {string} name
         * @returns {string}
         */
        composeKey: function (type, name) {
            return this.composeFullPrefix(type) + '-' + name;
        },

        /**
         * @private
         * @param {string} type
         */
        checkType: function (type) {
            if (
                typeof type === 'undefined' &&
                toString.call(type) !== '[object String]' || type === 'cache'
            ) {
                throw new TypeError("Bad type \"" + type + "\" passed to Espo.Storage.");
            }
        },

        /**
         * Has a value.
         *
         * @param {string} type A type (category).
         * @param {string} name A name.
         * @returns {boolean}
         */
        has: function (type, name) {
            this.checkType(type);

            let key = this.composeKey(type, name);

            return this.storageObject.getItem(key) !== null;
        },

        /**
         * Get a value.
         *
         * @param {string} type A type (category).
         * @param {string} name A name.
         * @returns {*} Null if not stored.
         */
        get: function (type, name) {
            this.checkType(type);

            let key = this.composeKey(type, name);

            try {
                var stored = this.storageObject.getItem(key);
            }
            catch (error) {
                console.error(error);

                return null;
            }

            if (stored) {
                let result = stored;

                if (stored.length > 9 && stored.substr(0, 9) === '__JSON__:') {
                    let jsonString = stored.substr(9);

                    try {
                        result = JSON.parse(jsonString);
                    }
                    catch (error) {
                        result = stored;
                    }
                }
                else if (stored[0] === "{" || stored[0] === "[") { // for backward compatibility
                    try {
                        result = JSON.parse(stored);
                    }
                    catch (error) {
                        result = stored;
                    }
                }

                return result;
            }

            return null;
        },

        /**
         * Set (store) a value.
         *
         * @param {string} type A type (category).
         * @param {string} name A name.
         * @param {*} value A value.
         */
        set: function (type, name, value) {
            this.checkType(type);

            if (value === null) {
                this.clear(type, name);

                return;
            }

            let key = this.composeKey(type, name);

            if (
                value instanceof Object ||
                Array.isArray(value) ||
                value === true ||
                value === false ||
                typeof value === 'number'
            ) {
                value = '__JSON__:' + JSON.stringify(value);
            }

            try {
                this.storageObject.setItem(key, value);
            }
            catch (error) {
                console.error(error);
                return null;
            }
        },

        /**
         * Clear a value.
         *
         * @param {string} type A type (category).
         * @param {string} name A name.
         */
        clear: function (type, name) {
            let reText;

            if (typeof type !== 'undefined') {
                if (typeof name === 'undefined') {
                    reText = '^' + this.composeFullPrefix(type);
                }
                else {
                    reText = '^' + this.composeKey(type, name);
                }
            }
            else {
                reText = '^' + this.prefix + '-';
            }

            let re = new RegExp(reText);

            for (let i in this.storageObject) {
                if (re.test(i)) {
                    delete this.storageObject[i];
                }
            }
        }
    });

    Storage.extend = Bull.View.extend;

    return Storage;
});
