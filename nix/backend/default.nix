{ pkgs
, frontend
, nix-filter
}:

with pkgs;

ocamlPackages.buildDunePackage {
  pname = "rin_rocks";
  version = "0.0.0";
  duneVersion = "2";
  minimalOCamlVersion = "4.12";
  src = nix-filter {
    root = ../../.;
    include = [
      # ".ocamlformat"
      "dune-project"
      "dune"
      "rin_rocks.ml"
    ];

  };

  strictDeps = true;
  # propagatedBuildInputs = [ ocamlPackages.ppx_deriving ];
  nativeBuildInputs = with ocamlPackages;[
    crunch
  ];

  propagatedBuildInputs = with ocamlPackages; [
    dream
    lwt_ppx
    reason
    # TODO: 
    # * remove this dev-dependencies when overlay is corrected
    # * uncommecnt server-reason-react when wanted use ReasonML
    # ocamlPackages.server-reason-react
    ocamlformat
    merlin
  ];

  preBuild = ''
    ln -sf ${frontend} ./assets
    dune build rin_rocks.opam
  '';

}
