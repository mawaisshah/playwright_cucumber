module.exports = {
  default: {
    baseURL:'https://www.saucedemo.com/',
    tags: process.env.npm_config_TAGS || '',
    formatOptions: {
      snippetInterface: 'async-await',
    },
    paths: ['src/tests/features/'],
    dryRun: false,
    require: ['src/tests/step_definitions/', 'src/support/hooks.js', 'src/utils/*.js'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
      'rerun:@rerun.txt',
    ],
    parallel: 4,
  },
  rerun: {
    formatOptions: {
      snippetInterface: 'async-await',
    },
    publishQuiet: true,
    dryRun: true,
    require: ['src/tests/step_definitions/', 'src/support/hooks.js', 'src/utils/*.js'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
      'rerun:@rerun.txt',
    ],
    parallel: 4,
  },
};
