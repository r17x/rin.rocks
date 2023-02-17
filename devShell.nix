{ pkgs, shellHook }:

with pkgs;

let
  run = pkg: "${pkgs.${pkg}}/bin/${pkg}";
  scripts = with pkgs; [
    (writeScriptBin "dev" ''
      dune exec rin_rocks &
      ${run "fswatch"} -o rin_rocks.ml -l 2 | xargs -L1 bash -c \
        "killall rin_rocks || true; (dune exec rin_rocks || true) &"
    '')
  ];
in

mkShell {
  inherit shellHook;
  # Development tools
  nativeBuildInputs = [
    python3
  ];

  packages = scripts ++ [
    # javascript
    # nodejs
    # yarn

    # Source file formatting
    # dune_2
    # ocamlPackages.merlin
    # ocamlPackages.ocamlformat
    # For `dune build --watch ...`
    fswatch
    # For `dune build @doc`
    # ocamlPackages.odoc
    # OCaml editor support
    # pkgs.ocamlPackages.ocaml-lsp-server
    # Nicely formatted types on hover
    # ocamlPackages.ocamlformat-rpc-lib
    # Fancy REPL thing
    # ocamlPackages.utop
    # self.packages.${system}.${package}
    # pkgs.rin_rocks.backend
  ];

  # Tools from packages
  inputsFrom = [
    rin_rocks.frontend
    rin_rocks.backend
    # rin_rocks.backend
    # self.packages.${system}.${package}
  ];
}
