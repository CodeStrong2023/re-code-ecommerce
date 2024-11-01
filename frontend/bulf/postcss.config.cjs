module.exports = {
  plugins: [
    require("@fullhuman/postcss-purgecss")({
      content: ["./src/**/*.js", "./src/**/*.jsx", "./public/index.html"],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
