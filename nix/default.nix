{ lib, pkgs, nix-filter }:

let
  callPackage = lib.callPackageWith (pkgs // packages);
  packages = {
    inherit nix-filter;
    backend = callPackage ./backend { };
    frontend = callPackage ./frontend { };
    docker = callPackage ./docker { };
  };
in
packages
