final: prev:

{
  # this overlay not correct as expected
  ocamlPackages = prev.ocaml-ng.ocamlPackages_4_14.overrideScope' (final: prev: {
    server-reason-react = prev.callPackage ./server-reason-react.nix prev.ocaml-ng.ocamlPackages_5_0;
    ppx_pipe_first = prev.callPackage ./ppx_pipe_first.nix;
  });

  rin_rocks = final.callPackage ../nix { inherit (final) nix-filter; };
  nodejs = prev.nodejs-16_x;
  yarn = prev.yarn.override { inherit (final) nodejs; };
}
