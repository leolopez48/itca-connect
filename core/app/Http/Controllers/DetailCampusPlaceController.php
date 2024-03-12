<?php

namespace App\Http\Controllers;

use App\Models\DetailCampusPlace;
use App\Models\Campus;
use App\Models\PlaceType;

use Illuminate\Http\Request;
use Encrypt;

class DetailCampusPlaceController extends Controller
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
            $itemsPerPage =  DetailCampusPlace::count();
            $skip = 0;
        }

        $sortBy = (isset($request->sortBy[0])) ? $request->sortBy[0] : 'id';
        $sort = (isset($request->sortDesc[0])) ? "asc" : 'desc';

        $search = (isset($request->search)) ? "%$request->search%" : '%%';

        $detailcampusplace = DetailCampusPlace::allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage);
        $detailcampusplace = Encrypt::encryptObject($detailcampusplace, "id");

        $total = DetailCampusPlace::counterPagination($search);

        return response()->json([
            "message"=>"Registros obtenidos correctamente.",
            "data" => $detailcampusplace,
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
        $detailcampusplace = new DetailCampusPlace;

		$detailcampusplace->longitude = $request->longitude;
		$detailcampusplace->latitude = $request->latitude;
		$detailcampusplace->campus_id = Campus::where('name', $request->name)->first()->id;
		$detailcampusplace->place_type_id = PlaceType::where('name', $request->name)->first()->id;
		$detailcampusplace->deleted_at = $request->deleted_at;

        $detailcampusplace->save();

        return response()->json([
            "message"=>"Registro creado correctamente.",
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DetailCampusPlace  detailcampusplace
     * @return \Illuminate\Http\Response
     */
    public function show(DetailCampusPlace $detailcampusplace)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DetailCampusPlace  $detailcampusplace
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $data = Encrypt::decryptArray($request->all(), 'id');

        $detailcampusplace = DetailCampusPlace::where('id', $data['id'])->first();
		$detailcampusplace->longitude = $request->longitude;
		$detailcampusplace->latitude = $request->latitude;
		$detailcampusplace->campus_id = Campus::where('name', $request->name)->first()->id;
		$detailcampusplace->place_type_id = PlaceType::where('name', $request->name)->first()->id;
		$detailcampusplace->deleted_at = $request->deleted_at;

        $detailcampusplace->save();

        return response()->json([
            "message"=>"Registro modificado correctamente.",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DetailCampusPlace  $detailcampusplace
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = Encrypt::decryptValue($request->id);

        DetailCampusPlace::where('id', $id)->delete();

        return response()->json([
            "message"=>"Registro eliminado correctamente.",
        ]);
    }
}
