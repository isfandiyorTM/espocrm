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

define('views/modals/edit-dashboard', ['views/modal', 'model'], function (Dep, Model) {

    return Dep.extend({

        className: 'dialog dialog-record',
        cssName: 'edit-dashboard',

        template: 'modals/edit-dashboard',

        data: function () {
            return {
                hasLocked: this.hasLocked,
            };
        },

        events: {
            'click button.add': function (e) {
                let name = $(e.currentTarget).data('name');

                this.getParentView().addDashlet(name);
                this.close();
            },
        },

        shortcutKeys: {
            'Control+Enter': 'save',
        },

        setup: function () {
            this.buttonList = [
                {
                    name: 'save',
                    label: this.options.fromDashboard ? 'Save': 'Apply',
                    style: 'primary',
                    title: 'Ctrl+Enter',
                },
                {
                    name: 'cancel',
                    label: 'Cancel',
                    title: 'Esc',
                }
            ];

            let dashboardLayout = this.options.dashboardLayout || [];

            let dashboardTabList = [];

            dashboardLayout.forEach(item => {
                if (item.name) {
                    dashboardTabList.push(item.name);
                }
            });

            let model = this.model = new Model();
            model.name = 'Preferences';

            model.set('dashboardTabList', dashboardTabList);

            this.hasLocked = 'dashboardLocked' in this.options;

            if (this.hasLocked) {
                model.set('dashboardLocked', this.options.dashboardLocked || false);
            }

            this.createView('dashboardTabList', 'views/preferences/fields/dashboard-tab-list', {
                el: this.options.el + ' .field[data-name="dashboardTabList"]',
                defs: {
                    name: 'dashboardTabList',
                    params: {
                        required: true,
                        noEmptyString: true,
                    }
                },
                mode: 'edit',
                model: model,
            });

            if (this.hasLocked) {
                this.createView('dashboardLocked', 'views/fields/bool', {
                    el: this.options.el + ' .field[data-name="dashboardLocked"]',
                    mode: 'edit',
                    model: model,
                    defs: {
                        name: 'dashboardLocked',
                    },
                })
            }

            this.headerText = this.translate('Edit Dashboard');

            this.dashboardLayout = this.options.dashboardLayout;
        },

        actionSave: function () {
            let dashboardTabListView = this.getView('dashboardTabList');
            dashboardTabListView.fetchToModel();

            if (this.hasLocked) {
                let dashboardLockedView = this.getView('dashboardLocked');
                dashboardLockedView.fetchToModel();
            }

            if (dashboardTabListView.validate()) {
                return;
            }

            let attributes = {};

            attributes.dashboardTabList = this.model.get('dashboardTabList');

            if (this.hasLocked) {
                attributes.dashboardLocked = this.model.get('dashboardLocked');
            }

            let names = this.model.get('translatedOptions');

            let renameMap = {};

            for (let name in names) {
                if (name !== names[name]) {
                    renameMap[name] = names[name];
                }
            }

            attributes.renameMap = renameMap;

            this.trigger('after:save', attributes);

            this.dialog.close();
        },
    });
});
