<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Encrypt;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'users';

    protected $data = ['deleted_at'];

    protected $fillable = [
        'id', 'name', 'carnet', 'email', 'role_id', 'career_id', 'ip', 'email_verified_at', 'password', 'remember_token', 'created_at', 'updated_at', 'deleted_at',
    ];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public $timestamps = true;

    public function role()
    {
        return $this->belongsTo(Role::class);
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
            'carnet' => $this->carnet,
            'email' => $this->email,
            'role' => $this->role->name,
            'career' => $this->career->name,
            'campus' => $this->career->school->campus->name,
            'ip' => $this->ip,
            'email_verified_at' => $this->email_verifies_at,
        ];
    }

    public static function allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage)
    {
        return User::select('users.*', 'role.*', 'career.*', 'users.id as id')
            ->join('role', 'users.role_id', '=', 'role.id')
            ->join('career', 'users.career_id', '=', 'career.id')

            ->where('users.name', 'like', $search)
            ->orWhere('users.carnet', 'like', $search)
            ->orWhere('users.email', 'like', $search)
            ->orWhere('users.ip', 'like', $search)
            ->orWhere('role.name', 'like', $search)
            ->orWhere('career.name', 'like', $search)

            ->skip($skip)
            ->take($itemsPerPage)
            ->orderBy("users.$sortBy", $sort)
            ->get()
            ->map(fn ($user) => $user->format());
    }

    public static function counterPagination($search)
    {
        return User::select('users.*', 'role.*', 'career.*', 'users.id as id')
            ->join('role', 'users.role_id', '=', 'role.id')
            ->join('career', 'users.career_id', '=', 'career.id')

            ->where('users.name', 'like', $search)
            ->orWhere('users.carnet', 'like', $search)
            ->orWhere('users.email', 'like', $search)
            ->orWhere('users.ip', 'like', $search)
            ->orWhere('role.name', 'like', $search)
            ->orWhere('career.name', 'like', $search)

            ->count();
    }
}
