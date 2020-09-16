import wavesTheme from "gatsby-theme-waves/src/gatsby-plugin-theme-ui/index";
import blogTheme from "@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui/index";
import merge from "deepmerge";

export default merge(blogTheme, wavesTheme);
