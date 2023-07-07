const Nunjucks = require("nunjucks"); // Access nunjucks
const Image = require("@11ty/eleventy-img"); // Access eleventy_img module
const path = require('path'); // for working with file and directory paths

// allows the use of {% image... %} to create responsive, optimised images

async function imageShortcode(src, alt, className, loading="lazy", sizes = '(max-width: 600px) 400px, 850px') {
    // check if alt message supplied
    if (alt === undefined) {
      throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
    }
  
    // metadata contains array of objects containing format, dimension, and source information for each generated image
    let metadata = await Image(`./images/${src}`, { // Image plugin function takes image source and object literal as arguments
        // image widths to create
        widths: [200, 400, 850, 1920, 2500],
        // specify image formats
        formats: ['webp', 'jpeg'],
        // path to use in generated markup
        urlPath: '/img/',
        // path where generated image files will be written on in _site
        outputDir: "./_site/img",
        // filenameFormat is an option in Image plugin, calls the supplied function to customise file names of generated images
        filenameFormat: function (id, src, width, format, options) {
            // obtain extension of original image 
            const extension = path.extname(src);
            // obtain name of original image without extension
            const name = path.basename(src, extension);
            // return custom file name for each generated imag, e.g. logo-200-jpeg
            return `${name}-${width}w.${format}`;
        },
    });
  
    // get the smallest image
    let lowsrc = metadata.jpeg[0];
  
    // returns a string literal that contains the HTML picture markup used for the image
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

    // allows the {% image %} shortcode to be used for optimised images (in webp if possible)
    eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

    // override the default Nunjucks environment with a new one that has trimBlocks and lstripBlocks options set to true
    const nunjucksEnvironment = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader("./_includes"), // pass in our _includes dir here
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
