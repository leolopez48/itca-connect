<?php

namespace App\Http\Controllers;

use App\Models\FrequentQuestion;

use Illuminate\Http\Request;
use Encrypt;

class FrequentQuestionController extends Controller
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
            $itemsPerPage =  FrequentQuestion::count();
            $skip = 0;
        }

        $sortBy = (isset($request->sortBy[0])) ? $request->sortBy[0] : 'id';
        $sort = (isset($request->sortDesc[0])) ? "asc" : 'desc';

        $search = (isset($request->search)) ? "%$request->search%" : '%%';

        $frequentquestion = FrequentQuestion::allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage);

        $total = FrequentQuestion::counterPagination($search);

        return response()->json([
            "message" => "Registros obtenidos correctamente.",
            "data" => $frequentquestion,
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
        $frequentquestion = new FrequentQuestion;

        $frequentquestion->question = $request->question;
        $frequentquestion->answer = $request->answer;

        $frequentquestion->save();

        return response()->json([
            "message" => "Registro creado correctamente.",
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FrequentQuestion  frequentquestion
     * @return \Illuminate\Http\Response
     */
    public function show(FrequentQuestion $frequentquestion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FrequentQuestion  $frequentquestion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $data = $request->all();

        $frequentquestion = FrequentQuestion::where('id', $data['id'])->first();
        $frequentquestion->question = $request->question;
        $frequentquestion->answer = $request->answer;

        $frequentquestion->save();

        return response()->json([
            "message" => "Registro modificado correctamente.",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FrequentQuestion  $frequentquestion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;

        FrequentQuestion::where('id', $id)->delete();

        return response()->json([
            "message" => "Registro eliminado correctamente.",
        ]);
    }
}
