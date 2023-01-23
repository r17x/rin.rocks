{ lib
, buildDunePackage
, ppxlib
, fetchFromGitHub
, reason
, ocaml
, cppo
, menhir
, menhirLib
, menhirSdk
, fix
, merlin-extend
, ppx_derivers
, result
, ...
}:

buildDunePackage {
  pname = "ppx_pipe_first";
  version = "0.0.1";
  src = fetchFromGitHub {
    owner = "IwanKaramazow";
    repo = "PipeFirst";
    rev = "c22e4d54602d8594aa592efefe587a092e408910";
    sha256 = "11c3c9qaa2lpr5qpwgcwqh6qqhhkvl1gp91w65q4v0f9l2252xyz";
  };
  useDune2 = true;
  propagatedBuildInputs = [
    reason
    ocaml-migrate-parsetree-2
  ];
  meta.homepage = "https://github.com/IwanKaramazow/PipeFirst";
}

