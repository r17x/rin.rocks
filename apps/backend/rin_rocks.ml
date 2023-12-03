let loader _root path request =
  match Filename.extension path with
  | "" -> Dream.redirect ~status:`Moved_Permanently request (String.concat "" [ "/"; path; ".html"; ])
  | _ -> match Assets.read path with
    | None -> Dream.empty `Not_Found
    | Some asset -> Dream.respond asset;;

let app id request =  
  let path = Dream.param request id in
  let responseText element = element |> ReactDOM.renderToString |> Dream.respond in
  let responseStream element = 
    let data_stream response_stream = 
      let (stream, _) = ReactDOM.renderToLwtStream element  in

      stream |> Lwt_stream.iter_s (fun data ->
        let%lwt () = Dream.write response_stream data in
        Dream.flush response_stream
      ) 
    in

    Dream.stream data_stream 
  in

  match path with
  | "todo" -> responseText App.todo
  | "stream" -> responseStream App.stream
  | _ -> responseText App.home 


let () =
  Dream.run
  @@ Dream.logger
  @@ Dream.router [
    Dream.get "/app/:id" (app "id");
  ]
