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
}:

buildDunePackage {
  pname = "server-reason-react";
  version = "3234376";
  src = fetchFromGitHub {
    owner = "ml-in-barcelona";
    repo = "server-reason-react";
    rev = "b06ed5c48949fafa7c01e6313410129f3a10a983";
    sha256 = "0im7cc2bkp5dfzgdpgkrc83hfjnf3rhfnf3qchx11rp9qd28sp5x";
  };
  useDune3 = true;
  propagatedBuildInputs = [
    ppxlib
    reason
  ];
  meta.homepage = "https://github.com/ml-in-barcelona/server-reason-react";
}
