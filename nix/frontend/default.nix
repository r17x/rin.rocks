{ pkgs, nix-filter }:

with pkgs;

let
  project = callPackage ../../yarn-project.nix
    {
      # Example of selecting a specific version of Node.js.
      # nodejs = pkgs.nodejs-18_x;
      inherit nodejs;
    }
    {
      name = "rin_rocks_frontend";
      # Example of providing a different source tree.
      src = nix-filter {
        root = ../../.;
        exclude = [
          "dune-project"
          "dune"
          "rin_rocks.ml"
          (nix-filter.matchExt "nix")
        ];
      };
    };

in
project.overrideAttrs
  (oldAttrs: {

    # Example of adding packages to the build environment.
    # Especially dependencies with native modules may need a Python installation.
    buildInputs = [
      python3
      nodejs
      yarn
      ack

      vips # required by sharp
    ] ++ lib.optionals stdenv.isDarwin [
      xcbuild
    ];

    PATCHES = [
      ../../patches/mdx-mermaid+1.3.2.patch
    ];

    GH_GRAPHQL_URL = builtins.getEnv "GH_GRAPHQL_URL";
    GH_TOKEN = builtins.getEnv "GH_TOKEN";
    # Example of invoking a build step in your project.
    buildPhase = ''
      yarn build
      yarn export
      mv ./out/_next ./out/next
      ack -l "_next" ./out/ | xargs sed -i "s/_next/next/g"
    '';

    installPhase = "cp -r ./out $out/";
  })
