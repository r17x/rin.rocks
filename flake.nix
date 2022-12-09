{
  description = "rin.rocks build with dream for static binary";
  # Flake dependency specification
  #
  # To update all flake inputs:
  #
  #     $ nix flake update --commit-lockfile
  #
  # To update individual flake inputs:
  #
  #     $ nix flake lock --update-input <input> ... --commit-lockfile
  #
  inputs = {
    nixpkgs.url = "github:nix-ocaml/nix-overlays";
    # Convenience functions for writing flakes
    flake-utils.url = "github:numtide/flake-utils";
    # Precisely filter files copied to the nix store
    nix-filter.url = "github:numtide/nix-filter";
    # ocaml-overlay for using dream 
    ocaml-overlay.url = "github:nix-ocaml/nix-overlays";
    ocaml-overlay.inputs = {
      nixpkgs.follows = "nixpkgs";
      flake-utils.follows = "flake-utils";
    };
  };
  outputs = { self, nixpkgs, ocaml-overlay, flake-utils, nix-filter }:
    # Construct an output set that supports a number of default systems
    flake-utils.lib.eachDefaultSystem (system:
      let
        # Legacy packages that have not been converted to flakes
        pkgs = (ocaml-overlay.makePkgs {
          inherit system;
          # extraOverlays = [ (import ./nix/overlay.nix) ];
        }).extend
          (self: super: { ocamlPackages = super.ocaml-ng.ocamlPackages_5_0; });
        # OCaml packages available on nixpkgs
        ocamlPackages = pkgs.ocamlPackages;
        # Library functions from nixpkgs
        lib = pkgs.lib;
        # Filtered sources (prevents unecessary rebuilds)
        sources = {
          ocaml = nix-filter.lib {
            root = ./.;
            include = [
              # ".ocamlformat"
              "dune-project"
              "dune"
              "rin_rocks.ml"
              "assets"
              # TODO include output from nextjs build & export
            ];
          };

          nix = nix-filter.lib {
            root = ./.;
            include = [
              (nix-filter.lib.matchExt "nix")
            ];
          };
        };
        package = "rin_rocks";
      in
      {
        # Exposed packages that can be built or run with `nix build` or
        # `nix run` respectively:
        #
        #     $ nix build .#<name>
        #     $ nix run .#<name> -- <args?>
        #
        # The package that will be built or run by default. For example:
        #
        #     $ nix build
        #     $ nix run -- <args?>
        #
        packages.default = self.packages.${system}.${package};
        packages.${package} = ocamlPackages.buildDunePackage {
          pname = package;
          version = "0.0.0";
          duneVersion = "2";
          src = sources.ocaml;

          strictDeps = true;
          # propagatedBuildInputs = [ ocamlPackages.ppx_deriving ];
          nativeBuildInputs = [
            ocamlPackages.crunch
          ];

          buildInputs = [
            ocamlPackages.dream
            ocamlPackages.lwt_ppx
          ];

          preBuild = ''
            dune build ${package}.opam
          '';
        };

        # Flake checks
        #
        #     $ nix flake check
        #
        # Run tests for the `rin_rocks` package
        checks.${package} =
          let
            # Patches calls to dune commands to produce log-friendly output
            # when using `nix ... --print-build-log`. Ideally there would be
            # support for one or more of the following:
            #
            # In Dune:
            #
            # - have workspace-specific dune configuration files
            #
            # In NixPkgs:
            #
            # - allow dune flags to be set in in `ocamlPackages.buildDunePackage`
            # - alter `ocamlPackages.buildDunePackage` to use `--display=short`
            # - alter `ocamlPackages.buildDunePackage` to allow `--config-file=FILE` to be set
            patchDuneCommand =
              let
                subcmds = [ "build" "test" "runtest" "install" ];
              in
              lib.replaceStrings
                (lib.lists.map (subcmd: "dune ${subcmd}") subcmds)
                (lib.lists.map (subcmd: "dune ${subcmd} --display=short") subcmds);
          in

          self.packages.${system}.${package}.overrideAttrs
            (oldAttrs: {
              name = "check-${oldAttrs.name}";
              doCheck = true;
              buildPhase = patchDuneCommand oldAttrs.buildPhase;
              checkPhase = patchDuneCommand oldAttrs.checkPhase;
              # skip installation (this will be tested in the `rin_rocks-app` check)
              installPhase = "touch $out";
            });

        checks = {

          # Check Dune and OCaml formatting
          # dune-fmt = pkgs.runCommand "check-dune-fmt"
          #   {
          #     nativeBuildInputs = [
          #       ocamlPackages.dune_2
          #       ocamlPackages.ocaml
          #       ocamlPackages.dream
          #       ocamlPackages.crunch
          #       pkgs.ocamlformat
          #     ];
          #   }
          #   ''
          #     echo "checking dune and ocaml formatting"
          #     dune build \
          #       --display=short \
          #       --no-print-directory \
          #       --root="${sources.ocaml}" \
          #       --build-dir="$(pwd)/_build" \
          #       @fmt
          #     touch $out
          #   '';

          # Check documentation generation
          # dune-doc = pkgs.runCommand "check-dune-doc"
          #   {
          #     ODOC_WARN_ERROR = "true";
          #     nativeBuildInputs = [
          #       ocamlPackages.dune_3
          #       ocamlPackages.ocaml
          #       ocamlPackages.odoc
          #     ];
          #   }
          #   ''
          #     echo "checking ocaml documentation"
          #     dune build \
          #       --display=short \
          #       --no-print-directory \
          #       --root="${sources.ocaml}" \
          #       --build-dir="$(pwd)/_build" \
          #       @doc
          #     touch $out
          #   '';

          # Check Nix formatting
          nixpkgs-fmt = pkgs.runCommand "check-nixpkgs-fmt"
            { nativeBuildInputs = [ pkgs.nixpkgs-fmt ]; }
            ''
              echo "checking nix formatting"
              nixpkgs-fmt --check ${sources.nix}
              touch $out
            '';
        };

        # Development shells
        #
        #    $ nix develop .#<name>
        #    $ nix develop .#<name> --command dune build @test
        #
        # [Direnv](https://direnv.net/) is recommended for automatically loading
        # development environments in your shell. For example:
        #
        #    $ echo "use flake" > .envrc && direnv allow
        #    $ dune build @test
        #
        devShells = {
          default = pkgs.mkShell {
            # Development tools
            packages = [
              # Source file formatting
              pkgs.nixpkgs-fmt
              pkgs.ocamlPackages.ocamlformat
              # For `dune build --watch ...`
              pkgs.fswatch
              # For `dune build @doc`
              # ocamlPackages.odoc
              # OCaml editor support
              # pkgs.ocamlPackages.ocaml-lsp-server
              # Nicely formatted types on hover
              # ocamlPackages.ocamlformat-rpc-lib
              # Fancy REPL thing
              # ocamlPackages.utop
              self.packages.${system}.${package}
            ];

            # Tools from packages
            inputsFrom = [
              self.packages.${system}.${package}
            ];
          };
        };
      });
}
