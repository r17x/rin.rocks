{ buildDunePackage
, ppxlib
, melange
, reason
, reason-native
, server-reason-react-src
, ocaml_pcre
, lwt
, lwt_ppx
, uri
, ...
}:

buildDunePackage {
  name = "server-reason-react";
  pname = "server-reason-react";
  version = "n/a";
  src = server-reason-react-src; # flake:inputs.server-reason-react-src
  propagatedBuildInputs = [
    melange
    ppxlib
    reason
    ocaml_pcre
    lwt
    lwt_ppx
    uri
  ];
  nativeBuildInputs = [
    reason
    melange
    reason-native.refmterr
  ];
  meta.homepage = "https://github.com/ml-in-barcelona/server-reason-react";
}
