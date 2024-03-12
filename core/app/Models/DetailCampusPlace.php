<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class DetailCampusPlace extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'detail_campus_place';

    protected $data = ['deleted_at'];

    protected $fillable = [
        'id', 'longitude', 'latitude', 'campus_id', 'place_type_id', 'created_at', 'updated_at', 'deleted_at', 
    ];

    public $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public $timestamps = true;

    public static function allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage)
    {
        return DetailCampusPlace::select('detail_campus_place.*', 'campus.*', 'place_type.*', 'detail_campus_place.id as id')
        ->join('campus', 'detail_campus_place.campus_id', '=', 'campus.id')
->join('place_type', 'detail_campus_place.place_type_id', '=', 'place_type.id')

		->where('detail_campus_place.longitude', 'like', $search)
		->orWhere('detail_campus_place.latitude', 'like', $search)
		->orWhere('campus.name', 'like', $search)
		->orWhere('place_type.name', 'like', $search)
		->orWhere('place_type.icon', 'like', $search)

        ->skip($skip)
        ->take($itemsPerPage)
        ->orderBy("detail_campus_place.$sortBy", $sort)
        ->get();
    }

    public static function counterPagination($search)
    {
        return DetailCampusPlace::select('detail_campus_place.*', 'campus.*', 'place_type.*', 'detail_campus_place.id as id')
        ->join('campus', 'detail_campus_place.campus_id', '=', 'campus.id')
->join('place_type', 'detail_campus_place.place_type_id', '=', 'place_type.id')

		->where('detail_campus_place.longitude', 'like', $search)
		->orWhere('detail_campus_place.latitude', 'like', $search)
		->orWhere('campus.name', 'like', $search)
		->orWhere('place_type.name', 'like', $search)
		->orWhere('place_type.icon', 'like', $search)

        ->count();
    }
}
