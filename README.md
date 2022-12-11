# rin.rocks 

Tech Stack: WTF I WANT!

frontend: `nextjs` -> export -> `out/`

backend: `dream` -> serve / from `out/` -> single file binary -> `/bin/rin_rocks`

deploy: `rin_rocks` binary -> machine (Cloud) -> run

over-in-over: build this project with unikernel (MirageOS)
              and deploy with solo at gcloud.

development:
* build `nix build`
* run `nix run`
* development `nix develop`
* future deployment: compile with MirageOS then deploy kernel image to gcloud solo

browser: `https://rin.rocks`
