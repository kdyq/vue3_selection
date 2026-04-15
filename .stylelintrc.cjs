module.exports = {
    extends: [
      "stylelint-config-standard-scss",
      "stylelint-config-standard-vue",
      "stylelint-config-recess-order"
    ],
    overrides: [
      {
        files: ["**/*.{scss,css}"],
        customSyntax: "postcss-scss"
      },
      {
        files: ["**/*.{vue,html}"],
        customSyntax: "postcss-html"
      }
    ],
    ignoreFiles: [
      "**/*.js",
      "**/*.jsx",
      "**/*.ts",
      "**/*.tsx",
      "**/*.json",
      "**/*.md",
      "**/*.yaml"
    ],
    rules: {
      "value-keyword-case": null,
      "no-descending-specificity": null,
      "no-empty-source": null,
      "selector-class-pattern": null,
      "property-no-unknown": null,
      "value-no-vendor-prefix": null,
      "property-no-vendor-prefix": null,
      "selector-pseudo-class-no-unknown": [
        true,
        {
          ignorePseudoClasses: ["global", "v-deep", "deep"]
        }
      ]
    }
  };