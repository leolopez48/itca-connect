<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class PlaceType extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'place_type';

    protected $data = ['deleted_at'];

    protected $fillable = [
        'id', 'name', 'icon', 'created_at', 'updated_at', 'deleted_at', 
    ];

    public $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public $timestamps = true;

    public static function allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage)
    {
        return PlaceType::select('place_type.*', 'place_type.id as id')
        
		->where('place_type.name', 'like', $search)
		->orWhere('place_type.icon', 'like', $search)

        ->skip($skip)
        ->take($itemsPerPage)
        ->orderBy("place_type.$sortBy", $sort)
        ->get();
    }

    public static function counterPagination($search)
    {
        return PlaceType::select('place_type.*', 'place_type.id as id')
        
		->where('place_type.name', 'like', $search)
		->orWhere('place_type.icon', 'like', $search)

        ->count();
    }
}
