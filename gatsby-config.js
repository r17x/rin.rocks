require(`dotenv`).config({
    path: `.env`,
})

module.exports = {
    siteMetadata: {
        // Used for the title template on pages other than the index site
        siteTitle: `@ri7nz`,
        // Default title of the page
        siteTitleAlt: `@ri7nz`,
        // Can be used for e.g. JSONLD
        siteHeadline: `@ri7nz`,
        // Will be used to generate absolute URLs for og:image etc.
        siteUrl: `https://rin.rocks`,
        // Used for SEO
        siteDescription: `heLL0 w0rld`,
        // Will be set on the <html /> tag
        siteLanguage: `en`,
        // Used for og:image and must be placed inside the `static` folder
        siteImage: `/banner.jpg`,
        // Twitter Handle
        author: `@ri7nz`,
        // Links displayed in the header on the right side
        externalLinks: [
            {
                name: `Twitter`,
                url: `https://twitter.com/ri7nz`,
            },
            {
                name: `Instagram`,
                url: `https://www.instagram.com/ri7nz`,
            },
        ],
        // Navigation links
        navigation: [
            {
                title: `Blog`,
                slug: `/blog`,
            },
            {
                title: `BϕR`,
                slug: `/bir`,
            },
            {
                title: `TϕL`,
                slug: `/til`,
            }
        ],
    },
    plugins: [
        {
            resolve: `@lekoarts/gatsby-theme-minimal-blog`,
            // See the theme's README for all available options
            options: {
                navigation: [
                    {
                        title: `Blog`,
                        slug: `/blog`,
                    },
                    {
                        title: `BϕR`,
                        slug: `/bir`,
                    },
                    {
                        title: `TϕL`,
                        slug: `/til`,
                    }
                ],
                externalLinks: [
                    {
                        name: `Twitter`,
                        url: `https://twitter.com/ri7nz`,
                    },
                    {
                        name: `Instagram`,
                        url: `https://www.instagram.com/ri7nz`,
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-88285855-2",
            },
        },
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `@ri7nz`,
                short_name: `rin`,
                description: `@ri7nz ¯\_(ツ)_/¯`,
                start_url: `/`,
                background_color: `#000`,
                theme_color: `#6B46C1`,
                display: `standalone`,
                icons: [
                    {
                        src: `/manifest-icon-192.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                    },
                    {
                        src: `/manifest-icon-512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    },
                ],
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-netlify`,
    ],
}
