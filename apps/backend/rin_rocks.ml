let loader _root path request =
  match Filename.extension path with
  | "" -> Dream.redirect ~status:`Moved_Permanently request (String.concat "" [ "/"; path; ".html"; ])
  | _ -> match Assets.read path with
    | None -> Dream.empty `Not_Found
    | Some asset -> Dream.respond asset

let () =
  Dream.run
  @@ Dream.logger
  @@ Dream.router [
    Dream.get "/" (loader "" "index.html");
    Dream.get "**" (Dream.static ~loader "");
  ]
