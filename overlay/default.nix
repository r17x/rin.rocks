self: super:

{
  # this overlay not correct as expected
  ocamlPackages = super.ocaml-ng.ocamlPackages_5_0.overrideScope' (self: super: {
    server-reason-react = super.callPackage ./server-reason-react.nix super.ocaml-ng.ocamlPackages_5_0;
    ppx_pipe_first = super.callPackage ./ppx_pipe_first.nix;
  });

  rin_rocks = self.callPackage ../nix { inherit (self) nix-filter; };
  nodejs = super.nodejs-16_x;
  yarn = super.yarn.override { inherit (self) nodejs; };
}
