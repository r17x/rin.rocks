{ lib, pkgs, nix-filter }:

let
  callPackage = lib.callPackageWith (pkgs // packages);
  packages = {
    inherit nix-filter;
    backend = callPackage ../apps/backend { };
    docker = callPackage ../apps/backend/docker.nix { };
    frontend = callPackage ../apps/frontend { };
  };
in
packages
