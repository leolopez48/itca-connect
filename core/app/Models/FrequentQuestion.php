<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class FrequentQuestion extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'frequent_question';

    protected $data = ['deleted_at'];

    protected $fillable = [
        'id', 'question', 'answer', 'created_at', 'updated_at',
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
            'question' => $this->question,
            'answer' => $this->answer,
        ];
    }

    public static function allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage)
    {
        return FrequentQuestion::select('frequent_question.*', 'frequent_question.id as id')

            ->where('frequent_question.question', 'like', $search)
            ->orWhere('frequent_question.answer', 'like', $search)

            ->skip($skip)
            ->take($itemsPerPage)
            ->orderBy("frequent_question.$sortBy", $sort)
            ->get()
            ->map(fn ($row) => $row->format());
    }

    public static function counterPagination($search)
    {
        return FrequentQuestion::select('frequent_question.*', 'frequent_question.id as id')

            ->where('frequent_question.question', 'like', $search)
            ->orWhere('frequent_question.answer', 'like', $search)

            ->count();
    }
}
