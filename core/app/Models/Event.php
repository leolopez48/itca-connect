<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'event';

    protected $data = ['deleted_at'];

    protected $fillable = [
        'id', 'name', 'date_start', 'date_end', 'type_event_id', 'created_at', 'updated_at', 'deleted_at', 
    ];

    public $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public $timestamps = true;

    public static function allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage)
    {
        return Event::select('event.*', 'type_event.*', 'event.id as id')
        ->join('type_event', 'event.type_event_id', '=', 'type_event.id')

		->where('event.name', 'like', $search)
		->orWhere('event.date_start', 'like', $search)
		->orWhere('event.date_end', 'like', $search)
		->orWhere('type_event.name', 'like', $search)
		->orWhere('type_event.color', 'like', $search)

        ->skip($skip)
        ->take($itemsPerPage)
        ->orderBy("event.$sortBy", $sort)
        ->get();
    }

    public static function counterPagination($search)
    {
        return Event::select('event.*', 'type_event.*', 'event.id as id')
        ->join('type_event', 'event.type_event_id', '=', 'type_event.id')

		->where('event.name', 'like', $search)
		->orWhere('event.date_start', 'like', $search)
		->orWhere('event.date_end', 'like', $search)
		->orWhere('type_event.name', 'like', $search)
		->orWhere('type_event.color', 'like', $search)

        ->count();
    }
}
