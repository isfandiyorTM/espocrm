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

define('views/modals/convert-currency', ['views/modals/mass-convert-currency'], function (Dep) {

    return Dep.extend({

        setup: function () {
            Dep.prototype.setup.call(this);

            this.headerText = this.translate('convertCurrency', 'massActions');
        },

        actionConvert: function () {
            this.disableButton('convert');

            this.getView('currency').fetchToModel();
            this.getView('currencyRates').fetchToModel();

            var currency = this.model.get('currency');
            var currencyRates = this.model.get('currencyRates');

            Espo.Ajax.postRequest('Action', {
                    entityType: this.options.entityType,
                    action: 'convertCurrency',
                    id: this.options.model.id,
                    data: {
                        targetCurrency: currency,
                        rates: currencyRates,
                        fieldList: this.options.fieldList || null,
                    },
                })
                .then(attributes => {
                    this.trigger('after:update', attributes);

                    this.close();
                })
                .catch(() => {
                    this.enableButton('convert');
                });
        },
    });
});
