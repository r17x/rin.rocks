{ pkgs, shellHook }:

let
  inherit (pkgs) mkShell rin_rocks ocamlPackages;

  run = pkg: "${pkgs.${pkg}}/bin/${pkg}";

  scripts = with pkgs; [
    (writeScriptBin "dev_deps" ''
      until yarn next -v > /dev/null 2>&1; do
        yarn install --immutable
      done
      if [[ ! -d "assets" ]]; then
        for t in "build" "export -o assets"
          do
          ./node_modules/.bin/next $t
        done
      fi
    '')

    (writeScriptBin "dev_fe" ''
      dev_deps
      ./node_modules/.bin/next dev
    '')

    (writeScriptBin "dev" ''
      dev_deps
      dune exec rin_rocks &
      ${run "fswatch"} -o rin_rocks.ml ./assets -l 2 | xargs -L1 bash -c \
        "kill $(lsof -t -i:8080) || true; (dune exec rin_rocks || true) &"
    '')
  ];

  ocamlDevDeps = with ocamlPackages; [
    merlin
    ocamlformat
    utop
  ];
in
{
  # Development shells
  #
  #    $ nix develop .#backend
  #    $ nix develop . -c dune build
  #
  backend = mkShell {
    inherit shellHook;

    buildInputs = [ ];
    # tools from packages
    inputsFrom = [ rin_rocks.backend ];
  };
  # Development shells
  #
  #    $ nix develop .#frontend
  #    $ nix develop . -c yarn start
  #
  frontend = mkShell {
    inherit shellHook;

    # tools from packages
    inputsFrom = [ rin_rocks.frontend ];
  };
  # Development shells
  #
  #    $ nix develop .
  #
  default = mkShell {
    inherit shellHook;

    # tools from packages
    inputsFrom = with rin_rocks;[ frontend backend ];

    buildInputs = scripts ++ ocamlDevDeps;
  };
}
