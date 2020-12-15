module App

open Browser

type Counter(init: int) =
    let mutable count = init
    member this.CountUp() =
        count <- count + 1
    member this.Count
        with get() : int = count

let counter = Counter(0)

type DataSource(next : int -> unit, complete : unit -> unit) =
    let mutable i = 0
    member this.Id =
        window.setInterval
            ( (fun () ->
                this.Emit(i)
                i <- i + 1)
            , 1000)
    member this.Emit(n: int) =
        let limit = 10
        next(n)
        if n = limit
        then
            complete()
            this.Destroy()
    member this.Destroy() =
        window.clearInterval this.Id

let myObservable observer =
    let dataSource = DataSource((printfn "Next: %i"), (fun () -> printfn "Complete"))
    fun () -> dataSource.Destroy()
