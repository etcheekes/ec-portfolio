// Access eleventy_img module
const Nunjucks = require("nunjucks");
const Image = require("@11ty/eleventy-img");
const path = require('path');

// allows the use of {% image... %} to create responsive, optimised images
// CHANGE DEFAULT MEDIA QUERIES AND WIDTHS
async function imageShortcode(src, alt, className, loading="lazy", sizes = '(max-width: 600px) 400px, 850px') {
    // don't pass an alt? chuck it out. passing an empty string is okay though
    if (alt === undefined) {
      throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
    }
  
    // create the metadata for an optimised image
    let metadata = await Image(`./images/${src}`, {
        widths: [200, 400, 850, 1920, 2500],
		// specify image formats
      formats: ['webp', 'jpeg'],
		// path to use in generated markup
      urlPath: '/img/',
		// path where generated image files will be written on file system
      outputDir: "./_site/img",
		// generate customised file names for the generated images
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      },
    });
  
    // get the smallest image for picture/image attributes
    let lowsrc = metadata.jpeg[0];
  
    // {% image ... %} returns this HTML markup
    return `<picture class="${className}">
      ${Object.values(metadata)
        .map((imageFormat) => {
          return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
            .map((entry) => entry.srcset)
            .join(', ')}" sizes="${sizes}">`;
        })
        .join('\n')}
        <img
          src="${lowsrc.url}"
          alt="${alt}"
          loading="${loading}"
          decoding="async">
      </picture>`;
  };

// link script and style sheets
module.exports = function(eleventyConfig) {
    // access all files in assets and favicon folder
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("favicon");

    // allows the {% image %} shortcode to be used for optimised iamges (in webp if possible)
    eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

    // override the default Nunjucks environment with a new one that has trimBlocks and lstripBlocks options set to true
    const nunjucksEnvironment = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader("./_includes"), // we need to pass in our includes dir here
        {
            // automatically remove leading whitespace from a block/tag.
            lstripBlocks: true,
            // automatically remove trailing newlines from a block/tag.
            trimBlocks: true
        }
    );
  
    eleventyConfig.setLibrary("njk", nunjucksEnvironment);

    return {};
    
  };
