<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\Career;

use Illuminate\Http\Request;
use Encrypt;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        Log::info($request->all());
        $itemsPerPage = $request->itemsPerPage ?? 10;
        $skip = ($request->page - 1) * $request->itemsPerPage;

        // Getting all the records
        if (($request->itemsPerPage == -1)) {
            $itemsPerPage =  User::count();
            $skip = 0;
        }

        $sortBy = (isset($request->sortBy[0])) ? $request->sortBy[0] : 'id';
        $sort = (isset($request->sortDesc[0])) ? "asc" : 'desc';

        $search = (isset($request->search)) ? "%$request->search%" : '%%';

        $users = User::allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage);

        $total = User::counterPagination($search);

        return response()->json([
            "message" => "Registros obtenidos correctamente.",
            "data" => $users,
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
        $users = new User;

        $users->name = $request->name;
        $users->carnet = $request->carnet;
        $users->email = $request->email;
        $users->role_id = Role::where('name', $request->name)->first()->id;
        $users->career_id = Career::where('name', $request->name)->first()->id;
        $users->ip = $request->ip;
        $users->email_verified_at = $request->email_verified_at;
        $users->password = $request->password;
        $users->remember_token = $request->remember_token;
        $users->deleted_at = $request->deleted_at;

        $users->save();

        return response()->json([
            "message" => "Registro creado correctamente.",
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  users
     * @return \Illuminate\Http\Response
     */
    public function show(User $users)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $users
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $data = $request->all();

        $users = User::where('id', $data['id'])->first();
        $users->name = $request->name;
        $users->carnet = $request->carnet;
        $users->email = $request->email;
        $users->role_id = Role::where('name', $request->name)->first()->id;
        $users->career_id = Career::where('name', $request->name)->first()->id;
        $users->ip = $request->ip;
        $users->email_verified_at = $request->email_verified_at;
        $users->password = $request->password;
        $users->remember_token = $request->remember_token;
        $users->deleted_at = $request->deleted_at;

        $users->save();

        return response()->json([
            "message" => "Registro modificado correctamente.",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $users
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;

        User::where('id', $id)->delete();

        return response()->json([
            "message" => "Registro eliminado correctamente.",
        ]);
    }
}
