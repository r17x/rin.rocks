{ pkgs, backend }:

pkgs.dockerTools.buildImage {
  name = "docker_${backend.pname}";
  config = {
    Cmd = [ "/bin/rin_rocks" ];
  };
}
