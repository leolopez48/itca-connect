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
        'id', 'name', 'carnet', 'email', 'role_id', 'carreer_id', 'ip', 'email_verified_at', 'password', 'remember_token', 'created_at', 'updated_at', 'deleted_at',
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

    public function carreer()
    {
        return $this->belongsTo(Carreer::class);
    }

    public function format()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'carnet' => $this->carnet,
            'email' => $this->email,
            'role' => $this->role->name,
            'carreer' => $this->carreer->name,
            'campus' => $this->carreer->school->campus->name,
            'ip' => $this->ip,
            'email_verified_at' => $this->email_verifies_at,
        ];
    }

    public static function allDataSearched($search, $sortBy, $sort, $skip, $itemsPerPage)
    {
        return User::select('users.*', 'role.*', 'carreer.*', 'users.id as id')
            ->join('role', 'users.role_id', '=', 'role.id')
            ->join('carreer', 'users.carreer_id', '=', 'carreer.id')

            ->where('users.name', 'like', $search)
            ->orWhere('users.carnet', 'like', $search)
            ->orWhere('users.email', 'like', $search)
            ->orWhere('users.ip', 'like', $search)
            ->orWhere('role.name', 'like', $search)
            ->orWhere('carreer.name', 'like', $search)

            ->skip($skip)
            ->take($itemsPerPage)
            ->orderBy("users.$sortBy", $sort)
            ->get()
            ->map(fn ($user) => $user->format());
    }

    public static function counterPagination($search)
    {
        return User::select('users.*', 'role.*', 'carreer.*', 'users.id as id')
            ->join('role', 'users.role_id', '=', 'role.id')
            ->join('carreer', 'users.carreer_id', '=', 'carreer.id')

            ->where('users.name', 'like', $search)
            ->orWhere('users.carnet', 'like', $search)
            ->orWhere('users.email', 'like', $search)
            ->orWhere('users.ip', 'like', $search)
            ->orWhere('role.name', 'like', $search)
            ->orWhere('carreer.name', 'like', $search)

            ->count();
    }
}
