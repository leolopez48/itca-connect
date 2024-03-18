<?php

namespace App\Http\Controllers;

use App\Models\Carreer;
use App\Models\School;

use Illuminate\Http\Request;
use Encrypt;

class CarreerController extends Controller
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
            $itemsPerPage =  Carreer::count();
            $skip = 0;
        }

        $sortBy = (isset($request->sortBy[0])) ? $request->sortBy[0] : 'id';
        $sort = (isset($request->sortDesc[0])) ? "asc" : 'desc';

        $search = (isset($request->search)) ? "%$request->search%" : '%%';

        $carreer = Carreer::allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage);

        $total = Carreer::counterPagination($search);

        return response()->json([
            "message" => "Registros obtenidos correctamente.",
            "data" => $carreer,
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
        $carreer = new Carreer;

        $carreer->name = $request->name;
        $carreer->school_id = School::where('name', $request->name)->first()->id;
        $carreer->deleted_at = $request->deleted_at;

        $carreer->save();

        return response()->json([
            "message" => "Registro creado correctamente.",
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Carreer  carreer
     * @return \Illuminate\Http\Response
     */
    public function show(Carreer $carreer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Carreer  $carreer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $data = $request->all();

        $carreer = Carreer::where('id', $data['id'])->first();
        $carreer->name = $request->name;
        $carreer->school_id = School::where('name', $request->name)->first()->id;
        $carreer->deleted_at = $request->deleted_at;

        $carreer->save();

        return response()->json([
            "message" => "Registro modificado correctamente.",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Carreer  $carreer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;

        Carreer::where('id', $id)->delete();

        return response()->json([
            "message" => "Registro eliminado correctamente.",
        ]);
    }
}
