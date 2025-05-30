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

define('views/admin/extensions/index', ['view'], function (Dep) {

    return Dep.extend({

        template: 'admin/extensions/index',

        packageContents: null,

        events: {
            'change input[name="package"]': function (e) {
                this.$el.find('button[data-action="upload"]')
                    .addClass('disabled')
                    .attr('disabled', 'disabled');

                this.$el.find('.message-container').html('');

                let files = e.currentTarget.files;

                if (files.length) {
                    this.selectFile(files[0]);
                }
            },
            'click button[data-action="upload"]': function () {
                this.upload();
            },
            'click [data-action="install"]': function (e) {
                let id = $(e.currentTarget).data('id');

                let name = this.collection.get(id).get('name');
                let version = this.collection.get(id).get('version');

                this.run(id, name, version);

            },
            'click [data-action="uninstall"]': function (e) {
                let id = $(e.currentTarget).data('id');

                this.confirm(this.translate('uninstallConfirmation', 'messages', 'Admin'), () => {
                    Espo.Ui.notify(this.translate('Uninstalling...', 'labels', 'Admin'));

                    Espo.Ajax
                        .postRequest('Extension/action/uninstall', {id: id}, {timeout: 0, bypassAppReload: true})
                        .then(() => {
                            window.location.reload();
                        })
                        .catch(xhr => {
                            let msg = xhr.getResponseHeader('X-Status-Reason');

                            this.showErrorNotification(this.translate('Error') + ': ' + msg);
                        });
                });
            }
        },

        setup: function () {
            this.getCollectionFactory().create('Extension', collection => {
                this.collection = collection;

                collection.maxSize = this.getConfig().get('recordsPerPage');

                this.wait(true);

                collection
                    .fetch()
                    .then(() => {
                        this.createView('list', 'views/extension/record/list', {
                            collection: collection,
                            el: this.options.el + ' > .list-container',
                        });

                        if (collection.length === 0) {
                            this.once('after:render', () => {
                                this.$el.find('.list-container').addClass('hidden');
                            });
                        }

                        this.wait(false);
                    });
            });
        },

        selectFile: function (file) {
            var fileReader = new FileReader();

            fileReader.onload = (e) => {
                this.packageContents = e.target.result;

                this.$el.find('button[data-action="upload"]')
                    .removeClass('disabled')
                    .removeAttr('disabled');
            };

            fileReader.readAsDataURL(file);
        },

        showError: function (msg) {
            msg = this.translate(msg, 'errors', 'Admin');

            this.$el.find('.message-container').html(msg);
        },

        showErrorNotification: function (msg) {
            if (!msg) {
                this.$el.find('.notify-text').addClass('hidden');

                return;
            }

            msg = this.translate(msg, 'errors', 'Admin');

            this.$el.find('.notify-text').html(msg);
            this.$el.find('.notify-text').removeClass('hidden');
        },

        upload: function () {
            this.$el.find('button[data-action="upload"]').addClass('disabled').attr('disabled', 'disabled');

            this.notify('Uploading...');

            Espo.Ajax
                .postRequest('Extension/action/upload', this.packageContents, {
                    timeout: 0,
                    contentType: 'application/zip',
                })
                .then(data => {
                    if (!data.id) {
                        this.showError(this.translate('Error occurred'));

                        return;
                    }

                    Espo.Ui.notify(false);

                    this.createView('popup', 'views/admin/extensions/ready', {
                        upgradeData: data,
                    }, view => {
                        view.render();

                        this.$el.find('button[data-action="upload"]')
                            .removeClass('disabled')
                            .removeAttr('disabled');

                        view.once('run', () => {
                            view.close();

                            this.$el.find('.panel.upload').addClass('hidden');

                            this.run(data.id, data.version, data.name);
                        });
                    });
                })
                .catch(xhr => {
                    this.showError(xhr.getResponseHeader('X-Status-Reason'));

                    Espo.Ui.notify(false);
                });
        },

        run: function (id, version, name) {
            Espo.Ui.notify(this.translate('pleaseWait', 'messages'));

            this.showError(false);
            this.showErrorNotification(false);

            Espo.Ajax
                .postRequest('Extension/action/install', {id: id}, {timeout: 0, bypassAppReload: true})
                .then(() => {
                    let cache = this.getCache();

                    if (cache) {
                        cache.clear();
                    }

                    this.createView('popup', 'views/admin/extensions/done', {
                        version: version,
                        name: name,
                    }, view => {
                        if (this.collection.length) {
                            this.collection.fetch({bypassAppReload: true});
                        }

                        this.$el.find('.list-container').removeClass('hidden');
                        this.$el.find('.panel.upload').removeClass('hidden');

                        this.notify(false);

                        view.render();
                    });
                })
                .catch(xhr => {
                    this.$el.find('.panel.upload').removeClass('hidden');

                    let msg = xhr.getResponseHeader('X-Status-Reason');

                    this.showErrorNotification(this.translate('Error') + ': ' + msg);
                });
        },
    });
});
