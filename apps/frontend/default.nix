{ pkgs, nix-filter }:

with pkgs;

let
  project = callPackage ./yarn-project.nix { } {
    # Example of providing a different source tree.
    src = nix-filter {
      root = ./.;
      # include = [
      #   "apps/frontend"
      # ];
      exclude = [
        (nix-filter.matchExt "nix")
      ];
    };
  };

in
project.overrideAttrs
  (oldAttrs: {
    name = "rin_rocks_frontend";

    # Example of adding packages to the build environment.
    # Especially dependencies with native modules may need a Python installation.
    nativeBuildInputs = oldAttrs.nativeBuildInputs or [ ] ++ [
      python3
      nodejs
      yarn
      ack
      nodePackages.node-gyp-build
      nodePackages.node-gyp
    ] ++ lib.optionals stdenv.isDarwin [
      xcbuild
    ] ++ lib.optionals stdenv.isLinux [
      # required by sharp
      pkg-config
      vips
    ];

    PATCHES = [
      ./patches/mdx-mermaid+1.3.2.patch
    ];

    GH_GRAPHQL_URL = builtins.getEnv "GH_GRAPHQL_URL";
    GH_TOKEN = builtins.getEnv "GH_TOKEN";
    # Example of invoking a build step in your project.
    preConfigure =
      lib.optionals stdenv.isLinux
        (
          let
            sharp = fetchurl {
              url = " https://github.com/lovell/sharp-libvips/releases/download/v8.13.3/libvips-8.13.3-linux-x64.tar.br";
              sha256 = "sha256-s0GhgM092tspDE4a17kLj1mbJUrTSPY5CzxNZ2c7/Mk=";
            };
          in
          ''
            export sharp_libvips_local_prebuilds=${sharp.outPath}
          ''
        );

    buildPhase = ''
      yarn build
      yarn export
      mv ./out/_next ./out/next
      ack -l "_next" ./out/ | xargs sed -i "s/_next/next/g"
    '';

    installPhase = "cp -r ./out $out/";
  })
