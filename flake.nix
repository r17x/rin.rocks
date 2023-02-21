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
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    # Convenience functions for writing flakes
    flake-utils.url = "github:numtide/flake-utils";
    # Precisely filter files copied to the nix store
    nix-filter.url = "github:numtide/nix-filter";
    # nix-ocaml for using dream 
    nix-ocaml.url = "github:nix-ocaml/nix-overlays";
    nix-ocaml.inputs = {
      nixpkgs.follows = "nixpkgs";
      flake-utils.follows = "flake-utils";
    };
    nix-precommit.url = "github:cachix/pre-commit-hooks.nix";
    nix-precommit.inputs = {
      nixpkgs.follows = "nixpkgs";
    };
  };
  outputs =
    { self
    , nixpkgs
    , nix-ocaml
    , nix-filter
    , nix-precommit
    , flake-utils
    ,
    }:
    # Construct an output set that supports a number of default systems
    {
      overlays.default = import ./overlay;
    } // flake-utils.lib.eachDefaultSystem
      (system:
      let
        # Legacy packages that have not been converted to flakes
        overlays = [
          nix-filter.overlays.default
          nix-ocaml.overlays.${system}
          self.overlays.default
        ];

        pkgs = import nixpkgs { inherit system overlays; };

        precommit = {
          src = ./.;
          hooks = {
            prettier.enable = true;
            prettier.excludes = [ ".yarn/plugins/.*\.cjs" ];
            nixpkgs-fmt.enable = true;
            actionlint.enable = true;
            mdsh.enable = true;
            dune-opam-sync.enable = true;
          };
        };
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
        # packages.default = self.packages.${system}.backend;
        legacyPackages = pkgs.rin_rocks;
        packages = flake-utils.lib.flattenTree pkgs.rin_rocks;
        # Flake checks
        #
        #     $ nix flake check
        checks = {
          pre-commit-check = nix-precommit.lib.${system}.run precommit;
        };
        # Development shells
        #    $ nix develop .
        #    $ nix develop . --command dune build @test
        #
        # [Direnv](https://direnv.net/) is recommended for automatically loading
        # development environments in your shell. For example:
        #
        #    $ echo "use flake" > .envrc && direnv allow
        #    $ dune build @test
        #
        devShells = import ./nix/devshell.nix {
          inherit pkgs;
          inherit (self.checks.${system}.pre-commit-check) shellHook;
        };
      });
}
