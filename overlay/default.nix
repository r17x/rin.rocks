final: prev:
let
  inherit (prev) callPackage;
in
{
  ocamlPackages = prev.ocaml-ng.ocamlPackages_5_0.overrideAttrs (old: {
    server-reason-react = callPackage ./server-reason-react.nix { };
  });
}
