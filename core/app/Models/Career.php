<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'career';

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

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function career()
    {
        return $this->belongsTo(Career::class);
    }

    public function format()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'school' => $this->school->name,
        ];
    }

    public static function allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage)
    {
        return Career::select('career.*', 'school.*', 'career.id as id')
            ->join('school', 'career.school_id', '=', 'school.id')

            ->where('career.name', 'like', $search)
            ->orWhere('school.name', 'like', $search)

            ->skip($skip)
            ->take($itemsPerPage)
            ->orderBy("career.$sortBy", $sort)
            ->get()
            ->map(fn ($row) => $row->format());
    }

    public static function counterPagination($search)
    {
        return Career::select('career.*', 'school.*', 'career.id as id')
            ->join('school', 'career.school_id', '=', 'school.id')

            ->where('career.name', 'like', $search)
            ->orWhere('school.name', 'like', $search)

            ->count();
    }
}
