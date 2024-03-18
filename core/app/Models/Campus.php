<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Campus extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'campus';

    protected $data = ['deleted_at'];

    protected $fillable = [
        'id', 'name', 'created_at', 'updated_at', 'deleted_at',
    ];

    public $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public $timestamps = true;

    public function format()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }

    public static function allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage)
    {
        return Campus::select('campus.*', 'campus.id as id')

            ->where('campus.id', 'like', $search)
            ->orWhere('campus.name', 'like', $search)

            ->skip($skip)
            ->take($itemsPerPage)
            ->orderBy("campus.$sortBy", $sort)
            ->get()
            ->map(fn ($row) => $row->format());
    }

    public static function counterPagination($search)
    {
        return Campus::select('campus.*', 'campus.id as id')

            ->where('campus.id', 'like', $search)
            ->orWhere('campus.name', 'like', $search)

            ->count();
    }
}
