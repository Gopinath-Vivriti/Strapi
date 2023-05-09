'use strict';

/**
 * tutorial-video service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tutorial-video.tutorial-video');
