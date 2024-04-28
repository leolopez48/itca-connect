<?php

namespace App\Http\Controllers;

use App\Models\TypeEvent;
use App\Models\Campus;

use Illuminate\Http\Request;
use Encrypt;

class TypeEventController extends Controller
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
            $itemsPerPage =  TypeEvent::count();
            $skip = 0;
        }

        $sortBy = (isset($request->sortBy[0])) ? $request->sortBy[0] : 'id';
        $sort = (isset($request->sortDesc[0])) ? "asc" : 'desc';

        $search = (isset($request->search)) ? "%$request->search%" : '%%';

        $typeevent = TypeEvent::allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage);

        $total = TypeEvent::counterPagination($search);

        return response()->json([
            "message" => "Registros obtenidos correctamente.",
            "data" => $typeevent,
            "total" => $total,
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
        $typeevent = new TypeEvent;

        $typeevent->name = $request->name;
        $typeevent->color = $request->color;
        $typeevent->campus_id = Campus::where('name', $request->campus_id)->first()->id;
        $typeevent->deleted_at = $request->deleted_at;

        $typeevent->save();

        return response()->json([
            "message" => "Registro creado correctamente.",
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TypeEvent  typeevent
     * @return \Illuminate\Http\Response
     */
    public function show(TypeEvent $typeevent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TypeEvent  $typeevent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $data = $request->all();

        $typeevent = TypeEvent::where('id', $data['id'])->first();
        $typeevent->name = $request->name;
        $typeevent->color = $request->color;
        $typeevent->campus_id = Campus::where('name', $request->campus_id)->first()->id;
        $typeevent->deleted_at = $request->deleted_at;

        $typeevent->save();

        return response()->json([
            "message" => "Registro modificado correctamente.",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TypeEvent  $typeevent
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;

        TypeEvent::where('id', $id)->delete();

        return response()->json([
            "message" => "Registro eliminado correctamente.",
        ]);
    }
}
