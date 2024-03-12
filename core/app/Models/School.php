<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'school';

    protected $data = ['deleted_at'];

    protected $fillable = [
        'id', 'name', 'campus_id', 'created_at', 'updated_at', 'deleted_at', 
    ];

    public $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public $timestamps = true;

    public static function allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage)
    {
        return School::select('school.*', 'campus.*', 'school.id as id')
        ->join('campus', 'school.campus_id', '=', 'campus.id')

		->where('school.name', 'like', $search)
		->orWhere('campus.name', 'like', $search)

        ->skip($skip)
        ->take($itemsPerPage)
        ->orderBy("school.$sortBy", $sort)
        ->get();
    }

    public static function counterPagination($search)
    {
        return School::select('school.*', 'campus.*', 'school.id as id')
        ->join('campus', 'school.campus_id', '=', 'campus.id')

		->where('school.name', 'like', $search)
		->orWhere('campus.name', 'like', $search)

        ->count();
    }
}
