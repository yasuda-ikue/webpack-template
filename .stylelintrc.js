const lintStyle = {
  "plugins": [ "stylelint-scss" ],
  customSyntax: require("postcss-scss"),
  "rules": {
    "color-no-invalid-hex": true,
    "unit-no-unknown": true,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "property-no-unknown": true
  }
}

module.exports = lintStyle;