<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\TypeEvent;

use Illuminate\Http\Request;
use Encrypt;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $itemsPerPage = $request->itemsPerPage ?? 10;
        $skip = ($request->page - 1) * $request->itemsPerPage;

        // Getting all the records
        if (($request->itemsPerPage == -1)) {
            $itemsPerPage =  Event::count();
            $skip = 0;
        }

        $sortBy = (isset($request->sortBy[0])) ? $request->sortBy[0] : 'id';
        $sort = (isset($request->sortDesc[0])) ? "asc" : 'desc';

        $search = (isset($request->search)) ? "%$request->search%" : '%%';

        $event = Event::allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage);

        $total = Event::counterPagination($search);

        return response()->json([
            "message" => "Registros obtenidos correctamente.",
            "data" => $event,
            "total" => $total,
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function eventsByDates(Request $request)
    {
        // $event = Event::allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage);
        $event = Event::where('date_start', '>=', $request->initialDate)
            ->where('date_end', '<=', $request->finalDate)
            ->get()
            ->map(fn ($event) => $event->format());

        return response()->json([
            "message" => "Registros obtenidos correctamente.",
            "data" => $event,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $event = new Event;

        $event->name = $request->name;
        $event->date_start = $request->date_start;
        $event->date_end = $request->date_end;
        $event->type_event_id = TypeEvent::where('name', $request->type_event)->first()->id;
        $event->deleted_at = $request->deleted_at;

        $event->save();

        return response()->json([
            "message" => "Registro creado correctamente.",
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $data = $request->all();

        $event = Event::where('id', $data['id'])->first();
        $event->name = $request->name;
        $event->date_start = $request->date_start;
        $event->date_end = $request->date_end;
        $event->type_event_id = TypeEvent::where('name', $request->type_event)->first()->id;
        $event->deleted_at = $request->deleted_at;

        $event->save();

        return response()->json([
            "message" => "Registro modificado correctamente.",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        // $id = $request->id;

        // Event::where('id', $id)->delete();

        // return response()->json([
        //     "message" => "Registro eliminado correctamente.",
        // ]);

        $id = $request->id;

        $event = Event::find($id);
    
        if (!$event) {
            return response()->json([
                "message" => "No se encontró ningún evento con el ID proporcionado.",
                "data"=>$request->id
            ], 404);
        }
        $event->delete();
        return response()->json([
            "message" => "Registro eliminado correctamente."
        ], 200);
    }
}
