<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DruidController extends Controller
{
    public function druid(Request $request)
    {
        $data = Http::post(getenv('URL_DRUID'), [
            "query" => $request->sql,
            "context" => [
                "sqlQueryId" => "request01"
            ]
        ]);

        return response()->json($data->json());
    }
}
