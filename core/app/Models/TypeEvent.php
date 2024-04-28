<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class TypeEvent extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'type_event';

    protected $data = ['deleted_at'];

    protected $fillable = [
        'id', 'name', 'color', 'campus_id', 'created_at', 'updated_at', 'deleted_at',
    ];

    public $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public $timestamps = true;

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function format()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'color' => $this->color,
            'campus' => $this->campus->name,
        ];
    }

    public static function allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage)
    {
        return TypeEvent::select('type_event.*', 'campus.*', 'type_event.id as id','type_event.name as name')
            ->join('campus', 'type_event.campus_id', '=', 'campus.id')

            ->where('type_event.name', 'like', $search)
            ->orWhere('type_event.color', 'like', $search)
            ->orWhere('campus.name', 'like', $search)

            ->skip($skip)
            ->take($itemsPerPage)
            ->orderBy("type_event.$sortBy", $sort)
            ->get()
            ->map(fn ($row) => $row->format());
    }

    public static function counterPagination($search)
    {
        return TypeEvent::select('type_event.*', 'campus.*', 'type_event.id as id')
            ->join('campus', 'type_event.campus_id', '=', 'campus.id')

            ->where('type_event.name', 'like', $search)
            ->orWhere('type_event.color', 'like', $search)
            ->orWhere('campus.name', 'like', $search)

            ->count();
    }
}
