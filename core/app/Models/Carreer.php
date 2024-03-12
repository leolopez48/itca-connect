<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Carreer extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'carreer';

    protected $data = ['deleted_at'];

    protected $fillable = [
        'id', 'name', 'school_id', 'created_at', 'updated_at', 'deleted_at', 
    ];

    public $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public $timestamps = true;

    public static function allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage)
    {
        return Carreer::select('carreer.*', 'school.*', 'carreer.id as id')
        ->join('school', 'carreer.school_id', '=', 'school.id')

		->where('carreer.name', 'like', $search)
		->orWhere('school.name', 'like', $search)

        ->skip($skip)
        ->take($itemsPerPage)
        ->orderBy("carreer.$sortBy", $sort)
        ->get();
    }

    public static function counterPagination($search)
    {
        return Carreer::select('carreer.*', 'school.*', 'carreer.id as id')
        ->join('school', 'carreer.school_id', '=', 'school.id')

		->where('carreer.name', 'like', $search)
		->orWhere('school.name', 'like', $search)

        ->count();
    }
}
