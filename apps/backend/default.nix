{ pkgs
, frontend
, nix-filter
}:

with pkgs;

ocamlPackages.buildDunePackage {
  name = "rin_rocks";
  pname = "rin_rocks";
  version = "0.0.0";
  duneVersion = "2";
  minimalOCamlVersion = "4.12";
  src = nix-filter {
    root = ./.;
    include = [
      "dune"
      "dune-project"
      "rin_rocks.ml"
    ];
  };

  strictDeps = true;

  nativeBuildInputs = with ocamlPackages; [ crunch ];

  propagatedBuildInputs = with ocamlPackages; [
    dream
    lwt_ppx
    reason
  ];

  preBuild = ''
    ln -sf ${frontend} assets
    dune build rin_rocks.opam
  '';
}
