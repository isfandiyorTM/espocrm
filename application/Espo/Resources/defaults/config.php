<?php
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

return [
    'database' => [
        'host' => 'localhost',
        'port' => null,
        'charset' => null,
        'dbname' => '',
        'user' => '',
        'password' => '',
    ],
    'useCache' => true,
    /** Max number of jobs per one execution. */
    'jobMaxPortion' => 15,
    /** Jobs will be executed in parallel processes. */
    'jobRunInParallel' => false,
    /** Max number of processes run simultaneously. */
    'jobPoolConcurrencyNumber' => 8,
    /** Max number of CRON processes run simultaneously. */
    'daemonMaxProcessNumber' => 5,
    /** Interval between process runs in seconds. */
    'daemonInterval' => 10,
    'daemonProcessTimeout' => 36000,
    'recordsPerPage' => 20,
    'recordsPerPageSmall' => 5,
    'recordsPerPageSelect' => 10,
    'recordsPerPageKanban' => 5,
    'applicationName' => 'EspoCRM',
    'version' => '7.5.6',
    'timeZone' => 'UTC',
    'dateFormat' => 'DD.MM.YYYY',
    'timeFormat' => 'HH:mm',
    'weekStart' => 0,
    'thousandSeparator' => ',',
    'decimalMark' => '.',
    'exportDelimiter' => ',',
    'currencyList' => ['USD'],
    'defaultCurrency' => 'USD',
    'baseCurrency' => 'USD',
    'currencyRates' => [],
    'currencyNoJoinMode' => false,
    'outboundEmailIsShared' => true,
    'outboundEmailFromName' => 'EspoCRM',
    'outboundEmailFromAddress' => '',
    'smtpServer' => '',
    'smtpPort' => 587,
    'smtpAuth' => true,
    'smtpSecurity' => 'TLS',
    'smtpUsername' => '',
    'smtpPassword' => '',
    'language' => 'en_US',
    'logger' => [
        'path' => 'data/logs/espo.log',
        'level' => 'WARNING', /** DEBUG, INFO, NOTICE, WARNING, ERROR, CRITICAL, ALERT, EMERGENCY */
        'rotation' => true,
        'maxFileNumber' => 30,
        'printTrace' => false,
    ],
    'authenticationMethod' => 'Espo',
    'globalSearchEntityList' => [
        'Account',
        'Contact',
        'Lead',
        'Opportunity',
    ],
    'tabList' => [
        "Account",
        "Contact",
        "Lead",
        "Opportunity",
        "Case",
        "Email",
        "Calendar",
        "Meeting",
        "Call",
        "Task",
        "_delimiter_",
        "Document",
        "Campaign",
        "KnowledgeBaseArticle",
        "Stream",
        "User"
    ],
    'quickCreateList' => [
        "Account",
        "Contact",
        "Lead",
        "Opportunity",
        "Meeting",
        "Call",
        "Task",
        "Case",
        "Email"
    ],
    'exportDisabled' => false,
    'adminNotifications' => true,
    'adminNotificationsNewVersion' => true,
    'adminNotificationsCronIsNotConfigured' => true,
    'adminNotificationsNewExtensionVersion' => true,
    'assignmentEmailNotifications' => false,
    'assignmentEmailNotificationsEntityList' => ['Lead', 'Opportunity', 'Task', 'Case'],
    'assignmentNotificationsEntityList' => ['Call', 'Email'],
    "portalStreamEmailNotifications" => true,
    'streamEmailNotificationsEntityList' => ['Case'],
    'streamEmailNotificationsTypeList' => ['Post', 'Status', 'EmailReceived'],
    'emailNotificationsDelay' => 30,
    'emailMessageMaxSize' => 10,
    'emailRecipientAddressMaxCount' => 100,
    'notificationsCheckInterval' => 10,
    'popupNotificationsCheckInterval' => 15,
    'maxEmailAccountCount' => 2,
    'followCreatedEntities' => false,
    'b2cMode' => false,
    'restrictedMode' => false,
    'theme' => 'Violet',
    'themeParams' => (object) ['navbar' => 'side'],
    'massEmailMaxPerHourCount' => 100,
    'massEmailVerp' => false,
    'personalEmailMaxPortionSize' => 50,
    'inboundEmailMaxPortionSize' => 50,
    'emailAddressLookupEntityTypeList' => ['User', 'Contact', 'Lead', 'Account'],
    'emailAddressEntityLookupDefaultOrder' => ['User', 'Contact', 'Lead', 'Account'],
    'phoneNumberEntityLookupDefaultOrder' => ['User', 'Contact', 'Lead', 'Account'],
    'authTokenLifetime' => 0,
    'authTokenMaxIdleTime' => 48,
    'userNameRegularExpression' => '[^a-z0-9\-@_\.\s]',
    'addressFormat' => 1,
    'displayListViewRecordCount' => true,
    'dashboardLayout' => [
        (object) [
            'name' => 'My Espo',
            'layout' => [
                (object) [
                    'id' => 'default-activities',
                    'name' => 'Activities',
                    'x' => 2,
                    'y' => 2,
                    'width' => 2,
                    'height' => 4
                ],
                (object) [
                    'id' => 'default-stream',
                    'name' => 'Stream',
                    'x' => 0,
                    'y' => 0,
                    'width' => 2,
                    'height' => 4
                ]
            ]
        ]
    ],
    'calendarEntityList' => ['Meeting', 'Call', 'Task'],
    'activitiesEntityList' => ['Meeting', 'Call'],
    'historyEntityList' => ['Meeting', 'Call', 'Email'],
    'busyRangesEntityList' => ['Meeting', 'Call'],
    'emailAutoReplySuppressPeriod' => '2 hours',
    'emailAutoReplyLimit' => 5,
    'cleanupJobPeriod' => '1 month',
    'cleanupActionHistoryPeriod' => '15 days',
    'cleanupAuthTokenPeriod' => '1 month',
    'cleanupSubscribers' => true,
    'currencyFormat' => 2,
    'currencyDecimalPlaces' => 2,
    'aclAllowDeleteCreated' => false,
    'aclAllowDeleteCreatedThresholdPeriod' => '24 hours',
    'attachmentAvailableStorageList' => null,
    'attachmentUploadMaxSize' => 256,
    'attachmentUploadChunkSize' => 4,
    'inlineAttachmentUploadMaxSize' => 20,
    'textFilterUseContainsForVarchar' => false,
    'tabColorsDisabled' => false,
    'massPrintPdfMaxCount' => 50,
    'emailKeepParentTeamsEntityList' => ['Case'],
    'streamEmailWithContentEntityTypeList' => ['Case'],
    'recordListMaxSizeLimit' => 200,
    'noteDeleteThresholdPeriod' => '1 month',
    'noteEditThresholdPeriod' => '7 days',
    'emailForceUseExternalClient' => false,
    'useWebSocket' => false,
    'webSocketMessager' => 'ZeroMQ',
    'auth2FAMethodList' => ['Totp'],
    'auth2FAInPortal' => false,
    'personNameFormat' => 'firstLast',
    'newNotificationCountInTitle' => false,
    'pdfEngine' => 'Dompdf',
    'smsProvider' => null,
    'defaultFileStorage' => 'EspoUploadDir',
    'ldapUserNameAttribute' => 'sAMAccountName',
    'ldapUserFirstNameAttribute' => 'givenName',
    'ldapUserLastNameAttribute' => 'sn',
    'ldapUserTitleAttribute' => 'title',
    'ldapUserEmailAddressAttribute' => 'mail',
    'ldapUserPhoneNumberAttribute' => 'telephoneNumber',
    'ldapUserObjectClass' => 'person',
    'ldapPortalUserLdapAuth' => false,
    'passwordGenerateLength' => 10,
    'massActionIdleCountThreshold' => 100,
    'exportIdleCountThreshold' => 1000,
    'clientSecurityHeadersDisabled' => false,
    'clientCspDisabled' => false,
    'clientCspScriptSourceList' => [
        'https://maps.googleapis.com',
    ],
    'oidcJwtSignatureAlgorithmList' => ['RS256'],
    'oidcUsernameClaim' => 'sub',
    'oidcFallback' => true,
    'oidcScopes' => ['profile', 'email', 'phone'],
    'isInstalled' => false,
];
