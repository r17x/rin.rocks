final: prev:
let
  inherit (prev) callPackage;
in
{
  ocamlPackages = prev.ocaml-ng.ocamlPackages_5_0 // {
    server-reason-react = callPackage ./server-reason-react.nix prev.ocaml-ng.ocamlPackages_5_0;
    ppx_pipe_first = callPackage ./ppx_pipe_first.nix;
  };
}
