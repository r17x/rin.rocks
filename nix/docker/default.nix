{ pkgs, backend }:

pkgs.dockerTools.buildImage {
  name = "docker_${backend.pname}";
  config = {
    Cmd = [ "${backend}/bin/rin_rocks" ];
  };
}
