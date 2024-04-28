<?php

namespace App\Models;

use Carbon\Carbon;
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

    public function typeEvent()
    {
        return $this->belongsTo(TypeEvent::class);
    }

    public function format()
    {
        $start = Carbon::parse($this->date_start)->format('H:i');
        $end = Carbon::parse($this->date_end)->format('H:i');

        return [
            'id' => $this->id,
            'name' => $this->name,
            'date_start' => $this->date_start,
            'date_end' => $this->date_end,
            'type_event' => $this->typeEvent->name,
            'date' => Carbon::parse($this->date_start)->format('Y-m-d'),
            'title' => "$this->name ($start - $end)",
            'start' => $this->date_start,
            'end' => $this->date_end,
        ];
    }

    public static function allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage)
    {
        return Event::select('event.*', 'type_event.*', 'event.id as id','event.name as name')
            ->join('type_event', 'event.type_event_id', '=', 'type_event.id')

            ->where('event.name', 'like', $search)
            ->orWhere('event.date_start', 'like', $search)
            ->orWhere('event.date_end', 'like', $search)
            ->orWhere('type_event.name', 'like', $search)
            ->orWhere('type_event.color', 'like', $search)

            ->skip($skip)
            ->take($itemsPerPage)
            ->orderBy("event.$sortBy", $sort)
            ->get()
            ->map(fn ($event) => $event->format());
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
